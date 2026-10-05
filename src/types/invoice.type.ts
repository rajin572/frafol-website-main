// Dates of the invoices of one order. The issue date is also the date of service delivery
// (they are always the same). The invoice number is not stored: it is the order ID plus
// "-F1" for the payment invoices and "-F2" for the final settlement invoices.
interface IInvoiceMeta {
  issueDate?: string;
}

interface IOrderInvoices {
  creatorPayment?: IInvoiceMeta; // Creator -> Customer, issued at payment
  feePayment?: IInvoiceMeta; // Frafol -> Customer, issued at payment
  creatorFinal?: IInvoiceMeta; // Creator -> Customer, issued when the order is completed
  feeFinal?: IInvoiceMeta; // Frafol -> Customer, issued when the order is completed
}

export type { IInvoiceMeta, IOrderInvoices };
