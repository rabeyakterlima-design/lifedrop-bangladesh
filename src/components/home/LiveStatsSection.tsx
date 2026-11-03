"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { statsService, PlatformStats } from "@/lib/services/statsService";
import { Heart, ShieldCheck, CheckCircle2, Users, Award, Droplets } from "lucide-react";

export function LiveStatsSection() {
  const { language, t } = useLanguage();
  const [stats, setStats] = useState<PlatformStats | null>(null);

  useEffect(() => {
    statsService.getLiveStats().then((data) => setStats(data));
  }, []);

  const statItems = [
    {
      label: t.stats.registeredDonors,
      value: stats ? stats.registeredDonorsCount.toLocaleString() : "...",
      icon: Droplets,
      color: "text-[#E53945]",
      bgColor: "bg-red-50",
    },
    {
      label: t.stats.verifiedDonors,
      value: stats ? stats.verifiedDonorsCount.toLocaleString() : "...",
      icon: ShieldCheck,
      color: "text-[#16A34A]",
      bgColor: "bg-emerald-50",
    },
    {
      label: t.stats.verifiedDonations,
      value: stats ? stats.verifiedDonationsCount.toLocaleString() : "...",
      icon: Award,
      color: "text-[#0878D1]",
      bgColor: "bg-blue-50",
    },
    {
      label: t.stats.activeVolunteers,
      value: stats ? stats.activeVolunteersCount.toLocaleString() : "...",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: t.stats.completedRequests,
      value: stats ? stats.completedRequestsCount.toLocaleString() : "...",
      icon: CheckCircle2,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-100 bg-[#F8FAFC] flex flex-col items-center text-center shadow-xs hover:shadow-sm transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#073B75]">
                  {item.value}
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-1">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
