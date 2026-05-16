// src/seed.ts
// =========================================================
// কেন? প্রথমবার admin তৈরি করার জন্য।
// "npm run seed" — একবারই চালাও।
// =========================================================

import "dotenv/config";
import connectDB from "./config/db";
import Admin from "./modules/auth/auth.model";

const seed = async (): Promise<void> => {
  await connectDB();

  const exists = await Admin.findOne({ email: "admin@acservice.com" });

  if (exists) {
    console.log("⚠️  Admin already exists. Skipping seed.");
    process.exit(0);
  }

  await Admin.create({
    name: "Super Admin",
    email: "admin@acservice.com",
    password: "Admin@12345",
  });

  console.log("✅ Admin created successfully!");
  console.log("📧 Email   : admin@acservice.com");
  console.log("🔑 Password: Admin@12345");
  console.log("⚠️  Change the password after first login!");
  process.exit(0);
};

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
