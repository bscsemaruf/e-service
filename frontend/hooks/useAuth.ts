// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { AuthApiService } from "@/services/auth.service";
// import { IAdmin, ILoginPayload } from "@/types";

// // ✅ State একটাই object এ রাখো — multiple setState এড়াতে
// interface AuthState {
//   admin: IAdmin | null;
//   isAuthenticated: boolean;
//   isMounted: boolean;
// }

// export const useAuth = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ একটা state object এ সব রাখো
//   // এক setState call এ সব update হবে — cascading render নেই
//   const [authState, setAuthState] = useState<AuthState>({
//     admin: null,
//     isAuthenticated: false,
//     isMounted: false,
//   });

//   // ✅ Client mount হলে একবার setState — cascading নেই
//   useEffect(() => {
//     const storedAdmin = AuthApiService.getStoredAdmin();
//     const storedToken = AuthApiService.getStoredToken();

//     // একটা setState call এ সব update করো
//     setAuthState({
//       admin: storedAdmin ?? null,
//       isAuthenticated: !!(storedAdmin && storedToken),
//       isMounted: true,
//     });
//   }, []); // শুধু mount এ একবার চলবে

//   // LOGIN
//   const login = useCallback(
//     async (payload: ILoginPayload) => {
//       setIsLoading(true);
//       try {
//         const { token, admin: adminData } = await AuthApiService.login(payload);

//         // localStorage + Cookie তে save করো
//         AuthApiService.saveAuthData(token, adminData);

//         // একটা setState call এ সব update
//         setAuthState({
//           admin: adminData,
//           isAuthenticated: true,
//           isMounted: true,
//         });

//         toast.success(`Welcome back, ${adminData.name}!`);
//         router.replace("/admin/dashboard");
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

//     // একটা setState call এ সব reset
//     setAuthState({
//       admin: null,
//       isAuthenticated: false,
//       isMounted: true,
//     });

//     toast.success("Logged out successfully");
//     router.push("/admin/login");
//   }, [router]);

//   return {
//     admin: authState.admin,
//     isAuthenticated: authState.isAuthenticated,
//     isMounted: authState.isMounted,
//     isLoading,
//     login,
//     logout,
//   };
// };

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthApiService } from "@/services/auth.service";
import { IAdmin, ILoginPayload } from "@/types";

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ useState initializer function — useEffect দরকার নেই
  // শুধু client side এ একবার চলে, SSR এ চলে না
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

  // ✅ isMounted এর বদলে suppressHydrationWarning ব্যবহার করবো
  // layout.tsx এ দেখাবো
  const [isMounted, setIsMounted] = useState<boolean>(() => {
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
        setIsMounted(true);

        toast.success(`Welcome back, ${adminData.name}!`);
        router.replace("/admin/dashboard");
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
