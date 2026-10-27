# Invoice changes: implementation notes

Source: the accountant-approved templates (`Final invoices .pdf`) and Andrea's notes (`Invoices - notes.md`).
Status (2026-10-27): **frontend done and checked against the PDF; backend work still open** (see below).

## 1. The new rules in short

There are now **3 invoices per order** (photo/video, workshop and marketplace orders all follow this):

| # | Invoice | When | Issue date = delivery date |
|---|---------|------|----------------------------|
| F1 | Professional → client, payment invoice | after payment | payment date |
| F2 | Professional → client, delivery (settlement) invoice | after the client confirms delivery | confirmation date |
| – | FRAFOL → client, service fee invoice | after payment, **only one** | payment date |

Frafol Choice (subscription) uses the service fee invoice format with a different product description.

Rules for every invoice:

- "Dátum dodania": the word "služby" is removed.
- Only Slovak is printed. The English text and the red notes in the PDF are annotations for developers.
- A professional is a **VAT payer when they entered a VAT percentage**. Without one, all VAT fields are hidden and "Nie som platiteľom DPH." is printed near the bottom.
- FRAFOL is not a VAT payer, so its invoices always print "Nie som platiteľom DPH.".
- Numbering: professionals keep `<order ID>-F1` / `-F2` (e.g. `20261010-0018-F1`). FRAFOL needs its **own** sequence.

### F1 (payment invoice)
- One bold product line, always "Faktúra k prijatej platbe", with the full price of the purchased service/product.
- VAT payers: "Spolu bez DPH" row under the products (price excluding VAT).
- Totals stay as before: MEDZISÚČET, DPH (x %), SPOLU.

### F2 (delivery invoice)
- The real product lines, as before.
- Below them a bold row "Faktúra k prijatej platbe č. `<F1 number>`" with the price **excluding VAT as a negative amount** (non-VAT payers: the full price).
- VAT payers: "Spolu bez DPH" row with 0,00 €, and two VAT lines above the total (e.g. 230,00 € and -230,00 €).
- Removed: "ZAPLATENÝ PREDDAVOK" and "MEDZISÚČET".
- SPOLU shows 0,00 €. "ZOSTÁVA UHRADIŤ" is renamed to "K ÚHRADE" (0,00 €).

### FRAFOL service fee invoice
- Existing format kept. Only the date label, the VAT note and the separate numbering change.
- There is no second (settlement) invoice from FRAFOL any more.

## 2. What changed in the frontend

| File | Change |
|------|--------|
| `src/utils/invoice/InvoiceTemplate.tsx` | "Dátum dodania" label; bold product line; deducted-payment-invoice row and "Spolu bez DPH" row under the table; settlement totals (two VAT lines, no MEDZISÚČET / ZAPLATENÝ PREDDAVOK, "K ÚHRADE"); "Nie som platiteľom DPH." when the invoice has no VAT |
| `src/utils/invoice/assembleInvoices.ts` | VAT payer decided by the VAT percentage; F1 collapses the products into one "Faktúra k prijatej platbe" line; F2 gets the negative F1 row and a total of 0; `feeFinal` removed; `finalInvoices()` returns only the professional's F2; Frafol invoice uses the backend number when present |
| `src/utils/invoice/invoiceTypes.ts` | new `advance`, `totalWithoutVat`, `bold`; `feeFinal` removed from `InvoiceSet` |
| `src/types/invoice.type.ts` | `invoiceNumber?` added to the invoice meta; `feeFinal` removed |

Not changed: the builders per order type (`eventInvoices.ts`, `gearInvoices.ts`, `workshopInvoices.ts`), the screens that download invoices, and the date logic (F1 payment date, F2 confirmation date, FRAFOL payment date was already right).

The subscription invoice (`subscriptionInvoice.ts`) needed no code change: it is a Frafol invoice without VAT, so it now prints the date label and the VAT note through the shared template.

## 3. How it was checked

Rendered the real PDF template with sample data (VAT payer and non-VAT payer, 1 000 € service, 23 % VAT, 40 € fee) and compared each page with the client's PDF: F1, F2 with VAT, F2 without VAT, and the service fee invoice. All matched. `tsc --noEmit` is clean. The temporary test page was removed afterwards.

## 4. Backend work still open

1. **FRAFOL numbering.** Send `invoices.feePayment.invoiceNumber` from its own sequence. Until then the frontend falls back to the professional's F1 number, which is wrong for a Frafol invoice.
2. **Stop generating and emailing the FRAFOL settlement invoice** (and drop it from the admin panel).
3. **VAT percentage on event orders.** Today the frontend derives it from the VAT amount. Gear (`vatAmount`) and workshop (`vatPercent`) already carry a percentage.
4. The emailed and admin-panel PDFs have to follow the same rules as the template above. Generation of those is backend work.

## 5. Open questions for Andrea

1. Non-VAT professionals: should F1 still show MEDZISÚČET and SPOLU? (Currently yes, as on the service fee page of the PDF.)
2. Workshop F2 date: there is no confirmation timestamp, so the workshop date is used. Is that right?
3. Frafol Choice: what should the product line say? It currently reads "Predplatné (N mesiace)".
4. Amounts print as `1000,00€`, while the client's examples use a thousands space (`1 000,00€`). Do they want the space?
