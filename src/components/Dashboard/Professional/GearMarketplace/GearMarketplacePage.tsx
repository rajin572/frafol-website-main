/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import SearchInput from "@/components/ui/Form/ReuseSearchInput";
import GearMarketPlaceTable from "../../../ui/Table/GearMarketPlaceTable";
import GearMarketViewModal from "./GearMarketViewModal";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import GearMarketPlaceAddNewGear from "./GearMarketPlaceAddNewGear";
import GearMarketPlaceEditNewGear from "./GearMarketPlaceEditNewGear";
import { ICategory, IGear } from "@/types";
import { FaPlus } from "react-icons/fa6";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { deleteGear } from "@/services/GearService/GearServiceApi";
import { Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const GearMarketplacePage = ({
  page,
  limit,
  categories,
  myGears,
  totalData,
  serviceCharge,
  minServiceCharge
}: {
  page: number;
  limit: number;
  categories: ICategory[];
  myGears: IGear[];
  totalData: number;
  serviceCharge: number;
  minServiceCharge: number;
}) => {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const currentFilter = searchParams.get("filter") || "";

  // Status filter (matches backend enum: "In Stock" | "Sold Out"). Writes ?filter= to the URL.
  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("filter", value);
    } else {
      params.delete("filter");
    }
    params.set("page", "1");
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const showEditModal = (record: any) => {
    setIsEditModalVisible(true);
    setCurrentRecord(record);
  };

  const showDeleteModal = (record: any) => {
    setIsDeleteModalVisible(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleDelete = async (record: IGear) => {
    // Implement delete functionality here
    if (record) {
      const res = await tryCatchWrapper(
        deleteGear,
        { params: record?._id },
        {
          toastLoadingMessage: "Deleting Gear...",
          toastSuccessMessage: "Gear deleted successfully!",
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
      <div className=" min-h-[80vh] rounded-xl px-4">
        <div className=" w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
              Gear Marketplace
            </h1> */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
              Bazár
            </h1>
            <ReuseButton
              variant="secondary"
              className="!w-fit"
              onClick={showAddModal}
            >
              <FaPlus className="mr-2" />
              {/* Add Gear */}
              Pridať nové príslušenstvo
            </ReuseButton>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3 mb-5">
          <Select
            value={currentFilter}
            onChange={handleFilterChange}
            className="!w-40 !h-10"
            options={[
              { value: "", label: "Všetky" },
              { value: "In Stock", label: "Na sklade" },
              { value: "Sold Out", label: "Vypredané" },
            ]}
          />
          <SearchInput placeholder="Search ..." />
        </div>
        <GearMarketPlaceTable
          data={myGears}
          loading={false}
          showViewModal={showViewUserModal}
          showEditModal={showEditModal}
          showDeleteModal={showDeleteModal}
          page={page}
          total={totalData}
          limit={limit}
        />
        <GearMarketViewModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <GearMarketPlaceAddNewGear
          isAddModalVisible={isAddModalVisible}
          handleCancel={handleCancel}
          categories={categories}
          serviceCharge={serviceCharge}
          minServiceCharge={minServiceCharge}
        />
        <GearMarketPlaceEditNewGear
          isEditModalVisible={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          categories={categories}
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
    </div>
  );
};

export default GearMarketplacePage;
