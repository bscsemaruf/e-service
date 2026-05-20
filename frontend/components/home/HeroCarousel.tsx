// components/home/HeroCarousel.tsx
// ✅ Carousel এর state এখানে isolated
// এই component re-render হলে HomePage re-render হবে না

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import hero1 from "@/public/images/a5.jpg";
import hero2 from "@/public/images/ac6.jpg";
import hero3 from "@/public/images/ac7.jpg";

const heroImages = [
  { src: hero1, alt: "AC Repair Service" },
  { src: hero2, alt: "Refrigerator Repair" },
  { src: hero3, alt: "Professional Technician" },
];

export default function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  // ✅ Auto slide — শুধু এই component এ state আছে
  // HomePage বা ServiceHighlights re-render হবে না
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden text-white min-h-[500px] md:min-h-[600px]">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/75 to-indigo-900/80" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            ⚡ Fast & Reliable Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Expert AC & Refrigerator{" "}
            <span className="text-cyan-300">Repair Service</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
            Professional repair, installation & maintenance for all AC brands
            and refrigerators. Certified technicians at your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all text-center shadow-lg hover:shadow-xl"
            >
              Book a Service Now
            </Link>
            <Link
              href="/services"
              className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all text-center backdrop-blur-sm"
            >
              View All Services
            </Link>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-3 mt-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentImage === index
                    ? "w-10 bg-white"
                    : "w-3 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
