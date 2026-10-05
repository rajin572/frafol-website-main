/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";
import { AllImages } from "../../../public/assets/AllImages";
import { formatInvoiceDate, formatMoney } from "./invoiceFormat";
import { InvoiceData, InvoiceRow } from "./invoiceTypes";

export const registerInvoiceFonts = (baseUrl: string) => {
  Font.register({
    family: "Poppins",
    fonts: [
      { src: `${baseUrl}/Poppins-Light.ttf`, fontWeight: 300 },
      { src: `${baseUrl}/Poppins-Regular.ttf`, fontWeight: 400 },
      { src: `${baseUrl}/Poppins-Bold.ttf`, fontWeight: 700 },
    ],
  });
};

registerInvoiceFonts("/font");
// Words are never split with a hyphen (addresses, company names).
Font.registerHyphenationCallback((word) => [word]);

// The layout below was measured from the client's invoice template PDF (a 794 x 1123 px
// page = 595.5 x 842.25 pt). Positions are the text baselines / box edges of that file,
// in pt from the top-left corner, so the invoices line up with the template.
const PAGE = { width: 595.5, height: 842.25 };
const INK = "#111111";
const RED = "#ad2b08";
// Red of the template's English text. Only Slovak is printed, so Slovak titles and labels use it.
const TEXT_RED = "#ff3131";
const LINE = "#a6a6a6";
const WHITE = "#ffffff";

// Poppins: the first baseline sits 1.05 x font size below the top of a text box.
const ASCENT = 1.05;
const PARTY_PITCH = 16.505; // line pitch of the supplier / customer blocks
const RADIUS = 5.5; // corner radius of the table header bar and the total pill
const BOX = 120; // width of the boxes used to right-align / center short texts

// Table
const BAR = { x: 57.58, y: 344.27, width: 480.32, height: 31.35 };
const BODY_TOP = BAR.y + BAR.height;
const BAR_TEXT_BASE = BAR.y + BAR.height / 2 + 4.2; // single line, vertically centered
const PRODUCT_WIDTH = 138;

// Positions that differ between the creator and the Frafol (service fee) invoices.
const LAYOUTS = {
  creator: {
    titleBase: 84.3,
    metaBase: 115.94,
    supplierX: 59.55,
    supplierWidth: 255,
    partyBase: 180.78,
    lineX: 72.41,
    lineY: 421.53,
    productBase: 395.23,
    productWeight: 300 as const,
    qtyBase: 399.6,
    priceCenter: 365.91,
    priceBase: 401.11,
    totalRight: 523.46,
    totalBase: 401.18,
  },
  frafol: {
    titleBase: 71.07,
    metaBase: 102.71,
    supplierX: 50.76,
    supplierWidth: 264,
    partyBase: 180.33,
    lineX: 67.85,
    lineY: 420.73,
    productBase: 393.13,
    productWeight: 400 as const,
    qtyBase: 398.58,
    priceCenter: 361.36,
    priceBase: 398.7,
    totalRight: 518.92,
    totalBase: 399.14,
  },
};

interface TxtProps {
  x: number; // left edge, right edge or center, depending on `align`
  base: number; // baseline, pt from the top of the page
  size: number;
  weight?: 300 | 400 | 700;
  color?: string;
  align?: "left" | "right" | "center";
  boxWidth?: number;
  // Origin of the parent box, when placed inside one
  ox?: number;
  oy?: number;
  children: React.ReactNode;
}

// Absolutely positioned single line of text, placed by its baseline.
const Txt = ({
  x,
  base,
  size,
  weight = 400,
  color = INK,
  align = "left",
  boxWidth = BOX,
  ox = 0,
  oy = 0,
  children,
}: TxtProps) => {
  const left = align === "left" ? x : align === "right" ? x - boxWidth : x - boxWidth / 2;
  return (
    <Text
      style={{
        position: "absolute",
        left: left - ox,
        top: base - oy - ASCENT * size,
        ...(align === "left" ? {} : { width: boxWidth, textAlign: align }),
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight: 1,
      }}
    >
      {children}
    </Text>
  );
};

