// components/services/ServiceCard.tsx
// কেন? Service list এ প্রতিটি card এই component।
// Services page ও Home page দুটোতেই ব্যবহার হবে।

import Image from "next/image";
import Link from "next/link";
// import { TbCurrencyTaka } from "react-icons/tb";
// import { ArrowRight, Tag } from "luc__ide-react";
import { IService } from "@/types";
import { ArrowRight, Tag } from "lucide-react";

interface ServiceCardProps {
  service: IService;
}

const CATEGORY_COLORS: Record<string, string> = {
  "AC Repair": "bg-blue-100 text-blue-700",
  "AC Gas Refill": "bg-cyan-100 text-cyan-700",
  "AC Installation": "bg-indigo-100 text-indigo-700",
  "Refrigerator Repair": "bg-teal-100 text-teal-700",
  "Freezer Repair": "bg-sky-100 text-sky-700",
  "Home Appliance": "bg-purple-100 text-purple-700",
};

export default function ServiceCard({ service }: ServiceCardProps) {
  console.log("service", service);
  return (
    <div className="card group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-h__idden">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <span className="text-5xl">❄️</span>
          </div>
        )}
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
            CATEGORY_COLORS[service.category] || "bg-gray-100 text-gray-700"
          }`}
        >
          <Tag className="w-3 h-3" />
          {service.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 font-bold text-blue-600 text-lg">
            <span>৳</span>
            <span>{service.price.toLocaleString()}</span>
          </div>
          <Link
            href={`/services/${service._id}`}
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
