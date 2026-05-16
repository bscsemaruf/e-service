// services/auth.service.ts
// =========================================================
// কেন? Auth API calls এক জায়গায়।
// Login, profile, logout logic এখানে।
// =========================================================

import axiosInstance from "./axios";
import { IApiResponse, IAuthResponse, ILoginPayload, IAdmin } from "@/types";

// সব API response এর type safe access
const login = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  const { data } = await axiosInstance.post<IApiResponse<IAuthResponse>>(
    "/auth/login",
    payload,
  );
  return data.data;
};

const getProfile = async (): Promise<IAdmin> => {
  const { data } =
    await axiosInstance.get<IApiResponse<IAdmin>>("/auth/profile");
  return data.data;
};

// LocalStorage helper functions
const saveAuthData = (token: string, admin: IAdmin): void => {
  localStorage.setItem("ac_admin_token", token);
  localStorage.setItem("ac_admin_user", JSON.stringify(admin));
};

const clearAuthData = (): void => {
  localStorage.removeItem("ac_admin_token");
  localStorage.removeItem("ac_admin_user");
};

const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ac_admin_token");
};

const getStoredAdmin = (): IAdmin | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("ac_admin_user");
  return raw ? JSON.parse(raw) : null;
};

export const AuthApiService = {
  login,
  getProfile,
  saveAuthData,
  clearAuthData,
  getStoredToken,
  getStoredAdmin,
};
