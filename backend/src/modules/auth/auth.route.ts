// src/modules/auth/auth.route.ts
// =========================================================
// কেন? URL আর controller এর সংযোগ।
// Validation middleware route এ বসে।
// =========================================================

import { Router } from "express";
import { AuthController } from "./auth.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

// POST /api/auth/login — public
router.post("/login", AuthController.login);

// GET /api/auth/profile — protected (login লাগবে)
router.get("/profile", authMiddleware, AuthController.getProfile);

export default router;
