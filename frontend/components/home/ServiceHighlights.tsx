// components/home/ServiceHighlights.tsx
// কেন? Home page এ API থেকে 3টি service দেখাবে।

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import ServiceCard from "@/components/services/ServiceCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function ServiceHighlights() {
  const { services, isLoading } = useServices();

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Our Services
            </h2>
            <p className="text-gray-500">
              Expert repair & maintenance for all your needs.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden sm:flex items-center gap-1 text-blue-600 font-semibold hover:gap-2 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((s) => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        )}

        <div className="sm:hidden text-center mt-8">
          <Link href="/services" className="btn-primary inline-block">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
