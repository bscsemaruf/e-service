// src/modules/contact/contact.route.ts

import { Router } from "express";
import { ContactController } from "./contact.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

// Public — customer form
router.post("/", ContactController.createContact);

// Protected — admin
router.get("/", authMiddleware, ContactController.getAllContacts);
router.get("/unread-count", authMiddleware, ContactController.getUnreadCount);
router.patch("/:id/read", authMiddleware, ContactController.markAsRead);
router.delete("/:id", authMiddleware, ContactController.deleteContact);

export default router;
