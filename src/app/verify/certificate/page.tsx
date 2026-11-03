"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Search } from "lucide-react";

export default function CertificateLookupPage() {
  const router = useRouter();
  const [tokenInput, setTokenInput] = useState("");

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      router.push(`/verify/certificate/${tokenInput.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-[#073B75]">
            Verify Certificate
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Enter the certificate verification number or scan the QR code printed on the official award.
          </p>
        </div>

        <form onSubmit={handleLookup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Certificate Token / Serial
            </label>
            <input
              type="text"
              required
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="e.g. CERT-2026-88192"
              className="w-full h-12 px-4 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl font-bold text-sm text-white bg-[#0878D1] hover:bg-[#073B75] shadow-md transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Verify Document</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => router.push("/verify/certificate/CERT-2026-DEMO")}
            className="text-xs font-bold text-[#0878D1] hover:underline"
          >
            Preview Sample Verified Certificate →
          </button>
        </div>
      </div>
    </div>
  );
}
