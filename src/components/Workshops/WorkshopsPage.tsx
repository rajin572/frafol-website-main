"use client";
import React, { Suspense } from "react";
import WorkShopsCards from "../shared/WorkShopsCards";
import { IProfile, IWorkshop } from "@/types";
import PaginationSection from "../shared/PaginationSection";
import RegisterWrokshopModal from "../ui/Modal/Workshop/RegisterWrokshopModal";

// The title and intro are in the page banner (see app/(withNavFooter)/workshops/page.tsx).
const WorkshopsPage = ({
  workshops,
  totalData,
  page,
  limit,
  myData
}: {
  workshops: IWorkshop[];
  totalData: number;
  page: number;
  limit: number;
  // Optional: guests have no profile, so the page skips that fetch for them.
  myData?: IProfile
}) => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentRecord, setCurrentRecord] = React.useState<IWorkshop | null>(null);

  const openModal = (record: IWorkshop) => {
    setIsModalOpen(true);
    setCurrentRecord(record);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-6">
        {workshops.map((item) => (
          <WorkShopsCards key={item._id} data={item} handleModalOpen={openModal} />
        ))}
      </div>
      <div className="mt-14 flex justify-center items-center">
        <Suspense fallback={<div>Načítava sa...</div>}>
          <PaginationSection page={page} limit={limit} totalData={totalData} />
        </Suspense>
      </div>
      <RegisterWrokshopModal isModalVisible={isModalOpen} handleCancel={closeModal} currentRecord={currentRecord} myData={myData} />
    </div>
  );
};

export default WorkshopsPage;
