"use client";
import {
  giveLike,
  removeLike,
} from "@/services/ComentsService/ComentsServiceApi";
import { ICommunityPost } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import React from "react";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

const ForumPostLikeSection = ({
  communityPosts,
  id,
}: {
  communityPosts: ICommunityPost;
  id: string;
}) => {
  const [isLike, setIsLike] = React.useState(communityPosts?.isLiked || false);
  const [like, setLike] = React.useState(communityPosts?.totalLikes || 0);
  const handleLike = async () => {
    if (isLike) {
      const res = await tryCatchWrapper(
        removeLike,
        { params: { id } },
        {
          showToast: false,
          toastLoadingMessage: "Removing Like...",
          toastSuccessMessage: "Removed Like Successfully!",
          toastErrorMessage: "Something went wrong! Please try again.",
        }
      );

      if (res?.success) {
        setIsLike(!isLike);
        setLike(isLike ? like - 1 : like + 1);
      }
    } else {
      const res = await tryCatchWrapper(
        giveLike,
        { params: { id } },
        {
          showToast: false,
          toastLoadingMessage: "Adding Like...",
          toastSuccessMessage: "Added Like Successfully!",
          toastErrorMessage: "Something went wrong! Please try again.",
        }
      );

      if (res?.success) {
        setIsLike(!isLike);
        setLike(isLike ? like - 1 : like + 1);
      }
    }
  };
  return (
    <div>
      <div className="flex gap-2 items-center select-none">
        {isLike ? (
          <div className="flex flex-col items-center">
            <BiSolidLike
              className="cursor-pointer text-secondary-color size-7"
              onClick={handleLike}
            />
            <span>{like}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {" "}
            <BiLike
              className="cursor-pointer text-secondary-color size-7"
              onClick={handleLike}
            />
            <span>{like}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumPostLikeSection;
