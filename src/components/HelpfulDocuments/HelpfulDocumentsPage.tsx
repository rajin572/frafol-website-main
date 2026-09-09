import React from "react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import HelpfulDocumentsTabs from "./HelpfulDocumentsTabs";

const HelpfulDocumentsPage = () => {
  return (
    <section>
      <Container>
        {/* title="Helpful Documents" */}
        {/* description="Download useful templates and legal documents for your photography and videography projects" */}
        <SectionHeader title="Užitočné dokumenty" description="Stiahnite si užitočné šablóny a právne dokumenty pre vaše fotografické a video projekty" />
        <HelpfulDocumentsTabs />
      </Container>
    </section>
  );
};

export default HelpfulDocumentsPage;
