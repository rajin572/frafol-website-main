/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { updateTag } from "next/cache";

export const addNewPackage = async (req = { body: FormData, params: {} }) => {
  try {
    const res = await fetchWithAuth(`/package/add`, {
      method: "POST",
      body: req.body as any,
    });
    const result = await res.json();
    updateTag(TagTypes.package);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updatePackage = async (req = { body: FormData, params: {} }) => {
  try {
    const res = await fetchWithAuth(`/package/update/${req.params}`, {
      method: "PATCH",
      body: req.body as any,
    });
    const result = await res.json();
    updateTag(TagTypes.package);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deletePackage = async (req = { body: {}, params: {} }) => {
  try {
    const res = await fetchWithAuth(`/package/${req.params}`, {
      method: "DELETE",
    });
    const result = await res.json();
    updateTag(TagTypes.package);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
