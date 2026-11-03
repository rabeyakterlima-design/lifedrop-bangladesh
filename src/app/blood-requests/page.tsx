"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { bloodRequestService } from "@/lib/services/bloodRequestService";
import { BloodRequest, RequestPriority } from "@/types";
import { 
  DIVISIONS, 
  BLOOD_GROUPS 
} from "@/lib/bangladesh-data";
import { 
  AlertCircle, 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  Filter, 
  HeartHandshake,
  CheckCircle,
  Activity
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function BloodRequestsPage() {
  const { language, t } = useLanguage();

  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterGroup, setFilterGroup] = useState<string>("");
  const [filterDivision, setFilterDivision] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");

  useEffect(() => {
    bloodRequestService.getAllRequests().then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (filterGroup && r.bloodGroup !== filterGroup) return false;
      if (filterDivision && r.divisionId !== filterDivision) return false;
      if (filterPriority && r.priority !== filterPriority) return false;
      return true;
    });
  }, [requests, filterGroup, filterDivision, filterPriority]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E53945] text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E53945] animate-ping" />
              <span>{language === "bn" ? "লাইভ রক্তের আবেদন" : "Live Emergency Board"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#073B75] tracking-tight">
              {t.emergency.title}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.emergency.subtitle}
            </p>
          </div>

          <Link
            href="/blood-requests/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#E53945] hover:bg-red-700 shadow-md transition-all self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t.emergency.submitRequest}</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 shrink-0">
            <Filter className="w-4 h-4 text-[#0878D1]" />
            <span>{language === "bn" ? "ফিল্টার করুন:" : "Filter By:"}</span>
          </div>

          {/* Blood Group */}
          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
          >
            <option value="">{language === "bn" ? "সকল রক্তের গ্রুপ" : "All Blood Groups"}</option>
            {BLOOD_GROUPS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Division */}
          <select
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
          >
            <option value="">{language === "bn" ? "সকল বিভাগ" : "All Divisions"}</option>
            {DIVISIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {language === "bn" ? d.bnName : d.name}
              </option>
            ))}
          </select>

          {/* Priority */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
          >
            <option value="">{language === "bn" ? "সকল অগ্রাধিকার" : "All Priorities"}</option>
            <option value="critical">{language === "bn" ? "অতি জরুরি (Critical)" : "Critical"}</option>
            <option value="urgent">{language === "bn" ? "জরুরি (Urgent)" : "Urgent"}</option>
            <option value="normal">{language === "bn" ? "স্বাভাবিক (Normal)" : "Normal"}</option>
          </select>

          <span className="ml-auto text-xs font-semibold text-slate-500">
            {filteredRequests.length} {language === "bn" ? "টি আবেদন সক্রিয়" : "Active Requests"}
          </span>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="py-20 text-center text-slate-500 font-medium">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E53945] mx-auto mb-3" />
            <p>{t.common.loading}</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">
              {language === "bn" ? "কোন সক্রিয় আবেদন পাওয়া যায়নি" : "No active blood requests match your filter"}
            </h3>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((req) => {
              const isCritical = req.priority === "critical";
              const progress = Math.min(
                100,
                Math.round((req.unitsFulfilled / req.unitsNeeded) * 100)
              );

              return (
                <div
                  key={req.id}
                  className={`bg-white rounded-2xl border p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                    isCritical ? "border-red-200 ring-1 ring-red-100" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Big Blood Group Badge */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                      <span className="text-xl font-black">{req.bloodGroup}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-200">
                        {req.unitsNeeded} {t.common.units}
                      </span>
                    </div>

                    {/* Patient & Hospital Info */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {req.patientName}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            isCritical
                              ? "bg-red-100 text-red-800 animate-pulse"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {req.priority}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <MapPin className="w-4 h-4 text-[#0878D1] shrink-0" />
                        <span>{req.hospitalName} ({req.upazilaId}, {req.districtId})</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Needed: {formatDate(req.neededDate)}
                        </span>
                        {req.neededTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {req.neededTime}
                          </span>
                        )}
                        <span>• Contact: {req.contactPerson} ({req.contactPhone})</span>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl pt-1">
                        {req.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress & Respond Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                    <div className="w-36">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                        <span>Fulfilled</span>
                        <span>{req.unitsFulfilled}/{req.unitsNeeded}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-emerald-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/blood-requests/${req.id}`}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0878D1] hover:bg-[#073B75] transition-colors flex items-center justify-center gap-2"
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span>{language === "bn" ? "রক্ত দিন / সাড়া দিন" : "Respond to Donate"}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
