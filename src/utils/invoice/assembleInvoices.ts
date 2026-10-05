import { IOrderInvoices } from "@/types";
import { FRAFOL_SUPPLIER } from "./invoiceConfig";
import { makeRows } from "./invoiceFormat";
import { InvoiceData, InvoiceLine, InvoiceRow, InvoiceSet } from "./invoiceTypes";

export interface InvoiceSource {
  // Printed as the order number; the invoice number is derived from it.
  orderId: string;
  invoices?: IOrderInvoices;
  // Issue date of the payment invoices and of the final settlement invoices.
  paymentDate?: string | Date;
  completionDate?: string | Date;
  creatorRows: InvoiceRow[];
  customerRows: InvoiceRow[];
  // Marketplace only: set when it differs from the billing address.
  deliveryAddress?: string;
  // Only the creator's own service/product - never the platform fee.
  creatorLines: InvoiceLine[];
  creatorVat?: { percent: number; amount: number };
  // Platform service fee, invoiced separately by Frafol. VAT is never charged on it.
  serviceFee: number;
}

export const frafolRows = (): InvoiceRow[] =>
  makeRows([
    ["Názov firmy", FRAFOL_SUPPLIER.companyName, true],
    ["Adresa sídla", FRAFOL_SUPPLIER.address, true],
    ["IČO", FRAFOL_SUPPLIER.ico, true],
    ["DIČ", FRAFOL_SUPPLIER.dic, true],
    ["IBAN", FRAFOL_SUPPLIER.iban, true],
    ["Telefón", FRAFOL_SUPPLIER.phone, true],
    ["E-mail", FRAFOL_SUPPLIER.email, true],
  ]);

// Payment invoices (creator and Frafol) are "<order ID>-F1", final settlements "<order ID>-F2",
// without the letters in front of the order ID: "EVT-20261005-0005" -> "20261005-0005-F1".
const invoiceNumberOf = (orderId: string, kind: InvoiceData["kind"]): string =>
  `${orderId.replace(/^[A-Za-z]+-/, "")}-F${kind === "payment" ? 1 : 2}`;

export const assembleInvoices = (source: InvoiceSource): InvoiceSet => {
  const creatorSubtotal = source.creatorLines.reduce((sum, line) => sum + line.total, 0);
  const vat = source.creatorVat && source.creatorVat.amount > 0 ? source.creatorVat : undefined;
  const creatorTotal = creatorSubtotal + (vat?.amount || 0);

  const creatorInvoice = (
    kind: InvoiceData["kind"],
    meta: { issueDate?: string } | undefined,
    fallbackDate?: string | Date
  ): InvoiceData => ({
    kind,
    issuer: "creator",
    orderNumber: source.orderId,
    invoiceNumber: invoiceNumberOf(source.orderId, kind),
    date: meta?.issueDate || fallbackDate,
    supplierRows: source.creatorRows,
    customerRows: source.customerRows,
    deliveryAddress: source.deliveryAddress,
    lines: source.creatorLines,
    subtotal: creatorSubtotal,
    vat,
    total: creatorTotal,
  });

  const feeInvoice = (
    kind: InvoiceData["kind"],
    meta: { issueDate?: string } | undefined,
    fallbackDate?: string | Date
  ): InvoiceData | undefined =>
    source.serviceFee > 0
      ? {
          kind,
          issuer: "frafol",
          orderNumber: source.orderId,
          invoiceNumber: invoiceNumberOf(source.orderId, kind),
          date: meta?.issueDate || fallbackDate,
          supplierRows: frafolRows(),
          customerRows: source.customerRows,
          lines: [
            {
              name: "Servisný poplatok",
              quantity: "1 ks",
              unitPrice: source.serviceFee,
              total: source.serviceFee,
            },
          ],
          subtotal: source.serviceFee,
          total: source.serviceFee,
        }
      : undefined;

  const { invoices } = source;
  return {
    creatorPayment: creatorInvoice("payment", invoices?.creatorPayment, source.paymentDate),
    feePayment: feeInvoice("payment", invoices?.feePayment, source.paymentDate),
    creatorFinal: creatorInvoice("final", invoices?.creatorFinal, source.completionDate),
    feeFinal: feeInvoice("final", invoices?.feeFinal, source.completionDate),
  };
};

const defined = (invoices: (InvoiceData | undefined)[]): InvoiceData[] =>
  invoices.filter((invoice): invoice is InvoiceData => !!invoice);

// Customer: both payment invoices combined into one PDF.
export const paymentInvoices = (set: InvoiceSet): InvoiceData[] =>
  defined([set.creatorPayment, set.feePayment]);

// Customer: both final settlement invoices combined into one PDF.
export const finalInvoices = (set: InvoiceSet): InvoiceData[] =>
  defined([set.creatorFinal, set.feeFinal]);

// Creator: only their own invoices, one PDF each (payment, and final once completed).
export const creatorPaymentInvoice = (set: InvoiceSet): InvoiceData[] => [set.creatorPayment];

export const creatorFinalInvoice = (set: InvoiceSet): InvoiceData[] => [set.creatorFinal];
