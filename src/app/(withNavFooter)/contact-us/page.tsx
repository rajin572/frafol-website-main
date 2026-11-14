import { PAGE_SEO, staticPageMetadata } from "@/lib/seo/pages";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import ContactUs from "@/components/ContactUs/ContactUs";
import Container from "@/components/ui/Container";
import React from "react";

export const metadata = staticPageMetadata("contactUs");

const page = () => {
  return (
    <main className="py-10">
      <JsonLd
        data={[
          webPageSchema({ type: "ContactPage", name: PAGE_SEO.contactUs.title, description: PAGE_SEO.contactUs.description, path: PAGE_SEO.contactUs.path }),
          breadcrumbSchema([{ name: "Domov", path: "/" }, { name: "Kontakt", path: PAGE_SEO.contactUs.path }]),
        ]}
      />
      <Container>
        <ContactUs />
      </Container>
    </main>
  );
};

export default page;
