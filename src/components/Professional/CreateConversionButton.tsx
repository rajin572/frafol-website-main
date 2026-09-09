"use client";
import { createConversation } from "@/services/ConversationService/ConversationServiceApi";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import React from "react";
import ReuseButton from "../ui/Button/ReuseButton";
import { AiFillMessage } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CreateConversionButton = ({
  userId,
  name,
  label = "Napísať správu",
  className,
}: {
  // The other party to start a chat with.
  userId?: string;
  // Their name — used to filter the message page after redirect (?search=<name>).
  name?: string;
  label?: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();

  const createChat = async () => {
    if (!userId) return;

    const res = await tryCatchWrapper(
      createConversation,
      { body: { users: [userId] } },
      {
        /* toastLoadingMessage: "Creating Conversation..." */
        toastLoadingMessage: "Vytváranie konverzácie...",
        /* toastSuccessMessage: "Conversation Created Successfully!" */
        toastSuccessMessage: "Konverzácia bola vytvorená!",
        /* toastErrorMessage: "Something went wrong! Please try again" */
        toastErrorMessage: "Niečo sa pokazilo! Skúste to znova.",
      }
    );

    if (res?.success) {
      console.log(name)
      // Redirect to the message page filtered by the other party's name.
      const search = name ? `?search=${encodeURIComponent(name)}` : "";
      router.push(`/message${search}`);
    }
  };

  return (
    <ReuseButton
      variant="secondary"
      className={cn(
        "!py-4.5 !px-4 !text-sm sm:!text-sm lg:!text-base flex items-center gap-1",
        className
      )}
      onClick={createChat}
    >
      <AiFillMessage /> {label}
    </ReuseButton>
  );
};

export default CreateConversionButton;
