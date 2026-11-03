"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Calendar, 
  MapPin, 
  Building2, 
  Users, 
  Heart, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function CampaignsPage() {
  const { language } = useLanguage();

  const campaigns = [
    {
      id: "camp-01",
      title: "National Victory Day Mega Blood Drive 2026",
      bnTitle: "মহান বিজয় দিবস জাতীয় রক্তদান ক্যাম্পেইন ২০২৬",
      organizer: "LifeDrop BD & Red Crescent Society",
      division: "Dhaka",
      district: "Dhaka",
      venue: "Central Shaheed Minar Premises, Dhaka University",
      date: "2026-12-16",
      time: "09:00 AM - 05:00 PM",
      targetUnits: 500,
      collectedUnits: 320,
      status: "upcoming",
      description: "Honoring our freedom fighters by donating blood for emergency patients and thalassemia children. Free blood grouping and screening provided.",
    },
    {
      id: "camp-02",
      title: "Chittagong University Campus Blood Camp",
      bnTitle: "চট্টগ্রাম বিশ্ববিদ্যালয় ক্যাম্পাস রক্তদান উৎসব",
      organizer: "Badhan Chittagong University Unit",
      division: "Chattogram",
      district: "Chattogram",
      venue: "Chittagong University Student Center",
      date: "2026-11-20",
      time: "10:00 AM - 04:00 PM",
      targetUnits: 250,
      collectedUnits: 0,
      status: "upcoming",
      description: "Campus drive dedicated to creating awareness among first-time youth donors. Digital ID cards will be issued on-the-spot.",
    },
    {
      id: "camp-03",
      title: "Sylhet Osmani Medical Thalassemia Support Camp",
      bnTitle: "সিলেট ওসমানী মেডিকেল থ্যালাসেমিয়া সহায়তা ক্যাম্পেইন",
      organizer: "Sandhani SOMC Unit",
      division: "Sylhet",
      district: "Sylhet",
      venue: "Auditorium Hall, MAG Osmani Medical College",
      date: "2026-11-12",
      time: "09:30 AM - 03:30 PM",
      targetUnits: 150,
      collectedUnits: 0,
      status: "upcoming",
      description: "Dedicated to collecting rare negative and positive blood groups for regular child transfusion warriors.",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E53945] text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#E53945]" />
            <span>{language === "bn" ? "রক্তদান উৎসব ও ক্যাম্প" : "Nationwide Blood Drives"}</span>
          </div>
          <h1 className="text-3xl font-black text-[#073B75]">
            {language === "bn" ? "আসন্ন রক্তদান ক্যাম্পেইনসমূহ" : "Upcoming Blood Donation Campaigns"}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Join community blood camps across Bangladesh. Every camp features certified hospital screening, clean collection environments, and digital donor badges.
          </p>
        </div>

        <div className="space-y-6">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0878D1]">
                    {camp.district}, {camp.division}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#16A34A]">
                    Target: {camp.targetUnits} Bags
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#073B75]">
                  {language === "bn" && camp.bnTitle ? camp.bnTitle : camp.title}
                </h2>

                <p className="text-xs text-slate-500 font-medium">
                  Organized by: <strong className="text-slate-700">{camp.organizer}</strong>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formatDate(camp.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {camp.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0878D1]" />
                    {camp.venue}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed pt-2">
                  {camp.description}
                </p>
              </div>

              <div className="shrink-0 flex flex-col gap-2">
                <Link
                  href="/become-donor"
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#0878D1] hover:bg-[#073B75] transition-colors text-center"
                >
                  Join as Donor
                </Link>
                <Link
                  href="/volunteers"
                  className="px-6 py-3 rounded-xl font-bold text-xs text-[#073B75] bg-slate-100 hover:bg-slate-200 transition-colors text-center"
                >
                  Volunteer at Camp
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
