/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UserOrderCard from "./UserOrderCard";
import UserOrderViewModal from "./UserOrderViewModal";
import { IEventOrder } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import {
  acceptDeliveryRequest,
  declineEventOrder,
} from "@/services/EventOrderService/EventOrderServiceApi";
import PaginationSection from "@/components/shared/PaginationSection";
import AcceptModal from "@/components/ui/Modal/AcceptModal";
import DeclineOrderRequestModal from "@/components/ui/Modal/DeclineOrderRequestModal";

const UserConfirmOrder = ({
  activeTab,
  page,
  totalData,
  myEventData,
  limit,
}: {
  activeTab: string;
  page: number;
  totalData: number;
  myEventData: IEventOrder[];
  limit: number;
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentRecord, setCurrentRecord] = React.useState<IEventOrder | null>(
    null
  );
  const [
    isDeclineOrderRequestModalVisible,
    setIsDeclineOrderRequestModalVisible,
  ] = React.useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] =
    React.useState(false);

  const showCancelModal = (record: IEventOrder) => {
    setIsDeclineOrderRequestModalVisible(true);
    setCurrentRecord(record);
  };

  const showConfirmModal = (record: IEventOrder) => {
    setIsConfirmModalVisible(true);
    setCurrentRecord(record);
  };

  const openModal = (record: IEventOrder) => {
    setIsModalOpen(true);
    setCurrentRecord(record);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsConfirmModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeclineOrder = async (values: any, data: IEventOrder) => {
    const res = await tryCatchWrapper(
      declineEventOrder,
      {
        body: { ...values, status: "deliveryRequestDeclined" },
        params: data?._id,
      },
      {
        toastLoadingMessage: "Sending request... ",
        toastSuccessMessage: "Request Sent Successfully! ",
        toastErrorMessage: "Something went wrong! Please try again. ",
      }
    );

    if (res?.success) {
      setIsDeclineOrderRequestModalVisible(false);
      handleCancel();
    }
  };

  const handleConfirmDelivery = async (data: any) => {
    const res = await tryCatchWrapper(
      acceptDeliveryRequest,
      { params: data?._id },
      {
        toastLoadingMessage: "Sending request... ",
        toastSuccessMessage: "Request Sent Successfully! ",
        toastErrorMessage: "Something went wrong! Please try again. ",
      }
    );

    if (res?.success) {
      setIsConfirmModalVisible(false);
      setCurrentRecord(null);
      handleCancel();
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        {myEventData?.map((item) => (
          <UserOrderCard
            data={item}
            activeTab={activeTab}
            key={item?._id}
            openModal={openModal}
            showConfirmModal={showConfirmModal}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center items-center">
        <PaginationSection page={page} totalData={totalData} limit={limit} />
      </div>
      <UserOrderViewModal
        isViewModalVisible={isModalOpen}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        activeModal={activeTab}
        showCancelModal={showCancelModal}
      />
      <DeclineOrderRequestModal
        isDeclineOrderRequestModalVisible={isDeclineOrderRequestModalVisible}
        handleCancel={() => setIsDeclineOrderRequestModalVisible(false)}
        currentRecord={currentRecord}
        handleDeclineOrder={handleDeclineOrder}
        description="Are You Sure You want to Decline This Delivery Request ?"
      />
      <AcceptModal
        isModalVisible={isConfirmModalVisible}
        handleCancel={() => setIsConfirmModalVisible(false)}
        currentRecord={currentRecord}
        handleConfirm={handleConfirmDelivery}
        description=" Are You Sure You want to Confirm This Delivery ?"
      />
    </div>
  );
};

export default UserConfirmOrder;
