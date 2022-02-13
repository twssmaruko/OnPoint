import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Input, Select } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as uiActions from "../../../store/ui/actions/Actions";
import * as poActions from "../../../store/purchaseorders/actions/Actions";
import * as prActions from "../../../store/purchaserequest/actions/Actions";
import Logo from "../../../components/logo/Logo";
import OPC from '../../../api/OPC';
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
import PurchaseOrderGasOrder from './PurchaseOrderGasOrder.js';
import "./PurchaseOrder.css";
import moment from "moment";

const PurchaseOrderGas = (props) => {
  const { modalVisible } = props;

  const { Option } = Select;

  const dispatcher = useDispatch();


  const [gasTypes] = useState([
    "Diesel",
    "Premium",
    "Unleaded",
    "DIESEL Engine OIL"
  ]);

  const currentYear = moment(new Date()).format("YYYY");
  const [purchaseOrderData, setPurchaseOrderData] = useState({
    purchase_order_number: "",
    vendor: "First Auto LPG Gas Holdings Corp.",
    requested_by: "Engr. Jojo Salamanes",
    project_id: "",
    equipment_id: "",
    purchase_request_id: "",
  });
  const [yearState, setYearState] = useState(currentYear);
  const [poNumber, setPONumber] = useState("");
  const [gasOrders, setGasOrders] = useState([]);
  const [equipmentName, setEquipmentName] = useState("");

  const {
    openModal,
    purchaseRequests,
    projects,
    gasOrder,
    equipment,
    chosenGas,
    gasOrderModal
  } = useSelector(
    ({ ui, purchaseOrder, purchaseRequests }) => ({
      openModal: ui.openModal3,
      chosenGas: purchaseOrder.chosenGas,
      equipment: purchaseOrder.equipment,
      gasOrder: purchaseOrder.gasOrder,
      gasOrderModal: ui.gasOrderModal,
      purchaseRequests: purchaseRequests.purchaseRequestsGas,
      projects: purchaseOrder.projects,
    }),
    shallowEqual
  );

  const categoryList = equipment.map((type, index) => (
    <Option key={index} value={type.equipment_id}>
      {type.equipment_category}
    </Option>
  ));

  useEffect(() => {
    dispatcher(prActions.fetchPurchaseRequestsGas());
    dispatcher(poActions.getProjects());
    dispatcher(poActions.fetchEquipment());
  }, [dispatcher]);

  const onCancelClicked = () => {
    dispatcher(uiActions.setOpenModal3(false));
  };

  const onOk = () => {
    setYearState(currentYear);
    dispatcher(uiActions.setOpenModal3(false));
    dispatcher(poActions.createPurchaseOrderGas(purchaseOrderData));
  };

  const prList = purchaseRequests.map((purchaseRequest) => (
    <Option
      key={purchaseRequest.purchase_request_id}
      value={purchaseRequest.purchase_request_id}
    >
      {purchaseRequest.purchase_request_number}
    </Option>
  ));

  const projectList = projects.map((project) => (
    <Option key={"project-" + project.project_id} value={project.project_id}>
      {project.project_code}
    </Option>
  ));

  const onSelectGas = (data) => {
    console.log('gas_select: ', data);
    const selectedCategory = equipment.find((cat) => cat.equipment_id === data);
    setEquipmentName(selectedCategory.equipment_name);
    setPurchaseOrderData({
      ...purchaseOrderData,
      equipment_id: selectedCategory.equipment_id
    });
    console.log('hello: ', selectedCategory);
  };

  const onSelectProject = (data) => {
    console.log("project: ", data);
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      project_id: data,
    };
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onYearChange = (data) => {
    setYearState(data);
    const newPO = "OPCDC-" + data + "-G" + poNumber;
    console.log("newPO: ", newPO);
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      purchase_order_number: newPO,
    };
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onPONoChange = (data) => {
    setPONumber(data);
    const newPO = "OPCDC-" + yearState + "-G" + data;
    console.log("newPO: ", newPO);
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      purchase_order_number: newPO,
    };
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onPRSelect = async (data) => {
    console.log('data: ', data);
    const selectedPurchaseRequest = purchaseRequests.find((e) => e.purchase_request_id === data);
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      purchase_request_id: selectedPurchaseRequest.purchase_request_id,
    };
    setPurchaseOrderData(newPurchaseOrderData);
    const prNumber = await OPC.get('/purchase_requests/orders/pr/' + data);
    const prOrders = [];
    for (const key in prNumber.data) {
      if (prNumber.data[key].quantity_left > 0) {
        prOrders.push({
          ...prNumber.data[key]
        })
      }
    }
    setGasOrders(prOrders);
    console.log('prOrders: ', prOrders);
    dispatcher(uiActions.setOpenGasOrderModal(true));
    console.log("selectedPurchaseRequest: ", selectedPurchaseRequest);
  };
  const onGasOrderCancel = () => {
    dispatcher(uiActions.setOpenGasOrderModal(false));
  }
  const onModalClose = () => { };
  const onGasOrderOk = () => {
    for (const key in gasTypes) {
      if (gasOrder.item_type.search(gasTypes[key]) > 0) {
        console.log('gasType: ', gasTypes[key])
      }
    }
    console.log('foundOrder: ', gasOrder);
    setPurchaseOrderData({
      ...purchaseOrderData,
      product: gasOrder.item_type,
      purchase_request_order_id: gasOrder.purchase_request_order_id,
      quantity: gasOrder.quantity,
      unit: gasOrder.unit
    })

    dispatcher(uiActions.setOpenGasOrderModal(false));
  };

  return (
    <Modal
      className="black-text"
      title="Gas Purchase Order"
      visible={openModal}
      onOk={onOk}
      width={700}
      onCancel={onCancelClicked}
      maskClosable={false}
      okText="Proceed"
      cancelText="Cancel"
      afterClose={onModalClose}
      destroyOnClose
    >
      <Modal
        title="Order"
        visible={gasOrderModal}
        onOk={onGasOrderOk}
        onCancel={onGasOrderCancel}>

        <PurchaseOrderGasOrder orders={gasOrders} />
      </Modal>
      <Row>
        <Col span={11}>
          <Logo />
        </Col>
        <Col span={2} />
        <Col span={11}>
          <Row className="purchase-order-text">
            <Col span={24} className="white-text">
              PURCHASE ORDER
            </Col>
          </Row>
          <Row className="input-text-align">
            <Col span={24} className="input-text-align">
              <Row className="item-box">
                <Col span={4} />
                <Col span={5}>OPCDC-</Col>
                <Col span={5}>
                  <Input
                    value={yearState}
                    onChange={(e) => onYearChange(e.target.value)}
                  />
                </Col>
                <Col span={2}>-G</Col>
                <Col span={5}>
                  <Input
                    value={poNumber}
                    onChange={(e) => onPONoChange(e.target.value)}
                  />
                </Col>
                <Col span={3} />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={10}>
          <Row className="bold-text">
            <Col className="input-text-align" span={24}>
              ON POINT CONSTRUCTION
            </Col>
          </Row>
          <Row>
            <Col className="input-text-align-left" span={24}>
              3rd fl., SPC Bldg., One Paseo Compound,
            </Col>
          </Row>
          <Row>
            <Col className="input-text-align-left" span={24}>
              Paseo Saturnino St., Banilad
            </Col>
          </Row>
          <Row>
            <Col className="input-text-align-left" span={24}>
              Cebu City, Philippines 6000
            </Col>
          </Row>
        </Col>
        <Col span={4} />
        <Col span={10}>
          <Row>
            <Col span={8}>PR / DOC NO:</Col>
            <Col span={16}>
              <Select
                style={{ width: 100, height: 12 }}
                onSelect={(e) => onPRSelect(e)}
              >
                {prList}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col style={{ color: "white" }}>_</Col>
          </Row>
          <Row>
            <Col span={10}>ORDER DATE:</Col>
            <Col span={14}>{`${moment(new Date()).format("MMMM D, Y")}`}</Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={11} className="vj-box">
          <Row className="vj-header">
            <Col span={24}>VENDOR</Col>
          </Row>
          <Row className="vj-text">
            <Col span={5}>Name:</Col>
            <Col span={18}>First Auto LPG Gas Holdings Corp.</Col>
          </Row>
          <Row className="vj-text">
            <Col span={5}>Address:</Col>
            <Col span={18}>Lahug, Cebu City</Col>
          </Row>
          <Row className="vj-text">
            <Col span={5}>Tel:</Col>
            <Col span={18}>4161980</Col>
          </Row>
        </Col>
        <Col span={2} />
        <Col span={11} className="vj-box">
          <Row className="vj-header">
            <Col span={24}>JOB ADDRESS</Col>
          </Row>
          <Row className="vj-text">
            <Col span={4}>Req By:</Col>
            <Col span={18}>Engr. Jojo Salamanes</Col>
          </Row>
          <Row className="vj-text">
            <Col span={6}>Project:</Col>
            <Col span={18}>
              <Select
                className="select-style"
                size="small"
                onSelect={(e) => onSelectProject(e)}
              >
                {projectList}
              </Select>
            </Col>
          </Row>
          <Row className="vj-text">
            <Col span={6}>Category:</Col>
            <Col span={18}>
              <Select
                className="select-style"
                size="small"
                onSelect={(e) => onSelectGas(e)}
              >
                {categoryList}
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mid-text">
        <Col className="bold-text" span={24}>
          PLEASE SUPPLY THE FOLLOWING:
        </Col>
      </Row>

      <Row className="item-box">
        <Col span={24}>
          <Row className="border-bottom">
            <Col span={1} className="border-right">
              IT
            </Col>
            <Col span={10} className="border-right">
              PRODUCT DESCRIPTION
            </Col>
            <Col span={5} className="border-right">
              Liter(s)
            </Col>
            <Col span={4} className="border-right">
              UNIT PRICE
            </Col>
            <Col span={4} className="input-text-align">
              TOTAL
            </Col>
          </Row>

          <Row className="border-bottom">
            <Col span={1} className="border-right">
              1
            </Col>
            <Col span={10} className="border-right">
              Diesel
            </Col>
            <Col span={5} className="border-right">
              {chosenGas[0]}
            </Col>
            <Col span={4} className="border-right"></Col>
            <Col span={4}></Col>
          </Row>

          <Row className="border-bottom">
            <Col span={1} className="border-right">
              2
            </Col>
            <Col span={10} className="border-right">
              Premium
            </Col>
            <Col span={5} className="border-right">
              {chosenGas[1]}
            </Col>
            <Col span={4} className="border-right"></Col>
            <Col span={4}></Col>
          </Row>

          <Row className="border-bottom">
            <Col span={1} className="border-right">
              3
            </Col>
            <Col span={10} className="border-right">
              Unleaded
            </Col>
            <Col span={5} className="border-right">
              {chosenGas[2]}
            </Col>
            <Col span={4} className="border-right"></Col>
            <Col span={4}></Col>
          </Row>

          <Row className="border-bottom">
            <Col span={1} className="border-right">
              4
            </Col>
            <Col span={10} className="border-right">
              DIESEL Engine OIL
            </Col>
            <Col span={5} className="border-right">
              {chosenGas[3]}
            </Col>
            <Col span={4} className="border-right"></Col>
            <Col span={4}></Col>
          </Row>

          <Row>
            <Col span={1} className="border-right"></Col>
            <Col span={10} className="border-right">
              Total
            </Col>
            <Col span={5} className="border-right"></Col>
            <Col span={4} className="border-right"></Col>
            <Col span={4}></Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={11}></Col>
        <Col span={2}></Col>
        <Col span={11}></Col>
      </Row>

      <Row className="margin-top">
        <Col span={11} className="name-select">
          {equipmentName}
        </Col>
        <Col span={2}></Col>
        <Col span={11} className="signature">
          (Signature Over Printed Name)
        </Col>
      </Row>

      <Row>
        <Col span={11} className="name">
          Name:
        </Col>
        <Col span={2}></Col>
        <Col span={11} className="authorized-by">
          Authorized by:
        </Col>
      </Row>
    </Modal>
  );
};

export default PurchaseOrderGas;
