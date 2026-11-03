"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Heart, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileCheck,
  ShieldCheck
} from "lucide-react";

export default function GuidelinesPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#16A34A] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "স্বাস্থ্য ও ক্লিনিক্যাল নির্দেশিকা" : "DGHS & WHO Standards"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#073B75] tracking-tight">
            {language === "bn" ? "রক্তদানের নিয়মাবলী ও যোগ্যতা" : "Blood Donation Guidelines"}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Official health criteria in accordance with the Directorate General of Health Services (DGHS) Bangladesh and the World Health Organization.
          </p>
        </div>

        {/* 1. Who is Eligible */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#073B75]">
              Eligibility Criteria (কে রক্ত দিতে পারবেন)
            </h2>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-2 shrink-0" />
              <span><strong>Age:</strong> Between 18 and 60 years of age. (১৮ থেকে ৬০ বছর বয়স)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-2 shrink-0" />
              <span><strong>Weight:</strong> Minimum 45 kg for females and 48-50 kg for males. (ন্যূনতম ৪৫ কেজি)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-2 shrink-0" />
              <span><strong>Hemoglobin:</strong> Minimum 12.0 g/dL for females and 12.5 g/dL for males.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-2 shrink-0" />
              <span><strong>Blood Pressure:</strong> Systolic 100-140 mmHg and Diastolic 60-90 mmHg.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-2 shrink-0" />
              <span><strong>Interval:</strong> At least 90 days (3 months) since the last whole blood donation. (কমপক্ষে ৯০ দিন বিরতি)</span>
            </li>
          </ul>
        </div>

        {/* 2. Who Must Defer (Wait) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#073B75]">
              Temporary Deferrals (সাময়িক বিরতি)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1">
              <strong className="text-slate-800 block">Recent Fever / Antibiotic:</strong>
              <p>Wait 7 to 14 days after recovery from fever, cold, or completing an antibiotic course.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1">
              <strong className="text-slate-800 block">Dental Procedures:</strong>
              <p>Wait 24 to 72 hours following simple extraction or minor dental surgery.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1">
              <strong className="text-slate-800 block">Tattoos & Body Piercings:</strong>
              <p>Wait 6 months after receiving a tattoo or piercing to prevent hepatitis transmission.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1">
              <strong className="text-slate-800 block">Pregnancy & Lactation:</strong>
              <p>Deferred during pregnancy and at least 6 months after childbirth or breastfeeding period.</p>
            </div>
          </div>
        </div>

        {/* 3. Permanent Disqualification */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E53945] flex items-center justify-center font-bold">
              <XCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#073B75]">
              Permanent Disqualification (যাঁরা রক্ত দিতে পারবেন না)
            </h2>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-center gap-2 text-red-600">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>Confirmed positive for HIV, Hepatitis B (HBsAg), or Hepatitis C (Anti-HCV).</span>
            </li>
            <li className="flex items-center gap-2 text-red-600">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>Chronic kidney failure, liver cirrhosis, or active cancer treatment.</span>
            </li>
            <li className="flex items-center gap-2 text-red-600">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>Cardiac condition requiring regular prescription medication or pacemakers.</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <Link
            href="/become-donor"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0878D1] hover:bg-[#073B75] shadow-md transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>I Am Eligible — Register as Donor Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
