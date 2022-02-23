import React from "react";
import Logopng from "./../../../assets/images/Logo.jpg";
import Arial from "./../../../assets/Fonts/ARIAL.TTF";
import ArialBold from "./../../../assets/Fonts/ARIALBD.TTF";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const PurchaseOrderGasDoc = () => {
  Font.register({ family: "Arial", src: Arial });
  Font.register({ family: "ArialBold", src: ArialBold });

  const styles = StyleSheet.create({
    page: {
      display: "grid",
      marginTop: 30,
      paddingTop: 35,
      fontFamily: "Arial",
      paddingHorizontal: 35,
    },
    image: {
      paddingRight: 30,
      marginRight: 40,
    },
    firstRow: {
      flexDirection: "row",
    },
    pdfViewer: {
      height: "13in",
      width: "8.5in",
    },
    flexOne: {
      flex: 1,
    },
    purchaseOrderText: {
      borderStyle: "solid",
      color: "white",
      fontSize: 12,
      fontFamily: "ArialBold",
      backgroundColor: "#7f7f7f",
      borderWidth: "1",
      height: "20px",
      marginTop: 5,
      textAlign: "center",
    },
    purchaseOrderNo: {
      textAlign: "center",
      fontFamily: "Arial",
      fontSize: 10,
      height: "15px",
      borderStyle: "solid",
      borderWidth: "1",
      borderTopWidth: "0",
      fontWeight: "bold",
    },
    prDoc: {
      flexDirection: "row",
      fontFamily: "Arial",
      marginTop: 10,
    },
    centerText: {
      fontSize: 10,
      textAlign: "center",
    },
    secondRow: {
      flexDirection: "row",
    },
    middleMargins: {
      flex: 1,
      marginVertical: 18,
    },
  });

  return (
    <>
      <Document>
        <Page size="Folio" styles={styles.page}>


          <View>
            <View>
              <Image source={Logopng} style={styles.image} />
            </View>
            <View></View>
            <View>
              <View>
                
              </View>
            </View>
           
          </View>

          <View>
            <View>
              <Text>
                ON POINT CONSTRUCTION
              </Text>
            </View>
            <View></View>
            <View>
              <Text>
                PR / DOC NO: 2312
              </Text>
            </View>
          </View>


        </Page>
      </Document>
    </>
  );
};

export default PurchaseOrderGasDoc;
