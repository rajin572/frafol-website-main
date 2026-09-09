/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UserOrderCard from "./UserOrderCard";
import UserOrderViewModal from "./UserOrderViewModal";
import { IEventOrder } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { cancelEventOrder } from "@/services/EventOrderService/EventOrderServiceApi";
import PaginationSection from "@/components/shared/PaginationSection";
import CancleOrderModal from "@/components/ui/Modal/CancleOrderModal";

const UserDeliveriedOrder = ({
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
  const [isCancelModalVisible, setIsCancelModalVisible] = React.useState(false);

  const showCancelModal = (record: IEventOrder) => {
    setIsCancelModalVisible(true);
    setCurrentRecord(record);
  };

  const openModal = (record: IEventOrder) => {
    setIsModalOpen(true);
    setCurrentRecord(record);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const handleCancelOrder = async (values: any, data: IEventOrder) => {
    const res = await tryCatchWrapper(
      cancelEventOrder,
      { body: values, params: data?._id },
      {
        toastLoadingMessage: "Sending request... ",
        toastSuccessMessage: "Request Sent Successfully! ",
        toastErrorMessage: "Something went wrong! Please try again ",
      }
    );

    if (res?.success) {
      setIsCancelModalVisible(false);
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
      <CancleOrderModal
        isCancleOrderModalVisible={isCancelModalVisible}
        handleCancel={() => setIsCancelModalVisible(false)}
        currentRecord={currentRecord}
        handleCancelOrder={handleCancelOrder}
      />
    </div>
  );
};

export default UserDeliveriedOrder;
