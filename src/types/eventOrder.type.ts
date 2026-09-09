interface ICreateEventOrder {
  title: string;
  orderType: "direct" | "custom"; // Can be either 'direct' or 'custom'
  packageId?: string; // Only required for 'direct' orders
  location: string;
  time: string;
  date?: string; // Optional: Only required for 'direct' orders
  serviceProviderId?: string; // Optional: Only for 'custom' orders
  serviceType?: string; // Optional: Only for 'custom' orders
  budget_range?: string; // Optional: Only for 'custom' orders
  duration?: string; // Optional: Only for 'custom' orders
  streetAddress?: string; // Optional: Only for 'custom' orders
  town?: string; // Optional: Only for 'custom' orders
  zipCode?: string; // Optional: Only for 'custom' orders
  country: string;
  isRegisterAsCompany?: boolean; // Optional: Only for 'custom' orders
  name?: string; // Optional: Only for 'custom' orders
  sureName?: string; // Optional: Only for 'custom' orders
  price?: number; // Optional: Only for 'custom' orders, and needed if company is involved
  deliveryDate?: string; // Optional: Only for 'custom' orders with a company
  companyName?: string; // Optional: Only for 'custom' orders with a company
  ico?: string; // Optional: Only for 'custom' orders with a company
  dic?: string; // Optional: Only for 'custom' orders with a company
  ic_dph?: string; // Optional: Only for 'custom' orders with a company
  description?: string;
}

type OrderStatus =
  | "pending"
  | "declined"
  | "accepted"
  | "inProgress"
  | "deliveryRequest"
  | "delivered"
  | "cancelRequest"
  | "deliveryRequestDeclined"
  | "cancelled";

interface IExtensionRequest {
  requestedBy: string; // Assuming this is a string (userId or name)
  newDeliveryDate: Date;
  reason: string;
  _id: string;
  approved: boolean;
  status: string;
}

interface IStatusTimestamps {
  createdAt?: Date;
  acceptedAt?: Date;
  inProgressAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
}

interface IStatusHistory {
  status: OrderStatus;
  changedAt: Date;
}

interface IEventOrder {
  _id: string;
  orderId: string;
  title?: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
    address?: string; // Adding optional address field to user
    town?: string;
    zipCode?: string;
    phone?: string; // Optional phone field for the user
    ico?: string;
    dic?: string;
    ic_dph?: string;
    companyName?: string;
  };
  serviceProviderId: {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
    phone: string;
    ic_dph?: string;
    dic: string;
    ico: string;
    address: string;
    town?: string;
    zipCode?: string;
    companyName: string;
  };
  date: Date;
  orderType: "direct" | "custom"; // The type of the order
  serviceType: "photography" | "videography" | "both"; // Type of service
  location: string; // The location for the order
  time: string; // The time for the order
  price?: number; // Optional, price of the order
  priceWithServiceFee?: number; // Optional, price including service fee
  vatAmount?: number; // Optional, VAT amount
  totalPrice?: number; // Optional, total price of the order
  packageId?: {
    _id: string;
    title: string;
    price: string;
    description: string;
  }; // Optional, if order is related to a package
  packageName?: string; // Optional, name of the package
  deliveryDate?: Date; // Optional, expected delivery date
  lastDeliveryDate?: Date; // Optional, last delivery date
  budget_range?: string; // Optional, budget range for custom orders
  duration?: string; // Optional, duration for custom orders
  streetAddress?: string; // Optional, street address for custom orders
  town?: string; // Optional, town for custom orders
  zipCode?: string; // Optional, zip code for custom orders
  country?: string; // Optional, country for custom orders
  isRegisterAsCompany?: boolean; // Optional, if registered as a company
  companyName?: string; // Optional, company name if registered as a company
  ICO?: string; // Optional, ICO for company
  DIC?: string; // Optional, DIC for company
  IC_DPH?: string; // Optional, IC_DPH for company
  name?: string; // Optional, name of the person making the order (if custom)
  sureName?: string; // Optional, surname of the person (if custom)
  status: OrderStatus; // The current status of the order
  declineReason?: string; // Optional, reason if declined
  deliveryRequestDeclinedReason?: string; // Optional, reason if declined
  cancelReason?: string; // Optional, reason if cancelled
  description?: string; // Optional, a description of the order
  statusTimestamps: IStatusTimestamps; // Timestamps for different statuses
  statusHistory: IStatusHistory[]; // History of status changes
  extensionRequests: IExtensionRequest[]; // Any extension requests for the order
  paymentStatus: string; // Status of the payment (e.g., "paid", "unpaid")
  isDeleted: boolean; // Whether the order is deleted
  createdAt: string;
  updatedAt: string;
  cancelRequestedBy?: string;
  couponDiscount?: number;
  couponCode?: string;
  paymentId?: string;
}

export type { ICreateEventOrder, IEventOrder };
