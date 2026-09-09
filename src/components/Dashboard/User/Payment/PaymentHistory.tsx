"use client";
import React from "react";
import PaymentsCard from "./PaymentsCard";
import PaymenViewModal from "./PaymentViewModal";
import { IPayment } from "@/types";
import PaginationSection from "@/components/shared/PaginationSection";

const PaymentHistory = ({
  myPaymnetData,
  totalData,
  page,
  limit,
}: {
  myPaymnetData: IPayment[];
  totalData: number;
  page: number;
  limit: number;
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentRecord, setCurrentRecord] = React.useState<IPayment | null>(
    null
  );
  const openModal = (record: IPayment) => {
    setIsModalOpen(true);
    setCurrentRecord(record);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        {myPaymnetData?.map((item, index) => (
          <PaymentsCard openModal={openModal} key={index} data={item} />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <PaginationSection totalData={totalData} page={page} limit={limit} />
      </div>
      <PaymenViewModal
        isViewModalVisible={isModalOpen}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default PaymentHistory;
