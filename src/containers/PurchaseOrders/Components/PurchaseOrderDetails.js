import React, { useState, useEffect } from 'react';
import { Row, Col, Switch, Modal, Spin, Select } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Logo from '../../../components/logo/Logo';
import * as actions from '../../../store/purchaseorders/actions/Actions';
import * as uiActions from '../../../store/ui/actions/Actions';
import Arial from "./../../../assets/Fonts/ARIAL.TTF";
import ArialBold from "./../../../assets/Fonts/ARIALBD.TTF";
import { RightOutlined } from '@ant-design/icons';
import Logopng from "./../../../assets/images/Logo.jpg";
import moment from "moment";
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

const PurchaseOrderDetails = (props) => {
  const { purchaseOrder, vendor, orders, project } = props;

  const dispatcher = useDispatch();

  const borderStyle = "none";
  const flexProps = [11, 1.5, 9.8];
  const flexProps3 = [1, 10, 60, 12, 12, 18, 14, 1];

  // Font.register({ family: "Arial", src: Arial });
  // Font.register({ family: "ArialBold", src: ArialBold });

  const { openModal1 } = useSelector(({ ui }) => ({
    openModal1: ui.openModal1
  }), shallowEqual);

  console.log(purchaseOrder);

  const displayOrders = orders.map((order, index) => 
    <Row key={"div" + index} style={{marginLeft: '5%', marginRight: '7%', fontSize: 11}}>
      <Col span={1}>
        {index + 1}
      </Col>
      <Col span={7} style={{textAlign: 'center'}}>
        {order.product}
      </Col>
      <Col span={2}>
        {order.quantity.toFixed(2)}
      </Col>
      <Col span={2}>
        {order.quantity_received.toFixed(2)}
      </Col>
      <Col span={1}>
        {order.unit}
      </Col>
      <Col span={3} style={{textAlign: 'center'}}>
        {order.unit_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
      </Col>
      <Col span={3} style={{textAlign: 'right'}}>
        {order.total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
      </Col>
      <Col span={4}>
        {order.category}
      </Col>

    </Row>

  )

  const onCancelClicked = () => {
    dispatcher(uiActions.setOpenModal1(false));
  }

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



  const MyDocument = () => (
    <Document>
      <Page size="Folio" style={styles.page}>
        <View style={styles.firstRow}>
          <View style={{ flex: flexProps[0] }}>
            {/* <Image src={Logopng} style={styles.image} /> */}
          </View>

          <View style={{ flex: flexProps[1] }}></View>

          <View style={{ flex: flexProps[2], alignContent: "center" }}>
            <Text
              style={{
                padding: "1",
                justifyContent: "center",
                fontSize: 14,
                fontFamily: "ArialBold",
                borderStyle: "solid",
                textAlign: "center",
                color: "white",
                height: "20px",
                backgroundColor: "#7f7f7f",
                borderColor: "black",
                borderWidth: "1",
              }}
            >
              PURCHASE ORDER
            </Text>
            <Text style={styles.purchaseOrderNo}>
              {purchaseOrder.purchaseOrderNo}
            </Text>

            <View style={styles.prDoc}>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>PR / Doc # :</Text>
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>
                  {purchaseOrder.purchaseRequestNo}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: flexProps[0] }}>
            <View>
              <Text style={{ fontFamily: "ArialBold", fontSize: 8 }}>
                ON POINT CONSTRUCTION AND DEVELOPMENT CORPORATION
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>3rd fl. SPC Bldg., One Paseo Compound</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>Paseo Saturnino St., Banilad</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>Cebu City, Philippines 6000</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>
                onpointconstruction.ph@gmail.com
              </Text>
            </View>
          </View>

          <View style={{ flex: flexProps[1] }} />

          <View style={{ flex: flexProps[2], textAlign: "center" }}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "white", fontSize: 10 }}>_</Text>
              </View>
              <View style={{ flex: 2, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10 }}>Order Date:</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10 }}>
                    {`${moment(new Date()).format("L")}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View
            style={{
              flex: flexProps[0],
              fontFamily: "Arial",
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "1",
              fontSize: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                height: "15px",
                backgroundColor: "#eeece1",
                borderWidth: "1",
                borderStyle: "solid",
                borderLeftWidth: "0",
                borderRightWidth: "0",
                borderTopWidth: "0",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 10 }}>VENDOR</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 2 }}>Name:</Text>
                <Text style={{ marginBottom: 2 }}>Address:</Text>
                <Text style={{ marginBottom: 2 }}>Tel:</Text>
                <Text style={{ marginBottom: 2 }}>Terms:</Text>
              </View>

              {/* <View style={{ flex: 3 }}>
                <Text style={{ marginBottom: 2 }}>{vendor.name}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.location}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.tel_no}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.terms}</Text>
              </View> */}
            </View>
          </View>

          <View style={{ flex: flexProps[1] }}></View>

          <View
            style={{
              flex: flexProps[2],
              borderStyle: "solid",
              borderWidth: "1",
              fontSize: 10,
            }}
          >
            <View
              style={{
                borderStyle: "solid",
                backgroundColor: "#eeece1",
                borderWidth: "1",
                height: "15px",
                borderLeftWidth: "0",
                borderRightWidth: "0",
                borderTopWidth: "0",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 10 }}>
                JOB ADDRESS
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginLeft: 5 }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 2 }}>Req By:</Text>
                <Text style={{ marginBottom: 2 }}>Project:</Text>
                <Text style={{ marginBottom: 2 }}>Category:</Text>
              </View>

              <View style={{ flex: 3 }}>
                <Text style={{ marginBottom: 2 }}>
                  {purchaseOrder.requestedBy}
                </Text>
                <Text style={{ marginBottom: 2 }}>{project}</Text>
                <Text style={{ marginBottom: 2 }}></Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 10 }}>
            PLEASE SUPPLY THE FOLLOWING:
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              fontFamily: "Arial",
              fontSize: 10,
              borderStyle: "solid",
              textAlign: "center",
              height: "50px",
              borderTopWidth: "1",
              borderBottomWidth: "1",
            }}
          >
            <View style={{ flex: flexProps3[0] }}></View>
            <View style={{ flex: flexProps3[1], marginVertical: 18 }}>
              <Text>IT</Text>
            </View>
            <View style={{ flex: flexProps3[2], marginVertical: 18 }}>
              <Text>DESCRIPTION</Text>
            </View>
            <View style={{ flex: flexProps3[3], marginVertical: 18 }}>
              <Text>QTY</Text>
            </View>
            <View style={{ flex: flexProps3[4], marginVertical: 18 }}>
              <Text>UNIT</Text>
            </View>
            <View style={{ flex: flexProps3[5], marginVertical: 18 }}>
              <Text>UNIT PRICE</Text>
            </View>
            <View style={{ flex: flexProps3[6], marginVertical: 18 }}>
              <Text>TOTAL</Text>
            </View>
            <View style={{ flex: flexProps3[7] }}></View>
          </View>
        </View>
      </Page>
    </Document>
  )


  return (
    <Modal visible={openModal1}
      onCancel={onCancelClicked}
      style={{minWidth: "210mm"}}
     >
      <Row>
        <Col
          style={{
            marginTop: 20,
            width: "210mm",
            marginBottom: 20,
          }}
        >
          <div>
            <Row>
              <h3
                style={{
                  marginLeft: 10,
                  color: " #FF111B",
                  fontWeight: "bold",
                }}
              >
                Purchase Order Details
              </h3>
            </Row>
            <Row style={{ marginBottom: 2 }}></Row>
              <div
                id="divToPrint"
                style={{
                  minWidth: "210mm",
                  minHeight: "297mm",
                  justifyContent: "center",
                }}
              >
                <Row style={{ marginBottom: 25 }}></Row>

                <Row
                  style={{
                    marginLeft: "5.0%",
                    marginRight: "7%",
                  }}
                >
                  <Col
                    span={10}
                    style={{
                      textAlign: "left",
                      borderStyle: borderStyle,
                      marginLeft: "0%",
                    }}
                  >
                    <Logo />
                  </Col>
                  <Col span={1} />
                  <Col
                    span={11}
                    style={{
                      alignContent: "start",
                      borderStyle: borderStyle,
                      textAlign: "center",
                      marginLeft: "7.5%",
                    }}
                  >
                    <Row
                      style={{
                        fontSize: 18,
                        borderColor: "black",
                        backgroundColor: "#7f7f7f",
                        color: "white",
                        marginTop: 10,
                        borderStyle: "solid",
                        borderWidth: "thin",
                        borderBottom: "none",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        textAlign: "center",
                        height: 25,
                        marginBottom: 0,
                      }}
                    >
                      <Col span={24} style={{ textAlign: "center" }}>
                        PURCHASE ORDER
                      </Col>
                    </Row>
                    <Row
                      style={{
                        borderColor: "black",
                        marginTop: 0,
                        fontSize: 13,
                        fontFamily: "Arial",
                        textAlign: "center",
                        borderStyle: "solid",
                        borderTop: "none",
                        borderWidth: "thin",
                        marginBottom: 10,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          textAlign: "left",
                          color: "black",
                        }}
                      >
                        <Row>
                          <Col span={7} style={{ textAlign: "right" }}>
                          </Col>
                          <Col span={1} />
                          <Col span={10}>
                          {purchaseOrder.purchase_order_number}
                          </Col>
                          <Col span={5}>
                           
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        fontFamily: "Arial",
                        fontSize: 13,
                        color: "black",
                        textAlign: "left",
                        marginLeft: "4%",
                        borderStyle: borderStyle,
                      }}
                    >
                      <Col span={10}>PR / Doc # :</Col>
                      <Col
                        span={10}
                        style={{
                          textAlign: "center",
                          marginLeft: "5%",
                        }}
                      >
                        {purchaseOrder.purchaseRequestNumber}
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row
                  style={{
                    marginBottom: 10,
                    color: "black",
                    fontFamily: "Arial",
                  }}
                >
                  <Col
                    span={10}
                    style={{
                      display: "block",
                      textAlign: "left",
                      marginLeft: "5%",
                      borderStyle: borderStyle,
                    }}
                  >
                    <Row
                      style={{
                        marginBottom: 0,
                        height: 16,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Arial",
                          letterSpacing: "-0.5px",
                          fontSize: 17,
                        }}
                      >
                        ON POINT CONSTRUCTION
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginBottom: 0,
                        height: 16,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          fontFamily: "Arial",
                          textAlign: "left",
                          fontSize: 14,
                        }}
                      >
                        28A Sanson Road, Lahug
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginBottom: 0,
                        height: 16,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          fontFamily: "Arial",
                          fontSize: 14,
                        }}
                      >
                        Cebu City, Philippines
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1} />
                  <Col
                    span={10}
                    style={{
                      alignContent: "start",
                      borderStyle: borderStyle,
                      textAlign: "left",
                    }}
                  >
                    <Col span={1}></Col>
                    <Row>
                      <Col span={24}>
                        <br />
                      </Col>
                    </Row>
                    <Row style={{ borderStyle: borderStyle }}>
                      <Col span={10} style={{ marginLeft: "6%" }}>
                        Order Date:
                      </Col>
                      <Col span={10} style={{ textAlign: "center" }}>
                        {`${moment(purchaseOrder.date_created).format("L")}`}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <br />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row
                  style={{
                    color: "black",
                    fontFamily: "Arial",
                  }}
                >
                  <Col
                    span={10}
                    style={{
                      borderStyle: "solid",
                      borderWidth: "thin",
                      marginLeft: "5%",
                      textAlign: "center",
                      borderColor: "black",
                      borderTop: "none",
                    }}
                  >
                    <Row
                      style={{
                        marginBottom: 20,
                        borderStyle: borderStyle,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          borderStyle: "solid",
                          borderWidth: "thin",
                          fontFamily: "Arial",
                          fontSize: 14,
                          borderColor: "black",
                          backgroundColor: "#EEECE1",
                          borderLeft: "none",
                          borderRight: "none",
                        }}
                      >
                        VENDOR
                      </Col>
                    </Row>
                    <Row style={{ borderStyle: borderStyle }}>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Name:
                      </Col>
                      <Col span={1}></Col>
                      <Col
                        span={17}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                          borderStyle: borderStyle,
                        }}
                      >
                        {vendor.name}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Address:
                      </Col>
                      <Col span={1}></Col>
                      <Col
                        span={17}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        {vendor.location}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Tel:
                      </Col>
                      <Col span={1}></Col>
                      <Col
                        span={17}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        {vendor.tel_no}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 30 }}>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Terms:
                      </Col>
                      <Col span={1}></Col>
                      <Col
                        span={17}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        {vendor.terms}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1} style={{ borderStyle: borderStyle }} />
                  <Col
                    flex={11}
                    style={{
                      marginLeft: "1%",
                      borderStyle: "solid",
                      borderWidth: "thin",
                      borderColor: "black",
                      marginRight: "2%",
                      borderTop: "none",
                    }}
                  >
                    <Row
                      style={{
                        marginBottom: 20,
                        borderStyle: borderStyle,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          borderStyle: "solid",
                          borderWidth: "thin",
                          fontFamily: "Arial",
                          fontSize: 14,
                          textAlign: "center",
                          borderColor: "black",
                          backgroundColor: "#EEECE1",
                          borderLeft: "none",
                          borderRight: "none",
                        }}
                      >
                        JOB ADDRESS
                      </Col>
                    </Row>
                    <Row style={{ borderStyle: borderStyle }}>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Req By:
                      </Col>
                      <Col
                        style={{
                          textAlign: "start",
                          marginLeft: "2.4%",
                        }}
                      >
                        {purchaseOrder.requested_by}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Project:
                      </Col>
                      <Col
                        style={{
                          textAlign: "start",
                          marginLeft: "2.4%",
                        }}
                      >
                        {purchaseOrder.project}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        span={6}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Category:
                      </Col>
                      <Col
                        style={{
                          textAlign: "start",
                          marginLeft: "2.4%",
                        }}
                      ></Col>
                    </Row>
                  </Col>
                  <Col span={1} style={{ marginRight: 10 }}></Col>
                </Row>

                <Row
                  style={{
                    marginTop: 20,
                    fontFamily: "Arial",
                    color: "black",
                  }}
                >
                  <Col
                    span={24}
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                    }}
                  >
                    PLEASE SUPPLY THE FOLLOWING:
                  </Col>
                </Row>

                <Row
                  style={{
                    marginTop: "1%",
                    fontFamily: "Arial",
                    fontSize: 11,
                    color: "black",
                    borderTop: "solid",
                    marginLeft: "5%",
                    marginRight: "7%",
                    borderBottom: "solid",
                    borderWidth: "thin",
                    height: "70px",
                  }}
                >
                  <Col span={1} style={{ borderStyle: borderStyle }}></Col>
                  <Col
                    span={20}
                    style={{
                      borderStyle: borderStyle,
                    }}
                  >
                    <Row style={{ marginTop: "3%" }}>
                      <Col span={1} style={{ borderStyle: borderStyle }}>
                        IT
                      </Col>
                      <Col
                        span={7}
                        style={{
                          borderStyle: borderStyle,
                          textAlign: "center",
                        }}
                      >
                        DESCRIPTION
                      </Col>
                      <Col span={2} style={{ borderStyle: borderStyle }}>
                        QTY
                      </Col>
                      <Col span={2} style={{ borderStyle: borderStyle }}>
                        QTY REC
                      </Col>
                      <Col span={1} style={{ borderStyle: borderStyle }}>
                        Unit
                      </Col>
                      <Col
                        span={3}
                        style={{
                          borderStyle: borderStyle,
                          textAlign: "center",
                        }}
                      >
                        Unit Price
                      </Col>
                      <Col
                        span={3}
                        style={{
                          borderStyle: borderStyle,
                          textAlign: "right",
                        }}
                      >
                        TOTAL
                      </Col>
                      <Col
                        span={4}
                        style={{ textAlign: "center", marginLeft: 10 }}
                      >
                        CATEGORY
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1} style={{ borderStyle: borderStyle }}></Col>
                </Row>

                <Row
                  style={{
                    marginTop: "0.5%",
                    color: "black",
                    fontFamily: "Arial",
                  }}
                >
                  <Col span={1} style={{ borderStyle: borderStyle }}></Col>
                  <Col span={20} style={{ borderStyle: borderStyle }}>
                    {displayOrders}
                    <Row
                      style={{
                        marginTop: "1%",
                        marginBottom: "20px",
                        color: "black",
                        fontFamily: "Arial",
                      }}
                    >
                      <Col span={20}></Col>
                      <Col span={2} style={{ textAlign: "center" }}>
                        ---
                      </Col>
                      <Col span={2}></Col>
                    </Row>
                  </Col>
                  <Col span={1} style={{ borderStyle: borderStyle }}></Col>
                </Row>

                <Row
                  style={{
                    marginTop: "2%",
                    marginBottom: "20px",
                    color: "black",
                    fontFamily: "Arial",
                  }}
                >
                  <Col span={16}></Col>
                  <Col
                    span={6}
                    style={{
                      borderTop: "solid",
                      borderWidth: "thin",
                      textAlign: "left",
                    }}
                  >
                    Total Amount{" "}
                    <b
                      style={{
                        fontSize: "10",
                        fontFamily: "Arial",
                        textAlign: "right",
                        marginLeft: "15%",
                      }}
                    >
                      {parseFloat(purchaseOrder.total_price)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </b>
                  </Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    marginLeft: "5%",
                    marginRight: "7%",
                    fontSize: "10",
                    color: "black",
                    marginBottom: 10,
                  }}
                >
                  <Col span={1} />
                  <Col span={2}>Notes:</Col>
                  <Col>
                    
                  </Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    fontSize: "10",
                    marginLeft: "5%",
                    color: "black",
                    marginRight: "7%",
                    marginBottom: 10,
                  }}
                >
                  <Col span={1} />
                  <Col>REMARKS:</Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    marginLeft: "5%",
                    marginRight: "7%",
                    marginBottom: 10,
                  }}
                >
                  <Col span={1} />
                  <Col>
                    If you have any questions about this purchase order, please
                    contact us. Thank you.
                  </Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    borderTop: "solid",
                    borderWidth: "thin",
                    marginLeft: "5%",
                    marginRight: "7%",
                    color: "black",
                  }}
                >
                  <Col span={1}></Col>
                  <Col span={20}>
                    <Row>
                      <Col span={4} style={{ textAlign: "left" }}>
                        Prepared by:
                      </Col>
                      <Col span={7}></Col>
                      <Col span={7} style={{ textAlign: "left" }}>
                        Approved by:
                      </Col>
                      <Col span={2} />
                      <Col span={4} style={{ textAlign: "left" }}>
                        Conformed by:
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1}></Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    color: "black",
                    textAlign: "center",
                    marginTop: "25px",
                    marginLeft: "5%",
                    marginRight: "7%",
                  }}
                >
                  <Col span={4}>Harold Flores</Col>
                  <Col span={4} />
                  <Col span={7}>MGT1/BMC/MGT3</Col>
                </Row>
                <Row
                  style={{
                    fontFamily: "Arial",
                    color: "black",
                    marginLeft: "5%",
                    marginRight: "7%",
                  }}
                >
                  <Col
                    span={6}
                    style={{
                      fontWeight: "bold",
                      borderTop: "solid",
                      borderWidth: "thin",
                      textAlign: "left",
                    }}
                  >
                    On Point Construction
                  </Col>
                  <Col span={3} />
                  <Col
                    span={6}
                    style={{
                      fontWeight: "bold",
                      borderTop: "solid",
                      borderWidth: "thin",
                    }}
                  >
                    On Point Construction
                  </Col>
                  <Col span={3} />
                  <Col
                    span={6}
                    style={{
                      fontWeight: "bold",
                      borderTop: "solid",
                      borderWidth: "thin",
                    }}
                  >
                    Vendor
                  </Col>
                </Row>
                <Row style={{ marginTop: "30px" }}></Row>
              </div>
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default PurchaseOrderDetails;