import Order from "../models/Order.js";
import MenuItem from "../models/Menu.js";

export const createOrder = async (req, res) => {
  try {
    const { items, tableNumber } = req.body;
    let totalAmount = 0;
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem).select("price");
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      if (item.quantity <= 0) {
        return res.status(400).json({
          message: "Invalid quantity",
        });
      }
      totalAmount += menuItem.price * item.quantity;
    }
    const newOrder = new Order({
      user: req.userId,
      items,
      tableNumber,
      totalAmount,
    });
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("items.menuItem", "name price")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
