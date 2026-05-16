// components/services/ServiceGrid.tsx
// কেন? Services page এ grid layout এই component।

import ServiceCard from "./ServiceCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { IService } from "@/types";

interface ServiceGridProps {
  services: IService[];
  isLoading: boolean;
  error?: string | null;
}

export default function ServiceGrid({
  services,
  isLoading,
  error,
}: ServiceGridProps) {
  if (isLoading) return <LoadingSpinner text="Loading services..." />;

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl mb-4 block">😔</span>
        <p className="text-gray-500 text-lg">No services available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}
