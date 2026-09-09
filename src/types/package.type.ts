interface Author {
  _id: string;
  name: string;
  sureName: string;
}

interface IPackage {
  _id: string;
  authorId: Author;
  title: string;
  description: string;
  price: number;
  mainPrice: number;
  category: string;
  vatAmount: number;
  duration: string;
  deliveryTime: number;
  approvalStatus: string;
  isDeleted: boolean;
  thumbnailImage: string;
  createdAt: string;
  updatedAt: string;
}

export type { IPackage };
