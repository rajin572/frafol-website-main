import Image from "next/image";
import ForumPostImage from "./ForumPostImage";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { AllImages } from "../../../public/assets/AllImages";
import Link from "next/link";
import { ICommunityPost } from "@/types";
import { formatDateTime } from "@/utils/dateFormet";
import { getMediaUrl } from "@/utils/mediaUrl";
import ForumAllComents from "./ForumAllComents";
import ForumPostLikeSection from "./ForumPostLikeSection";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

// Readable defaults for the post's rich text (paragraphs, lists, links, headings).
const postTextClass =
  "text-base lg:text-lg leading-relaxed text-base-color/85 break-words [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-secondary-color [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_strong]:font-semibold [&_blockquote]:border-l-4 [&_blockquote]:border-base-color/15 [&_blockquote]:pl-4 [&_blockquote]:italic";

// Same structure as before: back link, the post card (title, date, views and like in the header;
// author column and the photo + text below), then the comments card.
const ForumDetailsPage = ({
  communityPosts,
  id,
  page,
}: {
  communityPosts: ICommunityPost;
  id: string;
  page: number;
}) => {
  return (
    <div className="py-12 sm:py-16">
      <Link href="/forums" className="inline-block">
        <div className="flex items-center gap-2 text-secondary-color cursor-pointer text-base sm:text-lg font-semibold hover:text-secondary-color/80 transition-colors">
          <GoArrowLeft className="text-xl" />
          <p>{/* Back To Topics */} Späť na diskusie</p>
        </div>
      </Link>
      {/* Main Post  */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-base-color/10 bg-white">
        {/* Header: title, date + views, like */}
        <div className="p-6 sm:p-8 border-b border-base-color/10 flex justify-between items-start gap-6">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold leading-tight tracking-tight text-base-color">
              {communityPosts?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm sm:text-base text-base-color/60">
              <p className="flex items-center gap-2">
                <IoCalendarOutline className="size-4 text-secondary-color" />
                <span>{/* Posted */} Publikované {formatDateTime(communityPosts?.createdAt)}</span>
              </p>
              <p className="flex items-center gap-2">
                <BsEye className="size-4 text-secondary-color" />
                <span>{communityPosts?.totalViewers} {/* views */} videní</span>
              </p>
            </div>
          </div>
          <ForumPostLikeSection communityPosts={communityPosts} id={id} />
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* Author column (stays in view next to a long post) */}
          <div className="border-b border-base-color/10 bg-background-color/30 px-6 py-5 lg:w-52 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-8">
            <div className="flex items-center gap-3 lg:sticky lg:top-24 lg:flex-col lg:gap-3 lg:text-center">
              <Image
                width={160}
                height={160}
                draggable={false}
                src={
                  communityPosts?.authorId?.profileImage
                    ? getMediaUrl(communityPosts?.authorId?.profileImage)
                    : AllImages?.dummyProfile
                }
                alt="user"
                className="size-12 lg:size-20 object-cover rounded-full ring-4 ring-white shadow-sm"
              />
              {
                communityPosts?.authorId?.role === "both" || communityPosts?.authorId?.role === "photographer" || communityPosts?.authorId?.role === "videographer" ? (
                  <Link href={`/professionals/${communityPosts?.authorId?._id}`} className="text-secondary-color text-base font-bold cursor-pointer hover:underline">
                    {communityPosts?.authorId?.name}
                  </Link>
                ) : (
                  <p className="text-base-color text-base font-bold">
                    {communityPosts?.authorId?.name}
                  </p>
                )
              }
            </div>
          </div>

          {/* Photo + text */}
          <div className="min-w-0 flex-1 p-6 sm:p-8">
            {communityPosts?.images?.[0] && (
              <ForumPostImage src={getMediaUrl(communityPosts?.images?.[0])} />
            )}
            {communityPosts?.text && (
              <div
                className={`max-w-3xl ${postTextClass}`}
                // User-authored HTML — sanitize to prevent stored XSS.
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(communityPosts?.text),
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
      {/* Replies Card */}
      <ForumAllComents id={id} page={page} />
    </div>
  );
};

export default ForumDetailsPage;
