"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DIVISIONS, DISTRICTS } from "@/lib/bangladesh-data";
import { 
  Users, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Award, 
  Calendar,
  Sparkles
} from "lucide-react";

export default function VolunteersPage() {
  const { language } = useLanguage();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [divisionId, setDivisionId] = useState("dhaka");
  const [skills, setSkills] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "স্বেচ্ছাসেবক নেটওয়ার্ক" : "Volunteers of Bangladesh"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#073B75]">
            {language === "bn" ? "লাইফড্রপ ভলান্টিয়ার টিম" : "Join the LifeDrop Volunteer Force"}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Help organize regional blood donation drives, assist emergency patients at hospitals, and verify donor submissions in your upazila.
          </p>
        </div>

        {/* Roles & Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0878D1] flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Campaign Coordination</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Coordinate mobile blood donation drives in university campuses, industrial zones, and community centers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E53945] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 fill-[#E53945]" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Hospital Liaison</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Assist critical patients navigating blood bank testing, grouping, and emergency cross-matching.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Official Verification</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Verify submitted blood donation records with hospital slips and issue accredited recognition certificates.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-xl font-black text-[#073B75] mb-2">
            Volunteer Application Form
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Approved volunteers receive an official Volunteer Digital ID Card with QR verification and service certificates.
          </p>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-[#16A34A] mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for applying. Your divisional coordinator will review your profile and reach out for orientation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile (+880) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1..."
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Division *</label>
                  <select
                    value={divisionId}
                    onChange={(e) => setDivisionId(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  >
                    {DIVISIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {language === "bn" ? d.bnName : d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Skills & Community Experience
                </label>
                <textarea
                  rows={3}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. Student at Dhaka Medical College, photography, first aid certification, social media management..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl font-bold text-xs text-white bg-[#0878D1] hover:bg-[#073B75] transition-colors cursor-pointer"
              >
                Submit Volunteer Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
