"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  AlertCircle, 
  Search, 
  QrCode, 
  Users, 
  Building2, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export function QuickActionCards() {
  const { language } = useLanguage();

  const cards = [
    {
      title: language === "bn" ? "জরুরি রক্তের আবেদন" : "Emergency Blood Request",
      desc: language === "bn" ? "তাৎক্ষণিক রক্তপ্রয়োজনে আবেদন করুন" : "Post immediate urgent blood requirement",
      icon: AlertCircle,
      href: "/blood-requests/new",
      iconColor: "text-[#E53945]",
      bgColor: "bg-red-50",
      borderColor: "border-red-100 hover:border-red-300",
    },
    {
      title: language === "bn" ? "সারাদেশে রক্তদাতা সন্ধান" : "Search Donors Nationwide",
      desc: language === "bn" ? "৬৪ জেলায় গ্রুপের ভিত্তিতে খুঁজুন" : "Find verified donors across 64 districts",
      icon: Search,
      href: "/find-donors",
      iconColor: "text-[#0878D1]",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100 hover:border-blue-300",
    },
    {
      title: language === "bn" ? "কিউআর সহ ডিজিটাল আইডি" : "Digital ID Card with QR",
      desc: language === "bn" ? "স্মার্ট যাচাইযোগ্য ডোনার ও সদস্য আইডি" : "Instant QR verification for approved roles",
      icon: QrCode,
      href: "/verify/id",
      iconColor: "text-[#073B75]",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-200 hover:border-slate-300",
    },
    {
      title: language === "bn" ? "স্বেচ্ছাসেবক হিসেবে যুক্ত হোন" : "Join as Volunteer",
      desc: language === "bn" ? "ক্যাম্পেইন ও মানবসেবায় অংশ নিন" : "Support local donation drives and campaigns",
      icon: Users,
      href: "/volunteers",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100 hover:border-purple-300",
    },
    {
      title: language === "bn" ? "রক্তদান সংগঠন নেটওয়ার্ক" : "Blood Organizations",
      desc: language === "bn" ? "বিশ্বস্ত ব্লাড ব্যাংক ও এনজিও ক্লাব" : "Affiliated regional blood clubs & NGOs",
      icon: Building2,
      href: "/organizations",
      iconColor: "text-[#0878D1]",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100 hover:border-blue-300",
    },
    {
      title: language === "bn" ? "১০০% নিরাপদ ও বিশ্বস্ত" : "Trusted & Secure",
      desc: language === "bn" ? "ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা" : "End-to-end data privacy and consent gate",
      icon: ShieldCheck,
      href: "/privacy",
      iconColor: "text-[#16A34A]",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100 hover:border-emerald-300",
    },
  ];

  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className={`group p-6 rounded-2xl bg-white border ${card.borderColor} shadow-xs hover:shadow-md transition-all duration-200 flex items-start gap-4`}
              >
                <div className={`w-12 h-12 rounded-xl ${card.bgColor} ${card.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-[#0878D1] transition-colors flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0878D1]" />
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
