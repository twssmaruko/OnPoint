import React, {useState} from 'react';
import {Row, Col, Switch, Modal, Spin} from 'antd';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Logo from './../../../assets/images/Logo.png';
import * as actions from '../../../store/purchaseorders/actions/Actions';
import * as uiActions from '../../../store/ui/actions/Actions';
import {RightOutlined} from '@ant-design/icons';

const PurchaseOrderDetails = (props) => {
  const {purchaseOrder} = props;

  const [ordersReceived, setOrdersReceived] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(false);

  const dispatcher = useDispatch();

  // useEffect(() => {
  //   setOrdersReceived(initOrders)
  //   console.log(purchaseOrder);
  // }, [initOrders]);

  const {
    openModal,
    showSpin
  } = useSelector(({ui}) => ({
    openModal: ui.openModal1,
    showSpin: ui.showSpin1
  }), shallowEqual);

  const onChecked = (e, checkbox) => {
    const orders = ordersReceived;
    setLoadingFlag(true);
    if (checkbox) {
      const newOrders = orders.filter((result) =>
        result.product !== e.product || e.didReceive === true);
      newOrders.push({
        category: e.category,
        didReceive: e.didReceive,
        id: e.id,
        itemTotal: e.itemTotal,
        product: e.product,
        quantity: e.quantity,
        unit: e.unit,
        unitPrice: e.unitPrice,
        idLink: purchaseOrder.id,
        purchaseOrderNo: purchaseOrder.purchaseOrderNo,
        projectCode: purchaseOrder.project
      })
      setOrdersReceived(newOrders);
      setLoadingFlag(false);
    } else {
      const newOrders = orders.filter(result => result.product !== e.product);
      setOrdersReceived(newOrders);
      setLoadingFlag(false);
    }
  }

  const onOk = () => {
    dispatcher(actions.setOrdersReceived(ordersReceived));
    setOrdersReceived([]);
    // dispatcher(uiActions.setOpenModal1(false))
  }

  const onCancel = () => {
    setOrdersReceived([]);
    dispatcher(uiActions.setOpenModal1(false))
  }

  const mappedOrders = purchaseOrder.orders.map((e) => {
    return (
      <div key={e.id}>
        <Row style={{marginBottom: '10px',
          marginLeft: 25,
          marginRight: 35}}>
          <Col span={1}>
            <RightOutlined />
          </Col>
          <Col span={6}>
            {e.product}
          </Col>
          <Col span={3}>
            {e.quantity}
          </Col>
          <Col span={3}>
            {e.unit}
          </Col>
          <Col span={3}>
            {parseFloat(e.unitPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </Col>
          <Col span={3}>
            {parseFloat(e.itemTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </Col>
          <Col span={4}>
            {e.category}
          </Col>
          <Col span={1}>
            <Switch size="small"
              onChange= {(checkbox) => onChecked(e, checkbox)}
              disabled={e.didReceive}
              defaultChecked={e.didReceive}
              loading={loadingFlag}
            />
          </Col>
        </Row>
      </div>
    )
  }
  )

  return (
    <Modal
      maskClosable = {false}
      visible={openModal}
      width="60%"
      onCancel={onCancel}
      onOk = {onOk}
    >
      <Spin spinning={showSpin}>
        <Row style={{marginBottom: 15}} id="LOGO">
          <Col span={8}>
            <img src={Logo} alt="logo" />
          </Col>
          <Col span={8} style={{fontWeight: 'bold',
            fontSize: 25}}>
          </Col>
          <Col span={8}>
          </Col>
        </Row>

        <Row id="PO NUMBER">
          <Col span={8}>
          </Col>
          <Col span={8} style={{fontWeight: 'bold',
            fontSize: 18}}>
            {purchaseOrder.purchaseOrderNo}
          </Col>
          <Col span={8}>
          </Col>
        </Row>

        <Row id="VENDOR DETAILS">
          <Col span={5}>
            Vendor:
          </Col>
          <Col span={7}>
            Test
          </Col>
        </Row>

        <Row
          id="ORDER DETAILS"
          style={{marginBottom: '10px',
            marginLeft: 25,
            marginRight: 35,
            height: 45,
            alignContent: 'center',
            borderColor: 'black',
            borderStyle: 'solid',
            borderLeft: 0,
            borderRight: 0,
            borderWidth: 'thin'}}>
          <Col>
          </Col>
          <Col span={1}>
            IT
          </Col>
          <Col span={6}>
            Description
          </Col>
          <Col span={3}>
            Qty
          </Col>
          <Col span={3}>
            Unit
          </Col>
          <Col span={3}>
            Price
          </Col>
          <Col span={3}>
            Total
          </Col>
          <Col span={4}>
            Category
          </Col>
          <Col span={1}>
        ✓
          </Col>
          <br />
        </Row>
        {mappedOrders}
      </Spin>
    </Modal>

  )
}

export default PurchaseOrderDetails;