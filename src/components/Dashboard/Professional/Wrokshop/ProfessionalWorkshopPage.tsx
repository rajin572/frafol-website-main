"use client";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import SearchInput from "@/components/ui/Form/ReuseSearchInput";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import React, { Suspense, useState } from "react";

import ReusableTabs from "@/components/ui/ReusableTabs";
import ProfessionalWorkshopCard from "./ProfessionalWorkshopCard";
import ProfessionalAddNewWorkshop from "./ProfessionalAddNewWorkshop";
import ProfessionalEditWorkshop from "./ProfessionalEditWorkshop";
import ProfessionalViewParticipentModal from "./ProfessionalViewParticipentModal";
import { IWorkshop, IWorkshopParticipants } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { deleteWrokshop } from "@/services/WorkshopService/WorkshopServiceApi";
import PaginationSection from "@/components/shared/PaginationSection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProfessionalWorkshopPage = ({
  tab,
  page,
  limit,
  workshops,
  totalData,
  serviceCharge,
  minServiceCharge,
  participantsData,
}: {
  tab: string;
  searchText: string;
  page: number;
  limit: number;
  workshops: IWorkshop[];
  totalData: number;
  serviceCharge: number;
  minServiceCharge: number;
  participantsData: IWorkshopParticipants[] | undefined;
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const [isViewParticipantModalVisible, setIsViewParticipantModalVisible] =
    useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IWorkshop | null>(null);

  const showViewParticipantModal = (record: IWorkshop) => {
    const text = record?._id;
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("workshop", text);
    } else {
      params.delete("workshop");
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
    setCurrentRecord(record);
    setIsViewParticipantModalVisible(true);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const showEditModal = (record: IWorkshop) => {
    setIsEditModalVisible(true);
    setCurrentRecord(record);
  };

  const showDeleteModal = (record: IWorkshop) => {
    setIsDeleteModalVisible(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("workshop");
    replace(`${pathName}?${params.toString()}`, { scroll: false });
    setIsViewParticipantModalVisible(false);
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (record: IWorkshop) => {
    if (record) {
      const res = await tryCatchWrapper(
        deleteWrokshop,
        { params: record?._id },
        {
          toastLoadingMessage: "Odstraňuje sa kurz...",
          toastSuccessMessage: "Kurz bol úspešne odstránený!",
          toastErrorMessage: "Something went wrong! Please try again.",
        }
      );

      if (res?.success) {
        handleCancel();
      }
    }
  };

  return (
    <div>
      <div className=" w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" flex items-center justify-between">
          {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
            Workshops
          </h1> */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
            Kurzy
          </h1>
          <SearchInput placeholder="Search ..." />
        </div>
      </div>
      <div className="flex justify-end mb-5">
        <ReuseButton
          variant="secondary"
          className="!w-fit"
          onClick={showAddModal}
        >
          {/* Add New Workshop */}
          Pridať nový kurz
        </ReuseButton>
      </div>
      <ReusableTabs
        activeTab={tab}
        resetPage={true}
        align="left"
        tabs={[
          {
            label: "Aktívne",
            value: "approved",
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4">
                {workshops?.map((workshop: IWorkshop) => (
                  <ProfessionalWorkshopCard
                    key={workshop._id}
                    workshop={workshop}
                    showDeleteModal={showDeleteModal}
                    showEditModal={showEditModal}
                    showViewParticipantModal={showViewParticipantModal}
                  />
                ))}
              </div>
            ),
          },
          {
            label: "Čakajúce",
            value: "pending",
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {workshops?.map((workshop: IWorkshop) => (
                  <ProfessionalWorkshopCard
                    key={workshop._id}
                    workshop={workshop}
                    showDeleteModal={showDeleteModal}
                    showEditModal={showEditModal}
                    showViewParticipantModal={showViewParticipantModal}
                  />
                ))}
              </div>
            ),
          },
        ]}
      />

      <div className="mt-16 flex justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <PaginationSection page={page} limit={limit} totalData={totalData} />
        </Suspense>
      </div>

      <ProfessionalAddNewWorkshop
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
        serviceCharge={serviceCharge}
        minServiceCharge={minServiceCharge}
      />
      <ProfessionalEditWorkshop
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        serviceCharge={serviceCharge}
        minServiceCharge={minServiceCharge}
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
      />
      <ProfessionalViewParticipentModal
        isViewModalVisible={isViewParticipantModalVisible}
        handleCancel={handleCancel}
        participantsData={participantsData}
      />
    </div>
  );
};

export default ProfessionalWorkshopPage;
