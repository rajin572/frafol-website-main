import Image from "next/image";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { AllImages } from "../../../public/assets/AllImages";
import Link from "next/link";
import { ICommunityPost } from "@/types";
import { formatDateTime } from "@/utils/dateFormet";
import { getServerUrl } from "@/helpers/config/envConfig";
import ForumAllComents from "./ForumAllComents";
import ForumPostLikeSection from "./ForumPostLikeSection";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

const ForumDetailsPage = ({
  communityPosts,
  id,
  page,
}: {
  communityPosts: ICommunityPost;
  id: string;
  page: number;
}) => {
  const serverUrl = getServerUrl();
  return (
    <div className="py-16">
      <Link href="/forums">
        <div className="flex items-center gap-2 text-secondary-color cursor-pointer text-sm sm:text-base lg:text-lg font-bold">
          <GoArrowLeft className="text-lg sm:text-xl lg:text-2xl font-bold" />
          <p>{/* Back To Topics */} Späť na diskusie</p>
        </div>
      </Link>
      {/* Main Post  */}
      <div className="mt-10 rounded-xl border border-background-color">
        <div className=" p-4 border-b border-background-color flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">
              {communityPosts?.title}
            </h1>
            <div className="flex items-center gap-5">
              <p className="text-sm sm:text-sm lg:text-base  mt-4">
                {/* Posted */} Publikované {formatDateTime(communityPosts?.createdAt)}
              </p>
              <p className="text-sm sm:text-sm lg:text-base  mt-4">
                {communityPosts?.totalViewers} {/* views */} zhltnutí
              </p>
            </div>
          </div>
          <ForumPostLikeSection communityPosts={communityPosts} id={id} />
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-2 ">
          <div className="text-sm sm:text-sm lg:text-base p-1 flex flex-col items-center gap-2 min-w-28">
            <Image
              width={1000}
              height={1000}
              draggable={false}
              src={
                communityPosts?.authorId?.profileImage
                  ? serverUrl + communityPosts?.authorId?.profileImage
                  : AllImages?.dummyProfile
              }
              alt="user"
              className="w-10 h-10 object-cover rounded-full "
            />
            {
              communityPosts?.authorId?.role === "both" || communityPosts?.authorId?.role === "photographer" || communityPosts?.authorId?.role === "videographer" ? (
                <Link href={`/professionals/${communityPosts?.authorId?._id}`} className="text-secondary-color text-sm sm:text-sm lg:text-base font-bold cursor-pointer">
                  {communityPosts?.authorId?.name}
                </Link>
              ) : (
                <p className="text-base-color text-sm sm:text-sm lg:text-base font-bold">
                  {communityPosts?.authorId?.name}
                </p>
              )
            }

          </div>
          <div className="p-5 lg:border-l lg:border-background-color">
            {communityPosts?.images?.[0] && <Image
              width={1000}
              height={1000}
              src={
                communityPosts?.images?.[0]
                  ? serverUrl + communityPosts?.images?.[0]
                  : AllImages?.dummyCover?.src
              }
              alt="user"
              className="w-full lg:w-1/2 mx-auto h-auto object-cover rounded-lg mb-10"
            />
            }
            {communityPosts?.text && (
              <div
                // User-authored HTML — sanitize to prevent stored XSS.
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(communityPosts?.text),
                }}
              ></div>
            )}
          </div>{" "}
        </div>
      </div>
      {/* Replies Card */}
      <ForumAllComents id={id} page={page} />
    </div>
  );
};

export default ForumDetailsPage;
