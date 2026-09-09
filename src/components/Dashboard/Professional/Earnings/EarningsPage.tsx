/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import SearchInput from "@/components/ui/Form/ReuseSearchInput";
import ReusableTabs from "@/components/ui/ReusableTabs";
import EventEarningTable from "./EventEarningTable";
import GearEarningTable from "./GearEarningTable";
import WorkshopEarningTable from "./WorkshopEarningTable";
import EarningViewModal from "./EarningViewModal";

type EarningType = "event" | "gear" | "workshop";

interface EarningsPageProps {
  data: any[];
  totalData: number;
  activeTab: EarningType;
  page: number;
  limit: number;
}

const EarningsPage = ({ data, totalData, activeTab, page, limit }: EarningsPageProps) => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [modalType, setModalType] = useState<EarningType>("event");

  const handleView = (record: any, type: EarningType) => {
    setModalType(type);
    setSelectedRecord(record);
  };

  const tabs = [
    {
      label: "Podujatia",
      value: "event" as EarningType,
      content: (
        <EventEarningTable
          data={activeTab === "event" ? data : []}
          total={activeTab === "event" ? totalData : 0}
          page={page}
          limit={limit}
          onView={(r) => handleView(r, "event")}
        />
      ),
    },
    {
      label: "Bazár",
      value: "gear" as EarningType,
      content: (
        <GearEarningTable
          data={activeTab === "gear" ? data : []}
          total={activeTab === "gear" ? totalData : 0}
          page={page}
          limit={limit}
          onView={(r) => handleView(r, "gear")}
        />
      ),
    },
    {
      label: "Kurzy",
      value: "workshop" as EarningType,
      content: (
        <WorkshopEarningTable
          data={activeTab === "workshop" ? data : []}
          total={activeTab === "workshop" ? totalData : 0}
          page={page}
          limit={limit}
          onView={(r) => handleView(r, "workshop")}
        />
      ),
    },
  ];

  return (
    <div className="bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">Earning</h1> */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">Zárobky</h1>
        <div className="h-fit">
          <SearchInput placeholder="Search ..." />
        </div>
      </div>

      <ReusableTabs
        tabs={tabs}
        activeTab={activeTab}
        align="left"
        tabName="type"
        resetPage
      />

      <EarningViewModal
        isVisible={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        record={selectedRecord}
        type={modalType}
      />
    </div>
  );
};

export default EarningsPage;
