// src/middleware/upload.middleware.ts
// =========================================================
// কেন? multer দিয়ে multipart/form-data handle করো।
// memoryStorage: file disk এ না রেখে RAM এ রাখে।
// তারপর buffer থেকে সরাসরি Cloudinary তে পাঠাবো।
// =========================================================

import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  // শুধু image accept করো
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed! (jpg, png, webp)"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // সর্বোচ্চ 5MB
  },
});
