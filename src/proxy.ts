/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { decodedToken } from "./utils/jwt";
import { missingRecordForCrawlers } from "./lib/seo/missingRecordForCrawlers";

// Define types for the request and response
interface Request {
  nextUrl: URL;
}

interface DecodedToken {
  email: string;
  role: string;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public detail pages (profile, product, forum post): only the 404 check for crawlers, no auth.
  const detailResponse = await missingRecordForCrawlers(request);
  if (detailResponse) return detailResponse;

  // Await cookies() to get the cookies object
  const accessToken = (await cookies()).get("frafolMainAccessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl.href));
  }

  try {
    // Decode the token
    const decodedData: DecodedToken | undefined = decodedToken(accessToken);
    const email = decodedData?.email;
    const role = decodedData?.role;

    console.log("decodedData", decodedData);

    const privateRoutesClient = [
      "/dashboard/my-account/overview",
      "/dashboard/my-account/orders",
      "/dashboard/my-account/gear-order",
      "/dashboard/my-account/my-workshop",
      "/dashboard/my-account/reviews",
      "/dashboard/my-account/profile-settings",
      "/dashboard/my-account/my-community-posts",
      "/dashboard/my-account/payments",
      "/dashboard/my-account/extension-requests",
      "/dashboard/my-account/:paths*",
    ];

    if (privateRoutesClient.some((route) => pathname.startsWith(route))) {
      if (role === "company" || role === "user") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/sign-in", request.nextUrl.href));
      }
    }

    const privateRoutesProfessional = [
      "/dashboard/professional/overview",
      "/dashboard/professional/event-orders",
      "/dashboard/professional/gear-order",
      "/dashboard/professional/calendar",
      "/dashboard/professional/gear-marketPlace",
      "/dashboard/professional/my-community-posts",
      "/dashboard/professional/my-workshop",
      "/dashboard/professional/workshop",
      "/dashboard/professional/packages",
      "/dashboard/professional/earning",
      "/dashboard/professional/review",
      "/dashboard/professional/profile-settings",
      "/dashboard/professional/:paths*",
    ];

    if (privateRoutesProfessional.some((route) => pathname.startsWith(route))) {
      if (
        role === "photographer" ||
        role === "videographer" ||
        role === "both"
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/sign-in", request.nextUrl.href));
      }
    }

    const privateRoutes = ["/message", "/cart", "insurance", "notification"];

    if (privateRoutes.some((route) => pathname.startsWith(route))) {
      if (email) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/sign-in", request.nextUrl.href));
      }
    }
  } catch (error: any) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl.href));
  }
}

export const config = {
  matcher: [
    // Public detail pages, see missingRecordForCrawlers
    "/professionals/:id",
    "/professionals/:id/works",
    "/marketplace/:id",
    "/forums/:id",

    "/message",
    "/cart",
    "/insurance",
    "/notification",

    "/dashboard/professional/:paths*",
    "/dashboard/professional/overview",
    "/dashboard/professional/event-orders",
    "/dashboard/professional/gear-order",
    "/dashboard/professional/calendar",
    "/dashboard/professional/gear-marketPlace",
    "/dashboard/professional/my-community-posts",
    "/dashboard/professional/my-workshop",
    "/dashboard/professional/workshop",
    "/dashboard/professional/packages",
    "/dashboard/professional/earning",
    "/dashboard/professional/review",
    "/dashboard/professional/profile-settings",

    "/dashboard/my-account/:paths*",
    "/dashboard/my-account/overview",
    "/dashboard/my-account/orders",
    "/dashboard/my-account/gear-order",
    "/dashboard/my-account/my-workshop",
    "/dashboard/my-account/reviews",
    "/dashboard/my-account/profile-settings",
    "/dashboard/my-account/my-community-posts",
    "/dashboard/my-account/payments",
    "/dashboard/my-account/extension-requests",
  ],
};
