// hooks/useAuth.ts
// =========================================================
// কেন? Login, logout, auth state — সব এক hook এ।
// যেকোনো component এ useAuth() call করলেই সব পাবে।
// =========================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthApiService } from "@/services/auth.service";
import { IAdmin, ILoginPayload } from "@/types";

export const useAuth = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<IAdmin | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Page load এ localStorage থেকে auth state restore করো
  useEffect(() => {
    const token = AuthApiService.getStoredToken();
    const storedAdmin = AuthApiService.getStoredAdmin();

    if (token && storedAdmin) {
      setAdmin(storedAdmin);
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(
    async (payload: ILoginPayload) => {
      setIsLoading(true);
      try {
        const { token, admin: adminData } = await AuthApiService.login(payload);

        // localStorage এ save করো
        AuthApiService.saveAuthData(token, adminData);

        // State update করো
        setAdmin(adminData);
        setIsAuthenticated(true);

        toast.success(`Welcome back, ${adminData.name}!`);
        router.push("/admin/dashboard");
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Login failed. Try again.";
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        toast.error(axiosError.response?.data?.message || message);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const logout = useCallback(() => {
    AuthApiService.clearAuthData();
    setAdmin(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    router.push("/admin/login");
  }, [router]);

  return { admin, isAuthenticated, isLoading, login, logout };
};
