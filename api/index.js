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

// MongoDB connection with better error handling
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    const conn = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Connect to DB on startup
connectDB();

// routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// test route (VERY IMPORTANT)
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "API is working",
    mongo: process.env.MONGO ? "connected" : "missing",
    jwt: process.env.JWT_SECRET ? "exists" : "missing",
    dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
