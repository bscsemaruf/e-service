// // app/admin/dashboard/services/page.tsx — Manage Services

// "use client";

// import { useState } from "react";
// import { Plus } from "lucide-react";
// import { useAdminServices } from "@/hooks/useServices";
// import ServiceForm from "@/components/dashboard/ServiceForm";
// import AdminServiceTable from "@/components/dashboard/AdminServiceTable";
// import { IService } from "@/types";

// export default function AdminServicesPage() {
//   const {
//     services,
//     isLoading,
//     isMutating,
//     createService,
//     updateService,
//     deleteService,
//   } = useAdminServices();

//   const [showForm, setShowForm] = useState(false);
//   const [editingService, setEditingService] = useState<IService | null>(null);

//   const handleEdit = (service: IService) => {
//     setEditingService(service);
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setEditingService(null);
//   };

//   const handleSubmit = async (formData: FormData) => {
//     const payload = {
//       title: formData.get("title") as string,
//       description: formData.get("description") as string,
//       price: Number(formData.get("price")),
//       category: formData.get("category") as IService["category"],
//       image: (formData.get("image") as File) || undefined,
//     };

//     let success = false;
//     if (editingService) {
//       success = await updateService(editingService._id, payload);
//     } else {
//       success = await createService(payload);
//     }

//     if (success) handleCloseForm();
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="btn-primary flex items-center gap-2"
//         >
//           <Plus className="w-4 h-4" /> Add Service
//         </button>
//       </div>

//       {/* Service Form Modal */}
//       {showForm && (
//         <ServiceForm
//           initialData={editingService}
//           onSubmit={handleSubmit}
//           onClose={handleCloseForm}
//           isLoading={isMutating}
//         />
//       )}

//       {/* Services Table */}
//       <AdminServiceTable
//         services={services}
//         isLoading={isLoading}
//         onEdit={handleEdit}
//         onDelete={deleteService}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useAdminServices } from "@/hooks/useServices";
import ServiceForm from "@/components/dashboard/ServiceForm";
import AdminServiceTable from "@/components/dashboard/AdminServiceTable";
import { IService } from "@/types";

export default function AdminServicesPage() {
  const {
    services,
    isLoading,
    isMutating,
    createService,
    updateService,
    deleteService,
  } = useAdminServices();

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);

  const handleEdit = (service: IService) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingService(null);
  };

  const handleSubmit = async (formData: FormData) => {
    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as IService["category"],
      image: (formData.get("image") as File) || undefined,
    };

    let success = false;
    if (editingService) {
      success = await updateService(editingService._id, payload);
    } else {
      success = await createService(payload);
    }

    if (success) handleCloseForm();
  };

  return (
    <div>
      {/* Header
          Mobile:  stack করো
          Desktop: side by side */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Manage Services
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {services.length} total services
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <ServiceForm
          initialData={editingService}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isLoading={isMutating}
        />
      )}

      {/* Services Table */}
      <AdminServiceTable
        services={services}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={deleteService}
      />
    </div>
  );
}
