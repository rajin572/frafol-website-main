import dayjs from "dayjs";
import { IProfile } from "@/types";
import { ISubscription, ISubscriptionData } from "@/app/(withDashboardLayout)/dashboard/professional/frafol-choice/page";
import { frafolRows } from "./assembleInvoices";
import { formatInvoiceDate, joinAddress, makeRows } from "./invoiceFormat";
import { InvoiceData } from "./invoiceTypes";

// 30 -> "1 mesiac", 90 -> "3 mesiace", 180 -> "6 mesiacov" (Slovak plural forms).
const monthsLabel = (days: number): string => {
  const months = Math.max(1, Math.round((days || 0) / 30));
  const word = months === 1 ? "mesiac" : months < 5 ? "mesiace" : "mesiacov";
  return `${months} ${word}`;
};

// Frafol Choice subscription: Frafol invoices the professional (no VAT on Frafol's own services).
export const buildSubscriptionInvoice = (
  myData: IProfile,
  subscriptionData: ISubscriptionData,
  pack: ISubscription
): InvoiceData => {
  const isCompany = !!(myData?.companyName || myData?.ico);
  const fullName = [myData?.name, myData?.sureName].filter(Boolean).join(" ");

  // The subscription started `duration` days before it expires, which is the payment date.
  const expiry = subscriptionData?.subscriptionExpiryDate;
  const startDate = expiry ? dayjs(expiry).subtract(pack.duration || 0, "day").toDate() : undefined;

  return {
    kind: "payment",
    issuer: "frafol",
    // There is no order, so there is no "Číslo objednávky".
    invoiceNumber: `FC-${pack._id.slice(-8).toUpperCase()}-${startDate?.getFullYear() ?? new Date().getFullYear()}`,
    date: startDate,
    extraMeta: expiry ? [{ label: "Platnosť do", value: formatInvoiceDate(expiry) }] : [],
    supplierRows: frafolRows(),
    customerRows: makeRows([
      ["Meno", (isCompany && myData?.companyName) || fullName, true],
      ["Adresa sídla", joinAddress(myData?.address, myData?.zipCode, myData?.town), true],
      ["IČO", isCompany ? myData?.ico : undefined],
      ["DIČ", isCompany ? myData?.dic : undefined],
      ["IČ DPH", isCompany ? myData?.ic_dph : undefined],
    ]),
    lines: [
      {
        name: `Predplatné (${monthsLabel(pack.duration)})`,
        quantity: "1 ks",
        unitPrice: pack.price,
        total: pack.price,
      },
    ],
    subtotal: pack.price,
    total: pack.price,
  };
};
