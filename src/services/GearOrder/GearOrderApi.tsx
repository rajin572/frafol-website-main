"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { updateTag } from "next/cache";

export const gearOrder = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetchWithAuth(`/gear-order/checkout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();
    updateTag(TagTypes.gear);
    updateTag(TagTypes.gearOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const sendGearDeliveryRequest = async (req: { params: any }) => {
  try {
    const res = await fetchWithAuth(
      `/gear-order/request-delivery/${req.params}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();
    updateTag(TagTypes.gearOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const acceptGearDeliveryRequest = async (req: { params: any }) => {
  try {
    const res = await fetchWithAuth(
      `/gear-order/accept-delivery/${req.params}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();
    updateTag(TagTypes.gearOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const declineGearDeliveryRequest = async (req: {
  body: {
    reason: string;
  };
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/gear-order/decline-request/${req.params}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add content type header for JSON
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();
    updateTag(TagTypes.gearOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const cancelGearOrder = async (req: {
  body: {
    reason: string;
  };
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(`/gear-order/cancel/${req.params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();
    updateTag(TagTypes.gearOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
