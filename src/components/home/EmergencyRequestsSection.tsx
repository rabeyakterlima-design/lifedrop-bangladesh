"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { bloodRequestService } from "@/lib/services/bloodRequestService";
import { BloodRequest } from "@/types";
import { 
  AlertCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  PhoneCall, 
  HeartHandshake,
  CheckCircle2
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export function EmergencyRequestsSection() {
  const { language, t } = useLanguage();
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bloodRequestService.getRecentRequests(3).then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E53945] text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E53945] animate-ping" />
              <span>{language === "bn" ? "তাৎক্ষণিক প্রয়োজন" : "Immediate Need"}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#073B75]">
              {t.emergency.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {t.emergency.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blood-requests/new"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#E53945] hover:bg-red-700 transition-all shadow-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{t.emergency.submitRequest}</span>
            </Link>
            <Link
              href="/blood-requests"
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#073B75] bg-blue-50 hover:bg-blue-100 transition-all flex items-center gap-1"
            >
              <span>{t.common.viewAll}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Requests Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => {
            const isCritical = req.priority === "critical";
            const progress = Math.min(
              100,
              Math.round((req.unitsFulfilled / req.unitsNeeded) * 100)
            );

            return (
              <div
                key={req.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                  isCritical ? "border-red-200 ring-1 ring-red-100" : "border-slate-200"
                }`}
              >
                <div>
                  {/* Top Bar: Blood Group & Priority */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl font-extrabold text-base bg-red-600 text-white shadow-xs">
                      {req.bloodGroup}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        isCritical
                          ? "bg-red-50 text-red-700 border border-red-200 animate-pulse"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {req.priority}
                    </span>
                  </div>

                  {/* Patient Name */}
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1 mb-2">
                    {req.patientName}
                  </h3>

                  {/* Hospital */}
                  <div className="flex items-start gap-2 text-xs text-slate-600 mb-2">
                    <MapPin className="w-4 h-4 text-[#0878D1] shrink-0 mt-0.5" />
                    <span className="font-medium line-clamp-2">{req.hospitalName}</span>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(req.neededDate)}
                    </span>
                    {req.neededTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {req.neededTime}
                      </span>
                    )}
                  </div>

                  {/* Units Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{language === "bn" ? "প্রয়োজনীয় রক্ত" : "Units Transfusion"}</span>
                      <span>
                        {req.unitsFulfilled} / {req.unitsNeeded} {t.common.units}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-emerald-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Description preview */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {req.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-500">
                    <span className="block font-medium text-slate-700">{req.contactPerson}</span>
                  </div>
                  <Link
                    href={`/blood-requests/${req.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0878D1] hover:bg-[#073B75] transition-colors"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>{language === "bn" ? "রক্ত দিন" : "Donate Blood"}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
