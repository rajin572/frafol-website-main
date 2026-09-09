interface ICategory {
  createdAt: string; // Date in ISO format
  createdBy: string; // User ID or reference
  image: string; // Image URL or path
  isDeleted: boolean; // Status of deletion
  subTitle: string; // Subtitle for the category
  title: string; // Title of the category
  type: string; // Type of category, e.g., "photoGraphy"
  updatedAt: string; // Date when the category was last updated
  __v: number; // MongoDB versioning key
  _id: string; // MongoDB ObjectId
}

export type { ICategory };
