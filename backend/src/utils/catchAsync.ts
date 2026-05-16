// src/utils/catchAsync.ts
// =========================================================
// কেন? প্রতিটি async controller এ try/catch লেখা repetitive।
// এই wrapper দিলে error automatically next(error) এ যায়।
// Global error handler সেটা ধরবে।
// =========================================================

import { Request, Response, NextFunction, RequestHandler } from "express";

const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
