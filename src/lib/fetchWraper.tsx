import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthToken } from "./getAuthToken";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { logout } from "@/services/AuthService";

// Custom fetch wrapper to handle Authorization token injection and refresh
const baseUrl = getBaseUrl();

// 401/403 → access token expired/invalid, try to refresh it.
const REFRESH_STATUSES = [401, 403];
// 404 → treat as an unrecoverable auth failure: log the user out.
const LOGOUT_STATUS = 404;

// Best-effort server-side logout. cookies() is only writable inside a Server Action;
// during a page render (Server Component) it is read-only and logout() throws, so this
// guard keeps a failed auth response from crashing the render. Note: this only clears
// the cookies — it can't redirect the browser or clear Redux (that's the client's job,
// e.g. the Navbar handleLogOut).
const safeLogout = async () => {
  try {
    await logout();
  } catch {
    // read-only render context (or unavailable import) — nothing we can clear here
  }
};

// Note: unlike a browser-only client (e.g. RTK Query), fetchWithAuth runs on the
// server — either during a page's render (Server Component, read-only cookies) or
// inside a "use server" Server Action (mutable cookies). There is no single shared
// process/session here the way there is in a browser tab, so refreshing is scoped to
// the current request's own cookies() each time rather than a module-level mutex/lock
// — a module-level lock would risk one user's in-flight refresh resolving for a
// different user's concurrent request on the same server process.
const refreshAccessToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("frafolMainRefreshToken")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const res = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: refreshToken,
      },
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    const newAccessToken = result?.data?.accessToken;
    const newRefreshToken = result?.data?.refreshToken;

    if (!newAccessToken) {
      return null;
    }

    const threeMonths = 1000 * 60 * 60 * 24 * 30 * 3;

    try {
      cookieStore.set("frafolMainAccessToken", newAccessToken, {
        path: "/",
        expires: new Date(Date.now() + threeMonths),
      });
      if (newRefreshToken) {
        cookieStore.set("frafolMainRefreshToken", newRefreshToken, {
          path: "/",
          expires: new Date(Date.now() + threeMonths),
        });
      }
    } catch {
      // Called from a plain page render (Server Component) — cookies() is read-only
      // there, so the refreshed token can't be persisted for future requests. The
      // caller below still gets the new token in-memory for this one retry.
    }

    return newAccessToken;
  } catch {
    return null;
  }
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  try {
    const accessToken = await getAuthToken();

    // Add the Authorization header only when a token exists
    const headers = {
      ...options.headers,
      ...(accessToken ? { Authorization: `${accessToken}` } : {}),
    };

    // Make the request
    const response = await fetch(baseUrl + url, {
      ...options,
      headers,
    });
    if (REFRESH_STATUSES.includes(response.status)) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Retry the original request once with the refreshed token
        return fetch(baseUrl + url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: newAccessToken,
          },
        });
      }
      // Refresh failed (no/expired refresh token) — session is unrecoverable, log out.
      await safeLogout(); // best-effort cookie clear (only works from a Server Action)
      redirect("/logout"); // /logout Route Handler clears cookies + → /sign-in (works from renders too)
    } else if (response.status === LOGOUT_STATUS) {
      // Unrecoverable auth failure — log the user out.
      await safeLogout();
      redirect("/logout");
    }

    return response; // Return the response
  } catch (error) {
    throw error;
  }
};
