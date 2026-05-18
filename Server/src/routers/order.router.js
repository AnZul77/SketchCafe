import express from "express";
import {
  createOrder,
  getUserOrders,
} from "../controllers/order.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/", authMiddleware, createOrder);
router.get("/my", authMiddleware, getUserOrders);
export default router;
