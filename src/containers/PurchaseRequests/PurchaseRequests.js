import React, {lazy, useState, useEffect} from 'react';
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
  Modal
} from 'antd';
import './PurchaseRequest.css'
import {CloseCircleFilled, CheckCircleFilled, EditTwoTone, ExclamationCircleOutlined} from '@ant-design/icons';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import PurchaseRequestNumberModal from './PurchaseRequestNumberModal';
import moment from 'moment';
//import _ from 'lodash';

import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/purchaserequest/actions/Actions';
import TableButton from '../../components/button/OnpointButton';
//import {setPurchaseRequest} from '../../store/purchaseorders/actions/Actions';


const PurchaseRequestFormModal = lazy(() => import('./PurchaseRequestFormModal'));
const UpdateModal = lazy(() => import ('./UpdateModal'));

const PurchaseRequests = () => {
  const dispatcher = useDispatch();
  //const {Option} = Select;
  // const childRef = useRef();
  const [displayAddModal, setDisplayAddModal] = useState(null);
  const [displayUpdateModal, setDisplayUpdateModal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // const [purchaseRequestValue, setPurchaseRequestValue] = useState({orders: []});
  //const [params, setParams] = useState({});
  const {
    purchaseRequestsList,
    pendingPurchaseRequests,
    tableSpin
  } = useSelector(({ui, purchaseRequests}) => ({
    purchaseRequestsList: purchaseRequests.purchaseRequests,
    pendingPurchaseRequests: purchaseRequests.purchaseRequestsPending,
    tableSpin: ui.showSpin3
  }), shallowEqual);

  useEffect(() => {
    // dispatcher(actions.getMonthlyPurchaseRequests());
    dispatcher(actions.fetchPurchaseRequests());
    // dispatcher(actions.initSubscriptions());
    // return () => {
    //   dispatcher(actions.unsubscribe());
    // };
  }, [dispatcher]);




  const onDetailsClick = (item) => {
    // setPurchaseRequestValue(item);
    setDisplayUpdateModal(<UpdateModal  purchaseRequestData={item}/>)
    dispatcher(uiActions.setOpenModal2(true));
    // dispatcher(actions.initiateUpdateModal(item.id));
  };

  const handleCancel = () => {
    setModalVisible(false);
  }

  const setModal = () => {
    setModalVisible(false);
    if (displayAddModal === null) {
      setDisplayAddModal(<PurchaseRequestFormModal />);
    }
    dispatcher(uiActions.setOpenModal1(true))
  }

  const [seeAll, setSeeAll] = useState(false);

  const purchaseRequestNumberModal = <Modal
    maskClosable = {false}
    key={"projectCodeModal-" + uuidv4}
    title="Project Code"
    visible={modalVisible}
    onOk={setModal}
    onCancel={handleCancel}
    width={250}
    okText="Proceed"
    cancelText="Cancel">
    <PurchaseRequestNumberModal key={"purchaseRequestNumber-" + uuidv4} purchaseRequestKey = {"purchaseRequestKey-" + uuidv4} />
  </Modal>

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
  const prStatusDisplay = (status) =>
    status === 'PENDING' ? <div>PENDING<ExclamationCircleOutlined style={{marginLeft: 20,
      color: 'orange'}} /></div>: <div> ORDERED
      <CheckCircleFilled style={{marginLeft: 20,
        color: 'green'}} /></div>
  const prNumberDisplay = (data) => `PR ${data.purchaseRequestNo}`;

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
      defaultSortOrder: 'ascend',
      sorter: (a,b) => a.purchaseRequestIds > b.purchaseRequestIds ? 1 : -1,
      render: prNumberDisplay
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      sorter: (a,b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
      render: prStatusDisplay
    },
    {
      title: 'Approved',
      dataIndex: 'isApproved',
      key: 'isApproved',
      width: 200,
      sorter: (a,b) => b.isApproved.length - a.isApproved.length,
      render: approvedDisplay
    },
    {
      title: 'Requested On',
      dataIndex: 'dayMonthYear',
      key: 'dayMonthYear',
      width: 250,
      // defaultSortOrder: 'ascend',
      // sorter: (a,b) => b.isApproved.length - a.dayMonthYear.length,
      render: (createdAt) => moment(createdAt).format('MMMM Do YYYY, h:mm:ss A')
    }

  ];




  // dispatcher(uiActions.setOpenModal1(true));


  // const onSearch = () => {
  //   if (!_.isEmpty(params)) {
  //     // dispatcher(actions.fetchPurchaseRequests(params));
  //     return;
  //   }
  //   message.info('Select options first');
  // };

  // const onDateSelect = (date) => {
  //   if (!date) {
  //     const newParams = params;
  //     delete newParams.dayMonthYear;
  //     setParams({...newParams});
  //     return;
  //   }
  //   setParams({...params,
  //     dayMonthYear: moment(date).format('DD-MM-YYYY')});
  // };

  // const onMonthYearSelect = (date) => {
  //   if (!date) {
  //     const newParams = params;
  //     delete newParams.monthYear;
  //     setParams({...newParams});
  //     return;
  //   }
  //   setParams({...params,
  //     monthYear: moment(date).format('MM-YYYY')});
  // };

  // const handleStatusChange = (value) => {
  //   if (!value) {
  //     const newParams = params;
  //     delete newParams.status;
  //     setParams({...newParams});
  //     return;
  //   }
  //   setParams({...params,
  //     status: value});
  // };

  // const onApprovedChange = (value) => {
  //   if (!value) {
  //     const newParams = params;
  //     delete newParams.isApproved;
  //     setParams({...newParams});
  //     return;
  //   }
  //   setParams({...params,
  //     isApproved: value});
  // };

  const onChecked = () => {
    const booleanFlag = seeAll
    setSeeAll(!booleanFlag);
  }

  const checkDisplay = () => {
    if (!seeAll) {
      return pendingPurchaseRequests
    }
    return purchaseRequestsList
  }

  return (
    <div>
      <Row style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20%',
        marginTop: 20
      }}
      >
        <Row>
          <h1  style={{fontWeight: 'bold',
            color: '#FF111B'}}>PURCHASE REQUESTS</h1>
        </Row>
        <Row style={{marginLeft: 0}}>
          <Col span={5} style={{textAlign: 'left'}}>
            <div className="ant-btn-div">
              <Button
                type="link"
                style={{fontWeight: 'bold',
                  fontSize: 26,
                  color: '#13407F'}}
                className = "ant-btn-menu"
                onClick={() => setModalVisible(true)}>
            New Purchase Request
              </Button>
            </div>
          </Col>
          <Col span={3}>
            <Checkbox style={{fontWeight: 'bold',
              fontSize: 18}}
            onChange={onChecked}>
            See ALL
            </Checkbox>
          </Col>
        </Row>
      </Row>

      <Row style={{
        marginTop: 3,
        marginLeft: '20%',
        marginRight: '20%'
      }}
      >

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
            type="primary"
            style={{marginLeft: 10,
              marginBottom: 10}}
            onClick={onSearch}
          >
            Search
          </Button>

        </div> */}
        <div style={{border: '1px solid black'}}>
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
      {purchaseRequestNumberModal}
      {displayAddModal}
      {displayUpdateModal}
      {/* <Updatemodal initialValue={initialPurchaseRequest} /> */}
    </div>
  );
};

export default PurchaseRequests;
