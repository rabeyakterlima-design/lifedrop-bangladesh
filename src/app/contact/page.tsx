"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare
} from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0878D1] text-xs font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>24/7 National Support</span>
          </div>
          <h1 className="text-3xl font-black text-[#073B75]">
            Contact LifeDrop Bangladesh
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Need emergency assistance, wish to partner as a hospital, or have administrative questions? Reach out to our national team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <div className="md:col-span-5 bg-[#073B75] text-white rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold">Direct Channels</h2>
              <p className="text-xs text-blue-200 mt-1">
                Our national dispatch center operates around the clock.
              </p>
            </div>

            <div className="space-y-4 text-xs text-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5 text-[#E53945]" />
                </div>
                <div>
                  <span className="block text-[10px] text-blue-300 font-bold uppercase">National Hotline</span>
                  <span className="font-bold text-white text-sm">+880 9612-000000</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-[10px] text-blue-300 font-bold uppercase">Email Support</span>
                  <span className="font-bold text-white">support@lifedrop.bd</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <span className="block text-[10px] text-blue-300 font-bold uppercase">Headquarters</span>
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-800 text-[11px] text-blue-200">
              <p>For urgent medical blood transfusions, always coordinate directly with the attending hospital medical officers.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-slate-800">Message Delivered!</h3>
                <p className="text-xs text-slate-500">
                  Our coordinator team will review your inquiry and follow up via phone or email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1..."
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message / Inquiry *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry, regional partnership request, or feedback..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl font-bold text-xs text-white bg-[#0878D1] hover:bg-[#073B75] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
