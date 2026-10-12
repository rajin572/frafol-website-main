"use server";

import { fetchWithAuth } from "@/lib/fetchWraper";
import { INotification } from "@/types";

// Latest notifications for the navbar bell. Returns null on any failure so the caller can
// keep showing what it already has (a failed refresh must never empty the list).
export const getMyNotifications = async (
  limit = 6
): Promise<INotification[] | null> => {
  try {
    const res = await fetchWithAuth(
      `/notifications/my-notifications?page=1&limit=${limit}`,
      { cache: "no-store" },
      { logoutOnAuthFailure: false }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.notifications || [];
  } catch {
    return null;
  }
};
