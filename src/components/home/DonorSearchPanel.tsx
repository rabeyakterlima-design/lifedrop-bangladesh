"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  DIVISIONS, 
  DISTRICTS, 
  BLOOD_GROUPS, 
  BloodGroup,
  District 
} from "@/lib/bangladesh-data";
import { Search, MapPin, Droplet } from "lucide-react";

export function DonorSearchPanel() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");

  // Available districts based on division selection
  const filteredDistricts = useMemo(() => {
    if (!selectedDivision) return DISTRICTS;
    return DISTRICTS.filter((d) => d.divisionId === selectedDivision);
  }, [selectedDivision]);

  // Available upazilas based on district selection
  const filteredUpazilas = useMemo(() => {
    if (!selectedDistrict) return [];
    const dist = DISTRICTS.find((d) => d.id === selectedDistrict);
    return dist ? dist.upazilas : [];
  }, [selectedDistrict]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBloodGroup) params.set("bloodGroup", selectedBloodGroup);
    if (selectedDivision) params.set("division", selectedDivision);
    if (selectedDistrict) params.set("district", selectedDistrict);
    if (selectedUpazila) params.set("upazila", selectedUpazila);

    router.push(`/find-donors?${params.toString()}`);
  };

  return (
    <div className="relative -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#E53945] flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-[#073B75]">
            {t.search.title}
          </h2>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Blood Group */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-[#E53945]" />
                {t.search.bloodGroup}
              </span>
            </label>
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0878D1] focus:border-transparent transition-all"
            >
              <option value="">{t.search.selectBloodGroup}</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Division */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0878D1]" />
                {t.search.division}
              </span>
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict("");
                setSelectedUpazila("");
              }}
              className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0878D1] focus:border-transparent transition-all"
            >
              <option value="">{t.search.selectDivision}</option>
              {DIVISIONS.map((div) => (
                <option key={div.id} value={div.id}>
                  {language === "bn" ? div.bnName : div.name}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0878D1]" />
                {t.search.district}
              </span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedUpazila("");
              }}
              disabled={!selectedDivision && filteredDistricts.length > 20}
              className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0878D1] focus:border-transparent transition-all disabled:opacity-50"
            >
              <option value="">{t.search.selectDistrict}</option>
              {filteredDistricts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {language === "bn" ? dist.bnName : dist.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila / Thana */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0878D1]" />
                {t.search.upazila}
              </span>
            </label>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={!selectedDistrict || filteredUpazilas.length === 0}
              className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0878D1] focus:border-transparent transition-all disabled:opacity-50"
            >
              <option value="">{t.search.selectUpazila}</option>
              {filteredUpazilas.map((upz) => (
                <option key={upz.id} value={upz.id}>
                  {language === "bn" ? upz.bnName : upz.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full h-12 inline-flex items-center justify-center gap-2 px-6 rounded-xl font-bold text-white bg-[#E53945] hover:bg-red-700 shadow-md transition-all duration-200 cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>{t.search.searchBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
