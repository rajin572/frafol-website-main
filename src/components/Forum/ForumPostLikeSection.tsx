"use client";
import {
  giveLike,
  removeLike,
} from "@/services/ComentsService/ComentsServiceApi";
import { ICommunityPost } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import React, { useRef } from "react";
import { toast } from "sonner";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

// Like button of a forum post. Optimistic: the icon and the count change at once, the API call runs
// in the background, and both go back if the call fails.
const ForumPostLikeSection = ({
  communityPosts,
  id,
}: {
  communityPosts: ICommunityPost;
  id: string;
}) => {
  const [isLike, setIsLike] = React.useState(communityPosts?.isLiked || false);
  const [like, setLike] = React.useState(communityPosts?.totalLikes || 0);
  // One request at a time, so quick double clicks cannot send like + unlike out of order.
  const inFlight = useRef(false);

  const handleLike = async () => {
    if (inFlight.current) return;
    inFlight.current = true;

    const wasLiked = isLike;
    const previousCount = like;

    // Show the result right away
    setIsLike(!wasLiked);
    setLike(wasLiked ? Math.max(0, previousCount - 1) : previousCount + 1);

    const res = await tryCatchWrapper(
      wasLiked ? removeLike : giveLike,
      { params: { id } },
      {
        showToast: false,
        toastErrorMessage: "Niečo sa pokazilo! Skúste to prosím znova.",
      }
    );

    if (!res?.success) {
      // Roll back
      setIsLike(wasLiked);
      setLike(previousCount);
      toast.error(res?.message || "Niečo sa pokazilo! Skúste to prosím znova.");
    }

    inFlight.current = false;
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      aria-pressed={isLike}
      className={`flex min-w-16 shrink-0 cursor-pointer select-none flex-col items-center gap-1 rounded-xl border px-3 py-2.5 text-base font-bold transition-colors ${isLike
        ? "border-secondary-color bg-secondary-color/5 text-secondary-color"
        : "border-base-color/15 text-base-color hover:border-secondary-color"
        }`}
    >
      {isLike ? (
        <BiSolidLike className="text-secondary-color size-6" />
      ) : (
        <BiLike className="text-secondary-color size-6" />
      )}
      <span>{like}</span>
    </button>
  );
};

export default ForumPostLikeSection;
