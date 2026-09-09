/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { updateTag } from "next/cache";

export const addNewReview = async (req: { body: any; params: any }) => {
  try {
    const res = await fetchWithAuth(`/review/complete-pending/${req.params}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();
    console.log(result)
    updateTag(TagTypes.review);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateReview = async (req: { body: any; params: any }) => {
  try {
    const res = await fetchWithAuth(`/review/update/${req.params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();
    updateTag(TagTypes.review);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
