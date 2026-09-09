import React from "react";
// import UserOrderCard from "./UserOrderCard";
import UserOrderViewModal from "./UserOrderViewModal";

const UserMyOffer = ({ activeTab }: { activeTab: string }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // const openModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  return (
    <div>
      <div className="space-y-5">
        {/* {Array.from({ length: 2 }).map((_, index) => (
          <UserOrderCard
            data={[]}
            activeTab={activeTab}
            key={index}
            openModal={openModal}
          />
        ))} */}
      </div>
      <UserOrderViewModal
        isViewModalVisible={isModalOpen}
        handleCancel={handleCancel}
        currentRecord={null}
        activeModal={activeTab}
      />
    </div>
  );
};

export default UserMyOffer;
