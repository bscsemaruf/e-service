// src/config/cloudinary.ts
// =========================================================
// কেন? Cloudinary configured instance একবার তৈরি করো।
// service.utils.ts থেকে এই instance import করে ব্যবহার হবে।
// =========================================================

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
