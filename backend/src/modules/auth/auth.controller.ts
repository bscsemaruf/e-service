// src/modules/auth/auth.controller.ts
// =========================================================
// কেন? শুধু req → service → res।
// কোনো business logic এখানে থাকবে না।
// catchAsync দিয়ে try/catch এর দরকার নেই।
// =========================================================

import { Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { TAuthRequest } from "./auth.interface";

// POST /api/auth/login
const login = catchAsync(async (req: TAuthRequest, res: Response) => {
  const result = await AuthService.loginAdmin(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

// GET /api/auth/profile  (protected)
const getProfile = catchAsync(async (req: TAuthRequest, res: Response) => {
  const admin = await AuthService.getAdminProfile(req.user!.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile fetched successfully",
    data: admin,
  });
});

export const AuthController = { login, getProfile };
