/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseButton from "@/components/ui/Button/ReuseButton";
import { Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { AllImages } from "../../../../../public/assets/AllImages";
import { IEventOrder } from "@/types";
import { getServerUrl } from "@/helpers/config/envConfig";
import { formatDate, formetTime } from "@/utils/dateFormet";
import { acceptDirectOrder } from "@/services/EventOrderService/EventOrderServiceApi";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { budgetLabels, eventOrderStatus } from "@/utils/budgetLabels";
import InvoiceDocumentFromClientSide from "@/utils/InvoiceDocumentFromClientSide";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import InvoiceDocumentFromAdminSide from "@/utils/InvoiceDocumentFromAdminSide";
import { useGetUserData } from "@/context/useGetUserData";
import Link from "next/link";
import CreateConversionButton from "@/components/Professional/CreateConversionButton";

interface ProfessionalEventViewModalProps {
  showCreateOrderModal: ({ record }: { record: IEventOrder | null }) => void;
  showDeclineModal: (record: any) => void;
  showExtenstionRequestModal: (record: any) => void;
  showCancelAcceptModal: (record: any) => void;
  showCancelModal?: any;
  showSendDeliveryRequestModal?: any;
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IEventOrder | null;
  activeTab: string; // Optional prop for active tab
}
const ProfessionalEventViewModal: React.FC<ProfessionalEventViewModalProps> = ({
  showCreateOrderModal,
  showDeclineModal,
  showExtenstionRequestModal,
  showCancelAcceptModal,
  showCancelModal,
  showSendDeliveryRequestModal,
  isViewModalVisible,
  handleCancel,
  currentRecord,
  activeTab, // Default to "pending" if not provided
}) => {
  const serverUrl = getServerUrl();
  const user = useGetUserData();
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  console.log(currentRecord?.date)
  console.log(formatDate(currentRecord?.date))

  const extensionLength = currentRecord?.extensionRequests?.length || 0;

  const handleDirectAccept = async (record: IEventOrder) => {
    const res = await tryCatchWrapper(
      acceptDirectOrder,
      {
        params: record?._id,
      },
      {
        toastLoadingMessage: "Accepting Order...",
        toastSuccessMessage: "Order accepted successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      handleCancel();
    }
  };

  const handleClientInvoiceDownload = (currentRecord: IEventOrder) => {
    const toastId = toast.loading(/* "Downloading..." */ "Sťahuje sa...", {
      duration: 2000,
    });
    // Generate the PDF using @react-pdf/renderer's pdf function
    pdf(
      <InvoiceDocumentFromClientSide
        currentRecord={currentRecord as IEventOrder}
      />
    )
      .toBlob()
      .then((blob: any) => {
        // Use file-saver to trigger the download
        saveAs(blob, `${currentRecord.orderId}-invoice.pdf`);
        toast.success(/* "Downloaded successfully!" */ "Úspešne stiahnuté!", { id: toastId });
      })
      .catch((error: any) => {
        console.log(error)
        toast.error(/* "Download failed" */ "Sťahovanie zlyhalo", { id: toastId });
      });
  };
  const handleProfessionalInvoiceDownload = (currentRecord: IEventOrder) => {
    const toastId = toast.loading(/* "Downloading..." */ "Sťahuje sa...", {
      duration: 2000,
    });
    // Generate the PDF using @react-pdf/renderer's pdf function
    pdf(
      <InvoiceDocumentFromAdminSide
        currentRecord={currentRecord as IEventOrder}
      />
    )
      .toBlob()
      .then((blob: any) => {
        // Use file-saver to trigger the download
        saveAs(blob, `${currentRecord.orderId}-invoice.pdf`);
        toast.success(/* "Downloaded successfully!" */ "Úspešne stiahnuté!", { id: toastId });
      })
      .catch((error: any) => {
        console.log(error)
        toast.error(/* "Download failed" */ "Sťahovanie zlyhalo", { id: toastId });
      });
  };


  const serviceFeeAmount: number = Number((currentRecord as any)?.priceWithServiceFee) - Number((currentRecord as any)?.price)
  const couponDiscountAmount: number = currentRecord?.couponDiscount || 0
  const effectiveTotalPrice: number = (currentRecord?.totalPrice || 0) - couponDiscountAmount

  console.log(currentRecord)
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-2 text-[#1a1a1a] max-h-[85vh] overflow-y-auto my-10">
        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-1">
          {/* Order Details */}
          Detaily objednávky
        </h3>
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold mb-5">
          {currentRecord?.orderId}
        </p>
        {/* Title & Category */}
        <div className="mb-3">
          <div className="flex items-center gap-x-2">
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
              {currentRecord?.packageId?.title || currentRecord?.title}
            </p>
            <p className={`text-sm sm:text-sm font-bold border w-fit rounded-2xl py-0.5 px-2 mt-1 ${currentRecord?.orderType === "custom" ? "text-secondary-color" : "border-base-color text-base-color"}`}>
              {/* {currentRecord?.orderType === "custom" ? "Custom" : "Direct"} */}
              {currentRecord?.orderType === "custom" ? "Formulár" : "Balík"}
            </p>
          </div>

          <p className="text-sm sm:text-base lg:text-kg xl:text-xl font-medium">
            {/* {currentRecord?.serviceType === "both" ? "Photography & Videography" : ...} */}
            {currentRecord?.serviceType === "both" ? "Fotografia a video" : currentRecord?.serviceType}
          </p>
          <p className="text-sm sm:text-sm lg:text-base xl:text-lg font-medium mt-2">
            By <Link className="text-secondary-color!" href={`/professionals/${currentRecord?.serviceProviderId?._id}`}>{currentRecord?.serviceProviderId?.companyName || currentRecord?.serviceProviderId?.name}</Link>
          </p>
          {(() => {
            const desc = currentRecord?.description || currentRecord?.packageId?.description;
            const LIMIT = 150;
            if (!desc) return null;
            return (
              <div className="mt-2">
                <p className="text-sm sm:text-sm lg:text-base text-base-color/80">
                  {descriptionExpanded || desc.length <= LIMIT ? desc : `${desc.slice(0, LIMIT)}...`}
                </p>
                {desc.length > LIMIT && (
                  <button
                    onClick={() => setDescriptionExpanded((prev) => !prev)}
                    className="text-secondary-color text-sm font-semibold mt-1 hover:underline"
                  >
                    {/* {descriptionExpanded ? "Show less" : "Show more"} */}
                    {descriptionExpanded ? "Zobraziť menej" : "Zobraziť viac"}
                  </button>
                )}
              </div>
            );
          })()}
        </div>

        {/* Client Info */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            Client Information
          </h4>
          <div className="flex flex-col gap-1 my-2 ">
            <Image
              src={
                currentRecord?.userId?.profileImage
                  ? serverUrl + currentRecord?.userId?.profileImage
                  : AllImages.dummyProfile
              }
              alt="fotograf" /* photographer */
              width={50}
              height={50}
              className="rounded-full object-cover size-7"
            />
            <div>
              <p className="font-bold text-lg">
                {currentRecord?.companyName ||
                  currentRecord?.name ||
                  currentRecord?.userId?.name}
              </p>
              <p className="text-base font-semibold text-gray-600">
                {currentRecord?.isRegisterAsCompany ? "Company" : "Personal"}
              </p>

              {/* <p className="text-sm text-gray-600">Wedding Photographer</p> */}
            </div>
          </div>

          {/* Create a chat with the client and open the message page filtered by their name */}
          <CreateConversionButton
            userId={currentRecord?.userId?._id}
            // Search the message list by the client's account name (conversations are
            // keyed on the registered user's `name`, not the order's company/contact name).
            name={currentRecord?.userId?.name}
            className="!w-fit"
          />
          {/* {currentRecord?.userId?.email ? (
            <p className="text-sm font-semibold">
              Email :{" "}
              <span className="text-secondary-color">{currentRecord?.userId?.email}</span>
            </p>
          ) : null} */}
          {/* {currentRecord?.streetAddress ? (
            <p className="text-sm font-semibold">
              Street Address :{" "}
              <span className="text-secondary-color">{currentRecord?.streetAddress}</span>
            </p>
          ) : null}
          {currentRecord?.town ? (
            <p className="text-sm font-semibold">
              Town :{" "}
              <span className="text-secondary-color">{currentRecord?.town}</span>
            </p>
          ) : null}
          {currentRecord?.zipCode ? (
            <p className="text-sm font-semibold">
              ZIP Code :{" "}
              <span className="text-secondary-color">{currentRecord?.zipCode}</span>
            </p>
          ) : null}
          {currentRecord?.country ? (
            <p className="text-sm font-semibold">
              Country :{" "}
              <span className="text-secondary-color">{currentRecord?.country}</span>
            </p>
          ) : null} */}
          {/* {currentRecord?.ICO ? (
            <p className="text-sm font-semibold">
              ICO :{" "}
              <span className="text-secondary-color">{currentRecord?.ICO}</span>
            </p>
          ) : null}
          {currentRecord?.IC_DPH ? (
            <p className="text-sm font-semibold">
              IC_DPH :{" "}
              <span className="text-secondary-color">
                {currentRecord?.IC_DPH}
              </span>
            </p>
          ) : null}
          {currentRecord?.DIC ? (
            <p className="text-sm font-semibold">
              DIC :{" "}
              <span className="text-secondary-color">{currentRecord?.DIC}</span>
            </p>
          ) : null} */}
        </div>

        {/* Order Info */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            {/* Order Information */}
            Informácie o objednávke
          </h4>
          <div className="mt-2">
            {" "}
            <p className="text-sm sm:text-sm lg:text-base">
              <span className="font-semibold">{/* Order Date : */}Dátum objednávky:</span>{" "}
              {`${formatDate(currentRecord?.createdAt)} - ${formetTime(
                currentRecord?.createdAt
              )}`}
            </p>
            {currentRecord?.status !== "pending" && (
              <p className="text-sm sm:text-sm lg:text-base">
                <span className="font-semibold">{/* Delivery Date : */}Dátum doručenia:</span>{" "}
                {`${formatDate(currentRecord?.deliveryDate)}`}
              </p>
            )}
            <p className="text-sm sm:text-sm lg:text-base mt-1">
              <span className="font-semibold">{/* Status : */}Stav:</span>{" "}
              <span className="capitalize font-semibold text-secondary-color">
                {eventOrderStatus[currentRecord?.status as string] || currentRecord?.status}
              </span>
            </p>
            {activeTab === "inProgress" && (
              <p className="text-sm sm:text-sm lg:text-base mt-1">
                <span className="font-semibold">Extension Status :</span>{" "}
                <span className="font-semibold capitalize">
                  {(currentRecord?.extensionRequests?.length ?? 0) < 1
                    ? "Request Not Sent"
                    : currentRecord?.extensionRequests?.[extensionLength - 1]?.status === "pending"
                      ? "Request On Pending"
                      : currentRecord?.extensionRequests?.[extensionLength - 1]?.status === "accepted"
                        ? "Request Approved"
                        : "Request Declined"}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold mb-2">
            {/* Event Details */}
            Detaily podujatia
          </h4>
          <p className="text-sm sm:text-sm lg:text-base mt-1 flex items-center gap-2 mb-2">
            <FaCalendarAlt className="shrink-0" /> <span>{/* Event Date : */}Dátum podujatia: </span>
            {formatDate(currentRecord?.date)}
          </p>
          <div className="text-sm sm:text-sm lg:text-base flex items-start gap-2 mb-2">
            <div className="flex items-center gap-2 text-nowrap">
              <FaMapMarkerAlt className="shrink-0" /> <span>{/* Location : */}Miesto: </span>
            </div>
            {currentRecord?.location}
          </div>
          <p className="text-sm sm:text-sm lg:text-base flex items-center gap-2 mb-2">
            <FaClock className="shrink-0" /> <span>{/* Time : */}Čas: </span>
            {formetTime(currentRecord?.time)}
          </p>
        </div>

        {/* Payment Details */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            {/* Payment Details */}
            Detaily platby
          </h4>

          {
            currentRecord?.totalPrice && (
              <>
                <p className="text-sm sm:text-sm lg:text-base xl:text-lg mt-2">
                  <span className="font-semibold">
                    {/* Amount Without Service Fee: */}
                    Suma bez servisného poplatku:
                  </span>{" "}
                  {Number(currentRecord?.totalPrice?.toFixed(2)) - Number(serviceFeeAmount?.toFixed(2))}€
                </p>
                <p className="text-sm sm:text-sm lg:text-base xl:text-lg mt-2">
                  <span className="font-semibold">
                    Service Fee Amount:
                  </span>{" "}
                  {serviceFeeAmount?.toFixed(2)}€
                </p>
                {couponDiscountAmount > 0 && (
                  <p className="text-sm sm:text-sm lg:text-base xl:text-lg mt-2">
                    <span className="font-semibold">
                      Coupon Discount ({currentRecord?.couponCode} - {couponDiscountAmount}):
                    </span>{" "}
                    <span className="text-red-600">-{couponDiscountAmount.toFixed(2)}€</span>
                  </p>
                )}
              </>
            )
          }
          {/* {currentRecord?.vatAmount ? (
            <p className="text-sm sm:text-sm lg:text-base xl:text-lg mt-2">
              <span className="font-semibold">VAT Amount :</span>{" "}
              {currentRecord?.vatAmount?.toFixed(2)}€
            </p>
          ) : null} */}
          <p className="text-sm sm:text-sm lg:text-base xl:text-lg mt-2">
            <span className="font-semibold">
              {/* {currentRecord?.totalPrice ? "Total Amount" : "Budget Range"} : */}
              {currentRecord?.totalPrice ? "Celková suma" : "Rozsah rozpočtu"} :
            </span>{" "}
            {currentRecord?.totalPrice
              ? effectiveTotalPrice.toFixed(2)
              : budgetLabels[currentRecord?.budget_range as string] ||
              currentRecord?.budget_range}€
          </p>
          {/* {currentRecord?.paymentStatus ? (
            <p className="text-sm sm:text-sm lg:text-base xl:text-lg mt-2">
              <span className="font-semibold">Payment Status :</span>{" "}
              <span className="capitalize font-semibold text-secondary-color">
                {currentRecord?.paymentStatus}
              </span>
            </p>
          ) : null} */}
        </div>

        {(activeTab === "cancelled" || activeTab === "cancelRequest") && (
          <div className="mb-4">
            <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
              {/* Cancel Reason */}
              Dôvod zrušenia
            </h4>
            <div className="mt-2">
              <p className="text-sm sm:text-sm lg:text-base">
                <span className="font-semibold">{/* Reason : */}Dôvod:</span>{" "}
                {currentRecord?.cancelReason}
              </p>
              {activeTab === "cancelRequest" && (
                <p className="text-sm sm:text-sm lg:text-base mt-1">
                  <span className="font-semibold">{/* Canceled By : */}Zrušil/a:</span>{" "}
                  <span className="capitalize font-semibold">
                    {currentRecord?.cancelRequestedBy === user?.userId
                      ? "Me"
                      : currentRecord?.userId?.name}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
        {activeTab === "inProgress" &&
          currentRecord?.deliveryRequestDeclinedReason && (
            <div className="mb-4">
              <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
                Delivery Decline Reason
              </h4>
              <div className="mt-2">
                {" "}
                <p className="text-sm sm:text-sm lg:text-base">
                  <span className="font-semibold">{/* Reason : */}Dôvod:</span>{" "}
                  {currentRecord?.deliveryRequestDeclinedReason}
                </p>
              </div>
            </div>
          )}
        {activeTab === "delivered" ? (
          <div className="mt-5 flex flex-col items-center gap-5">
            <ReuseButton
              variant="secondary"
              className="!w-fit"
              onClick={() =>
                handleClientInvoiceDownload(currentRecord as IEventOrder)
              }
            >
              Download Invoice With Client
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              className="!w-fit"
              onClick={() =>
                handleProfessionalInvoiceDownload(currentRecord as IEventOrder)
              }
            >
              Download Invoice with Admin
            </ReuseButton>
          </div>
        ) : activeTab === "inProgress" ? (
          <div className="mt-5 flex gap-3 items-center justify-center flex-wrap">
            <ReuseButton
              onClick={() => showSendDeliveryRequestModal()}
              variant="secondary"
              className="!text-white !bg-success !border-success !w-fit"
            >
              Deliver Order
            </ReuseButton>
            <ReuseButton
              onClick={() => showCancelModal(currentRecord)}
              variant="secondary"
              className="!text-white !bg-error !border-error !w-fit"
            >
              {/* Cancel Order */}
              Zrušiť objednávku
            </ReuseButton>
            {extensionLength < 0 ||
              currentRecord?.extensionRequests?.[extensionLength - 1]?.status !==
              "pending" ? (
              <ReuseButton
                onClick={() => showExtenstionRequestModal(currentRecord)}
                variant="secondary"
                className="!text-white !bg-[#2529FF] !border-[#2529FF] !w-fit"
              >
                Request Extension
              </ReuseButton>
            ) : (
              <h4 className="text-sm sm:text-base lg:text-lg xl:text-xl text-yellow-600 font-bold">
                Extension Request On Pending
              </h4>
            )}
          </div>
        ) : activeTab === "upcoming" ? (
          <div className="mt-5 flex gap-3 items-center justify-center flex-wrap">
            <ReuseButton
              onClick={() => showCancelModal(currentRecord)}
              variant="secondary"
              className="!text-white !bg-error !border-error !w-fit"
            >
              {/* Cancel Order */}
              Zrušiť objednávku
            </ReuseButton>
          </div>
        ) : activeTab === "pending" ? (
          <div className="mt-5 flex gap-3 items-center justify-center flex-wrap">
            <ReuseButton
              onClick={() =>
                currentRecord?.orderType === "custom"
                  ? showCreateOrderModal({ record: currentRecord })
                  : handleDirectAccept(currentRecord as IEventOrder)
              }
              variant="secondary"
              className="!text-white !bg-success !border-success !w-fit"
            >
              {/* Accept */}
              Prijať
            </ReuseButton>
            <ReuseButton
              onClick={() => showDeclineModal(currentRecord)}
              variant="secondary"
              className="!text-white !bg-error !border-error !w-fit"
            >
              {/* Reject */}
              Odmietnuť
            </ReuseButton>
          </div>
        ) : activeTab === "cancelRequest" &&
          user?.userId !== currentRecord?.cancelRequestedBy ? (
          <div className="mt-5 flex gap-3 items-center justify-center flex-wrap">
            <ReuseButton
              onClick={() => showCancelAcceptModal(currentRecord)}
              variant="secondary"
              className="!text-white !bg-success !border-success !w-fit"
            >
              {/* Accept */}
              Prijať
            </ReuseButton>
            <ReuseButton
              onClick={() => showDeclineModal(currentRecord)}
              variant="secondary"
              className="!text-white !bg-error !border-error !w-fit"
            >
              {/* Reject */}
              Odmietnuť
            </ReuseButton>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default ProfessionalEventViewModal;
