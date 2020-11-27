import React, {useEffect} from 'react';

import {
  Row, Col, Layout
  // Input,
} from 'antd';
import Logo from './../../../components/logo/Logo';
import Logopng from './../../../assets/images/Logo.png';
import ReactPDF, {PDFDownloadLink, Document, Page, Text, View, PDFViewer, Image, StyleSheet, Font} from '@react-pdf/renderer';
import Arial from './../../../assets/Fonts/ARIAL.TTF';
import ArialBold from './../../../assets/Fonts/ARIALBD.TTF';

const PurchaseOrderTest = () => {
  const flexProps2 = [40,33,40];
  const borderStyle = 'none';
  const source = './../../../assets/Fonts/ARIAL.TTF'

  Font.register({family: 'Arial',
    src: Arial});
  Font.register({family: 'ArialBold',
    src: ArialBold})

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
              OPC-2020-1721
            </Text>

            <View style={styles.prDoc}>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>
              PR / Doc # :
                </Text>
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>
              0049
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
                Atlas Bolt and Supply
                </Text>
                <Text style={{marginBottom: 2}}>
                Subangdaku, Mandaue City
                </Text>
                <Text style={{marginBottom: 2}}>
                236-4667
                </Text>
                <Text style={{marginBottom: 2}}>
                PDC 30 Days
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
                Engr. Jojo Salamanes
                </Text>
                <Text style={{marginBottom: 2}}>
                GB003
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
      </Page>
    </Document>;

  // Create Document Component
  const PurchaseOrderDocument = () =>
    <Document id="toPrint">
      <Page size="A4" styles={styles.page}>
        <Row style={{marginBottom: 30}}>
        </Row>
        <Row style={{
          marginLeft: '5.0%',
          marginRight: '7%'
        }}>
          <Col span={10} style={{
            textAlign: 'left',
            borderStyle: borderStyle,
            marginLeft: '0%'
          }}>
            <Logo />
          </Col>
          <Col span={1} />
          <Col span={11} style={{
            alignContent: 'start',
            borderStyle: borderStyle,
            textAlign: 'center',
            marginLeft: '7.5%'
          }}>
            <Row style={{
              fontSize: 18,
              borderColor: 'black',
              backgroundColor: '#7f7f7f',
              color: 'white',
              marginTop: 10,
              borderStyle: 'solid',
              borderWidth: 'thin',
              borderBottom: 'none',
              fontFamily: 'Arial',
              fontWeight: 'bold',
              textAlign: 'center',
              height: 25,
              marginBottom: 0
            }}>
              <Col span={24} style={{textAlign: 'center'}}>
                PURCHASE ORDER
              </Col>
            </Row>
            <Row style={{
              borderColor: 'black',
              marginTop: 0,
              fontSize: 13,
              fontFamily: 'Arial',
              textAlign: 'center',
              borderStyle: 'solid',
              borderTop: 'none',
              borderWidth: 'thin',
              marginBottom: 10}}
            >
              <Col span={24} style={{textAlign: 'center',
                color: 'black'}}>
                  OPC-2020-1600
              </Col>
            </Row>
            <Row style={{
              fontFamily: 'Arial',
              fontSize: 13,
              textAlign: 'left',
              borderStyle: borderStyle
            }}>
              <Col span={2}></Col>
              <Col span={10}>
                PR / Doc # :
              </Col>
              <Col span={10}>
            455
              </Col>
              <Col span={2}></Col>
            </Row>
          </Col>
          <Col span={7}>
          </Col>
        </Row>



        <Row style={{marginBottom: 10,
          color: 'black',
          fontFamily: 'Arial'}}>
          <Col span={6}></Col>
          <Col span={4} style={{display: 'block',
            textAlign: 'left',
            marginLeft: '6%',
            borderStyle: borderStyle
          }}>
            <Row style={{marginBottom: 0,
              height: 16}}>
              <Col span={24} style={{fontWeight: 'bold',
                fontFamily: 'Arial',
                letterSpacing: '-0.5px',
                fontSize: 17}}>
              ON POINT CONSTRUCTION
              </Col>
            </Row>
            <Row style={{marginBottom: 0,
              height: 16}}>
              <Col span={24} style={{
                fontFamily: 'Arial',
                textAlign: 'left',
                fontSize: 14}}>
              28A Sanson Road, Lahug
              </Col>
            </Row>
            <Row style={{marginBottom: 0,
              height: 16}}>
              <Col span={24} style={{
                fontFamily: 'Arial',
                fontSize: 14}}>
              Cebu City, Philippines
              </Col>
            </Row>
          </Col>
          <Col span={4} style={{alignContent: 'start',
            borderStyle: borderStyle,
            textAlign: 'left',
            marginLeft: '5%'}}>
            <Row>
              <Col span={24}>
                <br />
              </Col>
            </Row>
            <Row style={{borderStyle: borderStyle}}>
              <Col span={2}></Col>
              <Col span={10}>
                    Order Date:
              </Col>
              <Col span={10}>
                    3/22/2019
              </Col>
              <Col span={2}></Col>
            </Row>
            <Row>
              <Col span={24}>
                <br />
              </Col>
            </Row>
          </Col>
          <Col span={6}></Col>
        </Row>


        <Row style={{color: 'black',
          fontFamily: 'Arial'}}>
          <Col flex={flexProps[0]} style={{borderStyle: borderStyle}}>
          </Col>
          <Col flex={flexProps[1]} style={{borderStyle: 'solid',
            borderWidth: 'thin',
            borderColor: 'black',
            borderTop: 'none'}}>
            <Row style={{marginBottom: 20}}>
              <Col span ={24} style={{
                borderStyle: 'solid',
                borderWidth: 'thin',
                fontFamily: 'Arial',
                fontSize: 14,
                borderColor: 'black',
                backgroundColor: '#EEECE1',
                borderLeft: 'none',
                borderRight: 'none'
              }}>
     VENDOR
              </Col>
            </Row>
            <Row>
              <Col span={2} style={{textAlign: 'start',
                marginLeft: 5}}>
                  Name:
              </Col>
              <Col span={2}>
              </Col>
              <Col span={18} style={{textAlign: 'start',
                marginLeft: 5}}>
                Vic Enterprises
              </Col>
            </Row>
            <Row>
              <Col span={2} style={{textAlign: 'start',
                marginLeft: 5}}>
                  Address:
              </Col>
              <Col span={2}>
              </Col>
              <Col span={18} style={{textAlign: 'start',
                marginLeft: 5}}>
                MJ Cuenco Ave Cebu City
              </Col>
            </Row>
            <Row>
              <Col span={2} style={{textAlign: 'start',
                marginLeft: 5}}>
                  Tel:
              </Col>
              <Col span={2}>
              </Col>
              <Col span={18} style={{textAlign: 'start',
                marginLeft: 5}}>
                412-8502
              </Col>
            </Row>
            <Row style={{marginBottom: 35}}>
              <Col span={2} style={{textAlign: 'start',
                marginLeft: 5}}>
                  Terms:
              </Col>
              <Col span={2}>
              </Col>
              <Col span={18} style={{textAlign: 'start',
                marginLeft: 5}}>
                30 Days
              </Col>
            </Row>
          </Col>
          <Col flex={flexProps[2]} style={{marginLeft: '2.4%',
            borderStyle: 'solid',
            borderWidth: 'thin',
            borderColor: 'black',
            borderTop: 'none'}}>
            <Row style={{marginBottom: 20}}>
              <Col span={24} style={{
                borderStyle: 'solid',
                borderWidth: 'thin',
                fontFamily: 'Arial',
                fontSize: 14,
                borderColor: 'black',
                backgroundColor: '#EEECE1',
                borderLeft: 'none',
                borderRight: 'none'}}>
                    JOB ADDRESS
              </Col>
            </Row>
            <Row>
              <Col span={5} style={{textAlign: 'start',
                marginLeft: 5}}>
                  Req By:
              </Col>
              <Col style={{textAlign: 'start',
                marginLeft: '2.4%'}}>
                Engr. Jojo Salamanes
              </Col>
            </Row>
            <Row>
              <Col span={5} style={{textAlign: 'start',
                marginLeft: 5}}>
                  Project:
              </Col>
              <Col style={{textAlign: 'start',
                marginLeft: '2.4%'}}>
                GB003-BANILAD
              </Col>
            </Row>
            <Row>
              <Col span={5} style={{textAlign: 'start',
                marginLeft: 5}}>
                  Category:
              </Col>
              <Col style={{textAlign: 'start',
                marginLeft: '2.4%'}}>
                II-III.B.2
              </Col>
            </Row>
          </Col>
          <Col flex={flexProps[3]} style={{borderStyle: borderStyle}}/>
        </Row>


        <Row style={{marginTop: 20,
          fontFamily: 'Arial',
          color: 'black'}}>
          <Col span={24} style={{textAlign: 'center',
            fontSize: 15}}>
              PLEASE SUPPLY THE FOLLOWING:
          </Col>
        </Row>

        <Row style={{marginTop: '1%',
          fontFamily: 'Arial',
          color: 'black'}}>
          <Col span={7} style={{borderStyle: borderStyle}}></Col>
          <Col span={10} style={{borderStyle: borderStyle
            ,borderTop: 'solid',
            borderBottom: 'solid',
            borderWidth: 'thin',
            height: '70px'}}>
            <Row style={{marginTop: '3%'}}>
              <Col span={4} style={{borderStyle: borderStyle}}>IT</Col>
              <Col span={11} style={{borderStyle: borderStyle}}>DESCRIPTION</Col>
              <Col span={1} style={{borderStyle: borderStyle}}>QTY</Col>
              <Col span={2} style={{borderStyle: borderStyle}}>UNIT</Col>
              <Col span={3} style={{borderStyle: borderStyle}}>UNIT PRICE</Col>
              <Col span={3} style={{borderStyle: borderStyle}}>TOTAL</Col>
            </Row>
          </Col>
          <Col span={7} style={{borderStyle: borderStyle}}></Col>
        </Row>


        <Row style={{marginTop: '0.5%',
          color: 'black',
          fontFamily: 'Arial'}}>
          <Col span= {7} style={{borderStyle: borderStyle}}></Col>
          <Col span= {10} style={{borderStyle: borderStyle}}>
            {ordersDisplay}
          </Col>
          <Col span={7} style={{borderStyle: borderStyle}}></Col>
        </Row>

        <Row style={{marginTop: '2%',
          marginBottom: '20px',
          color: 'black',
          fontFamily: 'Arial'}}>
          <Col span={14}></Col>
          <Col span={3} style={{borderTop: 'solid',
            borderWidth: 'thin',
            textAlign: 'left'}}>Total Amount <b style={{fontSize: '10',
              fontFamily: 'Arial',
              textAlign: 'right'}}>131,275.00</b></Col>
          <Col span={7}></Col>
        </Row>

        <Row style={{fontFamily: 'Arial',
          color: 'black'}}>
          <Col span={7}>
          </Col>
          <Col span={10}>
            <Row  style={{borderTop: 'solid',
              borderWidth: 'thin'}}>
              <Col span={7} style={{textAlign: 'left'}}>Authorized by:</Col>
              <Col span={9}></Col>
              <Col span={8} style={{textAlign: 'left'}}>Conformed by:</Col>
            </Row>
          </Col>
          <Col span={7}>
          </Col>
        </Row>

        <Row style={{fontFamily: 'Arial',
          color: 'black',
          marginTop: '25px'}}>
          <Col span={7}>
          </Col>
          <Col span={4}>
          Mr. Martin Gerard Tan
          </Col>
        </Row>

        <Row style={{fontFamily: 'Arial',
          color: 'black'}}>
          <Col span={7}>
          </Col>
          <Col span={4}>
        (Signature over printed name)
          </Col>
          <Col span={1}>
          </Col>
          <Col span ={7}>
        (Print name & signature)
          </Col>
        </Row>

        <Row style={{fontFamily: 'Arial',
          color: 'black'}}>
          <Col span={7}>
          </Col>
          <Col span={4} style={{fontWeight: 'bold',
            borderTop: 'solid',
            borderWidth: 'thin'}}>
        On Point Construction
          </Col>
          <Col span={3}>
          </Col>
          <Col span ={3} style={{fontWeight: 'bold',
            borderTop: 'solid',
            borderWidth: 'thin'}}>
        Vendor
          </Col>
        </Row>

        <Row style={{fontFamily: 'Arial',
          color: 'black',
          marginTop: '15px'}}>
          <Col span ={14}></Col>
          <Col span={3}>RR Reference:</Col>
        </Row>

        <Row style={{fontFamily: 'Arial',
          color: 'black'}}>
          <Col span ={14}></Col>
          <Col span={3}>
            <Row>
              <Col span={6}>
            OR#:
              </Col>
              <Col span={6}>
            RR#:
              </Col>
              <Col span={6}>
            Date:
              </Col>
              <Col span={6}>
            By:
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{marginTop: '30px'}}>

        </Row>
      </Page>
    </Document>

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

  const ordersDisplay = orders.map((order, index) =>
    <Row key={order.id} style={{fontFamily: 'Arial',
      color: 'black'}}>
      <Col span={4} style={{borderStyle: borderStyle}}>{index + 1}</Col>
      <Col span={11} style={{textAlign: 'left',
        borderStyle: borderStyle}}>{order.product}</Col>
      <Col span={1} style={{borderStyle: borderStyle}}>{order.quantity}</Col>
      <Col span={2} style={{borderStyle: borderStyle}}>{order.unit}</Col>
      <Col span={3} style={{borderStyle: borderStyle}}>{order.unitPrice}</Col>
      <Col span={3} style={{borderStyle: borderStyle}}>{order.itemTotal}</Col>
    </Row>
  )

  const ordersDisplay2 = orders.map((order, index) =>
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
      <PDFViewer style={styles.pdfViewer}>
        <MyDocument />
      </PDFViewer>
    </>
  )

}

export default PurchaseOrderTest;