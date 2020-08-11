import React, {useState, memo} from 'react';
import {
  Row,
  Form,
  Select,
  Spin,
  Input,
  Button,
  Modal,
  message,
  InputNumber
} from 'antd';
import _ from 'lodash';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import * as uiActions from '../../../store/ui/actions/Actions';
import * as actions from '../../../store/purchaseorders/actions/Actions';
import TableTransfer from './PurchaseRequestTransfer';
import {DeleteFilled} from '@ant-design/icons';
import TableButton from '../../../components/button/OnpointButton';

const AddPurchaseOrder = memo(() => {
  const dispatcher = useDispatch();
  const [form] = Form.useForm();
  const [selectedForm] = Form.useForm();
  const {Option} = Select;
  const [selectedVendor, setSelectedVendor] = useState({});
  const [purchaseOrderData, setPurchaseOrderData] = useState({
    requestedBy: '',
    project: '',
    category: '',
    vendorData: {},
    addNotes: '',
    selectedPurchaseRequest: {orders: {items: []}}
  });


  const [transferParams, setTransferParams] = useState({
    ordersInTransfer: [],
    selectedKeys: [],
    targetKeys: [],
    openTransferModal: false
  })

  const {
    showSpin,
    showSpin2,
    purchaseRequestList,
    vendorsList
  } = useSelector(({ui, purchaseOrder}) => ({
    showSpin: ui.showSpin1,
    showSpin2: ui.showSpin2,
    purchaseRequestList: purchaseOrder.purchaseRequests,
    vendorsList: purchaseOrder.vendors
  }),shallowEqual);

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


  const handleCancel = () => {
    setTransferParams({
      ...transferParams,
      openTransferModal: false,
      selectedKeys: []
    })
  }

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
      addNotes,
      vendorData: selectedVendor
    });

    dispatcher(uiActions.setOpenModal1(true));
  };

  const fetchPurchaseRequest = (value) => {
    dispatcher(actions.getPurchaseRequests(value));
  };

  const fetchVendor = (value) => {
    dispatcher(actions.getVendors(value));
  };

  const deleteItem = (item) => {

    const newOrderInTransfer =  transferParams.ordersInTransfer.filter((data) =>
      data.key !== item.key).map((data) => {
      if (data.product === item.product) {
        return {
          ...data,
          quantity: data.quantity + item.quantity,
          disabled: false
        }
      }
      return data;
    })

    const newTargetKeys = transferParams.targetKeys.filter((data) => data !== item.key)

    setTransferParams({...transferParams,
      ordersInTransfer: newOrderInTransfer,
      targetKeys: newTargetKeys
    })

  }



  const setOrders = async () => {

    await selectedForm.validateFields()

    const values = selectedForm.getFieldsValue();

    const newOrderInTransfer = transferParams.ordersInTransfer.filter((data) => {
      return transferParams.selectedKeys.includes(data.key)
    }).map((data) => {
      return {...data,
        quantity: values[`${data.product}quantity`] || data.quantity,
        price: values[`${data.product}price`],
        key: `deducted${data.key}`,
        disabled: true}
    })
    // console.log(newOrderInTransfer)

    const toConcatOrderInTransfer = transferParams.ordersInTransfer;

    const applyDisable = toConcatOrderInTransfer.map((data) => {
      if (transferParams.selectedKeys.includes(data.key)) {
        return {
          ...data,
          disabled: true,
          quantity: data.quantity - values[`${data.product}quantity`] || 0
        }
      }
      return data
    })

    const concatenatedOrderInTransfer = applyDisable.concat(newOrderInTransfer);

    const oldTargetKeys = transferParams.targetKeys;

    const newTargetKeys = oldTargetKeys.concat(newOrderInTransfer.map((data) => data.key))


    setTransferParams({...transferParams,
      ordersInTransfer: concatenatedOrderInTransfer,
      targetKeys: newTargetKeys,
      openTransferModal: false
    })
    selectedForm.resetFields();
  }


  const setPurchaseRequest = (selectedPurchaseRequest) => {
    if (!selectedPurchaseRequest) {
      setTransferParams({...transferParams,
        ordersInTransfer: [],
        selectedKeys: [],
        targetKeys: []})
      return;
    }

    const itemSelected = purchaseRequestList.find(
      (data) => data.id === selectedPurchaseRequest.value
    );


    if (itemSelected.isApproved === 'APPROVED') {

      const dataSource = itemSelected.orders.map((data) => ({
        ...data,
        key: data.product
      }));

      setTransferParams({...transferParams,
        ordersInTransfer: dataSource,
        selectedKeys: [],
        targetKeys: []})

      return;

    }

    setTransferParams({...transferParams,
      ordersInTransfer: [],
      selectedKeys: [],
      targetKeys: []})
    message.error(`Selected Purchase Request not yet approved!
     ${itemSelected.purchaseRequestNo}`)

  };

  const setVendor = (selectedVendorItem) => {
    if (!selectedVendorItem) {
      setSelectedVendor({});
      return;
    }

    const itemSelected = vendorsList.find((data) => data.id === selectedVendorItem.value);

    setSelectedVendor(itemSelected);
  };

  const debounceFetchPurchaseRequest = _.debounce(fetchPurchaseRequest, 1000);
  const debounceFetchVendor = _.debounce(fetchVendor, 1000);


  const displayQuantityLeft = (quantity) => <div style={{marginLeft: 30}}>{quantity}</div>
  const displayQuantityRight = (quantity) => <div style={{marginLeft: 20}}>{quantity}</div>


  const deleteButton = (item) =>
    <div>
      <TableButton value={item} type="danger" icon={<DeleteFilled />} onClick={deleteItem} />
    </div>;


  const leftTableColumns = [
    {
      dataIndex: 'product',
      title: 'Product',
      key: 'product',
      width: 150
    },
    {
      dataIndex: 'quantity',
      title: 'Quantity Left',
      key: 'quantity',
      width: 150,
      render: displayQuantityLeft

    }, {
      dataIndex: 'unit',
      title: 'Unit',
      key: 'unit',
      width: 150

    }
  ];
  const rightTableColumns = [
    {
      dataIndex: 'product',
      title: 'Product',
      key: 'product',
      width: 150
    },
    {
      dataIndex: 'quantity',
      title: 'Quantity',
      key: 'quantity',
      width: 150,
      render: displayQuantityRight

    },
    {
      dataIndex: 'price',
      title: 'Price',
      key: 'price',
      width: 200

    },{
      dataIndex: 'unit',
      title: 'Unit',
      key: 'unit',
      width: 150
    },
    {
      title: 'Delete',
      render: deleteButton,
      key: 'delete',
      width: '1%'
    }
  ];


  const onChange = (nextTargetKeys,selected,selectedKeys) => {
    // setSelectedKeys(selectedKeys);
    setTransferParams({...transferParams,
      selectedKeys: selectedKeys,
      openTransferModal: true
    })
    // setOpenTransferModal(true);
  };


  const {targetKeys} = transferParams;


  return (
    <Row style={{
      marginTop: 20,
      marginLeft: '20%',
      marginRight: '25%',
      border: '1px solid black',
      overflow: 'auto',
      marginBottom: 20
    }}>
      <div
        style={{
          margin: 20}}
      >
        <Row>
          <h3 style={{
            marginLeft: 10,
            color: ' #FF111B',
            fontWeight: 'bold'}}>Add Purchase Order Form</h3>
        </Row>
        <Form
        // {...layout}
          form={form}
          name="basic"
          onFinish={addPurchaseOrder}
        >
          <Row style={{
            marginTop: 10
          }}>
            <div style={{
              margin: 10
              // marginLeft: 80
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
            </div>
            <div style={{marginTop: 10,
              marginLeft: 10
            }}>
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
            </div>
          </Row>
          <div style={{
            marginTop: -10,
            border: '1px solid black'
            // marginLeft: 50
          }}>
            <TableTransfer
              dataSource={transferParams.ordersInTransfer}
              targetKeys={targetKeys}
              titles={['Purchase Source', 'Purchase Target']}
              onChange={onChange}
              leftColumns={leftTableColumns}
              rightColumns={rightTableColumns}
            />
          </div>

          <Row style={{
            // marginLeft: 60,
            marginLeft: -15,
            marginTop: 15
          }}>
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
          <Row style={{marginTop: -10,
            marginLeft: 60,
            color: '#21201d'}}>
            Additional Notes:
          </Row>
          <Row >
            <Form.Item
              label=""
              name="addNotes"
              style={{marginLeft: 60}}

            >
              <div style={{border: '1px solid black',
                width: 800}}>
                <Input.TextArea
                  rows={2}
                  // style={width:300}
                  placeholder="Enter Additional Notes"
                  allowClear />
              </div>
            </Form.Item>
          </Row>

        </Form>
      </div>

      <Modal
        title="Set Orders from Purchase Request"
        visible={transferParams.openTransferModal}
        onOk={setOrders}
        onCancel={handleCancel}
        width={700}
        closable={false}
        // height={1000}
        okText="Set Orders"
        cancelText="Cancel"
        //   destroyOnClose
        maskClosable={false}
      >
        <Row style={{
          color: 'black',
          marginLeft: 10,
          marginTop: -10
        }}
        >
          <Form
            form={selectedForm}
          >
            {
              transferParams.selectedKeys.map((selectedKey) => {
                const {quantity} = transferParams.ordersInTransfer.find(
                  (data) => data.key === selectedKey);
                return (
                  <Row key={selectedKey}>
                    <div>
                      <Form.Item
                        label="Quantity"
                        name={`${selectedKey}quantity`}
                        style={{marginLeft: 10}}
                        rules={[
                          {validator: (_, value) => value <= quantity || value === undefined ?
                            Promise.resolve() :
                            Promise.reject(`Should not exceed ${quantity}`)}
                        ]}
                      >
                        <InputNumber
                          placeholder={quantity}
                          style={{width: 100,
                            border: '1px solid black'}}
                          allowClear
                          // placeholder={}
                        />
                      </Form.Item>
                    </div>
                    <div style={{zIndex: 500,
                      marginLeft: 180,
                      position: 'absolute'}}>
                      <Form.Item
                        label="Price"
                        name={`${selectedKey}price`}
                        style={{marginLeft: 10}}
                        rules={[
                          {
                            type: 'number',
                            message: 'Must be a number!'
                          },
                          {
                            required: true,
                            message: 'Price is required!'
                          }
                        ]}
                      >
                        <InputNumber
                          placeholder="" style={{width: 120,
                            border: '1px solid black'}} allowClear />
                      </Form.Item>
                    </div>
                    <div style={{
                      position: 'absolute',
                      zIndex: 500,
                      marginTop: 3,
                      marginLeft: 380,
                      fontSize: 15,
                      color: 'black'}}>
                      {`for ${selectedKey}.`}
                    </div>
                  </Row>
                )
              })
            }
          </Form>
        </Row>
      </Modal>
      <div style={{display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'}}>
        <Button  style={{
          marginRight: 20,
          marginTop: -10,
          marginBottom: 20,
          backgroundColor: '#13407F',
          color: 'white'}}> Show PDF format</Button>
      </div>
    </Row>
  );
});

export default AddPurchaseOrder;
