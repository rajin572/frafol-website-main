export interface InvoiceRow {
  label: string;
  value: string;
}

export interface InvoiceLine {
  name: string;
  quantity: string;
  unitPrice: number;
  total: number;
  bold?: boolean;
}

// One printable invoice page. Everything is already resolved (rows, totals, dates),
// so the PDF template only has to lay it out.
export interface InvoiceData {
  kind: "payment" | "final";
  // Who issues it: the creator (photographer, seller, instructor) or Frafol (service fee).
  // The two templates are laid out slightly differently.
  issuer: "creator" | "frafol";
  // Číslo objednávky: the order ID. Left out for invoices that have no order (subscriptions).
  orderNumber?: string;
  // Číslo faktúry: "<order ID>-F1" (payment) or "<order ID>-F2" (final settlement).
  invoiceNumber: string;
  // Issue date and date of service delivery are always the same date.
  date?: string | Date;
  // Further "label: value" lines under the standard ones (e.g. "Platnosť do" of a subscription).
  extraMeta?: InvoiceRow[];
  supplierRows: InvoiceRow[];
  customerRows: InvoiceRow[];
  // Marketplace only, and only when different from the billing address.
  deliveryAddress?: string;
  lines: InvoiceLine[];
  // Final settlement only: the payment invoice that is deducted again, a negative amount.
  advance?: { invoiceNumber: string; amount: number };
  // "Spolu bez DPH" row under the products. Only for VAT payers.
  totalWithoutVat?: number;
  subtotal: number;
  // Only set for VAT payers. Without it the invoice prints "Nie som platiteľom DPH."
  vat?: { percent: number; amount: number };
  total: number;
}

// The invoices of one order. Frafol only invoices its service fee once, at payment.
export interface InvoiceSet {
  creatorPayment: InvoiceData;
  feePayment?: InvoiceData;
  creatorFinal: InvoiceData;
}
