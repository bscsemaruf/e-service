// services/service.service.ts
// =========================================================
// কেন? সব Service API calls এক জায়গায়।
// FormData তৈরি এখানেই করো (image upload এর জন্য)।
// =========================================================

import axiosInstance from "./axios";
import {
  IApiResponse,
  IService,
  ICreateServicePayload,
  IUpdateServicePayload,
} from "@/types";

const getAll = async (): Promise<IService[]> => {
  const { data } =
    await axiosInstance.get<IApiResponse<IService[]>>("/services");
  return data.data;
};

const getAllForAdmin = async (): Promise<IService[]> => {
  const { data } = await axiosInstance.get<IApiResponse<IService[]>>(
    "/services/admin/all",
  );
  return data.data;
};

const getById = async (id: string): Promise<IService> => {
  const { data } = await axiosInstance.get<IApiResponse<IService>>(
    `/services/${id}`,
  );
  return data.data;
};

const create = async (payload: ICreateServicePayload): Promise<IService> => {
  // Image upload এর জন্য FormData দরকার
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("price", payload.price.toString());
  formData.append("category", payload.category);
  if (payload.image) {
    formData.append("image", payload.image);
  }

  const { data } = await axiosInstance.post<IApiResponse<IService>>(
    "/services",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data.data;
};

const update = async (
  id: string,
  payload: IUpdateServicePayload,
): Promise<IService> => {
  const formData = new FormData();
  if (payload.title) formData.append("title", payload.title);
  if (payload.description) formData.append("description", payload.description);
  if (payload.price !== undefined)
    formData.append("price", payload.price.toString());
  if (payload.category) formData.append("category", payload.category);
  if (payload.image) formData.append("image", payload.image);
  if (payload.isActive !== undefined)
    formData.append("isActive", payload.isActive.toString());

  const { data } = await axiosInstance.patch<IApiResponse<IService>>(
    `/services/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data.data;
};

const remove = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/services/${id}`);
};

export const ServiceApiService = {
  getAll,
  getAllForAdmin,
  getById,
  create,
  update,
  remove,
};
