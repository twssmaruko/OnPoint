import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Switch,
  Modal,
  message,
  Col,
  Input,
  // Spin,
} from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AlertTwoTone } from "@ant-design/icons";
// import _ from 'lodash';
import * as uiActions from "../../store/ui/actions/Actions";
import * as actions from "../../store/purchaserequest/actions/Actions";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import Logo from "../../components/logo/Logo";

const Updatemodal = (props) => {
  const dispatcher = useDispatch();
  //const {Option} = Select;
  const { purchaseRequestData } = props;
  const {
    // purchaseRequestData,
    openAnotherModal,
    // showSpin,
  } = useSelector(({ ui }) => ({
    // showSpin: ui.showSpin1,
    // purchaseRequestData: purchaseRequests.purchaseRequestData,
    openAnotherModal: ui.openModal2,
  }));
  const [gridState, setGridState] = useState(() => {
    const newGrid = [[
      { readOnly: true, value: "", width: 50 },
      { value: "ITEM", readOnly: true, width: 250 },
      { value: "DESCRIPTION", readOnly: true, width: 500 },
      { value: "QTY", readOnly: true, width: 100 },
      { value: "ORDERED", readOnly: true, width: 100 },
      { value: "UNIT", readOnly: true, width: 150 },
      { value: "UNIT PRICE", readOnly: true, width: 150 },
    ]];

    for (const key in purchaseRequestData.orders) {
      const quantityOrdered = purchaseRequestData.orders[key].quantity - purchaseRequestData.orders[key].quantity_left
      const unitPrice = parseFloat(purchaseRequestData.orders[key].unit_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      newGrid.push([
        { readOnly: true, value: "", width: 50 },
        { value: purchaseRequestData.orders[key].item_type },
        { value: purchaseRequestData.orders[key].product, textAlign: 'center' },
        { value: purchaseRequestData.orders[key].quantity },
        { value: quantityOrdered, readOnly: true },
        { value: purchaseRequestData.orders[key].unit },
        { value: unitPrice }
      ])
    }


    return newGrid
  });
  const [orderNumber, setOrderNumber] = useState(1);
  const [purchaseRequestOrders, setPurchaseRequestOrders] = useState([]);

  useEffect(() => {
    console.log("purchaseRequestData: ", purchaseRequestData);
    setGridState(() => {
      const newGrid = [[
        { readOnly: true, value: "", width: 50 },
        { value: "ITEM", readOnly: true, width: 250 },
        { value: "DESCRIPTION", readOnly: true, width: 500 },
        { value: "QTY", readOnly: true, width: 100 },
        { value: "ORDERED", readOnly: true, width: 100 },
        { value: "UNIT", readOnly: true, width: 150 },
        { value: "UNIT PRICE", readOnly: true, width: 150 },
      ]];
  
      for (const key in purchaseRequestData.orders) {
        const quantityOrdered = purchaseRequestData.orders[key].quantity - purchaseRequestData.orders[key].quantity_left;
        const unitPrice = parseFloat(purchaseRequestData.orders[key].unit_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        newGrid.push([
          { readOnly: true, value: "", width: 50 },
          { value: purchaseRequestData.orders[key].item_type },
          { value: purchaseRequestData.orders[key].product, textAlign: 'center' },
          { value: purchaseRequestData.orders[key].quantity },
          { value: quantityOrdered, readOnly: true },
          { value: purchaseRequestData.orders[key].unit },
          { value: unitPrice }
        ])
      }
  
  
      return newGrid
    });
  }, [purchaseRequestData, setGridState]);

  const [borderVisible, setBorderVisible] = useState(false);
  const [updateParams, setUpdateParams] = useState({});

  const { orders } = purchaseRequestData;

  const onMouseOver = () => {
    setBorderVisible(true);
  };

  const onMouseLeaver = () => {
    setBorderVisible(false);
  };

  const ordersItems = orders.map((item) => (
    <Row key={item.product}>
      <Col span={11}>
        <Input.TextArea
          onMouseEnter={onMouseOver}
          onMouseLeave={onMouseLeaver}
          bordered={borderVisible}
          autoSize={{ minRows: 1, maxRows: 6 }}
          defaultValue={item.product}
        />
      </Col>
      <Col style={{ color: "white" }}>_</Col>
      <Col span={5}>
        {item.quantity - item.quantityLeft} / {item.quantity}
      </Col>
      <Col span={3}>{item.unit}</Col>
      <Col span={4}>Ordered</Col>
    </Row>
  ));

  // const setStatus = (value) => {
  //   setUpdateParams({...updateParams,
  //     status: value});
  // };

  const afterModalClose = () => {
    setUpdateParams({});
  };

  const invokeUpdate = () => {
    const newData = { ...purchaseRequestData, ...updateParams };
    //console.log(newData);
    //delete newData.orders;
    //delete newData.updatedAt;
    dispatcher(actions.editPurchaseRequest(newData));
    dispatcher(uiActions.setOpenModal2(false));
  };

  const confirm = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <AlertTwoTone />,
      content: "Update confirmation.",
      onOk: invokeUpdate,
      okText: "Confirm",
      cancelText: "Cancel",
    });
  };

  const handleUpdateOk = () => {
    const params = Object.keys(updateParams);
    const checkParams = params.map(
      (param) => updateParams[param] === purchaseRequestData[param]
    );

    if (checkParams.includes(false)) {
      confirm();
      return;
    }
    message.info("No changes applied.");
    dispatcher(uiActions.setOpenModal2(false));
  };

  const handleUpdateCancel = () => {
    dispatcher(uiActions.setOpenModal2(false));
  };

  const onCellsChanged = (changes) => {
    let newGrid = gridState;
    changes.forEach(({ cell, row, col, value }) => {
      newGrid[row][col] = { ...newGrid[row][col], value };
    });
    const newPurchaseRequestOrders = [];
    for (let i = 0; i < newGrid.length - 1; i++) {
      newPurchaseRequestOrders.push({
        id: i,
        itemType: newGrid[i + 1][1].value,
        product: newGrid[i + 1][2].value,
        quantity: parseFloat(newGrid[i + 1][3].value.split(",").join("")),
        quantityLeft: parseFloat(newGrid[i + 1][3].value.split(",").join("")),
        unit: newGrid[i + 1][4].value,
        unitPrice: parseFloat(newGrid[i + 1][5].value.split(",").join("")),
        purchaseOrderNo: "none",
      });
    }
    setPurchaseRequestOrders(newPurchaseRequestOrders);
    setGridState(newGrid);
  };

  const addPurchaseRequestOrder = () => {
    const newGrid = gridState;
    const newOrderNumber = orderNumber + 1;
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
  };

  const removePurchaseRequestOrder = () => {
    if (gridState.length <= 2) {
      message.error("Cannot remove more!");
    } else {
      gridState.splice(gridState.length - 1, 1);
      const newOrderNumber = orderNumber - 1;
      setOrderNumber(newOrderNumber);
    }
  };

  return (
    <Modal
      maskClosable={false}
      title={`PR ${purchaseRequestData.purchaseRequestNo}`}
      visible={openAnotherModal}
      width={1200}
      onOk={handleUpdateOk}
      onCancel={handleUpdateCancel}
      okText="Update Purchase Request"
      destroyOnClose
      afterClose={afterModalClose}
    >
      <Row>
        <Col span={8}>
          <Logo />
        </Col>
        <Col span={8} />
        <Col
          span={8}
          style={{ fontFamily: "Arial", color: "black", fontSize: 12 }}
        >
          <Row>
            <Col>On Point Construction</Col>
          </Row>
          <Row>
            <Col>28-A Sanson Road, Lahug, Cebu City</Col>
          </Row>
          <Row>
            <Col>Telephone No.: (032) 266-3356</Col>
          </Row>
          <Row>
            <Col>Email: onpointconstruction.ph@gmail.com</Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ marginTop: 20, marginBottom: 25 }}>
        <Col span={8} />
        <Col
          span={8}
          style={{
            textAlign: "center",
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
          }}
        >
          PURCHASE REQUEST
          </Col>
        <Col span={8} />
      </Row>

      <Row style={{ marginTop: 10, marginBottom: 25 }}>
        <Col span={8}>
          <Row>
            <Col
              style={{
                marginRight: 10,
                fontFamily: "Arial",
                fontWeight: "bold",
              }}
            >
              PR Number:
              </Col>
            <Col style={{ borderBottomStyle: "solid", borderWidth: 1 }}>
              {purchaseRequestData.purchase_request_number}
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
              {/* <PlusCircleOutlined
                style={{ color: "green" }}
                onClick={() => addPurchaseRequestOrder()}
              /> */}
            </Col>
            <Col span={18} style={{ marginRight: 20 }}>
              <ReactDataSheet
                data={gridState}
                valueRenderer={(cell) => cell.value}
               // onCellsChanged={(changes) => onCellsChanged(changes)}
              />
            </Col>
            <Col span={1}>
              {/* <MinusCircleOutlined
                style={{ color: "red" }}
                onClick={() => removePurchaseRequestOrder()}
              /> */}
            </Col>
            <Col span={1} />
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default Updatemodal;
