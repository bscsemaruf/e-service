// "use client";

// import { useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { AuthApiService } from "@/services/auth.service";
// import { IAdmin, ILoginPayload } from "@/types";
// import { useEffect } from "react";

// export const useAuth = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ useState initializer function — useEffect দরকার নেই
//   // শুধু client side এ একবার চলে, SSR এ চলে না
//   const [admin, setAdmin] = useState<IAdmin | null>(() => {
//     if (typeof window === "undefined") return null;
//     return AuthApiService.getStoredAdmin();
//   });

//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//     if (typeof window === "undefined") return false;
//     return !!(
//       AuthApiService.getStoredToken() && AuthApiService.getStoredAdmin()
//     );
//   });

//   useEffect(() => {
//     const verifyAuth = async () => {
//       try {
//         const adminData = await AuthApiService.getProfile();

//         setAdmin(adminData);
//         setIsAuthenticated(true);
//       } catch {
//         AuthApiService.clearAuthData();

//         setAdmin(null);
//         setIsAuthenticated(false);
//       }
//     };

//     verifyAuth();
//   }, []);

//   // ✅ isMounted এর বদলে suppressHydrationWarning ব্যবহার করবো
//   // layout.tsx এ দেখাবো
//   const [isMounted, setIsMounted] = useState<boolean>(() => {
//     return typeof window !== "undefined";
//   });

//   // LOGIN
//   const login = useCallback(
//     async (payload: ILoginPayload) => {
//       setIsLoading(true);
//       try {
//         const { token, admin: adminData } = await AuthApiService.login(payload);

//         AuthApiService.saveAuthData(token, adminData);

//         setAdmin(adminData);
//         setIsAuthenticated(true);
//         setIsMounted(true);

//         toast.success(`Welcome back, ${adminData.name}!`);
//         router.push("/admin/dashboard");
//       } catch (err: unknown) {
//         const axiosError = err as {
//           response?: { data?: { message?: string } };
//         };
//         const message =
//           axiosError.response?.data?.message ||
//           (err instanceof Error ? err.message : "Login failed.");
//         toast.error(message);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [router],
//   );

//   // LOGOUT
//   const logout = useCallback(() => {
//     AuthApiService.clearAuthData();
//     setAdmin(null);
//     setIsAuthenticated(false);
//     toast.success("Logged out successfully");
//     router.push("/admin/login");
//   }, [router]);

//   return {
//     admin,
//     isAuthenticated,
//     isMounted,
//     isLoading,
//     login,
//     logout,
//   };
// };

"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthApiService } from "@/services/auth.service";
import { IAdmin, ILoginPayload } from "@/types";

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ localStorage থেকে initial state নাও
  // useEffect বা verifyAuth() দরকার নেই
  // verifyAuth ছিল বলেই বারবার API call হচ্ছিল
  const [admin, setAdmin] = useState<IAdmin | null>(() => {
    if (typeof window === "undefined") return null;
    return AuthApiService.getStoredAdmin();
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!(
      AuthApiService.getStoredToken() && AuthApiService.getStoredAdmin()
    );
  });

  const [isMounted] = useState<boolean>(() => {
    return typeof window !== "undefined";
  });

  // LOGIN
  const login = useCallback(
    async (payload: ILoginPayload) => {
      setIsLoading(true);
      try {
        const { token, admin: adminData } = await AuthApiService.login(payload);

        AuthApiService.saveAuthData(token, adminData);

        setAdmin(adminData);
        setIsAuthenticated(true);

        toast.success(`Welcome back, ${adminData.name}!`);
        router.push("/admin/dashboard");
      } catch (err: unknown) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        const message =
          axiosError.response?.data?.message ||
          (err instanceof Error ? err.message : "Login failed.");
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  // LOGOUT
  const logout = useCallback(() => {
    AuthApiService.clearAuthData();
    setAdmin(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    router.push("/admin/login");
  }, [router]);

  return {
    admin,
    isAuthenticated,
    isMounted,
    isLoading,
    login,
    logout,
  };
};
