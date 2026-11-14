import { staticPageMetadata } from "@/lib/seo/pages";
import HelpfulDocumentsPage from "@/components/HelpfulDocuments/HelpfulDocumentsPage";
import React from "react";

export const metadata = staticPageMetadata("helpfulDocuments");

const page = () => {
  return (
    <main className="py-20 min-h-[95vh]">
      <HelpfulDocumentsPage />
    </main>
  );
};

export default page;
