// src/utils/generateToken.ts
// =========================================================
// কেন? JWT token তৈরির logic এক জায়গায় রাখো।
// auth.service.ts এ import করে ব্যবহার করবো।
// =========================================================

import jwt from "jsonwebtoken";

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRES_IN ||
      "7d") as jwt.SignOptions["expiresIn"],
  });
};

export default generateToken;
