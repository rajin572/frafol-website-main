"use client";
import React, { Suspense } from "react";
import SectionHeader from "../ui/SectionHeader";
import WorkShopsCards from "../shared/WorkShopsCards";
import { IProfile, IWorkshop } from "@/types";
import PaginationSection from "../shared/PaginationSection";
import RegisterWrokshopModal from "../ui/Modal/Workshop/RegisterWrokshopModal";

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
    <div className="py-20">
      {/* title="Photography & Videography Workshops" */}
      {/* description="Learn new skills and techniques from industry professionals." */}
      <SectionHeader title="Fotografické a video workshopy" description="Objavte praktické kurzy vedené fotografmi a kameramanmi z praxe." />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {workshops.map((item) => (
          <WorkShopsCards key={item._id} data={item} handleModalOpen={openModal} />
        ))}
      </div>
      <div className="mt-16 flex justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <PaginationSection page={page} limit={limit} totalData={totalData} />
        </Suspense>
      </div>
      <RegisterWrokshopModal isModalVisible={isModalOpen} handleCancel={closeModal} currentRecord={currentRecord} myData={myData} />
    </div>
  );
};

export default WorkshopsPage;
