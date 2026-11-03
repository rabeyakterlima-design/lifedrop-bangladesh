"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { bloodRequestService } from "@/lib/services/bloodRequestService";
import { 
  DIVISIONS, 
  DISTRICTS, 
  BLOOD_GROUPS, 
  BloodGroup 
} from "@/lib/bangladesh-data";
import { RequestPriority } from "@/types";
import { 
  AlertCircle, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Building2, 
  Calendar,
  Heart 
} from "lucide-react";

export default function NewBloodRequestPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [unitsNeeded, setUnitsNeeded] = useState(1);
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [divisionId, setDivisionId] = useState("dhaka");
  const [districtId, setDistrictId] = useState("dhaka");
  const [upazilaId, setUpazilaId] = useState("shahbagh");
  const [neededDate, setNeededDate] = useState("");
  const [neededTime, setNeededTime] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [priority, setPriority] = useState<RequestPriority>("critical");
  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Cascading districts
  const filteredDistricts = useMemo(() => {
    return DISTRICTS.filter((d) => d.divisionId === divisionId);
  }, [divisionId]);

  // Cascading upazilas
  const filteredUpazilas = useMemo(() => {
    const dist = DISTRICTS.find((d) => d.id === districtId);
    return dist ? dist.upazilas : [];
  }, [districtId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await bloodRequestService.createRequest({
        patientName,
        bloodGroup,
        unitsNeeded: Number(unitsNeeded),
        hospitalName,
        hospitalAddress,
        divisionId,
        districtId,
        upazilaId,
        neededDate,
        neededTime,
        contactPerson,
        contactPhone,
        priority,
        description,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/blood-requests");
      }, 2000);
    } catch (err) {
      alert("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blood-requests"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0878D1] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "bn" ? "জরুরি রক্তের বোর্ডে ফিরে যান" : "Back to Blood Requests"}</span>
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E53945] flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#073B75]">
                {language === "bn" ? "জরুরি রক্তের আবেদন ফরম" : "Post Emergency Blood Request"}
              </h1>
              <p className="text-xs text-slate-500">
                {language === "bn"
                  ? "আবেদনটি সরাসরি বাংলাদেশের রক্তদাতা ও ভলান্টিয়ার নেটওয়ার্কে প্রকাশিত হবে।"
                  : "Your emergency alert will be dispatched to nearby verified donors and coordinators."}
              </p>
            </div>
          </div>

          {success ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-16 h-16 text-[#16A34A] mx-auto animate-bounce" />
              <h2 className="text-2xl font-extrabold text-[#073B75]">
                {language === "bn" ? "আবেদন সফলভাবে প্রকাশিত হয়েছে!" : "Emergency Request Posted Successfully!"}
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {language === "bn"
                  ? "সংশ্লিষ্ট এলাকার রক্তদাতাদের অ্যালার্ট পৌঁছে দেওয়া হচ্ছে। আপনাকে দ্রুত বোর্ডে নিয়ে যাওয়া হচ্ছে..."
                  : "Matching donors are being alerted in your district. Redirecting you to the live board..."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient & Group Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-6">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    {t.emergency.patientName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Sultana Begum (Surgery)"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    {t.emergency.bloodGroup} *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-bold text-red-600 focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  >
                    {BLOOD_GROUPS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    {t.emergency.unitsNeeded} *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    required
                    value={unitsNeeded}
                    onChange={(e) => setUnitsNeeded(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>
              </div>

              {/* Priority & Urgency */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  {t.emergency.urgency} *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["critical", "urgent", "normal"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold capitalize border transition-all ${
                        priority === p
                          ? p === "critical"
                            ? "bg-red-600 text-white border-red-600 shadow-sm"
                            : p === "urgent"
                            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                            : "bg-[#0878D1] text-white border-[#0878D1] shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hospital & Location */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.emergency.hospitalName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      placeholder="e.g. Dhaka Medical College Hospital"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {language === "bn" ? "হাসপাতালের ঠিকানা / ওয়ার্ড" : "Hospital Address / Ward"}
                    </label>
                    <input
                      type="text"
                      value={hospitalAddress}
                      onChange={(e) => setHospitalAddress(e.target.value)}
                      placeholder="e.g. ICU Ward 3, New Building"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Division -> District -> Upazila cascading */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.emergency.division} *
                    </label>
                    <select
                      value={divisionId}
                      onChange={(e) => {
                        setDivisionId(e.target.value);
                        setDistrictId("");
                        setUpazilaId("");
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    >
                      {DIVISIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {language === "bn" ? d.bnName : d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.emergency.district} *
                    </label>
                    <select
                      value={districtId}
                      onChange={(e) => {
                        setDistrictId(e.target.value);
                        setUpazilaId("");
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    >
                      <option value="">Select District</option>
                      {filteredDistricts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {language === "bn" ? d.bnName : d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.emergency.upazila} *
                    </label>
                    <select
                      value={upazilaId}
                      onChange={(e) => setUpazilaId(e.target.value)}
                      disabled={!districtId || filteredUpazilas.length === 0}
                      className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none disabled:opacity-50"
                    >
                      <option value="">Select Upazila</option>
                      {filteredUpazilas.map((u) => (
                        <option key={u.id} value={u.id}>
                          {language === "bn" ? u.bnName : u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    {t.common.dateNeeded} *
                  </label>
                  <input
                    type="date"
                    required
                    value={neededDate}
                    onChange={(e) => setNeededDate(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    {language === "bn" ? "প্রয়োজনের সময় (যদি নির্দিষ্ট থাকে)" : "Required Time"}
                  </label>
                  <input
                    type="time"
                    value={neededTime}
                    onChange={(e) => setNeededTime(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>
              </div>

              {/* Contact Person Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    {t.common.contactPerson} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Tareq Hasan (Brother)"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    {t.emergency.contactPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+880 1..."
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t.emergency.description} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={language === "bn" ? "রোগীর বর্তমান শারীরিক অবস্থা, অপারেশনের কারণ ও রক্তের প্রয়োজনীয়তার বিস্তারিত লিখুন..." : "Provide clear clinical context, emergency urgency reasons, and any donor eligibility instructions..."}
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl font-bold text-sm text-white bg-[#E53945] hover:bg-red-700 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{submitting ? "Publishing Emergency Alert..." : t.emergency.submitRequest}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
