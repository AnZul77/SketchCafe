import express from "express";

import {
  createReservation,
  getUserReservations,
  cancelReservation,
  getAllReservations,
  updateReservationStatus
} from "../controllers/reservation.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createReservation);
router.get("/my", authMiddleware, getUserReservations);
router.patch("/:id", authMiddleware, cancelReservation);
router.get("/all", authMiddleware, adminMiddleware, getAllReservations);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateReservationStatus);

export default router;
