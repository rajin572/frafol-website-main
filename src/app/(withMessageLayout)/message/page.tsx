import ConversationPage from "@/components/Conversation/ConversationPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IConversation } from "@/types/conversation.type";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = ((await searchParams)?.search as string) || "";
  const room = ((await searchParams)?.room as string) || "";
  const page = ((await searchParams)?.page as string) || "1";

  const res = await fetchWithAuth(`/chat/my-chat-list?search=${search}`, {
    next: {
      tags: [TagTypes.conversation],
      revalidate: 0,
    },
  });
  const resdata = await res.json();

  const conversation: IConversation[] = resdata?.data || [];

  let allMessages = [];
  let totalMessages = { page: 1, limit: 10, total: 0, totalPage: 0 };

  if (room) {
    const roomRes = await fetchWithAuth(
      `/message/${room}?page=${page}&limit=50`,
      {
        next: {
          tags: [TagTypes.conversation],
          revalidate: 0,
        },
      }
    );
    const roomResdata = await roomRes.json();
    console.log(roomResdata)
    allMessages = roomResdata?.data?.data || [];
    totalMessages = roomResdata?.data?.meta || {};
  }




  return (
    <div>
      <ConversationPage
        conversation={conversation}
        allMessages={allMessages}
        totalMessages={totalMessages}
        room={room}
        page={Number(page)}
      />
    </div>
  );
};

export default page;
