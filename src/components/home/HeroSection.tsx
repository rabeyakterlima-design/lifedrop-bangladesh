"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Search, ArrowRight, ShieldCheck, Activity } from "lucide-react";

export function HeroSection() {
  const { language, t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-white to-[#F8FAFC] pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-200">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-red-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E53945] text-xs sm:text-sm font-semibold tracking-wide">
              <Heart className="w-4 h-4 fill-[#E53945]" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#073B75] tracking-tight leading-[1.15]">
              {language === "bn" ? (
                <>
                  রক্ত দিন, <span className="text-[#E53945]">জীবন বাঁচান।</span>
                </>
              ) : (
                <>
                  Donate Blood, <span className="text-[#E53945]">Save Lives.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/find-donors"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#E53945] hover:bg-red-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Search className="w-5 h-5" />
                <span>{t.hero.findDonorBtn}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href="/become-donor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[#073B75] bg-white border-2 border-[#0878D1]/30 hover:border-[#0878D1] hover:bg-blue-50/50 shadow-sm transition-all duration-200"
              >
                <Heart className="w-5 h-5 text-[#0878D1]" />
                <span>{t.hero.registerDonorBtn}</span>
              </Link>

              <Link
                href="/blood-requests/new"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-slate-700 hover:text-[#E53945] hover:bg-red-50/50 transition-all text-sm"
              >
                <Activity className="w-4 h-4 text-[#E53945]" />
                <span>{t.hero.emergencyRequestBtn}</span>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span>{language === "bn" ? "১০০% যাচাইকৃত রক্তদাতা প্রোফাইল" : "100% Verified Donor Records"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0878D1]" />
                <span>{language === "bn" ? "প্রাইভেসি-সংরক্ষিত কনসেন্ট সিস্টেম" : "Privacy-Preserving Contact"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span>{language === "bn" ? "৮ বিভাগ ও ৬৪ জেলা নেটওয়ার্ক" : "Nationwide 64 Districts Coverage"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic with Blood Drop & Heartbeat */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-white to-blue-50 rounded-3xl p-8 shadow-xl border border-blue-100 flex flex-col items-center justify-center text-center">
              {/* Outer Pulsing Aura */}
              <div className="absolute inset-0 rounded-3xl bg-radial from-red-500/10 via-transparent to-transparent pointer-events-none animate-pulse" />

              {/* Big Red Blood Drop Graphic */}
              <div className="relative z-10 w-36 h-48 bg-gradient-to-b from-[#E53945] to-[#B91C1C] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] flex items-center justify-center shadow-2xl shadow-red-500/30">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
                  <Heart className="w-12 h-12 text-white fill-white animate-bounce" />
                </div>
              </div>

              {/* Heartbeat Waveform badge */}
              <div className="mt-6 z-10 bg-white px-5 py-2.5 rounded-full shadow-md border border-slate-200 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E53945]" />
                </span>
                <span className="text-xs font-bold text-[#073B75]">
                  {language === "bn" ? "এক ফোঁটা রক্ত, বাঁচুক একটি প্রাণ" : "Every Drop Saves a Life"}
                </span>
              </div>

              {/* Floating Emergency card indicator */}
              <div className="absolute -bottom-4 -left-4 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{language === "bn" ? "ডিজিটাল আইডি" : "Digital ID"}</p>
                  <p className="text-xs font-bold text-slate-800">QR Code Verified</p>
                </div>
              </div>

              {/* Floating Active District indicator */}
              <div className="absolute -top-4 -right-4 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878D1] flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{language === "bn" ? "সারাদেশে কভারেজ" : "Coverage"}</p>
                  <p className="text-xs font-bold text-slate-800">64 Districts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
