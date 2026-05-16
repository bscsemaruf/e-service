// src/modules/service/service.interface.ts

import { Document } from "mongoose";

export type TCategory =
  | "AC Repair"
  | "AC Gas Refill"
  | "AC Installation"
  | "Refrigerator Repair"
  | "Freezer Repair"
  | "Home Appliance";

export interface IService extends Document {
  id: string;
  title: string;
  description: string;
  price: number;
  category: TCategory;
  image: string;
  imagePublicId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateServicePayload {
  title: string;
  description: string;
  price: number;
  category: TCategory;
}

export interface IUpdateServicePayload extends Partial<ICreateServicePayload> {
  isActive?: boolean;
}
