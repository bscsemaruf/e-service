// services/contact.service.ts

import axiosInstance from "./axios";
import { IApiResponse, IContact, ICreateContactPayload } from "@/types";

const submit = async (payload: ICreateContactPayload): Promise<IContact> => {
  const { data } = await axiosInstance.post<IApiResponse<IContact>>(
    "/contacts",
    payload,
  );
  return data.data;
};

const getAll = async (): Promise<IContact[]> => {
  const { data } =
    await axiosInstance.get<IApiResponse<IContact[]>>("/contacts");
  return data.data;
};

const markAsRead = async (id: string): Promise<IContact> => {
  const { data } = await axiosInstance.patch<IApiResponse<IContact>>(
    `/contacts/${id}/read`,
  );
  return data.data;
};

const remove = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/contacts/${id}`);
};

const getUnreadCount = async (): Promise<number> => {
  const { data } = await axiosInstance.get<IApiResponse<{ count: number }>>(
    "/contacts/unread-count",
  );
  return data.data.count;
};

export const ContactApiService = {
  submit,
  getAll,
  markAsRead,
  remove,
  getUnreadCount,
};
