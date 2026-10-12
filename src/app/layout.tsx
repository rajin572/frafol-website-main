import "@ant-design/v5-patch-for-react-19";
import { Nunito } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import { mainTheme } from "@/theme";
import Providers from "@/providers/Providers";
import ModalScrollLock from "@/components/shared/ModalScrollLock";
import NavbarWraper from "@/components/shared/NavbarWraper";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata = {
  title: "Frafol",
  template: "%s - Frafol",
  description:
    "Nájdite skúsených fotografov a kameramanov, pozrite si ich portfóliá a jednoducho si objednajte svoje ďalšie fotenie alebo natáčanie",
  keywords: ["Frafol"],
  openGraph: {
    title: "Frafol",
    description:
      "Nájdite skúsených fotografov a kameramanov, pozrite si ich portfóliá a jednoducho si objednajte svoje ďalšie fotenie alebo natáčanie",
    images: [
      {
        url: "./opengraph-image.png",
        width: 1920,
        height: 1080,
      },
    ],
    url: "https://frafol-website.vercel.app/",
    type: "website",
    siteName: "Frafol",
  },

  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },

  twitter: {
    card: "summary_large_image",
    title: "Frafol",
    description:
      "Nájdite skúsených fotografov a kameramanov, pozrite si ich portfóliá a jednoducho si objednajte svoje ďalšie fotenie alebo natáčanie.",
    images: ["./opengraph-image.png"],
    creator: "@Frafol",
  },

  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },

  metadataBase: new URL("https://frafol-website.vercel.app/"),
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
        <Providers>
          <Toaster position="top-center" richColors />
          <ModalScrollLock />
          <AntdRegistry>
            <ConfigProvider theme={mainTheme} locale={{ locale: "en", Image: { preview: "Náhľad" } }}>
              <div className="sticky top-0 w-full z-[100]!">
                <NavbarWraper />
              </div>
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
