"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Heart, 
  Search, 
  UserPlus, 
  Building2, 
  Users, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/find-donors", label: t.nav.findDonors },
    { href: "/blood-requests", label: t.nav.bloodRequests, isEmergency: true },
    { href: "/become-donor", label: t.nav.becomeDonor },
    { href: "/organizations", label: t.nav.organizations },
    { href: "/volunteers", label: t.nav.volunteers },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Emergency Ticker bar */}
      <div className="bg-[#073B75] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#E53945] text-white animate-pulse">
              HOTLINE 24/7
            </span>
            <span className="font-medium text-slate-200">
              {language === "bn"
                ? "জরুরি রক্তের প্রয়োজনে হেল্পলাইন: ০৯৬১২-০০০০০০ (বিনামূল্যে সহায়তায়)"
                : "National Emergency Blood Helpline: 09612-000000 (Free Community Support)"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <Link href="/verify/id" className="hover:text-white flex items-center gap-1 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === "bn" ? "ডিজিটাল আইডি যাচাই" : "Verify Digital ID"}</span>
            </Link>
            <span className="text-slate-500">|</span>
            <Link href="/guidelines" className="hover:text-white transition-colors">
              {language === "bn" ? "রক্তদানের নিয়মাবলী" : "Donation Guidelines"}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-44">
              <Image
                src="/images/logo/lifedrop-logo.png"
                alt="LifeDrop Bangladesh Logo"
                fill
                priority
                className="object-contain object-left transition-transform group-hover:scale-102"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 relative ${
                    isActive
                      ? "text-[#0878D1] bg-[#EFF6FF]"
                      : "text-slate-700 hover:text-[#0878D1] hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.isEmergency && (
                      <span className="w-2 h-2 rounded-full bg-[#E53945] animate-ping" />
                    )}
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  language === "en"
                    ? "bg-white text-[#073B75] shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("bn")}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  language === "bn"
                    ? "bg-white text-[#073B75] shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Login & Portal Action */}
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-semibold text-[#073B75] hover:text-[#0878D1] transition-colors"
            >
              {t.nav.login}
            </Link>

            {/* Quick Register / Donor Portal CTA */}
            <Link
              href="/become-donor"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0878D1] hover:bg-[#073B75] shadow-sm transition-all duration-200"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>{t.nav.becomeDonor}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="px-2.5 py-1 text-xs font-bold rounded border border-slate-200 text-slate-700"
            >
              {language === "en" ? "বাংলা" : "EN"}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/become-donor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-[#0878D1] rounded-lg text-sm font-semibold text-white"
            >
              {t.nav.becomeDonor}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
