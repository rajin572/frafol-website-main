"use server";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { updateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const completePayment = async (req: { body: any; params: any }) => {
  try {
    const res = await fetchWithAuth(`/payment/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();
    updateTag(TagTypes.eventOrder);
    updateTag(TagTypes.workshopOrders);
    updateTag(TagTypes.gearOrder);
    updateTag(TagTypes.subscriptionOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
