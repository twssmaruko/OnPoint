import React, {useState, memo} from 'react';

import {
  Row,
  Table,
  DatePicker,
  Spin,
  Button,
  Select
} from 'antd';
import moment from 'moment';
import {CloseCircleFilled, CheckCircleFilled, EditTwoTone} from '@ant-design/icons';
import TableButton from '../../../components/button/OnpointButton';

import {
  useSelector, shallowEqual
  // useDispatch
} from 'react-redux';

import './PurchaseOrder.css'

const {Option} = Select;

const PurchaseOrderTable = memo(() => {


  const {
    // purchaseRequestsList,
    tableSpin
  } = useSelector(({ui}) => ({
    // openAnotherModal: ui.openModal2,
    // purchaseRequestsList: purchaseRequests.purchaseRequests,
    tableSpin: ui.showSpin3
  }), shallowEqual);


  console.log("hey")

  const [params, setParams] = useState({});

  const editButton = (item) =>
    <div>
      <TableButton
        value={item}
        type="primary"
        icon={<EditTwoTone />}
        onClick={onDetailsClick} />
    </div>;


  const approvedDisplay = (isApproved) =>
    isApproved === 'APPROVED' ? <CheckCircleFilled style={{marginLeft: 20,
      color: 'green'}} />
      : <CloseCircleFilled style={{marginLeft: 20,
        color: 'red'}} />;
  const prNumberDisplay = (data) => `PR ${data.monthYear}-${data.count}`;


  const columns = [
    {
      title: 'Details',
      key: 'details',
      width: 100,
      render: editButton
    },
    {
      title: 'PR Number',
      key: 'PurchaseRequestNo',
      width: 250,
      render: prNumberDisplay
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 250
    },
    {
      title: 'Approved',
      dataIndex: 'isApproved',
      key: 'isApproved',
      width: 200,
      render: approvedDisplay
    },
    {
      title: 'Requested On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 250,
      render: (createdAt) => moment(createdAt).format('MMMM Do YYYY, h:mm:ss A')
    }
  ];

  const onDetailsClick = () => {
    // dispatcher(actions.initiateUpdateModal(item.id));
  };



  const onSearch = () => {
    // dispatcher(actions.getPurchaseRequests(params));
  };

  const onDateSelect = (date) => {
    if (!date) {
      const newParams = params;
      delete newParams.dayMonthYear;
      setParams({...newParams});
      return;
    }
    setParams({...params,
      dayMonthYear: moment(date).format('DD-MM-YYYY')});
  };

  const onMonthYearSelect = (date) => {
    if (!date) {
      const newParams = params;
      delete newParams.monthYear;
      setParams({...newParams});
      return;
    }
    setParams({...params,
      monthYear: moment(date).format('MM-YYYY')});
  };

  const handleStatusChange = (value) => {
    if (!value) {
      const newParams = params;
      delete newParams.status;
      setParams({...newParams});
      return;
    }
    setParams({...params,
      status: value});
  };

  const onApprovedChange = (value) => {
    if (!value) {
      const newParams = params;
      delete newParams.isApproved;
      setParams({...newParams});
      return;
    }
    setParams({...params,
      isApproved: value});
  };

  return (
    <div>
      <Row style={{
        marginTop: 20,
        marginLeft: '20%',
        marginRight: '20%'
      }}
      >
        <div style={{display: 'flex',
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

        </div>
        <div style={{border: '1px solid black'}}>
          <Spin spinning={tableSpin}>
            <Table
              columns={columns}
              // dataSource={purchaseRequestsList}
              size="small"
              rowKey="id"
              pagination={{
                pageSize: 10
              }}
            />
          </Spin>
        </div>
      </Row>
    </div>
  )

});

export default PurchaseOrderTable;