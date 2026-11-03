"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { donorService, DonorSearchParams } from "@/lib/services/donorService";
import { DonorProfile } from "@/types";
import { 
  DIVISIONS, 
  DISTRICTS, 
  BLOOD_GROUPS, 
  BloodGroup 
} from "@/lib/bangladesh-data";
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  MapPin, 
  Heart, 
  PhoneCall, 
  Lock, 
  Star, 
  Calendar, 
  Award,
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";
import { formatDate } from "@/lib/utils";

function FindDonorsContent() {
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();

  const [bloodGroup, setBloodGroup] = useState<string>(searchParams.get("bloodGroup") || "");
  const [divisionId, setDivisionId] = useState<string>(searchParams.get("division") || "");
  const [districtId, setDistrictId] = useState<string>(searchParams.get("district") || "");
  const [upazilaId, setUpazilaId] = useState<string>(searchParams.get("upazila") || "");
  const [availability, setAvailability] = useState<string>(searchParams.get("availability") || "");
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Contact request modal state
  const [selectedDonor, setSelectedDonor] = useState<DonorProfile | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [patientNote, setPatientNote] = useState("");

  // Filtered districts & upazilas
  const filteredDistricts = useMemo(() => {
    if (!divisionId) return DISTRICTS;
    return DISTRICTS.filter((d) => d.divisionId === divisionId);
  }, [divisionId]);

  const filteredUpazilas = useMemo(() => {
    if (!districtId) return [];
    const dist = DISTRICTS.find((d) => d.id === districtId);
    return dist ? dist.upazilas : [];
  }, [districtId]);

  const fetchDonors = async () => {
    setLoading(true);
    const results = await donorService.searchDonors({
      bloodGroup: (bloodGroup as BloodGroup) || undefined,
      divisionId: divisionId || undefined,
      districtId: districtId || undefined,
      upazilaId: upazilaId || undefined,
      availability: availability || undefined,
      verifiedOnly,
    });
    setDonors(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchDonors();
  }, [bloodGroup, divisionId, districtId, upazilaId, availability, verifiedOnly]);

  const handleSendContactRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setSelectedDonor(null);
      setContactSuccess(false);
      setPatientNote("");
    }, 2500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0878D1] text-xs font-bold mb-2">
            <Search className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "জাতীয় ব্লাড ডিরেক্টরি" : "National Blood Directory"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#073B75] tracking-tight">
            {language === "bn" ? "রক্তদাতা অনুসন্ধান ও তালিকা" : "Find Blood Donors Nationwide"}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {language === "bn"
              ? "বাংলাদেশের ৮ বিভাগ ও ৬৪ জেলার রক্তদাতাদের সরাসরি অনুসন্ধান করুন। রক্তদাতার ব্যক্তিগত নিরাপত্তার স্বার্থে ফোন নম্বর সুরক্ষানীতি প্রযোজ্য।"
              : "Search verified donors across all 8 divisions and 64 districts. To protect donor privacy, contact details are guarded through a double opt-in protocol."}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-800">
            <Filter className="w-4 h-4 text-[#0878D1]" />
            <span>{language === "bn" ? "ফিল্টার নির্বাচন করুন" : "Filter Options"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Blood Group */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                {t.search.bloodGroup}
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
              >
                <option value="">{t.search.selectBloodGroup}</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* Division */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                {t.search.division}
              </label>
              <select
                value={divisionId}
                onChange={(e) => {
                  setDivisionId(e.target.value);
                  setDistrictId("");
                  setUpazilaId("");
                }}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
              >
                <option value="">{t.search.selectDivision}</option>
                {DIVISIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {language === "bn" ? d.bnName : d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                {t.search.district}
              </label>
              <select
                value={districtId}
                onChange={(e) => {
                  const dist = e.target.value;
                  setDistrictId(dist);
                  setUpazilaId("");
                  if (dist) {
                    const distObj = DISTRICTS.find((d) => d.id === dist);
                    if (distObj && !divisionId) {
                      setDivisionId(distObj.divisionId);
                    }
                  }
                }}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-[#0878D1] focus:outline-none cursor-pointer"
              >
                <option value="">{t.search.selectDistrict}</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {language === "bn" ? d.bnName : d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                {t.search.upazila}
              </label>
              <select
                value={upazilaId}
                onChange={(e) => setUpazilaId(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-[#0878D1] focus:outline-none cursor-pointer"
              >
                <option value="">
                  {!districtId
                    ? language === "bn"
                      ? "আগে জেলা নির্বাচন করুন"
                      : "Select District First"
                    : t.search.selectUpazila}
                </option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.id}>
                    {language === "bn" ? u.bnName : u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                {t.search.availability}
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
              >
                <option value="">{t.search.allStatus}</option>
                <option value="available">{t.search.availableNow}</option>
                <option value="resting">
                  {language === "bn" ? "বিশ্রামে (৯০ দিন পলিসি)" : "Resting (90-day policy)"}
                </option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-[#16A34A] focus:ring-[#16A34A] h-4 w-4"
              />
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>{t.search.verifiedOnly}</span>
            </label>

            <span className="text-xs text-slate-500 font-medium">
              {donors.length} {language === "bn" ? "জন রক্তদাতা পাওয়া গেছে" : "Donors Found"}
            </span>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-16 text-slate-500 font-medium">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0878D1] mx-auto mb-3" />
            <p>{t.common.loading}</p>
          </div>
        ) : donors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">
              {language === "bn" ? "কোন রক্তদাতা পাওয়া যায়নি" : "No Donors Found"}
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              {language === "bn"
                ? "আপনার নির্বাচিত ফিল্টারে কোনো রক্তদাতা পাওয়া যায়নি। অনুগ্রহ করে জেলা বা বিভাগ পরিবর্তন করে পুনরায় চেষ্টা করুন।"
                : "No donors matched your selected criteria. Try broadening your location or checking all availability statuses."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor) => {
              const isAvailable = donor.availability === "available";
              const isResting = donor.availability === "resting";

              return (
                <div
                  key={donor.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Blood Group & Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-200 shrink-0">
                          {donor.avatarUrl ? (
                            <Image
                              src={donor.avatarUrl}
                              alt={donor.fullName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                              {donor.fullName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-slate-900 leading-tight">
                            {language === "bn" && donor.bnFullName ? donor.bnFullName : donor.fullName}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            {donor.isVerified ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-md">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                {t.donorCard.verifiedDonor}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                Member
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Blood Group Badge */}
                      <span className="px-3 py-1.5 rounded-xl font-extrabold text-base bg-red-600 text-white shadow-xs">
                        {donor.bloodGroup}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#0878D1] shrink-0" />
                      <span className="capitalize">
                        {donor.upazilaId}, {donor.districtId}, {donor.divisionId}
                      </span>
                    </div>

                    {/* Availability Status */}
                    <div className="mb-4">
                      {isAvailable ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          {t.donorCard.statusAvailable}
                        </span>
                      ) : isResting ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          {t.donorCard.statusUnavailable}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                          Unavailable
                        </span>
                      )}
                    </div>

                    {/* Verified Donation Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                      <div>
                        <span className="text-slate-500 block">
                          {t.donorCard.donationsCount}
                        </span>
                        <span className="font-extrabold text-slate-800">
                          {donor.verifiedDonationsCount} {language === "bn" ? "বার" : "Times"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">
                          {t.donorCard.lastDonated}
                        </span>
                        <span className="font-semibold text-slate-800">
                          {donor.lastDonationDate ? formatDate(donor.lastDonationDate) : t.donorCard.neverDonated}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Privacy Contact Gate */}
                  <div className="pt-2 border-t border-slate-100">
                    {donor.consentForDirectCall ? (
                      <a
                        href={`tel:${donor.phone}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#16A34A] hover:bg-[#087443] transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{donor.phone}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedDonor(donor)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-[#073B75] bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5 text-[#0878D1]" />
                        <span>{t.donorCard.requestContact}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Double Opt-In Privacy Request Modal */}
        {selectedDonor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
              <button
                type="button"
                onClick={() => setSelectedDonor(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878D1] flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#073B75]">
                    {language === "bn" ? "যোগাযোগের অনুমতি প্রার্থনা" : "Privacy Contact Request"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === "bn" ? "রক্তদাতার গোপনীয়তা সুরক্ষা প্রটোকল" : "Donor Privacy Protection Protocol"}
                  </p>
                </div>
              </div>

              {contactSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle className="w-12 h-12 text-[#16A34A] mx-auto animate-bounce" />
                  <h4 className="text-base font-bold text-slate-800">
                    {t.donorCard.contactRequested}!
                  </h4>
                  <p className="text-xs text-slate-600">
                    {language === "bn"
                      ? "রক্তদাতার ফোনে তাত্ক্ষণিক নোটিফিকেশন পাঠানো হয়েছে। তিনি অনুমোদন করলেই আপনি সরাসরি যোগাযোগ করতে পারবেন।"
                      : "The donor has been notified with your patient emergency details. Once approved, you will receive direct contact clearance."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendContactRequest} className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    <p>
                      <strong>{language === "bn" ? "রক্তদাতা:" : "Donor:"}</strong> {selectedDonor.fullName} ({selectedDonor.bloodGroup})
                    </p>
                    <p>
                      <strong>{language === "bn" ? "অবস্থান:" : "Location:"}</strong> {selectedDonor.districtId}, {selectedDonor.divisionId}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === "bn" ? "রোগীর নাম ও হাসপাতালের তথ্য" : "Patient Name & Hospital"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === "bn" ? "যেমন: ঢাকা মেডিকেল কলেজ, ওয়ার্ড ৪" : "e.g. DMCH Emergency Ward 4"}
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === "bn" ? "আপনার ফোন নম্বর" : "Your Phone Number"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1..."
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === "bn" ? "জরুরি বার্তা / নোট" : "Emergency Note"}
                    </label>
                    <textarea
                      rows={3}
                      value={patientNote}
                      onChange={(e) => setPatientNote(e.target.value)}
                      placeholder={language === "bn" ? "রক্তের প্রয়োজনীয়তার কারণ ও সময় উল্লেখ করুন..." : "Specify urgency, needed units and required time..."}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDonor(null)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      {t.common.cancel}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#0878D1] hover:bg-[#073B75] transition-colors"
                    >
                      {language === "bn" ? "অনুরোধ পাঠান" : "Send Request"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FindDonorsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading donor directory...</div>}>
      <FindDonorsContent />
    </Suspense>
  );
}
