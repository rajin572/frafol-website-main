export interface InvoiceRow {
  label: string;
  value: string;
}

export interface InvoiceLine {
  name: string;
  quantity: string;
  unitPrice: number;
  total: number;
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
  subtotal: number;
  vat?: { percent: number; amount: number };
  total: number;
}

// The four invoices of one order.
export interface InvoiceSet {
  creatorPayment: InvoiceData;
  feePayment?: InvoiceData;
  creatorFinal: InvoiceData;
  feeFinal?: InvoiceData;
}
