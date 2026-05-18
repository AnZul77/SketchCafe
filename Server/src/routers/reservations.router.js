import express from "express";

import {
  createReservation,
  getUserReservations,
  cancelReservation,
} from "../controllers/reservation.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createReservation);
router.get("/my", authMiddleware, getUserReservations);
router.patch("/:id", authMiddleware, cancelReservation);

export default router;
