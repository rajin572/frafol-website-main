import dayjs from "dayjs";
import { InvoiceRow } from "./invoiceTypes";

// 1000 -> "1000,00€"
export const formatMoney = (value: number): string =>
  `${(Number.isFinite(value) ? value : 0).toFixed(2).replace(".", ",")}€`;

// dd.mm.yyyy
export const formatInvoiceDate = (date?: string | Date): string => {
  if (!date) return "__.__.____";
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.format("DD.MM.YYYY") : "__.__.____";
};

// "Street 1, 010 08 Žilina". The postal code and the town use non-breaking spaces, so a long
// address wraps between the street and the town instead of splitting "010 08" from "Žilina".
export const joinAddress = (street?: string, zipCode?: string, town?: string): string =>
  [street, [zipCode, town].filter(Boolean).join(" ").replace(/ /g, "\u00A0")]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");

export const vatPercentOf = (vatAmount: number, base: number): number =>
  base > 0 ? Math.round((vatAmount / base) * 100) : 0;

type RowSpec = [label: string, value: string | undefined | null, required?: boolean];

// Required rows stay on the invoice with a "____" placeholder, optional rows
// (e.g. IČO / DIČ / IČ DPH of a private person) are left out when empty.
export const makeRows = (specs: RowSpec[]): InvoiceRow[] =>
  specs.flatMap(([label, value, required]) => {
    const text = value?.toString().trim();
    if (text) return [{ label, value: text }];
    return required ? [{ label, value: "____" }] : [];
  });
