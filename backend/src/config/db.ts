// src/config/db.ts
// =========================================================
// কেন? MongoDB connection একবার করো, সব জায়গায় কাজে লাগে।
// server.ts থেকে call হবে।
// =========================================================

import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error:`, error);
    process.exit(1); // DB না হলে server বন্ধ করো
  }
};

export default connectDB;
