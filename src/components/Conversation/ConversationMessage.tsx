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
import Link from "next/link";
import { getMediaUrl } from "@/utils/mediaUrl";
import { IMessage, isOfficialAdminRole } from "@/types/conversation.type";
import { ISignInUser } from "@/types";
import { AllImages } from "../../../public/assets/AllImages";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SpinLoader from "../ui/SpinLoader";
import { RiShieldCheckFill, RiVerifiedBadgeFill } from "react-icons/ri";

// Wraps the header user (picture + name) in a link when a public profile exists.
const HeaderUserLink = ({
  userId,
  isLink,
  children,
}: {
  userId?: string;
  isLink: boolean;
  children: React.ReactNode;
}) =>
  isLink && userId ? (
    <Link
      href={`/professionals/${userId}`}
      className="flex justify-center items-center gap-2 cursor-pointer !text-secondary-color"
    >
      {children}
    </Link>
  ) : (
    <div className="flex justify-center items-center gap-2 text-secondary-color">{children}</div>
  );

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

  const socket = useSocket()?.socket;
  const dispatch = useDispatch();
  const selectedConversation = useSelector(selectSelectedChatUser);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  // Find the other participant in the active conversation
  const chatPartner =
    selectedConversation?.chat?.users?.find(
      (u) => u?._id?.toString() !== userData?.userId?.toString()
    ) || selectedConversation?.chat?.users?.[0];

  const role = chatPartner?.role?.toLowerCase();
  const isAdminOrSuperAdmin = isOfficialAdminRole(role);

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
      if (!container || isLoadingMore) return;

      if (container.scrollTop === 0) {
        if (room === selectedConversation?.chat?._id) {
          if (totalMessages?.totalPage && page < totalMessages?.totalPage) {
            setIsLoadingMore(true);
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
    isLoadingMore,
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
    console.log(message);
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

  const convertnewMessageFirst = [...messages]
    .filter((msg: any) => {
      if (msg?.approvalStatus === "rejected") return false;
      if (msg?.approvalStatus === "pending") {
        const senderId = msg?.sender?._id || msg?.sender;
        return senderId?.toString() === userData?.userId?.toString();
      }
      return true;
    })
    .sort(
      (a: any, b: any) =>
        new Date(a.createdAt || a.time).getTime() - new Date(b.createdAt || b.time).getTime()
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

              {/* Clients can open the professional's public profile from the chat header (only for regular professionals, not admins) */}
              <HeaderUserLink
                userId={chatPartner?._id}
                isLink={
                  !isAdminOrSuperAdmin &&
                  (userData?.role === "user" || userData?.role === "company")
                }
              >
                <div className="relative shrink-0">
                  <Image
                    width={2000}
                    height={2000}
                    priority={true}
                    fetchPriority="high"
                    className={`h-12 w-12 object-cover rounded-full ${isAdminOrSuperAdmin
                      ? "ring-2 ring-secondary-color shadow-sm"
                      : ""
                      }`}
                    src={
                      getMediaUrl(chatPartner?.profileImage) ||
                      AllImages?.dummyProfile
                    }
                    alt={chatPartner?.name || "Profile"}
                  />
                  {isAdminOrSuperAdmin && (
                    <Tooltip title="Oficiálny overený účet FRAFOL" placement="bottom">
                      <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-md flex items-center justify-center ring-1 ring-secondary-color/40">
                        <RiShieldCheckFill className="size-4 text-secondary-color" />
                      </span>
                    </Tooltip>
                  )}
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-base sm:text-lg lg:text-xl text-secondary-color">
                      {chatPartner?.name}
                    </span>


                    <Tooltip title="Online">
                      {onlineUsers.includes(chatPartner?._id) && (
                        <div className="size-2.5 rounded-full bg-green-500"></div>
                      )}
                    </Tooltip>
                  </div>

                  {isAdminOrSuperAdmin && (
                    <span className="text-xs text-secondary-color flex items-center gap-1 font-medium mt-0.5">
                      <RiVerifiedBadgeFill className="text-xs shrink-0" />
                      <span>Oficiálna podpora a tím FRAFOL</span>
                    </span>
                  )}
                </div>
              </HeaderUserLink>
            </div>
          </div>

          {/* Anti-Scam Official Administrator Security Banner */}
          {isAdminOrSuperAdmin && (
            <div className="bg-gradient-to-r from-red-50 via-amber-50/60 to-orange-50 border-b border-secondary-color/20 px-3 sm:px-4 py-2.5 text-xs flex items-center gap-2.5 sm:gap-3 shadow-xs">
              <div className="p-1.5 sm:p-2 bg-secondary-color text-white rounded-lg shrink-0 shadow-xs flex items-center justify-center">
                <RiShieldCheckFill className="text-lg sm:text-xl text-yellow-300" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-secondary-color flex items-center gap-2 flex-wrap">
                  <span>Oficiálna komunikácia FRAFOL</span>
                  <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded border border-green-300 flex items-center gap-1 uppercase tracking-wide">
                    <span className="size-1.5 rounded-full bg-green-600 inline-block"></span>
                    Systémovo overené
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-700 leading-snug mt-0.5">
                  Komunikujete s oficiálnym zástupcom platformy FRAFOL. Administrátori od vás <strong className="text-gray-900 font-bold">nikdy nebudú žiadať vaše heslo</strong>, SMS overovacie kódy ani údaje z platobnej karty.
                </p>
              </div>
            </div>
          )}

          {/* Message List - ALWAYS RENDER CONTENT */}
          <Content className="bg-white flex flex-col gap-5 !relative">
            <div className="h-full flex flex-col justify-end !relative ">
              <Card
                className="!border-0 !pb-5 !relative overflow-y-auto border-none h-full overflow-x-hidden !mb-5"
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
                        isPartnerAdmin={isAdminOrSuperAdmin}
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
              Vitajte v správach
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Vyberte konverzáciu v bočnom paneli a začnite písať.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationMessage;
