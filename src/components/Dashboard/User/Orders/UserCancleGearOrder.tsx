import React from "react";
import UserGearOrderCard from "./UserGearOrderCard";
import UserGearViewModal from "./UserGearViewModal";
import { IGearOrder } from "@/types";
import PaginationSection from "@/components/shared/PaginationSection";

const UserCancleGearOrder = ({
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentRecord, setCurrentRecord] = React.useState<IGearOrder | null>(
    null
  );

  const openModal = (record: IGearOrder) => {
    setIsModalOpen(true);
    setCurrentRecord(record);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };
  return (
    <div>
      <div className="space-y-5">
        {myGearOrderData?.map((item, index) => (
          <UserGearOrderCard
            data={item}
            activeTab={activeTab}
            key={index}
            openModal={openModal}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center items-center">
        <PaginationSection page={page} totalData={totalData} limit={limit} />
      </div>
      <UserGearViewModal
        isViewModalVisible={isModalOpen}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        activeModal={activeTab}
      />
    </div>
  );
};

export default UserCancleGearOrder;
