"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ShieldCheck, 
  Heart, 
  Star, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Award,
  Clock
} from "lucide-react";

// Sample chart data for Admin preview
const DONATION_TREND_DATA = [
  { month: "Jan", donations: 12 },
  { month: "Feb", donations: 19 },
  { month: "Mar", donations: 28 },
  { month: "Apr", donations: 36 },
  { month: "May", donations: 42 },
  { month: "Jun", donations: 58 },
];

const BLOOD_GROUP_DIST = [
  { name: "O+", value: 34, color: "#E53945" },
  { name: "A+", value: 28, color: "#0878D1" },
  { name: "B+", value: 24, color: "#16A34A" },
  { name: "AB+", value: 10, color: "#8B5CF6" },
  { name: "Negative", value: 4, color: "#F59E0B" },
];

export function PlatformShowcase() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#16A34A] text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === "bn" ? "প্রোডাকশন-গ্রেড ইকোসিস্টেম" : "Real-World Experience"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#073B75] tracking-tight">
            {language === "bn" ? "লাইফড্রপ অভিজ্ঞতার এক ঝলক" : "Experience the LifeDrop Network"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {language === "bn"
              ? "রক্তদাতার পার্সোনাল ড্যাশবোর্ড, স্মার্ট কিউআর আইডি কার্ড এবং প্রশাসনিক ইন্টেলিজেন্স।"
              : "Integrated donor dashboards, smart scannable digital IDs, and real-time administrative analytics."}
          </p>
        </div>

        {/* 2x2 Grid replicating the reference image layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Top Left: Donor Dashboard Showcase */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-md p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878D1] flex items-center justify-center font-bold">
                  LD
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === "bn" ? "রক্তদাতার ব্যক্তিগত ড্যাশবোর্ড" : "Donor Dashboard"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === "bn" ? "স্বাগতম, রাবেয়া আক্তার লিমা!" : "Welcome back, Rabeya Akter Lima!"}
                  </p>
                </div>
              </div>
              <Link
                href="/donor/dashboard"
                className="text-xs font-bold text-[#0878D1] hover:underline flex items-center gap-1"
              >
                <span>{language === "bn" ? "ড্যাশবোর্ডে প্রবেশ" : "Open Dashboard"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Dashboard Stats Row */}
            <div className="grid grid-cols-4 gap-3 my-5">
              <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 text-center">
                <span className="block text-xl font-extrabold text-[#E53945]">3</span>
                <span className="text-[11px] font-semibold text-slate-600">Total Donations</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center">
                <span className="block text-xl font-extrabold text-[#16A34A]">2</span>
                <span className="text-[11px] font-semibold text-slate-600">Verified</span>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-center">
                <span className="block text-xl font-extrabold text-amber-600">4.9★</span>
                <span className="text-[11px] font-semibold text-slate-600">Donor Rating</span>
              </div>
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-center">
                <span className="block text-xs font-extrabold text-[#0878D1] mt-1">Eligible</span>
                <span className="text-[11px] font-semibold text-slate-600">Dec 2026</span>
              </div>
            </div>

            {/* Donation History Table */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
                <span>{language === "bn" ? "রক্তদানের ইতিহাস" : "Recent Verified Donations"}</span>
                <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Audit Verified
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-800">20 Sep 2026</span>
                    <span className="text-slate-500">• CMCH Blood Bank, Chattogram</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-800">15 May 2026</span>
                    <span className="text-slate-500">• Red Crescent Center, Chattogram</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-800">10 Jan 2026</span>
                    <span className="text-slate-500">• Dhaka Medical College Hospital</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right: Scannable Universal Digital ID Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {language === "bn" ? "স্মার্ট ডিজিটাল আইডি" : "Smart Digital ID"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#16A34A] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" />
                Active & Verified
              </span>
            </div>

            {/* Official ID Card Layout */}
            <div className="rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 p-5 shadow-sm relative overflow-hidden">
              {/* Card Header Banner */}
              <div className="bg-[#E53945] -mx-5 -mt-5 px-4 py-2 text-white flex items-center justify-between">
                <span className="text-xs font-extrabold tracking-wider uppercase">
                  Blood Donor ID Card
                </span>
                <span className="text-[10px] font-mono tracking-widest text-red-100">
                  LIFEDROP-BD
                </span>
              </div>

              <div className="mt-4 flex items-start gap-4">
                {/* Photo */}
                <div className="relative w-20 h-24 rounded-xl overflow-hidden border-2 border-white shadow-md bg-slate-200 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                    alt="Rabeya Akter Lima"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#073B75] truncate">
                    Rabeya Akter Lima
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500">
                    ID: LD-BD-2026-000125
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md font-black text-xs bg-red-600 text-white">
                      O+
                    </span>
                    <span className="text-[11px] text-slate-600 truncate">
                      Chittagong, BD
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-[#16A34A]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Donor</span>
                  </div>
                </div>

                {/* Authentic Scannable QR Code */}
                <div className="shrink-0 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center">
                  <QRCodeSVG
                    value="http://localhost:3000/verify/id/vtok_9f8e7d6c5b4a3210e7d8c9b0a1f2e3d4"
                    size={64}
                    level="H"
                  />
                  <span className="text-[8px] font-mono text-slate-400 mt-1">SCAN QR</span>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                <span>Issued: 01 Jan 2026</span>
                <span className="font-semibold text-slate-700">Valid: Lifetime</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
              <span className="text-[11px] text-slate-500">
                {language === "bn" ? "প্রিন্ট ও পিডিএফ সাপোর্ট সহ" : "Download PDF, PNG or verify online"}
              </span>
              <Link
                href="/verify/id/vtok_9f8e7d6c5b4a3210e7d8c9b0a1f2e3d4"
                className="font-bold text-[#0878D1] hover:underline flex items-center gap-1"
              >
                <span>{language === "bn" ? "সরাসরি যাচাই পরীক্ষা" : "Test Verification"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bottom Full-Width: Admin Panel & Analytics Preview */}
          <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-200 shadow-md p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <h3 className="text-base font-bold text-[#073B75]">
                    {language === "bn" ? "জাতীয় প্রশাসনিক অ্যানালিটিক্স" : "Admin Panel & Real-time Analytics"}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === "bn"
                    ? "সারা বাংলাদেশের রক্তদান ও চাহিদার ভৌগোলিক বিশ্লেষণ"
                    : "Nationwide blood demand and donation trends across all 8 divisions"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                  Year 2026
                </span>
                <Link
                  href="/admin/dashboard"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#073B75] hover:bg-[#0878D1] transition-colors"
                >
                  Admin Portal
                </Link>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
              {/* Trend Chart */}
              <div className="md:col-span-7">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#0878D1]" />
                  <span>Donation Growth (Last 6 Months)</span>
                </h4>
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DONATION_TREND_DATA}>
                      <defs>
                        <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0878D1" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#0878D1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="donations"
                        stroke="#0878D1"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorDonations)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Donut Chart: Blood Group Distribution */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Blood Group Distribution (Nationwide)
                </h4>
                <div className="flex items-center gap-4">
                  <div className="h-44 w-44 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={BLOOD_GROUP_DIST}
                          innerRadius={36}
                          outerRadius={58}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {BLOOD_GROUP_DIST.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {BLOOD_GROUP_DIST.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-bold text-slate-700">{item.name}</span>
                        <span className="text-slate-500 font-mono">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
