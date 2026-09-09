import React from "react";
import ProfessionalOverviewCards from "./ProfessionalOverviewCards";
import IncomeOverview from "./IncomeOverview";
import UpcomingEventSection from "./UpcomingEventSection";
import PendingEventOrdersOverview from "./PendingEventOrdersOverview";

const ProfessionalOverviewPage = async ({ year }: { year: number }) => {
  return (
    <div>
      <ProfessionalOverviewCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <IncomeOverview year={year} />
        <UpcomingEventSection />
      </div>
      <PendingEventOrdersOverview />
    </div>
  );
};

export default ProfessionalOverviewPage;
