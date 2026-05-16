// src/modules/contact/contact.controller.ts

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContactService } from "./contact.service";

// POST /api/contacts  — public
const createContact = catchAsync(async (req: Request, res: Response) => {
  const contact = await ContactService.createContact(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Message sent successfully! We will contact you soon.",
    data: contact,
  });
});

// GET /api/contacts  — protected
const getAllContacts = catchAsync(async (_req: Request, res: Response) => {
  const contacts = await ContactService.getAllContacts();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contacts fetched successfully",
    data: contacts,
  });
});

// PATCH /api/contacts/:id/read  — protected
const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const contact = await ContactService.markAsRead(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Marked as read",
    data: contact,
  });
});

// DELETE /api/contacts/:id  — protected
const deleteContact = catchAsync(async (req: Request, res: Response) => {
  await ContactService.deleteContact(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contact deleted successfully",
    data: null,
  });
});

// GET /api/contacts/unread-count  — protected
const getUnreadCount = catchAsync(async (_req: Request, res: Response) => {
  const count = await ContactService.getUnreadCount();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Unread count fetched",
    data: { count },
  });
});

export const ContactController = {
  createContact,
  getAllContacts,
  markAsRead,
  deleteContact,
  getUnreadCount,
};
