import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthToken } from "./getAuthToken";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { logout } from "@/services/AuthService";

// Custom fetch wrapper to handle Authorization token injection and refresh
const baseUrl = getBaseUrl();

// 401/403 → access token expired/invalid, try to refresh it.
// Deliberately NOT 404: that's a normal "nothing found" answer for data endpoints
// (e.g. an empty /marketPlace list on the home page) and must not end the session.
const REFRESH_STATUSES = [401, 403];

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

// Statuses that may not carry a body; such responses are passed through untouched.
const NULL_BODY_STATUSES = [101, 103, 204, 205, 304];

// Every page calls `res.json()` on what fetchWithAuth returns. When the backend answers with an
// empty or non-JSON body (a crash, a proxy error page, a dropped connection), `res.json()` throws
// "Unexpected end of JSON input" and the whole page shows "Ups! Niečo sa pokazilo". This re-wraps
// such a body as JSON `null`, so `data?.data` is simply empty, and logs what really came back in the
// server console (URL, status, start of the body) so the backend answer can be checked.
const ensureJsonBody = async (response: Response, url: string): Promise<Response> => {
  if (NULL_BODY_STATUSES.includes(response.status)) return response;

  const text = await response.text();
  let body = text;

  if (!text) {
    console.error(`[fetchWithAuth] empty response body (status ${response.status}) from ${url}`);
    body = "null";
  } else {
    try {
      JSON.parse(text);
    } catch {
      console.error(
        `[fetchWithAuth] response is not JSON (status ${response.status}) from ${url}: ${text.slice(0, 300)}`
      );
      body = "null";
    }
  }

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};

type FetchWithAuthConfig = {
  // Set to false for non-critical, layout-level fetches (e.g. navbar notifications) so a
  // failing auth response doesn't log the user out and bounce them to /sign-in.
  logoutOnAuthFailure?: boolean;
};

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  { logoutOnAuthFailure = true }: FetchWithAuthConfig = {}
) => {
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
        const retried = await fetch(baseUrl + url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: newAccessToken,
          },
        });
        return ensureJsonBody(retried, url);
      }
      if (!logoutOnAuthFailure) return ensureJsonBody(response, url);
      // Refresh failed (no/expired refresh token) — session is unrecoverable, log out.
      console.warn(`[fetchWithAuth] ${response.status} on ${url}, refresh failed → logging out`);
      await safeLogout(); // best-effort cookie clear (only works from a Server Action)
      redirect("/logout"); // /logout Route Handler clears cookies + → /sign-in (works from renders too)
    }

    return ensureJsonBody(response, url);
  } catch (error) {
    throw error;
  }
};
