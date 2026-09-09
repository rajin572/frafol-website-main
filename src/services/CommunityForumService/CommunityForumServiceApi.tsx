"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { updateTag } from "next/cache";

export const addNewCommunityPost = async (
  req = {
    body: FormData,
    params: {},
  }
) => {
  try {
    const res = await fetchWithAuth(`/community/create`, {
      method: "POST",
      body: req.body as any,
    });
    const result = await res.json();
    updateTag(TagTypes.communityForum);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateCommunityPost = async (
  req = {
    body: FormData,
    params: {},
  }
) => {
  try {
    const res = await fetchWithAuth(`/community/update/${req.params}`, {
      method: "PATCH",
      body: req.body as any,
    });
    const result = await res.json();
    updateTag(TagTypes.communityForum);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCommunityPost = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetchWithAuth(`/community/${req.params}`, {
      method: "DELETE",
    });
    const result = await res.json();
    updateTag(TagTypes.communityForum);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
