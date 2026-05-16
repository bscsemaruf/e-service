// src/modules/auth/auth.interface.ts
// =========================================================
// কেন? TypeScript এ সব type এক জায়গায় রাখো।
// এই module এর সব file এখান থেকে type import করবে।
// =========================================================

import { Document } from "mongoose";
import { Request } from "express";

// Admin document এর shape
export interface IAdmin extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Login request body
export interface ILoginPayload {
  email: string;
  password: string;
}

// JWT decode হওয়ার পর req.user এর type
export interface TAuthRequest extends Request {
  user?: { id: string };
}
