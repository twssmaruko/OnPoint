import React, { lazy, useState, useEffect } from "react";
import {
  Row,
  Button,
  // Select,
  Table,
  // DatePicker,
  Spin,
  Col,
  Checkbox,
  //message,
  Modal,
} from "antd";
import "./PurchaseRequest.css";
import {
  CloseCircleFilled,
  CheckCircleFilled,
  EditTwoTone,
  ExclamationCircleOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import PurchaseRequestNumberModal from "./PurchaseRequestNumberModal";
import PurchaseRequestGasModal from './PurchaseRequestGasModal';
import moment from "moment";
//import _ from 'lodash';

import * as uiActions from "../../store/ui/actions/Actions";
import * as actions from "../../store/purchaserequest/actions/Actions";
import TableButton from "../../components/button/OnpointButton";
import OPC from '../../api/OPC';
//import {setPurchaseRequest} from '../../store/purchaseorders/actions/Actions';

const PurchaseRequestFormModal = lazy(() =>
  import("./PurchaseRequestFormModal")
);
const UpdateModal = lazy(() => import("./UpdateModal"));

const PurchaseRequests = () => {
  const dispatcher = useDispatch();
  //const {Option} = Select;
  // const childRef = useRef();
  const [displayAddModal, setDisplayAddModal] = useState(null);
  const [displayUpdateModal, setDisplayUpdateModal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  // const [purchaseRequestValue, setPurchaseRequestValue] = useState({orders: []});
  //const [params, setParams] = useState({});
  const {
    purchaseRequestsList,
    pendingPurchaseRequests,
    tableSpin,
  } = useSelector(
    ({ ui, purchaseRequests }) => ({
      purchaseRequestsList: purchaseRequests.purchaseRequests,
      pendingPurchaseRequests: purchaseRequests.purchaseRequestsPending,
      tableSpin: ui.showSpin3,
    }),
    shallowEqual
  );

  useEffect(() => {
    // dispatcher(actions.getMonthlyPurchaseRequests());
    dispatcher(actions.fetchPurchaseRequests());
    // dispatcher(actions.initSubscriptions());
    // return () => {
    //   dispatcher(actions.unsubscribe());
    // };
  }, [dispatcher]);

  const onDetailsClick = async(item) => {
    const response = await OPC.get('/purchase_requests/orders/' + item.purchase_request_id);
    console.log(response.data);
    const purchaseRequestData = {
      ...item,
      orders: response.data
    }
    console.log('purchaseRequestData: ', purchaseRequestData);

    const newUpdateModal = <UpdateModal purchaseRequestData={purchaseRequestData} />;
    
    setDisplayUpdateModal(newUpdateModal);
    dispatcher(uiActions.setOpenModal2(true));
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const setModal = () => {
    setModalVisible(false);
    if (displayAddModal === null) {
      setDisplayAddModal(<PurchaseRequestFormModal />);
    }
    dispatcher(uiActions.setOpenModal1(true));
  };

  const [seeAll, setSeeAll] = useState(false);

  const purchaseRequestNumberModal = (
    <Modal
      maskClosable={false}
      key={"purchaseRequestNo-" + uuidv4}
      title="Purchase Request Number"
      visible={modalVisible}
      onOk={setModal}
      onCancel={handleCancel}
      width={250}
      okText="Proceed"
      cancelText="Cancel"
    >
      <PurchaseRequestNumberModal
        key={"purchaseRequestNumber-" + uuidv4}
        purchaseRequestKey={"purchaseRequestKey-" + uuidv4}
      />
    </Modal>
  );


  

  const editButton = (item) => (
    <div>
      <TableButton
        value={item}
        type="primary"
        icon={<EditTwoTone />}
        onClick={onDetailsClick}
      />
    </div>
  );
  const approvedDisplay = (is_approved) =>
    is_approved === true ? (
      <CheckCircleFilled style={{ marginLeft: 20, color: "green" }} />
    ) : (
      <CloseCircleFilled style={{ marginLeft: 20, color: "red" }} />
    );
  const prStatusDisplay = (status) =>
    status === "PENDING" ? (
      <div>
        PENDING
        <ExclamationCircleOutlined
          style={{ marginLeft: 20, color: "orange" }}
        />
      </div>
    ) : (
      <div>
        {" "}
        ORDERED
        <CheckCircleFilled style={{ marginLeft: 20, color: "green" }} />
      </div>
    );
  const prNumberDisplay = (data) => `PR ${data.purchase_request_number}`;

  const onDeleteConfirmed = () => {
    dispatcher(actions.deletePurchaseRequest(deleteId));
    setDisplayDeleteModal(false);
  }

  const deleteModal = <Modal visible={displayDeleteModal}
  onCancel={() => {
    setDisplayDeleteModal(false)
  }}
  onOk={(e) => onDeleteConfirmed(e)}> 
  Are you sure you want to delete this Purchase Request?
  </Modal>;



  const deleteItem = (data) => {
    setDeleteId(data);
    setDisplayDeleteModal(true);
  };

  const deleteButton = (item) => (
    <div>
      <TableButton
        value={item}
        type="danger"
        icon={<DeleteFilled />}
        onClick={deleteItem}
      />
    </div>
  );

  const columns = [
    {
      title: "Details",
      key: "details",
      width: 100,
      render: editButton,
    },
    {
      title: "PR Number",
      key: "purchase_request_number",
      width: 250,
      //defaultSortOrder: "ascend",
      sorter: (a, b) => (a.purchase_request_number < b.purchase_request_number ? 1 : -1),
      render: prNumberDisplay,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 250,
      // filters: [
      //   {
      //     text: 'PENDING',
      //     value: 'PENDING'
      //   },
      //   {
      //     text: 'ORDERED',
      //     value: 'ORDERED'
      //   }
      // ],
      // filterMultiple: false,
      // onFilter: (value, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
      render: prStatusDisplay,
    },
    {
      title: "Approved",
      dataIndex: "is_approved",
      key: "isApproved",
      width: 200,
      sorter: (a, b) => b.is_approved.length - a.is_approved.length,
      render: approvedDisplay,
    },
    {
      title: "Requested On",
      dataIndex: "date_created",
      key: "dayMonthYear",
      width: 250,
      // defaultSortOrder: 'ascend',
      sorter: ((a, b) => b.date_created - a.date_created),
      defaultSortOrder: "ascend",
      render: (createdAt) =>
        //moment(createdAt).format("MMMM Do YYYY"),
        moment(createdAt).format("MMMM Do YYYY, h:mm:ss A"),
    },
    {
      title: "Delete",
      render: deleteButton,
      key: "delete",
      width: "1%",
    },
  ];

  const onChecked = () => {
    const booleanFlag = seeAll;
    setSeeAll(!booleanFlag);
  };

  const checkDisplay = () => {
    if (!seeAll) {
      return pendingPurchaseRequests;
    }
    return purchaseRequestsList ;
  };

  return (
    <div>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "20%",
          marginTop: 20,
        }}
      >
        <Row>
          <h1 style={{ fontWeight: "bold", color: "#FF111B" }}>
            PURCHASE REQUESTS
          </h1>
        </Row>
        <Row style={{ marginLeft: 0 }}>
          <Col span={7} style={{ textAlign: "left" }}>
            <div className="ant-btn-div">
              <Button
                type="link"
                style={{ fontWeight: "bold", fontSize: 26, color: "#13407F" }}
                className="ant-btn-menu"
                onClick={() => {setDisplayAddModal(<PurchaseRequestFormModal />)
                  dispatcher(uiActions.setOpenModal1(true));}}
              >
                New Purchase Request
              </Button>
            </div>
          </Col>
          <Col span={8} style={{ textAlign: "left" }}>
            <div className="ant-btn-div">
              <Button
                type="link"
                style={{ fontWeight: "bold", fontSize: 26, color: "#13407F" }}
                className="ant-btn-menu"
                onClick={() => {setDisplayAddModal(<PurchaseRequestGasModal />)
                  dispatcher(uiActions.setOpenModal1(true));}}
              >
                New Purchase Request Gas
              </Button>
            </div>
          </Col>
          <Col span={3} style={{ marginTop: 10 }}>
            <Checkbox
              defaultChecked={false}
              style={{ fontWeight: "bold", fontSize: 18 }}
              onChange={onChecked}
            >
              See ALL
            </Checkbox>
          </Col>
        </Row>
      </Row>

      <Row
        style={{
          marginTop: 3,
          marginLeft: "20%",
          marginRight: "20%",
        }}
      >
        <div style={{ border: "1px solid black" }}>
          <Spin spinning={tableSpin}>
            <Table
              columns={columns}
              dataSource={checkDisplay()}
              size="small"
              rowKey="purchase_request_id"
              pagination={{
                pageSize: 10,
              }}
            />
          </Spin>
        </div>
      </Row>
      {purchaseRequestNumberModal}
      {displayAddModal}
      {displayUpdateModal}
      {deleteModal}
      {/* <Updatemodal initialValue={initialPurchaseRequest} /> */}
    </div>
  );
};

export default PurchaseRequests;