const partyText = {
  fontSize: 11,
  lineHeight: PARTY_PITCH / 11,
  fontWeight: 400 as const,
  color: INK,
};

const PartyBlock = ({
  x,
  base,
  width,
  heading,
  rows,
  children,
}: {
  x: number;
  base: number;
  width: number;
  heading: string;
  rows: InvoiceRow[];
  children?: React.ReactNode;
}) => (
  <View style={{ position: "absolute", left: x, top: base - ASCENT * 11, width }}>
    {/* Heading + 5 rows + 1 empty line, like the template */}
    <View style={{ minHeight: PARTY_PITCH * 7 }}>
      <Text style={{ ...partyText, color: TEXT_RED }}>{heading}</Text>
      {rows.map((row) => (
        <Text key={row.label} style={partyText}>
          <Text style={{ color: TEXT_RED }}>{row.label}:</Text> {row.value}
        </Text>
      ))}
    </View>
    {children}
  </View>
);

const InvoicePage = ({ invoice }: { invoice: InvoiceData }) => {
  const L = LAYOUTS[invoice.issuer];
  const isFinal = invoice.kind === "final";
  const dateText = formatInvoiceDate(invoice.date);
  const { vat } = invoice;

  // With a VAT row the subtotal sits one row higher; the grand total never moves.
  const subtotal = vat
    ? { x: 297.59, base: 603.46 }
    : { x: 297.75, base: 633.88 };

  return (
    <Page size={PAGE} style={{ fontFamily: "Poppins", backgroundColor: WHITE }}>
      <Image
        src={AllImages.logo.src}
        style={{ position: "absolute", left: 70.4, top: 71.47, width: 176.32 }}
      />

      {/* In the template the English half of the title ("I N V O I C E") is red; only Slovak is printed, so it is red. */}
      <Txt x={296.83} base={L.titleBase} size={14.26} color={TEXT_RED}>
        F A K T Ú R A
      </Txt>
      {/* The order number sits one line above the template's three meta lines */}
      <View
        style={{
          position: "absolute",
          left: 260.12,
          top: L.metaBase - (invoice.orderNumber ? 9.75 : 0) - ASCENT * 10.12,
        }}
      >
        {[
          ...(invoice.orderNumber ? [["Číslo objednávky", invoice.orderNumber]] : []),
          ["Číslo faktúry", invoice.invoiceNumber],
          ["Dátum vystavenia", dateText],
          ["Dátum dodania služby", dateText],
          ...(invoice.extraMeta ?? []).map((row) => [row.label, row.value]),
        ].map(([label, value]) => (
          <Text key={label} style={{ fontSize: 10.12, lineHeight: 9.75 / 10.12, color: INK }}>
            <Text style={{ color: TEXT_RED }}>{label}:</Text> {value}
          </Text>
        ))}
      </View>

      <PartyBlock
        x={L.supplierX}
        base={L.partyBase}
        width={L.supplierWidth}
        heading="DODÁVATEĽ"
        rows={invoice.supplierRows}
      />
      <PartyBlock
        x={324.39}
        base={L.partyBase}
        width={213.5}
        heading="ODBERATEĽ"
        rows={invoice.customerRows}
      >
        {invoice.deliveryAddress && (
          <Text style={partyText}>
            <Text style={{ color: TEXT_RED }}>Dodacia adresa:</Text> {invoice.deliveryAddress}
          </Text>
        )}
      </PartyBlock>

      {/* Table header bar */}
      <View
        style={{
          position: "absolute",
          left: BAR.x,
          top: BAR.y,
          width: BAR.width,
          height: BAR.height,
          borderRadius: RADIUS,
          backgroundColor: RED,
        }}
      />
      <Txt x={70.4} base={BAR_TEXT_BASE} size={12} weight={700} color={WHITE}>
        PRODUKT
      </Txt>
      <Txt x={225.61} base={BAR_TEXT_BASE} size={12} weight={700} color={WHITE} align="center">
        MNOŽSTVO
      </Txt>
      <Txt x={365.91} base={BAR_TEXT_BASE} size={12} weight={700} color={WHITE} align="center">
        CENA
      </Txt>
      <Txt x={523.46} base={BAR_TEXT_BASE} size={12} weight={700} color={WHITE} align="right">
        SPOLU
      </Txt>

      {/* Table rows */}
      <View style={{ position: "absolute", left: L.lineX, top: BODY_TOP, width: 450.68 }}>
        {invoice.lines.map((line, index) => (
          <View
            key={`${line.name}-${index}`}
            style={{
              minHeight: L.lineY + 0.375 - BODY_TOP,
              paddingBottom: 6,
              borderBottomWidth: 0.75,
              borderBottomColor: LINE,
            }}
          >
            <Text
              style={{
                marginLeft: 70.4 - L.lineX,
                marginTop: L.productBase - BODY_TOP - ASCENT * 11,
                width: PRODUCT_WIDTH,
                fontSize: 11,
                lineHeight: 12 / 11,
                fontWeight: L.productWeight,
                color: INK,
              }}
            >
              {line.name}
            </Text>
            <Txt x={223.5} base={L.qtyBase} size={11} align="center" ox={L.lineX} oy={BODY_TOP}>
              {line.quantity}
            </Txt>
            <Txt
              x={L.priceCenter}
              base={L.priceBase}
              size={11}
              align="center"
              ox={L.lineX}
              oy={BODY_TOP}
            >
              {formatMoney(line.unitPrice)}
            </Txt>
            <Txt
              x={L.totalRight}
              base={L.totalBase}
              size={11}
              align="right"
              ox={L.lineX}
              oy={BODY_TOP}
            >
              {formatMoney(line.total)}
            </Txt>
          </View>
        ))}
      </View>

      {/* Totals */}
      <Txt x={subtotal.x} base={subtotal.base} size={12} weight={700} color={TEXT_RED}>
        MEDZISÚČET:
      </Txt>
      <Txt x={523.45} base={subtotal.base} size={12} weight={700} align="right">
        {formatMoney(invoice.subtotal)}
      </Txt>
      {vat && (
        <>
          <Txt x={297.59} base={636.66} size={12} weight={700} color={TEXT_RED}>
            {`DPH (${vat.percent}%):`}
          </Txt>
          <Txt x={523.46} base={633.62} size={12} weight={700} align="right">
            {formatMoney(vat.amount)}
          </Txt>
        </>
      )}
      <View
        style={{
          position: "absolute",
          left: 292.38,
          top: 654.45,
          width: 245.55,
          height: 31.35,
          borderRadius: RADIUS,
          backgroundColor: RED,
        }}
      />
      <Txt x={305.54} base={675.02} size={12} weight={700} color={WHITE}>
        SPOLU
      </Txt>
      <Txt x={523.46} base={675.02} size={12} weight={700} color={WHITE} align="right">
        {formatMoney(invoice.total)}
      </Txt>
      {isFinal && (
        <>
          <Txt x={301.23} base={708.76} size={12} weight={700} color={TEXT_RED}>
            ZAPLATENÝ PREDDAVOK:
          </Txt>
          <Txt x={527.06} base={708.76} size={12} weight={700} align="right">
            {formatMoney(invoice.total)}
          </Txt>
          <Txt x={302.21} base={741.92} size={12} weight={700} color={TEXT_RED}>
            ZOSTÁVA UHRADIŤ:
          </Txt>
          <Txt x={528.06} base={741.92} size={12} weight={700} align="right">
            {formatMoney(0)}
          </Txt>
        </>
      )}

      <Txt x={297.75} base={798.59} size={10} align="center" boxWidth={PAGE.width}>
        Táto faktúra bola automaticky vygenerovaná prostredníctvom platformy frafol.sk.
      </Txt>
    </Page>
  );
};

// One PDF with one page per invoice (e.g. the two payment invoices combined for the customer).
const InvoicePdf = ({ invoices }: { invoices: InvoiceData[] }) => (
  <Document language="sk">
    {invoices.map((invoice, index) => (
      <InvoicePage key={`${invoice.invoiceNumber}-${index}`} invoice={invoice} />
    ))}
  </Document>
);

export default InvoicePdf;
