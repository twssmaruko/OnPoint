import React, { useState, memo, useEffect } from 'react';
import moment from 'moment';
import {
  Row,
  Table,
  Spin,
  Col,
  Checkbox
} from 'antd';
import { CheckCircleFilled, EditTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import TableButton from '../../../components/button/OnpointButton';
import PurchaseOrderDetails from './PurchaseOrderDetails';
import * as uiActions from '../../../store/ui/actions/Actions';
import * as actions from '../../../store/purchaseorders/actions/Actions';

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
  const [purchaseOrderDetailsModal, setPurchaseOrderDetailsModal] = useState(null);
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
  const poStatusDisplay = (status) =>
    status === 'pending' ? <div>PENDING<ExclamationCircleOutlined style={{
      marginLeft: 20,
      color: 'orange'
    }} /></div> : <div> RECEIVED
      <CheckCircleFilled style={{
          marginLeft: 20,
          color: 'green'
        }} /></div>
  const poNumberDisplay = (data) => `${data.purchaseOrderNo}`;
  const projectDisplay = (data) => `${data.project}`;


  const columns = [
    {
      title: 'Details',
      key: 'details',
      width: 100,
      render: editButton
    },
    {
      title: 'PO Number',
      key: 'purchaseOrderNo',
      width: 250,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => b.purchaseOrderId - a.purchaseOrderId,
      render: poNumberDisplay
    },
    {
      title: 'Project',
      key: 'project',
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
      title: 'Requested On',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      width: 250,
      render: (createdAt) => moment(createdAt).format('MMMM Do YYYY, h:mm:ss A')
    }
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
            <Table
              columns={columns}
              dataSource={checkDisplay()}
              size="small"
              rowKey="id"
              pagination={{
                pageSize: 10
              }}
            />
          </Spin>
        </div>
      </Row>
      {purchaseOrderDetailsModal}
    </div>
  )

});

export default PurchaseOrderTable;