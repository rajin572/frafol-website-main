interface IProfileId {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  _id: string;
  about: string;
  acceptTerms: boolean;
  ramcuvaAgree: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IProfile {
  _id: string;
  introVideo: string;
  bannerImages: string[];
  profileId: IProfileId;
  name: string;
  sureName: string;
  companyName: string;
  email: string;
  profileImage: string;
  role: string;
  phone: string;
  switchRole: string;
  address: string;
  town: string;
  country: string;
  hourlyRate: number;
  maxHourlyRate: number;
  minHourlyRate: number;
  ico: string;
  dic: string;
  zipCode: string;
  dateOfBirth: string;
  ic_dph?: string;
  rating: number;
  photographerSpecializations: string[];
  videographerSpecializations: string[];
  travelTowns: string[];
  gallery: string[];
  unAvailability: string[];
  newsLetterSub: boolean;
  deleteRequestStatus: "none" | "pending" | "approve" | "rejected";
  deleteRequestedAt: string | null;
  deleteApprovedBy: string | null;
  deleteRequestReason: string | null;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface NotificationMessage {
  fullName: string;
  image: string;
  text: string;
  photos: string[];
  _id: string;
}

interface INotification {
  _id: string;
  userId: string;
  receiverId: string;
  message: NotificationMessage;
  type: "DirectBookingRequest" | string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { IProfile, INotification };
