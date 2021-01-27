import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Logo from "../../components/logo/Logo";
import moment from "moment";
import * as actions from "../../store/materialsreceiving/actions/Actions";
import {
  Row,
  Table,
  Spin,
  Col,
  Form,
  TimePicker,
  Button,
  Calendar,
  Input,
  Select,
  Modal,
  Checkbox,
  InputNumber,
} from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { uuid } from "uuidv4";
import MaterialsReceivingOrder from "./MaterialsReceivingOrder";
import { setProject } from "../../store/purchaseorders/actions/Actions";

const MaterialsReceivingModal = (props) => {
  const dispatcher = useDispatch();
  const { Option } = Select;

  const { purchaseOrders } = props;

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateSelected, setDateSelected] = useState("");
  const [inputState, setInputState] = useState(false);
  const [projectState, setProjectState] = useState("");
  const [displayedOrders, setDisplayedOrders] = useState("");
  const [categoriesState, setCategoriesState] = useState([]);
  const [materialsReceivingOrders, setMaterialsReceivingOrders] = useState([]);
  const [newKey, setNewKey] = useState(0);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState({
    requestedBy: "Engr. Jojo Salamanes",
    project: "",
    vendor: "",
    status: "pending",
    purchaseOrderNo: 0,
    purchaseRequest: {},
    addNotes: "",
    purchaseRequestNo: "",
    notes: "",
    orders: [
      {
        product: "",
        quantity: 0,
        unit: "",
        unitPrice: 0,
        category: "",
      },
    ],
    totalPrice: "",
  });

  const [materialsReceivingState, setMaterialsReceivingState] = useState({
    materialsReceivingNo: "",
    purchaseOrderNo: "",
    orders: [
      {
        product: "",
        unit: "",
        quantityReceived: "",
        unitPrice: 0,
        category: "",
      },
    ],
    deliveryDate: "",
    deliveryTime: "",
    deliveredBy: "Engr. Jojo Salamanes",
    project: "",
  });
  const { materialsReceiving, loading, categories, projects } = useSelector(
    ({ materialsReceiving }) => ({
      materialsReceiving: materialsReceiving.materialsReceiving,
      categories: materialsReceiving.categories,
      loading: materialsReceiving.loading,
      projects: materialsReceiving.projects,
    }),
    shallowEqual
  );

  const purchaseOrdersList = purchaseOrders.map((purchaseOrder) => (
    <Option key={purchaseOrder.id}>{purchaseOrder.purchaseOrderNo}</Option>
  ));

  const onDeleteClicked = (index) => {
    const newOrders = materialsReceivingOrders;
    newOrders.splice(index, 1);
    const newMaterialsReceiving = {
      ...materialsReceivingState,
      orders: newOrders,
    };
    setMaterialsReceivingState(newMaterialsReceiving);
    dispatcher(actions.setMRR(newMaterialsReceiving));
    setMaterialsReceivingOrders(newOrders);
    ordersToDisplay();
  };
  const ordersToDisplay = () => {
    const purchaseOrdersReceived = selectedPurchaseOrder.orders.map(
      (order, index) => (
        <Row key={index}>
          <Col span={23}>
            <MaterialsReceivingOrder
              key={"order" + index}
              order={order}
              index={index}
              inputState={inputState}
              materialsReceivingState={materialsReceivingState}
              purchaseOrderOrder={selectedPurchaseOrder.orders[index]}
            />
          </Col>
          <Col span={1}>
            <Button
              key={"btn" + index}
              onClick={() => onDeleteClicked(index)}
              style={{ borderStyle: "none", marginLeft: 0 }}
            >
              <MinusCircleOutlined style={{ color: "red" }} />
            </Button>
          </Col>
        </Row>
      )
    );
    setDisplayedOrders(purchaseOrdersReceived);
  };

  useEffect(() => {
    dispatcher(actions.fetchProjects());
    ordersToDisplay();
  }, [
    materialsReceiving,
    dispatcher,
    selectedPurchaseOrder,
    materialsReceivingState,
    setMaterialsReceivingState,
  ]);

  const onSelectClick = (data) => {
    const generateKey = uuid();
    setNewKey(generateKey);
    const newPurchaseOrder = purchaseOrders.find(
      (element) => element.id === data
    );
    setSelectedPurchaseOrder(newPurchaseOrder);
    dispatcher(actions.setPurchaseOrder(newPurchaseOrder));
    setMaterialsReceivingOrders(newPurchaseOrder.orders);
    const initOrders = [];
    for (const key in newPurchaseOrder.orders) {
      initOrders.push({
        product: newPurchaseOrder.orders[key].product,
        unit: newPurchaseOrder.orders[key].unit,
        quantity: newPurchaseOrder.orders[key].quantity,
        quantityReceived: 0,
        unitPrice: newPurchaseOrder.orders[key].unitPrice,
        category: newPurchaseOrder.orders[key].category,
      });
    }
    const initMaterialsReceiving = {
      ...materialsReceivingState,
      orders: initOrders,
      purchaseOrderNo: newPurchaseOrder.purchaseOrderNo,
      project: newPurchaseOrder.project,
    };
    const selectedProject = projects.find((element) => element.id === data);
    // const categories = [];

    // for (const budgetCost in selectedProject.budget.budgetCost) {
    //   for (const subCategories in selectedProject.budget.budgetCost[budgetCost].subCategories) {
    //     for (const subCategoryItems in selectedProject.budget
    //       .budgetCost[budgetCost]
    //       .subCategories[subCategories]
    //       .subCategoryItem) {

    //       const newCategories = selectedProject.budget.budgetCost[budgetCost].itemCode
    //         + '.' + selectedProject.budget.budgetCost[budgetCost].subCategories[subCategories].itemCode
    //         + '.' + selectedProject.budget.budgetCost[budgetCost].subCategories[subCategories].subCategoryItem[subCategoryItems].itemCode
    //       categories.push(newCategories);

    //     }
    //   }
    // }

    // setCategoriesState(categories);

    setMaterialsReceivingState(initMaterialsReceiving);
    dispatcher(actions.setMRR(initMaterialsReceiving));
    dispatcher(actions.setCategories(newPurchaseOrder.project));
    setProjectState(newPurchaseOrder.project);
    setInputState(true);
    //setSelectedPurchaseOrder(data);
  };

  const onCalendarSelected = (data) => {
    const date = moment(data._d).format("MMMM Do YYYY");
    const newMRR = {
      ...materialsReceiving,
      deliveryDate: date,
    };
    setMaterialsReceivingState(newMRR);
    dispatcher(actions.setMRR(newMRR));
    setDateSelected(date);
    setCalendarVisible(false);
  };

  const onClockSelected = (data) => {
    const timePicked = moment(data._d).format("hh:mm A");
    const newMaterialsReceiving = {
      ...materialsReceiving,
      deliveryTime: timePicked,
    };
    setMaterialsReceivingState(newMaterialsReceiving);
    dispatcher(actions.setMRR(newMaterialsReceiving));
  };

  const onDeliveredBy = (data) => {
    const newDeliveredBy = data;

    const newMaterialsReceiving = {
      ...materialsReceiving,
      deliveredBy: newDeliveredBy,
    };

    setMaterialsReceivingState(newMaterialsReceiving);
    dispatcher(actions.setMRR(newMaterialsReceiving));
  };

  const materialsReceivingNoChange = (data) => {
    const newMaterialsReceivingNo = data;

    const newMaterialsReceiving = {
      ...materialsReceiving,
      materialsReceivingNo: newMaterialsReceivingNo,
    };

    setMaterialsReceivingState(newMaterialsReceiving);
    dispatcher(actions.setMRR(newMaterialsReceiving));
  };
  return (
    <Form>
      <Spin spinning={loading}>
        <Row>
          <Col span={8} />
          <Col span={8}>
            <Logo />
          </Col>
        </Row>

        <Row style={{ marginBottom: 0, fontWeight: "bold" }}>
          <Col span={18} />
          <Col span={6}>
            <Form.Item
              name="materialsReceivingNo"
              label="No"
              rules={[
                {
                  required: true,
                  message: "Please input a materials receiving number!",
                },
              ]}
            >
              <Input
                style={{ color: "red" }}
                onChange={(e) => materialsReceivingNoChange(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ marginTop: 0, marginBottom: 20 }}>
          <Col
            span={24}
            style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}
          >
            Material Receiving Report
          </Col>
        </Row>

        <Row style={{ fontWeight: "bold" }}>
          <Col span={6} style={{ borderStyle: "solid", borderWidth: 1 }}>
            <Row
              style={{
                borderStyle: "solid",
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
            >
              <Col
                span={24}
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Delivered by
              </Col>
            </Row>
            <Row style={{ height: 30 }}>
              <Col
                span={24}
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                <Form.Item
                  style={{ height: 25 }}
                  name="deliveredBy"
                  initialValue="Engr Jojo Salamanes"
                  rules={[
                    { required: true, message: "Please input delivered by!" },
                  ]}
                >
                  <Input
                    style={{ height: 25 }}
                    onChange={(e) => onDeliveredBy(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={10} />
          <Col span={4} style={{ textAlign: "center" }}>
            <Row
              style={{
                borderStyle: "solid",
                borderWidth: 1,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <Col style={{ textAlign: "center" }} span={24}>
                Delivery Date
              </Col>
            </Row>
            <Row
              style={{
                borderStyle: "solid",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <Col span={24}>
                <Form.Item style={{ height: 10 }}>
                  <Input
                    onClick={() => setCalendarVisible(true)}
                    value={dateSelected}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col
            span={4}
            style={{
              textAlign: "center",
              borderStyle: "solid",
              borderWidth: 1,
              borderLeftWidth: 0,
            }}
          >
            <Row>
              <Col
                span={24}
                style={{
                  borderStyle: "solid",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  textAlign: "center",
                }}
              >
                Time
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <TimePicker
                  bordered={false}
                  format="h:mm a"
                  onChange={(e) => onClockSelected(e)}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ fontWeight: "bold", marginTop: 20 }}>
          <Col
            span={4}
            style={{
              borderStyle: "solid",
              textAlign: "center",
              borderWidth: 1,
            }}
          >
            P.O/Inv. No
          </Col>
          <Col
            span={7}
            style={{
              textAlign: "center",
              borderStyle: "solid",
              borderWidth: 1,
              borderLeftWidth: 0,
            }}
          >
            Material Description
          </Col>
          <Col
            span={2}
            style={{
              borderStyle: "solid",
              textAlign: "center",
              borderWidth: 1,
              borderLeftWidth: 0,
            }}
          >
            Qty
          </Col>
          <Col
            span={2}
            style={{
              borderStyle: "solid",
              textAlign: "center",
              borderWidth: 1,
              borderLeftWidth: 0,
            }}
          >
            Unit
          </Col>
          <Col
            span={3}
            style={{
              borderStyle: "solid",
              textAlign: "center",
              borderWidth: 1,
              borderLeftWidth: 0,
            }}
          >
            Price
          </Col>
          <Col
            span={3}
            style={{
              borderStyle: "solid",
              textAlign: "center",
              borderWidth: 1,
              borderLeftWidth: 0,
            }}
          >
            Amount
          </Col>
          <Col
            span={2}
            style={{
              borderStyle: "solid",
              textAlign: "center",
              borderWidth: 1,
              borderLeftWidth: 0,
            }}
          >
            Category
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Select style={{ width: 158 }} onSelect={(e) => onSelectClick(e)}>
              {purchaseOrdersList}
            </Select>
          </Col>
          <Col span={20}>{displayedOrders}</Col>
        </Row>
        <Modal
          visible={calendarVisible}
          onCancel={() => setCalendarVisible(false)}
          onOk={() => setCalendarVisible(false)}
        >
          <Calendar
            fullscreen={false}
            onSelect={(e) => onCalendarSelected(e)}
          />
        </Modal>
      </Spin>
    </Form>
  );
};

export default MaterialsReceivingModal;
