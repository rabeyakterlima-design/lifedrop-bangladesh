"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Search, 
  Heart, 
  ShieldCheck, 
  Activity, 
  Award, 
  QrCode, 
  ArrowRight,
  PhoneCall
} from "lucide-react";

export default function HowItWorksPage() {
  const { language } = useLanguage();

  const steps = [
    {
      num: "01",
      title: language === "bn" ? "রক্তদাতা অনুসন্ধান বা জরুরি আবেদন" : "Find a Donor or Post Emergency",
      desc: language === "bn"
        ? "রোগীর প্রয়োজনীয় রক্তের গ্রুপ ও হাসপাতাল উল্লেখ করে তাৎক্ষণিক ৬৪ জেলার ডিরেক্টরি খুঁজুন অথবা জরুরি রিকোয়েস্ট তৈরি করুন।"
        : "Search the 64-district verified directory by blood group and upazila, or dispatch an emergency broadcast.",
      icon: Search,
      color: "text-[#0878D1]",
      bg: "bg-blue-50",
    },
    {
      num: "02",
      title: language === "bn" ? "প্রাইভেসি সুরক্ষিত সংযোগ" : "Privacy-Preserved Connection",
      desc: language === "bn"
        ? "রক্তদাতার নম্বরে ডাবল অপ্ট-ইন কনসেন্ট রিকোয়েস্ট যায়। রক্তদাতা অনুমতি প্রদান করলেই কেবল সরাসরি যোগাযোগ সম্ভব।"
        : "Double opt-in consent protects donors from cold calling. Donors approve the patient's alert to connect.",
      icon: PhoneCall,
      color: "text-[#16A34A]",
      bg: "bg-emerald-50",
    },
    {
      num: "03",
      title: language === "bn" ? "হাসপাতালে রক্তদান ও ক্রস-ম্যাচিং" : "Hospital Transfusion & Screening",
      desc: language === "bn"
        ? "অনুমোদিত হাসপাতাল বা ব্লাড ব্যাংকে বাধ্যতামূলক ৫টি স্ক্রিনিং ও ক্রস-ম্যাচিংয়ের পর নিরাপদ রক্তদান সম্পন্ন হয়।"
        : "Standard hospital laboratory screening (HIV, HBV, HCV, VDRL, MP) and cross-matching ensure recipient safety.",
      icon: Activity,
      color: "text-[#E53945]",
      bg: "bg-red-50",
    },
    {
      num: "04",
      title: language === "bn" ? "অডিট ভেরিফিকেশন ও ডিজিটাল আইডি আপডেট" : "Audit Verification & ID Issuance",
      desc: language === "bn"
        ? "হাসপাতালের স্লিপ আপলোডের মাধ্যমে ভলান্টিয়ার বা কো-অর্ডিনেটর রক্তদান অডিট করেন এবং ডিজিটাল আইডি ও সার্টিফিকেট আপডেট হয়।"
        : "Hospital slip verification updates the donor's lifetime count and unlocks verified digital certificates.",
      icon: QrCode,
      color: "text-[#073B75]",
      bg: "bg-slate-100",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0878D1] text-xs font-bold">
            <Heart className="w-3.5 h-3.5" />
            <span>Step-by-Step Workflow</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#073B75] tracking-tight">
            How LifeDrop Bangladesh Works
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            A transparent, audit-verified national lifecycle connecting patients and voluntary blood donors.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">
                      {st.num}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${st.bg} ${st.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#073B75] mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-[#073B75] p-8 rounded-3xl text-white text-center space-y-4">
          <h3 className="text-xl font-bold">Ready to be a Life Saver in Bangladesh?</h3>
          <p className="text-xs text-blue-200 max-w-md mx-auto">
            Join thousands of voluntary blood donors across 64 districts. Your registration takes under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/become-donor"
              className="px-6 py-3 rounded-xl font-bold text-xs bg-[#16A34A] hover:bg-[#087443] transition-colors"
            >
              Register as Donor
            </Link>
            <Link
              href="/blood-requests/new"
              className="px-6 py-3 rounded-xl font-bold text-xs bg-[#E53945] hover:bg-red-700 transition-colors"
            >
              Need Blood Urgently
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
