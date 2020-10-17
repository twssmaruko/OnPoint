import React, {useState, memo, useEffect} from 'react';
import {
  Row,
  // Col,
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
import moment from 'moment';
import axios from '../../../axios-orders';
import PurchaseOrderModal from './PurchaseOrderModal';
//import {getPurchaseRequest} from '../../../graphql/queries';

const AddPurchaseOrder = memo(() => {
  const dispatcher = useDispatch();
  const [form] = Form.useForm();
  const [selectedForm] = Form.useForm();
  const {Option} = Select;
  // const [ordersList, setOrdersList] = useState({});
  // const [selectedVendor, setSelectedVendor] = useState({});
  const [ordersCount, setOrdersCount] = useState(0);
  const [purchaseOrderFlag, setPurchaseOrderFlag] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [projectCategories, setProjectCategories] = useState({});
  //const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState({});
  const [purchaseOrderData, setPurchaseOrderData] = useState({
    requestedBy: 'Engr. Jojo Salamanes',
    project: '',
    vendor: '',
    addNotes: '',
    purchaseRequestNo: '',
    orders: {
      items: [
        {
          itemNo: '',
          description: '',
          qty: 0,
          unitPrice: 0
        }
      ],
      totalPrice: 0
    }
  });

  const [transferParams, setTransferParams] = useState({
    ordersInTransfer: [],
    selectedKeys: [],
    targetKeys: [],
    openTransferModal: false
  })



  // const [purchaseRequestProducts, setPurchaseRequestProducts] = useState({});
  const {
    showSpin,
    showSpin2,
    purchaseRequestList,
    vendorsList,
    purchaseOrderNo,
    //purchaseRequestProducts,
    projectsList
  } = useSelector(({ui, purchaseOrder}) => ({
    showSpin: ui.showSpin1,
    showSpin2: ui.showSpin2,
    purchaseOrderNo: purchaseOrder.purchaseOrderId,
    purchaseRequestList: purchaseOrder.purchaseRequests,
    //purchaseRequestProducts: purchaseOrder.purchaseRequest,
    vendorsList: purchaseOrder.vendors,
    projectsList: purchaseOrder.projects
  }),shallowEqual);

  useEffect(() => {
    dispatcher(actions.fetchPurchaseOrderId());
  }, [dispatcher])

  const handleCancel = () => {
    setTransferParams({
      ...transferParams,
      openTransferModal: false,
      selectedKeys: []
    })
  }

  const searchPurchaseRequestList = () => purchaseRequestList.map((purchaseRequest) =>
    <Option key={purchaseRequest.id} value={purchaseRequest.id}>
      PR{purchaseRequest.purchaseRequestNo}
    </Option>
  );

  const searchVendorsList = () => vendorsList.map((vendor) =>
    <Option key={vendor.id} value={vendor.id}>
      {vendor.vendorName}
    </Option>
  );

  const searchProjectsList = () => projectsList.map((project) =>
    <Option key={project.id} value ={project.id}>
      {project.projectCode}
    </Option>
  );

  const addPurchaseOrder = () => {
    // const {
    //   requestedBy, project,
    //   category, addNotes
    // } = formValues;
    // setPurchaseOrderData({
    //   ...purchaseOrderData,
    //   requestedBy,
    //   project,
    //   category,
    //   addNotes,
    //   vendorData: selectedVendor
    // });

    //dispatcher(uiActions.setOpenModal1(true));
  };

  const fetchPurchaseRequests = () => {
    dispatcher(actions.getPurchaseRequests());
  };

  const fetchVendor = () => {
    dispatcher(actions.getVendors());
  };
  // const fetchPurchaseRequest = () => {
  //   dispatcher(actions.getPurchaseRequestData(selectedPurchaseRequest));
  // }
  const fetchProjects = () => {
    dispatcher(actions.getProjects());
  }

  // const resetFlagMethod = () => {
  //   setResetFlag(!resetFlag);
  // }

  const requestedByChange = (requestedBy) => {
    setPurchaseOrderData({
      ...purchaseOrderData,
      requestedBy: requestedBy
    })
  }

  const deleteItem = (item) => {

    const newOrderInTransfer =  transferParams.ordersInTransfer.filter((data) =>
      data.key !== item.key).map((data) => {
      if (data.product === item.product) {
        return {
          ...data,
          quantityLeft: data.quantityLeft + item.quantityLeft,
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

  const ultraSetPurchaseRequest = async (purchaseRequestData) => {
    try {
      const year = new Date().getFullYear();
      const newDate = new Date();
      const dateCreated = moment(newDate).format('MMMM Do YYYY, h:mm:ss A')
      const response = await axios.get('/purchaserequests/' + purchaseRequestData.key + '.json');
      setPurchaseRequest(response.data);
      setPurchaseOrderData({
        ...purchaseOrderData,
        dateCreated: dateCreated,
        purchaseRequest: response.data,
        purchaseRequestNo: response.data.purchaseRequestNo,
        purchaseOrderNo: 'OPC-' + year + '-' + purchaseOrderNo,
        currentId: purchaseOrderNo
      })
    } catch (error) {
      message.error('unable to fetch purchase request');
      console.error(error);
    }
  }


  const setOrders = async () => {

    await selectedForm.validateFields()

    const values = selectedForm.getFieldsValue();
    setOrdersCount(transferParams.selectedKeys.length);
    const newOrderInTransfer = transferParams.ordersInTransfer.filter((data) => {
      return transferParams.selectedKeys.includes(data.key)
    }).map((data) => {
      const newValues = parseFloat(values[`${data.product}price`]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      const price = values[`${data.product}price`];
      const qty = values[`${data.product}quantityLeft`] || data.quantityLeft;
      const totalPrice = parseFloat(price * qty).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      return {...data,
        quantityLeft: values[`${data.product}quantityLeft`] || data.quantityLeft,
        unitPrice: newValues,
        category: values[`${data.product}category`],
        itemTotal: totalPrice,
        key: `deducted${data.key}`,
        disabled: true
      }
    })
    // console.log(newOrderInTransfer)

    const toConcatOrderInTransfer = transferParams.ordersInTransfer;

    const applyDisable = toConcatOrderInTransfer.map((data) => {
      if (transferParams.selectedKeys.includes(data.key)) {
        return {
          ...data,
          //disabled: true,
          quantityLeft: data.quantityLeft - values[`${data.product}quantityLeft`] || 0
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
    setPurchaseOrderData({
      ...purchaseOrderData,
      orders: newOrderInTransfer
    })


    selectedForm.resetFields();
  }

  const setPurchaseRequest = (purchaseRequestData) => {
    //console.log(purchaseRequestProducts);
    // if (!selectedPurchaseRequest) {
    //   setTransferParams({...transferParams,
    //     ordersInTransfer: [],
    //     selectedKeys: [],
    //     targetKeys: []})
    //   return;
    // }

    // dispatcher(actions.getPurchaseRequestData(purchaseRequest.key));
    // console.log(purchaseRequestProducts);

    const fetchedPurchaseRequest = purchaseRequestData
    const itemOrders = [];
    for (const key in fetchedPurchaseRequest.orders) {
      if (fetchedPurchaseRequest.orders[key].quantityLeft > 0) {
        itemOrders.push(fetchedPurchaseRequest.orders[key])
      }
    }
    const itemSelected = {
      ...fetchedPurchaseRequest,
      orders: itemOrders
    };
    const dataSource = itemSelected.orders.map((data) => ({
      ...data,
      key: data.product
    }));
    setTransferParams({...transferParams,
      ordersInTransfer: dataSource,
      prOrders: fetchedPurchaseRequest.orders,
      selectedKeys: [],
      targetKeys: []})
    // setTransferParams({...transferParams,
    //   ordersInTransfer: [],
    //   selectedKeys: [],
    //   targetKeys: []})
    // message.error(`Selected Purchase Request not yet approved!
    //  ${itemSelected.purchaseRequestNo}`)

  };



  const setVendor = (selectedVendorItem) => {
    if (!selectedVendorItem) {
      //setSelectedVendor({});
      return;
    }

    const itemSelected = vendorsList.find((data) => data.id === selectedVendorItem.value);

    //setSelectedVendor(itemSelected);
    setPurchaseOrderData({
      ...purchaseOrderData,
      vendor: itemSelected
    });
  };

  const setProject = (selectedProjectItem) => {
    if (!selectedProjectItem) {
      setSelectedProject({});
      return;
    }
    const projectSelected = projectsList.find((data) => data.id === selectedProjectItem.value);
    setSelectedProject(projectSelected);
    const categories = [];

    for (const budgetCost in projectSelected.budget.budgetCost) {
      for (const subCategories in projectSelected.budget.budgetCost[budgetCost].subCategories) {
        for (const subCategoryItems in projectSelected.budget
          .budgetCost[budgetCost]
          .subCategories[subCategories]
          .subCategoryItem) {

          const newCategories = projectSelected.budget.budgetCost[budgetCost].itemCode
          + '.' + projectSelected.budget.budgetCost[budgetCost].subCategories[subCategories].itemCode
          + '.' + projectSelected.budget.budgetCost[budgetCost].subCategories[subCategories].subCategoryItem[subCategoryItems].itemCode
          categories.push(newCategories);

        }
      }
    }
    setPurchaseOrderData({
      ...purchaseOrderData,
      project: projectSelected.projectCode
    })
    setProjectCategories(categories);

  }

  const notesChange = (notesData) => {
    setPurchaseOrderData({
      ...purchaseOrderData,
      addNotes: notesData
    })
  }

  const debounceFetchPurchaseRequests = _.debounce(fetchPurchaseRequests, 10);
  // const debounceFetchPurchaseRequest = _.debounce(fetchPurchaseRequest, 10)
  const debounceFetchVendor = _.debounce(fetchVendor, 10);
  const debounceFetchProjects = _.debounce(fetchProjects, 10);
  // const debounceSetPurchaseRequest = _.debounce(setPurchaseRequest, 10);


  const displayQuantityLeft = (quantityLeft) => <div style={{marginLeft: 30}}>{quantityLeft}</div>
  const displayQuantityRight = (quantityLeft) => <div style={{marginLeft: 20}}>{quantityLeft}</div>


  const deleteButton = (item) =>
    <div>
      <TableButton value={item} type="danger" icon={<DeleteFilled />} onClick={deleteItem} />
    </div>;

  // const showedProducts = () => {
  //   if (purchaseRequestProducts === null) {
  //     return <Option key = "0" value = "0">
  //       Please select a Purchase Request
  //     </Option>
  //   }
  //   return purchaseRequestProducts.orders.map((purchaseRequest) =>
  //     <Option key={'product' + purchaseRequest.id} value={purchaseRequest.id}>
  //       {purchaseRequest.product}
  //     </Option>
  //   );

  // }

  const showedCategories = () => {
    if (projectCategories === null) {
      return <Option key = "0" value = "0">
        Please select a Project
      </Option>
    }
    return projectCategories.map((e) =>
      <Option key={'category-' + e} value={e}>
        {e}
      </Option>
    );
  }

  // const purchaseOrders = () => {
  //   const firstRow = <div>

  //     <Row>
  //       <Col style={{marginRight: 100,
  //         marginLeft: 35}}>
  //         <b>IT</b>
  //       </Col>
  //       <Col style={{marginRight: 200}}>
  //         <b>DESCRIPTION</b>
  //       </Col>
  //       <Col style={{marginRight: 75}}>
  //         <b>QTY</b>
  //       </Col>
  //       <Col style={{marginRight: 75}}>
  //         <b>UNIT</b>
  //       </Col>
  //       <Col style={{marginRight: 100}}>
  //         <b>UNIT PRICE</b>
  //       </Col>
  //       <Col style={{marginRight: 10}}>
  //         <b>TOTAL</b>
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col style ={{marginRight: 100,
  //         marginLeft: 35}}>
  //         1
  //       </Col>
  //       <Col style ={{marginRight: 65}}>
  //         <Select
  //           key="products"
  //           showSearch
  //           allowClear
  //           labelInValue
  //           placeholder="Description"
  //           notFoundContent={<Spin spinning={showSpin} />}
  //           filterOption={(input, option) =>
  //             option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //           }
  //           onClick={debounceFetchPurchaseRequest}
  //           style={{
  //             width: 230,
  //             border: '1px solid black',
  //             position: 'relative'
  //           }}
  //           //onChange={setPurchaseRequest}
  //         >
  //           {showedProducts()}
  //         </Select>
  //       </Col>
  //       <Col style={{marginRight: 75}}>
  //         <Input style={{width: 45,
  //           fontSize: 12,
  //           marginLeft: 0,
  //           textAlign: 'left'}}>
  //         </Input>
  //       </Col>
  //     </Row>
  //   </div>
  //   return  firstRow
  // }

  const leftTableColumns = [
    {
      dataIndex: 'product',
      title: 'Product',
      key: 'product',
      width: 150
    },
    {
      dataIndex: 'quantityLeft',
      title: 'Quantity Left',
      key: 'quantityLeft',
      width: 150,
      render: displayQuantityLeft

    },
    {
      dataIndex: 'quantity',
      title: 'Total Quantity',
      key: 'quantity',
      width: 150

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
      dataIndex: 'quantityLeft',
      title: 'Quantity',
      key: 'quantityLeft',
      width: 150,
      render: displayQuantityRight

    },
    {
      dataIndex: 'unitPrice',
      title: 'Price',
      key: 'unitPrice',
      width: 200

    },
    {
      dataIndex: 'unit',
      title: 'Unit',
      key: 'unit',
      width: 150
    },
    {
      dataIndex: 'category',
      title: 'Category',
      key: 'category',
      width: 150
    },
    {
      dataIndex: 'itemTotal',
      title: 'Total',
      key: 'itemTotal',
      width: 150
    },

    {
      title: 'Delete',
      render: deleteButton,
      key: 'delete',
      width: '1%'
    }
  ];
  // const onVendorSearch = (val) => {
  //   console.log('search: ', val)
  // }

  const onChange = (nextTargetKeys,selected,selectedKeys) => {
    // setSelectedKeys(selectedKeys);
    if (selectedProject.projectCode === undefined) {
      message.error('Please select a project first!');
      return;
    }
    setTransferParams({...transferParams,
      selectedKeys: selectedKeys,
      openTransferModal: true
    })
    // setOpenTransferModal(true);
  };

  const onProceed = () => {
    let totalPrice = 0;
    try {
      for (const key in purchaseOrderData.orders) {
        totalPrice += parseFloat(purchaseOrderData.orders[key].itemTotal.split(',').join(''));
      }
      setPurchaseOrderData({
        ...purchaseOrderData,
        totalPrice: totalPrice
      })


      dispatcher(uiActions.setOpenModal1(true));
      const newPurchaseOrder =
    purchaseOrderFlag.concat(<PurchaseOrderModal
      count = {ordersCount}
      prOrders = {transferParams.prOrders}
      transfers = {transferParams.ordersInTransfer}
      purchaseOrder = {purchaseOrderData} key="newPurchaseOrder"/>);
      setPurchaseOrderFlag(newPurchaseOrder);
    } catch (error) {
      message.error('Please fill out all forms of the order');
      console.error(error);
    }
  }

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
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onClick={debounceFetchVendor}
                  style={{
                    width: 170,
                    border: '1px solid black'}}
                  onSelect={setVendor}
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
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onClick={debounceFetchPurchaseRequests}
                  style={{
                    width: 170,
                    border: '1px solid black',
                    position: 'relative'
                  }}
                  onSelect={(e) => {
                    ultraSetPurchaseRequest(e)
                  }  }
                //  onBlur = {setPurchaseRequest}
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
            {/* {purchaseOrders()} */}
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
                <Select
                  key="projects"
                  showSearch
                  allowClear
                  labelInValue
                  // value={projectValue}
                  placeholder="Search Projects"
                  notFoundContent={<Spin spinning={showSpin2} />}
                  filterOption={(input, option) =>
                    option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onClick={debounceFetchProjects}
                  style={{
                    width: 170,
                    border: '1px solid black'}}
                  onSelect={setProject}
                >
                  {searchProjectsList()}

                </Select>
                {/* <Input placeholder="Enter Project" style={{width: 170,
                  border: '1px solid black'}} allowClear /> */}
              </Form.Item>
            </div>
            <div style={{margin: 10}}>
              <Form.Item
                label="Requested By"
                name="requestedBy"
                initialValue = "Engr. Jojo Salamanes"
                rules={[
                  {required: true,
                    message: 'Please Input Requested By'}
                ]}
              >
                <Input
                  onChange = {(e) => requestedByChange(e.target.value)}
                  style={{width: 190,
                    border: '1px solid black'}} allowClear
                />
              </Form.Item>
            </div>
            {/* <div style={{margin: 10}}>
              <Form.Item
                label="Category"
                name="category"
                style={{marginLeft: 10}}
              >
                <Input placeholder="Enter Category" style={{width: 170,
                  border: '1px solid black'}} allowClear />
              </Form.Item>
            </div> */}
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
                  allowClear
                  onChange = {(e) => notesChange(e.target.value)}
                />
              </div>
            </Form.Item>
          </Row>

        </Form>
      </div>

      <Modal
        title= {selectedProject.projectCode + " orders"}
        visible={transferParams.openTransferModal}
        onOk={setOrders}
        onCancel={handleCancel}
        width={1000}
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
                const {quantityLeft} = transferParams.ordersInTransfer.find(
                  (data) => data.key === selectedKey);
                return (
                  <Row key={selectedKey}>
                    <div>
                      <Form.Item
                        label="Quantity"
                        name={`${selectedKey}quantityLeft`}
                        style={{marginLeft: 10}}
                        rules={[
                          {validator: (_, value) => value <= quantityLeft || value === undefined ?
                            Promise.resolve() :
                            Promise.reject(`Should not exceed ${quantityLeft}`)}
                        ]}
                      >
                        <InputNumber
                          placeholder={quantityLeft}
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
                    <div style={{zIndex: 500,
                      marginLeft: 180,
                      position: 'flex'}}>
                      <Form.Item
                        label="Category"
                        name={`${selectedKey}category`}
                        style={{marginLeft: 10}}
                        rules={[
                          {
                            required: true,
                            message: 'Category is required!'
                          }
                        ]}
                      >
                        <Select
                          placeholder="Category" style={{width: 120,
                            border: '1px solid black'}} allowClear>
                          {showedCategories()}
                        </Select>
                      </Form.Item>
                    </div>
                    <div style={{
                      position: 'absolute',
                      zIndex: 500,
                      marginTop: 3,
                      marginLeft: 580,
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
          color: 'white'}}
        onClick = {onProceed}
        > Proceed</Button>
      </div>
      {purchaseOrderFlag}
    </Row>
  );
});

export default AddPurchaseOrder;
