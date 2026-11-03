"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  Mail, 
  ExternalLink,
  Users,
  Search,
  CheckCircle2
} from "lucide-react";

export default function OrganizationsPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const organizations = [
    {
      id: "org-01",
      name: "Bangladesh Red Crescent Society (BDRCS)",
      bnName: "বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Mohammadpur",
      address: "684-686, Bara Moghbazar / Aurangzeb Rd, Dhaka",
      phone: "+880 2-9330188",
      email: "bloodcenter@bdrcs.org",
      website: "https://bdrcs.org",
      isVerified: true,
      memberCount: 15400,
      campaignsCount: 340,
      description: "Oldest national humanitarian blood program in Bangladesh providing safe screening and blood collection drives.",
    },
    {
      id: "org-02",
      name: "Sandhani National Blood Program",
      bnName: "সন্ধানী কেন্দ্রীয় পরিষদ",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Shahbagh",
      address: "Dhaka Medical College Unit, Shahbagh, Dhaka",
      phone: "+880 2-9668690",
      email: "central@sandhani.org",
      website: "https://sandhani.org",
      isVerified: true,
      memberCount: 28500,
      campaignsCount: 820,
      description: "Pioneering voluntary medical-student-run blood donation movement in Bangladesh since 1977.",
    },
    {
      id: "org-03",
      name: "Badhan (A Voluntary Blood Donors' Organization)",
      bnName: "বাঁধন (স্বেচ্ছায় রক্তদাতাদের সংগঠন)",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Shahbagh",
      address: "TSC, University of Dhaka, Dhaka 1000",
      phone: "+880 1521-100200",
      email: "info@badhan.org",
      website: "https://badhan.org",
      isVerified: true,
      memberCount: 42000,
      campaignsCount: 1250,
      description: "University-based voluntary blood movement with active branches in government universities and colleges across 64 districts.",
    },
    {
      id: "org-04",
      name: "Quantum Voluntary Blood Donation Program",
      bnName: "কোয়ান্টাম ফাউন্ডেশন রক্তদান কার্যক্রম",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Shantinagar",
      address: "Quantum Lab, 119 Shantinagar, Dhaka",
      phone: "+880 2-9351450",
      email: "blood@quantummethod.org.bd",
      website: "https://blood.quantummethod.org.bd",
      isVerified: true,
      memberCount: 36000,
      campaignsCount: 610,
      description: "State-of-the-art blood testing and component separation facility serving emergency patients 24/7.",
    },
    {
      id: "org-05",
      name: "Police Blood Bank Bangladesh",
      bnName: "বাংলাদেশ পুলিশ ব্লাড ব্যাংক",
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Rajarbagh",
      address: "Central Police Hospital, Rajarbagh, Dhaka",
      phone: "+880 2-9343333",
      email: "bloodbank@police.gov.bd",
      isVerified: true,
      memberCount: 8900,
      campaignsCount: 180,
      description: "Civic voluntary blood bank operated by the Bangladesh Police for law enforcement personnel and general citizens.",
    },
  ];

  const filteredOrgs = organizations.filter(
    (o) =>
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.bnName && o.bnName.includes(searchTerm)) ||
      o.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0878D1] text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "সংগঠন ডিরেক্টরি" : "Institutional Network"}</span>
            </div>
            <h1 className="text-3xl font-black text-[#073B75]">
              {language === "bn" ? "অনুমোদিত রক্তদান সংগঠন ও ব্লাড ব্যাংক" : "Affiliated Blood Organizations & Banks"}
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Verified humanitarian blood clubs, non-profits, and university organizations partnering with LifeDrop Bangladesh.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search organizations or districts..."
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Organizations List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrgs.map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-[#073B75] leading-tight">
                      {org.name}
                    </h2>
                    {org.bnName && (
                      <p className="text-xs text-slate-500 mt-0.5">{org.bnName}</p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#16A34A] shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#0878D1] shrink-0" />
                  <span>{org.address}</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {org.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Volunteers</span>
                    <span className="font-extrabold text-slate-800">{org.memberCount.toLocaleString()} Members</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Drives</span>
                    <span className="font-extrabold text-slate-800">{org.campaignsCount} Camps Held</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <a href={`tel:${org.phone}`} className="hover:text-[#0878D1] flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>{org.phone}</span>
                  </a>
                </div>
                {org.website && (
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#0878D1] hover:underline flex items-center gap-1"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
