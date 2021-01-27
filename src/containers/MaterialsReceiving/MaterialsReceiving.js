import React, { useState, memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Row, Table, Spin, Col, Button, Modal, Checkbox, message } from "antd";
import {
  CheckCircleFilled,
  EditTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import MaterialsReceivingModal from "./MaterialsReceivingModal";
import * as actions from "../../store/materialsreceiving/actions/Actions";
import materialsReceivingReducer from "../../store/materialsreceiving/reducer/Reducer";

const MaterialsReceiving = () => {
  const columns = [
    {
      title: "Details",
      key: "details",
      width: 100,
    },
    {
      title: "MMR",
      key: "materialsReceivingNo",
      width: 250,
      defaultSortOrder: "ascend",
      sorter: (a, b) => b.purchaseOrderId - a.purchaseOrderId,
    },
    {
      title: "PO Number",
      key: "purchaseOrderNo",
      width: 250,
    },
    {
      title: "Received On",
      dataIndex: "dateCreated",
      key: "dateCreated",
      width: 250,
      render: (createdAt) =>
        moment(createdAt).format("MMMM Do YYYY, h:mm:ss A"),
    },
  ];

  const { purchaseOrders, materialsReceiving, selectedPurchaseOrder } = useSelector(
    ({ materialsReceiving }) => ({
      purchaseOrders: materialsReceiving.purchaseOrders,
      selectedPurchaseOrder: materialsReceiving.purchaseOrder,
      materialsReceiving: materialsReceiving.materialsReceiving,
    }),
    shallowEqual
  );

  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(actions.fetchPurchaseOrders());
  }, [dispatcher]);

  const [formState, setFormState] = useState(false);

  const newMaterialsReceiving = () => {
    setFormState(true);
  };

  const onCancel = () => {
    setFormState(false);
  };

  const onOk = () => {
    let validity = true;
    for (const key in materialsReceiving.orders) {
      if (materialsReceiving.orders[key].category === "not specified") {
        console.log('materialsReceivingOrders: ', materialsReceiving.orders[key].category);
        message.error("Please choose a category!");
        validity = false;
      }
    }
    if (materialsReceiving.deliveredBy === "") {
      message.error("Please fill out Delivered By!");
      validity = false;
    }

    if (materialsReceiving.deliveryDate === "") {
      message.error("Please fill out Delivery Date!");
      validity = false;
    }

    if (materialsReceiving.deliveryTime === "") {
      message.error("Please fill out Delivery Time!");
      validity = false;
    }

    if (materialsReceiving.materialsReceivingNo === "") {
      message.error("Please fill out Materials Receiving No.!");
      validity = false;
    }

    if (validity === true) {
      dispatcher(actions.createMMR());
      setFormState(false);
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        marginLeft: "20%",
        marginRight: "20%",
      }}
    >
      <Row style={{ marginBottom: 10 }}>
        <Col span={5}></Col>
      </Row>
      <Row>
        <h1 style={{ fontWeight: "bold", color: "#FF111B" }}>
          MATERIALS RECEIVING
        </h1>
      </Row>
      <Row style={{ marginLeft: 0 }}>
        <Col span={5} style={{ textAlign: "left" }}>
          <div className="ant-btn-div">
            <Button
              type="link"
              onClick={newMaterialsReceiving}
              style={{
                fontWeight: "bold",
                fontSize: 26,
                borderStyle: "solid",
                borderWidth: 1,
                color: "#13407F",
              }}
            >
              New MMR
            </Button>
          </div>
        </Col>
        <Col span={18} style={{ marginTop: 10 }}>
          <Checkbox style={{ fontWeight: "bold", fontSize: 18 }}>
            See ALL
          </Checkbox>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <div style={{ border: "1px solid black" }}>
          <Spin spinning={false}>
            <Table
              columns={columns}
              size="small"
              rowKey="id"
              pagination={{
                pageSize: 10,
              }}
            />
          </Spin>
        </div>
      </Row>
      <Modal
        visible={formState}
        maskClosable={false}
        onCancel={onCancel}
        onOk={onOk}
        width={1000}
      >
        <MaterialsReceivingModal purchaseOrders={purchaseOrders} />
      </Modal>
    </div>
  );
};

export default MaterialsReceiving;
