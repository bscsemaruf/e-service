// src/app.ts

import express, { Application, Request, Response } from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.route";
import serviceRoutes from "./modules/service/service.route";
import contactRoutes from "./modules/contact/contact.route";
import errorMiddleware from "./middleware/error.middleware";

const app: Application = express();

// ── CORS ─────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:3000",
  "https://e-service-orcin.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // origin না থাকলে (Postman/server-to-server) allow করো
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
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

// ── Global Error Handler ──────────────────────────────────
app.use(errorMiddleware);

export default app;
