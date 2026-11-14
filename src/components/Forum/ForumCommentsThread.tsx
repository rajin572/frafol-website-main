"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useOptimistic, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ForumReplyCard, { ThreadComment, ThreadReply } from "./ForumReplyCard";
import ForumSubmitReply from "./ForumSubmitReply";
import PaginationSection from "../shared/PaginationSection";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { addNewComment } from "@/services/ComentsService/ComentsServiceApi";
import { useGetUserData } from "@/context/useGetUserData";
import { getFriendlyErrorMessage } from "@/utils/errorMessage";

const COMMENT_ERROR = "Komentár sa nepodarilo odoslať. Skúste to prosím znova.";

// JavaScript runtime messages ("Cannot read properties of null …") mean nothing to a visitor.
const cleanMessage = (message?: string) =>
  message && /cannot read prop|undefined|is not a function|unexpected/i.test(message) ? "" : message;

// `knownIds`: the comments (or the replies of that comment) that were on screen when sending started.
type OptimisticAction =
  | { type: "comment"; comment: ThreadComment; knownIds: string[] }
  | { type: "reply"; commentId: string; reply: ThreadReply; knownIds: string[] };

type Postable = { _id: string; text: string; user?: { _id?: string } };

// The same comment, whether it is our local copy or the one the server returned.
const isSameItem = (a: Postable, b: Postable) =>
  a._id === b._id || (!!a.user?._id && a.user?._id === b.user?._id && a.text === b.text);

// `listed` is the saved version of the comment that is still being sent (`pending`): same author,
// same text, and not one of the comments that were already there when sending started
// (`knownIds`). Used to drop the temporary copy as soon as the real one is in the list. No dates
// are compared: the server's clock / time zone can differ from the visitor's by hours or days.
const isSavedCopy = (
  listed: Postable & { pending?: boolean },
  pending: Postable,
  knownIds: string[]
) =>
  !listed.pending &&
  !knownIds.includes(listed._id) &&
  !!listed.user?._id &&
  listed.user._id === pending.user?._id &&
  listed.text?.trim() === pending.text?.trim();

