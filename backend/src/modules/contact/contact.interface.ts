// src/modules/contact/contact.interface.ts

import { Document } from "mongoose";

export interface IContact extends Document {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface ICreateContactPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
}
