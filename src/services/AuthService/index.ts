/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { fetchWithAuth } from "@/lib/fetchWraper";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const registerUser = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("frafolSignUpToken", result.data, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      });
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const registerUserOtp = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/create-user-verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: (await cookies()).get("frafolSignUpToken")!.value,
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();

    if (result.success) {
      (await cookies()).delete("frafolSignUpToken");
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
type ResendOtpBody = {
  purpose?: string;
  [key: string]: any;
};

export const resendOtp = async (
  req: {
    body: ResendOtpBody;
    params?: any;
  } = {
      body: {},
      params: {},
    }
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/otp/resend-otp`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token:
            req?.body?.purpose === "email-verification"
              ? (await cookies()).get("frafolSignUpToken")!.value
              : (await cookies()).get("frafolForgetToken")!.value,
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();

    // if (result.success) {
    //   (await cookies()).set("frafolSignUpToken", result.data, {
    //     path: "/",
    //     expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    //   });
    // }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const result = await res.json();

    if (result?.success) {
      const threeMonths = 1000 * 60 * 60 * 24 * 30 * 3; // 3 months in milliseconds

      (await cookies()).set(
        "frafolMainAccessToken",
        result?.data?.accessToken,
        {
          path: "/",
          expires: new Date(Date.now() + threeMonths),
        }
      );

      (await cookies()).set(
        "frafolMainRefreshToken",
        result?.data?.refreshToken,
        {
          path: "/",
          expires: new Date(Date.now() + threeMonths),
        }
      );
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const forgetPassword = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/forgot-password-otpByEmail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("frafolForgetToken", result.data?.forgetToken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      });
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const forgetPasswordOtp = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/forgot-password-otp-match`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: (await cookies()).get("frafolForgetToken")!.value,
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();

    if (result.success) {
      (await cookies()).delete("frafolForgetToken");
      (await cookies()).set(
        "forgetOtpMatchToken",
        result.data?.forgetOtpMatchToken,
        {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        }
      );
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const changePassword = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/forgot-password-reset`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: (await cookies()).get("forgetOtpMatchToken")!.value,
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();

    if (result.success) {
      (await cookies()).delete("forgetOtpMatchToken");
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("frafolMainAccessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("frafolMainAccessToken");
  (await cookies()).delete("frafolMainRefreshToken");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("frafolMainRefreshToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const changeUserPassword = async (
  req = {
    body: {},
    params: {},
  }
) => {
  try {
    const res = await fetchWithAuth(`/auth/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).delete("frafolMainAccessToken");
      (await cookies()).delete("frafolMainRefreshToken");
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const switchRole = async () => {
  try {
    const res = await fetchWithAuth(`/users/switch-role`, {
      method: "PATCH",
    });
    const result = await res.json();

    // if (result.success) {
    //   (await cookies()).delete("frafolMainAccessToken");
    //   (await cookies()).delete("frafolMainRefreshToken");
    // }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
