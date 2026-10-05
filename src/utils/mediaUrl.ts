import { getServerUrl } from "@/helpers/config/envConfig";

// Already-resolvable sources that must NOT get the server prefix: full/protocol-relative
// URLs, blob:/data: previews, and the app's own static files (public/assets, _next).
const PASS_THROUGH = /^(?:[a-z][a-z\d+.-]*:|\/\/|\/assets\/|\/_next\/)/i;

// Photo/video paths from the API come in a few shapes: "/uploads/profile/x.png" (most
// records), "profile/x.png" (no leading slash) or a full URL. The file server only serves
// static files under /uploads, so a bare path lives at <server>/uploads/<path>.
// Everything already resolvable is returned untouched. Joins with exactly one slash
// (NEXT_PUBLIC_SERVER_API ends with "/").
// Returns "" for empty input so callers can keep using `getMediaUrl(x) || fallback`.
export const getMediaUrl = (path?: string | null): string => {
  if (!path) return "";
  if (PASS_THROUGH.test(path)) return path;
  const base = (getServerUrl() ?? "").replace(/\/+$/, "");
  const rooted = path.startsWith("/")
    ? path
    : path.startsWith("uploads/")
      ? `/${path}`
      : `/uploads/${path}`;
  return `${base}${rooted}`;
};
