// hooks/useContacts.ts

"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { ContactApiService } from "@/services/contact.service";
import { IContact } from "@/types";

export const useContacts = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const [data, count] = await Promise.all([
        ContactApiService.getAll(),
        ContactApiService.getUnreadCount(),
      ]);
      setContacts(data);
      setUnreadCount(count);
    } catch {
      toast.error("Failed to load contacts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const markAsRead = async (id: string) => {
    setIsMutating(true);
    try {
      const updated = await ContactApiService.markAsRead(id);
      setContacts((prev) => prev.map((c) => (c._id === id ? updated : c)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      toast.error("Failed to mark as read");
    } finally {
      setIsMutating(false);
    }
  };

  const deleteContact = async (id: string) => {
    setIsMutating(true);
    try {
      await ContactApiService.remove(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast.success("Contact deleted");
    } catch {
      toast.error("Failed to delete contact");
    } finally {
      setIsMutating(false);
    }
  };

  return {
    contacts,
    isLoading,
    isMutating,
    unreadCount,
    markAsRead,
    deleteContact,
    refetch: fetchContacts,
  };
};
