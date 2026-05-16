// src/modules/service/service.utils.ts
// =========================================================
// কেন? Cloudinary upload/delete logic আলাদা রাখো।
// service.service.ts কে clean রাখে।
// =========================================================

import cloudinary from "../../config/cloudinary";
import { Readable } from "stream";

// Buffer → Cloudinary upload
export const uploadImageToCloudinary = (
  buffer: Buffer,
  mimetype: string,
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ac-service/services",
        resource_type: "image",
        // Format auto detect করো
        format:
          mimetype.split("/")[1] === "jpeg" ? "jpg" : mimetype.split("/")[1],
        // Image optimize করো
        transformation: [
          { width: 800, height: 600, crop: "limit" }, // max 800x600
          { quality: "auto" }, // auto quality
          { fetch_format: "auto" }, // webp support
        ],
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    // Buffer কে readable stream এ convert করো
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
};

// Cloudinary থেকে image delete করো
export const deleteImageFromCloudinary = async (
  publicId: string,
): Promise<void> => {
  if (!publicId) return; // publicId না থাকলে skip
  await cloudinary.uploader.destroy(publicId);
};
