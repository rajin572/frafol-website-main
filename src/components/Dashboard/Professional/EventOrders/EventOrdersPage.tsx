/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProfessionalEventOrderTable from "@/components/ui/Table/ProfessionalEventOrderTable";
import React, { useState } from "react";
import ProfessionalEventViewModal from "./ProfessionalEventViewModal";
import EventOrdersOverview from "./EventOrdersOverview";
import ReusableTabs from "@/components/ui/ReusableTabs";
import EventCreateOrderModal from "./EventCreateOrderModal";
import { IEventOrder } from "@/types";
import SendDeliveryRequestModal from "@/components/ui/Modal/Event/SendDeliveryRequestModal";
import CancleOrderModal from "@/components/ui/Modal/CancleOrderModal";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import {
  acceptCancelRequest,
  cancelEventOrder,
  declineCancelRequest,
  declineEventOrder,
  sendExtensionRequest,
} from "@/services/EventOrderService/EventOrderServiceApi";
import DeclineOrderRequestModal from "@/components/ui/Modal/DeclineOrderRequestModal";
import ExtenstionRequestModal from "@/components/ui/Modal/ExtenstionRequestModal";
import AcceptModal from "@/components/ui/Modal/AcceptModal";
import DeleteModal from "@/components/ui/Modal/DeleteModal";

