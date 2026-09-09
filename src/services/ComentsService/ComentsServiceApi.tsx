"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { updateTag } from "next/cache";

export const addNewComment = async (req: { body: any; params: any }) => {
  try {
    const { params, body } = req; // ✅ destructure
    const res = await fetchWithAuth(
      `/community-engagement/comment/${params?.id}`, // now correct
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add content type header for JSON
        },
        body: JSON.stringify(body) as any,
      }
    );
    const result = await res.json();
    updateTag(TagTypes.comment);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const giveLike = async (req: { body: any; params: any }) => {
  try {
    const { params } = req; // ✅ destructure
    const res = await fetchWithAuth(
      `/community-engagement/like/${params?.id}`, // now correct
      {
        method: "POST",
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const removeLike = async (req: { body: any; params: any }) => {
  try {
    const { params } = req; // ✅ destructure
    const res = await fetchWithAuth(
      `/community-engagement/unlike/${params?.id}`, // now correct
      {
        method: "POST",
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
