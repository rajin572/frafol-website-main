import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import React from "react";

const TermsOfService = async () => {
  const res = await fetchWithAuth(`/settings/termsService`, {});
  const data = await res.json();
  return (
    <Container>
      <div className=" py-10 text-gray-800 min-h-[100vh]">
        {/* title="Terms of Service Conceptural" */}
        <SectionHeader title="Všeobecné obchodné podmienky Zmluvné vzťahy" />

        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data?.data?.content) }}></div>
      </div>
    </Container>
  );
};

export default TermsOfService;
