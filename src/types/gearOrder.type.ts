interface Client {
  name: string;
  companyName: string;
  _id: string;
  email: string;
  phone: string;
  address: string;
  town?: string;
  zipCode?: string;
  ico: string;
  dic: string;
  ic_dph: string;
  profileImage: string;
}
interface Seller {
  _id: string;
  name: string;
  companyName: string;
  email: string;
  address: string;
  town?: string;
  zipCode?: string;
  phone: string;
  ico: string;
  dic: string;
  ic_dph: string;
  profileImage: string;
}

interface ShippingCompany {
  name: string;
  price: number;
}

interface GearMarketplace {
  _id: string;
  name: string;
  price: number;
  vatAmount: number;
  platformCommission: number;
  totalVatAmount: number;
  description: string;
  condition: string;
  gallery: string[];
  shippingCompany: ShippingCompany;
  approvalStatus: string;
  mainPrice: number;
  status: string;
}
interface PaymentId {
  _id: string;
  transactionId: string;
  paymentMethod: string;
}

interface IGearOrder {
  _id: string;
  orderId: string;
  clientId: Client;
  sellerId: Seller;
  gearMarketplaceId: GearMarketplace;
  paymentId: PaymentId;
  orderStatus: string;
  paymentStatus: string;
  name: string;
  shippingAddress: string;
  postCode: string;
  town: string;
  mobileNumber: string;
  email: string;
  loginAsCompany: boolean;
  companyName?: string;
  ico: string;
  dic: string;
  ic_dph?: string;
  statusTimestamps: {
    createdAt: string;
    deliveryRequestAt: string;
    deliveryRequestDeclineAt: string | null;
    deliveredAt: string;
    cancelledAt: string | null;
  };
  companyAddress: string;
  deliveryNote: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type { IGearOrder };
