interface Author {
  _id: string;
  name: string;
  sureName: string;
  profileImage: string;
  role: string;
}

interface ICommunityPost {
  _id: string;
  authorId: Author;
  title: string;
  text: string;
  images: string[];
  isDeleted: boolean;
  approvalStatus: "approved" | "pending" | "rejected";
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  totalLikes: number;
  isLiked: boolean;
  totalViewers: number;
  totalComments: number;
}

interface IUser {
  _id: string;
  name: string;
  sureName: string;
  profileImage: string;
  role: string;
}

export interface IReply {
  _id: string;
  user: {
    _id: string;
    name: string;
    sureName: string;
    profileImage: string;
  };
  text: string;
  createdAt: string;
}

interface ICommunityComment {
  _id: string;
  user: IUser;
  text: string;
  isAnonymous: boolean;
  createdAt: string; // ISO date string
  replies: IReply[]; // recursive for replies
}

export type { ICommunityPost, ICommunityComment };
