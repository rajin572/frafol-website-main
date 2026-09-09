interface ISignInUser {
  userId: string;
  name: string;
  sureName: string;
  companyName: string;
  profileImage: string;
  email: string;
  role: string;
  switchRole: string;
  hasActiveSubscription: boolean;
  subscriptionDays: number;
  iat: number; // issued at (UNIX timestamp)
  exp: number; // expiration time (UNIX timestamp)
}

export type { ISignInUser };
