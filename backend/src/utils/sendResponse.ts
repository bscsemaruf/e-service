// src/utils/sendResponse.ts
// =========================================================
// কেন? প্রতিটি API response এর shape একই রাখা জরুরি।
// Frontend সবসময় জানবে response এ কী আসবে।
// =========================================================

import { Response } from "express";

type TMeta = {
  total?: number;
  page?: number;
  limit?: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>): void => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;

// ব্যবহার দেখো Controller এ:
// sendResponse(res, {
//   statusCode: 200,
//   success: true,
//   message: 'Services fetched successfully',
//   data: services,
// });
