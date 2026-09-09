"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { ICreateEventOrder } from "@/types";
import { updateTag } from "next/cache";

export const createWorkshopOrder = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(`/payment/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();
    console.log(result)
    updateTag(TagTypes.workshopOrders);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
