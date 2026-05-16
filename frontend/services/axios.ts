// services/axios.ts
// =========================================================
// কেন? Configured Axios instance।
// Base URL, token auto-attach, error handling এখানে।
// সব service এই instance use করবে।
// =========================================================

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ─────────────────────────────────
// প্রতিটি request এর আগে token auto-attach করো
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage থেকে token নাও
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("ac_admin_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────
// 401 আসলে logout করো (token expire)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("ac_admin_token");
        localStorage.removeItem("ac_admin_user");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
