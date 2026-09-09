interface IUser {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
}

interface IReview {
  isAnonymous: boolean;
  _id: string;
  userId: IUser;
  serviceProviderId: string;
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

interface IPendingReview {
  title?: string;
  isAnonymous: boolean;
  _id: string;
  userId: {
    _id: string;
    name: string;
    sureName: string;
    email: string;
    profileImage: string;
  };
  serviceProviderId: {
    _id: string;
    name: string;
    sureName: string;
    profileImage: string;
  };
  eventOrderId: {
    title?: string;
    _id: string;
    orderId: string;
    orderType: string;
    serviceType: string;
    date: string;
    location: string;
    totalPrice: number;
    packageId: {
      _id: string;
      title: string;
    };
    statusTimestamps: {
      createdAt: string;
      acceptedAt?: string;
      inProgressAt?: string;
      deliveryRequestAt?: string;
      deliveredAt?: string;
    };
  };
  rating: number;
  message: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IProfessionalReview {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
  };
  serviceProviderId: string;
  eventOrderId: string;
  rating: number;
  message: string;
  status: "pending" | "approved" | "rejected";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type { IReview, IPendingReview, IProfessionalReview };
