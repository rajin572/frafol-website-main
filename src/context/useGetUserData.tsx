import { ISignInUser } from "@/types";
import { decodedToken } from "@/utils/jwt";
import Cookies from "js-cookie";

export const useGetUserData = (): ISignInUser | null => {
  const token = Cookies.get("frafolMainAccessToken");

  if (!token) return null;

  try {
    const userData = decodedToken(token) as ISignInUser;
    return userData;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
