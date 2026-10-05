"use client";
import { IWorkshopParticipants } from "@/types";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReuseTable from "@/utils/ReuseTable";
import { buildWorkshopInvoices, isWorkshopCompleted } from "@/utils/invoice/workshopInvoices";
import { creatorFinalInvoice, creatorPaymentInvoice } from "@/utils/invoice/assembleInvoices";
import { downloadInvoices } from "@/utils/invoice/downloadInvoices";
import { Modal } from "antd";
import React from "react";

const ProfessionalViewParticipentModal = ({
  isViewModalVisible,
  handleCancel,
  participantsData,
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  participantsData: IWorkshopParticipants[] | undefined;
}) => {
  // The instructor only gets their own (instructor -> participant) invoices, one button each:
  // the payment one, and the final one once the workshop has taken place.
  const handlePaymentInvoiceDownload = (record: IWorkshopParticipants) =>
    downloadInvoices(
      creatorPaymentInvoice(buildWorkshopInvoices(record, record.instructorId)),
      `${record.orderId}-faktura-platba.pdf`
    );

  const handleFinalInvoiceDownload = (record: IWorkshopParticipants) =>
    downloadInvoices(
      creatorFinalInvoice(buildWorkshopInvoices(record, record.instructorId)),
      `${record.orderId}-faktura-konecna.pdf`
    );

  console.log("participantsData", participantsData);

  const columns = [
    {
      title: "ID objednávky",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Meno klienta",
      key: "name",
      render: (record: IWorkshopParticipants) => record.companyName || record.name,
    },
    {
      title: "E-mail",
      dataIndex: ["clientId", "email"],
      key: "email",
    },
    // {
    //   title: "Ulica",
    //   dataIndex: "streetAddress",
    //   key: "streetAddress",
    // },
    // {
    //   title: "Mesto",
    //   dataIndex: "town",
    //   key: "town",
    // },
    // {
    //   title: "Krajina",
    //   dataIndex: "country",
    //   key: "country",
    // },
    {
      title: "Faktúra",
      key: "invoice",
      render: (record: IWorkshopParticipants) => (
        <div className="flex flex-col gap-1">
          <ReuseButton
            variant="secondary"
            className="!text-xs !py-1 !px-2 !h-auto"
            onClick={() => handlePaymentInvoiceDownload(record)}
          >
            {/* Download payment invoice */}
            Faktúra (platba)
          </ReuseButton>
          {isWorkshopCompleted(record) && (
            <ReuseButton
              variant="secondary"
              className="!text-xs !py-1 !px-2 !h-auto"
              onClick={() => handleFinalInvoiceDownload(record)}
            >
              {/* Download final settlement invoice */}
              Konečná faktúra
            </ReuseButton>
          )}
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[1100px]"
    >
      {/* <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2">
        Participants
      </h3> */}
      <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2">
        Účastníci
      </h3>
      <div className="mt-10">
        <ReuseTable
          columns={columns}
          data={participantsData === undefined ? [] : participantsData}
          loading={participantsData === undefined ? true : false}
          keyValue={"orderId"}
        />
      </div>
    </Modal>
  );
};

export default ProfessionalViewParticipentModal;
