/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { formatDate } from "@/utils/dateFormet";
import { IProfile } from "@/types";
import { ISubscription, ISubscriptionData } from "@/app/(withDashboardLayout)/dashboard/professional/frafol-choice/page";
import { AllImages } from "../../public/assets/AllImages";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    backgroundColor: "#fafafa",
    padding: 30,
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#ad2b08",
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ad2b08",
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    color: "#2c2c2c",
  },
  textBold: {
    fontSize: 10,
    color: "#2c2c2c",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    padding: "5px 0",
  },
  tableCell: {
    width: "25%",
    textAlign: "center",
    fontSize: 10,
    color: "white",
  },
  tableCellDark: {
    width: "25%",
    textAlign: "center",
    fontSize: 10,
    color: "#2c2c2c",
  },
  image: {
    width: 200,
    height: "auto",
    objectFit: "cover",
  },
});

const InvoiceFrafolChoiceFromClientSide = ({
  myData,
  subscriptionData,
  pack,
}: {
  myData: IProfile;
  subscriptionData: ISubscriptionData;
  pack: ISubscription;
}) => {
  const invoiceNumber = `FC-${pack._id.slice(-8).toUpperCase()}-${new Date().getFullYear()}`;
  const isCompany = !!(myData?.companyName || myData?.ico);
  const today = new Date().toISOString();

  return (
    <Document language="sk">
      <Page size="A4" style={styles.page}>
        {/* Invoice Header */}
        <Text style={styles.header}>F A K T Ú R A / I N V O I C E</Text>

        {/* Logo + Invoice meta */}
        <View style={{ ...styles.headerSection, alignItems: "center" }}>
          <Image src={AllImages.logo.src} style={styles.image} />
          <View style={styles.section}>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Číslo faktúry / Invoice number:</Text> [{invoiceNumber}]
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum vystavenia / Issue date:</Text> {formatDate(today)}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Platnosť do / Valid until:</Text> {formatDate(subscriptionData.subscriptionExpiryDate)}
            </Text>
          </View>
        </View>

        <View style={{ ...styles.headerSection, flexDirection: "column" }}>
          {/* Supplier — Frafol platform (hardcoded) */}
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

          {/* Subscriber — the professional */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>ODBERATEĽ / SUBSCRIBER</Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Meno / Name:</Text>{" "}
              {[myData?.name, myData?.sureName].filter(Boolean).join(" ") || "—"}
            </Text>
            {isCompany && myData?.companyName && (
              <Text style={styles.text}>
                <Text style={styles.textBold}>Názov firmy / Company name:</Text> {myData.companyName}
              </Text>
            )}
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa / Address:</Text>{" "}
              {[myData?.address, myData?.town, myData?.country].filter(Boolean).join(", ") || "—"}
            </Text>
            {isCompany && (
              <>
                {myData?.ico && (
                  <Text style={styles.text}>
                    <Text style={styles.textBold}>IČO / Company ID:</Text> {myData.ico}
                  </Text>
                )}
                {myData?.dic && (
                  <Text style={styles.text}>
                    <Text style={styles.textBold}>DIČ / Tax ID:</Text> {myData.dic}
                  </Text>
                )}
                {myData?.ic_dph && (
                  <Text style={styles.text}>
                    <Text style={styles.textBold}>IČ DPH / VAT ID:</Text> {myData.ic_dph}
                  </Text>
                )}
              </>
            )}
            <Text style={styles.text}>
              <Text style={styles.textBold}>Email:</Text> {myData?.email || "—"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Phone:</Text> {myData?.phone || "—"}
            </Text>
          </View>
        </View>

        {/* Product/Service Table */}
        <View style={styles.table}>
          <View style={{ ...styles.tableRow, backgroundColor: "#ad2b08" }}>
            <Text style={styles.tableCell}>PRODUKT / PRODUCT</Text>
            <Text style={styles.tableCell}>MNOŽSTVO / QTY</Text>
            <Text style={styles.tableCell}>CENA / PRICE</Text>
            <Text style={styles.tableCell}>SPOLU / TOTAL</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCellDark}>
              {pack.title || "Frafol Choice"} / Subscription ({pack.duration} days)
            </Text>
            <Text style={styles.tableCellDark}>1 ks/pc</Text>
            <Text style={styles.tableCellDark}>{pack.price.toFixed(2)}€</Text>
            <Text style={styles.tableCellDark}>{pack.price.toFixed(2)}€</Text>
          </View>
        </View>

        {/* Subtotal and Total */}
        <View style={{ ...styles.section, marginTop: 50, alignItems: "flex-end" }}>
          <Text style={{ ...styles.text, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold", color: "#000000" }}>MEDZISÚČET / </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>SUBTOTAL: </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>{pack.price.toFixed(2)}€</Text>
          </Text>
          <Text style={{ ...styles.text, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold", color: "#000000" }}>DPH (0%) / </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>VAT (0%): </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>0.00€</Text>
          </Text>
          <Text
            style={{
              ...styles.text,
              backgroundColor: "#ad2b08",
              color: "white",
              padding: 8,
              paddingLeft: 15,
              paddingRight: 15,
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            <Text>SPOLU / TOTAL: </Text>
            <Text>{pack.price.toFixed(2)}€</Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={{ ...styles.section, textAlign: "center", marginTop: 80 }}>
          <Text style={styles.text}>
            Táto faktúra bola automaticky vygenerovaná prostredníctvom platformy frafol.sk.
          </Text>
          <Text style={{ ...styles.text, color: "#ad2b08" }}>
            This invoice was automatically generated via the platform frafol.sk.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceFrafolChoiceFromClientSide;
