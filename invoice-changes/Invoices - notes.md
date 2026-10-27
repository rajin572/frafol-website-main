Notes for implementing invoice changes:

All changes are highlighted in bold. Please keep the existing design and only implement the new changes. There is also an explanation below:

**1\. Client ↔ Professional**

The same 2 invoices: F1 after payment and F2 after delivery confirmation.we

**_Payment invoice (F1):_**

\- Dátum dodania / Date of delivery: Remove the word "služby".

\- Product: Always "Faktúra k prijatej platbe / Invoice for payment", with the price of the purchased service/product.

\- Spolu bez DPH / Total without DPH: Add below the products, only for VAT payers. Display the combined price excluding VAT.

\- Nie som platiteľom DPH / I am not a VAT payer: Display near the bottom of the invoice only when the professional has not entered a VAT percentage.

**_Delivery invoice (F2):_**

\- Dátum dodania / Date of delivery: Remove the word "služby".

\- Remove: "ZAPLATENÝ PREDDAVOK / PAID AMOUNT" and "MEDZISÚČET / SUBTOTAL".

\- Faktúra k prijatej platbe č.\_\_\_ / Payment invoice number\_\_\_\_: Add below the products, using F1 invoice number and showing the combined price excluding VAT as a negative amount (e.g. \-1 000,00 €). For non-VAT payers, subtract the full product price.

\- Spolu bez DPH / Total without DPH: Add below the line, only for VAT payers, with a result of 0,00 €.

\- VAT (if applicable): Two lines above the total: one positive VAT amount and the same amount negative (e.g. 230,00 € and \-230,00 €).

\- K ÚHRADE / TO PAY: Rename the existing "ZOSTÁVA UHRADIŤ / BALANCE DUE". The final amount is 0,00 €.

\- Nie som platiteľom DPH / I am not a VAT payer: Display near the bottom of the invoice only when the professional has not entered a VAT percentage.

**2\. FRAFOL ↔ Client**

Only 1 service fee invoice, generated after payment.

\- Dátum dodania / Date of delivery: Remove the word "služby".

\- Keep the existing service fee invoice format after payment and use a separate invoice numbering sequence from professionals.

\- Nie som platiteľom DPH / I am not a VAT payer: Always display near the bottom of FRAFOL invoices, as FRAFOL is currently not a VAT payer.

**General rules**

\- Both dates (Issue date and Date of delivery): F1 uses the payment date; F2 uses the date the client confirms delivery/completion. The FRAFOL invoice uses the payment date.

\- Invoice number: Keep professionals' F1/F2 numbering, e.g. 20261010-0018-F1 and 20261010-0018-F2. FRAFOL must have its own unique numbering sequence for service fee invoices.

\- VAT: Use the VAT percentage entered by the professional to determine whether VAT information should be displayed. If no VAT percentage is entered, hide the VAT fields and display "Nie som platiteľom DPH".

\- Order types: These rules apply to photo/video services, workshops, and marketplace orders. FRAFOL Choice uses the same format as the service fee invoice, but with a different product description.

\- The red notes at the top of the PDF are instructions for you, not part of the invoices.

Please follow the attached PDF as the final reference. If anything is unclear, message me here before implementing it.
