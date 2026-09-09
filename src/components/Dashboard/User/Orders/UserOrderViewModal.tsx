/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import { AllImages } from "../../../../../public/assets/AllImages";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import { IEventOrder } from "@/types";
import { formatDate, formetTime } from "@/utils/dateFormet";
import { budgetLabels } from "@/utils/budgetLabels";
import { getServerUrl } from "@/helpers/config/envConfig";
import InvoiceDocumentFromClientSide from "@/utils/InvoiceDocumentFromClientSide";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { toast } from "sonner";
import Link from "next/link";
import CreateConversionButton from "@/components/Professional/CreateConversionButton";

interface UserOrderViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IEventOrder | null;
  activeModal: string;
  showCancelModal?: any;
}

const UserOrderViewModal: React.FC<UserOrderViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  activeModal,
  showCancelModal,
}) => {
  const serverUrl = getServerUrl();
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const serviceFeeAmount: number = Number((currentRecord as any)?.priceWithServiceFee) - Number((currentRecord as any)?.price)
  const couponDiscountAmount: number = (currentRecord as any)?.couponDiscount || 0
  const effectiveTotalPrice: number = (currentRecord?.totalPrice || 0) - couponDiscountAmount

  const handleDownload = (currentRecord: IEventOrder) => {
    const toastId = toast.loading("Sťahuje sa...", {
      duration: 2000,
    });
    pdf(
      <InvoiceDocumentFromClientSide
        currentRecord={currentRecord as IEventOrder}
      />
    )
      .toBlob()
      .then((blob: any) => {
        saveAs(blob, `${currentRecord.orderId}-invoice.pdf`);
        toast.success("Úspešne stiahnuté!", { id: toastId });
      })
      .catch((error: any) => {
        toast.error("Sťahovanie zlyhalo", { id: toastId });
        console.log(error)
      });
  };

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      closeIcon={<MdClose className="text-secondary-color text-xl" />}
      className="lg:!w-[600px] "
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
            {/* {currentRecord?.serviceType === "both" ? "Photography & Videography" : currentRecord?.serviceType} */}
            {currentRecord?.serviceType === "both" ? "Fotografia a Video" : currentRecord?.serviceType}
          </p>
          <p className="text-sm sm:text-sm lg:text-base xl:text-lg font-medium mt-2">
            {/* By */}
            Od{" "}
            <Link href={`/professionals/${currentRecord?.serviceProviderId?._id}`} className=" text-secondary-color!">
              {currentRecord?.serviceProviderId?.companyName || currentRecord?.serviceProviderId?.name}
            </Link>
          </p>
          <p className="text-sm lg:text-sm text-gray-500 mt-1 flex items-center gap-2">
            <FaCalendarAlt className="shrink-0" /> {formatDate(currentRecord?.date)}
          </p>
          <p className="text-sm lg:text-sm text-gray-500 mt-1 flex items-center gap-2">
            <FaClock className="shrink-0" /> {formetTime(currentRecord?.time)}
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

        {/* Order Info */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            {/* Order Information */}
            Informácie o objednávke
          </h4>
          <div className="mt-2">
            <p className="text-sm sm:text-sm lg:text-base">
              {/* <span className="font-semibold">Order Date :</span> */}
              <span className="font-semibold">Dátum objednávky:</span>{" "}
              {formatDate(currentRecord?.statusTimestamps?.createdAt)} -{" "}
              {formetTime(currentRecord?.statusTimestamps?.createdAt)}
            </p>
            <p className="text-sm sm:text-sm lg:text-base">
              {/* <span className="font-semibold">Event Date :</span> */}
              <span className="font-semibold">Dátum podujatia:</span>{" "}
              {formatDate(currentRecord?.date)}
            </p>
            {currentRecord?.status !== "cancelled" && (
              <p className="text-sm sm:text-sm lg:text-base">
                {/* <span className="font-semibold">Expected Delivery Date :</span> */}
                <span className="font-semibold">Očakávaný dátum doručenia:</span>{" "}
                {formatDate(currentRecord?.deliveryDate)}
              </p>
            )}

            {currentRecord?.duration && (
              <p className="text-sm sm:text-sm lg:text-base mt-1">
                {/* <span className="font-semibold">Duration :</span> */}
                <span className="font-semibold">Trvanie:</span>{" "}
                <span className="capitalize">{currentRecord?.duration}</span>
              </p>
            )}
            <p className="text-sm sm:text-sm lg:text-base mt-1">
              {/* <span className="font-semibold">Status :</span> */}
              <span className="font-semibold">Stav:</span>{" "}
              <span className="capitalize font-semibold text-secondary-color">
                {currentRecord?.status}
              </span>
            </p>
          </div>
        </div>

        {/* Professional Info */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            {/* Professional Information */}
            Informácie o tvorcovi
          </h4>
          <Link href={`/professionals/${currentRecord?.serviceProviderId?._id}`} className=" text-secondary-color!">
            <div className="flex items-center gap-1 mt-2">
              <Image
                src={
                  currentRecord?.serviceProviderId?.profileImage
                    ? serverUrl + currentRecord?.serviceProviderId?.profileImage
                    : AllImages.dummyProfile
                }
                // {/* alt="photographer" */}
                alt="fotograf"
                width={50}
                height={50}
                className="rounded-full h-7 w-7 object-cover border border-secondary-color"
              />
              <div>
                <p className="font-bold text-base">
                  {currentRecord?.serviceProviderId?.name}
                </p>
              </div>
            </div>
          </Link>

          {/* Create a chat with the creator and open the message page filtered by their name */}
          <div className="mt-2">
            <CreateConversionButton
              userId={currentRecord?.serviceProviderId?._id}
              // Search the message list by the person's account name (conversations are
              // keyed on `name`, not companyName — which may include a role suffix).
              name={currentRecord?.serviceProviderId?.name}
              className="!w-fit"
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold mb-2">
            {/* Event Details */}
            Detaily podujatia
          </h4>
          <div className="text-sm sm:text-sm lg:text-base flex items-start gap-2 mb-2">
            <div className="flex items-center gap-2 text-nowrap">
              <FaMapMarkerAlt className="shrink-0" />
              {/* <span>Location : </span> */}
              <span>Lokalita: </span>
            </div>
            {currentRecord?.location}
          </div>
          <p className="text-sm sm:text-sm lg:text-base flex items-center gap-2 mb-2">
            <FaCalendarAlt className="shrink-0" />
            {/* <span>Date : </span> */}
            <span>Dátum: </span>
            {formatDate(currentRecord?.date)}
          </p>
          <p className="text-sm sm:text-sm lg:text-base flex items-center gap-2 mb-2">
            <FaClock className="shrink-0" />
            {/* <span>Time : </span> */}
            <span>Čas: </span>
            {formetTime(currentRecord?.time)}
          </p>
        </div>

        {/* Payment Details */}
        <div className="mb-4">
          <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
            {/* Payment Details */}
            Detaily platby
          </h4>
          {currentRecord?.totalPrice && (
            <>
              <p className="text-sm sm:text-sm lg:text-base xl:text-lg mt-2">
                {/* <span className="font-semibold">Amount Without Service Fee:</span> */}
                <span className="font-semibold">Suma bez servisného poplatku:</span>{" "}
                {(currentRecord.totalPrice - serviceFeeAmount).toFixed(2)}€
              </p>
            </>
          )}
          <p className="text-sm sm:text-sm lg:text-base xl:text-lg mt-2">
            <span className="font-semibold">
              {/* {currentRecord?.totalPrice ? "Total Amount" : "Budget Range"}: */}
              {/* {currentRecord?.totalPrice ? "Celková suma" : "Rozsah rozpočtu"}: */}
              {currentRecord?.totalPrice ? "Celková suma" : "Rozsah rozpočtu"}
            </span>
            :{" "}
            {currentRecord?.totalPrice
              ? effectiveTotalPrice.toFixed(2)
              : budgetLabels[currentRecord?.budget_range as string] ||
              currentRecord?.budget_range}€
          </p>
        </div>

        {activeModal === "cancelled" && (
          <div className="mb-4">
            <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-secondary-color font-bold">
              {/* Cancel Reason */}
              Dôvod zrušenia
            </h4>
            <div className="mt-2">
              <p className="text-sm sm:text-sm lg:text-base">
                {/* <span className="font-semibold">Reason :</span> */}
                <span className="font-semibold">Dôvod:</span>{" "}
                {currentRecord?.cancelReason}
              </p>
            </div>
          </div>
        )}

        <div className="mt-5">
          {activeModal === "currentOrder" ? (
            <ReuseButton
              onClick={() => showCancelModal(currentRecord)}
              variant="secondary"
            >
              {/* Cancle Order */}
              Zrušiť objednávku
            </ReuseButton>
          ) : activeModal === "toConfirm" ? (
            <ReuseButton
              onClick={() => showCancelModal(currentRecord)}
              variant="secondary"
            >
              {/* Decline Delivery Request */}
              Zamietnuť žiadosť o doručenie
            </ReuseButton>
          ) : activeModal === "accepted" ? (
            <ReuseButton
              onClick={() => showCancelModal(currentRecord)}
              variant="secondary"
            >
              {/* Cancle Order */}
              Zrušiť objednávku
            </ReuseButton>
          ) : activeModal === "orderOffer" ? (
            <ReuseButton
              variant="secondary"
              onClick={() => showCancelModal(currentRecord)}
            >
              {/* Cancle Order */}
              Zrušiť objednávku
            </ReuseButton>
          ) : activeModal === "delivered" ? (
            <ReuseButton
              variant="secondary"
              onClick={() => handleDownload(currentRecord as IEventOrder)}
            >
              {/* Download Invoice */}
              Stiahnuť faktúru
            </ReuseButton>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default UserOrderViewModal;