import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import React from "react";

const HowOrderingWorks = async () => {
  const res = await fetchWithAuth(`/settings/howOrderingWorks`, {});
  const data = await res.json();
  return (
    <Container>
      <div className=" py-10 text-gray-800 min-h-[100vh]">
        {/* title="How Ordering Works" */}
        <SectionHeader title="Ako funguje objednávanie" />

        {/* sanitizeHtml also returns "" for missing content — an undefined __html is
            dropped by RSC serialization, making React throw "must be in the form
            `{__html: ...}`". */}
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data?.data?.content) }}></div>
      </div>
    </Container>
  );
};

export default HowOrderingWorks;
