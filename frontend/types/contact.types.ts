// types/contact.types.ts

export interface IContact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ICreateContactPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
}
