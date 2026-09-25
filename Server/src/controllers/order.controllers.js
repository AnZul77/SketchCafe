import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/Order.js";
import MenuItem from "../models/Menu.js";

export const createOrder = async (req, res) => {
  try {
    const { items, tableNumber, phone, paymentId, razorpayOrderId, razorpaySignature } =
      req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!tableNumber || typeof tableNumber !== "string" || !tableNumber.trim()) {
      return res.status(400).json({ message: "Table number is required" });
    }

    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      if (!item.menuItem || !item.quantity || Number(item.quantity) <= 0) {
        return res.status(400).json({ message: "Invalid item quantity" });
      }

      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item not found: ${item.menuItem}` });
      }
      if (!menuItem.available) {
        return res.status(400).json({ message: `Item unavailable: ${menuItem.name}` });
      }

      subtotal += menuItem.price * Number(item.quantity);
      validatedItems.push({
        menuItem: menuItem._id,
        quantity: Number(item.quantity),
      });
    }

    const tax = Number((subtotal * 0.1).toFixed(2));
    const totalAmount = Number((subtotal + tax).toFixed(2));

    let paymentStatus = "pending";

    // Validate payment if payment identifiers are passed
    if (paymentId && razorpayOrderId) {
      // Check replay attack: ensure paymentId hasn't already been used
      const existingOrderWithPayment = await Order.findOne({ paymentId });
      if (existingOrderWithPayment) {
        return res.status(400).json({ message: "This payment has already been used for an order" });
      }

      // Verify HMAC signature
      if (process.env.RAZORPAY_KEY_SECRET) {
        if (!razorpaySignature) {
          return res.status(400).json({ message: "Payment signature is required" });
        }
        const body = razorpayOrderId + "|" + paymentId;
        const expectedSignature = crypto
          .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
          .update(body.toString())
          .digest("hex");

        if (expectedSignature !== razorpaySignature) {
          return res.status(400).json({ message: "Invalid payment signature verification" });
        }
      }

      // Verify amount with Razorpay
      if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
        try {
          const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
          });

          const rzpOrder = await razorpay.orders.fetch(razorpayOrderId);
          const expectedPaise = Math.round(totalAmount * 100);

          if (Math.abs(rzpOrder.amount - expectedPaise) > 100) {
            return res.status(400).json({
              message: `Paid amount does not match order total: expected ₹${totalAmount.toFixed(2)}, received ₹${(rzpOrder.amount / 100).toFixed(2)}`,
            });
          }
        } catch (fetchErr) {
          console.error("Razorpay order check failed:", fetchErr);
          return res.status(400).json({ message: "Could not verify payment with payment gateway" });
        }
      }

      paymentStatus = "paid";
    }

    const newOrder = new Order({
      user: req.userId,
      items: validatedItems,
      tableNumber: tableNumber.trim(),
      phone: phone ? String(phone).trim() : undefined,
      subtotal,
      tax,
      totalAmount,
      paymentId: paymentId || undefined,
      razorpayOrderId: razorpayOrderId || undefined,
      razorpaySignature: razorpaySignature || undefined,
      paymentStatus,
    });

    await newOrder.save();

    const populatedOrder = await Order.findById(newOrder._id)
      .populate("items.menuItem", "name price category imageUrl");

    res.status(201).json({ message: "Order created successfully", order: populatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("items.menuItem", "name price category imageUrl")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch orders" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 200);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.menuItem", "name price category imageUrl")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch all orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    if (!["pending", "preparing", "served", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
