import { DigitalIDCard, RoleName, IDCardStatus } from "@/types";
import { BloodGroup } from "@/lib/bangladesh-data";

// Sample verified ID Cards stored in the database
let ID_CARDS_STORE: DigitalIDCard[] = [
  {
    id: "card-001",
    cardIdNumber: "LD-BD-2026-000125",
    userId: "usr-001",
    fullName: "Rabeya Akter Lima",
    role: "donor",
    bloodGroup: "O+",
    region: "Chittagong, Bangladesh",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    issuedAt: "2026-01-01",
    status: "active",
    verifyToken: "vtok_9f8e7d6c5b4a3210e7d8c9b0a1f2e3d4",
  },
  {
    id: "card-002",
    cardIdNumber: "LD-BD-2026-000042",
    userId: "usr-002",
    fullName: "Tanvir Ahmed Chowdhury",
    role: "district_coordinator",
    bloodGroup: "A+",
    region: "Dhaka District, Bangladesh",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    issuedAt: "2026-01-15",
    status: "active",
    verifyToken: "vtok_a1b2c3d4e5f6789012345678abcdef01",
  },
];

export const idCardService = {
  async getCardByToken(verifyToken: string): Promise<DigitalIDCard | null> {
    return ID_CARDS_STORE.find((c) => c.verifyToken === verifyToken) || null;
  },

  async getCardByUserId(userId: string): Promise<DigitalIDCard | null> {
    return ID_CARDS_STORE.find((c) => c.userId === userId) || null;
  },

  async getCardByIdNumber(idNumber: string): Promise<DigitalIDCard | null> {
    return ID_CARDS_STORE.find((c) => c.cardIdNumber === idNumber) || null;
  },

  async issueCard(params: {
    userId: string;
    fullName: string;
    role: RoleName;
    bloodGroup?: BloodGroup;
    region: string;
    avatarUrl: string;
  }): Promise<DigitalIDCard> {
    const existing = ID_CARDS_STORE.find((c) => c.userId === params.userId && c.role === params.role);
    if (existing) {
      return existing;
    }

    const randomSerial = Math.floor(100000 + Math.random() * 900000);
    const cardIdNumber = `LD-BD-2026-${randomSerial}`;
    
    // Cryptographically secure token simulation
    const randHex = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const verifyToken = `vtok_${randHex}`;

    const newCard: DigitalIDCard = {
      id: `card-${Date.now()}`,
      cardIdNumber,
      userId: params.userId,
      fullName: params.fullName,
      role: params.role,
      bloodGroup: params.bloodGroup,
      region: params.region,
      avatarUrl: params.avatarUrl,
      issuedAt: new Date().toISOString().split("T")[0],
      status: "active",
      verifyToken,
    };

    ID_CARDS_STORE.push(newCard);
    return newCard;
  },

  async revokeCard(cardId: string): Promise<boolean> {
    const card = ID_CARDS_STORE.find((c) => c.id === cardId);
    if (card) {
      card.status = "revoked";
      return true;
    }
    return false;
  },
};
