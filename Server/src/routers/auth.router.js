import express from "express";

import {
  register,
  Login,
  getUserData,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router.get("/user", authMiddleware, getUserData);

export default router;
