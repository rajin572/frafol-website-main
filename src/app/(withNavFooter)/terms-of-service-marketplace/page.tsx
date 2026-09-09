import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import React from "react";

const PrivacyPolicy = async () => {
  const res = await fetchWithAuth(`/settings/privacyPolicy`, {});
  const data = await res.json();
  return (
    <Container>
      <div className=" py-10 text-gray-800 min-h-[100vh]">
        <SectionHeader title="Všeobecné obchodné podmienky Online trh" />
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data?.data?.content) }}></div>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
