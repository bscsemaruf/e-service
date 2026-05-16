// src/modules/service/service.service.ts
// =========================================================
// কেন? সব business logic এখানে।
// DB query + Cloudinary operation + error handling।
// Controller শুধু এই object এর method call করবে।
// =========================================================

import Service from "./service.model";
import {
  ICreateServicePayload,
  IService,
  IUpdateServicePayload,
} from "./service.interface";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "./service.utils";
import slugify from "slugify";

// সব active service (public website)
const getAllServices = async (): Promise<IService[]> => {
  return Service.find({ isActive: true }).sort({ createdAt: -1 });
};

// Admin এর জন্য সব service (inactive সহ)
const getAllServicesForAdmin = async (): Promise<IService[]> => {
  return Service.find().sort({ createdAt: -1 });
};

// একটি service এর details
const getServiceById = async (id: string): Promise<IService> => {
  const service = await Service.findById(id);

  if (!service) {
    const error = new Error("Service not found") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  return service;
};

// নতুন service তৈরি
const createService = async (
  payload: ICreateServicePayload,
  file?: Express.Multer.File,
): Promise<IService> => {
  let image = "";
  let imagePublicId = "";

  // Image আসলে Cloudinary তে upload করো
  if (file) {
    const uploaded = await uploadImageToCloudinary(file.buffer, file.mimetype);
    image = uploaded.url;
    imagePublicId = uploaded.publicId;
  }

  const service = await Service.create({
    ...payload,

    image,
    imagePublicId,
  });

  return service;
};

// Service update করো
const updateService = async (
  id: string,
  payload: IUpdateServicePayload,
  file?: Express.Multer.File,
): Promise<IService> => {
  const service = await Service.findById(id);

  if (!service) {
    const error = new Error("Service not found") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  // নতুন image এলে: পুরোনো delete করো, নতুন upload করো
  if (file) {
    await deleteImageFromCloudinary(service.imagePublicId);
    const uploaded = await uploadImageToCloudinary(file.buffer, file.mimetype);
    service.image = uploaded.url;
    service.imagePublicId = uploaded.publicId;
  }

  // বাকি fields update করো
  Object.assign(service, payload);
  await service.save();

  return service;
};

// Service delete করো
const deleteService = async (id: string): Promise<void> => {
  const service = await Service.findById(id);

  if (!service) {
    const error = new Error("Service not found") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  // Cloudinary থেকেও image delete করো
  await deleteImageFromCloudinary(service.imagePublicId);

  await Service.findByIdAndDelete(id);
};

export const ServiceService = {
  getAllServices,
  getAllServicesForAdmin,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
