// src/server.ts
// =========================================================
// কেন? Entry point। DB connect করো, তারপর server শুরু করো।
// =========================================================

import "dotenv/config"; // সবার আগে .env load করো
import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    // 1. DB connect করো
    await connectDB();

    // 2. Server শুরু করো
    app.listen(PORT, () => {
      console.log(`✅ Server running → http://localhost:${PORT}`);
      console.log(`📋 Health check → http://localhost:${PORT}/api/health`);
      console.log(`🌍 Environment → ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
