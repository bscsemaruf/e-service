// middleware/parseData.middleware.ts

import { Request, Response, NextFunction } from "express";

const parseData = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.data && typeof req.body.data === "string") {
    try {
      req.body = JSON.parse(req.body.data);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON in data field",
      });
    }
  }

  next();
};

export default parseData;
