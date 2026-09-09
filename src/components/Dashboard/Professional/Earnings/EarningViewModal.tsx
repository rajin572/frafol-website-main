"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Tag } from "antd";
import Image from "next/image";
import { getServerUrl } from "@/helpers/config/envConfig";
import { AllImages } from "../../../../../public/assets/AllImages";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import InvoiceEarningEventClientSide from "@/utils/InvoiceEarningEventClientSide";
import InvoiceEarningEventAdminSide from "@/utils/InvoiceEarningEventAdminSide";
import InvoiceGearFromClientSide from "@/utils/InvoiceGearFromClientSide";
import InvoiceGearFromAdminSide from "@/utils/InvoiceGearFromAdminSide";
import InvoiceWorkshopFromClientSide from "@/utils/InvoiceWorkshopFromClientSide";
import InvoiceWorkshopFromAdminSide from "@/utils/InvoiceWorkshopFromAdminSide";
import ReuseButton from "@/components/ui/Button/ReuseButton";

type EarningType = "event" | "gear" | "workshop";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  record: any | null;
  type: EarningType;
}

const EarningViewModal: React.FC<Props> = ({ isVisible, onClose, record, type }) => {
  const serverUrl = getServerUrl();

  console.log(record)

  if (!record) return null;

  const handleInvoiceDownload = async (invoiceElement: React.ReactElement<any>, filename: string) => {
    const toastId = toast.loading("Downloading...", { duration: 3000 });
    try {
      const blob = await pdf(invoiceElement).toBlob();
      saveAs(blob, filename);
      toast.success("Downloaded successfully!", { id: toastId });
    } catch {
      toast.error("Download failed", { id: toastId });
    }
  };

  const formatDate = (dateStr: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "—";

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "—";

  const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex items-start justify-between border-b border-[#E1E1E1] pb-2 gap-2 mb-2">
      <span className="font-semibold text-nowrap">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );

  const titles: Record<EarningType, string> = {
    event: "Event Earning Details",
    gear: "Gear Earning Details",
    workshop: "Workshop Earning Details",
  };

  // Resolve client info per type
  const client = type === "event" ? record.userId : record.clientId;
  const clientImage = client?.profileImage
    ? `${serverUrl}${client.profileImage}`
    : AllImages.dummyProfile;

  const renderEventContent = () => {
    const eventOrder = record.eventOrderId;
    return (
      <>
        <Row /* label="Event Name" */ label="Názov podujatia" value={eventOrder?.title} />
        <Row /* label="Transaction ID" */ label="ID transakcie" value={<span className="text-xs break-all">{record.transactionId}</span>} />
        <Row /* label="Payment Method" */ label="Spôsob platby" value={capitalize(record.paymentMethod)} />
        <Row
          label="Payment Status"
          value={<Tag color={record.paymentStatus === "completed" ? "green" : "orange"}>{capitalize(record.paymentStatus)}</Tag>}
        />
        <Row /* label="Service Type" */ label="Typ služby" value={capitalize(eventOrder?.serviceType)} />
        <Row
          label="Order Type"
          value={<Tag color={eventOrder?.orderType === "direct" ? "blue" : "purple"}>{capitalize(eventOrder?.orderType)}</Tag>}
        />
        <Row /* label="Event Date" */ label="Dátum" value={formatDate(eventOrder?.date)} />
        <Row label="Created At" value={formatDate(record.createdAt)} />
        <Row /* label="Total Amount" */ label="Celková suma" value={<span>{record.amount?.toFixed(2)} €</span>} />
        <Row label="Commission" value={<span className="text-red-500">- {record.commission?.toFixed(2)} €</span>} />
        {record.couponDiscount > 0 && (
          <Row label="Coupon Discount" value={<span className="text-orange-500">- {record.couponDiscount?.toFixed(2)} €</span>} />
        )}
        {record.couponCode && <Row label="Coupon Code" value={record.couponCode} />}
        <Row
          label="Net Earning"
          value={<span className="text-green-600 font-bold text-base">{record.netAmount?.toFixed(2)} €</span>}
        />
        <Row
          label="Provider Paid"
          value={
            <Tag color={record.serviceProviderPaid ? "green" : "red"}>
              {record.serviceProviderPaid ? "Paid" : "Pending"}
            </Tag>
          }
        />
        {record.serviceProviderPaid && record.serviceProviderPaidAt && (
          <Row label="Paid At" value={formatDate(record.serviceProviderPaidAt)} />
        )}
      </>
    );
  };

  const renderGearContent = () => {
    const gear = record.gearMarketplaceId;
    const shippingPrice = gear?.shippingCompany?.price || 0;
    const netEarning = gear ? gear.mainPrice - gear.platformCommission + shippingPrice : 0;

    return (
      <>
        <Row label="Order ID" value={<span className="text-xs">{record.orderId}</span>} />
        <Row label="Gear Item" value={gear?.name || "—"} />
        <Row
          label="Order Status"
          value={
            <Tag color={record.orderStatus === "delivered" ? "green" : record.orderStatus === "cancelled" ? "red" : "orange"}>
              {capitalize(record.orderStatus)}
            </Tag>
          }
        />
        <Row
          label="Payment Status"
          value={
            <Tag color={record.paymentStatus === "completed" ? "green" : "orange"}>
              {capitalize(record.paymentStatus)}
            </Tag>
          }
        />
        {gear?.vatAmount > 0 && (
          <Row label="VAT %" value={`${gear.vatAmount}%`} />
        )}
        <Row label="Selling Price" value={<span>{gear?.price?.toFixed(2)} €</span>} />
        {gear?.totalVatAmount > 0 && (
          <Row label="VAT Amount" value={<span>{gear.totalVatAmount?.toFixed(2)} €</span>} />
        )}
        <Row label="Platform Commission" value={<span className="text-red-500">- {gear?.platformCommission?.toFixed(2)} €</span>} />
        {gear?.shippingCompany?.name && (
          <Row label="Shipping Company" value={`${gear.shippingCompany.name} — ${gear.shippingCompany.price?.toFixed(2)} €`} />
        )}
        <Row
          label="Net Earning"
          value={<span className="text-green-600 font-bold text-base">{netEarning?.toFixed(2)} €</span>}
        />
        <Row label="Shipping Address" value={record.shippingAddress} />
        <Row label="Town" value={record.town} />
        <Row label="Post Code" value={record.postCode} />
        <Row label="Mobile" value={record.mobileNumber} />
        <Row label="Order Date" value={formatDate(record.createdAt)} />
        {record.statusTimestamps?.deliveredAt && (
          <Row label="Delivered At" value={formatDate(record.statusTimestamps.deliveredAt)} />
        )}
        <Row
          label="Admin Paid"
          value={<Tag color={record.adminPaid ? "green" : "red"}>{record.adminPaid ? "Paid" : "Pending"}</Tag>}
        />
        {record.adminPaid && record.adminPaidAt && (
          <Row label="Admin Paid At" value={formatDate(record.adminPaidAt)} />
        )}
      </>
    );
  };

  const renderWorkshopContent = () => {
    const workshop = record.workshopId;
    return (
      <>
        <Row label="Order ID" value={record.orderId} />
        <Row /* label="Workshop Title" */ label="Názov kurzu" value={workshop?.title} />
        <Row label="Workshop Date" value={formatDate(workshop?.date)} />
        <Row label="Workshop Price" value={<span>{workshop?.price?.toFixed(2)} €</span>} />
        {workshop?.vatAmount > 0 && (
          <Row label="VAT" value={<span>{workshop?.vatAmount?.toFixed(2)} €</span>} />
        )}
        <Row label="Total (with VAT)" value={<span>{workshop?.mainPrice?.toFixed(2)} €</span>} />
        <Row label="Commission" value={<span className="text-error">{(record.netAmount - workshop?.mainPrice)?.toFixed(2)} €</span>} />
        <Row
          label="Net Earning"
          value={<span className="text-green-600 font-bold text-base">{record.netAmount?.toFixed(2)} €</span>}
        />
        <Row
          label="Payment Status"
          value={<Tag color={record.paymentStatus === "completed" ? "green" : "orange"}>{capitalize(record.paymentStatus)}</Tag>}
        />
        <Row
          label="Instructor Payment"
          value={
            <Tag color={record.instructorPayment?.status === "received" ? "green" : "orange"}>
              {capitalize(record.instructorPayment?.status || "pending")}
            </Tag>
          }
        />
        <Row label="Joined At" value={formatDate(record.joinedAt)} />
        <Row
          label="Admin Paid"
          value={<Tag color={record.adminPaid ? "green" : "red"}>{record.adminPaid ? "Paid" : "Pending"}</Tag>}
        />
        {record.adminPaid && record.adminPaidAt && (
          <Row label="Admin Paid At" value={formatDate(record.adminPaidAt)} />
        )}
        {record.instructorPayment?.paidAt && (
          <Row label="Instructor Paid At" value={formatDate(record.instructorPayment.paidAt)} />
        )}
        <Row /* label="Location" */ label="Lokalita" value={`${record.town}, ${record.country}`} />
      </>
    );
  };

  return (
    <Modal open={isVisible} onCancel={onClose} footer={null} centered className="lg:!w-[600px]">
      <div className="p-4 text-base-color max-h-[85vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-secondary-color mb-4">{titles[type]}</h3>

        {/* Client card */}
        <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-lg">
          <Image
            src={clientImage}
            alt={client?.name || "Client"}
            width={48}
            height={48}
            className="rounded-full object-cover w-12 h-12"
          />
          <div>
            <p className="font-semibold">{client?.name}</p>
            {client?.companyName && <p className="text-sm text-gray-400">{client.companyName}</p>}
          </div>
        </div>

        <div className="text-sm sm:text-base">
          {type === "event" && renderEventContent()}
          {type === "gear" && renderGearContent()}
          {type === "workshop" && renderWorkshopContent()}
        </div>

        {/* Invoice download buttons */}
        <div className="mt-6 flex flex-col items-center gap-3">
          {type === "event" && (
            <>
              <ReuseButton
                variant="secondary"
                className="!w-fit"
                onClick={() =>
                  handleInvoiceDownload(
                    <InvoiceEarningEventClientSide record={record} />,
                    `${record._id}-client-invoice.pdf`
                  )
                }
              >
                Download Invoice (Client)
              </ReuseButton>
              <ReuseButton
                variant="secondary"
                className="!w-fit"
                onClick={() =>
                  handleInvoiceDownload(
                    <InvoiceEarningEventAdminSide record={record} />,
                    `${record._id}-admin-invoice.pdf`
                  )
                }
              >
                Download Invoice (Admin)
              </ReuseButton>
            </>
          )}

          {type === "gear" && (
            <>
              <ReuseButton
                variant="secondary"
                className="!w-fit"
                onClick={() =>
                  handleInvoiceDownload(
                    <InvoiceGearFromClientSide currentRecord={record as any} />,
                    `${record.orderId}-client-invoice.pdf`
                  )
                }
              >
                Download Invoice (Client)
              </ReuseButton>
              <ReuseButton
                variant="secondary"
                className="!w-fit"
                onClick={() =>
                  handleInvoiceDownload(
                    <InvoiceGearFromAdminSide currentRecord={record as any} />,
                    `${record.orderId}-admin-invoice.pdf`
                  )
                }
              >
                Download Invoice (Admin)
              </ReuseButton>
            </>
          )}

          {type === "workshop" && (
            <>
              <ReuseButton
                variant="secondary"
                className="!w-fit"
                onClick={() =>
                  handleInvoiceDownload(
                    <InvoiceWorkshopFromClientSide record={record} professional={record.instructorId} />,
                    `${record.orderId}-client-invoice.pdf`
                  )
                }
              >
                Download Invoice (Client)
              </ReuseButton>
              <ReuseButton
                variant="secondary"
                className="!w-fit"
                onClick={() =>
                  handleInvoiceDownload(
                    <InvoiceWorkshopFromAdminSide record={record} professional={record.instructorId} />,
                    `${record.orderId}-admin-invoice.pdf`
                  )
                }
              >
                Download Invoice (Admin)
              </ReuseButton>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EarningViewModal;
