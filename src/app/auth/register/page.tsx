"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, UserPlus, ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"donor" | "recipient" | "volunteer">("donor");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "donor") {
      router.push("/become-donor");
    } else {
      router.push("/donor/dashboard");
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
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
            Create an Account
          </h1>
          <p className="text-xs text-slate-500">
            Join the national digital blood donation network of Bangladesh.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Shakil Ahmed"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Mobile Number (+880) *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1..."
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Account Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "donor" | "recipient" | "volunteer")}
              className="w-full h-11 px-3 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
            >
              <option value="donor">Voluntary Blood Donor</option>
              <option value="recipient">Patient / Recipient Family</option>
              <option value="volunteer">Community Volunteer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl font-bold text-xs text-white bg-[#0878D1] hover:bg-[#073B75] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Complete Registration</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-600">
          <span>Already registered? </span>
          <Link href="/auth/login" className="font-bold text-[#0878D1] hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
