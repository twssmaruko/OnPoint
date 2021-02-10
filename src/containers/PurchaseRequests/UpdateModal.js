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
import { AlertTwoTone } from "@ant-design/icons";
// import _ from 'lodash';
import * as uiActions from "../../store/ui/actions/Actions";
import * as actions from "../../store/purchaserequest/actions/Actions";
import ReactDataSheet from "react-datasheet";
import Logo from '../../components/logo/Logo';

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

  useEffect(() => {
    // console.log('purchaseRequestData: ', purchaseRequestData);
  }, [purchaseRequestData]);

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

  return (
    <div>
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
                {<Input
                  style={{color: 'black'}}
                  disabled={true}
                  bordered={false}
                  defaultValue={purchaseRequestData.purchaseRequestNo}
                />}
              </Col>
            </Row>
          </Col>
          <Col span={16} />
        </Row>

      </Modal>
    </div>
  );
};

export default Updatemodal;
