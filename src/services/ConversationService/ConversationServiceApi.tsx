"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { updateTag } from "next/cache";

export const createConversation = async (req: { body: any; params: any }) => {
  try {
    const { body } = req; // ✅ destructure
    const res = await fetchWithAuth(
      `/chat/create`, // now correct
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add content type header for JSON
        },
        body: JSON.stringify(body) as any,
      }
    );
    const result = await res.json();
    updateTag(TagTypes.conversation);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const sendFiles = async (req: { body: any; params: any }) => {
  try {
    const { body } = req; // ✅ destructure
    const res = await fetchWithAuth(
      `/message/file-upload`, // now correct
      {
        method: "POST",
        body: body,
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
