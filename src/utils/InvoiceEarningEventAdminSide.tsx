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

const serviceTypeLabel = (type: string) => {
  if (type === "photography") return "Photographer";
  if (type === "videography") return "Videographer";
  return "Both";
};

const InvoiceEarningEventAdminSide = ({ record }: { record: any }) => {
  const eventOrder = record.eventOrderId;
  const provider = record.serviceProviderId;
  const commission = record.commission || 0;

  // Street + number, zip code, town (professional's registered address)
  const providerAddressParts = [
    provider?.address,
    [provider?.zipCode, provider?.town].filter(Boolean).join(" "),
  ].filter(Boolean);
  const providerFullAddress = providerAddressParts.length > 0 ? providerAddressParts.join(", ") : "__________";

  const orderName =
    (eventOrder?.orderType === "custom"
      ? eventOrder?.packageName
      : eventOrder?.packageId?.title) || eventOrder?.title;

  return (
    <Document language="sk">
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>F A K T Ú R A / I N V O I C E</Text>

        <View style={{ ...styles.headerSection, alignItems: "center" }}>
          <Image src={AllImages.logo.src} style={styles.image} />
          <View style={styles.section}>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Číslo faktúry / Invoice number:</Text> {record?.eventOrderId?.orderId}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum vystavenia / Issue date:</Text> {formatDate(record.createdAt)}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum dodania / Date of service delivery:</Text> {formatDate(eventOrder?.date)}
            </Text>
          </View>
        </View>

        <View style={{ ...styles.headerSection, flexDirection: "column" }}>
          {/* Supplier — frafol */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>DODÁVATEĽ / SUPPLIER (frafol)</Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Názov firmy / Company name:</Text> FRAFOL s. r. o.
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa sídla / Company address:</Text> Vysokoškolákov 8556/33B, Žilina 010 08
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>IČO / Company ID:</Text> 57 113 904
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>DIČ / Tax ID:</Text> 2122571286
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>IBAN:</Text> SK3483300000002203424224
            </Text>
          </View>

          {/* Client — Professional */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>
              ODBERATEĽ / CLIENT ({serviceTypeLabel(eventOrder?.serviceType)})
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Názov firmy / Company name:</Text>{" "}
              {provider?.companyName || provider?.name || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa / Address:</Text> {providerFullAddress}
            </Text>
            {provider?.ico && (
              <Text style={styles.text}>
                <Text style={styles.textBold}>IČO / Company ID:</Text> {provider.ico}
              </Text>
            )}
            {provider?.dic && (
              <Text style={styles.text}>
                <Text style={styles.textBold}>DIČ / Tax ID:</Text> {provider.dic}
              </Text>
            )}
            {provider?.ic_dph && (
              <Text style={styles.text}>
                <Text style={styles.textBold}>IČ DPH / VAT ID (if VAT payer):</Text> {provider.ic_dph}
              </Text>
            )}
          </View>
        </View>

        {/* Table — commission only */}
        <View style={styles.table}>
          <View style={{ ...styles.tableRow, backgroundColor: "#ad2b08" }}>
            <Text style={styles.tableCell}>PRODUKT / PRODUCT</Text>
            <Text style={styles.tableCell}>MNOŽSTVO / QTY</Text>
            <Text style={styles.tableCell}>CENA / PRICE</Text>
            <Text style={styles.tableCell}>SPOLU / TOTAL</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCellDark}>{orderName}</Text>
            <Text style={styles.tableCellDark}>1 ks / <Text style={{ color: "#ad2b08" }}>pc</Text></Text>
            <Text style={styles.tableCellDark}>{commission.toFixed(2)}€</Text>
            <Text style={styles.tableCellDark}>{commission.toFixed(2)}€</Text>
          </View>
        </View>

        {/* Totals */}
        <View style={{ ...styles.section, marginTop: 50, alignItems: "flex-end" }}>
          <Text style={{ ...styles.text, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold", color: "#000000" }}>MEDZISÚČET / </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>SUBTOTAL: </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>{commission.toFixed(2)}€</Text>
          </Text>
          <Text style={{ ...styles.text, backgroundColor: "#ad2b08", color: "white", padding: 8, paddingLeft: 15, paddingRight: 15, marginTop: 5, fontWeight: "bold", fontSize: 12 }}>
            <Text>SPOLU / TOTAL: </Text>
            <Text>{commission.toFixed(2)}€</Text>
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

export default InvoiceEarningEventAdminSide;
