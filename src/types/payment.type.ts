interface User {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
}

interface ServiceProvider {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
}

interface GearMarketplace {
  _id: string;
  price: number;
  name: string;
  description: string;
}

interface GearOrderStatusTimestamps {
  createdAt: string;
  deliveryRequestAt: string | null;
  deliveryRequestDeclineAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
}

interface GearOrder {
  _id: string;
  orderId: string;
  sellerId: ServiceProvider;
  gearMarketplaceId: GearMarketplace;
  orderStatus: string;
  name: string;
  paymentStatus: string;
  statusTimestamps: GearOrderStatusTimestamps;
  createdAt: string;
}

interface ServiceProviderPayment {
  serviceProviderId: ServiceProvider;
  amount: number;
  commission: number;
  netAmount: number;
  serviceProviderPaid: boolean;
}

interface Workshop {
  _id: string;
  title: string;
  price: number;
}

interface EventOrder {
  _id: string;
  orderId: string;
  title: string;
  packageId: { title: string };
  orderType: "custom" | "normal" | string;
  serviceType: string;
  date: string; // ISO string
  location: string;
  statusTimestamps: {
    createdAt: string;
    acceptedAt?: string | null;
    inProgressAt?: string | null;
    deliveredAt?: string | null;
    cancelledAt?: string | null;
  };
  totalPrice: number;
}

interface IPayment {
  _id: string;
  transactionId: string;
  userId: User;
  serviceProviderId?: ServiceProvider; // optional if `serviceProviders` is used
  serviceProviders?: ServiceProviderPayment[];
  amount: number;
  commission: number;
  netAmount: number;
  paymentStatus: "completed" | "pending" | "failed";
  paymentMethod: "stripe" | string;
  paymentType: "event" | "gear" | "workshop" | string;
  eventOrderId: EventOrder;
  gearOrderIds: GearOrder[];
  workshopId: Workshop;
  serviceProviderPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

export type { IPayment };
