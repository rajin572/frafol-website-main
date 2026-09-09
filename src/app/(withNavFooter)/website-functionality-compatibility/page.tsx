import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import React from "react";

const WebsiteFunctionalityCompatibility = async () => {
  const res = await fetchWithAuth(
    `/settings/websiteFunctionalityCompatibility`,
    {}
  );
  const data = await res.json();
  return (
    <Container>
      <div className=" py-10 text-gray-800 min-h-[100vh]">
        <SectionHeader title="Funkčnosť a kompatibilita webu" />

        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data?.data?.content) }}></div>
      </div>
    </Container>
  );
};

export default WebsiteFunctionalityCompatibility;
