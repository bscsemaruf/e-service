// // hooks/useServices.ts
// // =========================================================
// // কেন? Service CRUD operations এক hook এ।
// // loading, error state automatically handle হয়।
// // =========================================================

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import toast from "react-hot-toast";
// import { ServiceApiService } from "@/services/service.service";
// import {
//   IService,
//   ICreateServicePayload,
//   IUpdateServicePayload,
// } from "@/types";

// // Public website এর জন্য (active services only)
// export const useServices = () => {
//   const [services, setServices] = useState<IService[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchServices = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await ServiceApiService.getAll();
//       setServices(data);
//     } catch {
//       setError("Failed to load services. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchServices();
//   }, [fetchServices]);

//   return { services, isLoading, error, refetch: fetchServices };
// };

// // Admin dashboard এর জন্য (সব services + CRUD)
// export const useAdminServices = () => {
//   const [services, setServices] = useState<IService[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMutating, setIsMutating] = useState(false);

//   const fetchServices = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const data = await ServiceApiService.getAllForAdmin();
//       setServices(data);
//     } catch {
//       toast.error("Failed to load services");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchServices();
//   }, [fetchServices]);

//   const createService = async (payload: ICreateServicePayload) => {
//     setIsMutating(true);
//     try {
//       const newService = await ServiceApiService.create(payload);
//       setServices((prev) => [newService, ...prev]);
//       toast.success("Service created successfully!");
//       return true;
//     } catch {
//       toast.error("Failed to create service");
//       return false;
//     } finally {
//       setIsMutating(false);
//     }
//   };

//   const updateService = async (id: string, payload: IUpdateServicePayload) => {
//     setIsMutating(true);
//     try {
//       const updated = await ServiceApiService.update(id, payload);
//       setServices((prev) => prev.map((s) => (s._id === id ? updated : s)));
//       toast.success("Service updated successfully!");
//       return true;
//     } catch {
//       toast.error("Failed to update service");
//       return false;
//     } finally {
//       setIsMutating(false);
//     }
//   };

//   const deleteService = async (id: string) => {
//     setIsMutating(true);
//     try {
//       await ServiceApiService.remove(id);
//       setServices((prev) => prev.filter((s) => s._id !== id));
//       toast.success("Service deleted successfully!");
//       return true;
//     } catch {
//       toast.error("Failed to delete service");
//       return false;
//     } finally {
//       setIsMutating(false);
//     }
//   };

//   return {
//     services,
//     isLoading,
//     isMutating,
//     createService,
//     updateService,
//     deleteService,
//     refetch: fetchServices,
//   };
// };

// hooks/useServices.ts

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { ServiceApiService } from "@/services/service.service";
import {
  IService,
  ICreateServicePayload,
  IUpdateServicePayload,
} from "@/types";

// ✅ Module level cache — component এর বাইরে
// এটা page refresh না হওয়া পর্যন্ত থাকে
// যেকোনো component এ useServices() call করলে
// এই cached data পাবে — API আর call হবে না
let cachedServices: IService[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 মিনিট cache

export const useServices = () => {
  const [services, setServices] = useState<IService[]>(cachedServices || []);
  const [isLoading, setIsLoading] = useState(!cachedServices);
  const [error, setError] = useState<string | null>(null);

  // ✅ useRef দিয়ে track করো fetch হয়েছে কিনা
  // re-render এ আবার fetch হবে না
  const hasFetched = useRef(false);

  const fetchServices = useCallback(async (force = false) => {
    // Cache valid থাকলে API call করো না
    const now = Date.now();
    const isCacheValid =
      cachedServices && cacheTime && now - cacheTime < CACHE_DURATION;

    if (isCacheValid && !force) {
      setServices(cachedServices!);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await ServiceApiService.getAll();
      // Cache এ save করো
      cachedServices = data;
      cacheTime = Date.now();
      setServices(data);
    } catch {
      setError("Failed to load services.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // ✅ একবারই fetch করো
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchServices();
    }
  }, [fetchServices]);

  return {
    services,
    isLoading,
    error,
    refetch: () => fetchServices(true),
  };
};

// Admin এর জন্য আলাদা hook — cache নেই
export const useAdminServices = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await ServiceApiService.getAllForAdmin();
      setServices(data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const createService = async (payload: ICreateServicePayload) => {
    setIsMutating(true);
    try {
      const newService = await ServiceApiService.create(payload);
      setServices((prev) => [newService, ...prev]);
      // Cache invalidate করো
      cachedServices = null;
      toast.success("Service created successfully!");
      return true;
    } catch {
      toast.error("Failed to create service");
      return false;
    } finally {
      setIsMutating(false);
    }
  };

  const updateService = async (id: string, payload: IUpdateServicePayload) => {
    setIsMutating(true);
    try {
      const updated = await ServiceApiService.update(id, payload);
      setServices((prev) => prev.map((s) => (s._id === id ? updated : s)));
      // Cache invalidate করো
      cachedServices = null;
      toast.success("Service updated successfully!");
      return true;
    } catch {
      toast.error("Failed to update service");
      return false;
    } finally {
      setIsMutating(false);
    }
  };

  const deleteService = async (id: string) => {
    setIsMutating(true);
    try {
      await ServiceApiService.remove(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      // Cache invalidate করো
      cachedServices = null;
      toast.success("Service deleted successfully!");
      return true;
    } catch {
      toast.error("Failed to delete service");
      return false;
    } finally {
      setIsMutating(false);
    }
  };

  return {
    services,
    isLoading,
    isMutating,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices,
  };
};