// The comment box and the comment list of a forum post.
// Posting is optimistic: the new comment (or reply) shows at once, marked "Odosiela sa…", while the
// request runs. Once it is saved, a copy is kept here (`posted`) until the refreshed list from the
// server contains it. So it never disappears between "sent" and the server refresh, which used to
// happen when the refresh came late. If saving fails, the temporary one disappears, a toast says
// why, and the text goes back in the box.
const ForumCommentsThread = ({
  id,
  comments,
  totalComments,
  page,
  limit,
}: {
  id: string;
  comments: ThreadComment[];
  totalComments: number;
  page: number;
  limit: number;
}) => {
  const user = useGetUserData();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Saved comments / replies that the server list may not show yet.
  const [postedComments, setPostedComments] = useState<ThreadComment[]>([]);
  const [postedReplies, setPostedReplies] = useState<Record<string, ThreadReply[]>>({});

  // Another page of comments: the kept copies belong to the page they were written on.
  useEffect(() => {
    setPostedComments([]);
    setPostedReplies({});
  }, [page]);

  const mergedComments = useMemo(() => {
    const missingComments = postedComments.filter(
      (posted) => !comments.some((comment) => isSameItem(comment, posted))
    );
    return [...missingComments, ...comments].map((comment) => {
      const replies = comment.replies || [];
      const missingReplies = (postedReplies[comment._id] || []).filter(
        (posted) => !replies.some((reply) => isSameItem(reply, posted))
      );
      return missingReplies.length > 0 ? { ...comment, replies: [...replies, ...missingReplies] } : comment;
    });
  }, [comments, postedComments, postedReplies]);

  // React re-runs this whenever the list underneath changes while a comment is being sent. The
  // server answer can arrive before the send has finished (the server action refreshes the page
  // data), so once the real comment is in the list the temporary one is dropped instead of being
  // shown twice.
  const [shownComments, addOptimistic] = useOptimistic<ThreadComment[], OptimisticAction>(
    mergedComments,
    (current, action) => {
      if (action.type === "comment") {
        if (current.some((comment) => isSavedCopy(comment, action.comment, action.knownIds))) return current;
        return [action.comment, ...current];
      }
      return current.map((comment) => {
        if (comment._id !== action.commentId) return comment;
        const replies = comment.replies || [];
        if (replies.some((reply) => isSavedCopy(reply, action.reply, action.knownIds))) return comment;
        return { ...comment, replies: [...replies, action.reply] };
      });
    }
  );

  const author = {
    _id: user?.userId ?? "",
    name: user?.name ?? "",
    sureName: user?.sureName ?? "",
    profileImage: user?.profileImage ?? "",
    role: user?.role ?? "",
  };

  const submitComment = (text: string, replyTo: string | null) =>
    new Promise<boolean>((resolve) => {
      startTransition(async () => {
        const tempId = `pending-${Date.now()}`;
        const createdAt = new Date().toISOString();

        if (replyTo) {
          addOptimistic({
            type: "reply",
            commentId: replyTo,
            reply: { _id: tempId, user: author, text, createdAt, pending: true },
            knownIds: (mergedComments.find((comment) => comment._id === replyTo)?.replies || []).map(
              (reply) => reply._id
            ),
          });
        } else {
          addOptimistic({
            type: "comment",
            knownIds: mergedComments.map((comment) => comment._id),
            comment: {
              _id: tempId,
              user: author,
              text,
              isAnonymous: false,
              createdAt,
              replies: [],
              pending: true,
            },
          });
        }

        let res: { success?: boolean; message?: string; data?: any } | null = null;
        try {
          res = await tryCatchWrapper(
            addNewComment,
            {
              body: { text, ...(replyTo && { commentId: replyTo }), isAnonymous: false },
              params: { id },
            },
            {
              showToast: false,
              toastErrorMessage: COMMENT_ERROR,
            }
          );
        } catch {
          res = null;
        }

        // Any failure (backend error, empty answer, dropped connection) ends in a toast; the
        // temporary comment then disappears and the text goes back in the box.
        if (res?.success !== true) {
          toast.error(getFriendlyErrorMessage(cleanMessage(res?.message), COMMENT_ERROR));
          resolve(false);
          return;
        }

        // Keep the saved one on screen: the id from the API when it sends one back, our own
        // author / text / date otherwise.
        const savedId: string = typeof res?.data?._id === "string" ? res.data._id : tempId;
        const savedText: string = typeof res?.data?.text === "string" ? res.data.text : text;
        const savedAt: string = typeof res?.data?.createdAt === "string" ? res.data.createdAt : createdAt;

        if (replyTo) {
          const reply: ThreadReply = { _id: savedId, user: author, text: savedText, createdAt: savedAt };
          setPostedReplies((current) => ({
            ...current,
            [replyTo]: [...(current[replyTo] || []), reply],
          }));
        } else {
          const comment: ThreadComment = {
            _id: savedId,
            user: author,
            text: savedText,
            isAnonymous: false,
            createdAt: savedAt,
            replies: [],
          };
          setPostedComments((current) => [comment, ...current]);
        }

        // Newest comments are on page 1: a new comment posted from a later page is shown there.
        if (!replyTo && page > 1) {
          const params = new URLSearchParams(searchParams);
          params.delete("page");
          const query = params.toString();
          router.replace(query ? `${pathName}?${query}` : pathName, { scroll: false });
        } else {
          // Pull the fresh list (counts, other people's new comments); ours is already on screen.
          router.refresh();
        }
        resolve(true);
      });
    });

  return (
    <>
      {/* Write box first, so it is in view right away; "Odpovedať" on a comment scrolls back to it */}
      <ForumSubmitReply onSubmitComment={submitComment} />

      {shownComments.length > 0 && (
        <div className="mt-6 w-full space-y-6 border-t border-base-color/10 pt-6">
          {shownComments.map((item) => (
            <ForumReplyCard item={item} key={item._id} />
          ))}
        </div>
      )}

      {totalComments > limit && (
        <div className="w-full flex justify-center items-center mt-8">
          <PaginationSection page={page} limit={limit} totalData={totalComments} />
        </div>
      )}
    </>
  );
};

export default ForumCommentsThread;
