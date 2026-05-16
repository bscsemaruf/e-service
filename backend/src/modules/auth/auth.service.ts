// src/modules/auth/auth.service.ts
// =========================================================
// কেন? সব business logic এখানে।
// Controller শুধু এই service call করবে।
// DB query + JWT generation + password check — সব এখানে।
// =========================================================

import Admin from "./auth.model";
import { ILoginPayload, IAdmin } from "./auth.interface";
import generateToken from "../../utils/generateToken";

// Login service
const loginAdmin = async (
  payload: ILoginPayload,
): Promise<{ admin: Partial<IAdmin>; token: string }> => {
  const { email, password } = payload;

  // 1. Email দিয়ে admin খোঁজো
  //    select('+password') — কারণ schema তে select:false আছে
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    // ⚠️ Security: "email not found" বলো না
    // hacker কে hint দেওয়া ঠিক না
    throw new Error("Invalid email or password");
  }

  // 2. Password verify করো
  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // 3. JWT token তৈরি করো
  const token = generateToken(admin._id.toString());

  // 4. Password বাদ দিয়ে admin data দাও
  const adminData = {
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };

  return { admin: adminData, token };
};

// Profile service — token থেকে admin info আনো
const getAdminProfile = async (id: string): Promise<IAdmin> => {
  const admin = await Admin.findById(id);

  if (!admin) {
    const error = new Error("Admin not found") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  return admin;
};

export const AuthService = {
  loginAdmin,
  getAdminProfile,
};
