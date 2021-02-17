import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  // Select,
  Row,
  Col,
  Spin,
  message,
  //message
} from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined
} from "@ant-design/icons";
// import _ from 'lodash';

import moment from "moment";
import _ from 'lodash';

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/purchaserequest/actions/Actions";
import * as uiActions from "../../store/ui/actions/Actions";
import ReactDataSheet from "react-datasheet";
import Logo from '../../components/logo/Logo';
import "react-datasheet/lib/react-datasheet.css";
//import PurchaseRequests from './PurchaseRequests';

//const {Option} = Select;

const PurchaseRequestForm = () => {
  const [form] = Form.useForm();
  const [ordersList, setOrdersList] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [orderId, setOrderId] = useState(1);
  const [purchaseRequestNumber, setPurchaseRequestNumber] = useState('');
  const [requestedBy, setRequestedBy] = useState("Engr. Jojo Salamanes");
  const dispatcher = useDispatch();

  const { productsList, openModal, modalSpin } = useSelector(
    ({ ui, products, purchaseRequests }) => ({
      modalSpin: ui.showSpin2,
      openModal: ui.openModal1,
      prNo: purchaseRequests.purchaseRequestCount,
      // showSpin: ui.showSpin1,
      productsList: products.products,
    }),
    shallowEqual
  );

  // const fetchProduct = () => {
  //   dispatcher(actions.getProducts());
  // };

  const addPurchaseRequest = () => {
    if (modalSpin) {
      return;
    }
    const dateNow = new Date();
    // const totalPrice = ordersList.reduce((accumulator,
    //     current) => accumulator + current.price * current.quantity, 0);
    const prData = {
      status: "PENDING",
      purchaseRequestNo: parseFloat(purchaseRequestNumber),
      isApproved: "APPROVED",
      year: dateNow.getFullYear(),
      //dayMonthYear: moment(dateNow).format('DD-MM-YYYY'),
      dayMonthYear: moment(dateNow, "DD-MM-YYYY"),
      // totalPrice,
      orders: purchaseRequestOrders,
      requestedBy: requestedBy,
    };

    if (purchaseRequestOrders.length < 1 || purchaseRequestNumber === '' || requestedBy === '') {
      message.error('Please fill up all necessary fields!');
    } else {
      dispatcher(actions.addPurchaseRequest(prData));
    }

  };
  // const debounceFetchProduct = _.debounce(fetchProduct, 1000);
  // const searchOptionList = () => productsList.map((product) =>
  //   <Option key={product.id}>
  //     {product.name}
  //   </Option>
  // );

  const options = [];

  productsList.map((product) => {
    const newProduct = String(product.name);
    options.push({
      value: newProduct,
    });
  });

  const onSubmit = (value) => {
    let count = orderId;
    const order = [
      {
        ...value,
        product: value.product,
        quantityLeft: value.quantity,
        id: count,
      },
    ];
    count += 1;
    setOrderId(count);

    const newList = order.concat(ordersList);
    setListItems(
      newList.map((data) => (
        <h3 key={data.id}>
          {`${data.quantity} ${data.unit} of ${data.product} `}
        </h3>
      ))
    );
    setOrdersList(newList);
    form.resetFields();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


  const handleCancel = () => {
    dispatcher(uiActions.setOpenModal1(false));
  };

  const afterModalClose = () => {
    if (ordersList.length) {
      setOrdersList([]);
      setListItems([]);
    }
  };

  // const checkProduct = (value) => {
  //   const found = ordersList.find((data) => data.product === value.label)
  //   if (found) {
  //     message.error(`Cannot have repeating products! ${value.label}`)
  //     form.resetFields();
  //   }
  // }

  const onRequestedByChange = (value) => {
    setRequestedBy(value);
  };

  const [orderNumber, setOrderNumber] = useState(1);
  const [purchaseRequestOrders, setPurchaseRequestOrders] = useState([]);

  const [gridState, setGridState] = useState([
    [
      { readOnly: true, value: "", width: 50 },
      { value: "ITEM", readOnly: true, width: 250 },
      { value: "DESCRIPTION", readOnly: true, width: 500 },
      { value: "QTY", readOnly: true, width: 100 },
      { value: "UNIT", readOnly: true, width: 150 },
      { value: "UNIT PRICE", readOnly: true, width: 150 },

    ],
    [
      { readOnly: true, value: 1 },
      { value: "", textAlign: 'left' },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],

  ]);

  const addPurchaseRequestOrder = () => {
    const newGrid = gridState;
    const newOrderNumber = orderNumber + 1
    newGrid.push([
      { readOnly: true, value: newOrderNumber },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ]);
    setOrderNumber(newOrderNumber);
    setGridState(newGrid);
  }

  const removePurchaseRequestOrder = () => {
    if (gridState.length <= 2) {
      message.error('Cannot remove more!');
    } else {
      gridState.splice(gridState.length - 1, 1);
      const newOrderNumber = orderNumber - 1;
      setOrderNumber(newOrderNumber);
    }
  }

  const onPRNumberChanged = (data) => {
    setPurchaseRequestNumber(data);
  }

  const onCellsChanged = (changes) => {
    let newGrid = gridState;
    changes.forEach(({ cell, row, col, value }) => {
      newGrid[row][col] = { ...newGrid[row][col], value }
    })
    const newPurchaseRequestOrders = [];
    for (let i = 0; i < newGrid.length - 1; i++) {
      newPurchaseRequestOrders.push({
        id: i,
        itemType: newGrid[i + 1][1].value,
        product: newGrid[i + 1][2].value,
        quantity: parseFloat(newGrid[i + 1][3].value.split(',').join('')),
        quantityLeft: parseFloat(newGrid[i + 1][3].value.split(',').join('')),
        unit: newGrid[i + 1][4].value,
        unitPrice: parseFloat(newGrid[i + 1][5].value.split(',').join('')),
        purchaseOrderNo: 'none',
      })
    }
    setPurchaseRequestOrders(newPurchaseRequestOrders);
    setGridState(newGrid);
  }


  useEffect(() => {
    dispatcher(actions.getProducts());
  }, [dispatcher]);

  return (
    <Modal
      title="Add a new purchase request"
      visible={openModal}
      onOk={addPurchaseRequest}
      onCancel={handleCancel}
      maskClosable={false}
      width={1200}
      okText="Add Purchase Request"
      cancelText="Cancel"
      destroyOnClose
      afterClose={afterModalClose}
    >
      <Spin spinning={modalSpin}>
        <Row>
          <Col span={8}>
            <Logo />
          </Col>
          <Col span={8} />
          <Col span={8} style={{ fontFamily: 'Arial', color: 'black', fontSize: 12 }}>
            <Row>
              <Col>
                On Point Construction
              </Col>
            </Row>
            <Row>
              <Col>
                28-A Sanson Road, Lahug, Cebu City
              </Col>
            </Row>
            <Row>
              <Col>
                Telephone No.: (032) 266-3356
              </Col>
            </Row>
            <Row>
              <Col>
                Email: onpointconstruction.ph@gmail.com
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: 20, marginBottom: 25 }}>
          <Col span={8} />
          <Col span={8} style={{ textAlign: 'center', fontFamily: 'Arial', fontWeight: 'bold', color: 'black', fontSize: 16 }}>
            PURCHASE REQUEST
          </Col>
          <Col span={8} />
        </Row>

        <Row style={{ marginTop: 10, marginBottom: 25 }} >
          <Col span={8}>
            <Row>
              <Col style={{ marginRight: 10, fontFamily: 'Arial', fontWeight: 'bold' }}>
                PR Number:
            </Col>
              <Col style={{ borderBottomStyle: 'solid', borderWidth: 1 }}>
                <Input bordered={false} onChange={(e) => onPRNumberChanged(e.target.value)} />
              </Col>
            </Row>
          </Col>
          <Col span={16} />
        </Row>

        <Row style={{ marginBottom: 25 }}>
          <Col span={20}>
            <Row>
              <Col span={1} />
              <Col span={1} style={{ marginRight: 0 }}>
                <PlusCircleOutlined style={{ color: 'green' }} onClick={() => addPurchaseRequestOrder()} />
              </Col>
              <Col span={18} style={{ marginRight: 20 }}><ReactDataSheet
                data={gridState}
                valueRenderer={(cell) => cell.value}
                onCellsChanged={(changes) => onCellsChanged(changes)}
              />
              </Col>
              <Col span={1}>
                <MinusCircleOutlined style={{ color: 'red' }} onClick={() => removePurchaseRequestOrder()} />
              </Col>
              <Col span={1} />
            </Row>
          </Col>
        </Row>

        <Row style={{ color: 'black' }}>
          <Col style={{ marginRigth: 10 }}> Requested By:
          </Col>
          <Col style={{ borderBottomStyle: 'solid', borderWidth: 1 }}>
            <Input
              defaultValue="Engr. Jojo Salamanes"
              bordered={false}
              onChange={(e) => onRequestedByChange(e.target.value)}
              style={{ width: 170, marginLeft: 10 }}
            />
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default PurchaseRequestForm;
