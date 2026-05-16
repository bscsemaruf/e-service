// import Link from "next/link";
// import { CheckCircle, Phone, Clock, Shield } from "lucide-react";
// import ServiceHighlights from "@/components/home/ServiceHighlights";

// const features = [
//   {
//     icon: <Shield className="w-6 h-6 text-blue-600" />,
//     title: "100% Genuine Parts",
//     desc: "We use only certified and original spare parts.",
//   },
//   {
//     icon: <Clock className="w-6 h-6 text-blue-600" />,
//     title: "Same Day Service",
//     desc: "Quick response within 2-4 hours of booking.",
//   },
//   {
//     icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
//     title: "1 Year Warranty",
//     desc: "All repairs come with a 1-year service warranty.",
//   },
//   {
//     icon: <Phone className="w-6 h-6 text-blue-600" />,
//     title: "24/7 Support",
//     desc: "Our team is available round the clock for help.",
//   },
// ];
// export default function HomePage() {
//   return (
//     <>
//       {/* ── Hero Section ─────────────────────────────────── */}
//       <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
//           <div className="max-w-3xl">
//             <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
//               ⚡ Fast & Reliable Service
//             </span>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//               Expert AC & Refrigerator{" "}
//               <span className="text-cyan-300">Repair Service</span>
//             </h1>
//             <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
//               Professional repair, installation & maintenance for all AC brands
//               and refrigerators. Certified technicians at your doorstep.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link
//                 href="/contact"
//                 className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all text-center shadow-lg hover:shadow-xl"
//               >
//                 Book a Service Now
//               </Link>
//               <Link
//                 href="/services"
//                 className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all text-center"
//               >
//                 View All Services
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Features Section ────────────────────────────── */}
//       <section className="section-padding bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-3">
//               Why Choose CoolFix?
//             </h2>
//             <p className="text-gray-500 max-w-xl mx-auto">
//               We provide the best service experience with quality and
//               affordability.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map((f) => (
//               <div
//                 key={f.title}
//                 className="card p-6 hover:shadow-md transition-shadow"
//               >
//                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
//                   {f.icon}
//                 </div>
//                 <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
//                 <p className="text-gray-500 text-sm leading-relaxed">
//                   {f.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Service Highlights (fetches from API) ──────── */}
//       <ServiceHighlights />

//       {/* ── CTA Section ─────────────────────────────────── */}
//       <section className="bg-blue-600 text-white section-padding">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to Fix Your AC or Refrigerator?
//           </h2>
//           <p className="text-blue-100 mb-8 text-lg">
//             Contact us now and get a free estimate. Same day service available!
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/contact"
//               className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all shadow-lg"
//             >
//               Get Free Estimate
//             </Link>

//             <a
//               href="tel:+8801700000000"
//               className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
//             >
//               <Phone className="w-5 h-5" />
//               Call Now
//             </a>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { CheckCircle, Phone, Clock, Shield } from "lucide-react";

import ServiceHighlights from "@/components/home/ServiceHighlights";

// ✅ Local Images
import hero1 from "@/public/images/ac5.avif";
import hero2 from "@/public/images/ac6.jpg";
import hero3 from "@/public/images/ac7.jpg";

const heroImages = [hero1, hero2, hero3];

const features = [
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: "100% Genuine Parts",
    desc: "We use only certified and original spare parts.",
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    title: "Same Day Service",
    desc: "Quick response within 2-4 hours of booking.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    title: "1 Year Warranty",
    desc: "All repairs come with a 1-year service warranty.",
  },
  {
    icon: <Phone className="w-6 h-6 text-blue-600" />,
    title: "24/7 Support",
    desc: "Our team is available round the clock for help.",
  },
];

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  // ✅ Auto Slide Every 15 Seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative overflow-hidden text-white">
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
                src={image}
                alt={`Hero Image ${index + 1}`}
                fill
                priority
                className="object-cover"
              />

              {/* Overlay */}
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
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentImage === index ? "w-10 bg-white" : "w-3 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ────────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose CoolFix?
            </h2>

            <p className="text-gray-500 max-w-xl mx-auto">
              We provide the best service experience with quality and
              affordability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Highlights ─────────────────────────── */}
      <ServiceHighlights />

      {/* ── CTA Section ─────────────────────────────────── */}
      <section className="bg-blue-600 text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Fix Your AC or Refrigerator?
          </h2>

          <p className="text-blue-100 mb-8 text-lg">
            Contact us now and get a free estimate. Same day service available!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all shadow-lg"
            >
              Get Free Estimate
            </Link>

            <a
              href="tel:+8801700000000"
              className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
