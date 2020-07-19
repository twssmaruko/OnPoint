import React from 'react';
import {
  Modal, Row, Col, Card,
  // Input,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as uiActions from '../../store/ui/actions/Actions';
import Logo from '../../assets/images/Logo.png';

const PurchaseOrderModal = (props) => {
  const dispatcher = useDispatch();
  const { data } = props;
  const {
    category,
    requestedBy,
    project,
    purchaseRequestData,
    vendorData,
    addNotes,
  } = data;
  const { openModal } = useSelector(({ ui }) => ({
    openModal: ui.openModal1,
  }));

  const { orders } = purchaseRequestData;

  const addPurchaseOrder = () => {
    dispatcher(uiActions.setOpenModal1(false));
  };

  const handleCancel = () => {
    dispatcher(uiActions.setOpenModal1(false));
  };

  return (
    <Modal
      title="Add a new purchase orders"
      visible={openModal}
      onOk={addPurchaseOrder}
      onCancel={handleCancel}
      width={900}
      // height={1000}
      okText="Add Purchase Order"
      cancelText="Cancel"
      destroyOnClose
      maskClosable={false}
    >
      <Row>
        <Col span={12} style={{ paddingLeft: '5%' }}>
          <img src={Logo} alt="logo" />
        </Col>
        <Col span={12}>
          <Card
            title="PURCHASE ORDER"
            size="small"
            style={{ width: 350, border: '1px solid black', marginLeft: '10%' }}
            headStyle={{
              backgroundColor: '#7F7F7F',
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              height: 1,

            }}
          >
            <div style={{ textAlign: 'center' }}>
              OPC-2019-2181
            </div>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={12} style={{ color: 'black', paddingLeft: '3%' }}>
          <div style={{ fontWeight: 'bold' }}>ON POINT CONSTRUCTION </div>
          <div>28 A Sanson Road, Lahug </div>
          <div>Cebu City, Philippines </div>
        </Col>
        <Col span={12} style={{ color: 'black', paddingLeft: '5%' }}>
          <Row style={{ marginTop: 20 }}>
            <Col span={12}>
              {`PR/Doc #: ${purchaseRequestData.purchaseRequestNo}`}
            </Col>
            <Col span={12}>
              {`Order Date: ${moment(new Date()).format('L')}`}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card
            title="VENDOR"
            size="small"
            style={{ width: 380, border: '1px solid black', marginLeft: '5%' }}
            headStyle={{
              backgroundColor: '#EEECE1',
              color: 'black',
              textAlign: 'center',
              fontSize: 15,
              // fontWeight: 'bold',
              height: 1,

            }}
          >
            <div style={{ color: 'black', fontSize: 13, height: 100 }}>
              <Row>
                <div style={{ width: 60 }}>Name:</div>
                <div style={{ marginLeft: 20 }}>
                  {vendorData.vendorName}
                </div>
              </Row>
              <Row>
                <div style={{ width: 60 }}>Address:</div>
                <div style={{ marginLeft: 20 }}>
                  {vendorData.location}
                </div>
              </Row>
              <Row>
                <div style={{ width: 60 }}>Tel:</div>
                <div style={{ marginLeft: 20 }}>{vendorData.telNo}</div>
              </Row>
              <Row>
                <div style={{ width: 60 }}>Terms:</div>
                <div style={{ marginLeft: 20 }}>{vendorData.terms}</div>
              </Row>
            </div>

          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="JOB ADRESS"
            size="small"
            style={{ width: 350, border: '1px solid black', marginLeft: '10%' }}
            headStyle={{
              backgroundColor: '#EEECE1',
              color: 'black',
              textAlign: 'center',
              fontSize: 15,
              // fontWeight: 'bold',
              height: 1,

            }}
          >
            <div style={{ color: 'black', fontSize: 13, height: 100 }}>
              <Row>
                <div style={{ width: 60 }}>Req. By:</div>
                <div style={{ marginLeft: 20 }}>
                  {requestedBy}
                </div>
              </Row>
              <Row>
                <div style={{ width: 60 }}>Project:</div>
                <div style={{ marginLeft: 20 }}>
                  {project}
                </div>
              </Row>
              <Row>
                <div style={{ width: 60 }}>Category:</div>
                <div style={{ marginLeft: 20 }}>
                  {category || ''}
                </div>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: 20, width: '100%' }}>
        <div style={{ textAlign: 'center', color: 'black' }}>
          PLEASE SUPPLY THE FOLLOWING:
        </div>
        <Row style={{
          marginTop: 20,
          color: 'black',
          borderTop: '1px solid black',
          borderBottom: '1px solid black',
          marginLeft: '2%',
          marginRight: '3.5%',
          paddingTop: 15,
          paddingBottom: 15,
        }}
        >
          <div style={{ marginLeft: 30, width: 100 }}>IT</div>
          <div style={{ width: 250 }}>DESCRIPTION</div>
          <div style={{ width: 85 }}>QTY</div>
          <div style={{ width: 85 }}>UNIT</div>
          <div style={{ width: 140 }}>UNIT PRICE</div>
          <div style={{ width: 85 }}>TOTAL</div>
        </Row>
        <Row style={{
          marginTop: 20,
          color: 'black',
          marginLeft: '2%',
          marginRight: '3.5%',
        }}
        >
          {orders.items.map((order, index) => (
            <Row key={order.id}>
              <div style={{ marginLeft: 30, width: 110 }}>{index + 1}</div>
              <div style={{ width: 250 }}>{order.product.name}</div>
              <div style={{ width: 85 }}>{order.quantity}</div>
              <div style={{ width: 95 }}>{order.unit}</div>
              <div style={{ width: 130 }}>{order.price}</div>
              <div style={{ width: 85 }}>{order.quantity * order.price}</div>
            </Row>
          ))}
          {/* <div style={{ marginLeft: 30, width: 220 }}>1</div>
          <div style={{ width: 230 }}>Description</div>
          <div style={{ width: 65 }}>2</div>
          <div style={{ width: 65 }}>kg</div>
          <div style={{ width: 120 }}>1000</div>
          <div style={{ width: 65 }}>2000</div> */}
        </Row>
        <div style={{
          marginTop: 50,
          color: 'black',
          marginRight: '5%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        >
          <div style={{ width: 200, borderTop: '1px solid black', textAlign: 'center' }}>
            {`Total Amount: ${purchaseRequestData.totalPrice}`}
          </div>
        </div>
        <div style={{ marginTop: 50, color: 'black', marginLeft: '3%' }}>
          {`Notes: ${addNotes}`}
        </div>
        <div style={{
          marginTop: 50,
          color: 'black',
          // marginRight: '5%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        >
          <div style={{
            marginLeft: '5%',
            width: 250,
            borderTop: '1px solid black',
            textAlign: 'center',
          }}
          >
            Authorized by:
          </div>
          <div style={{
            marginRight: '5%',
            width: 250,
            borderTop: '1px solid black',
            textAlign: 'center',
          }}
          >
            Confirmed by:
          </div>
        </div>
        <div style={{
          marginTop: 50,
          color: 'black',
          // marginRight: '5%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        >
          <div style={{
            marginLeft: '5%',
            width: 250,
          }}
          >
            <div style={{ textAlign: 'center' }}>
              Mr. Martin Gerard Tan
            </div>
            <div style={{ textAlign: 'center' }}>
              (Signature Over Printed Name)
            </div>
            <div style={{
              borderTop: '1px solid black',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
            >
              Onpoint Construction
            </div>
          </div>
          <div style={{
            marginRight: '5%',
            marginTop: 45,
            width: 250,
            borderTop: '1px solid black',
            textAlign: 'center',
          }}
          >
            Confirmed by:
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PurchaseOrderModal;
