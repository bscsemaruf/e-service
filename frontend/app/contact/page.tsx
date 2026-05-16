// app/contact/page.tsx — Contact Page

"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";
import { ContactApiService } from "@/services/contact.service";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await ContactApiService.submit(form);
      toast.success("Message sent! We will contact you soon. 😊");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto section-padding">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-500">Book a service or ask us anything.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <div className="space-y-5 mb-8">
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                label: "Phone",
                value: "+880 1700-000000",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                label: "Email",
                value: "info@coolfix.com",
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                label: "Address",
                value: "Dhaka, Bangladesh",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-2xl p-6">
            <p className="font-semibold text-blue-900 mb-1">⏰ Working Hours</p>
            <p className="text-blue-700 text-sm">
              Saturday – Thursday: 8 AM – 9 PM
            </p>
            <p className="text-blue-700 text-sm">Friday: 2 PM – 9 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="01XXXXXXXXX"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
                placeholder="Describe your problem..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
