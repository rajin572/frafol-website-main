"use server";
import { fetchWithAuth } from "@/lib/fetchWraper";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const addReport = async (req: { body: any; params: any }) => {
  try {
    const res = await fetchWithAuth(`/report/add`, {
      method: "POST",
      body: req.body,
    });
    const result = await res.json();

    console.log(result)

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const addFeedback = async (req: { body: any; params: any }) => {
  try {
    const res = await fetchWithAuth(`/feedback/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const subscribe = async (req: { body: any }) => {
  try {
    const res = await fetchWithAuth(`/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const contactUs = async (req: { body: any; params: any }) => {
  try {
    const res = await fetchWithAuth(`/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const applyCoupon = async (req: { body: any }) => {
  try {
    const res = await fetchWithAuth(`/coupon/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};