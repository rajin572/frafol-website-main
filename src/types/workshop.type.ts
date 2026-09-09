interface Author {
  _id: string;
  name: string;
  sureName: string;
  companyName?: string;
  profileImage: string;
  role: string;
  address?: string;
  town?: string;
  zipCode?: string;
  ico?: string;
  dic?: string;
  ic_dph?: string;
}

interface IWorkshop {
  vatAmount: number;
  vatPercent: number;
  _id: string;
  authorId: Author;
  title: string;
  date: string;
  time: string;
  locationType: string;
  location: string;
  workshopLink: string;
  price: number;
  mainPrice: number;
  description: string;
  image: string;
  maxParticipant: number;
  totalParticipants: number;
  approvalStatus: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Client {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  address?: string;
  town?: string;
  zipCode?: string;
}

interface WorkshopPayment {
  status: string; // 'pending' | 'completed' (You can define these as a union type if you prefer)
  amount: number;
  paidAt: string | null;
}

interface WorkshopParticipantInstructor {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  address?: string;
  town?: string;
  zipCode?: string;
  ico?: string;
  dic?: string;
  ic_dph?: string;
  companyName?: string;
}

interface WorkshopParticipantWorkshop {
  _id: string;
  title: string;
  date: string;
  time: string;
  vatAmount: number;
  price: number;
  mainPrice: number;
}

interface IWorkshopParticipants {
  _id: string;
  orderId: string;
  clientId: Client;
  instructorId: WorkshopParticipantInstructor;
  workshopId: WorkshopParticipantWorkshop;
  paymentStatus: "pending" | "completed";
  streetAddress: string;
  town: string;
  zipCode?: string;
  country: string;
  isRegisterAsCompany: boolean;
  companyName?: string;
  IC_DPH: string;
  couponDiscount?: number;
  name: string;
  isDeleted: boolean;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  instructorPayment: WorkshopPayment;
}

interface InstructorPayment {
  status: string; // 'pending' | 'completed'
  amount: number;
  paidAt: string | null;
}

interface IMyRegisteredWorkshop {
  _id: string;
  orderId: string;
  clientId: string; // Client ID as a string
  instructorId: string;
  workshopId: IWorkshop; // Full workshop object (includes authorId)
  paymentStatus: string; // 'completed' | 'pending'
  streetAddress?: string;
  town?: string;
  zipCode?: string;
  country?: string;
  isRegisterAsCompany?: boolean;
  companyName?: string;
  IC_DPH?: string;
  couponDiscount?: number;
  isDeleted: boolean;
  joinedAt: string; // ISO format date string
  createdAt: string; // ISO format date string
  updatedAt: string; // ISO format date string
  instructorPayment: InstructorPayment;
  workshop: IWorkshop; // Nested workshop object
}

export type { IWorkshop, IWorkshopParticipants, IMyRegisteredWorkshop };
