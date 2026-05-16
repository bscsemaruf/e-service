// hooks/useServices.ts
// =========================================================
// কেন? Service CRUD operations এক hook এ।
// loading, error state automatically handle হয়।
// =========================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { ServiceApiService } from "@/services/service.service";
import {
  IService,
  ICreateServicePayload,
  IUpdateServicePayload,
} from "@/types";

// Public website এর জন্য (active services only)
export const useServices = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ServiceApiService.getAll();
      setServices(data);
    } catch {
      setError("Failed to load services. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, isLoading, error, refetch: fetchServices };
};

// Admin dashboard এর জন্য (সব services + CRUD)
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
