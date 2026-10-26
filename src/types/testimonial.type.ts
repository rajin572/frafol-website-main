interface User {
  _id: string;
  name: string;
  sureName: string;
  profileImage: string;
  // user | company | photographer | videographer | both | admin
  role: string;
  switchRole: string;
}

interface ITestimonial {
  _id: string;
  userId: User; // The user who made the comment
  text: string;
  isDeleted: boolean;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  __v: number; // MongoDB versioning field
}

export type { ITestimonial };
