"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Tag, Phone } from "lucide-react";

import { ServiceApiService } from "@/services/service.service";
import { IService } from "@/types";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [service, setService] = useState<IService | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("params", id);

  useEffect(() => {
    ServiceApiService.getById(id)
      .then(setService)
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  if (!service) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-xl">Service not found.</p>

        <Link href="/services" className="btn-primary inline-block mt-4">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto section-padding">
      <Link
        href="/services"
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Services
      </Link>

      <div className="card overflow-hidden">
        <div className="relative h-72 md:h-96 bg-gray-100">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
              <span className="text-8xl">❄️</span>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            <Tag className="w-3.5 h-3.5" />
            {service.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {service.title}
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t pt-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Starting from</p>

              <p className="text-4xl font-bold text-blue-600">
                ৳{service.price.toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/contact"
                className="btn-primary flex items-center gap-2"
              >
                Book Now
              </Link>

              <a
                href="tel:+8801700000000"
                className="btn-secondary flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
