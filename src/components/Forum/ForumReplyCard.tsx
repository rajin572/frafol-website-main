"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { AllImages } from "../../../public/assets/AllImages";
import { ICommunityComment, IReply } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import { formatDateTime } from "@/utils/dateFormet";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LuReply } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { LoaderCircle } from "lucide-react";
import ExpandableText from "../shared/ExpandableText";

// Long comments are cut here with "Zobraziť viac" (the whole text opens on click).
const COMMENT_PREVIEW_CHARS = 280;

// A comment / reply in the list; `pending` marks one that is still being sent (shown optimistically).
export type ThreadReply = IReply & { pending?: boolean };
export type ThreadComment = Omit<ICommunityComment, "replies"> & { replies: ThreadReply[]; pending?: boolean };

const SendingLabel = () => (
  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-base-color/50">
    <LoaderCircle className="size-3.5 animate-spin" />
    Odosiela sa…
  </span>
);

// One comment as a thread: avatar on the left; a bubble with name, date and text, the actions under
// it, and its replies nested below.
const ForumReplyCard = ({ item }: { item: ThreadComment }) => {
  const [isReplyVisible, setIsReplyVisible] = React.useState(false);

  // A reply that was just written is shown straight away, so open the replies for it.
  const hasPendingReply = item?.replies?.some((reply) => reply.pending) ?? false;
  useEffect(() => {
    if (hasPendingReply) setIsReplyVisible(true);
  }, [hasPendingReply]);

  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleReply = (value: ThreadComment) => {

    const name = value?.user?.name;
    const id = value?._id;

    const params = new URLSearchParams(searchParams);

    params.set("reply", id);
    params.set("to", name);

    // Only the reply form reads these two params, so there is nothing for the server to fetch.
    // router.replace would re-render the whole post and its comments on the server first (slow);
    // history.replaceState updates the URL and `useSearchParams` immediately, with no request.
    window.history.replaceState(null, "", `${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 sm:gap-4 w-full">
      <Image
        width={96}
        height={96}
        src={
          item?.user?.profileImage
            ? getMediaUrl(item?.user?.profileImage)
            : AllImages?.dummyProfile
        }
        alt="user"
        className="size-10 sm:size-11 shrink-0 object-cover rounded-full"
      />

      <div className="min-w-0 flex-1">
        {/* Comment bubble */}
        <div className={`w-fit max-w-full rounded-2xl rounded-tl-md bg-background-color/60 px-4 py-3 sm:px-5 transition-opacity ${item?.pending ? "opacity-60" : ""}`}>
          <div className="flex flex-wrap items-baseline gap-x-2">
            {
              item?.user?.role === "photographer" || item?.user?.role === "both" || item?.user?.role === "videographer" ? (
                <Link href={`/professionals/${item?.user?._id}`} className="text-secondary-color text-sm sm:text-base font-semibold cursor-pointer hover:underline">
                  {item?.user?.name}
                </Link>
              ) :

                <p className="text-sm sm:text-base font-semibold text-base-color">
                  {item?.user?.name}
                </p>
            }
            <p className="text-xs sm:text-sm text-base-color/50">
              {formatDateTime(item?.createdAt)}
            </p>
          </div>

          <ExpandableText text={item?.text} maxChars={COMMENT_PREVIEW_CHARS} className="mt-1 text-sm sm:text-base leading-relaxed text-base-color/85 whitespace-pre-line" />
        </div>

        {item?.pending ? (
          <div className="mt-2 pl-1"><SendingLabel /></div>
        ) : (
        <div className="mt-2 flex flex-wrap items-center gap-2 pl-1">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-semibold text-base-color/65 cursor-pointer transition-colors hover:bg-background-color hover:text-secondary-color"
            onClick={() => handleReply(item)}
          >
            <LuReply className="size-4" />
            {/* Reply */} Odpovedať
          </button>
          {
            item?.replies?.length > 0 && (
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2 py-1 text-sm font-semibold text-secondary-color cursor-pointer select-none hover:underline"
                onClick={() => setIsReplyVisible((prev) => !prev)}
              >
                {isReplyVisible ? /* Hide Replies */ "Skryť odpovede" : `Zobraziť odpovede (${item?.replies?.length})`}
                <FiChevronDown className={`transition-transform duration-200 ${isReplyVisible ? "rotate-180" : ""}`} />
              </button>
            )
          }
        </div>
        )}

        <div className={`mt-4 space-y-5 border-l-2 border-base-color/10 pl-4 sm:pl-5 ${isReplyVisible ? "block" : "hidden"}`}>
          {
            item?.replies?.map((reply: ThreadReply) => (
              <div key={reply?._id} className="flex gap-3">
                <Image
                  width={80}
                  height={80}
                  src={
                    reply?.user?.profileImage
                      ? getMediaUrl(reply?.user?.profileImage)
                      : AllImages?.dummyProfile
                  }
                  alt="user"
                  className="size-8 sm:size-9 shrink-0 object-cover rounded-full"
                />
                <div className="min-w-0">
                <div className={`w-fit max-w-full min-w-0 rounded-2xl rounded-tl-md bg-background-color/40 px-4 py-2.5 transition-opacity ${reply.pending ? "opacity-60" : ""}`}>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    {
                      item?.user?.role === "photographer" || item?.user?.role === "both" || item?.user?.role === "videographer" ? (
                        <Link href={`/professionals/${item?.user?._id}`} className="text-secondary-color text-sm font-semibold cursor-pointer hover:underline">
                          {reply?.user?.name}
                        </Link>
                      ) :
                        (<p className="text-sm font-semibold text-base-color">
                          {reply?.user?.name}
                        </p>)
                    }
                    <p className="text-xs sm:text-sm text-base-color/50">
                      {formatDateTime(reply?.createdAt)}
                    </p>
                  </div>
                  <ExpandableText text={reply?.text} maxChars={COMMENT_PREVIEW_CHARS} className="mt-1 text-sm sm:text-base leading-relaxed text-base-color/85 whitespace-pre-line" />
                </div>
                {reply.pending && <div className="mt-1.5 pl-1"><SendingLabel /></div>}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div >
  );
};

export default ForumReplyCard;
