"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  UserCheck, 
  QrCode, 
  Search, 
  Activity, 
  History, 
  CalendarCheck, 
  Star, 
  Users, 
  BellRing, 
  BarChart3,
  ShieldAlert
} from "lucide-react";

export function FeaturesSection() {
  const { language } = useLanguage();

  const features = [
    {
      title: language === "bn" ? "রক্তদাতা নিবন্ধন ও প্রোফাইল" : "Donor Registration & Profile",
      desc: language === "bn" ? "সহজ নিবন্ধন ও স্বাস্থ্য তথ্য সংরক্ষণ" : "Secure profile management with verified details",
      icon: UserCheck,
      color: "text-[#0878D1]",
      bg: "bg-blue-50",
    },
    {
      title: language === "bn" ? "কিউআর সহ ডিজিটাল স্মার্ট আইডি" : "Universal Digital ID Card with QR",
      desc: language === "bn" ? "যাচাইযোগ্য ডিজিটাল পরিচয়পত্র ও কিউআর স্ক্যান" : "Instant QR verification for approved donors & staff",
      icon: QrCode,
      color: "text-[#073B75]",
      bg: "bg-slate-100",
    },
    {
      title: language === "bn" ? "উন্নত রক্তদাতা অনুসন্ধান" : "Advanced Donor Search",
      desc: language === "bn" ? "৬৪ জেলা ও সকল উপজেলায় রক্তের গ্রুপের ভিত্তিতে" : "Hierarchical search across 64 districts & upazilas",
      icon: Search,
      color: "text-[#16A34A]",
      bg: "bg-emerald-50",
    },
    {
      title: language === "bn" ? "জরুরি রক্তের আবেদন ব্যবস্থা" : "Emergency Blood Request System",
      desc: language === "bn" ? "ক্রিটিকাল ট্রায়াজিং ও তাত্ক্ষণিক সমন্বয়" : "Rapid patient triaging and donor response matching",
      icon: Activity,
      color: "text-[#E53945]",
      bg: "bg-red-50",
    },
    {
      title: language === "bn" ? "রক্তদান ট্র্যাকিং ও ইতিহাস" : "Donation Tracking & History",
      desc: language === "bn" ? "প্রশাসক দ্বারা যাচাইকৃত রক্তদানের রেকর্ড" : "Strict two-phase audit verified donation records",
      icon: History,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: language === "bn" ? "স্বয়ংক্রিয় রক্তদান বিরতি পলিসি" : "Automated Availability Policy",
      desc: language === "bn" ? "মেডিকেল নির্দেশনায় ৩ মাস বিশ্রাম সতর্কতা" : "Configurable 90-day medical resting safeguard",
      icon: CalendarCheck,
      color: "text-[#0878D1]",
      bg: "bg-blue-50",
    },
    {
      title: language === "bn" ? "রেটিং ও রিভিউ সিস্টেম" : "Rating & Review System",
      desc: language === "bn" ? "যাচাইকৃত রক্তদানের পর স্বচ্ছ ফিডব্যাক" : "Reputation and feedback on verified interactions",
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: language === "bn" ? "স্বেচ্ছাসেবক ও সংগঠন নেটওয়ার্ক" : "Volunteer & Organization Hub",
      desc: language === "bn" ? "ব্লাড ক্লাব ও ভলান্টিয়ার টিম ব্যবস্থাপনা" : "Coordination of blood drives, NGOs and volunteer tasks",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: language === "bn" ? "রিয়েল-টাইম নোটিফিকেশন" : "Real-time Notifications",
      desc: language === "bn" ? "ইন-অ্যাপ, এসএমএস ও অ্যালার্ট সার্ভিস" : "Instant donor alerts for emergency local matches",
      icon: BellRing,
      color: "text-[#E53945]",
      bg: "bg-red-50",
    },
    {
      title: language === "bn" ? "অ্যানালিটিক্স ও রিপোর্ট" : "Analytics & Reports",
      desc: language === "bn" ? "জাতীয় ও আঞ্চলিক রক্ত চাহিদার রিয়েল-টাইম তথ্য" : "Division and blood group statistics & trends",
      icon: BarChart3,
      color: "text-[#0878D1]",
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0878D1] text-xs font-bold mb-3">
            <span>{language === "bn" ? "সর্বাধুনিক প্রযুক্তি" : "Engineered for Bangladesh"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#073B75] tracking-tight">
            {language === "bn" ? "আমাদের মূল বৈশিষ্ট্যসমূহ" : "Our Powerful Features"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {language === "bn"
              ? "রক্তের সন্ধান থেকে শুরু করে প্রতিটি রক্তদানের ডিজিটাল স্বীকৃতি পর্যন্ত একটি সমন্বিত নিরাপদ ইকোসিস্টেম।"
              : "A robust national digital infrastructure built for safety, transparency, and instant response."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
