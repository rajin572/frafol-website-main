/* eslint-disable @typescript-eslint/no-explicit-any */
import { assembleInvoices } from "./assembleInvoices";
import { joinAddress, makeRows, vatPercentOf } from "./invoiceFormat";
import { InvoiceSet } from "./invoiceTypes";

// `record` is a workshop participant / registration, `instructor` the workshop's creator.
export const buildWorkshopInvoices = (record: any, instructor: any): InvoiceSet => {
  const workshop = record?.workshopId;
  // `clientId` is only populated on some endpoints (a plain id string on others).
  const client = typeof record?.clientId === "object" ? record.clientId : undefined;

  const price = workshop?.price || 0;
  const vatAmount = workshop?.vatAmount || 0;
  const mainPrice = workshop?.mainPrice || 0;
  // The customer pays `mainPrice` = price + VAT + platform fee.
  const serviceFee = Math.max(mainPrice - price - vatAmount, 0);

  return assembleInvoices({
    orderId: record?.orderId,
    invoices: record?.invoices,
    // `joinedAt` is when the customer registered (and paid) for the workshop.
    paymentDate: record?.paidAt || record?.joinedAt,
    // Workshops have no completion timestamp: the workshop date is the closest we have.
    completionDate: workshop?.date,
    creatorRows: makeRows([
      ["Názov firmy", instructor?.companyName || instructor?.name, true],
      ["Adresa sídla", joinAddress(instructor?.address, instructor?.zipCode, instructor?.town), true],
      ["IČO", instructor?.ico, true],
      ["DIČ", instructor?.dic, true],
      ["IČ DPH", instructor?.ic_dph],
    ]),
    customerRows: makeRows([
      ["Meno", record?.companyName || client?.name || record?.name, true],
      [
        "Adresa sídla",
        joinAddress(
          record?.streetAddress || client?.address,
          record?.streetAddress ? record?.zipCode : client?.zipCode,
          record?.streetAddress ? record?.town : client?.town
        ),
        true,
      ],
      ["IČO", record?.ICO],
      ["DIČ", record?.DIC],
      ["IČ DPH", record?.IC_DPH],
    ]),
    creatorLines: [
      {
        name: workshop?.title || "Workshop",
        quantity: "1 ks",
        unitPrice: price,
        total: price,
      },
    ],
    creatorVat: {
      percent: workshop?.vatPercent || vatPercentOf(vatAmount, price),
      amount: vatAmount,
    },
    serviceFee,
  });
};

// A workshop counts as completed once its date has passed.
export const isWorkshopCompleted = (record: any): boolean => {
  const date = record?.workshopId?.date;
  return !!date && new Date(date).getTime() <= Date.now();
};
