import React, {useEffect, useState} from 'react';
import {
  Modal, Row, Col, Card
  // Input,
} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import * as actions from '../../../store/purchaseorders/actions/Actions';
import * as uiActions from '../../../store/ui/actions/Actions';
import Logo from './../../../assets/images/Logo.png';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';


const PurchaseOrderModal = (props) => {
  const dispatcher = useDispatch();
  const {purchaseOrder, transfers, count, prOrders} = props;
  const {
    category,
    requestedBy,
    project,
    purchaseRequestNo,
    purchaseOrderNo,
    vendor,
    orders,
    addNotes
  } = purchaseOrder;
  const {openModal} = useSelector(({ui}) => ({
    openModal: ui.openModal1
  }));
  const [newTotalPrice, setNewTotalPrice] = useState(0);
  //const {orders} = purchaseRequestData;

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 10);
        // pdf.output('dataurlnewwindow');
        pdf.save(purchaseOrder.purchaseOrderNo + '.pdf');
      });
  }

  const addPurchaseOrder = (purchaseOrderData) => {
    const newOrdersInPurchaseOrder = transfers.slice(0, transfers.length - count);
    const finalOrders = [];
    for (const key in prOrders) {
      const newOrder = newOrdersInPurchaseOrder.find((e) => e.product === prOrders[key].product);
      if (newOrder === undefined) {
        finalOrders.push(prOrders[key]);
      } else {
        finalOrders.push(newOrder);
      }
    }
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      prOrders: finalOrders
    }
    //dispatcher(actions.addPurchaseOrder(newPurchaseOrderData))
    printDocument();
  };

  const handleCancel = () => {
    dispatcher(uiActions.setOpenModal1(false));
  };

  useEffect(() => {
    let priceTotal = 0;
    for (const key in orders) {
      priceTotal += parseFloat(orders[key].itemTotal.split(',').join(''));
    }
    const totalPriceString = parseFloat(priceTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    setNewTotalPrice(totalPriceString);
  }, [orders])

  return (
    <Modal
      title="Add a new purchase orders"
      visible={openModal}
      onOk={() => addPurchaseOrder(purchaseOrder)}
      onCancel={handleCancel}
      width="210mm"
      //width={900}
      height="297mm"
      okText="Add Purchase Order"
      cancelText="Cancel"
      destroyOnClose
      maskClosable={false}
    >
      <div id="divToPrint" style={{
        minWidth: '210mm',
        minHeight: '297mm'
      //  height: '100%',
       // width: '100%'
      }}>
        <Row style={{marginBottom: '20px'}}>
          <Col span={12} style={{paddingLeft: '5%'}}>
            <img src={Logo} alt="logo" />
          </Col>
          <Col span={12}>
            <Card
              title="PURCHASE ORDER"
              size="small"
              style={{width: 325,
                border: '1px solid black',
                marginLeft: '10%'}}
              headStyle={{
                backgroundColor: '#7F7F7F',
                color: 'white',
                textAlign: 'center',
                fontSize: '14',
                fontWeight: 'bold',
                height: 1

              }}
            >
              <div style={{textAlign: 'center',
                fontSize: '10'}}>
                {purchaseOrderNo}
              </div>
            </Card>
          </Col>
        </Row>
        <Row style={{marginBottom: '20px'}}>
          <Col span={12} style={{color: 'black',
            fontSize: '10',
            paddingLeft: '3%'}}>
            <div style={{fontWeight: 'bold',
              fontSize: '12'}}>ON POINT CONSTRUCTION </div>
            <div style={{fontSize: '10'}}>28 A Sanson Road, Lahug </div>
            <div style={{fontSize: '10'}}>Cebu City, Philippines </div>
          </Col>
          <Col span={12} style={{color: 'black',
            paddingLeft: '5%'}}>
            <Row style={{marginBottom: '20px'}}>
              <Col span={12}>
                {`PR/Doc #: PR${purchaseRequestNo}`}
              </Col>
              <Col span={12}>
                {`Order Date: ${moment(new Date()).format('L')}`}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{marginBottom: '20px'}}>
          <Col span={12}>
            <Card
              title="VENDOR"
              size="small"
              style={{width: 380,
                border: '1px solid black',
                marginLeft: '5%'}}
              headStyle={{
                backgroundColor: '#EEECE1',
                color: 'black',
                textAlign: 'center',
                fontSize: '10',
                // fontWeight: 'bold',
                height: 1

              }}
            >
              <div style={{color: 'black',
                fontSize: '10',
                height: 100}}>
                <Row>
                  <div style={{width: 60,
                    fontSize: '10'}}>Name:</div>
                  <div style={{marginLeft: 20,
                    fontSize: '10'}}>
                    {vendor.vendorName}
                  </div>
                </Row>
                <Row>
                  <div style={{width: 60,
                    fontSize: '10'}}>Address:</div>
                  <div style={{marginLeft: 20,
                    fontSize: '10'}}>
                    {vendor.location}
                  </div>
                </Row>
                <Row>
                  <div style={{width: 60,
                    fontSize: '10'}}>Tel:</div>
                  <div style={{marginLeft: 20,
                    fontSize: '10'}}>{vendor.telNo}</div>
                </Row>
                <Row>
                  <div style={{width: 60,
                    fontSize: '10'}}>Terms:</div>
                  <div style={{marginLeft: 20,
                    fontSize: '10'}}>{vendor.terms}</div>
                </Row>
              </div>

            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="JOB ADDRESS"
              size="small"
              style={{width: 325,
                border: '1px solid black',
                marginLeft: '10%',
                fontSize: '10'}}
              headStyle={{
                backgroundColor: '#EEECE1',
                color: 'black',
                textAlign: 'center',
                fontSize: '10',
                // fontWeight: 'bold',
                height: 1

              }}
            >
              <div style={{color: 'black',
                fontSize: '13',
                height: 100}}>
                <Row>
                  <div style={{width: 60,
                    fontSize: '10'}}>Req. By:</div>
                  <div style={{marginLeft: 20,
                    fontSize: '10'}}>
                    {requestedBy}
                  </div>
                </Row>
                <Row>
                  <div style={{width: 60,
                    fontSize: '10'}}>Project:</div>
                  <div style={{marginLeft: 20,
                    fontSize: '10'}}>
                    {project}
                  </div>
                </Row>
                <Row>
                  <div style={{width: 60,
                    fontSize: '10'}}>Category:</div>
                  <div style={{marginLeft: 20}}>
                    {category || ''}
                  </div>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
        <div style={{marginBottom: '20px',
          width: '100%'}}>
          <div style={{textAlign: 'center',
            fontSize: '10',
            color: 'black'}}>
          PLEASE SUPPLY THE FOLLOWING:
          </div>
          <Row style={{
            marginBottom: '20px',
            color: 'black',
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            marginLeft: '2%',
            marginRight: '3.5%',
            paddingTop: 15,
            paddingBottom: 15
          }}
          >
            <div style={{
              width: 90}}>IT</div>
            <div style={{width: 250,
              fontSize: '10'}}>DESCRIPTION</div>
            <div style={{width: 85,
              fontSize: '10'}}>QTY</div>
            <div style={{width: 85,
              fontSize: '10'}}>UNIT</div>
            <div style={{width: 140,
              fontSize: '10'}}>UNIT PRICE</div>
            <div style={{width: 85,
              fontSize: '10'}}>TOTAL</div>
          </Row>
          <Row style={{
            marginBottom: '50px',
            color: 'black'
            // marginLeft: '2%',
            // marginRight: '3.5%'
          }}
          >
            {orders.map((order, index) =>
              <Row key={order.id}>
                <div style={{marginLeft: 30,
                  width: 110}}>{index + 1}</div>
                <div style={{width: 250,
                  fontSize: '10'}}>{order.product}</div>
                <div style={{width: 85,
                  fontSize: '10'}}>{order.quantityLeft}</div>
                <div style={{width: 95,
                  fontSize: '10'}}>{order.unit}</div>
                <div style={{width: 130,
                  fontSize: '10'}}>{order.unitPrice}</div>
                <div style={{width: 85,
                  fontSize: '10'}}>{order.itemTotal}</div>
              </Row>
            )}
            {/* <div style={{ marginLeft: 30, width: 220 }}>1</div>
          <div style={{ width: 230 }}>Description</div>
          <div style={{ width: 65 }}>2</div>
          <div style={{ width: 65 }}>kg</div>
          <div style={{ width: 120 }}>1000</div>
          <div style={{ width: 65 }}>2000</div> */}
          </Row>
          <div style={{
            marginBottom: '50px',
            color: 'black',
            marginRight: '5%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          >
            <div style={{width: 200,
              borderTop: '1px solid black',
              position: 'absolute',
              top: '230mm',
              textAlign: 'center',
              fontSize: '10'}}>
              {`Total Amount: ${newTotalPrice}`}
            </div>
          </div>
          <div style={{marginBottom: '50px',
            color: 'black',
            marginLeft: '3%',
            fontSize: '10'}}>
            {`Notes: ${addNotes}`}
          </div>
          <div style={{
            color: 'black',
            position: 'absolute',
            top: '250mm',
            // marginRight: '5%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
          >
            <div style={{
              marginLeft: '5%',
              width: 250,

              borderTop: '1px solid black',
              textAlign: 'center',
              fontSize: '10'
            }}
            >
            Authorized by:
            </div>
            <div style={{
              marginBottom: '50px',
              marginRight: '5%',
              width: '145mm',
              fontSize: '10',
              borderTop: '1px solid black',
              textAlign: 'center'
            }}
            >
            Confirmed by:
            </div>
          </div>
          <div style={{
            color: 'black',
            position: 'absolute',
            top: '255mm',
            // marginRight: '5%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
          >
            <div style={{
              marginLeft: '5%',
              width: 250
            }}
            >
              <div style={{textAlign: 'center',

                fontSize: '10'}}>
              Mr. Martin Gerard Tan
              </div>
              <div style={{textAlign: 'center',

                fontSize: '10'}}>
              (Signature Over Printed Name)
              </div>
              <div style={{
                borderTop: '1px solid black',
                textAlign: 'center',

                fontWeight: 'bold',
                fontSize: '10'
              }}
              >
              Onpoint Construction
              </div>
            </div>
          </div>
          {/* <div style={{
              marginRight: '5%',
              width: 250,
              borderTop: '1px solid black',
              textAlign: 'center'
            }}
            >
            Confirmed by:
            </div> */}
        </div>
      </div>

    </Modal>
  );
};

export default PurchaseOrderModal;
