"use client";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import SearchInput from "@/components/ui/Form/ReuseSearchInput";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import React, { Suspense, useState } from "react";
import ProfessionalAddNewPackageModal from "./ProfessionalAddNewPackageModal";
import ProfessionalEditPackageModal from "./ProfessionalEditPackageModal";
import ProfessionalPackageCard from "./ProfessionalPackageCard";
import ReusableTabs from "@/components/ui/ReusableTabs";
import PaginationSection from "@/components/shared/PaginationSection";
import { IPackage, ISignInUser } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { deletePackage } from "@/services/PackageService/PackageServiceApi";
import NoResultFound from "@/components/shared/NoResultFound";

const PackagesPage = ({
  tab,
  page,
  limit,
  packages,
  totalData,
  userData,
  serviceCharge,
  minServiceCharge
}: {
  tab: string;
  page: number;
  limit: number;
  packages: IPackage[];
  totalData: number;
  userData: ISignInUser;
  serviceCharge: number;
  minServiceCharge: number
}) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IPackage | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const showEditModal = (record: IPackage) => {
    setIsEditModalVisible(true);
    setCurrentRecord(record);
  };

  const showDeleteModal = (record: IPackage) => {
    setIsDeleteModalVisible(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (record: IPackage) => {
    if (record) {
      const res = await tryCatchWrapper(
        deletePackage,
        { params: record?._id },
        {
          toastLoadingMessage: "Deleting Package...",
          toastSuccessMessage: "Package deleted successfully!",
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
            Packages
          </h1> */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
            Balíky
          </h1>
          <ReuseButton
            variant="secondary"
            className="!w-fit"
            onClick={showAddModal}
          >
            {/* Add New Package */}
            Pridať nový balík
          </ReuseButton>
        </div>
      </div>
      <div className="flex justify-end mb-5">
        <SearchInput placeholder="Search ..." />
      </div>
      <ReusableTabs
        activeTab={tab}
        resetPage={true}
        align="left"
        tabs={[
          {
            label: "Aktívne",
            value: "approved",
            content:
              packages?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {packages?.map((item) => (
                    <ProfessionalPackageCard
                      key={item._id}
                      item={item}
                      showDeleteModal={showDeleteModal}
                      showEditModal={showEditModal}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-10">
                  <NoResultFound
                    title="No Active Packages"
                    description="create a new package or show all pending packages on pending tab"
                  />
                </div>
              ),
          },
          {
            label: "Čakajúce",
            value: "pending",
            content:
              packages?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {packages?.map((item) => (
                    <ProfessionalPackageCard
                      key={item._id}
                      item={item}
                      showDeleteModal={showDeleteModal}
                      showEditModal={showEditModal}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-10">
                  <NoResultFound
                    title="No Pending Packages"
                    description="create a new package or show all packages on active tab"
                  />
                </div>
              ),
          },
        ]}
      />

      {totalData > 0 && (
        <div className="mt-16 flex justify-center items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <PaginationSection
              page={page}
              limit={limit}
              totalData={totalData}
            />
          </Suspense>
        </div>
      )}

      <ProfessionalAddNewPackageModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
        userData={userData}
        serviceCharge={serviceCharge}
        minServiceCharge={minServiceCharge}
      />
      <ProfessionalEditPackageModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        userData={userData}
        serviceCharge={serviceCharge}
        minServiceCharge={minServiceCharge}
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default PackagesPage;
