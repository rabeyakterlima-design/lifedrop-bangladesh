"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  ShieldCheck, 
  Activity, 
  Award, 
  Building2, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Filter, 
  Clock,
  Settings,
  FileText
} from "lucide-react";
import { donorService } from "@/lib/services/donorService";
import { bloodRequestService } from "@/lib/services/bloodRequestService";
import { statsService, PlatformStats } from "@/lib/services/statsService";
import { DonorProfile, BloodRequest } from "@/types";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "donors" | "verifications" | "requests">("overview");
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Pending verification simulations
  const [pendingDonations, setPendingDonations] = useState([
    {
      id: "don-01",
      donorName: "Tanvir Ahmed Chowdhury",
      bloodGroup: "A+",
      hospital: "Dhaka Medical College Hospital",
      date: "2026-11-01",
      units: 1,
      proof: "Blood Bank Slip #DMC-8812",
    },
    {
      id: "don-02",
      donorName: "Rabeya Akter Lima",
      bloodGroup: "O+",
      hospital: "Chittagong Medical College Hospital",
      date: "2026-10-28",
      units: 1,
      proof: "CMCH Transfusion Unit Slip #9921",
    },
  ]);

  const loadData = async () => {
    setLoading(true);
    const [s, d, r] = await Promise.all([
      statsService.getLiveStats(),
      donorService.getAllDonors(),
      bloodRequestService.getAllRequests(),
    ]);
    setStats(s);
    setDonors(d);
    setRequests(r);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApproveDonation = (id: string) => {
    setPendingDonations((prev) => prev.filter((p) => p.id !== id));
    alert("Donation officially approved! Recalculating donor verified count...");
    loadData();
  };

  const handleRejectDonation = (id: string) => {
    setPendingDonations((prev) => prev.filter((p) => p.id !== id));
    alert("Donation submission rejected. Donor notified with audit justification.");
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                National Governance Portal
              </span>
            </div>
            <h1 className="text-2xl font-black text-[#073B75]">
              LifeDrop Bangladesh Administration
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 text-[#0878D1]">
              Super Admin / National Scope
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#073B75] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Overview & Trends
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("verifications")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "verifications"
                ? "bg-[#073B75] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>Donation Verification</span>
            {pendingDonations.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500 text-white font-bold">
                {pendingDonations.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("donors")}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "donors"
                ? "bg-[#073B75] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Manage Donors ({donors.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "requests"
                ? "bg-[#073B75] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Emergency Requests ({requests.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Registered Donors
                </span>
                <span className="text-2xl font-black text-[#073B75]">
                  {stats ? stats.registeredDonorsCount : "..."}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Verified Donors
                </span>
                <span className="text-2xl font-black text-[#16A34A]">
                  {stats ? stats.verifiedDonorsCount : "..."}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Verified Donations
                </span>
                <span className="text-2xl font-black text-[#0878D1]">
                  {stats ? stats.verifiedDonationsCount : "..."}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Active Requests
                </span>
                <span className="text-2xl font-black text-[#E53945]">
                  {requests.length}
                </span>
              </div>
            </div>

            {/* Regional Division Statistics */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0878D1]" />
                <span>Division-wise Donor Distribution (All 8 Divisions)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {stats?.divisionDistribution.map((div, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-slate-700">{div.division}</span>
                    <span className="font-mono text-[#0878D1] font-extrabold">{div.count} Donors</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Two-Phase Donation Verification Workflow */}
        {activeTab === "verifications" && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-[#073B75]">
                Pending Donation Verifications
              </h2>
              <p className="text-xs text-slate-500">
                Rule: Donors cannot manually falsify donation totals. Only authorized verifiers can review clinical evidence and approve records.
              </p>
            </div>

            {pendingDonations.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs font-semibold">
                <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto mb-2" />
                No pending donation claims awaiting verification. All records audited.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingDonations.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{item.donorName}</span>
                        <span className="px-2 py-0.5 rounded font-black bg-red-600 text-white">
                          {item.bloodGroup}
                        </span>
                      </div>
                      <p className="text-slate-600">
                        Hospital: <strong>{item.hospital}</strong> • Date: {item.date}
                      </p>
                      <p className="text-slate-500 font-mono">
                        Document Proof: {item.proof}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleApproveDonation(item.id)}
                        className="px-4 py-2 rounded-xl font-bold bg-[#16A34A] hover:bg-[#087443] text-white transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify & Approve</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRejectDonation(item.id)}
                        className="px-4 py-2 rounded-xl font-bold bg-white border border-red-300 text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Donors Management */}
        {activeTab === "donors" && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#073B75]">
              Registered Donors Directory
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Donor Name</th>
                    <th className="py-3 px-4">Blood Group</th>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Verified Donations</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {donors.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-bold text-slate-800">{d.fullName}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded font-bold bg-red-100 text-red-700">
                          {d.bloodGroup}
                        </span>
                      </td>
                      <td className="py-3 px-4 capitalize">{d.districtId}, {d.divisionId}</td>
                      <td className="py-3 px-4 font-bold">{d.verifiedDonationsCount}</td>
                      <td className="py-3 px-4">
                        {d.isVerified ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Verified
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Requests */}
        {activeTab === "requests" && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#073B75]">
              Active Blood Requests
            </h2>
            <div className="space-y-3">
              {requests.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{r.patientName}</span>
                    <span className="text-slate-500">{r.hospitalName} ({r.bloodGroup}) • Priority: {r.priority}</span>
                  </div>
                  <Link
                    href={`/blood-requests/${r.id}`}
                    className="font-bold text-[#0878D1] hover:underline"
                  >
                    View Case
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
