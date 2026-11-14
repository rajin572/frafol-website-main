import { PAGE_SEO, staticPageMetadata } from "@/lib/seo/pages";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import AboutUsPage from "@/components/AboutUs/AboutUsPage";
import Container from "@/components/ui/Container";
import React from "react";

export const metadata = staticPageMetadata("aboutUs");

const page = () => {
  return (
    <main className="py-10 sm:py-14">
      <JsonLd
        data={[
          webPageSchema({ type: "AboutPage", name: PAGE_SEO.aboutUs.title, description: PAGE_SEO.aboutUs.description, path: PAGE_SEO.aboutUs.path }),
          breadcrumbSchema([{ name: "Domov", path: "/" }, { name: "O nás", path: PAGE_SEO.aboutUs.path }]),
        ]}
      />
      <Container>
        <AboutUsPage />
      </Container>
    </main>
  );
};

export default page;
