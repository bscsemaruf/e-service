// types/service.types.ts

export type TCategory =
  | "AC Repair"
  | "AC Gas Refill"
  | "AC Installation"
  | "Refrigerator Repair"
  | "Freezer Repair"
  | "Home Appliance";

export interface IService {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: TCategory;
  image: string;
  imagePublicId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateServicePayload {
  title: string;
  description: string;
  price: number;
  category: TCategory;
  image?: File;
}

export interface IUpdateServicePayload extends Partial<ICreateServicePayload> {
  isActive?: boolean;
}
