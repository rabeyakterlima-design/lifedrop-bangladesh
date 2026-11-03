"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { bloodRequestService } from "@/lib/services/bloodRequestService";
import { BloodRequest } from "@/types";
import { 
  AlertCircle, 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  PhoneCall, 
  HeartHandshake, 
  CheckCircle2, 
  ShieldAlert
} from "lucide-react";
import { formatDate } from "@/lib/utils";

function BloodRequestDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const id = params?.id as string;

  const [request, setRequest] = useState<BloodRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  useEffect(() => {
    if (id) {
      bloodRequestService.getRequestById(id).then((res) => {
        setRequest(res);
        setLoading(false);
      });
    }
  }, [id]);

  const handleDonateResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    const updated = await bloodRequestService.updateRequestStatus(
      request.id,
      "donor_responded",
      request.unitsFulfilled + 1
    );

    if (updated) {
      setRequest(updated);
      setResponseSubmitted(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E53945]" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md">
          <ShieldAlert className="w-12 h-12 text-[#E53945] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800">Blood Request Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 mb-4">
            The requested emergency record may have been fulfilled or removed.
          </p>
          <Link
            href="/blood-requests"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0878D1]"
          >
            Back to Active Requests
          </Link>
        </div>
      </div>
    );
  }

  const isCritical = request.priority === "critical";

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          href="/blood-requests"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0878D1] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "bn" ? "জরুরি রক্তের বোর্ডে ফিরে যান" : "Back to Blood Requests Board"}</span>
        </Link>

        {/* Main Case Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#073B75] px-6 sm:px-8 py-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex flex-col items-center justify-center shadow-md">
                <span className="text-2xl font-black leading-none">{request.bloodGroup}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-200 mt-0.5">
                  {request.unitsNeeded} {t.common.units}
                </span>
              </div>
              <div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase mb-1 ${
                    isCritical ? "bg-red-500 text-white" : "bg-amber-400 text-slate-900"
                  }`}
                >
                  Priority: {request.priority}
                </span>
                <h1 className="text-2xl font-black">{request.patientName}</h1>
              </div>
            </div>

            <div className="text-xs text-blue-200 sm:text-right">
              <span className="block font-semibold">Status: {request.status.replace("_", " ").toUpperCase()}</span>
              <span>Updated: {formatDate(request.updatedAt)}</span>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Key Vital Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold uppercase tracking-wider block">
                  Hospital & Location
                </span>
                <span className="font-bold text-slate-800 text-sm block">
                  {request.hospitalName}
                </span>
                <span className="text-slate-600">
                  {request.upazilaId}, {request.districtId}, {request.divisionId}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold uppercase tracking-wider block">
                  Transfusion Timing
                </span>
                <span className="font-bold text-slate-800 text-sm block">
                  {formatDate(request.neededDate)}
                </span>
                <span className="text-slate-600">
                  {request.neededTime ? `Time: ${request.neededTime}` : "Immediate / ASAP"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold uppercase tracking-wider block">
                  Contact Person
                </span>
                <span className="font-bold text-slate-800 text-sm block">
                  {request.contactPerson}
                </span>
                <a
                  href={`tel:${request.contactPhone}`}
                  className="font-bold text-[#16A34A] hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{request.contactPhone}</span>
                </a>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Clinical Context & Emergency Details
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                {request.description}
              </p>
            </div>

            {/* Donor Response Section */}
            <div className="pt-6 border-t border-slate-100">
              {responseSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto animate-bounce" />
                  <h4 className="text-base font-bold text-emerald-900">
                    Thank You for Stepping Up to Save a Life!
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Your response has been registered. Please call the patient contact person directly at{" "}
                    <strong>{request.contactPhone}</strong> to coordinate your arrival at {request.hospitalName}.
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-red-50 to-blue-50 p-6 rounded-2xl border border-slate-200">
                  <h4 className="text-sm font-bold text-[#073B75] mb-2 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#E53945]" />
                    <span>Are you available to donate {request.bloodGroup} for this patient?</span>
                  </h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Fill in your contact details below to notify the patient family immediately.
                  </p>

                  <form onSubmit={handleDonateResponse} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Your Phone Number (+880)"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="h-10 px-4 rounded-lg font-bold text-xs text-white bg-[#E53945] hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Confirm I Can Donate
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BloodRequestDetailPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading blood request details...</div>}>
      <BloodRequestDetailContent />
    </Suspense>
  );
}
