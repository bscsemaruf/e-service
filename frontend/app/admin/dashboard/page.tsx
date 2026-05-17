// // app/admin/dashboard/page.tsx — Dashboard Overview

// "use client";

// import { useAdminServices } from "@/hooks/useServices";
// import { useContacts } from "@/hooks/useContacts";
// import { Wrench, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

// export default function DashboardPage() {
//   const { services } = useAdminServices();
//   const { contacts, unreadCount } = useContacts();

//   const stats = [
//     {
//       label: "Total Services",
//       value: services.length,
//       icon: <Wrench className="w-6 h-6 text-blue-600" />,
//       bg: "bg-blue-50",
//     },
//     {
//       label: "Active Services",
//       value: services.filter((s) => s.isActive).length,
//       icon: <CheckCircle className="w-6 h-6 text-green-600" />,
//       bg: "bg-green-50",
//     },
//     {
//       label: "Total Messages",
//       value: contacts.length,
//       icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
//       bg: "bg-purple-50",
//     },
//     {
//       label: "Unread Messages",
//       value: unreadCount,
//       icon: <AlertCircle className="w-6 h-6 text-orange-600" />,
//       bg: "bg-orange-50",
//     },
//   ];

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">
//         Dashboard Overview
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         {stats.map((s) => (
//           <div key={s.label} className="card p-5">
//             <div
//               className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-4`}
//             >
//               {s.icon}
//             </div>
//             <p className="text-3xl font-bold text-gray-900">{s.value}</p>
//             <p className="text-sm text-gray-500 mt-1">{s.label}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useAdminServices } from "@/hooks/useServices";
import { useContacts } from "@/hooks/useContacts";
import { Wrench, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const { services } = useAdminServices();
  const { contacts, unreadCount } = useContacts();

  const stats = [
    {
      label: "Total Services",
      value: services.length,
      icon: <Wrench className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Active Services",
      value: services.filter((s) => s.isActive).length,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "Total Messages",
      value: contacts.length,
      icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50",
    },
    {
      label: "Unread Messages",
      value: unreadCount,
      icon: <AlertCircle className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-50",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Heres whats happening.
        </p>
      </div>

      {/* Stats Grid
          Mobile:  1 column
          Tablet:  2 columns
          Desktop: 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-4 md:p-5">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 ${s.bg} rounded-xl flex items-center justify-center mb-3 md:mb-4`}
            >
              {s.icon}
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {s.value}
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
