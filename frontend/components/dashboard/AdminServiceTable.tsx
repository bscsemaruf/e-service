// // components/dashboard/AdminServiceTable.tsx

// "use client";

// import Image from "next/image";
// import { Pencil, Trash2 } from "lucide-react";
// import LoadingSpinner from "@/components/shared/LoadingSpinner";
// import { IService } from "@/types";

// interface Props {
//   services: IService[];
//   isLoading: boolean;
//   onEdit: (service: IService) => void;
//   onDelete: (id: string) => void;
// }

// export default function AdminServiceTable({
//   services,
//   isLoading,
//   onEdit,
//   onDelete,
// }: Props) {
//   if (isLoading) return <LoadingSpinner />;

//   if (services.length === 0) {
//     return (
//       <div className="card p-12 text-center">
//         <p className="text-gray-500">
//           No services yet. Click Add Service to create one.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="card overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-50 border-b border-gray-100">
//           <tr>
//             <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Service
//             </th>
//             <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Category
//             </th>
//             <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Price
//             </th>
//             <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Status
//             </th>
//             <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100">
//           {services.map((service) => (
//             <tr
//               key={service._id}
//               className="hover:bg-gray-50 transition-colors"
//             >
//               <td className="px-5 py-4">
//                 <div className="flex items-center gap-3">
//                   <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
//                     {service.image ? (
//                       <Image
//                         src={service.image}
//                         alt={service.title}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-lg">
//                         ❄️
//                       </div>
//                     )}
//                   </div>
//                   <span className="font-medium text-gray-900 line-clamp-1">
//                     {service.title}
//                   </span>
//                 </div>
//               </td>
//               <td className="px-5 py-4">
//                 <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
//                   {service.category}
//                 </span>
//               </td>
//               <td className="px-5 py-4 font-semibold text-gray-900">
//                 ৳{service.price.toLocaleString()}
//               </td>
//               <td className="px-5 py-4">
//                 <span
//                   className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
//                     service.isActive
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-600"
//                   }`}
//                 >
//                   <span
//                     className={`w-1.5 h-1.5 rounded-full ${service.isActive ? "bg-green-500" : "bg-red-500"}`}
//                   />
//                   {service.isActive ? "Active" : "Inactive"}
//                 </span>
//               </td>
//               <td className="px-5 py-4">
//                 <div className="flex items-center justify-end gap-2">
//                   <button
//                     onClick={() => onEdit(service)}
//                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                   >
//                     <Pencil className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (confirm("Delete this service?"))
//                         onDelete(service._id);
//                     }}
//                     className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { IService } from "@/types";

interface Props {
  services: IService[];
  isLoading: boolean;
  onEdit: (service: IService) => void;
  onDelete: (id: string) => void;
}

export default function AdminServiceTable({
  services,
  isLoading,
  onEdit,
  onDelete,
}: Props) {
  if (isLoading) return <LoadingSpinner />;

  if (services.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-gray-500">
          No services yet. Click Add Service to create one.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ══════════════════════════════════════════
          MOBILE VIEW — Card Layout
          md (768px) এর নিচে দেখাবে
          ══════════════════════════════════════════ */}
      <div className="md:hidden space-y-3">
        {services.map((service) => (
          <div key={service._id} className="card p-4">
            {/* Top row: image + title + actions */}
            <div className="flex items-start justify-between gap-3 mb-3">
              {/* Image + Title */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl">
                      ❄️
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm line-clamp-1">
                    {service.title}
                  </p>
                  {/* Category badge */}
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onEdit(service)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete this service?")) onDelete(service._id);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom row: price + status */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Price</p>
                <p className="font-bold text-gray-900">
                  ৳{service.price.toLocaleString()}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                  service.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    service.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {service.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP VIEW — Table Layout
          md (768px+) তে দেখাবে
          ══════════════════════════════════════════ */}
      <div className="hidden md:block card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Service
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Category
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Price
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.map((service) => (
              <tr
                key={service._id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Service */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">
                          ❄️
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 line-clamp-1">
                      {service.title}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-4">
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                    {service.category}
                  </span>
                </td>

                {/* Price */}
                <td className="px-5 py-4 font-semibold text-gray-900">
                  ৳{service.price.toLocaleString()}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      service.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        service.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(service)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this service?"))
                          onDelete(service._id);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
