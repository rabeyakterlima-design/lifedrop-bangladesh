"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Lock, Eye, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#16A34A] text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection Framework</span>
          </div>
          <h1 className="text-3xl font-black text-[#073B75]">
            LifeDrop Bangladesh Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Effective Date: November 2026 • Governing Data Privacy for Donors, Patients, and Volunteers.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#073B75]">1. Our Core Privacy Commitment</h2>
            <p>
              LifeDrop Bangladesh was founded with a non-negotiable principle: <strong>donor and patient privacy must never be compromised</strong>. We do not sell, rent, commercialize, or share personal data with advertising networks, third-party marketing brokers, or commercial entities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#073B75]">2. What Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Demographic details: Full name, date of birth, gender, and blood group.</li>
              <li>Contact details: Verified phone number and email address (stored with end-to-end access controls).</li>
              <li>Geographic scope: Division, district, upazila, and union/ward for regional donor matching.</li>
              <li>Donation history: Verified donation dates, hospital names, and clinical verification slips.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#073B75]">3. Contact Masking & Double Opt-In Protocol</h2>
            <p>
              By default, donor phone numbers and precise street addresses are <strong>masked from public view</strong>. In emergency scenarios, patients can initiate a verified contact request. The donor receives an alert and can approve or decline the contact. Donors who explicitly choose to allow direct emergency calls can enable this setting at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#073B75]">4. Digital ID Cards & Public Verification</h2>
            <p>
              When a hospital or administrator scans a LifeDrop QR code, our verification servers expose only authenticated credentials: full name, unique ID number, approved role, verified blood group, and validity status. Sensitive personal phone numbers and home addresses are never exposed via the public verification endpoint.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#073B75]">5. Security & Infrastructure</h2>
            <p>
              All platform transmissions are encrypted using standard TLS 1.3 cryptography. Database tables are protected by PostgreSQL Row-Level Security (RLS) policies, preventing unauthorized read or write access across administrative boundaries.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
