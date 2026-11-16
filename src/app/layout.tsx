import "@ant-design/v5-patch-for-react-19";
import { Nunito } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "sonner";
import AntdLocaleProvider from "@/components/shared/AntdLocaleProvider";
import { mainTheme } from "@/theme";
import Providers from "@/providers/Providers";
import ModalScrollLock from "@/components/shared/ModalScrollLock";
import NavbarWraper from "@/components/shared/NavbarWraper";
import Navbar from "@/components/shared/Navbar";
import { Suspense } from "react";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  ORGANIZATION,
  SITE_NAME,
  SITE_URL,
  robotsFor,
} from "@/lib/seo/site";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

// Defaults for every page. Public pages override title / description / canonical with
// `pageMetadata()` (src/lib/seo/site.ts); private ones use NOINDEX_METADATA.
// Favicon / app icons are the files src/app/favicon.ico, icon.png and apple-icon.png.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: ORGANIZATION.legalName, url: SITE_URL }],
  creator: ORGANIZATION.legalName,
  publisher: ORGANIZATION.legalName,
  category: "photography",
  formatDetection: { telephone: false, email: false, address: false },
  robots: robotsFor(),
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "sk_SK",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#ad2b08",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body
        className={`${nunito.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Providers>
          <Toaster position="top-center" richColors />
          <ModalScrollLock />
          <AntdRegistry>
            <AntdLocaleProvider theme={mainTheme}>
              <div className="pointer-events-none sticky top-0 w-full z-[100]!">
                {/* The navbar loads the user's notifications; until then it shows without them, so the
                    page itself is never held back by that request. */}
                <Suspense fallback={<Navbar notifications={[]} />}>
                  <NavbarWraper />
                </Suspense>
              </div>
              {children}
            </AntdLocaleProvider>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
