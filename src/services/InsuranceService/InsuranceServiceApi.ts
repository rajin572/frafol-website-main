/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { updateTag } from "next/cache";

export const registerInsurance = async (req: { body: any; params: any }) => {
  try {
    const res = await fetchWithAuth(`/insurange/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();
    updateTag(TagTypes.insurange);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
