import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo/site";

// /manifest.webmanifest: name and icons when the site is added to a phone's home screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Frafol – Fotografi a kameramani",
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    lang: "sk",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ad2b08",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
