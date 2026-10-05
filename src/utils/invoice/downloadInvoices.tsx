import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import InvoicePdf from "./InvoiceTemplate";
import { InvoiceData } from "./invoiceTypes";

// Builds one PDF (one page per invoice) and downloads it.
export const downloadInvoices = async (invoices: InvoiceData[], filename: string) => {
  const toastId = toast.loading("Sťahuje sa...", { duration: 3000 });
  try {
    const blob = await pdf(<InvoicePdf invoices={invoices} />).toBlob();
    saveAs(blob, filename);
    toast.success("Úspešne stiahnuté!", { id: toastId });
  } catch (error) {
    console.error(error);
    toast.error("Sťahovanie zlyhalo", { id: toastId });
  }
};
