import React, {useEffect} from 'react'
import Logopng from './../../../assets/images/Logo.png';
import {Document, Page, Text, View, PDFViewer, Image, StyleSheet, Font} from '@react-pdf/renderer';
import Arial from './../../../assets/Fonts/ARIAL.TTF';
import ArialBold from './../../../assets/Fonts/ARIALBD.TTF';

const PurchaseOrderTestModal = (props) => {

  Font.register({family: 'Arial',
    src: Arial});
  Font.register({family: 'ArialBold',
    src: ArialBold})

  const {purchaseOrder, vendor} = props;

  useEffect(() => {
  }, [purchaseOrder, vendor])

  const flexProps = [11,1.5,9.8];
  const flexProps3 = [1,10,60,12,12,18,14,1];
  const styles = StyleSheet.create({
    page: {
      display: 'grid',
      marginTop: 70,
      paddingTop: 35,
      fontFamily: 'Arial',
      paddingBottom: 65,
      paddingHorizontal: 35
    },
    image: {
      paddingRight: 30,
      marginRight: 40
    },
    firstRow: {
      flexDirection: 'row'
    },
    pdfViewer: {
      height: '11in',
      width: '8.5in'
    },
    flexOne: {
      flex: 1
    },
    purchaseOrderText: {
      borderStyle: 'solid',
      color: 'white',
      fontSize: 12,
      fontFamily: 'ArialBold',
      backgroundColor: '#7f7f7f',
      borderWidth: '1',
      height: '20px',
      marginTop: 5,
      textAlign: 'center'
    },
    purchaseOrderNo: {
      textAlign: 'center',
      fontFamily: 'Arial',
      fontSize: 10,
      height: '15px',
      borderStyle: 'solid',
      borderWidth: '1',
      borderTopWidth: '0',
      fontWeight: 'bold'
    },
    prDoc: {
      flexDirection: 'row',
      fontFamily: 'Arial',
      marginTop: 10
    },
    centerText: {
      fontSize: 10,
      textAlign: 'center'
    },
    secondRow: {
      flexDirection: 'row'
    },
    middleMargins: {
      flex: 1,
      marginVertical: 18
    }
  });

  const MyDocument = () =>
    <Document>
      <Page size="Letter" style={styles.page}>

        <View style={styles.firstRow}>

          <View style={{flex: flexProps[0]}}>
            <Image src={Logopng} style={styles.image} />
          </View>

          <View style={{flex: flexProps[1]}}>

          </View>

          <View style={{flex: flexProps[2],
            alignContent: 'center'}}>
            <Text style={{
              padding: '1',
              justifyContent: 'center',
              fontSize: 14,
              fontFamily: 'ArialBold',
              borderStyle: 'solid',
              textAlign: 'center',
              color: 'white',
              height: '20px',
              backgroundColor: '#7f7f7f',
              borderColor: 'black',
              borderWidth: '1'
            }}>
            PURCHASE ORDER
            </Text>
            <Text style={styles.purchaseOrderNo}>
              {purchaseOrder[0].purchaseOrderNo}
            </Text>

            <View style={styles.prDoc}>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>
              PR / Doc # :
                </Text>
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>
                  {purchaseOrder[0].purchaseRequestNo}
                </Text>
              </View>
            </View>

          </View>

        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: flexProps[0]}}>
            <View>
              <Text style={{fontFamily: 'ArialBold',
                fontSize: 12}}>
              ON POINT CONSTRUCTION
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 10}}>
            28 A Sanson Road, Lahug
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 10}}>
              Cebu City, Philippines
              </Text>
            </View>
          </View>

          <View style={{flex: flexProps[1]}} />

          <View style={{flex: flexProps[2],
            textAlign: 'center'}}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flex: 1}}>
                <Text style={{color: 'white',
                  fontSize: 10}}>
                _
                </Text>
              </View>
              <View style={{flex: 2,
                flexDirection: 'row'
              }}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 10}}>
              Order Date:
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 10}}>
              12/12/2018
                  </Text>
                </View>
              </View>
            </View>
          </View>

        </View>

        <View style={{flexDirection: 'row',
          marginTop: 20}}>

          <View style= {{flex: flexProps[0],
            fontFamily: 'Arial',
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: '1',
            fontSize: 10}}>
            <View style={{flex: 1,
              height: '15px',
              backgroundColor: '#eeece1',
              borderWidth: '1',
              borderStyle: 'solid',
              borderLeftWidth: '0',
              borderRightWidth: '0',
              borderTopWidth: '0'}}>
              <Text style={{textAlign: 'center',
                fontSize: 10}}>
              VENDOR
              </Text>
            </View>

            <View style={{flexDirection: 'row',
              marginTop: 10,
              marginBottom: 30,
              marginLeft: 5}}>
              <View style={{flex: 1}}>
                <Text style={{marginBottom: 2}}>
              Name:
                </Text>
                <Text style={{marginBottom: 2}}>
                Address:
                </Text>
                <Text style={{marginBottom: 2}}>
                Tel:
                </Text>
                <Text style={{marginBottom: 2}}>
                Terms:
                </Text>
              </View>

              <View style={{flex: 3}}>
                <Text style={{marginBottom: 2}}>
                  {vendor.vendorName}
                </Text>
                <Text style={{marginBottom: 2}}>
                  {vendor.location}
                </Text>
                <Text style={{marginBottom: 2}}>
                  {vendor.telNo}
                </Text>
                <Text style={{marginBottom: 2}}>
                  {vendor.terms}
                </Text>
              </View>
            </View>

          </View>

          <View style={{flex: flexProps[1]}}>

          </View>


          <View style={{flex: flexProps[2],
            borderStyle: 'solid',
            borderWidth: '1',
            fontSize: 10}}>

            <View style={{borderStyle: 'solid',
              backgroundColor: '#eeece1',
              borderWidth: '1',
              height: '15px',
              borderLeftWidth: '0',
              borderRightWidth: '0',
              borderTopWidth: '0'}}>
              <Text style={{textAlign: 'center',
                fontSize: 10}}>
                  JOB ADDRESS
              </Text>
            </View>
            <View style={{flexDirection: 'row',
              marginTop: 10,
              marginLeft: 5}}>
              <View style={{flex: 1}}>
                <Text style={{marginBottom: 2}}>
              Req By:
                </Text>
                <Text style={{marginBottom: 2}}>
                Project:
                </Text>
                <Text style={{marginBottom: 2}}>
                Category:
                </Text>

              </View>

              <View style={{flex: 3}}>
                <Text style={{marginBottom: 2}}>
                  {purchaseOrder[0].requestedBy}
                </Text>
                <Text style={{marginBottom: 2}}>
                  {purchaseOrder[0].project}
                </Text>
                <Text style={{marginBottom: 2}}>

                </Text>

              </View>
            </View>
          </View>


        </View>

        <View style={{marginTop: 20}}>
          <Text style={{textAlign: 'center',
            fontSize: 10}}>
            PLEASE SUPPLY THE FOLLOWING:
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row',
            fontFamily: 'Arial',
            fontSize: 10,
            borderStyle: 'solid',
            textAlign: 'center',
            height: '50px',
            borderTopWidth: '1',
            borderBottomWidth: '1'}}>
            <View style={{flex: flexProps3[0]}}>
            </View>
            <View style={{flex: flexProps3[1],
              marginVertical: 18}}>
              <Text>
                IT
              </Text>
            </View>
            <View style={{flex: flexProps3[2],
              marginVertical: 18}}>
              <Text>
                DESCRIPTION
              </Text>
            </View>
            <View style={{flex: flexProps3[3],
              marginVertical: 18}}>
              <Text>
                QTY
              </Text>
            </View>
            <View style={{flex: flexProps3[4],
              marginVertical: 18}}>
              <Text>
                UNIT
              </Text>
            </View>
            <View style={{flex: flexProps3[5],
              marginVertical: 18}}>
              <Text>
                UNIT PRICE
              </Text>
            </View>
            <View style={{flex: flexProps3[6],
              marginVertical: 18}}>
              <Text>
                TOTAL
              </Text>
            </View>
            <View style={{flex: flexProps3[7]}}>
            </View>
          </View>
        </View>

        <View style={{marginTop: 15}}>
          {ordersDisplay2}
        </View>

        <View>
          <View style={{fontFamily: 'Arial',
            fontSize: 10,
            textAlign: 'center',
            flexDirection: 'row'}}>
            <View style={{flex: flexProps3[0]}}>
            </View>
            <View style={{flex: flexProps3[1]}}>
              <Text></Text>
            </View>
            <View style={{flex: flexProps3[2],
              textAlign: 'left',
              marginLeft: 20}}>
              <Text></Text>
            </View>
            <View style={{flex: flexProps3[3]}}>
              <Text></Text>
            </View>
            <View style={{flex: flexProps3[4]}}>
              <Text></Text>
            </View>
            <View style={{flex: flexProps3[5]}}>
              <Text></Text>
            </View>
            <View style={{flex: flexProps3[6]}}>
              <Text>---</Text>
            </View>
            <View style={{flex: flexProps3[7]}}>
            </View>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 5}}>
              <Text style={{color: 'white'}}>
              _
              </Text>
            </View>

            <View style={{
              borderStyle: 'solid',
              borderTopWidth: 1,
              flex: 2,
              flexDirection: 'row'
            }}>
              <View style={{flex: 7,
                marginLeft: 10,
                marginTop: 5}}>
                <Text style={{fontFamily: 'Arial',
                  fontSize: 10}}>
              Total Amount
                </Text>
              </View>
              <View style={{flex: 4,
                marginTop: 5}}>
                <Text style={{fontFamily: 'Arial',
                  fontSize: 10}}>
                1,275.00
                </Text>
              </View>
            </View>

          </View>
        </View>

        <View>
          <View style={{borderStyle: 'solid',
            borderTopWidth: 1,
            marginTop: 15}}>
          </View>
        </View>

        <View>
          <View style={{flexDirection: 'row',
            fontFamily: 'Arial',
            fontSize: 10}}>
            <View style={{flex: 11,
              marginLeft: 5}}>
              <Text>
                  Authorized by:
              </Text>
            </View>
            <View style={{flex: 5}}>
              <Text>
                  Conformed by:
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 6}}>
              <Text style={{fontSize: 10,
                fontFamily: 'Arial',
                textAlign: 'center'}}>
              Mr. Martin Gerard Tan
              </Text>
            </View>
            <View style={{flex: 9}}>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row',
          fontFamily: 'Arial',
          textAlign: 'center',
          fontSize: 10}}>
          <View style={{flex: 6}}>
            <Text>
                (Signature over printed name)
            </Text>
          </View>
          <View style={{flex: 4}}>

          </View>
          <View style={{flex: 5}}>
            <Text>
                (Print name & signature)
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row',
          fontFamily: 'ArialBold',
          textAlign: 'center',
          fontSize: 10}}>
          <View style={{flex: 6,
            borderStyle: 'solid',
            borderTopWidth: 1}}>
            <Text>
                On Point Construction
            </Text>
          </View>
          <View style={{flex: 4}}>

          </View>
          <View style={{flex: 5,
            borderStyle: 'solid',
            borderTopWidth: 1}}>
            <Text>
                Vendor
            </Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 10}}>
              <Text style={{fontSize: 10,
                fontFamily: 'Arial',
                textAlign: 'center'}}>
              </Text>
            </View>
            <View style={{flex: 5}}>
              <Text style={{fontSize: 10,
                fontFamily: 'Arial',
                textAlign: 'center'}}>
                  RR Reference:
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 10}}>
              <Text style={{fontSize: 10,
                fontFamily: 'Arial',
                textAlign: 'center'}}>
              </Text>
            </View>
            <View style={{flex: 5,
              flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontFamily: 'Arial',
                  fontSize: 10,
                  textAlign: 'center'}}>
                    OR#:
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontFamily: 'Arial',
                  fontSize: 10,
                  textAlign: 'center'}}>
                    RR#:
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontFamily: 'Arial',
                  fontSize: 10,
                  textAlign: 'center'}}>
                    Date:
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontFamily: 'Arial',
                  fontSize: 10,
                  textAlign: 'center'}}>
                   By:
                </Text>
              </View>
            </View>
          </View>
        </View>

      </Page>
    </Document>;

  // Create Document Component

  const orders = [];
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 1,
    itemTotal: 6750,
    product: 'GI Tie Wire #16',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 2,
    itemTotal: 6750,
    product: 'Pan Head Screw 1/2',
    quantity: 1500,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 3,
    itemTotal: 6750,
    product: 'Republic Portland Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 4,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 5,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 6,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 7,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 8,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })

  const ordersDisplay2 = purchaseOrder.orders.map((order, index) =>
    <View key={order.id} style={{fontFamily: 'Arial',
      fontSize: 10,
      textAlign: 'center',
      flexDirection: 'row'}}>
      <View style={{flex: flexProps3[0]}}>
      </View>
      <View style={{flex: flexProps3[1]}}>
        <Text>{index + 1}</Text>
      </View>
      <View style={{flex: flexProps3[2],
        textAlign: 'left',
        marginLeft: 20}}>
        <Text>{order.product}</Text>
      </View>
      <View style={{flex: flexProps3[3]}}>
        <Text>{order.quantity}</Text>
      </View>
      <View style={{flex: flexProps3[4]}}>
        <Text>{order.unit}</Text>
      </View>
      <View style={{flex: flexProps3[5]}}>
        <Text>{order.unitPrice}</Text>
      </View>
      <View style={{flex: flexProps3[6]}}>
        <Text>{order.itemTotal}</Text>
      </View>
      <View style={{flex: flexProps3[7]}}>
      </View>
    </View>
  )
  return (
    <>
      <PDFViewer style={styles.page} size="A4">
        <MyDocument />
      </PDFViewer>
    </>
  )

}

export default PurchaseOrderTestModal;