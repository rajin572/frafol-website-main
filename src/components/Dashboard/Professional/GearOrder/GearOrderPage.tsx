"use client";
import SearchInput from "@/components/ui/Form/ReuseSearchInput";
import GearOrderTable from "@/components/ui/Table/GearOrderTable";
import React, { useState } from "react";
import GearOrderViewModal from "./GearOrderViewModal";
import { IGearOrder } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import {
  cancelGearOrder,
  sendGearDeliveryRequest,
} from "@/services/GearOrder/GearOrderApi";
import CancleOrderModal from "@/components/ui/Modal/CancleOrderModal";
import AcceptModal from "@/components/ui/Modal/AcceptModal";

const GearOrderPage = ({
  myGearOrderData,
  totalData,
  page,
  limit = 12,
}: {
  myGearOrderData: IGearOrder[];
  totalData: number;
  page: number;
  limit?: number;
}) => {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeliverModalVisible, setIsDeliverModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IGearOrder | null>(null);

  const showCancelModal = (record: IGearOrder) => {
    setIsCancelModalVisible(true);
    setCurrentRecord(record);
  };

  const showDeliverModal = (record: IGearOrder) => {
    setIsDeliverModalVisible(true);
    setCurrentRecord(record);
  };

  const showViewUserModal = (record: IGearOrder) => {
    setIsViewModalVisible(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeliverGearOrder = async (data: IGearOrder) => {
    const res = await tryCatchWrapper(
      sendGearDeliveryRequest,
      { params: data?._id },
      {
        toastLoadingMessage: "Sending request...",
        toastSuccessMessage: "Request Sent Successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      setIsDeliverModalVisible(false);
      handleCancel();
    }
  };
  const handleCancelGearOrder = async (
    values: { reason: string },
    data: IGearOrder
  ) => {
    const res = await tryCatchWrapper(
      cancelGearOrder,
      { body: values, params: data?._id },
      {
        toastLoadingMessage: "Sending request...",
        toastSuccessMessage: "Request Sent Successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      setIsCancelModalVisible(false);
      handleCancel();
    }
  };

  return (
    <div>
      <div className=" min-h-[80vh] rounded-xl px-4">
        <div className=" w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
              Gear Orders
            </h1> */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
              Objednávky príslušenstva
            </h1>
            <SearchInput placeholder="Search ..." />
          </div>
        </div>

        <GearOrderTable
          data={myGearOrderData}
          loading={false}
          showViewModal={showViewUserModal}
          page={page}
          total={totalData}
          limit={limit}
        />

        <GearOrderViewModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          showCancelModal={showCancelModal}
          showDeliverModal={showDeliverModal}
        />
        <CancleOrderModal
          isCancleOrderModalVisible={isCancelModalVisible}
          handleCancel={() => setIsCancelModalVisible(false)}
          currentRecord={currentRecord}
          handleCancelOrder={handleCancelGearOrder}
        />
        <AcceptModal
          isModalVisible={isDeliverModalVisible}
          handleCancel={() => setIsDeliverModalVisible(false)}
          description="Ste si istí, že chcete túto objednávku označiť ako doručenú?"
          currentRecord={currentRecord}
          handleConfirm={handleDeliverGearOrder}
        />
      </div>
    </div>
  );
};

export default GearOrderPage;
