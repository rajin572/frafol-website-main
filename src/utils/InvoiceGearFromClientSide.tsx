/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { formatDate } from "@/utils/dateFormet";
import { IGearOrder } from "@/types";
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

const InvoiceGearFromClientSide = ({ currentRecord }: { currentRecord: IGearOrder }) => {
  const gear = currentRecord.gearMarketplaceId;
  const seller = currentRecord.sellerId;

  // Street + number, zip code, town (seller's registered address)
  const sellerAddressParts = [
    seller?.address,
    [seller?.zipCode, seller?.town].filter(Boolean).join(" "),
  ].filter(Boolean);
  const sellerFullAddress = sellerAddressParts.length > 0 ? sellerAddressParts.join(", ") : "____";

  const gearPrice = gear.price || 0;
  const shippingPrice = gear.shippingCompany?.price || 0;
  const totalVatAmount = gear.totalVatAmount || 0;
  const platformCommission = gear.platformCommission || 0;
  const mainPrice = gear.mainPrice || 0;
  const vatPercent = gear.vatAmount || 0;
  const total = mainPrice + shippingPrice;

  return (
    <Document language="sk">
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>F A K T Ú R A / I N V O I C E</Text>

        <View style={{ ...styles.headerSection, alignItems: "center" }}>
          <Image src={AllImages.logo.src} style={styles.image} />
          <View style={styles.section}>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Číslo faktúry / Invoice number:</Text> {currentRecord.orderId}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum vystavenia / Issue date:</Text> {formatDate(currentRecord.createdAt)}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum dodania / Date of service delivery:</Text>{" "}
              {currentRecord.statusTimestamps?.deliveredAt
                ? formatDate(currentRecord.statusTimestamps.deliveredAt)
                : "[dd.mm.yyyy]"}
            </Text>
          </View>
        </View>

        <View style={{ ...styles.headerSection, flexDirection: "column" }}>
          {/* Supplier — Seller */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>DODÁVATEĽ / SUPPLIER (Photographer / Videographer)</Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Meno / Name:</Text> {seller?.name || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Názov firmy / Company name:</Text> {seller?.companyName || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa sídla / Company address:</Text> {sellerFullAddress}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>IČO / Company ID:</Text> {seller?.ico || "__________"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>DIČ / Tax ID (if company):</Text> {seller?.dic || "__________"}
            </Text>
            {seller?.ic_dph && (
              <Text style={styles.text}>
                <Text style={styles.textBold}>IČ DPH / VAT ID (if VAT payer):</Text> {seller.ic_dph}
              </Text>
            )}
          </View>

          {/* Client — Buyer */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>ODBERATEĽ / CLIENT</Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Meno / Name or company name:</Text>{" "}
              {currentRecord.companyName || currentRecord.name || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa / Address:</Text>{" "}
              {currentRecord.shippingAddress || "__________"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>PSČ / Zip code:</Text> {currentRecord.postCode || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Mesto / Town:</Text> {currentRecord.town || "____"}
            </Text>
            {currentRecord.loginAsCompany && (
              <>
                {currentRecord.ico && (
                  <Text style={styles.text}>
                    <Text style={styles.textBold}>IČO / Company ID:</Text> {currentRecord.ico}
                  </Text>
                )}
                {currentRecord.dic && (
                  <Text style={styles.text}>
                    <Text style={styles.textBold}>DIČ / Tax ID:</Text> {currentRecord.dic}
                  </Text>
                )}
                {currentRecord.ic_dph && (
                  <Text style={styles.text}>
                    <Text style={styles.textBold}>IČ DPH / VAT ID:</Text> {currentRecord.ic_dph}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>

        {/* Delivery address */}
        <View style={{ ...styles.section, marginBottom: 20 }}>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Dodacia adresa / Delivery address:</Text>
          </Text>
          <Text style={styles.text}>
            {currentRecord.shippingAddress}, {currentRecord.town}, {currentRecord.postCode}
          </Text>
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
            <Text style={styles.tableCellDark}>{gear.name} / Gear Product</Text>
            <Text style={styles.tableCellDark}>1 ks/pc</Text>
            <Text style={styles.tableCellDark}>{gearPrice.toFixed(2)}€</Text>
            <Text style={styles.tableCellDark}>{gearPrice.toFixed(2)}€</Text>
          </View>

          {shippingPrice > 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.tableCellDark}>
                Doručenie / Shipping ({gear.shippingCompany?.name})
              </Text>
              <Text style={styles.tableCellDark}>1 ks / pc</Text>
              <Text style={styles.tableCellDark}>{shippingPrice.toFixed(2)}€</Text>
              <Text style={styles.tableCellDark}>{shippingPrice.toFixed(2)}€</Text>
            </View>
          )}

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
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>{mainPrice.toFixed(2)}€</Text>
          </Text>
          {totalVatAmount > 0 && (
            <Text style={{ ...styles.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold", color: "#000000" }}>DPH ({vatPercent}%) / </Text>
              <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>VAT ({vatPercent}%): </Text>
              <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>{totalVatAmount.toFixed(2)}€</Text>
            </Text>
          )}
          <Text style={{ ...styles.text, backgroundColor: "#ad2b08", color: "white", padding: 8, paddingLeft: 15, paddingRight: 15, marginTop: 5, fontWeight: "bold", fontSize: 12 }}>
            <Text>SPOLU / TOTAL: </Text>
            <Text>{total.toFixed(2)}€</Text>
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

export default InvoiceGearFromClientSide;
