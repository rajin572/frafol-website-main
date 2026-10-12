"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Tag } from "antd";
import Image from "next/image";
import { getMediaUrl } from "@/utils/mediaUrl";
import { AllImages } from "../../../../../public/assets/AllImages";
import { buildEventInvoices } from "@/utils/invoice/eventInvoices";
import { buildGearInvoices } from "@/utils/invoice/gearInvoices";
import { buildWorkshopInvoices } from "@/utils/invoice/workshopInvoices";
import { creatorFinalInvoice, creatorPaymentInvoice } from "@/utils/invoice/assembleInvoices";
import { downloadInvoices } from "@/utils/invoice/downloadInvoices";
import { IEventOrder } from "@/types";
import ReuseButton from "@/components/ui/Button/ReuseButton";

type EarningType = "event" | "gear" | "workshop";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  record: any | null;
  type: EarningType;
}

const EarningViewModal: React.FC<Props> = ({ isVisible, onClose, record, type }) => {

  console.log(record)

  if (!record) return null;

  // The earning record carries the order, the creator and the customer separately; put them
  // together so the invoices are built exactly like on the event orders screen.
  const earningEventOrder = () =>
    ({
      ...record.eventOrderId,
      serviceProviderId: record.serviceProviderId,
      userId: record.userId,
      // Payment date: the order's own, else when it went in progress, else when the payment was made.
      paidAt:
        record.eventOrderId?.paidAt ||
        record.eventOrderId?.statusTimestamps?.inProgressAt ||
        record.createdAt,
    }) as IEventOrder;

  // The final settlement invoice of this earning. It is always offered here: the earnings data
  // does not reliably say whether the order is completed, so the creator can always download it.
  const getFinalInvoice = () => {
    if (type === "event") {
      const order = earningEventOrder();
      return {
        invoices: creatorFinalInvoice(buildEventInvoices(order)),
        filename: `${order.orderId || record._id}-faktura-konecna.pdf`,
      };
    }
    if (type === "gear") {
      return {
        invoices: creatorFinalInvoice(buildGearInvoices(record)),
        filename: `${record.orderId}-faktura-konecna.pdf`,
      };
    }
    return {
      invoices: creatorFinalInvoice(buildWorkshopInvoices(record, record.instructorId)),
      filename: `${record.orderId}-faktura-konecna.pdf`,
    };
  };
  const finalInvoice = getFinalInvoice();

  // Workshop earnings also offer the payment invoice, next to the final one.
  const paymentInvoice =
    type === "workshop"
      ? {
          invoices: creatorPaymentInvoice(buildWorkshopInvoices(record, record.instructorId)),
          filename: `${record.orderId}-faktura-platba.pdf`,
        }
      : null;

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
  const clientImage = getMediaUrl(client?.profileImage) || AllImages.dummyProfile;

  const renderEventContent = () => {
    const eventOrder = record.eventOrderId;
    return (
      <>
        <Row /* label="Event Name" */ label="Názov podujatia" value={eventOrder?.title} />
        <Row /* label="Transaction ID" */ label="ID transakcie" value={<span className="text-xs ">{record.transactionId}</span>} />
        <Row /* label="Payment Method" */ label="Spôsob platby" value={capitalize(record.paymentMethod)} />
        <Row
          label="Stav platby"
          value={<Tag color={record.paymentStatus === "completed" ? "green" : "orange"}>{capitalize(record.paymentStatus)}</Tag>}
        />
        <Row /* label="Service Type" */ label="Typ služby" value={capitalize(eventOrder?.serviceType)} />
        <Row
          label="Typ objednávky"
          value={<Tag color={eventOrder?.orderType === "direct" ? "blue" : "purple"}>{capitalize(eventOrder?.orderType)}</Tag>}
        />
        <Row /* label="Event Date" */ label="Dátum" value={formatDate(eventOrder?.date)} />
        <Row label="Dátum vytvorenia" value={formatDate(record.createdAt)} />
        {/* Price = amount - VAT - commission */}
        <Row
          label="Cena"
          value={
            <span>
              {((record.amount || 0) - (eventOrder?.vatAmount || 0) - (record.commission || 0)).toFixed(2)} €
            </span>
          }
        />
        {eventOrder?.vatAmount ? (
          <Row label="DPH" value={<span>{eventOrder.vatAmount.toFixed(2)} €</span>} />
        ) : null}
        <Row label="Provízia" value={<span>{record.commission?.toFixed(2)} €</span>} />

        <Row /* label="Total Amount" */ label="Celková suma" value={<span>{record.amount?.toFixed(2)} €</span>} />
        {record.couponDiscount > 0 && (
          <Row label="Zľava z kupónu" value={<span className="text-orange-500">- {record.couponDiscount?.toFixed(2)} €</span>} />
        )}
        {record.couponCode && <Row label="Kód kupónu" value={record.couponCode} />}
        <Row
          label="Čistý zárobok"
          value={<span className="text-green-600 font-bold text-base">{record.netAmount?.toFixed(2)} €</span>}
        />
        <Row
          label="Vyplatené poskytovateľovi"
          value={
            <Tag color={record.serviceProviderPaid ? "green" : "red"}>
              {record.serviceProviderPaid ? "Vyplatené" : "Čakajúce"}
            </Tag>
          }
        />
        {record.serviceProviderPaid && record.serviceProviderPaidAt && (
          <Row label="Dátum vyplatenia" value={formatDate(record.serviceProviderPaidAt)} />
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
        <Row label="ID objednávky" value={<span className="text-xs">{record.orderId}</span>} />
        <Row label="Príslušenstvo" value={gear?.name || "—"} />
        <Row
          label="Stav objednávky"
          value={
            <Tag color={record.orderStatus === "delivered" ? "green" : record.orderStatus === "cancelled" ? "red" : "orange"}>
              {capitalize(record.orderStatus)}
            </Tag>
          }
        />
        <Row
          label="Stav platby"
          value={
            <Tag color={record.paymentStatus === "completed" ? "green" : "orange"}>
              {capitalize(record.paymentStatus)}
            </Tag>
          }
        />
        {gear?.vatAmount > 0 && (
          <Row label="DPH (%)" value={`${gear.vatAmount}%`} />
        )}
        <Row label="Predajná cena" value={<span>{gear?.price?.toFixed(2)} €</span>} />
        {gear?.totalVatAmount > 0 && (
          <Row label="Suma DPH" value={<span>{gear.totalVatAmount?.toFixed(2)} €</span>} />
        )}
        <Row label="Provízia platformy" value={<span>{gear?.platformCommission?.toFixed(2)} €</span>} />
        {gear?.shippingCompany?.name && (
          <Row label="Dopravca" value={`${gear.shippingCompany.name} — ${gear.shippingCompany.price?.toFixed(2)} €`} />
        )}
        <Row
          label="Čistý zárobok"
          value={<span className="text-green-600 font-bold text-base">{netEarning?.toFixed(2)} €</span>}
        />
        <Row label="Doručovacia adresa" value={record.shippingAddress} />
        <Row label="Mesto" value={record.town} />
        <Row label="PSČ" value={record.postCode} />
        <Row label="Mobil" value={record.mobileNumber} />
        <Row label="Dátum objednávky" value={formatDate(record.createdAt)} />
        {record.statusTimestamps?.deliveredAt && (
          <Row label="Dátum doručenia" value={formatDate(record.statusTimestamps.deliveredAt)} />
        )}
        <Row
          label="Vyplatené administrátorom"
          value={<Tag color={record.adminPaid ? "green" : "red"}>{record.adminPaid ? "Vyplatené" : "Čakajúce"}</Tag>}
        />
        {record.adminPaid && record.adminPaidAt && (
          <Row label="Dátum vyplatenia administrátorom" value={formatDate(record.adminPaidAt)} />
        )}
      </>
    );
  };

  const renderWorkshopContent = () => {
    const workshop = record.workshopId;
    return (
      <>
        <Row label="ID objednávky" value={record.orderId} />
        <Row /* label="Workshop Title" */ label="Názov kurzu" value={workshop?.title} />
        <Row label="Dátum kurzu" value={formatDate(workshop?.date)} />
        <Row label="Cena kurzu" value={<span>{workshop?.price?.toFixed(2)} €</span>} />
        {workshop?.vatAmount > 0 && (
          <Row label="DPH" value={<span>{workshop?.vatAmount?.toFixed(2)} €</span>} />
        )}
        <Row label="Celkom (s DPH)" value={<span>{workshop?.mainPrice?.toFixed(2)} €</span>} />
        <Row label="Provízia" value={<span className="text-error">{(record.netAmount - workshop?.mainPrice)?.toFixed(2)} €</span>} />
        <Row
          label="Čistý zárobok"
          value={<span className="text-green-600 font-bold text-base">{record.netAmount?.toFixed(2)} €</span>}
        />
        <Row
          label="Stav platby"
          value={<Tag color={record.paymentStatus === "completed" ? "green" : "orange"}>{capitalize(record.paymentStatus)}</Tag>}
        />
        <Row
          label="Platba lektorovi"
          value={
            <Tag color={record.instructorPayment?.status === "received" ? "green" : "orange"}>
              {capitalize(record.instructorPayment?.status || "pending")}
            </Tag>
          }
        />
        <Row label="Dátum registrácie" value={formatDate(record.joinedAt)} />
        <Row
          label="Vyplatené administrátorom"
          value={<Tag color={record.adminPaid ? "green" : "red"}>{record.adminPaid ? "Vyplatené" : "Čakajúce"}</Tag>}
        />
        {record.adminPaid && record.adminPaidAt && (
          <Row label="Dátum vyplatenia administrátorom" value={formatDate(record.adminPaidAt)} />
        )}
        {record.instructorPayment?.paidAt && (
          <Row label="Dátum vyplatenia lektorovi" value={formatDate(record.instructorPayment.paidAt)} />
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

        {/* Invoice download: the final settlement invoice (workshops also get the payment one) */}
        <div className="mt-6 flex flex-col items-center gap-3">
          {paymentInvoice && (
            <ReuseButton
              variant="secondary"
              className="!w-fit"
              onClick={() => downloadInvoices(paymentInvoice.invoices, paymentInvoice.filename)}
            >
              {/* Download payment invoice */}
              Stiahnuť faktúru (platba)
            </ReuseButton>
          )}
          <ReuseButton
            variant="secondary"
            className="!w-fit"
            onClick={() => downloadInvoices(finalInvoice.invoices, finalInvoice.filename)}
          >
            {/* Download final settlement invoice */}
            Stiahnuť konečnú faktúru
          </ReuseButton>
        </div>
      </div>
    </Modal>
  );
};

export default EarningViewModal;
