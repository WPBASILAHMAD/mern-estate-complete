/** @format */

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/User.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// test route (VERY IMPORTANT)
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "API is working",
    mongo: process.env.MONGO ? "connected" : "missing",
    jwt: process.env.JWT_SECRET ? "exists" : "missing"
  });
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// MongoDB connection (NO listen)
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    console.log("MONGO env:", process.env.MONGO ? "exists" : "missing");
  });

export default app;
