/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProfessionalEventOrderTable from "@/components/ui/Table/ProfessionalEventOrderTable";
import React, { useState } from "react";
import { IEventOrder } from "@/types";
import SendDeliveryRequestModal from "@/components/ui/Modal/Event/SendDeliveryRequestModal";
import CancleOrderModal from "@/components/ui/Modal/CancleOrderModal";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import {
  cancelEventOrder,
  declineEventOrder,
  sendExtensionRequest,
} from "@/services/EventOrderService/EventOrderServiceApi";
import DeclineOrderRequestModal from "@/components/ui/Modal/DeclineOrderRequestModal";
import ExtenstionRequestModal from "@/components/ui/Modal/ExtenstionRequestModal";
import ProfessionalEventViewModal from "../EventOrders/ProfessionalEventViewModal";
import EventCreateOrderModal from "../EventOrders/EventCreateOrderModal";

const PendingEventOrdersPage = ({
  myEventData,
  totalData,
  serviceCharge,
  minServiceCharge,
}: {
  myEventData: IEventOrder[];
  totalData: number;
  serviceCharge: number;
  minServiceCharge: number;
}) => {
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [isCreateOrderModalVisible, setIsCreateOrderModalVisible] =
    useState(false);

  const [
    isSendDeliveryRequestModalVisible,
    setIsSendDeliveryRequestModalVisible,
  ] = useState(false);

  const [isCancelModalVisible, setIsCancelModalVisible] = React.useState(false);

  const [
    isDeclineOrderRequestModalVisible,
    setIsDeclineOrderRequestModalVisible,
  ] = React.useState(false);

  const [isExtenstionRequestModalVisible, setIsExtenstionRequestModalVisible] =
    React.useState(false);

  const [currentRecord, setCurrentRecord] = useState<IEventOrder | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showCreateOrderModal = ({ record }: { record: any }) => {
    setCurrentRecord(record);
    setIsViewModalVisible(false);
    setIsCreateOrderModalVisible(true);
  };

  const showSendDeliveryRequestModal = () => {
    setIsSendDeliveryRequestModalVisible(true);
  };
  const showCancelModal = (record: IEventOrder) => {
    setIsCancelModalVisible(true);
    setCurrentRecord(record);
  };

  const showDeclineModal = (record: IEventOrder) => {
    setIsDeclineOrderRequestModalVisible(true);
    setCurrentRecord(record);
  };

  const showExtenstionRequestModal = (record: IEventOrder) => {
    setIsExtenstionRequestModalVisible(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
    setIsCreateOrderModalVisible(false);
  };

  const handleCancelOrder = async (values: any, data: IEventOrder) => {
    const res = await tryCatchWrapper(
      cancelEventOrder,
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

  const handleDeclineOrder = async (values: any, data: IEventOrder) => {
    const res = await tryCatchWrapper(
      declineEventOrder,
      {
        body: { ...values, status: "declined" },
        params: data?._id,
      },
      {
        toastLoadingMessage: "Sending request...",
        toastSuccessMessage: "Request Sent Successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      setIsDeclineOrderRequestModalVisible(false);
      handleCancel();
    }
  };
  const handleExtenstion = async (
    values: any,
    data: IEventOrder,
    form: any
  ) => {
    const res = await tryCatchWrapper(
      sendExtensionRequest,
      {
        body: { ...values },
        params: data?._id,
      },
      {
        toastLoadingMessage: "Sending request... ",
        toastSuccessMessage: "Request Sent Successfully! ",
        toastErrorMessage: "Something went wrong! Please try again. ",
      }
    );

    if (res?.success) {
      setIsExtenstionRequestModalVisible(false);
      handleCancel();
      form.resetFields();
    }
  };

  return (
    <div>
      <div className=" rounded-xl px-4 mt-16">
        <div className=" w-full rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5 text-secondary-color">
              Pending Event Orders
            </h1>
          </div>
        </div>

        <ProfessionalEventOrderTable
          data={myEventData}
          loading={false}
          showViewModal={showViewUserModal}
          page={1}
          total={totalData}
          limit={limit}
          activeTab={"pending"}
        />
        <ProfessionalEventViewModal
          showCancelAcceptModal={() => { }}
          showCreateOrderModal={showCreateOrderModal}
          showCancelModal={showCancelModal}
          showDeclineModal={showDeclineModal}
          showExtenstionRequestModal={showExtenstionRequestModal}
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          showSendDeliveryRequestModal={showSendDeliveryRequestModal}
          currentRecord={currentRecord}
          activeTab={"pending"}
        />
        <EventCreateOrderModal
          isViewModalVisible={isCreateOrderModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          serviceCharge={serviceCharge}
          minServiceCharge={minServiceCharge}
        />
        <SendDeliveryRequestModal
          isSendDeliveryRequestModalVisible={isSendDeliveryRequestModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          setIsSendDeliveryRequestModalVisible={
            setIsSendDeliveryRequestModalVisible
          }
        />
        <CancleOrderModal
          isCancleOrderModalVisible={isCancelModalVisible}
          handleCancel={() => setIsCancelModalVisible(false)}
          currentRecord={currentRecord}
          handleCancelOrder={handleCancelOrder}
        />

        <DeclineOrderRequestModal
          isDeclineOrderRequestModalVisible={isDeclineOrderRequestModalVisible}
          handleCancel={() => setIsDeclineOrderRequestModalVisible(false)}
          currentRecord={currentRecord}
          handleDeclineOrder={handleDeclineOrder}
        />
        <ExtenstionRequestModal
          isExtenstionRequestModalVisible={isExtenstionRequestModalVisible}
          handleCancel={() => setIsExtenstionRequestModalVisible(false)}
          currentRecord={currentRecord}
          handleExtenstion={handleExtenstion}
        />
      </div>
    </div>
  );
};

export default PendingEventOrdersPage;
