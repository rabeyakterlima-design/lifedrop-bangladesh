"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { idCardService } from "@/lib/services/idCardService";
import { DigitalIDCard } from "@/types";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Printer, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Droplet,
  Lock,
  ArrowLeft
} from "lucide-react";
import { formatDate } from "@/lib/utils";

function VerifyIdTokenContent() {
  const params = useParams();
  const token = params?.token as string;

  const [card, setCard] = useState<DigitalIDCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      idCardService.getCardByToken(token).then((res) => {
        setCard(res);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0878D1] mx-auto" />
          <p className="text-sm font-semibold text-slate-600">
            Verifying cryptographic token with LifeDrop Bangladesh Registry...
          </p>
        </div>
      </div>
    );
  }

  // Invalid Token / Counterfeit warning
  if (!card) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-red-200 shadow-xl p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#E53945] flex items-center justify-center mx-auto">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-slate-900">
            Invalid Digital ID Token
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            The verification token <code className="bg-slate-100 px-2 py-0.5 rounded text-xs text-red-600 font-mono">{token}</code> was not found in the LifeDrop Bangladesh national database.
          </p>

          <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-xs text-red-700 text-left space-y-1">
            <p className="font-bold">Security Notice:</p>
            <p>
              Do not accept altered physical identity badges. Valid LifeDrop ID cards are verifiable in real-time through authentic secure tokens.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#073B75] hover:bg-[#0878D1] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  const isActive = card.status === "active";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/60 via-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Verification Banner */}
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Officially Verified Identity
              </span>
              <h1 className="text-xl font-extrabold text-[#073B75]">
                LifeDrop Bangladesh National Registry
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print ID</span>
          </button>
        </div>

        {/* The Official Universal Digital Card View */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden relative">
          {/* Card Top Brand Strip */}
          <div className="bg-[#073B75] px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-32 bg-white px-2 py-1 rounded-md">
                <Image
                  src="/images/logo/lifedrop-logo.png"
                  alt="LifeDrop Bangladesh"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-bold text-blue-200 hidden sm:inline">
                | National Blood Network
              </span>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E53945] text-white uppercase tracking-wider">
              {card.role.replace("_", " ")}
            </span>
          </div>

          {/* Card Content Area */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Photo */}
              <div className="relative w-28 h-36 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-md bg-slate-100 shrink-0">
                <Image
                  src={card.avatarUrl}
                  alt={card.fullName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Identity Details */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div>
                  <h2 className="text-2xl font-black text-[#073B75]">
                    {card.fullName}
                  </h2>
                  <p className="text-xs font-mono font-bold text-slate-500 mt-0.5">
                    {card.cardIdNumber}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  {card.bloodGroup && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black bg-red-600 text-white shadow-xs">
                      <Droplet className="w-3.5 h-3.5" />
                      Blood Group: {card.bloodGroup}
                    </span>
                  )}

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                      isActive
                        ? "bg-emerald-50 text-[#16A34A] border border-emerald-200"
                        : "bg-red-50 text-[#E53945] border border-red-200"
                    }`}
                  >
                    Status: {card.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <MapPin className="w-4 h-4 text-[#0878D1]" />
                    <span>{card.region}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Issued: {formatDate(card.issuedAt)}</span>
                    <span className="text-slate-400">• Valid: Lifetime</span>
                  </div>
                </div>
              </div>

              {/* Scannable Verified QR Code */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center shrink-0">
                <QRCodeSVG
                  value={`http://localhost:3000/verify/id/${card.verifyToken}`}
                  size={96}
                  level="H"
                />
                <span className="block text-[9px] font-mono font-bold text-slate-500 mt-1">
                  SECURE QR
                </span>
              </div>
            </div>

            {/* Cryptographic Seal & Audit Hash */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>
                  Tamper-Evident SHA-256 Token:
                  <code className="ml-1 font-mono text-[10px] text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {card.verifyToken.slice(0, 18)}...
                  </code>
                </span>
              </div>
              <span className="font-semibold text-slate-700">
                Authorized by LifeDrop BD Directorate
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="text-center space-y-2">
          <Link
            href="/find-donors"
            className="text-xs font-bold text-[#0878D1] hover:underline"
          >
            ← Search More Verified Donors Nationwide
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyIdTokenPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Verifying digital ID token...</div>}>
      <VerifyIdTokenContent />
    </Suspense>
  );
}
