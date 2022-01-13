import React, {useEffect, useState} from 'react';
import {
  Modal, Row, Col
  // Input,
} from 'antd';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Logo from './../../../components/logo/Logo';
//import {Document, Page} from '@react-pdf/renderer';


const PurchaseOrderModal = (props) => {
  const {purchaseOrder} = props;
  const {
    requestedBy,
    project,
    purchaseRequestNo,
    purchaseOrderNo,
    vendor,
    orders
  } = purchaseOrder;

  const {openModal} = useSelector(({ui}) => ({
    openModal: ui.openModal1
  }));
  const [newTotalPrice, setNewTotalPrice] = useState(0);
  //const {orders} = purchaseRequestData;


  const borderStyle = 'none';
  //const flexProps = [40,10.5,9.5,40];
  // const orders = [];
  // orders.push({
  //   category: 'I.A.6',
  //   didReceive: false,
  //   id: 1,
  //   itemTotal: 6750,
  //   product: 'GI Tie Wire #16',
  //   quantity: 50,
  //   unit: 'Bags',
  //   unitPrice: 135
  // })
  // orders.push({
  //   category: 'I.A.6',
  //   didReceive: false,
  //   id: 2,
  //   itemTotal: 6750,
  //   product: 'Pan Head Screw 1/2',
  //   quantity: 1500,
  //   unit: 'Bags',
  //   unitPrice: 135
  // })
  // orders.push({
  //   category: 'I.A.6',
  //   didReceive: false,
  //   id: 3,
  //   itemTotal: 6750,
  //   product: 'Republic Portland Cement',
  //   quantity: 50,
  //   unit: 'Bags',
  //   unitPrice: 135
  // })
  // orders.push({
  //   category: 'I.A.6',
  //   didReceive: false,
  //   id: 4,
  //   itemTotal: 6750,
  //   product: 'Pozzolan Cement',
  //   quantity: 50,
  //   unit: 'Bags',
  //   unitPrice: 135
  // })
  // orders.push({
  //   category: 'I.A.6',
  //   didReceive: false,
  //   id: 5,
  //   itemTotal: 6750,
  //   product: 'Pozzolan Cement',
  //   quantity: 50,
  //   unit: 'Bags',
  //   unitPrice: 135
  // })
  // orders.push({
  //   category: 'I.A.6',
  //   didReceive: false,
  //   id: 6,
  //   itemTotal: 6750,
  //   product: 'Pozzolan Cement',
  //   quantity: 50,
  //   unit: 'Bags',
  //   unitPrice: 135
  // })
  // orders.push({
  //   category: 'I.A.6',
  //   didReceive: false,
  //   id: 7,
  //   itemTotal: 6750,
  //   product: 'Pozzolan Cement',
  //   quantity: 50,
  //   unit: 'Bags',
  //   unitPrice: 135
  // })
  // orders.push({
  //   category: 'I.A.6',
  //   didReceive: false,
  //   id: 8,
  //   itemTotal: 6750,
  //   product: 'Pozzolan Cement',
  //   quantity: 50,
  //   unit: 'Bags',
  //   unitPrice: 135
  // })

  const ordersDisplay = orders.map((order, index) =>
    <Row key={order.id} style={{
      fontFamily: 'Arial',
      color: 'black',
      marginLeft: '5%',
      marginRight: '7%'
    }}>
      <Col span={2} style={{borderStyle: borderStyle}}>{index + 1}</Col>
      <Col span={10} style={{
        textAlign: 'left',
        borderStyle: borderStyle
      }}>{order.product}</Col>
      <Col span={2} style={{borderStyle: borderStyle}}>{order.quantityLeft}</Col>
      <Col span={2} style={{borderStyle: borderStyle}}>{order.unit}</Col>
      <Col span={4} style={{
        borderStyle: borderStyle,
        textAlign: 'center'
      }}>{order.unitPrice}</Col>
      <Col span={4} style={{
        borderStyle: borderStyle,
        textAlign: 'right'
      }}>{order.itemTotal}</Col>
    </Row>
  )

  const newOrdersDisplay = [];
  for (let i = 0; i <= 8 - orders.length; i +=1) {
    newOrdersDisplay.push({key: i});
  }

  const blankSpace = {
    blankSpace: ''
  };
  const finalOrdersDisplay = newOrdersDisplay.map((order) =>
    <Row key={order.key} style={{
      fontFamily: 'Arial',
      color: 'black',
      height: '24px',
      marginLeft: '5%',
      marginRight: '7%'
    }}>
      <Col span={2} style={{borderStyle: borderStyle}}>{blankSpace.blankSpace}</Col>
      <Col span={10} style={{
        textAlign: 'left',
        borderStyle: borderStyle
      }}>{blankSpace.blankSpace}</Col>
      <Col span={2} style={{borderStyle: borderStyle}}>{blankSpace.blankSpace}</Col>
      <Col span={2} style={{borderStyle: borderStyle}}>{blankSpace.blankSpace}</Col>
      <Col span={4} style={{
        borderStyle: borderStyle,
        textAlign: 'center'
      }}>{blankSpace.blankSpace}</Col>
      <Col span={4} style={{
        borderStyle: borderStyle,
        textAlign: 'right'
      }}>{blankSpace.blankSpace}</Col>
    </Row>
  )

  const handleCancel = () => {
  };
  useEffect(() => {
    let priceTotal = 0;
    for (const key in orders) {
      priceTotal += parseFloat(orders[key].itemTotal.split(',').join(''));
    }
    const totalPriceString = parseFloat(priceTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    setNewTotalPrice(totalPriceString);
  }, [orders])

  const OldPurchaseOrderModal = () =>
    <div id="divToPrint" style={{
      minWidth: '210mm',
      minHeight: '297mm',
      //  height: '100%',
      width: '100%'
    }}>
      <Row style={{marginBottom: 50}}>
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
            marginBottom: 10
          }}
          >
            <Col span={24} style={{
              textAlign: 'center',
              color: 'black'
            }}>
              {purchaseOrderNo}
            </Col>
          </Row>
          <Row style={{
            fontFamily: 'Arial',
            fontSize: 13,
            color: 'black',
            textAlign: 'left',
            marginLeft: '4%',
            borderStyle: borderStyle
          }}>
            <Col span={10}>
            PR / Doc # :
            </Col>
            <Col span={10} style={{
              textAlign: 'center',
              marginLeft: '5%'
            }}>
              {purchaseRequestNo}
            </Col>
          </Row>
        </Col>
      </Row>



      <Row style={{
        marginBottom: 10,
        color: 'black',
        fontFamily: 'Arial'
      }}>
        <Col span={10} style={{
          display: 'block',
          textAlign: 'left',
          marginLeft: '5%',
          borderStyle: borderStyle
        }}>
          <Row style={{
            marginBottom: 0,
            height: 16
          }}>
            <Col span={24} style={{
              fontWeight: 'bold',
              fontFamily: 'Arial',
              letterSpacing: '-0.5px',
              fontSize: 17
            }}>
            ON POINT CONSTRUCTION
            </Col>
          </Row>
          <Row style={{
            marginBottom: 0,
            height: 16
          }}>
            <Col span={24} style={{
              fontFamily: 'Arial',
              textAlign: 'left',
              fontSize: 14
            }}>
            3rd fl. SPC Bldg., One Paseo Compound
            </Col>
          </Row>
          <Row style={{
            marginBottom: 0,
            height: 16
          }}>
            <Col span={24} style={{
              fontFamily: 'Arial',
              fontSize: 14
            }}>
            Cebu City, Philippines
            </Col>
          </Row>
        </Col>
        <Col span={1} />
        <Col span={10} style={{
          alignContent: 'start',
          borderStyle: borderStyle,
          textAlign: 'left'
        }}>
          <Col span={1}></Col>
          <Row>
            <Col span={24}>
              <br />
            </Col>
          </Row>
          <Row style={{borderStyle: borderStyle}}>
            <Col span={10} style={{marginLeft: '6%'}}>
            Order Date:
            </Col>
            <Col span={10} style={{textAlign: 'center'}}>
              {`${moment(new Date()).format('L')}`}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <br />
            </Col>
          </Row>
        </Col>
      </Row>


      <Row style={{
        color: 'black',
        fontFamily: 'Arial'
      }}>
        <Col span={10} style={{
          borderStyle: 'solid',
          borderWidth: 'thin',
          marginLeft: '5%',
          textAlign: 'center',
          borderColor: 'black',
          borderTop: 'none'
        }}>
          <Row style={{marginBottom: 20,
            borderStyle: borderStyle}}>
            <Col span={24} style={{
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
          <Row style={{borderStyle: borderStyle}}>

            <Col span={5} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
            Name:
            </Col>
            <Col span={1}></Col>
            <Col span={17} style={{
              textAlign: 'start',
              marginLeft: 5,
              borderStyle: borderStyle
            }}>
              {vendor.vendorName}
            </Col>
          </Row>
          <Row>
            <Col span={5} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
            Address:
            </Col>
            <Col span={1}>
            </Col>
            <Col span={17} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
              {vendor.location}
            </Col>
          </Row>
          <Row>
            <Col span={5} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
            Tel:
            </Col>
            <Col span={1}>
            </Col>
            <Col span={17} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
              {vendor.telNo}
            </Col>
          </Row>
          <Row style={{marginBottom: 30}}>
            <Col span={5} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
            Terms:
            </Col>
            <Col span={1}>
            </Col>
            <Col span={17} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
              {vendor.terms}
            </Col>
          </Row>
        </Col>
        <Col span={1} style={{borderStyle: borderStyle}}/>
        <Col flex={11} style={{
          marginLeft: '1%',
          borderStyle: 'solid',
          borderWidth: 'thin',
          borderColor: 'black',
          marginRight: '2%',
          borderTop: 'none'
        }}>
          <Row style={{marginBottom: 20,
            borderStyle: borderStyle}}>
            <Col span={24} style={{
              borderStyle: 'solid',
              borderWidth: 'thin',
              fontFamily: 'Arial',
              fontSize: 14,
              textAlign: 'center',
              borderColor: 'black',
              backgroundColor: '#EEECE1',
              borderLeft: 'none',
              borderRight: 'none'
            }}>
            JOB ADDRESS
            </Col>
          </Row>
          <Row style={{borderStyle: borderStyle}}>
            <Col span={5} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
            Req By:
            </Col>
            <Col style={{
              textAlign: 'start',
              marginLeft: '2.4%'
            }}>
              {requestedBy}
            </Col>
          </Row>
          <Row>
            <Col span={5} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
            Project:
            </Col>
            <Col style={{
              textAlign: 'start',
              marginLeft: '2.4%'
            }}>
              {project}
            </Col>
          </Row>
          <Row>
            <Col span={6} style={{
              textAlign: 'start',
              marginLeft: 5
            }}>
            Category:
            </Col>
            <Col style={{
              textAlign: 'start',
              marginLeft: '2.4%'
            }}>
            </Col>
          </Row>
        </Col>
        <Col span={1} style={{marginRight: 10}}></Col>
      </Row>


      <Row style={{
        marginTop: 20,
        fontFamily: 'Arial',
        color: 'black'
      }}>
        <Col span={24} style={{
          textAlign: 'center',
          fontSize: 15
        }}>
        PLEASE SUPPLY THE FOLLOWING:
        </Col>
      </Row>

      <Row style={{
        marginTop: '1%',
        fontFamily: 'Arial',
        color: 'black',
        borderTop: 'solid',
        marginLeft: '5%',
        marginRight: '7%',
        borderBottom: 'solid',
        borderWidth: 'thin',
        height: '70px'
      }}>
        <Col span={1} style={{borderStyle: borderStyle}}></Col>
        <Col span={20} style={{
          borderStyle: borderStyle
        }}>
          <Row style={{marginTop: '3%'}}>
            <Col span={2} style={{borderStyle: borderStyle}}>IT</Col>
            <Col span={10} style={{
              borderStyle: borderStyle,
              textAlign: 'center'
            }}>DESCRIPTION</Col>
            <Col span={2} style={{borderStyle: borderStyle}}>QTY</Col>
            <Col span={2} style={{borderStyle: borderStyle}}>UNIT</Col>
            <Col span={4} style={{
              borderStyle: borderStyle,
              textAlign: 'center'
            }}>UNIT PRICE</Col>
            <Col span={4} style={{
              borderStyle: borderStyle,
              textAlign: 'right'
            }}>TOTAL</Col>
          </Row>
        </Col>
        <Col span={1} style={{borderStyle: borderStyle}}></Col>
      </Row>


      <Row style={{
        marginTop: '0.5%',
        color: 'black',
        fontFamily: 'Arial'
      }}>
        <Col span={1} style={{borderStyle: borderStyle}}></Col>
        <Col span={20} style={{borderStyle: borderStyle}}>
          {ordersDisplay}
          <Row style={{
            marginTop: '1%',
            marginBottom: '20px',
            color: 'black',
            fontFamily: 'Arial'
          }}>
            <Col span={20}></Col>
            <Col span={2} style={{textAlign: 'center'}}>---</Col>
            <Col span={2}></Col>
          </Row>
          {finalOrdersDisplay}
        </Col>
        <Col span={1} style={{borderStyle: borderStyle}}></Col>
      </Row>



      <Row style={{
        marginTop: '2%',
        marginBottom: '20px',
        color: 'black',
        fontFamily: 'Arial'
      }}>
        <Col span={16}></Col>
        <Col span={6} style={{
          borderTop: 'solid',
          borderWidth: 'thin',
          textAlign: 'left'
        }}>Total Amount <b style={{
            fontSize: '10',
            fontFamily: 'Arial',
            textAlign: 'right',
            marginLeft: '15%'
          }}>{newTotalPrice}</b></Col>
      </Row>



      <Row style={{
        fontFamily: 'Arial',
        borderTop: 'solid',
        borderWidth: 'thin',
        marginLeft: '5%',
        marginRight: '7%',
        color: 'black'
      }}>
        <Col span={1}>
        </Col>
        <Col span={20}>
          <Row>
            <Col span={7} style={{textAlign: 'left'}}>Authorized by:</Col>
            <Col span={11}></Col>
            <Col span={4} style={{textAlign: 'left'}}>Conformed by:</Col>
          </Row>
        </Col>
        <Col span={1}>
        </Col>
      </Row>

      <Row style={{
        fontFamily: 'Arial',
        color: 'black',
        textAlign: 'center',
        marginTop: '25px',
        marginLeft: '5%',
        marginRight: '7%'
      }}>
        <Col span={1}>
        </Col>
        <Col span={8}>
        Mr. Martin Gerard Tan
        </Col>
      </Row>

      <Row style={{
        fontFamily: 'Arial',
        textAlign: 'center',
        color: 'black',
        marginLeft: '5%',
        marginRight: '7%'
      }}>
        <Col span={1}>
        </Col>
        <Col span={8}>
        (Signature over printed name)
        </Col>
        <Col span={6}>
        </Col>
        <Col span={9}>
        (Print name & signature)
        </Col>
      </Row>

      <Row style={{
        fontFamily: 'Arial',
        textAlign: 'center',
        color: 'black',
        marginLeft: '5%',
        marginRight: '7%'
      }}>
        <Col span={1} style={{
          borderTop: 'solid',
          borderWidth: 'thin'
        }}>
        </Col>
        <Col span={8} style={{
          fontWeight: 'bold',
          borderTop: 'solid',
          borderWidth: 'thin'
        }}>
        On Point Construction
        </Col>
        <Col span={6}>
        </Col>
        <Col span={9} style={{
          fontWeight: 'bold',
          borderTop: 'solid',
          borderWidth: 'thin'
        }}>
        Vendor
        </Col>
      </Row>

      <Row style={{
        fontFamily: 'Arial',
        color: 'black',
        textAlign: 'center',
        marginTop: '15px',
        marginLeft: '5%',
        marginRight: '7%'
      }}>
        <Col span={17}></Col>
        <Col span={5}>RR Reference:</Col>
      </Row>

      <Row style={{
        fontFamily: 'Arial',
        textAlign: 'center',
        color: 'black'
      }}>
        <Col span={15}></Col>
        <Col span={7}>
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
    </div>

  // const PurchaseOrderDocument = () =>
  //   <Document id="toPrint">
  //     <Page size="A4">
  //       <Row style={{marginBottom: 50}}>
  //       </Row>
  //       <Row style={{
  //         marginLeft: '5.0%',
  //         marginRight: '7%'
  //       }}>
  //         <Col span={10} style={{
  //           textAlign: 'left',
  //           borderStyle: borderStyle,
  //           marginLeft: '0%'
  //         }}>
  //           <Logo />
  //         </Col>
  //         <Col span={1} />
  //         <Col span={11} style={{
  //           alignContent: 'start',
  //           borderStyle: borderStyle,
  //           textAlign: 'center',
  //           marginLeft: '7.5%'
  //         }}>
  //           <Row style={{
  //             fontSize: 18,
  //             borderColor: 'black',
  //             backgroundColor: '#7f7f7f',
  //             color: 'white',
  //             marginTop: 10,
  //             borderStyle: 'solid',
  //             borderWidth: 'thin',
  //             borderBottom: 'none',
  //             fontFamily: 'Arial',
  //             fontWeight: 'bold',
  //             textAlign: 'center',
  //             height: 25,
  //             marginBottom: 0
  //           }}>
  //             <Col span={24} style={{textAlign: 'center'}}>
  //               PURCHASE ORDER
  //             </Col>
  //           </Row>
  //           <Row style={{
  //             borderColor: 'black',
  //             marginTop: 0,
  //             fontSize: 13,
  //             fontFamily: 'Arial',
  //             textAlign: 'center',
  //             borderStyle: 'solid',
  //             borderTop: 'none',
  //             borderWidth: 'thin',
  //             marginBottom: 10}}
  //           >
  //             <Col span={24} style={{textAlign: 'center',
  //               color: 'black'}}>
  //                 OPC-2020-1600
  //             </Col>
  //           </Row>
  //           <Row style={{
  //             fontFamily: 'Arial',
  //             fontSize: 13,
  //             textAlign: 'left',
  //             borderStyle: borderStyle
  //           }}>
  //             <Col span={2}></Col>
  //             <Col span={10}>
  //               PR / Doc # :
  //             </Col>
  //             <Col span={10}>
  //           455
  //             </Col>
  //             <Col span={2}></Col>
  //           </Row>
  //         </Col>
  //         <Col span={7}>
  //         </Col>
  //       </Row>



  //       <Row style={{marginBottom: 10,
  //         color: 'black',
  //         fontFamily: 'Arial'}}>
  //         <Col span={6}></Col>
  //         <Col span={4} style={{display: 'block',
  //           textAlign: 'left',
  //           marginLeft: '6%',
  //           borderStyle: borderStyle
  //         }}>
  //           <Row style={{marginBottom: 0,
  //             height: 16}}>
  //             <Col span={24} style={{fontWeight: 'bold',
  //               fontFamily: 'Arial',
  //               letterSpacing: '-0.5px',
  //               fontSize: 17}}>
  //             ON POINT CONSTRUCTION
  //             </Col>
  //           </Row>
  //           <Row style={{marginBottom: 0,
  //             height: 16}}>
  //             <Col span={24} style={{
  //               fontFamily: 'Arial',
  //               textAlign: 'left',
  //               fontSize: 14}}>
  //             28A Sanson Road, Lahug
  //             </Col>
  //           </Row>
  //           <Row style={{marginBottom: 0,
  //             height: 16}}>
  //             <Col span={24} style={{
  //               fontFamily: 'Arial',
  //               fontSize: 14}}>
  //             Cebu City, Philippines
  //             </Col>
  //           </Row>
  //         </Col>
  //         <Col span={4} style={{alignContent: 'start',
  //           borderStyle: borderStyle,
  //           textAlign: 'left',
  //           marginLeft: '5%'}}>
  //           <Row>
  //             <Col span={24}>
  //               <br />
  //             </Col>
  //           </Row>
  //           <Row style={{borderStyle: borderStyle}}>
  //             <Col span={2}></Col>
  //             <Col span={10}>
  //                   Order Date:
  //             </Col>
  //             <Col span={10}>
  //                   3/22/2019
  //             </Col>
  //             <Col span={2}></Col>
  //           </Row>
  //           <Row>
  //             <Col span={24}>
  //               <br />
  //             </Col>
  //           </Row>
  //         </Col>
  //         <Col span={6}></Col>
  //       </Row>


  //       <Row style={{color: 'black',
  //         fontFamily: 'Arial'}}>
  //         <Col flex={flexProps[0]} style={{borderStyle: borderStyle}}>
  //         </Col>
  //         <Col flex={flexProps[1]} style={{borderStyle: 'solid',
  //           borderWidth: 'thin',
  //           borderColor: 'black',
  //           borderTop: 'none'}}>
  //           <Row style={{marginBottom: 20}}>
  //             <Col span ={24} style={{
  //               borderStyle: 'solid',
  //               borderWidth: 'thin',
  //               fontFamily: 'Arial',
  //               fontSize: 14,
  //               borderColor: 'black',
  //               backgroundColor: '#EEECE1',
  //               borderLeft: 'none',
  //               borderRight: 'none'
  //             }}>
  //    VENDOR
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col span={2} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //                 Name:
  //             </Col>
  //             <Col span={2}>
  //             </Col>
  //             <Col span={18} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //               Vic Enterprises
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col span={2} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //                 Address:
  //             </Col>
  //             <Col span={2}>
  //             </Col>
  //             <Col span={18} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //               MJ Cuenco Ave Cebu City
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col span={2} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //                 Tel:
  //             </Col>
  //             <Col span={2}>
  //             </Col>
  //             <Col span={18} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //               412-8502
  //             </Col>
  //           </Row>
  //           <Row style={{marginBottom: 35}}>
  //             <Col span={2} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //                 Terms:
  //             </Col>
  //             <Col span={2}>
  //             </Col>
  //             <Col span={18} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //               30 Days
  //             </Col>
  //           </Row>
  //         </Col>
  //         <Col flex={flexProps[2]} style={{marginLeft: '2.4%',
  //           borderStyle: 'solid',
  //           borderWidth: 'thin',
  //           borderColor: 'black',
  //           borderTop: 'none'}}>
  //           <Row style={{marginBottom: 20}}>
  //             <Col span={24} style={{
  //               borderStyle: 'solid',
  //               borderWidth: 'thin',
  //               fontFamily: 'Arial',
  //               fontSize: 14,
  //               borderColor: 'black',
  //               backgroundColor: '#EEECE1',
  //               borderLeft: 'none',
  //               borderRight: 'none'}}>
  //                   JOB ADDRESS
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col span={5} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //                 Req By:
  //             </Col>
  //             <Col style={{textAlign: 'start',
  //               marginLeft: '2.4%'}}>
  //               Engr. Jojo Salamanes
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col span={5} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //                 Project:
  //             </Col>
  //             <Col style={{textAlign: 'start',
  //               marginLeft: '2.4%'}}>
  //               GB003-BANILAD
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col span={5} style={{textAlign: 'start',
  //               marginLeft: 5}}>
  //                 Category:
  //             </Col>
  //             <Col style={{textAlign: 'start',
  //               marginLeft: '2.4%'}}>
  //               II-III.B.2
  //             </Col>
  //           </Row>
  //         </Col>
  //         <Col flex={flexProps[3]} style={{borderStyle: borderStyle}}/>
  //       </Row>


  //       <Row style={{marginTop: 20,
  //         fontFamily: 'Arial',
  //         color: 'black'}}>
  //         <Col span={24} style={{textAlign: 'center',
  //           fontSize: 15}}>
  //             PLEASE SUPPLY THE FOLLOWING:
  //         </Col>
  //       </Row>

  //       <Row style={{marginTop: '1%',
  //         fontFamily: 'Arial',
  //         color: 'black'}}>
  //         <Col span={7} style={{borderStyle: borderStyle}}></Col>
  //         <Col span={10} style={{borderStyle: borderStyle
  //           ,borderTop: 'solid',
  //           borderBottom: 'solid',
  //           borderWidth: 'thin',
  //           height: '70px'}}>
  //           <Row style={{marginTop: '3%'}}>
  //             <Col span={4} style={{borderStyle: borderStyle}}>IT</Col>
  //             <Col span={11} style={{borderStyle: borderStyle}}>DESCRIPTION</Col>
  //             <Col span={1} style={{borderStyle: borderStyle}}>QTY</Col>
  //             <Col span={2} style={{borderStyle: borderStyle}}>UNIT</Col>
  //             <Col span={3} style={{borderStyle: borderStyle}}>UNIT PRICE</Col>
  //             <Col span={3} style={{borderStyle: borderStyle}}>TOTAL</Col>
  //           </Row>
  //         </Col>
  //         <Col span={7} style={{borderStyle: borderStyle}}></Col>
  //       </Row>


  //       <Row style={{marginTop: '0.5%',
  //         color: 'black',
  //         fontFamily: 'Arial'}}>
  //         <Col span= {7} style={{borderStyle: borderStyle}}></Col>
  //         <Col span= {10} style={{borderStyle: borderStyle}}>
  //           {ordersDisplay}
  //         </Col>
  //         <Col span={7} style={{borderStyle: borderStyle}}></Col>
  //       </Row>

  //       <Row style={{marginTop: '2%',
  //         marginBottom: '20px',
  //         color: 'black',
  //         fontFamily: 'Arial'}}>
  //         <Col span={14}></Col>
  //         <Col span={3} style={{borderTop: 'solid',
  //           borderWidth: 'thin',
  //           textAlign: 'left'}}>Total Amount <b style={{fontSize: '10',
  //             fontFamily: 'Arial',
  //             textAlign: 'right'}}>131,275.00</b></Col>
  //         <Col span={7}></Col>
  //       </Row>

  //       <Row style={{fontFamily: 'Arial',
  //         color: 'black'}}>
  //         <Col span={7}>
  //         </Col>
  //         <Col span={10}>
  //           <Row  style={{borderTop: 'solid',
  //             borderWidth: 'thin'}}>
  //             <Col span={7} style={{textAlign: 'left'}}>Authorized by:</Col>
  //             <Col span={9}></Col>
  //             <Col span={8} style={{textAlign: 'left'}}>Conformed by:</Col>
  //           </Row>
  //         </Col>
  //         <Col span={7}>
  //         </Col>
  //       </Row>

  //       <Row style={{fontFamily: 'Arial',
  //         color: 'black',
  //         marginTop: '25px'}}>
  //         <Col span={7}>
  //         </Col>
  //         <Col span={4}>
  //         Mr. Martin Gerard Tan
  //         </Col>
  //       </Row>

  //       <Row style={{fontFamily: 'Arial',
  //         color: 'black'}}>
  //         <Col span={7}>
  //         </Col>
  //         <Col span={4}>
  //       (Signature over printed name)
  //         </Col>
  //         <Col span={1}>
  //         </Col>
  //         <Col span ={7}>
  //       (Print name & signature)
  //         </Col>
  //       </Row>

  //       <Row style={{fontFamily: 'Arial',
  //         color: 'black'}}>
  //         <Col span={7}>
  //         </Col>
  //         <Col span={4} style={{fontWeight: 'bold',
  //           borderTop: 'solid',
  //           borderWidth: 'thin'}}>
  //       On Point Construction
  //         </Col>
  //         <Col span={3}>
  //         </Col>
  //         <Col span ={3} style={{fontWeight: 'bold',
  //           borderTop: 'solid',
  //           borderWidth: 'thin'}}>
  //       Vendor
  //         </Col>
  //       </Row>

  //       <Row style={{fontFamily: 'Arial',
  //         color: 'black',
  //         marginTop: '15px'}}>
  //         <Col span ={14}></Col>
  //         <Col span={3}>RR Reference:</Col>
  //       </Row>

  //       <Row style={{fontFamily: 'Arial',
  //         color: 'black'}}>
  //         <Col span ={14}></Col>
  //         <Col span={3}>
  //           <Row>
  //             <Col span={6}>
  //           OR#:
  //             </Col>
  //             <Col span={6}>
  //           RR#:
  //             </Col>
  //             <Col span={6}>
  //           Date:
  //             </Col>
  //             <Col span={6}>
  //           By:
  //             </Col>
  //           </Row>
  //         </Col>
  //       </Row>

  //       <Row style={{marginTop: '30px'}}>

  //       </Row>
  //     </Page>
  //   </Document>


  return (
    <Modal
      title="Add a new purchase orders"
      visible={openModal}
      onCancel={handleCancel}
      width="210mm"
      //width={900}
      height="297mm"
      okText="Save Purchase Order"
      cancelText="Cancel"
      destroyOnClose
      maskClosable={false}
    >
      <OldPurchaseOrderModal />
    </Modal>
  );
};

export default PurchaseOrderModal;
