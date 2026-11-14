import Image from "next/image";
import FallbackImage from "../ui/FallbackImage";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { ICommunityPost } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import { AllImages } from "../../../public/assets/AllImages";
import { formatDateTime } from "@/utils/dateFormet";
import { Tooltip } from "antd";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
import { cn } from "@/lib/utils";

const statClass = "inline-flex items-center gap-1.5";

// One forum post in a list (forum page and the creator's "My posts"), laid out like an article
// preview: author line, title, excerpt, quiet stats, and the post photo on the right. The whole
// card opens the post; the author link and the edit/delete menu stay clickable on their own.
const ForumCard = ({
  item,
  mypost = false,
  showDeleteModal,
  showEditModal,
  className,
}: {
  item: ICommunityPost;
  mypost?: boolean;
  showDeleteModal?: (record: ICommunityPost) => void;
  showEditModal?: (record: ICommunityPost) => void;
  className?: string;
}) => {


  const showEditAndDeleteOptions = () => {
    return (
      <div className="flex flex-col w-24 items-center gap-2 p-1">
        <div
          onClick={() => showEditModal && showEditModal(item)}
          className="text-primary-color bg-base-color py-1 px-2 rounded-lg cursor-pointer w-full text-center"
        >
          {/* Edit */} Upraviť
        </div>
        <div
          onClick={() => showDeleteModal && showDeleteModal(item)}
          className="text-primary-color bg-secondary-color py-1 px-2 rounded-lg cursor-pointer w-full text-center"
        >
          {/* Delete */} Zmazať
        </div>
      </div>
    );
  };

  // The post's first photo, shown as a thumbnail.
  const thumbnail = item?.images?.[0];

  return (
    <article
      className={cn(
        "group relative rounded-2xl border border-base-color/10 bg-white p-5 sm:p-7 transition-colors hover:border-base-color/25",
        className
      )}
    >
      <div className="flex gap-6 sm:gap-8">
        <div className="min-w-0 flex-1">
          {/* Author line */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5 text-sm">
              <Image
                width={64}
                height={64}
                src={
                  item?.authorId?.profileImage
                    ? getMediaUrl(item?.authorId?.profileImage)
                    : AllImages.dummyProfile.src
                }
                alt={item?.authorId?.name || "Profile Image"}
                className="size-7 shrink-0 object-cover rounded-full"
              />
              {
                item?.authorId?.role === "both" || item?.authorId?.role === "photographer" || item?.authorId?.role === "videographer" ? (
                  <Link href={`/professionals/${item?.authorId?._id}`} className="relative z-10 truncate font-semibold text-base-color hover:text-secondary-color">
                    {item?.authorId?.name}
                  </Link>
                ) : (
                  <p className="truncate font-semibold text-base-color">
                    {item?.authorId?.name}
                  </p>
                )
              }
              <span className="text-base-color/30">·</span>
              <p className="shrink-0 text-base-color/50">
                {formatDateTime(item?.createdAt)}
              </p>
            </div>
            {mypost && (
              <div className="relative z-10">
                <Tooltip
                  title={showEditAndDeleteOptions()}
                  placement="bottom"
                  color="white"
                >
                  <BsThreeDotsVertical className="text-secondary-color cursor-pointer" />
                </Tooltip>
              </div>
            )}
          </div>

          {/* The title link covers the whole card (after:inset-0) */}
          <Link href={`/forums/${item?._id}`} className="after:absolute after:inset-0 after:rounded-2xl">
            <h2 className="mt-3 text-xl sm:text-2xl font-bold leading-snug tracking-tight text-base-color line-clamp-2 transition-colors group-hover:text-secondary-color">
              {item?.title}
            </h2>
          </Link>
          <p className="mt-2 text-[15px] sm:text-base leading-relaxed text-base-color/60 line-clamp-2">
            {stripHtmlTags(item?.text || "")}
          </p>

          {/* Post photo on phones: full width under the text */}
          {thumbnail && (
            <FallbackImage
              width={800}
              height={450}
              src={getMediaUrl(thumbnail)}
              alt={item?.title || "post"}
              className="mt-4 aspect-[16/9] w-full rounded-xl object-cover sm:hidden"
            />
          )}

          {/* Stats */}
          <div className="mt-5 flex items-center gap-5 text-sm font-medium text-base-color/50">
            <span className={statClass}>
              <AiOutlineLike className="size-4" />
              {item?.totalLikes || 0}
            </span>
            <span className={statClass}>
              <GoCommentDiscussion className="size-4" />
              {item?.totalComments || 0}
            </span>
            <span className={statClass}>
              <BsEye className="size-4" />
              {item?.totalViewers || 0}
            </span>
          </div>
        </div>

        {/* Post photo on larger screens: on the right */}
        {thumbnail && (
          <FallbackImage
            width={420}
            height={315}
            src={getMediaUrl(thumbnail)}
            alt={item?.title || "post"}
            sizes="210px"
            className="hidden aspect-[4/3] w-40 md:w-52 shrink-0 self-center rounded-xl object-cover sm:block"
          />
        )}
      </div>
    </article>
  );
};

export default ForumCard;
