import { BloodRequest, RequestPriority, RequestStatus } from "@/types";
import { BloodGroup } from "@/lib/bangladesh-data";

let BLOOD_REQUESTS_STORE: BloodRequest[] = [
  {
    id: "req-101",
    patientName: "Taslima Begum (C-Section Emergency)",
    bloodGroup: "O+",
    unitsNeeded: 2,
    unitsFulfilled: 1,
    hospitalName: "Dhaka Medical College Hospital (DMCH)",
    hospitalAddress: "Secretariat Rd, Dhaka 1000",
    divisionId: "dhaka",
    districtId: "dhaka",
    upazilaId: "shahbagh",
    neededDate: "2026-11-03",
    neededTime: "18:00",
    contactPerson: "Kamal Hossain (Husband)",
    contactPhone: "+880 1711-002233",
    priority: "critical",
    status: "matching_donors",
    description: "Emergency blood needed for emergency cesarean section surgery. Hemoglobin dropped to 7.2 g/dL. Immediate blood donor needed at DMCH New Building Blood Bank.",
    createdAt: "2026-11-03T08:30:00Z",
    updatedAt: "2026-11-03T09:15:00Z",
  },
  {
    id: "req-102",
    patientName: "Sohag Miah (Accident Trauma)",
    bloodGroup: "AB+",
    unitsNeeded: 3,
    unitsFulfilled: 2,
    hospitalName: "Chittagong Medical College Hospital (CMCH)",
    hospitalAddress: "57 K.B. Fazlul Kader Rd, Chattogram",
    divisionId: "chattogram",
    districtId: "chattogram",
    upazilaId: "panchlaish",
    neededDate: "2026-11-03",
    neededTime: "20:00",
    contactPerson: "Rafiqul Islam (Brother)",
    contactPhone: "+880 1819-334455",
    priority: "critical",
    status: "donor_responded",
    description: "Road traffic accident victim in Orthopedics & Trauma Unit 2. Internal bleeding stabilized, 1 unit still urgently required for transfusion.",
    createdAt: "2026-11-03T10:00:00Z",
    updatedAt: "2026-11-03T11:20:00Z",
  },
  {
    id: "req-103",
    patientName: "Ayesha Siddiqua (Thalassemia Child)",
    bloodGroup: "B+",
    unitsNeeded: 1,
    unitsFulfilled: 0,
    hospitalName: "Sylhet MAG Osmani Medical College Hospital",
    hospitalAddress: "Medical Rd, Sylhet",
    divisionId: "sylhet",
    districtId: "sylhet",
    upazilaId: "sylhet-sadar",
    neededDate: "2026-11-04",
    neededTime: "11:00",
    contactPerson: "Farid Uddin (Father)",
    contactPhone: "+880 1912-778899",
    priority: "urgent",
    status: "approved",
    description: "Scheduled monthly transfusion for a 9-year-old Thalassemia Major warrior. Filtered fresh whole blood requested.",
    createdAt: "2026-11-02T16:00:00Z",
    updatedAt: "2026-11-02T17:30:00Z",
  },
  {
    id: "req-104",
    patientName: "Abdur Rahim (Cardiac Bypass Surgery)",
    bloodGroup: "A-",
    unitsNeeded: 4,
    unitsFulfilled: 1,
    hospitalName: "National Heart Foundation Hospital",
    hospitalAddress: "Plot 4, Mirpur 2, Dhaka",
    divisionId: "dhaka",
    districtId: "dhaka",
    upazilaId: "mirpur",
    neededDate: "2026-11-05",
    neededTime: "09:00",
    contactPerson: "Zubair Rahim (Son)",
    contactPhone: "+880 1618-556677",
    priority: "urgent",
    status: "matching_donors",
    description: "A-Negative is a rare blood group. CABG Open Heart Surgery scheduled on Thursday morning. Need 3 more verified donors on standby.",
    createdAt: "2026-11-01T12:00:00Z",
    updatedAt: "2026-11-02T14:10:00Z",
  },
];

export const bloodRequestService = {
  async getAllRequests(): Promise<BloodRequest[]> {
    return [...BLOOD_REQUESTS_STORE];
  },

  async getRecentRequests(limit: number = 6): Promise<BloodRequest[]> {
    return [...BLOOD_REQUESTS_STORE]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },

  async getRequestById(id: string): Promise<BloodRequest | null> {
    return BLOOD_REQUESTS_STORE.find((r) => r.id === id) || null;
  },

  async createRequest(
    data: Omit<BloodRequest, "id" | "unitsFulfilled" | "status" | "createdAt" | "updatedAt">
  ): Promise<BloodRequest> {
    const newRequest: BloodRequest = {
      ...data,
      id: `req-${Date.now()}`,
      unitsFulfilled: 0,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    BLOOD_REQUESTS_STORE.unshift(newRequest);
    return newRequest;
  },

  async updateRequestStatus(
    id: string,
    status: RequestStatus,
    unitsFulfilled?: number
  ): Promise<BloodRequest | null> {
    const req = BLOOD_REQUESTS_STORE.find((r) => r.id === id);
    if (!req) return null;
    req.status = status;
    if (typeof unitsFulfilled === "number") {
      req.unitsFulfilled = unitsFulfilled;
    }
    req.updatedAt = new Date().toISOString();
    return req;
  },
};
