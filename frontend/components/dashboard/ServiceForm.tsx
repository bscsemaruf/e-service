// components/dashboard/ServiceForm.tsx
// কেন? Create ও Edit দুটোতেই এই form কাজ করে।

"use client";

import { useRef } from "react";
import { X, Upload } from "lucide-react";
import { IService, TCategory } from "@/types";

const CATEGORIES: TCategory[] = [
  "AC Repair",
  "AC Gas Refill",
  "AC Installation",
  "Refrigerator Repair",
  "Freezer Repair",
  "Home Appliance",
];

interface ServiceFormProps {
  initialData: IService | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

export default function ServiceForm({
  initialData,
  onSubmit,
  onClose,
  isLoading,
}: ServiceFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900">
            {initialData ? "Edit Service" : "Add New Service"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Service Title *
            </label>
            <input
              name="title"
              defaultValue={initialData?.title}
              className="input-field"
              placeholder="e.g. AC Repair Service"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category *
            </label>
            <select
              name="category"
              defaultValue={initialData?.category}
              className="input-field"
              required
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Price (৳) *
            </label>
            <input
              name="price"
              type="number"
              min="0"
              defaultValue={initialData?.price}
              className="input-field"
              placeholder="1500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description *
            </label>
            <textarea
              name="description"
              defaultValue={initialData?.description}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe the service..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Service Image {!initialData && "*"}
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                Click to upload image
              </span>
              <span className="text-xs text-gray-400 mt-1">
                JPG, PNG, WEBP (max 5MB)
              </span>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                required={!initialData}
              />
            </label>
            {initialData?.image && (
              <p className="text-xs text-gray-500 mt-1">
                ✅ Current image exists. Upload new to replace.
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1"
            >
              {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
