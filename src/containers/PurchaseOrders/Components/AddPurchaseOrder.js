import React, {useState, memo} from 'react';
import {
  // Modal,
  Row,
  Form,
  Select,
  Spin,
  Input
  // Col,
//    Card,
// Input,
} from 'antd';
import _ from 'lodash';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import * as uiActions from '../../../store/ui/actions/Actions';
import * as actions from '../../../store/purchaseorders/actions/Actions';
// import PurchaseOrderModal from './PurchaseOrderModal';
// import Logo from '../../assets/images/Logo.png';

const AddPurchaseOrder = memo(() => {
  console.log('weee')
  const dispatcher = useDispatch();
  const [form] = Form.useForm();
  const {Option} = Select;
  const [purchaseRequestSelected, setPurchaseRequestSelected] = useState(false);
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState({});
  const [selectedVendor, setSelectedVendor] = useState({});
  // const [vendorValue, setVendorValue] = useState();
  const [purchaseOrderData, setPurchaseOrderData] = useState({
    requestedBy: '',
    project: '',
    category: '',
    vendorData: {},
    addNotes: '',
    selectedPurchaseRequest: {orders: {items: []}}
  }, shallowEqual);

  const {
    // openModal,
    showSpin,
    showSpin2,
    purchaseRequestList,
    // selectedPurchaseRequest,
    vendorsList
  } = useSelector(({ui, purchaseOrder}) => ({
    openModal: ui.openModal2,
    showSpin: ui.showSpin1,
    showSpin2: ui.showSpin2,
    purchaseRequestList: purchaseOrder.purchaseRequests,
    // selectedPurchaseRequest: purchaseOrder.purchaseRequest,
    vendorsList: purchaseOrder.vendors
  }));

  // console.log("render")
  const searchPurchaseRequestList = () => purchaseRequestList.map((purchaseRequest) =>
    <Option key={purchaseRequest.id} value={purchaseRequest.id}>
      {purchaseRequest.purchaseRequestNo}
    </Option>
  );

  const searchVendorsList = () => vendorsList.map((vendor) =>
    <Option key={vendor.id} value={vendor.id}>
      {vendor.vendorName}
    </Option>
  );

  // const invokeSubmit = () => {
  //   form.submit();
  // };

  const addPurchaseOrder = (formValues) => {
    const {
      requestedBy, project,
      category, addNotes
    } = formValues;
    setPurchaseOrderData({
      ...purchaseOrderData,
      requestedBy,
      project,
      category,
      purchaseRequestData: selectedPurchaseRequest,
      addNotes,
      vendorData: selectedVendor
    });

    dispatcher(uiActions.setOpenModal1(true));
  };

  // const handleCancel = () => {
  //   dispatcher(uiActions.setOpenModal2(false));
  // };

  const fetchPurchaseRequest = (value) => {
    dispatcher(actions.getPurchaseRequests(value));
  };

  const fetchVendor = (value) => {
    dispatcher(actions.getVendors(value));
  };

  const purchaseRequestRender = _.isEmpty(selectedPurchaseRequest) ?
    <div>
      <h3 style={{color: 'red'}}>
        Purchase Request Selected Is Not Approved Yet
      </h3>
    </div>
    :
    <>
      <Row style={{
        color: 'black',
        marginLeft: 10,
        marginTop: -10
      }}
      >
        <div>
          {`PR #: ${selectedPurchaseRequest.purchaseRequestNo}`}
        </div>
        <div style={{marginLeft: 20}}>
          {`Status: ${selectedPurchaseRequest.status}`}
        </div>
        <div style={{marginLeft: 20}}>
          {`Total Price : ${selectedPurchaseRequest.totalPrice}`}
        </div>
      </Row>
      <Row style={{color: 'black',
        marginLeft: 10,
        marginTop: 10}}>
        <div>
          Orders:
        </div>
        <div style={{
          marginLeft: 20
          // border: '1px solid black',
        }}
        >
          <div>
            {selectedPurchaseRequest.orders.map((order) =>
              <div key={order.product}>
                {`-- ${order.quantity} ${order.unit} of 
                                ${order.product.name}  for ${order.price} Php` }
              </div>
            )}
          </div>
        </div>
      </Row>
    </>;

  const vendorRender =
    <div>
      <div style={{
        color: 'black',
        margin: 10,
        border: '1px solid black'
      }}
      >
        <Row>
          <div>
            {`Name: ${selectedVendor.vendorName}`}
          </div>
          <div style={{marginLeft: 15}}>
            {`Contact # : ${selectedVendor.telNo}`}
          </div>
        </Row>
        <Row style={{overflowWrap: 'break-word'}}>
          {`Address: ${selectedVendor.location}`}
        </Row>
      </div>
    </div>;

  const setPurchaseRequest = (selectedPurchaseRequest) => {
    if (!selectedPurchaseRequest) {
      setPurchaseRequestSelected(false);
      return;
    }

    const itemSelected = purchaseRequestList.find(
      (data) => data.id === selectedPurchaseRequest.value
    );

    if (itemSelected.isApproved === 'APPROVED') {

      setSelectedPurchaseRequest(itemSelected);
      // await dispatcher(actions.getPurchestRequestData(itemSelected.id));

      setPurchaseRequestSelected(true);
      return;
    }
    setPurchaseRequestSelected(true);
    dispatcher(actions.setPurchaseRequest({}));
  };

  const setVendor = (selectedVendorItem) => {
    if (!selectedVendorItem) {
      setSelectedVendor({});
      return;
    }

    const itemSelected = vendorsList.find((data) => data.id === selectedVendorItem.value);

    // const index = selectedVendorItem.value;
    setSelectedVendor(itemSelected);
  };

  // const resetFields = () => {
  //   // setProject(null);
  //   form.resetFields();
  //   setPurchaseRequestSelected(false);
  //   setSelectedVendor({});
  //   dispatcher(actions.setPurchaseRequest({}));
  // };

  const debounceFetchPurchaseRequest = _.debounce(fetchPurchaseRequest, 1000);
  const debounceFetchVendor = _.debounce(fetchVendor, 1000);

  return (
    <Row style={{marginLeft: '20%'}}>
      {/* <Modal
        title="Add a Purchase Order"
        visible={openModal}
        onOk={invokeSubmit}
        onCancel={handleCancel}
        width={600}
        okText="View PDF Format"
        cancelText="Cancel"
        maskClosable={false}
        afterClose={resetFields}
        destroyOnClose
      > */}
      <div
        // style={{
        //   marginLeft: '10%',
        //   marginRight: '10%'}}
      >
        <Form
        // {...layout}
          form={form}
          style={{marginTop: 10}}
          name="basic"
          onFinish={addPurchaseOrder}
        >
          <Row>
            <div>
              <div style={{width: 520,
                border: '1px solid black'}}>
                <Row style={{marginTop: 10,
                  marginLeft: 10}}>
                  <Form.Item
                    label="Purchase Request"
                    name="purchaseRequest"
                    rules={[
                      {required: true,
                        message: 'Please input PR #!'}
                    ]}
                  >
                    <Select
                      key="puchaseRequest"
                      showSearch
                      allowClear
                      labelInValue
                      placeholder="Search PR #"
                      notFoundContent={<Spin spinning={showSpin} />}
                      filterOption={false}
                      onSearch={debounceFetchPurchaseRequest}
                      style={{
                        width: 170,
                        border: '1px solid black',
                        position: 'relative'
                      }}
                      onChange={setPurchaseRequest}
                    >
                      {searchPurchaseRequestList()}
                    </Select>
                  </Form.Item>
                </Row>
                {purchaseRequestSelected ? purchaseRequestRender : null}
              </div>
            </div>
            <div>
              <div
                style={{
                  marginLeft: 10,
                  // paddingRight: 200,
                  width: 520,
                  border: '1px solid black'}}>
                <Row  style={{marginTop: 10,
                  marginLeft: 10
                }}>
                  <Form.Item
                    label="Vendor"
                    name="vendor"
                    rules={[
                      {required: true,
                        message: 'Please Input Vendor'}
                    ]}
                  >
                    <Select
                      key="vendors"
                      showSearch
                      allowClear
                      labelInValue
                      // value={vendorValue}
                      placeholder="Search Vendor Name"
                      notFoundContent={<Spin spinning={showSpin2} />}
                      filterOption={false}
                      onSearch={debounceFetchVendor}
                      style={{
                        width: 170,
                        border: '1px solid black'}}
                      onChange={setVendor}
                    >
                      {searchVendorsList()}
                    </Select>

                  </Form.Item>
                </Row>
                {_.isEmpty(selectedVendor) ? null : vendorRender}
              </div>
            </div>
          </Row>
          <div style={{marginTop: 10,
            border: '1px solid black'}}>
            <Row>
              <div style={{margin: 10}}>
                <Form.Item
                  label="Project"
                  name="project"
                  rules={[
                    {required: true,
                      message: 'Please Input Project'}
                  ]}
                >
                  <Input placeholder="Enter Project" style={{width: 170,
                    border: '1px solid black'}} allowClear />
                </Form.Item>
              </div>
              <div style={{margin: 10}}>
                <Form.Item
                  label="Requested By"
                  name="requestedBy"
                  rules={[
                    {required: true,
                      message: 'Please Input Requested By'}
                  ]}
                >
                  <Input placeholder="Enter Requester" style={{width: 170,
                    border: '1px solid black'}} allowClear />
                </Form.Item>
              </div>
              <div style={{margin: 10}}>
                <Form.Item
                  label="Category"
                  name="category"
                  style={{marginLeft: 10}}
                >
                  <Input placeholder="Enter Category" style={{width: 170,
                    border: '1px solid black'}} allowClear />
                </Form.Item>
              </div>
            </Row>
          </div>
          <div style={{marginTop: 10,
            border: '1px solid black'}}>
            <div style={{margin: 10}}>
              <Form.Item
                label="Additional Notes"
                name="addNotes"
                style={{marginLeft: 10}}

              >
                <div style={{border: '1px solid black'}}>
                  <Input.TextArea
                    rows={2}
                    placeholder="Enter Additional Notes"
                    allowClear />
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>

      {/* </Modal> */}
      {/* <PurchaseOrderModal data={purchaseOrderData} /> */}
    </Row>
  );
});

export default AddPurchaseOrder;
