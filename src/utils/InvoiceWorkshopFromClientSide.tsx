/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { formatDate } from "@/utils/dateFormet";
import { AllImages } from "../../public/assets/AllImages";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: { fontFamily: "Roboto", backgroundColor: "#fafafa", padding: 30 },
  header: { fontSize: 18, textAlign: "center", marginBottom: 30, color: "#ad2b08" },
  headerSection: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  section: { marginBottom: 10 },
  subHeader: { fontSize: 12, fontWeight: "bold", color: "#ad2b08", marginBottom: 5 },
  text: { fontSize: 10, color: "#2c2c2c" },
  textBold: { fontSize: 10, color: "#2c2c2c", fontWeight: "bold" },
  table: { width: "100%", marginTop: 20 },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #ddd", padding: "5px 0" },
  tableCell: { width: "25%", textAlign: "center", fontSize: 10, color: "white" },
  tableCellDark: { width: "25%", textAlign: "center", fontSize: 10, color: "#2c2c2c" },
  highlightText: { fontSize: 12, fontWeight: "bold", color: "#ad2b08" },
  topRightSection: { position: "absolute", top: 30, right: 30, alignItems: "flex-end" },
  image: { width: 200, height: "auto", objectFit: "cover" },
});

const InvoiceWorkshopFromClientSide = ({ record, professional }: { record: any; professional: any }) => {
  const workshop = record.workshopId;
  const client = record.clientId;

  // Street + number, zip code, town (company registered address)
  const professionalAddressParts = [
    professional?.address,
    [professional?.zipCode, professional?.town].filter(Boolean).join(" "),
  ].filter(Boolean);
  const professionalFullAddress =
    professionalAddressParts.length > 0 ? professionalAddressParts.join(", ") : "____";

  const price = workshop?.price || 0;
  const vatAmount = workshop?.vatAmount || 0;
  const mainPrice = workshop?.mainPrice || 0;
  const platformCommission = mainPrice - price - vatAmount;
  const vatPercent = workshop?.vatPercent || (price > 0 ? Math.round((vatAmount / price) * 100) : 0);

  return (
    <Document language="sk">
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>F A K T Ú R A / I N V O I C E</Text>

        <View style={{ ...styles.headerSection, alignItems: "center" }}>
          <Image src={AllImages.logo.src} style={styles.image} />
          <View style={styles.section}>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Číslo faktúry / Invoice number:</Text> {record.orderId}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum vystavenia / Issue date:</Text> {formatDate(record.createdAt)}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum dodania / Date of service delivery:</Text> {formatDate(workshop?.date)}
            </Text>
          </View>
        </View>

        <View style={{ ...styles.headerSection, flexDirection: "column" }}>
          {/* Supplier — Instructor */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>DODÁVATEĽ / SUPPLIER (Instructor)</Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Názov firmy / Company name:</Text> {professional?.companyName || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa sídla / Company address:</Text> {professionalFullAddress}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>IČO / Company ID:</Text> {professional?.ico || "__________"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>DIČ / Tax ID (if company):</Text> {professional?.dic || "__________"}
            </Text>
            {professional?.ic_dph && (
              <Text style={styles.text}>
                <Text style={styles.textBold}>IČ DPH / VAT ID (if VAT payer):</Text> {professional.ic_dph}
              </Text>
            )}
          </View>

          {/* Client — Participant */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>ODBERATEĽ / CLIENT (Participant)</Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Meno / Name or company name:</Text>{" "}
              {record.companyName || client?.name || record.name || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa / Address:</Text> {record.streetAddress || "__________"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>PSČ / Zip code:</Text> {record.zipCode || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Mesto / Town:</Text> {record.town || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Krajina / Country:</Text> {record.country || "____"}
            </Text>
            {record.IC_DPH && (
              <Text style={styles.text}>
                <Text style={styles.textBold}>IČ DPH / VAT ID:</Text> {record.IC_DPH}
              </Text>
            )}
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={{ ...styles.tableRow, backgroundColor: "#ad2b08" }}>
            <Text style={styles.tableCell}>PRODUKT / PRODUCT</Text>
            <Text style={styles.tableCell}>MNOŽSTVO / QTY</Text>
            <Text style={styles.tableCell}>CENA / PRICE</Text>
            <Text style={styles.tableCell}>SPOLU / TOTAL</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCellDark}>{workshop?.title || "Workshop"} / Workshop</Text>
            <Text style={styles.tableCellDark}>1 ks/pc</Text>
            <Text style={styles.tableCellDark}>{price.toFixed(2)}€</Text>
            <Text style={styles.tableCellDark}>{price.toFixed(2)}€</Text>
          </View>

          {platformCommission > 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.tableCellDark}>Servisný poplatok / Service fee</Text>
              <Text style={styles.tableCellDark}>1 ks / pc</Text>
              <Text style={styles.tableCellDark}>{platformCommission.toFixed(2)}€</Text>
              <Text style={styles.tableCellDark}>{platformCommission.toFixed(2)}€</Text>
            </View>
          )}
        </View>

        {/* Totals */}
        <View style={{ ...styles.section, marginTop: 50, alignItems: "flex-end" }}>
          <Text style={{ ...styles.text, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold", color: "#000000" }}>MEDZISÚČET / </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>SUBTOTAL: </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>{(price + platformCommission).toFixed(2)}€</Text>
          </Text>
          {vatAmount > 0 && (
            <Text style={{ ...styles.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold", color: "#000000" }}>DPH ({vatPercent}%) / </Text>
              <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>VAT ({vatPercent}%): </Text>
              <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>{vatAmount.toFixed(2)}€</Text>
            </Text>
          )}
          <Text style={{ ...styles.text, backgroundColor: "#ad2b08", color: "white", padding: 8, paddingLeft: 15, paddingRight: 15, marginTop: 5, fontWeight: "bold", fontSize: 12 }}>
            <Text>SPOLU / TOTAL: </Text>
            <Text>{mainPrice.toFixed(2)}€</Text>
          </Text>
        </View>

        <View style={{ ...styles.section, textAlign: "center", marginTop: 80 }}>
          <Text style={styles.text}>Táto faktúra bola automaticky vygenerovaná prostredníctvom platformy frafol.sk.</Text>
          <Text style={{ ...styles.text, color: "#ad2b08" }}>This invoice was automatically generated via the platform frafol.sk.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceWorkshopFromClientSide;
