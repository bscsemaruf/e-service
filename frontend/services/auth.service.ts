import axiosInstance from "./axios";
import { IApiResponse, IAuthResponse, ILoginPayload, IAdmin } from "@/types";

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

// ── LocalStorage + Cookie helper ────────────────────────
// Cookie: middleware পড়তে পারে (server-side)
// localStorage: client-side এ token access করতে পারে

const saveAuthData = (token: string, admin: IAdmin): void => {
  // localStorage এ save করো
  localStorage.setItem("ac_admin_token", token);
  localStorage.setItem("ac_admin_user", JSON.stringify(admin));

  // Cookie তেও save করো — middleware এর জন্য
  document.cookie = `ac_admin_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
};

const clearAuthData = (): void => {
  // localStorage clear করো
  localStorage.removeItem("ac_admin_token");
  localStorage.removeItem("ac_admin_user");

  // Cookie delete করো
  document.cookie = "ac_admin_token=; path=/; max-age=0";
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
