import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

import authRouter from "./routers/auth.router.js";
import reservationRouter from "./routers/reservations.router.js";
import menuRouter from "./routers/menu.router.js";
import orderRouter from "./routers/order.router.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
import paymentRouter from "./routers/payment.router.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(helmet());

app.use("/auth", authRouter);
app.use("/reservations", reservationRouter);
app.use("/menu", menuRouter);
app.use("/orders", orderRouter);
app.use("/api/payment", paymentRouter);

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
