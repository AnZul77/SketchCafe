import dotenv from "dotenv";
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

dotenv.config();

const router = express.Router();

const createRazorpayClient = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  return new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
};

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const razorpay = createRazorpayClient();

    const amountInPaise = Math.round(Number(amount) * 100);

    if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({ error: "Invalid order amount" });
    }

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    console.error("FULL RAZORPAY ERROR:");
    console.error(err);
    console.error(err.error);
    console.error(err.description);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Health / diagnostic endpoint to verify router is mounted in production
router.get("/ping", (req, res) => {
  try {
    console.log("/api/payment/ping hit from", req.ip);
    res.status(200).json({ ok: true, envSet: !!process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("ping error", err);
    res.status(500).json({ ok: false });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

export default router;
