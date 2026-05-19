import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/order.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
const router = express.Router();
router.post("/", authMiddleware, createOrder);
router.get("/my", authMiddleware, getUserOrders);
router.get("/all", authMiddleware, adminMiddleware, getAllOrders);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);
export default router;