const EventOrdersPage = ({
  states,
  activeTab,
  myEventData,
  totalData,
  page,
  serviceCharge,
  minServiceCharge
}: {
  states: {
    totalCompletedEvents: number;
    totalInProgressEvents: number;
    totalUpcomingEvents: number;
    totalPendingEvents: number;
  };
  activeTab:
  | "delivered"
  | "inProgress"
  | "upcoming"
  | "pending"
  | "accepted"
  | "cancelRequest"
  | "cancelled";
  myEventData: IEventOrder[];
  totalData: number;
  page: number;
  serviceCharge: number;
  minServiceCharge: number
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

  const [isAcceptModalVisible, setIsAcceptModalVisible] = React.useState(false);

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

  const showCancelAcceptModal = (record: IEventOrder) => {
    setIsAcceptModalVisible(true);
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
        toastLoadingMessage: "Sending request... ",
        toastSuccessMessage: "Request Sent Successfully! ",
        toastErrorMessage: "Something went wrong! Please try again. ",
      }
    );

    if (res?.success) {
      setIsCancelModalVisible(false);
      handleCancel();
    }
  };
  const handleAcceptCancel = async (data: IEventOrder) => {
    const res = await tryCatchWrapper(
      acceptCancelRequest,
      { params: data?._id },
      {
        toastLoadingMessage: "Cancelling... ",
        toastSuccessMessage: "Cancelled Successfully! ",
        toastErrorMessage: "Something went wrong! Please try again. ",
      }
    );

    if (res?.success) {
      setIsAcceptModalVisible(false);
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
  const handleRejectCancelOrder = async (data: IEventOrder) => {
    const res = await tryCatchWrapper(
      declineCancelRequest,
      {
        params: data?._id,
      },
      {
        toastLoadingMessage: "Rejecting... ",
        toastSuccessMessage: "Rejected Successfully! ",
        toastErrorMessage: "Something went wrong! Please try again. ",
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
      <div className=" min-h-[80vh] rounded-xl px-4">
        <div className=" w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
              Event Orders
            </h1> */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
              Foto/video objednávky
            </h1>
          </div>
        </div>
        <EventOrdersOverview states={states} />
        <div className="mt-10">
          <ReusableTabs
            activeTab={activeTab}
            align="left"
            tabs={[
              {
                label: "Čakajúca žiadosť",
                value: "pending",
                content: (
                  <ProfessionalEventOrderTable
                    data={myEventData}
                    loading={false}
                    showViewModal={showViewUserModal}
                    page={page}
                    total={totalData}
                    limit={limit}
                    activeTab={activeTab}
                  />
                ),
              },
              {
                label: "Čaká sa na platbu",
                value: "accepted",
                content: (
                  <ProfessionalEventOrderTable
                    data={myEventData}
                    loading={false}
                    showViewModal={showViewUserModal}
                    page={page}
                    total={totalData}
                    limit={limit}
                    activeTab={activeTab}
                  />
                ),
              },
              {
                label: "Nadchádzajúce objednávky",
                value: "upcoming",
                content: (
                  <ProfessionalEventOrderTable
                    data={myEventData}
                    loading={false}
                    showViewModal={showViewUserModal}
                    page={page}
                    total={totalData}
                    limit={limit}
                    activeTab={activeTab}
                  />
                ),
              },
              {
                label: "Prebieha",
                value: "inProgress",
                content: (
                  <ProfessionalEventOrderTable
                    data={myEventData}
                    loading={false}
                    showViewModal={showViewUserModal}
                    page={page}
                    total={totalData}
                    limit={limit}
                    activeTab={activeTab}
                  />
                ),
              },
              {
                label: "Doručené",
                value: "delivered",
                content: (
                  <ProfessionalEventOrderTable
                    data={myEventData}
                    loading={false}
                    showViewModal={showViewUserModal}
                    page={page}
                    total={totalData}
                    limit={limit}
                    activeTab={activeTab}
                  />
                ),
              },
              {
                label: "Potvrdenie zrušenia",
                value: "cancelRequest",
                content: (
                  <ProfessionalEventOrderTable
                    data={myEventData}
                    loading={false}
                    showViewModal={showViewUserModal}
                    page={page}
                    total={totalData}
                    limit={limit}
                    activeTab={activeTab}
                  />
                ),
              },
              {
                label: "Zrušené",
                value: "cancelled",
                content: (
                  <ProfessionalEventOrderTable
                    data={myEventData}
                    loading={false}
                    showViewModal={showViewUserModal}
                    page={page}
                    total={totalData}
                    limit={limit}
                    activeTab={activeTab}
                  />
                ),
              },
            ]}
            resetPage={true}
          />
        </div>
        <ProfessionalEventViewModal
          showCreateOrderModal={showCreateOrderModal}
          showCancelModal={showCancelModal}
          showDeclineModal={showDeclineModal}
          showExtenstionRequestModal={showExtenstionRequestModal}
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          showSendDeliveryRequestModal={showSendDeliveryRequestModal}
          showCancelAcceptModal={showCancelAcceptModal}
          currentRecord={currentRecord}
          activeTab={activeTab}
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
        {activeTab !== "cancelRequest" && (
          <DeclineOrderRequestModal
            isDeclineOrderRequestModalVisible={
              isDeclineOrderRequestModalVisible
            }
            handleCancel={() => setIsDeclineOrderRequestModalVisible(false)}
            currentRecord={currentRecord}
            handleDeclineOrder={handleDeclineOrder}
          />
        )}

        <ExtenstionRequestModal
          isExtenstionRequestModalVisible={isExtenstionRequestModalVisible}
          handleCancel={() => setIsExtenstionRequestModalVisible(false)}
          currentRecord={currentRecord}
          handleExtenstion={handleExtenstion}
        />
        {activeTab === "cancelRequest" && (
          <DeleteModal
            isDeleteModalVisible={isDeclineOrderRequestModalVisible}
            handleCancel={() => setIsDeclineOrderRequestModalVisible(false)}
            currentRecord={currentRecord}
            buttonText="Decline"
            handleDelete={handleRejectCancelOrder}
          />
        )}
        <AcceptModal
          isModalVisible={isAcceptModalVisible}
          handleCancel={() => setIsAcceptModalVisible(false)}
          currentRecord={currentRecord}
          handleConfirm={handleAcceptCancel}
        />
      </div>
    </div>
  );
};

export default EventOrdersPage;
