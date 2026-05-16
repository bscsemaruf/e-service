// src/modules/service/service.controller.ts
// =========================================================
// কেন? req → service → sendResponse। কোনো logic নেই।
// upload.single('image') multer middleware route এ থাকে।
// req.file = uploaded image (multer দেয়)।
// =========================================================

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceService } from "./service.service";

// GET /api/services  — public
const getAllServices = catchAsync(async (_req: Request, res: Response) => {
  const services = await ServiceService.getAllServices();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Services fetched successfully",
    data: services,
  });
});

// GET /api/services/admin  — protected
const getAllServicesAdmin = catchAsync(async (_req: Request, res: Response) => {
  const services = await ServiceService.getAllServicesForAdmin();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All services fetched",
    data: services,
  });
});

// GET /api/services/:id  — public
const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const service = await ServiceService.getServiceById(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service fetched successfully",
    data: service,
  });
});

// POST /api/services  — protected
const createService = catchAsync(async (req: Request, res: Response) => {
  // req.body = validated data (zod)
  // req.file = image file (multer)
  const service = await ServiceService.createService(req.body, req.file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Service created successfully",
    data: service,
  });
});

// PATCH /api/services/:id  — protected
const updateService = catchAsync(async (req: Request, res: Response) => {
  const service = await ServiceService.updateService(
    req.params.id as string,
    req.body,
    req.file,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service updated successfully",
    data: service,
  });
});

// DELETE /api/services/:id  — protected
const deleteService = catchAsync(async (req: Request, res: Response) => {
  await ServiceService.deleteService(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service deleted successfully",
    data: null,
  });
});

export const ServiceController = {
  getAllServices,
  getAllServicesAdmin,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
