// app/admin/dashboard/contacts/page.tsx

"use client";

import { Mail, Trash2, Check } from "lucide-react";
import { useContacts } from "@/hooks/useContacts";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminContactsPage() {
  const { contacts, isLoading, markAsRead, deleteContact } = useContacts();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Customer Messages
      </h1>

      {contacts.length === 0 ? (
        <div className="card p-12 text-center">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`card p-5 border-l-4 transition-all ${
                contact.isRead
                  ? "border-l-gray-200"
                  : "border-l-blue-500 bg-blue-50/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-gray-900">{contact.name}</p>
                    {!contact.isRead && (
                      <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <span>📞 {contact.phone}</span>
                    <span>✉️ {contact.email}</span>
                    <span>
                      🕒{" "}
                      {new Date(contact.createdAt).toLocaleDateString("en-BD")}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3">
                    {contact.message}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!contact.isRead && (
                    <button
                      onClick={() => markAsRead(contact._id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm("Delete this message?"))
                        deleteContact(contact._id);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
