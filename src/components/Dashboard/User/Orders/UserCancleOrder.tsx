import React from "react";
import UserOrderCard from "./UserOrderCard";
import UserOrderViewModal from "./UserOrderViewModal";
import { IEventOrder } from "@/types";

import PaginationSection from "@/components/shared/PaginationSection";
import AcceptModal from "@/components/ui/Modal/AcceptModal";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import {
  acceptCancelRequest,
  declineCancelRequest,
} from "@/services/EventOrderService/EventOrderServiceApi";
import DeleteModal from "@/components/ui/Modal/DeleteModal";

const UserCancleOrder = ({
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

  const [isAcceptModalVisible, setIsAcceptModalVisible] = React.useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] =
    React.useState(false);

  const showAcceptModal = (record: IEventOrder) => {
    setIsAcceptModalVisible(true);
    setCurrentRecord(record);
  };

  const showDeclineModal = (record: IEventOrder) => {
    setIsDeclineModalVisible(true);
    setCurrentRecord(record);
  };

  const openModal = (record: IEventOrder) => {
    setIsModalOpen(true);
    setCurrentRecord(record);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDeclineModalVisible(false);
    setIsAcceptModalVisible(false);
    setCurrentRecord(null);
  };

  const handleAcceptCancel = async (data: IEventOrder) => {
    const res = await tryCatchWrapper(
      acceptCancelRequest,
      { params: data?._id },
      {
        toastLoadingMessage: "Cancelling...",
        toastSuccessMessage: "Cancelled Successfully!",
        toastErrorMessage: "Something went wrong! Please try again",
      }
    );

    if (res?.success) {
      handleCancel();
    }
  };

  const handleRejectCancelOrder = async (data: IEventOrder) => {
    const res = await tryCatchWrapper(
      declineCancelRequest,
      {
        params: data?._id,
      },
      {
        toastLoadingMessage: "Rejecting...",
        toastSuccessMessage: "Rejected Successfully!",
        toastErrorMessage: "Something went wrong! Please try again",
      }
    );

    if (res?.success) {
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
            showAcceptModal={showAcceptModal}
            showDeclineModal={showDeclineModal}
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
      />

      <AcceptModal
        isModalVisible={isAcceptModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleConfirm={handleAcceptCancel}
        description="Are You Sure You want to Accept This Cancel Request ?"
      />

      <DeleteModal
        isDeleteModalVisible={isDeclineModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleRejectCancelOrder}
        buttonText="Decline"
        description="Are You Sure You want to Reject This Cancel Request ?"
      />
    </div>
  );
};

export default UserCancleOrder;
