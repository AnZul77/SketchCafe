import express from "express";

import {
  register,
  Login,
  getUserData,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { arcjetMiddleware } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.post("/register", arcjetMiddleware, register);
router.post("/login", arcjetMiddleware, Login);
router.get("/user", authMiddleware, getUserData);

export default router;
