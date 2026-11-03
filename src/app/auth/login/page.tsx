"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  Activity,
  AlertCircle
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate login & route depending on credentials or demo
    setTimeout(() => {
      if (email.includes("admin")) {
        router.push("/admin/dashboard");
      } else {
        router.push("/donor/dashboard");
      }
    }, 1000);
  };

  const handleQuickDemoLogin = (role: "donor" | "admin" | "coordinator") => {
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "donor") {
      router.push("/donor/dashboard");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="relative h-12 w-44 mx-auto">
            <Image
              src="/images/logo/lifedrop-logo.png"
              alt="LifeDrop Bangladesh"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-black text-[#073B75] pt-2">
            {language === "bn" ? "অ্যাকাউন্টে প্রবেশ করুন" : "Sign In to LifeDrop"}
          </h1>
          <p className="text-xs text-slate-500">
            {language === "bn"
              ? "রক্তদাতা, ভলান্টিয়ার ও অ্যাডমিনিস্ট্রেটরদের কেন্দ্রীয় পোর্টাল"
              : "Unified access for blood donors, volunteers, and coordinators"}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address / Mobile
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="donor@lifedrop.bd"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-[11px] font-bold text-[#0878D1] hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl font-bold text-xs text-white bg-[#0878D1] hover:bg-[#073B75] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Sign In to My Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Role Demonstration Access */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <span className="block text-[11px] font-bold uppercase text-slate-400 text-center">
            Explore Demo Portals
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("donor")}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 font-bold text-slate-700 hover:text-[#0878D1] text-center transition-colors cursor-pointer"
            >
              Donor Dashboard
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("admin")}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 font-bold text-slate-700 hover:text-[#0878D1] text-center transition-colors cursor-pointer"
            >
              National Admin Panel
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-600">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/become-donor" className="font-bold text-[#0878D1] hover:underline">
            Register as Donor
          </Link>
        </div>
      </div>
    </div>
  );
}
