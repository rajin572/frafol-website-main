"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { updateTag } from "next/cache";

export const addNewGear = async (
  req = {
    body: FormData,
    params: {},
  }
) => {
  try {
    const res = await fetchWithAuth(`/marketPlace/add`, {
      method: "POST",
      body: req.body as any,
    });
    const result = await res.json();
    updateTag(TagTypes.gear);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateGear = async (
  req = {
    body: FormData,
    params: {},
  }
) => {
  try {
    const res = await fetchWithAuth(`/marketPlace/update/${req.params}`, {
      method: "PATCH",
      body: req.body as any,
    });
    const result = await res.json();
    updateTag(TagTypes.gear);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteGear = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetchWithAuth(`/marketPlace/${req.params}`, {
      method: "DELETE",
    });
    const result = await res.json();
    updateTag(TagTypes.gear);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
