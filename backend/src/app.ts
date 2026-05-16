// src/app.ts
// =========================================================
// কেন? Express app configuration আলাদা file এ রাখো।
// server.ts শুধু listen করবে, app.ts সব middleware setup করবে।
// এটা testing এ সুবিধা দেয়।
// =========================================================

import express, { Application, Request, Response } from "express";
import cors from "cors";

// Routes
import authRoutes from "./modules/auth/auth.route";
import serviceRoutes from "./modules/service/service.route";
import contactRoutes from "./modules/contact/contact.route";

// Middleware
import errorMiddleware from "./middleware/error.middleware";

const app: Application = express();

// ── Global Middleware ────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ─────────────────────────────────────────
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "✅ AC Service API is running",
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ───────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contacts", contactRoutes);

// ── 404 Handler ──────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "❌ Route not found",
  });
});

// ── Global Error Handler (সবার শেষে) ────────────────────
app.use(errorMiddleware);

export default app;
