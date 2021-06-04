import React, { useState, memo, useEffect } from 'react';
import moment from 'moment';
import {
  Row,
  Table,
  Spin,
  Col,
  Checkbox,
  Modal
} from 'antd';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { CheckCircleFilled, EditTwoTone, ExclamationCircleOutlined, DeleteFilled, StopOutlined, CloseCircleOutlined } from '@ant-design/icons';
import TableButton from '../../../components/button/OnpointButton';
import PurchaseOrderDetails from './PurchaseOrderDetails';
import * as uiActions from '../../../store/ui/actions/Actions';
import * as actions from '../../../store/purchaseorders/actions/Actions';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useSelector, shallowEqual, useDispatch
  // useDispatch
} from 'react-redux';

import './PurchaseOrder.css'


const PurchaseOrderTable = memo(() => {

  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(actions.fetchPurchaseOrders())
  }, [dispatcher])
  const {
    // purchaseRequestsList,
    tableSpin,
    purchaseOrders,
    pendingPurchaseOrders
    // ordersReceived
  } = useSelector(({ ui, purchaseOrder }) => ({
    // openAnotherModal: ui.openModal2,
    // purchaseRequestsList: purchaseRequests.purchaseRequests,
    tableSpin: ui.showSpin3,
    purchaseOrders: purchaseOrder.purchaseOrders,
    pendingPurchaseOrders: purchaseOrder.purchaseOrdersPending,
    ordersReceived: purchaseOrder.ordersReceived,
    project: purchaseOrder.project
  }), shallowEqual);


  // console.log("hey")
  const [, setCurrentPurchaseOrder] = useState({});
  const [seeAll, setSeeAll] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [cancelId, setCancelId] = useState(0);
  const [displayCancelModal, setDisplayCancelModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [purchaseOrderDetailsModal, setPurchaseOrderDetailsModal] = useState(null);
  const [tableKey, setTableKey] = useState('purchaseOrder');
  const editButton = (item) =>
    <div>
      <TableButton
        value={item}
        type="primary"
        icon={<EditTwoTone />}
        onClick={(e) => onDetailsClick(e)} />
    </div>;


  // const approvedDisplay = (isApproved) =>
  //   isApproved === true ? <CheckCircleFilled style={{marginLeft: 20,
  //     color: 'green'}} />
  //     : <CloseCircleFilled style={{marginLeft: 20,
  //       color: 'red'}} />;
  const poStatusDisplay = (status) => {
    if (status === 'PENDING') {
      return <div>PENDING<ExclamationCircleOutlined style={{
        marginLeft: 20,
        color: 'orange'
      }} /></div>
    }

    else if (status === 'RECEIVED') {
      return <div> RECEIVED
      <CheckCircleFilled style={{
          marginLeft: 20,
          color: 'green'
        }} /></div>
    } else {
      return <div>CANCELLED<CloseCircleOutlined style={{
        marginLeft: 20,
        color: 'red'
      }} /></div>
    }
  }

  const poNumberDisplay = (data) => `${data.purchase_order_number}`;
  const projectDisplay = (data) => `${data.project}`;
  const prDisplay = (data) => `${data.purchaseRequestNumber}`;

  const onDeleteConfirmed = () => {
    dispatcher(actions.deletePurchaseOrder(deleteId));
    setDisplayDeleteModal(false);
  }

  const onCancelConfirmed = () => {
    //dispatcher(actions.deletePurchaseOrder(deleteId));
    dispatcher(actions.cancelPurchaseOrder(cancelId));
    setDisplayCancelModal(false);
  }

  const deleteModal = <Modal visible={displayDeleteModal}
    onCancel={() => {
      setDisplayDeleteModal(false)
    }}
    onOk={(e) => onDeleteConfirmed(e)}>
    Are you sure you want to delete this Purchase Order?
  </Modal>;

  const cancelModal = <Modal visible={displayCancelModal}
    onCancel={() => {
      setDisplayCancelModal(false)
    }}
    onOk={() => onCancelConfirmed()}>
    Are you sure you want to cancel this Purchase Order?
</Modal>;



  const deleteItem = (data) => {
    setDeleteId(data.purchase_order_id);
    setDisplayDeleteModal(true);
  };

  const cancelItem = (data) => {
    setCancelId(data.purchase_order_id);
    setDisplayCancelModal(true);
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

  const cancelButton = (item) => (
    <div>
      <TableButton
        value={item}
        type="danger"
        icon={<StopOutlined />}
        onClick={cancelItem}
      />
    </div>
  );


  const columns = [
    {
      title: 'Details',
      key: 'details',
      width: 100,
      render: editButton
    },
    {
      title: 'PO Number',
      key: 'purchase_order_number',
      width: 250,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => b.purchase_order_id - a.purchase_order_id,
      render: poNumberDisplay
    },
    {
      title: 'Project',
      key: 'project_id',
      width: 250,
      render: projectDisplay
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 250,
      render: poStatusDisplay
    },
    {
      title: 'PR',
      key: 'purchase_request_id',
      width: 250,
      render: prDisplay
    },
    {
      title: 'Requested On',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 250,
      render: (createdAt) => moment(createdAt).format('MMMM Do YYYY, h:mm:ss A')
    },
    {
      title: 'Cancel',
      render: cancelButton,
      key: 'cancel',
      width: '1%'
    },
    {
      title: "Delete",
      render: deleteButton,
      key: "delete",
      width: "1%",
    },
  ];

  const onDetailsClick = (e) => {
    // dispatcher(actions.fetchProjectForPurchaseOrder(e.project))

    // dispatcher(actions.initiateUpdateModal(item.id));
    setCurrentPurchaseOrder(e);
    dispatcher(uiActions.setOpenModal1(true));
    // setPurchaseOrderDetailsModal(<PurchaseOrderModal />)
    setPurchaseOrderDetailsModal(<PurchaseOrderDetails purchaseOrder={e} initOrders={[]} />)
  };

  const onChecked = () => {
    const boolFlag = seeAll;
    setSeeAll(!boolFlag);
  }

  const checkDisplay = () => {
    if (!seeAll) {
      return pendingPurchaseOrders
    }
    return purchaseOrders
  }

  return (
    <div style={{
      marginTop: 20,
      marginLeft: '20%',
      marginRight: '20%'
    }}>
      {/* <div style={{display: 'flex',
          alignItems: 'center'}}>
          <h4>Requested On:</h4>
          <div>
            <DatePicker
              disabled={params.monthYear}
              allowClear
              placeholder="Specific Day"
              style={{
                marginLeft: 15,
                marginBottom: 10,
                width: 130,
                border: '0.5px solid black'
              }}
              onChange={onDateSelect}
            />
          </div>

          <DatePicker
            disabled={params.dayMonthYear}
            allowClear
            picker="month"
            placeholder="Year/Month"
            style={{
              marginLeft: 5,
              marginBottom: 10,
              width: 130,
              border: '0.5px solid black'
            }}
            onChange={onMonthYearSelect}
          />
          <h4 style={{marginLeft: 110}}>Status</h4>
          <Select
            allowClear
            style={{
              marginLeft: 10,
              marginBottom: 10,
              width: 170,
              border: '0.5px solid black'
            }}
            onChange={handleStatusChange}
          >
            <Option value="ORDERED">ORDERED</Option>
            <Option value="PENDING">PENDING</Option>
            <Option value="RECEIVED">RECEIVED</Option>
          </Select>
          <h4 style={{marginLeft: 20}}>Approved</h4>
          <Select
            allowClear
            onChange={onApprovedChange}
            style={{
              marginLeft: 10,
              marginBottom: 10,
              width: 170,
              border: '0.5px solid black'
            }}
          >
            <Option value="APPROVED">APPROVED</Option>
            <Option value="NOTAPPROVED">NOT APPROVED</Option>
          </Select>

          <Button
            style={{marginLeft: 10,
              backgroundColor: '#13407F',
              color: 'white',
              marginBottom: 10}}
            onClick={onSearch}
          >
                Search
          </Button>

        </div> */}
      <Row style={{ marginBottom: 10 }}>
        <Col span={5}>
          <Checkbox onChange={onChecked}
            style={{
              fontWeight: 'bold',
              fontSize: 18
            }}>
            See ALL
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <div style={{ border: '1px solid black' }}>
          <Spin spinning={tableSpin}>
            <Tabs
              id="tabs-purchaseOrders"
              activeKey={tableKey}
              onSelect={(e) => setTableKey(e)}>
              <Tab eventKey="purchaseOrder" title="Purchase Orders">
                <Table
                  columns={columns}
                  dataSource={checkDisplay()}
                  size="small"
                  rowKey="purchase_order_id"
                  pagination={{
                    pageSize: 10
                  }}
                />
              </Tab>
              <Tab eventKey="purchaseOrderGas" title="Gas">
                <Table
                  columns={columns}
                  dataSource={checkDisplay()}
                  size="small"
                  rowKey="purchase_order_id"
                  pagination={{
                    pageSize: 10
                  }}
                />
              </Tab>
            </Tabs>
          </Spin>
        </div>
      </Row>
      {purchaseOrderDetailsModal}
      {deleteModal}
      {cancelModal}
    </div>
  )

});

export default PurchaseOrderTable;