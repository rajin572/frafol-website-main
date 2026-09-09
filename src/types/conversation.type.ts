interface IConversationUser {
  _id: string;
  email: string;
  name: string;
  profileImage: string;
}

interface IConversationInfo {
  _id: string;
  users: IConversationUser[];
  createdBy: string;
  unreadCounts: number;
  blockedUsers: string[] | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IConversation {
  chat: IConversationInfo;
  lastMessage: string;
  message: string;
  unreadMessageCount: number;
  lastMessageSender: string;
  lastMessageCreatedAt: string;
}

interface IMessageSender {
  _id: string;
  name: string;
  profileImage: string;
}

export interface IMessage {
  _id: string;
  text: string;
  images: string[];
  readBy: string[];
  seen: boolean;
  sender: IMessageSender;
  chat: string; // chat ID reference
  approvalStatus: "approved" | "pending" | "rejected"; // safer with enum-style type
  createdAt: string;
  updatedAt: string;
  __v: number;
}
