/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from "@/types/conversation.type";
import { formatDateTime } from "../../utils/dateFormet";
import ImagePreviewer from "../shared/ImagePreviewer";
import { ISignInUser } from "@/types";
import Link from "next/link";
import { RiShieldCheckFill } from "react-icons/ri";

const isUrl = (text: string) => {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

interface ConversationMessageCardProps {
  msg: IMessage;
  userData: ISignInUser;
  isPartnerAdmin?: boolean;
}

const ConversationMessageCard = ({
  msg,
  userData,
  isPartnerAdmin = false,
}: ConversationMessageCardProps) => {
  const isMyMessage =
    msg?.sender?._id === userData?.userId ||
    msg?.sender?._id?.toString() === userData?.userId?.toString();
  const isFromAdmin = !isMyMessage && isPartnerAdmin;

  return (
    <div>
      <div>
        <div className="flex items-start gap-1 mb-2">
          <div
            className={`flex items-center gap-2 w-full ${
              isMyMessage
                ? "justify-end"
                : msg?.sender?._id !== null
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <div
              className={`relative ${
                (msg as any)?.approvalStatus === "pending" ? "opacity-70" : ""
              }`}
            >
              {(msg as any)?.approvalStatus === "pending" && (
                <div className="text-[10px] text-gray-500 mb-1 text-right italic">
                  Čaká na schválenie...
                </div>
              )}

              {/* Official Admin Sender Tag for incoming admin messages */}
              {isFromAdmin && (
                <div className="flex items-center gap-1 text-[11px] font-bold text-secondary-color mb-0.5">
                  <RiShieldCheckFill className="text-xs text-secondary-color" />
                  <span>FRAFOL Administrátor</span>
                </div>
              )}

              {msg?.images?.length > 0 && (
                <div
                  className={`grid grid-cols-1 ${
                    msg?.images?.length > 2 ? " md:grid-cols-2" : "grid-cols-1"
                  } rounded-md ${
                    isMyMessage
                      ? "w-fit ml-auto text-right text-white"
                      : isFromAdmin
                      ? "w-fit text-left text-base-color bg-gradient-to-br from-[#FFF8F6] to-[#FFFFFF] border border-secondary-color/25 shadow-xs"
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.images?.map((item: string, index: number) => (
                    <ImagePreviewer
                      key={index}
                      msg={msg}
                      image={item}
                      userData={userData}
                    />
                  ))}
                </div>
              )}

              {msg?.text?.length > 0 && (
                <p
                  className={`py-1.5 px-3 mt-0.5 rounded-lg ${
                    isMyMessage
                      ? `w-fit ml-auto text-right text-white ${
                          isUrl(msg.text)
                            ? "bg-secondary-color/20"
                            : "bg-secondary-color"
                        }`
                      : isFromAdmin
                      ? "w-fit text-left text-base-color bg-gradient-to-br from-[#FFF8F6] to-[#FFFFFF] border border-secondary-color/25 shadow-xs"
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {isUrl(msg.text) ? (
                    <Link
                      href={msg.text}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-secondary-color!"
                    >
                      {msg.text}
                    </Link>
                  ) : (
                    msg?.text
                  )}
                </p>
              )}

              {msg?.sender !== null && (
                <p
                  className={`text-[11px] mt-0.5 text-secondary-color ${
                    isMyMessage ? "text-right" : "text-left"
                  }`}
                >
                  {formatDateTime(msg?.createdAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationMessageCard;
