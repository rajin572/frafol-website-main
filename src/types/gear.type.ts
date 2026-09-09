interface IGearAuthor {
  _id: string;
  name: string;
  sureName: string;
}

interface IGearCategory {
  _id: string;
  title: string;
}

interface IGearShippingCompany {
  name: string;
  price: number;
}

interface IGear {
  _id: string;
  authorId: IGearAuthor;
  categoryId: IGearCategory;
  name: string;
  price: number;
  mainPrice: number;
  description: string;
  condition: "new" | "used"; // You can use union types if there are specific conditions
  gallery: string[]; // Array of image URLs
  vatAmount: number;
  shippingCompany: IGearShippingCompany;
  extraInformation: string;
  approvalStatus: "approved" | "pending" | "rejected"; // Union type for status
  isDeleted: boolean;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
}

export type { IGearAuthor, IGearCategory, IGearShippingCompany, IGear };
