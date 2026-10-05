import { IEventOrder } from "@/types";
import { assembleInvoices } from "./assembleInvoices";
import { joinAddress, makeRows, vatPercentOf } from "./invoiceFormat";
import { InvoiceSet } from "./invoiceTypes";

export const buildEventInvoices = (order: IEventOrder): InvoiceSet => {
  const creator = order.serviceProviderId;
  const customer = order.userId;

  const price = order.price || 0;
  const vatAmount = order.vatAmount || 0;
  const serviceFee = Math.max((order.priceWithServiceFee || 0) - price, 0);

  const itemName =
    (order.orderType === "custom" ? order.packageName : order.packageId?.title) ||
    order.title ||
    "Služba";

  // Billing details are stored on the order; fall back to the customer's profile.
  const hasOrderAddress = !!order.streetAddress;
  const customerAddress = hasOrderAddress
    ? joinAddress(order.streetAddress, order.zipCode, order.town)
    : joinAddress(customer?.address, customer?.zipCode, customer?.town);
  const useProfileCompany = order.isRegisterAsCompany !== false;

  return assembleInvoices({
    orderId: order.orderId,
    invoices: order.invoices,
    paymentDate: order.paidAt || order.statusTimestamps?.inProgressAt,
    completionDate: order.statusTimestamps?.deliveredAt,
    creatorRows: makeRows([
      ["Názov firmy", creator?.companyName || creator?.name, true],
      ["Adresa sídla", joinAddress(creator?.address, creator?.zipCode, creator?.town), true],
      ["IČO", creator?.ico, true],
      ["DIČ", creator?.dic, true],
      ["IČ DPH", creator?.ic_dph],
    ]),
    customerRows: makeRows([
      ["Meno", order.companyName || order.name || customer?.companyName || customer?.name, true],
      ["Adresa sídla", customerAddress, true],
      ["IČO", order.ICO || (useProfileCompany ? customer?.ico : undefined)],
      ["DIČ", order.DIC || (useProfileCompany ? customer?.dic : undefined)],
      ["IČ DPH", order.IC_DPH || (useProfileCompany ? customer?.ic_dph : undefined)],
    ]),
    creatorLines: [{ name: itemName, quantity: "1 ks", unitPrice: price, total: price }],
    creatorVat: { percent: vatPercentOf(vatAmount, price), amount: vatAmount },
    serviceFee,
  });
};
