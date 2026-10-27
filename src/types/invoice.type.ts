// Dates of the invoices of one order. The issue date is also the date of delivery
// (they are always the same). The creator's invoice number is not stored: it is the order ID plus
// "-F1" for the payment invoice and "-F2" for the final settlement invoice. Frafol's service fee
// invoice has its own numbering sequence, so its number has to come from the backend.
interface IInvoiceMeta {
  issueDate?: string;
  invoiceNumber?: string;
}

interface IOrderInvoices {
  creatorPayment?: IInvoiceMeta; // Creator -> Customer, issued at payment
  feePayment?: IInvoiceMeta; // Frafol -> Customer, issued at payment
  creatorFinal?: IInvoiceMeta; // Creator -> Customer, issued when the order is completed
  // There is no second Frafol invoice: the service fee is invoiced once, at payment.
}

export type { IInvoiceMeta, IOrderInvoices };
