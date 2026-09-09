"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkshopParticipants } from "@/types";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReuseTable from "@/utils/ReuseTable";
import InvoiceWorkshopFromClientSide from "@/utils/InvoiceWorkshopFromClientSide";
import InvoiceWorkshopFromAdminSide from "@/utils/InvoiceWorkshopFromAdminSide";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { Modal } from "antd";
import { toast } from "sonner";
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
  const handleInvoiceDownload = async (
    invoiceElement: React.ReactElement<any>,
    filename: string
  ) => {
    const toastId = toast.loading("Sťahuje sa...", { duration: 3000 });
    try {
      const blob = await pdf(invoiceElement).toBlob();
      saveAs(blob, filename);
      toast.success("Úspešne stiahnuté!", { id: toastId });
    } catch {
      toast.error("Sťahovanie zlyhalo", { id: toastId });
    }
  };

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
            onClick={() =>
              handleInvoiceDownload(
                <InvoiceWorkshopFromClientSide
                  record={record}
                  professional={record.instructorId}
                />,
                `${record.orderId}-client-invoice.pdf`
              )
            }
          >
            {/* Client */}
            Klient
          </ReuseButton>
          <ReuseButton
            variant="secondary"
            className="!text-xs !py-1 !px-2 !h-auto"
            onClick={() =>
              handleInvoiceDownload(
                <InvoiceWorkshopFromAdminSide
                  record={record}
                  professional={record.instructorId}
                />,
                `${record.orderId}-admin-invoice.pdf`
              )
            }
          >
            {/* Admin */}
            Admin
          </ReuseButton>
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
