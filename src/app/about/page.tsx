"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, ShieldCheck, Users, MapPin, Award, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0878D1] text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-[#0878D1]" />
            <span>{language === "bn" ? "আমাদের লক্ষ্য ও দৃষ্টিভঙ্গি" : "Our National Mission"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#073B75] tracking-tight">
            LifeDrop Bangladesh
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto italic">
            “Every Drop. Every Life. Every Connection.”
            <br />
            “এক ফোঁটা রক্ত, বাঁচুক একটি প্রাণ।”
          </p>
        </div>

        {/* Story & Mission Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-[#073B75]">
            Bridging Bangladesh’s Blood Demand Gap
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            In Bangladesh, an estimated 800,000 to 1,000,000 units of blood are required annually for surgical procedures, emergency accident victims, childbirth complications, thalassemia patients, and oncological treatments. Despite thousands of willing voluntary donors, the critical bottleneck has always been rapid coordination, geographical discoverability, and reliable verification.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>LifeDrop Bangladesh</strong> is engineered as a national digital utility to unite blood donors, patients, accredited hospitals, regional coordinators, and non-profit blood clubs across all <strong>8 divisions and 64 districts</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
              <span className="block text-2xl font-black text-[#0878D1]">64</span>
              <span className="text-xs font-bold text-slate-700">Districts Covered</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
              <span className="block text-2xl font-black text-[#16A34A]">100%</span>
              <span className="text-xs font-bold text-slate-700">Verified Audit Records</span>
            </div>
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-100 text-center">
              <span className="block text-2xl font-black text-[#E53945]">24/7</span>
              <span className="text-xs font-bold text-slate-700">Emergency Dispatch</span>
            </div>
          </div>
        </div>

        {/* Governance & Core Values */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-[#073B75]">
            Core Principles & Governance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>100% Non-Commercial & Voluntary</span>
              </div>
              <p className="leading-relaxed">
                LifeDrop Bangladesh is strictly non-profit and civic. Voluntary blood donation is a humanitarian duty. No sale or commercial exploitation of blood is tolerated.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#0878D1]" />
                <span>Privacy by Default</span>
              </div>
              <p className="leading-relaxed">
                Donor personal mobile numbers and exact addresses are protected through a double opt-in consent gate to prevent harassment, data harvesting, and marketing misuse.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#073B75]" />
                <span>Two-Phase Medical Verification</span>
              </div>
              <p className="leading-relaxed">
                Donation counters cannot be manually altered. All donation records require medical hospital slip validation by certified regional coordinators.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#E53945]" />
                <span>Cryptographic QR Identity</span>
              </div>
              <p className="leading-relaxed">
                Universal digital ID cards carry tamper-evident tokens allowing public offline and online verification at hospitals without exposing private data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
