// src/modules/service/service.route.ts

import { Router } from "express";
import { ServiceController } from "./service.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/upload.middleware";
import {
  validateRequest,
  createServiceSchema,
  updateServiceSchema,
} from "./service.validation";
import parseData from "../../middleware/parseData.middleware";

const router = Router();

// ── Public Routes ──────────────────────────────────────
router.get("/", ServiceController.getAllServices);
router.get("/:id", ServiceController.getServiceById);

// ── Protected Routes (Admin only) ──────────────────────
router.get("/admin/all", authMiddleware, ServiceController.getAllServicesAdmin);

router.post(
  "/",
  // authMiddleware,
  upload.single("image"), // multer: 'image' নামে file
  (req, res, next) => {
    // DEBUG (temporary but important)
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    next();
  },
  parseData,
  validateRequest(createServiceSchema),
  ServiceController.createService,
);

router.patch(
  "/:id",
  authMiddleware,
  upload.single("image"),
  validateRequest(updateServiceSchema),
  ServiceController.updateService,
);

router.delete("/:id", authMiddleware, ServiceController.deleteService);

export default router;
