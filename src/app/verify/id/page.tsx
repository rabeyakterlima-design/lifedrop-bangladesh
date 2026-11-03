"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Search, QrCode } from "lucide-react";

export default function VerifyIdLookupPage() {
  const router = useRouter();
  const [tokenInput, setTokenInput] = useState("");

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      router.push(`/verify/id/${tokenInput.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0878D1] flex items-center justify-center mx-auto">
            <QrCode className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-[#073B75]">
            Verify Digital ID Card
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Scan the QR code on any official LifeDrop Bangladesh identity badge or enter the verification token manually below.
          </p>
        </div>

        <form onSubmit={handleLookup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Verification Token
            </label>
            <input
              type="text"
              required
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="e.g. vtok_9f8e7d6c5b4a3210e7d8c9b0a1f2e3d4"
              className="w-full h-12 px-4 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl font-bold text-sm text-white bg-[#0878D1] hover:bg-[#073B75] shadow-md transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Verify Credential</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            Sample test token:{" "}
            <button
              type="button"
              onClick={() => router.push("/verify/id/vtok_9f8e7d6c5b4a3210e7d8c9b0a1f2e3d4")}
              className="font-mono text-[#0878D1] hover:underline font-bold"
            >
              vtok_9f8e7d6c5b4a3210...
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
