import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Input, Select } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as uiActions from "../../../store/ui/actions/Actions";
import * as poActions from "../../../store/purchaseorders/actions/Actions";
import * as prActions from "../../../store/purchaserequest/actions/Actions";
import Logo from "../../../components/logo/Logo";
import "./PurchaseOrder.css";
import moment from "moment";

const PurchaseOrderGas = (props) => {
  const { modalVisible } = props;

  const { Option } = Select;

  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(prActions.fetchPurchaseRequestsGas());
    dispatcher(poActions.getProjects());
  }, [dispatcher]);

  const [gasState] = useState([
    "IF-1 (MC1)",
    "IF-2 (MD1)",
    "IF-2 (MD2)",
    "IF-3 (C/G/W/A)",
    "IF-4 (BH1)",
    "IF-2 (MD3)",
    "IF-1(MC3)",
    "IF-5 (MC4)",
    "IF-1 (MC2)",
    "BT1",
    "PO",
    "PU2",
    "MP",
    "IF-6(HR)",
    "BH2",
    "IF-2(MD4)",
    "BT2",
    "Cont",
  ]);
  const [plateNumberState] = useState([
    "JDO 3108",
    "070-103",
    "GAF 9978",
    "CMXR/GSet/WP/ATV",
    "BackHoe1",
    "YDY-842",
    "YFB773",
    "JAD-4839",
    "JAB-9510",
    "0716-555798",
    "YDD-465",
    "GAO-7780",
    "0701-829213",
    "UPZ-988",
    "BackHoe2",
    "0716-561354",
    "0716-563487",
    "Container",
  ]);

  const currentYear = moment(new Date()).format("YYYY");
  const [purchaseOrderData, setPurchaseOrderData] = useState({
    poType: "gas",
    purchaseOrderNo: "",
    vendor: "First Auto LPG Gas Holdings Corp.",
    requestedBy: "Engr. Jojo Salamanes",
    project: "",
    purchaseRequestNo: "",
    purchaseRequest: {},
    order: {
      product: "",
      quantity: 0,
      unit: "liters",
      category: "",
      unitPrice: 0,
      totalPrice: 0,
    },
  });
  const [dieselGasState, setDieselGasState] = useState("");
  const [premiumGasState, setPremiumGasState] = useState("");
  const [unleadedGasState, setUnleadedGasState] = useState("");
  const [dieselOilState, setDieselOilState] = useState("");
  const [yearState, setYearState] = useState(currentYear);
  const [poNumber, setPONumber] = useState("");

  const gasList = gasState.map((type, index) => (
    <Option key={index} value={type}>
      {type}
    </Option>
  ));

  const plateNumberList = plateNumberState.map((type, index) => (
    <Option key={"plate-" + index} value={type}>
      {type}
    </Option>
  ));

  const { openModal, purchaseRequests, projects } = useSelector(
    ({ ui, purchaseOrder, purchaseRequests }) => ({
      openModal: ui.openModal3,
      purchaseRequests: purchaseRequests.purchaseRequestsGas,
      projects: purchaseOrder.projects,
    }),
    shallowEqual
  );

  const onCancelClicked = () => {
    dispatcher(uiActions.setOpenModal3(false));
  };

  const onOk = () => {
    setYearState(currentYear);
    setPONumber("");
    setDieselGasState("");
    setPremiumGasState("");
    setUnleadedGasState("");
    setDieselOilState("");
    dispatcher(uiActions.setOpenModal3(false));
    console.log("purchaseOrderData: ", purchaseOrderData);
  };

  const prList = purchaseRequests.map((purchaseRequest) => (
    <Option key={purchaseRequest.id} value={purchaseRequest.id}>
      {purchaseRequest.purchaseRequestNo}
    </Option>
  ));

  const projectList = projects.map((project) => (
    <Option key={"project-" + project.project_id} value={project.project_code}>
      {project.project_code}
    </Option>
  ));

  const onSelectGas = (data) => {
    console.log("projects: ", projects);
  };

  const onSelectProject = (data) => {
    console.log("project: ", data);
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      project: data,
    };
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onDieselGasChange = (data) => {
    setDieselGasState(data);
    setPremiumGasState("");
    setUnleadedGasState("");
    setDieselOilState("");
    const newProduct = "Fuel Diesel";
    const newOrder = {
      ...purchaseOrderData.order,
      product: newProduct,
      quantity: data,
    };
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      order: newOrder,
    };
    console.log("newPurchaseOrderData: ", newPurchaseOrderData);
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onPremiumGasChange = (data) => {
    setDieselGasState("");
    setPremiumGasState(data);
    setUnleadedGasState("");
    setDieselOilState("");
    const newProduct = "Fuel Premium";
    const newOrder = {
      ...purchaseOrderData.order,
      product: newProduct,
      quantity: data,
    };
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      order: newOrder,
    };
    console.log("newPurchaseOrderData: ", newPurchaseOrderData);
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onUnleadedGasChange = (data) => {
    setDieselGasState("");
    setPremiumGasState("");
    setUnleadedGasState(data);
    setDieselOilState("");
    const newProduct = "Fuel Unleaded";
    const newOrder = {
      ...purchaseOrderData.order,
      product: newProduct,
      quantity: data,
    };
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      order: newOrder,
    };
    console.log("newPurchaseOrderData: ", newPurchaseOrderData);
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onDieselOilChange = (data) => {
    setDieselGasState("");
    setPremiumGasState("");
    setUnleadedGasState("");
    setDieselOilState(data);
    const newProduct = "Fuel Diesel Oil";
    const newOrder = {
      ...purchaseOrderData.order,
      product: newProduct,
      quantity: data,
    };
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      order: newOrder,
    };
    console.log("newPurchaseOrderData: ", newPurchaseOrderData);
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onYearChange = (data) => {
    setYearState(data);
    const newPO = "OPCDC-" + data + "-G" + poNumber;
    console.log("newPO: ", newPO);
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      purchaseOrderNo: newPO,
    };
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onPONoChange = (data) => {
    setPONumber(data);
    const newPO = "OPCDC-" + yearState + "-G" + data;
    console.log("newPO: ", newPO);
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      purchaseOrderNo: newPO,
    };
    setPurchaseOrderData(newPurchaseOrderData);
  };

  const onPRSelect = (data) => {
    const selectedPurchaseRequest = purchaseRequests.find((e) => e.id === data);
    const purchaseRequestNo = selectedPurchaseRequest.purchaseRequsetNo;
    const newPurchaseOrderData = {
      ...purchaseOrderData,
      purchaseRequest: selectedPurchaseRequest,
      purchaseRequestNo: purchaseRequestNo,
    };
    setPurchaseOrderData(newPurchaseOrderData);
    console.log("selectedPurchaseRequest: ", selectedPurchaseRequest);
  };

  const onModalClose = () => {};

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
        <Col span={9}>
          <Row className="bold-text">
            <Col className="input-text-align" span={24}>
              ON POINT CONSTRUCTION
            </Col>
          </Row>
          <Row>
            <Col className="input-text-align" span={24}>
              28A Sanson Road, Lahug
            </Col>
          </Row>
          <Row>
            <Col className="input-text-align" span={24}>
              Cebu City, Philippines
            </Col>
          </Row>
        </Col>
        <Col span={5} />
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
                {gasList}
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
              <Input
                bordered={false}
                className="input-text-align"
                value={dieselGasState}
                onChange={(e) => onDieselGasChange(e.target.value)}
              />
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
              <Input
                bordered={false}
                className="input-text-align"
                value={premiumGasState}
                onChange={(e) => onPremiumGasChange(e.target.value)}
              />
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
              <Input
                bordered={false}
                className="input-text-align"
                value={unleadedGasState}
                onChange={(e) => onUnleadedGasChange(e.target.value)}
              />
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
              <Input
                bordered={false}
                className="input-text-align"
                value={dieselOilState}
                onChange={(e) => onDieselOilChange(e.target.value)}
              />
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
          <Select size="small" className="select-style">
            {plateNumberList}
          </Select>
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
