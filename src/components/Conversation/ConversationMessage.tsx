/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Layout, Tooltip } from "antd";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/socket-context";
import {
  selectSelectedChatUser,
  setSelectedChatUser,
} from "../../redux/features/conversation/conversationSlice";
import ConversationMessageCard from "./ConversationMessageCard";
import ConversationSendMessage from "./ConversationSendMessage";
import Image from "next/image";
import { getServerUrl } from "@/helpers/config/envConfig";
import { IMessage } from "@/types/conversation.type";
import { ISignInUser } from "@/types";
import { AllImages } from "../../../public/assets/AllImages";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SpinLoader from "../ui/SpinLoader";

const ConversationMessage = ({
  allMessages,
  userData,
  onlineUsers,
  totalMessages,
  room,
  page,
}: {
  allMessages: IMessage[];
  userData: ISignInUser;
  onlineUsers: any;
  totalMessages: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  room: string;
  page: number;
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const imageUrl = getServerUrl();
  const socket = useSocket()?.socket;
  const dispatch = useDispatch();
  const selectedConversation = useSelector(selectSelectedChatUser);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Changed
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Added for pagination
  const [messages, setMessages] = useState<any[]>([]);

  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("room");
    params.delete("page");
    replace(`${pathName}?${params.toString()}`, { scroll: false });
    dispatch(setSelectedChatUser(null));
  };




  // Reset on conversation change
  useEffect(() => {
    if (!selectedConversation?.chat?._id) return;
    setMessages([]);
    setIsInitialLoading(true);
    setIsLoadingMore(false);
  }, [selectedConversation?.chat?._id]);

  // Scroll to bottom when new messages loaded on first page
  useEffect(() => {
    if (page === 1 && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, selectedConversation?.chat?._id, page]);

  // Append/prepend messages on fetch
  useEffect(() => {
    if (!allMessages) return;

    // `room` is the conversation `allMessages` was fetched for. While switching
    // conversations, the selected id updates instantly (Redux) but `allMessages`
    // lags behind (server refetch), so skip applying stale data for another
    // conversation. Also re-run on id change so the loader always clears once the
    // matching data is present (otherwise the reset effect can leave it stuck on).
    const selectedId = selectedConversation?.chat?._id;
    if (selectedId && room !== selectedId) return;

    const container = messagesContainerRef.current;
    const prevScrollHeight = container?.scrollHeight || 0;

    setMessages((prev) => {
      if (page === 1) {
        return allMessages;
      } else {
        const newMessages = allMessages?.filter(
          (msg: any) => !prev.some((p) => p._id === msg._id)
        );
        return [...newMessages, ...prev];
      }
    });

    // Adjust scroll for infinite scroll
    setTimeout(() => {
      if (container && page > 1) {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight;
      }
      setIsInitialLoading(false);
      setIsLoadingMore(false);
    }, 100);
  }, [allMessages, page, room, selectedConversation?.chat?._id]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const container = messagesContainerRef.current;
      if (!container || isLoadingMore) return; // Prevent multiple requests

      if (container.scrollTop === 0) {
        if (room === selectedConversation?.chat?._id) {
          if (totalMessages?.totalPage && page < totalMessages?.totalPage) {
            setIsLoadingMore(true); // Set loading state
            const curentPage = page;
            const params = new URLSearchParams(searchParams);
            if (curentPage) {
              params.set("page", (curentPage + 1).toString());
            } else {
              params.delete("page");
            }

            replace(`${pathName}?${params.toString()}`, { scroll: false });
          }
        }
      }
    };

    const container = messagesContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [
    isLoadingMore, // Added dependency
    page,
    pathName,
    replace,
    room,
    searchParams,
    selectedConversation?.chat?._id,
    totalMessages,
    totalMessages?.totalPage,
  ]);

  // New socket message handler
  const handleMessage = useCallback((message: any) => {
    setMessages((prev) => [...prev, message]);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  // Socket connection
  useEffect(() => {
    const roomId = selectedConversation?.chat?._id;
    if (!roomId || !socket) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", roomId.toString());
    socket.on(`message_received::${roomId}`, handleMessage);

    return () => {
      socket.off(`message_received::${roomId}`, handleMessage);
      socket.emit("leave", roomId);
    };
  }, [socket, selectedConversation?.chat?._id, handleMessage]);

  const convertnewMessageFirst = [...messages].sort(
    (a: IMessage, b: IMessage) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div
      className={`w-full ${selectedConversation ? "block lg:block" : "hidden lg:block"
        }`}
    >
      {selectedConversation ? (
        <Layout className={`!bg-[#FFFAF5] lg:col-span-3 xl:col-span-4 h-full`}>
          {/* Header */}
          <div className="!bg-[#FFFFFF] p-2 lg:p-3 border-b-2 border-secondary-color/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center mr-2">
                <MdOutlineArrowBackIosNew
                  onClick={handleBack}
                  className="text-2xl cursor-pointer text-secondary-color"
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <Image
                  width={2000}
                  height={2000}
                  priority={true}
                  fetchPriority="high"
                  className="h-12 w-12 object-cover rounded-full"
                  src={
                    selectedConversation?.chat?.users?.[0]?.profileImage
                      ? `${imageUrl}${selectedConversation?.chat?.users?.[0]?.profileImage}`
                      : AllImages?.dummyProfile
                  }
                  alt="Profile"
                />
                <div>
                  <span className="font-bold text-base sm:text-lg lg:text-xl flex items-center gap-1">
                    {selectedConversation?.chat?.users?.[0]?.name}
                    <Tooltip title="Online">
                      {onlineUsers.includes(
                        selectedConversation?.chat?.users?.[0]?._id
                      ) && (
                          <div className="size-2 rounded-full bg-green-500"></div>
                        )}
                    </Tooltip>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message List - ALWAYS RENDER CONTENT */}
          <Content className="bg-white flex flex-col gap-5 !relative">
            <div className="h-full flex flex-col justify-end !relative ">
              <Card
                className="!border-0 !pb-5 !relative overflow-y-auto border-none h-full overflow-x-hidden  !mb-5"
                ref={messagesContainerRef}
              >
                {/* Show initial loading OR messages */}
                {isInitialLoading && messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <SpinLoader />
                  </div>
                ) : (
                  <>
                    {/* Pagination loading indicator at top */}
                    {isLoadingMore && (
                      <div className="flex items-center justify-center h-full">
                        <SpinLoader />
                      </div>
                    )}

                    {/* Messages */}
                    {convertnewMessageFirst.map((msg: IMessage) => (
                      <ConversationMessageCard
                        key={msg._id}
                        msg={msg}
                        userData={userData}
                        imageUrl={imageUrl as string}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </Card>
            </div>

            {selectedConversation && (
              <ConversationSendMessage socket={socket} room={room} />
            )}
          </Content>
        </Layout>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 h-full">
          <div className="text-center">
            <div className="w-24 h-24 bg-[#EFEFEF] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-secondary-color"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Welcome to Messages
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Select a conversation from the sidebar to start messaging.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationMessage;