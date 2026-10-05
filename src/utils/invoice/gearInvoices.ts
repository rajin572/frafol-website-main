import { IGearOrder } from "@/types";
import { assembleInvoices } from "./assembleInvoices";
import { joinAddress, makeRows } from "./invoiceFormat";
import { InvoiceLine, InvoiceSet } from "./invoiceTypes";

const normalize = (value: string) => value.toLowerCase().replace(/[\s,]+/g, " ").trim();

export const buildGearInvoices = (order: IGearOrder): InvoiceSet => {
  const gear = order.gearMarketplaceId;
  const seller = order.sellerId;
  const isCompany = !!order.loginAsCompany;

  // Billing address: the company's registered address, otherwise the personal one.
  const billingAddress = isCompany
    ? joinAddress(order.companyAddress, order.companyPostCode, order.companyTown)
    : joinAddress(order.shippingAddress, order.postCode, order.town);
  const shippingAddress = joinAddress(order.shippingAddress, order.postCode, order.town);
  const deliveryAddress =
    shippingAddress && normalize(shippingAddress) !== normalize(billingAddress)
      ? shippingAddress
      : undefined;

  const gearPrice = gear?.price || 0;
  const shippingPrice = gear?.shippingCompany?.price || 0;

  const creatorLines: InvoiceLine[] = [
    { name: gear?.name || "Tovar", quantity: "1 ks", unitPrice: gearPrice, total: gearPrice },
  ];
  if (shippingPrice > 0) {
    creatorLines.push({
      name: `Doručenie${gear?.shippingCompany?.name ? ` (${gear.shippingCompany.name})` : ""}`,
      quantity: "1 ks",
      unitPrice: shippingPrice,
      total: shippingPrice,
    });
  }

  return assembleInvoices({
    orderId: order.orderId,
    invoices: order.invoices,
    // Until the backend sends the payment date, the order creation date is the closest we have.
    paymentDate: order.paidAt || order.createdAt,
    completionDate: order.statusTimestamps?.deliveredAt,
    creatorRows: makeRows([
      ["Názov firmy", seller?.companyName || seller?.name, true],
      ["Adresa sídla", joinAddress(seller?.address, seller?.zipCode, seller?.town), true],
      ["IČO", seller?.ico, true],
      ["DIČ", seller?.dic, true],
      ["IČ DPH", seller?.ic_dph],
    ]),
    customerRows: makeRows([
      ["Meno", (isCompany && order.companyName) || order.name, true],
      ["Adresa sídla", billingAddress, true],
      ["IČO", isCompany ? order.ico : undefined],
      ["DIČ", isCompany ? order.dic : undefined],
      ["IČ DPH", isCompany ? order.ic_dph : undefined],
    ]),
    deliveryAddress,
    creatorLines,
    // For gear, `vatAmount` is the VAT percentage and `totalVatAmount` the VAT in euro.
    creatorVat: { percent: gear?.vatAmount || 0, amount: gear?.totalVatAmount || 0 },
    serviceFee: gear?.platformCommission || 0,
  });
};
