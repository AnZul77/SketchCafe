import express from "express";

import { getMenuItems } from "../controllers/menu.controllers.js";

const router = express.Router();

router.get("/", getMenuItems);

export default router;
