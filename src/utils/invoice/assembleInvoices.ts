import { IInvoiceMeta, IOrderInvoices } from "@/types/invoice.type";
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

// Creator invoices are "<order ID>-F1" (payment) and "<order ID>-F2" (final settlement), without
// the letters in front of the order ID: "EVT-20261005-0005" -> "20261005-0005-F1".
const invoiceNumberOf = (orderId: string, kind: InvoiceData["kind"]): string =>
  `${orderId.replace(/^[A-Za-z]+-/, "")}-F${kind === "payment" ? 1 : 2}`;

export const assembleInvoices = (source: InvoiceSource): InvoiceSet => {
  const creatorSubtotal = source.creatorLines.reduce((sum, line) => sum + line.total, 0);
  // The professional is a VAT payer when they entered a VAT percentage.
  const vat =
    source.creatorVat && source.creatorVat.percent > 0 ? source.creatorVat : undefined;
  const creatorTotal = creatorSubtotal + (vat?.amount || 0);
  const paymentNumber = invoiceNumberOf(source.orderId, "payment");

  const creatorInvoice = (
    kind: InvoiceData["kind"],
    meta: IInvoiceMeta | undefined,
    fallbackDate?: string | Date
  ): InvoiceData => {
    const base = {
      issuer: "creator" as const,
      orderNumber: source.orderId,
      date: meta?.issueDate || fallbackDate,
      supplierRows: source.creatorRows,
      customerRows: source.customerRows,
      deliveryAddress: source.deliveryAddress,
    };

    if (kind === "payment") {
      // One line with the whole price, whatever was bought.
      return {
        ...base,
        kind,
        invoiceNumber: meta?.invoiceNumber || paymentNumber,
        lines: [
          {
            name: "Faktúra k prijatej platbe",
            quantity: "1 ks",
            unitPrice: creatorSubtotal,
            total: creatorSubtotal,
            bold: true,
          },
        ],
        totalWithoutVat: vat ? creatorSubtotal : undefined,
        subtotal: creatorSubtotal,
        vat,
        total: creatorTotal,
      };
    }

    // Final settlement: the real products, then the payment invoice is deducted again (without VAT,
    // the VAT is deducted on its own line), so everything ends at 0,00 €.
    return {
      ...base,
      kind,
      invoiceNumber: meta?.invoiceNumber || invoiceNumberOf(source.orderId, kind),
      lines: source.creatorLines,
      advance: {
        invoiceNumber: paymentNumber,
        amount: -creatorSubtotal,
      },
      totalWithoutVat: vat ? 0 : undefined,
      subtotal: 0,
      vat,
      total: 0,
    };
  };

  // Frafol invoices its service fee once, at payment. It has its own numbering sequence: the number
  // comes from the backend, the creator's order-based number is only a stand-in until it does.
  const feeInvoice = (
    meta: IInvoiceMeta | undefined,
    fallbackDate?: string | Date
  ): InvoiceData | undefined =>
    source.serviceFee > 0
      ? {
          kind: "payment",
          issuer: "frafol",
          orderNumber: source.orderId,
          invoiceNumber: meta?.invoiceNumber || paymentNumber,
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
    feePayment: feeInvoice(invoices?.feePayment, source.paymentDate),
    creatorFinal: creatorInvoice("final", invoices?.creatorFinal, source.completionDate),
  };
};

const defined = (invoices: (InvoiceData | undefined)[]): InvoiceData[] =>
  invoices.filter((invoice): invoice is InvoiceData => !!invoice);

// Customer: both payment invoices combined into one PDF.
export const paymentInvoices = (set: InvoiceSet): InvoiceData[] =>
  defined([set.creatorPayment, set.feePayment]);

// Customer: the final settlement invoice (Frafol's service fee has no second invoice).
export const finalInvoices = (set: InvoiceSet): InvoiceData[] => [set.creatorFinal];

// Creator: only their own invoices, one PDF each (payment, and final once completed).
export const creatorPaymentInvoice = (set: InvoiceSet): InvoiceData[] => [set.creatorPayment];

export const creatorFinalInvoice = (set: InvoiceSet): InvoiceData[] => [set.creatorFinal];
