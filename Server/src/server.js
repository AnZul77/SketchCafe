import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRouter from "./routers/auth.router.js";
import reservationRouter from "./routers/reservations.router.js";
import menuRouter from "./routers/menu.router.js";
import orderRouter from "./routers/order.router.js";
import paymentRouter from "./routers/payment.router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/reservations", reservationRouter);
app.use("/menu", menuRouter);
app.use("/orders", orderRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("Hello Cafe Backend Running !");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);

      // Keep-alive mechanism for Render free instances (pings every 13 mins to prevent 15-min spin-down)
      const keepAliveUrl = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;
      if (keepAliveUrl) {
        console.log(`Keep-alive monitor activated for: ${keepAliveUrl}`);
        const PING_INTERVAL = 13 * 60 * 1000; // 13 minutes
        setInterval(() => {
          fetch(`${keepAliveUrl}/health`)
            .then((res) => console.log(`Keep-alive ping sent [${res.status}]`))
            .catch((err) => console.warn(`Keep-alive ping warning: ${err.message}`));
        }, PING_INTERVAL);
      }
    });
  })
  .catch((err) => console.log(err));
