import express from "express";

import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menu.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getMenuItems);
router.post("/", authMiddleware, adminMiddleware, addMenuItem);
router.put("/:id", authMiddleware, adminMiddleware, updateMenuItem);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMenuItem);

export default router;
