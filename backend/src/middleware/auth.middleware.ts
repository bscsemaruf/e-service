// src/middleware/auth.middleware.ts
// =========================================================
// কেন? Protected route এ request আসলে আগে JWT verify করো।
// Valid হলে req.user এ admin info রাখো, তারপর next()।
// =========================================================

import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { TAuthRequest } from "../modules/auth/auth.interface";

const authMiddleware = catchAsync(
  async (req: TAuthRequest, res: Response, next: NextFunction) => {
    // 1. Header থেকে token নাও
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
      return;
    }

    // 2. "Bearer <token>" থেকে শুধু token নাও
    const token = authHeader.split(" ")[1];

    // 3. Token verify করো
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    // 4. req এ admin id রাখো — controller এ কাজে লাগবে
    req.user = { id: decoded.id };

    next();
  },
);

export default authMiddleware;
