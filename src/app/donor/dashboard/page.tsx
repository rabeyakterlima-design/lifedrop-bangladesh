"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Heart, 
  ShieldCheck, 
  Calendar, 
  Award, 
  Clock, 
  UserCheck, 
  Activity, 
  Bell, 
  Lock, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  FileText,
  Star,
  ExternalLink,
  QrCode
} from "lucide-react";

export default function DonorDashboardPage() {
  const { language, t } = useLanguage();

  const [availability, setAvailability] = useState<"available" | "resting" | "unavailable">("available");

  // Sample active donor profile
  const donor = {
    fullName: "Rabeya Akter Lima",
    bnFullName: "রাবেয়া আক্তার লিমা",
    bloodGroup: "O+",
    cardIdNumber: "LD-BD-2026-000125",
    verifyToken: "vtok_9f8e7d6c5b4a3210e7d8c9b0a1f2e3d4",
    totalDonations: 3,
    verifiedDonations: 2,
    rating: 4.9,
    profileComplete: 85,
    lastDonation: "20 Sep 2026",
    nextEligible: "20 Dec 2026",
    region: "Chittagong, Bangladesh",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs text-center space-y-3">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden mx-auto border-2 border-slate-100 shadow-sm">
                <Image
                  src={donor.avatarUrl}
                  alt={donor.fullName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#073B75]">
                  {donor.fullName}
                </h2>
                <p className="text-xs font-mono text-slate-500 mt-0.5">
                  {donor.cardIdNumber}
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-black bg-red-600 text-white">
                    {donor.bloodGroup}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-[#16A34A] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar Nav */}
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-1 text-xs font-bold text-slate-700">
              <Link
                href="/donor/dashboard"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-blue-50 text-[#0878D1]"
              >
                <Activity className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </Link>

              <Link
                href={`/verify/id/${donor.verifyToken}`}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <QrCode className="w-4 h-4 text-slate-400" />
                <span>My Digital ID Card</span>
              </Link>

              <Link
                href="/blood-requests"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <Heart className="w-4 h-4 text-slate-400" />
                <span>Urgent Blood Requests</span>
              </Link>

              <Link
                href="/donor/history"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <Award className="w-4 h-4 text-slate-400" />
                <span>Donation Certificates</span>
              </Link>

              <Link
                href="/donor/settings"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Privacy & Consent</span>
              </Link>

              <Link
                href="/"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors pt-3"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Link>
            </div>
          </div>

          {/* Right Main Panel */}
          <div className="lg:col-span-9 space-y-6">
            {/* Welcome Greeting & Availability Toggle */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-black text-[#073B75]">
                  Welcome back, {donor.fullName}! 👋
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Your regular voluntary donations make a life-saving impact in Bangladesh.
                </p>
              </div>

              {/* Real Availability Toggle */}
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 ml-2">Status:</span>
                <button
                  type="button"
                  onClick={() => setAvailability("available")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    availability === "available"
                      ? "bg-[#16A34A] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Available Now
                </button>
                <button
                  type="button"
                  onClick={() => setAvailability("resting")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    availability === "resting"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Resting (90d)
                </button>
              </div>
            </div>

            {/* Key Widgets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                <span className="block text-2xl font-black text-[#E53945]">
                  {donor.totalDonations}
                </span>
                <span className="text-xs font-semibold text-slate-600">Total Donations</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                <span className="block text-2xl font-black text-[#16A34A]">
                  {donor.verifiedDonations}
                </span>
                <span className="text-xs font-semibold text-slate-600">Audit Verified</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                <span className="block text-2xl font-black text-amber-500">
                  {donor.rating} ★
                </span>
                <span className="text-xs font-semibold text-slate-600">Patient Rating</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                <span className="block text-sm font-black text-[#0878D1] mt-2">
                  {donor.nextEligible}
                </span>
                <span className="text-xs font-semibold text-slate-600">Next Eligible</span>
              </div>
            </div>

            {/* Scannable Verified Card & Profile Completion Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Universal Digital ID Card Preview */}
              <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    My Universal Blood Donor ID Card
                  </span>
                  <Link
                    href={`/verify/id/${donor.verifyToken}`}
                    className="text-xs font-bold text-[#0878D1] hover:underline flex items-center gap-1"
                  >
                    <span>Full Card</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-4 relative overflow-hidden flex items-start gap-4">
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-200 shrink-0">
                    <Image
                      src={donor.avatarUrl}
                      alt={donor.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-[#073B75] truncate">
                      {donor.fullName}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500">
                      {donor.cardIdNumber}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded font-black text-xs bg-red-600 text-white">
                        {donor.bloodGroup}
                      </span>
                      <span className="text-[11px] text-slate-600">
                        {donor.region}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-1.5 rounded-xl border border-slate-200 shrink-0">
                    <QRCodeSVG
                      value={`http://localhost:3000/verify/id/${donor.verifyToken}`}
                      size={54}
                      level="H"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  This QR code can be scanned at any hospital or blood bank in Bangladesh to verify your donor identity and donation credentials.
                </p>
              </div>

              {/* Profile Completion & Safeguards */}
              <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Profile Completion
                  </span>
                  <div className="flex items-center justify-between text-sm font-bold text-[#073B75] mb-2">
                    <span>Account Health</span>
                    <span>{donor.profileComplete}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                      style={{ width: `${donor.profileComplete}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Add an emergency contact and alternate phone number to reach 100% completion.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-bold text-[#16A34A] mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>90-Day Policy Safeguard Active</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Next policy review scheduled on {donor.nextEligible}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
