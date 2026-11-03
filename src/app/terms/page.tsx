"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileText, AlertTriangle, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0878D1] text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Framework & Disclaimer</span>
          </div>
          <h1 className="text-3xl font-black text-[#073B75]">
            Terms of Service & Medical Disclaimer
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated: November 2026 • Governing Use of the LifeDrop Bangladesh Network.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-red-900 space-y-1">
            <div className="flex items-center gap-2 font-black text-sm">
              <AlertTriangle className="w-4 h-4 text-[#E53945]" />
              <span>Critical Medical Disclaimer</span>
            </div>
            <p className="text-xs text-red-800">
              LifeDrop Bangladesh is a civic technology platform that facilitates voluntary communication between blood donors and individuals in need. LifeDrop Bangladesh is NOT a medical clinic, licensed laboratory, or hospital. Prior to any blood transfusion, standard hospital cross-matching, blood grouping, and infectious disease mandatory screening (HIV, Hepatitis B/C, Malaria, Syphilis) MUST be carried out by certified hospital laboratory personnel.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#073B75]">1. Strictly Voluntary & Non-Commercial</h2>
            <p>
              Users acknowledge that blood donation in Bangladesh must be entirely voluntary and unpaid. Requesting financial compensation, selling blood bags, or acting as an unlicensed middleman/broker is strictly illegal and will result in immediate permanent account termination, IP blocking, and referral to law enforcement authorities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#073B75]">2. Accuracy of Emergency Requests</h2>
            <p>
              Users posting emergency blood requests certify that the information provided represents a genuine medical need. Submitting fraudulent requests, test requests on live production channels, or harassment posts is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#073B75]">3. Donor Health Disclosures</h2>
            <p>
              Donors must provide truthful health self-disclosures. However, self-disclosure does not replace qualified medical screening. Attending hospital medical officers bear ultimate clinical responsibility for determining donor fitness at the time of collection.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
