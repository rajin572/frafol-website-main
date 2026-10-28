/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMediaUrl } from "@/utils/mediaUrl";
import {
  selectSelectedChatUser,
  setSelectedChatUser,
} from "../../redux/features/conversation/conversationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { formatDateTime } from "../../utils/dateFormet";
import Image from "next/image";
import { IConversation, isOfficialAdminRole } from "@/types/conversation.type";
import { AllImages } from "../../../public/assets/AllImages";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tooltip } from "antd";
import { RiShieldCheckFill, RiVerifiedBadgeFill } from "react-icons/ri";
import { useGetUserData } from "@/context/useGetUserData";

interface IConversationChatListCardProps {
  conversation: IConversation;
  imageUrlSrc?: string;
  onlineUsers: any[];
}

const ConversationChatListCard = ({
  conversation,
  imageUrlSrc,
  onlineUsers,
}: IConversationChatListCardProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;
  const dispatch = useAppDispatch();
  const selectedConversation = useAppSelector(selectSelectedChatUser);
  const currentUser = useGetUserData();

  // Find the other participant in the conversation
  const chatPartner =
    conversation?.chat?.users?.find(
      (u) => u?._id?.toString() !== currentUser?.userId?.toString()
    ) || conversation?.chat?.users?.[0];

  const role = chatPartner?.role?.toLowerCase();
  const isAdminOrSuperAdmin = isOfficialAdminRole(role);
  const isSelected = conversation?.chat?._id === selectedConversation?.chat?._id;

  const handleConversationSelect = (conversation: IConversation) => {
    const conversationId = conversation?.chat?._id;

    // Create a new URLSearchParams object to modify search params
    const params = new URLSearchParams(searchParams);

    // Set the room and DELETE page params (don't set to "1")
    if (conversationId) {
      params.set("room", conversationId);
      params.delete("page");
    } else {
      params.delete("room");
      params.delete("page");
    }

    // Replace the URL with the new params
    replace(`${pathName}?${params.toString()}`, { scroll: false });

    // Dispatch the selected conversation to Redux
    dispatch(setSelectedChatUser(conversation));
  };

  const partnerName = chatPartner?.name || "Užívateľ";
  const avatarUrl =
    getMediaUrl(chatPartner?.profileImage || imageUrlSrc) || AllImages?.dummyProfile;

  return (
    <div
      onClick={() => handleConversationSelect(conversation)}
      className={`m-1 rounded-lg transition-all cursor-pointer relative overflow-hidden ${isSelected
        ? "!bg-secondary-color text-white shadow-md"
        : isAdminOrSuperAdmin
          ? "bg-gradient-to-r from-red-50/90 via-amber-50/30 to-white border border-secondary-color/30 text-black hover:bg-red-50 shadow-xs"
          : "border-b border-secondary-color/10 bg-secondary-color/10 text-black hover:bg-secondary-color/15"
        }`}
    >
      {/* Official FRAFOL left accent indicator bar */}
      {isAdminOrSuperAdmin && !isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary-color to-[#ffc700]" />
      )}

      <div className={`py-3 px-2.5 ${isAdminOrSuperAdmin && !isSelected ? "pl-3.5" : ""}`}>
        <div className="flex items-center gap-2.5">
          {/* Avatar with official badge overlay if admin */}
          <div className="relative shrink-0">
            <Image
              className={`rounded-full aspect-square h-12 w-12 object-cover ${isAdminOrSuperAdmin
                ? isSelected
                  ? "ring-2 ring-white/80 shadow-xs"
                  : "ring-2 ring-secondary-color shadow-xs"
                : ""
                }`}
              src={avatarUrl}
              width={100}
              height={100}
              alt={partnerName}
              priority={true}
              fetchPriority="high"
            />
            {isAdminOrSuperAdmin && (
              <Tooltip title="Oficiálny účet FRAFOL" placement="top">
                <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-md flex items-center justify-center ring-1 ring-secondary-color/40">
                  <RiShieldCheckFill className="size-4 text-secondary-color" />
                </span>
              </Tooltip>
            )}
          </div>

          <div className="w-full min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                <p className="font-semibold text-base leading-tight truncate max-w-[140px] sm:max-w-[160px]">
                  {partnerName}
                </p>

                {/* Official verified badge pill */}

                {onlineUsers?.includes(chatPartner?._id) && (
                  <div className="size-2 rounded-full bg-green-500 shrink-0"></div>
                )}
              </div>

              <div
                className={`text-xs shrink-0 ${isSelected ? "text-white/80" : "text-gray-400"
                  }`}
              >
                {conversation?.lastMessageCreatedAt
                  ? formatDateTime(conversation?.lastMessageCreatedAt)
                  : ""}
              </div>
            </div>

            {/* Official subtitle to build trust and prevent scammers */}
            {isAdminOrSuperAdmin && (
              <div
                className={`text-[11px] font-medium flex items-center gap-1 mt-0.5 ${isSelected ? "text-amber-200" : "text-secondary-color"
                  }`}
              >
                <RiVerifiedBadgeFill className="text-xs shrink-0" />
                <span className="truncate">Oficiálna podpora FRAFOL</span>
              </div>
            )}

            <div className="flex justify-between items-center w-full mt-1">
              <div
                className={`text-sm truncate max-w-[190px] sm:max-w-[210px] ${isSelected ? "text-white/90" : "text-gray-600"
                  }`}
              >
                {conversation?.lastMessage
                  ? conversation?.lastMessage
                  : "Žiadne správy"}
              </div>

              {conversation?.unreadMessageCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#11c186] text-white shrink-0">
                  {conversation.unreadMessageCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationChatListCard;
