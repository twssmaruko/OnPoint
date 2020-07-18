import React, { useState, useEffect } from 'react';
import {
  Row,
  Button,
  Select,
  Table,
  DatePicker,
  Spin,
  message,
} from 'antd';

import { CloseCircleFilled, CheckCircleFilled, EditTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import _ from 'lodash';

// import { SearchOutlined } from '@ant-design/icons';
import PurchaseRequestFormModal from './PurchaseRequestFormModal';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/purchaserequest/actions/Actions';
import TableButton from '../../components/button/OnpointButton';
import Updatemodal from './UpdateModal';

const PurchaseRequests = () => {
  const { Option } = Select;
  // const childRef = useRef();
  const dispatcher = useDispatch();
  const [initialPurchaseRequest, setInitialPurchaseRequest] = useState({});
  const [params, setParams] = useState({});
  const {
    purchaseRequestsList,
    tableSpin,
  } = useSelector(({ ui, purchaseRequests }) => ({
    openAnotherModal: ui.openModal2,
    purchaseRequestsList: purchaseRequests.purchaseRequests,
    tableSpin: ui.showSpin3,
  }));

  useEffect(() => {
    dispatcher(actions.getMonthlyPurchaseRequests());
    dispatcher(actions.initSubscriptions());
    return () => {
      dispatcher(actions.unsubscribe());
    };
  }, [dispatcher]);

  const onDetailsClick = (item) => {
    setInitialPurchaseRequest(item);
    dispatcher(actions.initiateUpdateModal(item.id));
  };

  const editButton = (item) => (
    <div>
      <TableButton value={item} type="primary" icon={<EditTwoTone />} onClick={onDetailsClick} />
    </div>
  );

  const approvedDisplay = (isApproved) => (
    isApproved === 'APPROVED' ? <CheckCircleFilled style={{ marginLeft: 20, color: 'green' }} />
      : <CloseCircleFilled style={{ marginLeft: 20, color: 'red' }} />
  );

  const prNumberDisplay = (data) => `PR ${data.purchaseRequestNo}`;

  const columns = [
    {
      title: 'Details',
      key: 'details',
      width: 100,
      render: editButton,
    },
    {
      title: 'PR Number',
      key: 'PurchaseRequestNo',
      width: 250,
      render: prNumberDisplay,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 250,
    },
    {
      title: 'Approved',
      dataIndex: 'isApproved',
      key: 'isApproved',
      width: 200,
      render: approvedDisplay,
    },
    {
      title: 'Requested On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 250,
      render: (createdAt) => moment(createdAt).format('MMMM Do YYYY, h:mm:ss A'),
    },

  ];

  const setModal = () => {
    dispatcher(uiActions.setOpenModal1(true));
  };

  const onSearch = () => {
    if (!_.isEmpty(params)) {
      dispatcher(actions.getPurchaseRequests(params));
      return;
    }
    message.info('Select options first');
  };

  const onDateSelect = (date) => {
    if (!date) {
      const newParams = params;
      delete newParams.dayMonthYear;
      setParams({ ...newParams });
      return;
    }
    setParams({ ...params, dayMonthYear: moment(date).format('DD-MM-YYYY') });
  };

  const onMonthYearSelect = (date) => {
    if (!date) {
      const newParams = params;
      delete newParams.monthYear;
      setParams({ ...newParams });
      return;
    }
    setParams({ ...params, monthYear: moment(date).format('MM-YYYY') });
  };

  const handleStatusChange = (value) => {
    if (!value) {
      const newParams = params;
      delete newParams.status;
      setParams({ ...newParams });
      return;
    }
    setParams({ ...params, status: value });
  };

  const onApprovedChange = (value) => {
    if (!value) {
      const newParams = params;
      delete newParams.isApproved;
      setParams({ ...newParams });
      return;
    }
    setParams({ ...params, isApproved: value });
  };

  return (
    <div>
      <Row style={{
        display: 'flex', flexDirection: 'column', marginLeft: '20%', marginTop: 20,
      }}
      >
        <Row>
          <h1>Purchase Request</h1>
        </Row>
        <Row>
          <Button type="primary" onClick={setModal}>
            New Purchase Request
          </Button>
        </Row>
      </Row>
      <Row style={{
        marginTop: 50,
        marginLeft: '20%',
        marginRight: '20%',
      }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
                border: '0.5px solid black',
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
              border: '0.5px solid black',
            }}
            onChange={onMonthYearSelect}
          />
          <h4 style={{ marginLeft: 110 }}>Status</h4>
          <Select
            allowClear
            style={{
              marginLeft: 10,
              marginBottom: 10,
              width: 170,
              border: '0.5px solid black',
            }}
            onChange={handleStatusChange}
          >
            <Option value="ORDERED">ORDERED</Option>
            <Option value="PENDING">PENDING</Option>
            <Option value="RECEIVED">RECEIVED</Option>
          </Select>
          <h4 style={{ marginLeft: 20 }}>Approved</h4>
          <Select
            allowClear
            onChange={onApprovedChange}
            style={{
              marginLeft: 10,
              marginBottom: 10,
              width: 170,
              border: '0.5px solid black',
            }}
          >
            <Option value="APPROVED">APPROVED</Option>
            <Option value="NOTAPPROVED">NOT APPROVED</Option>
          </Select>

          <Button
            type="primary"
            style={{ marginLeft: 10, marginBottom: 10 }}
            onClick={onSearch}
          >
            Search
          </Button>

        </div>
        <div style={{ border: '1px solid black' }}>
          <Spin spinning={tableSpin}>
            <Table
              columns={columns}
              dataSource={purchaseRequestsList}
              size="small"
              rowKey="id"
              pagination={{
                pageSize: 10,
              }}
            />
          </Spin>
        </div>
      </Row>
      <PurchaseRequestFormModal />
      <Updatemodal initialValue={initialPurchaseRequest} />
    </div>
  );
};

export default PurchaseRequests;
