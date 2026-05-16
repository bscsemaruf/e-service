// src/modules/contact/contact.service.ts

import Contact from "./contact.model";
import { IContact, ICreateContactPayload } from "./contact.interface";

const createContact = async (
  payload: ICreateContactPayload,
): Promise<IContact> => {
  return Contact.create(payload);
};

const getAllContacts = async (): Promise<IContact[]> => {
  return Contact.find().sort({ createdAt: -1 });
};

const markAsRead = async (id: string): Promise<IContact> => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true },
  );
  if (!contact) {
    const error = new Error("Contact not found") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }
  return contact;
};

const deleteContact = async (id: string): Promise<void> => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    const error = new Error("Contact not found") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }
};

const getUnreadCount = async (): Promise<number> => {
  return Contact.countDocuments({ isRead: false });
};

export const ContactService = {
  createContact,
  getAllContacts,
  markAsRead,
  deleteContact,
  getUnreadCount,
};
