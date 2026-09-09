"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ConversationChatList from "./ConversationChatList";
import ConversationMessage from "./ConversationMessage";
import { IConversation, IMessage } from "@/types/conversation.type";
import { ISignInUser } from "@/types";
import { useGetUserData } from "@/context/useGetUserData";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { setSelectedChatUser } from "@/redux/features/conversation/conversationSlice";

const ConversationPage = ({
  conversation,
  allMessages,
  totalMessages,
  room,
  page,
}: {
  conversation: IConversation[];
  allMessages: IMessage[];
  totalMessages: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  room: string;
  page: number;
}) => {
  // const userData = useGetUserData();
  // const onlineUsers = useAppSelector((state) => state.conversation.onlineUser);
  const userData = useGetUserData();
  const onlineUsers = useAppSelector((state) => state.conversation.onlineUser);
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  console.log(userData)

  // Clear room and page params on mount (page reload)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    dispatch(setSelectedChatUser(null));
    if (params.has("room") || params.has("page")) {
      params.delete("room");
      params.delete("page");
      const newUrl = `${pathName}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount
  return (
    <div className="">
      <div className="flex h-[93vh] relative overflow-hidden">
        <ConversationChatList
          conversation={conversation}
          onlineUsers={onlineUsers}
        />
        <ConversationMessage
          allMessages={allMessages}
          userData={userData as ISignInUser}
          totalMessages={totalMessages}
          onlineUsers={onlineUsers}
          room={room}
          page={page}
        />
      </div>
    </div>
  );
};

export default ConversationPage;
