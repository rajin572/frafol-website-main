/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPackage } from "./package.type";

interface IProfileId {
  _id: string;
  about: string;
}

interface IStarCounts {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

interface IProfessionalUser {
  subscriptionId: any;
  hasActiveSubscription: boolean;
  subscriptionExpiryDate: any;
  subscriptionDays: number;
  _id: string;
  profileId: IProfileId;
  name: string;
  companyName: string;
  email: string;
  dic?: string;
  ico?: string;
  phone: string;
  sureName: string;
  profileImage: string;
  role: string;
  address: string;
  hourlyRate: number;
  maxHourlyRate: number;
  minHourlyRate: number;
  totalReview: number;
  totalReviews: number;
  averageRating: number;
  starCounts: IStarCounts;
  package: IPackage[];
  unAvailability: string[]; // You can specify a more specific type for gallery if needed
  gallery: string[]; // You can specify a more specific type for gallery if needed
  introVideo: string;
  bannerImages: string[];
  country: string;
  town: string;
  zipCode: string;
}

interface IProfessional {
  subscriptionId: any;
  hasActiveSubscription: boolean;
  subscriptionExpiryDate: any;
  subscriptionDays: number;
  _id: string; // MongoDB ObjectId or string
  name: string;
  sureName: string;
  profileImage: string;
  role: string;
  address: string;
  town: string;
  country: string;
  hourlyRate: number;
  maxHourlyRate: number;
  minHourlyRate: number;
  averageRating: number;
  totalReview: number;
  introVideo: string;
  bannerImages: string[];
  gallery: string[];
}

export type { IProfessional, IProfessionalUser };
