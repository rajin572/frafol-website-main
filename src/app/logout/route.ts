import { NextResponse } from "next/server";

// Route Handler used to force a server-side logout. Unlike a page render (Server
// Component), a Route Handler is allowed to mutate cookies — so this is where the auth
// cookies actually get cleared before bouncing the user to sign-in. fetchWithAuth
// redirects here when a session is unrecoverable (401/403 refresh failed, or 404).
export async function GET() {
  // Use a RELATIVE Location so the browser resolves it against the host it actually
  // requested (e.g. a LAN IP like 10.10.28.44:3000 in dev). Building an absolute URL
  // from `request.url` would bake in the server's own origin (localhost:3000) and
  // redirect there instead.
  const response = new NextResponse(null, {
    status: 302,
    headers: { Location: "/sign-in" },
  });
  response.cookies.delete("frafolMainAccessToken");
  response.cookies.delete("frafolMainRefreshToken");
  return response;
}
