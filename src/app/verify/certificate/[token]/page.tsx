"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Printer, CheckCircle2, ArrowLeft } from "lucide-react";

function VerifyCertificateTokenContent() {
  const params = useParams();
  const token = params?.token as string;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Verification Status */}
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider block">
                Officially Verified Document
              </span>
              <h1 className="text-xl font-black text-[#073B75]">
                National Life-Saving Certificate
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>

        {/* Certificate Card */}
        <div className="bg-white rounded-3xl border-4 border-amber-500/30 p-8 sm:p-12 shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/40 rounded-full blur-2xl pointer-events-none" />

          {/* Logo */}
          <div className="relative h-12 w-48 mx-auto">
            <Image
              src="/images/logo/lifedrop-logo.png"
              alt="LifeDrop Bangladesh"
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              Certificate of Humanitarian Recognition
            </span>
            <h2 className="text-3xl font-black text-[#073B75] font-serif">
              Life Saver Award
            </h2>
          </div>

          <p className="text-xs text-slate-500 max-w-md mx-auto">
            This certifies that the recipient has voluntarily donated blood and contributed to saving human lives across Bangladesh under the National Blood Safety Program.
          </p>

          <div className="py-4 border-y border-slate-100">
            <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">
              Awarded to
            </span>
            <span className="text-2xl font-black text-slate-900 block mt-1">
              Rabeya Akter Lima
            </span>
            <span className="text-xs font-mono font-bold text-[#0878D1] block mt-0.5">
              ID: LD-BD-2026-000125 • Chittagong, Bangladesh
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 text-xs text-slate-500">
            <div className="text-left">
              <span className="block font-bold text-slate-800">Date of Issue</span>
              <span>20 September 2026</span>
            </div>
            <div className="text-right">
              <span className="block font-bold text-slate-800">Director General</span>
              <span>LifeDrop Bangladesh</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs font-bold text-[#0878D1] hover:underline">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyCertificateTokenPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading certificate verification...</div>}>
      <VerifyCertificateTokenContent />
    </Suspense>
  );
}
