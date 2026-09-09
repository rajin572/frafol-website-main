import React, { useState } from "react";
import UserGearOrderCard from "./UserGearOrderCard";
import UserGearViewModal from "./UserGearViewModal";
import { IGearOrder } from "@/types";
import PaginationSection from "@/components/shared/PaginationSection";
import AcceptModal from "@/components/ui/Modal/AcceptModal";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { acceptGearDeliveryRequest } from "@/services/GearOrder/GearOrderApi";

const UserConfirmGearOrder = ({
  myGearOrderData,
  page,
  limit,
  totalData,
  activeTab,
}: {
  myGearOrderData: IGearOrder[];
  page: number;
  limit: number;
  totalData: number;
  activeTab: string;
}) => {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeliverModalVisible, setIsDeliverModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IGearOrder | null>(null);

  const showDeliverModal = (record: IGearOrder) => {
    setIsDeliverModalVisible(true);
    setCurrentRecord(record);
  };

  const showViewModal = (record: IGearOrder) => {
    setIsViewModalVisible(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeliverGearOrder = async (data: IGearOrder) => {
    const res = await tryCatchWrapper(
      acceptGearDeliveryRequest,
      { params: data?._id },
      {
        toastLoadingMessage: "Accepting Delivery Request...",
        toastSuccessMessage: "Delivery Request Accepted Successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      setIsDeliverModalVisible(false);
      handleCancel();
    }
  };

  return (
    <div>
      <div className="space-y-5">
        {myGearOrderData?.map((item, index) => (
          <UserGearOrderCard
            data={item}
            activeTab={activeTab}
            key={index}
            openModal={showViewModal}
            showAcceptDeliverModal={showDeliverModal}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center items-center">
        <PaginationSection page={page} totalData={totalData} limit={limit} />
      </div>
      <UserGearViewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        activeModal={activeTab}
        showAcceptDeliverModal={showDeliverModal}
      />
      <AcceptModal
        isModalVisible={isDeliverModalVisible}
        handleCancel={() => setIsDeliverModalVisible(false)}
        description="Are you sure you want to mark this order as delivered?"
        currentRecord={currentRecord}
        handleConfirm={handleDeliverGearOrder}
      />
    </div>
  );
};

export default UserConfirmGearOrder;
