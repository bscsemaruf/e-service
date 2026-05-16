// src/modules/auth/auth.model.ts
// =========================================================
// কেন? Admin এর data MongoDB তে কীভাবে store হবে।
// Password save এর আগে automatically hash হবে।
// comparePassword method দিয়ে login এ verify করবো।
// =========================================================

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IAdmin } from "./auth.interface";

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // default এ query তে password আসবে না
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto
  },
);

// ─── Pre-save Hook ──────────────────────────────────────
// Password পরিবর্তন হলে hash করো
// "isModified" check না করলে প্রতিবার save এ hash হবে
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12); // 12 rounds = secure
  this.password = await bcrypt.hash(this.password, salt);
});

// ─── Instance Method ────────────────────────────────────
// Login এ plain password vs hashed password compare
adminSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;
