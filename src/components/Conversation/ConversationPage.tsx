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

  // On mount: open the conversation named in `?room=` (a message notification links to
  // /message?room=<id>), otherwise start with none selected. Before, `room` was always stripped
  // here, so a notification landed on an empty "Vitajte v správach" screen.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room");
    const target = roomParam
      ? conversation?.find((item) => item?.chat?._id === roomParam)
      : undefined;

    dispatch(setSelectedChatUser(target ?? null));

    if (params.has("room") || params.has("page")) {
      if (!target) params.delete("room");
      params.delete("page");
      const query = params.toString();
      window.history.replaceState(null, "", query ? `${pathName}?${query}` : pathName);
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
