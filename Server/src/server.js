import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import authRouter from "./routers/auth.router.js";
import reservationRouter from "./routers/reservations.router.js";
import menuRouter from "./routers/menu.router.js";
import orderRouter from "./routers/order.router.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(helmet());

app.use(arcjetMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/menu", menuRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello Cafe Backend Running !");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
