import { Modal } from "antd";

import Image from "next/image";
import { AllImages } from "../../../../../public/assets/AllImages";
import { getMediaUrl } from "@/utils/mediaUrl";
import { IGearOrder } from "@/types";
import { buildGearInvoices } from "@/utils/invoice/gearInvoices";
import { finalInvoices, paymentInvoices } from "@/utils/invoice/assembleInvoices";
import { downloadInvoices } from "@/utils/invoice/downloadInvoices";

interface UserGearViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IGearOrder | null;
  activeModal: string;
  showAcceptDeliverModal?: (record: IGearOrder) => void;
}

const UserGearViewModal: React.FC<UserGearViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  activeModal,
  showAcceptDeliverModal,
}) => {

  // Gear orders are only created once paid, so the payment invoices exist for every
  // order that is not cancelled; the final ones after the customer accepted the delivery.
  const hasPaymentInvoices = !!currentRecord && activeModal !== "cancelled";
  const hasFinalInvoices = !!currentRecord && activeModal === "delivered";

  const handleDownloadPaymentInvoices = (record: IGearOrder) =>
    downloadInvoices(
      paymentInvoices(buildGearInvoices(record)),
      `${record.orderId}-faktury-platba.pdf`
    );

  const handleDownloadFinalInvoices = (record: IGearOrder) =>
    downloadInvoices(
      finalInvoices(buildGearInvoices(record)),
      `${record.orderId}-faktury-konecne.pdf`
    );

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      className="lg:!w-[1000px]"
    >
      <div className="p-3 space-y-6">
        {/* Product Card */}
        <div className="bg-white rounded-lg border border-[#E1E1E1] p-4 grid grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-4">
            <Image
              src={
                currentRecord?.gearMarketplaceId?.gallery?.[0]
                  ? getMediaUrl(currentRecord?.gearMarketplaceId?.gallery?.[0])
                  : AllImages?.product
              }
              alt={currentRecord?.gearMarketplaceId?.name || "Product Image"}
              width={80}
              height={80}
            />
            <div>
              <h2 className="text-lg font-medium">
                {currentRecord?.gearMarketplaceId?.name || /* "Product Name" */ "Názov produktu"}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <span className=" text-sm">{/* Price */}Cena</span>
            <p className="text-xl font-semibold">
              {currentRecord?.gearMarketplaceId?.mainPrice?.toFixed(2) || 0}€
            </p>
          </div>
        </div>

        {/* Summary & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Sub Total :</span>
                <span className="text-black font-medium">
                  {currentRecord?.gearMarketplaceId?.mainPrice?.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge :</span>
                <span className="text-black font-medium">
                  {currentRecord?.gearMarketplaceId?.shippingCompany?.price?.toFixed(
                    2
                  )}
                  €
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-black">
                <span>Total :</span>
                {(
                  (currentRecord?.gearMarketplaceId?.mainPrice || 0) +
                  (currentRecord?.gearMarketplaceId?.shippingCompany?.price ||
                    0)
                ).toFixed(2)}{" "}
                €
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
            <h3 className="font-semibold mb-4">{/* Payment Details */}Detaily platby</h3>
            <div className="text-sm ">
              <p>
                <span className="font-semibold">{/* Transaction ID: */}ID transakcie:</span>{" "}
                {currentRecord?.paymentId?.transactionId || "N/A"}
              </p>
              <p>
                <span className="font-semibold">{/* Payment Method: */}Spôsob platby:</span>{" "}
                {currentRecord?.paymentId?.paymentMethod || "N/A"}
                Card
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
          <h3 className="font-semibold mb-2">Preferred Shipping Method</h3>
          <p className="text-sm ">
            {currentRecord?.gearMarketplaceId?.shippingCompany?.name} -{" "}
            {currentRecord?.gearMarketplaceId?.shippingCompany?.price?.toFixed(2)}€
          </p>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p className="text-sm ">
            {[currentRecord?.shippingAddress, currentRecord?.town, currentRecord?.postCode]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>

        {/* Delivery Note */}
        <div className="bg-white rounded-lg border border-[#E1E1E1] p-4">
          <h3 className="font-semibold mb-2">Delivery Note</h3>
          <p className="text-sm ">{currentRecord?.deliveryNote || "N/A"}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {activeModal === "toConfirm" && (
            <button
              onClick={() => showAcceptDeliverModal?.(currentRecord!)}
              className="!bg-success hover:!bg-success text-white px-4 py-2 rounded !cursor-pointer"
            >
              Accept Delivery
            </button>
          )}
        </div>
        {(hasPaymentInvoices || hasFinalInvoices) && (
          <div className="flex flex-col gap-4">
            {hasPaymentInvoices && (
              <button
                onClick={() => handleDownloadPaymentInvoices(currentRecord as IGearOrder)}
                className="!bg-secondary-color hover:!bg-secondary-color text-white px-4 py-2 rounded !cursor-pointer w-full"
              >
                {/* Download payment invoices */}
                Stiahnuť faktúry (platba)
              </button>
            )}
            {hasFinalInvoices && (
              <button
                onClick={() => handleDownloadFinalInvoices(currentRecord as IGearOrder)}
                className="!bg-secondary-color hover:!bg-secondary-color text-white px-4 py-2 rounded !cursor-pointer w-full"
              >
                {/* Download final settlement invoices */}
                Stiahnuť konečné faktúry
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserGearViewModal;
