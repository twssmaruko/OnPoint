import React, {useState, memo, useEffect} from 'react';
import {
  Row,
  // Col,
  Form,
  Select,
  Col,
  Spin,
  Input,
  Button,
  Modal,
  AutoComplete,
  message,
  InputNumber
} from 'antd';
import _ from 'lodash';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import * as uiActions from '../../../store/ui/actions/Actions';
import * as actions from '../../../store/purchaseorders/actions/Actions';
import TableTransfer from './PurchaseRequestTransfer';
import {DeleteFilled} from '@ant-design/icons';
import Logo from './../../../components/logo/Logo';
import TableButton from '../../../components/button/OnpointButton';
import moment from 'moment';
import axios from '../../../axios-orders';
import PurchaseOrderModal from './PurchaseOrderModal';
import Order from './Order';
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
  const [requestedByState, setRequestedByState] = useState('');
  const [selectedProject, setSelectedProject] = useState({});
  const [projectCategories, setProjectCategories] = useState({});
  //const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState({});
  const [purchaseOrderData, setPurchaseOrderData] = useState({
    requestedBy: 'Engr. Jojo Salamanes',
    project: '',
    vendor: '',
    purchaseOrderNo: 0,
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

  const flexProps2 = [40, 33, 40];
  const borderStyle = 'none';
  const flexProps = [11, 1.5, 9.8];
  const flexProps3 = [1, 10, 60, 12, 12, 18, 14, 1];


  // const [purchaseRequestProducts, setPurchaseRequestProducts] = useState({});
  const {
    showSpin,
    showSpin2,
    purchaseRequestList,
    vendorsList,
    purchaseRequest,
    purchaseOrderNo,
    selectedVendor,
    //purchaseRequestProducts,
    projectsList
  } = useSelector(({ui, purchaseOrder}) => ({
    showSpin: ui.showSpin1,
    showSpin2: ui.showSpin2,
    selectedVendor: purchaseOrder.vendor,
    purchaseOrderNo: purchaseOrder.purchaseOrderId,
    purchaseRequest: purchaseOrder.purchaseRequest,
    purchaseRequestList: purchaseOrder.purchaseRequests,
    //purchaseRequestProducts: purchaseOrder.purchaseRequest,
    vendorsList: purchaseOrder.vendors,
    projectsList: purchaseOrder.projects
  }), shallowEqual);

  useEffect(() => {
    dispatcher(actions.fetchPurchaseOrderId());
    dispatcher(actions.getProjects());
    dispatcher(actions.getVendors());
    dispatcher(actions.getPurchaseRequests());
  }, [dispatcher])

  const handleCancel = () => {
    setTransferParams({
      ...transferParams,
      openTransferModal: false,
      selectedKeys: []
    })
  }

  const onSelectClick = (data) => {
    dispatcher(actions.setPurchaseRequestData(data));
  }

  const onVendorSelect = (data) => {
    dispatcher(actions.setVendor(data));
  }

  const onVendorBlur = (data) => {
    console.log(data);
  }


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

  const vendorOptions = [];

  vendorsList.map((vendors) => {
    const newVendor = String(vendors.vendorName)
    vendorOptions.push({
      value: newVendor
    })
  })

  const searchProjectsList = () => projectsList.map((project) =>
    <Option key={project.id} value={'project' + project.id}>
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

  const purchaseOrderNoChange = (data) => {
    setPurchaseOrderData({
      ...purchaseOrderData,
      purchaseOrderNo: data
    })
  }

  const onVendorEnter = (data) => {

  }

  const deleteItem = (item) => {

    const newOrderInTransfer = transferParams.ordersInTransfer.filter((data) =>
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

    setTransferParams({
      ...transferParams,
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
        prId: purchaseRequestData.key,
        purchaseOrderNo: 'OPC-' + year + '-' + purchaseOrderData.purchaseOrderNo,
        currentId: purchaseOrderNo
      })
      console.log('prId: ', purchaseRequestData.key);
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
      return {
        ...data,
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
    setTransferParams({
      ...transferParams,
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
    setTransferParams({
      ...transferParams,
      ordersInTransfer: dataSource,
      prOrders: fetchedPurchaseRequest.orders,
      selectedKeys: [],
      targetKeys: []
    })
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
      return <Option key="0" value="0">
        Please select a Project
      </Option>
    }
    return projectCategories.map((e) =>
      <Option key={'category-' + e} value={e}>
        {e}
      </Option>
    ).concat(<Option key="Not Specified">Not Specified</Option>);
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

  const onChange = (nextTargetKeys, selected, selectedKeys) => {
    // setSelectedKeys(selectedKeys);
    if (selectedProject.projectCode === undefined) {
      message.error('Please select a project first!');
      return;
    }
    setTransferParams({
      ...transferParams,
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
          count={ordersCount}
          prOrders={transferParams.prOrders}
          transfers={transferParams.ordersInTransfer}
          projectCategories={projectCategories}
          purchaseOrder={purchaseOrderData} key="newPurchaseOrder" />);
      setPurchaseOrderFlag(newPurchaseOrder);
    } catch (error) {
      message.error('Please fill out all forms of the order');
      console.error(error);
    }
  }

  const {targetKeys} = transferParams;

  const orders = [];
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 1,
    itemTotal: 6750,
    product: 'GI Tie Wire #16',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 2,
    itemTotal: 6750,
    product: 'Pan Head Screw 1/2',
    quantity: 1500,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 3,
    itemTotal: 6750,
    product: 'Republic Portland Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 4,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 5,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 6,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 7,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })
  orders.push({
    category: 'I.A.6',
    didReceive: false,
    id: 8,
    itemTotal: 6750,
    product: 'Pozzolan Cement',
    quantity: 50,
    unit: 'Bags',
    unitPrice: 135
  })

  const ordersToDisplay = () => {
    console.log('purchaseRequestOrders: ', purchaseRequest)

    if (purchaseRequest !== 0) {
      const ordersDisplay = purchaseRequest.orders.map((order, index) =>
        <Order key={'order' + index} order = {order} index = {index} />
      )
      return ordersDisplay
    }
  }


  const newOrdersDisplay = [];
  for (let i = 0; i <= 8 - orders.length; i += 1) {
    newOrdersDisplay.push({key: i});
  }

  const blankSpace = {
    blankSpace: ''
  };

  const finalOrdersDisplay = newOrdersDisplay.map((order) =>
    <Row key={order.key} style={{
      fontFamily: 'Arial',
      color: 'black',
      height: '24px',
      marginLeft: '5%',
      marginRight: '7%'
    }}>
      <Col span={2} style={{borderStyle: borderStyle}}>{blankSpace.blankSpace}</Col>
      <Col span={10} style={{
        textAlign: 'left',
        borderStyle: borderStyle
      }}>{blankSpace.blankSpace}</Col>
      <Col span={2} style={{borderStyle: borderStyle}}>{blankSpace.blankSpace}</Col>
      <Col span={2} style={{borderStyle: borderStyle}}>{blankSpace.blankSpace}</Col>
      <Col span={4} style={{
        borderStyle: borderStyle,
        textAlign: 'center'
      }}>{blankSpace.blankSpace}</Col>
      <Col span={4} style={{
        borderStyle: borderStyle,
        textAlign: 'right'
      }}>{blankSpace.blankSpace}</Col>
    </Row>
  )


  return (
    <Row>
      <Col span={5} />
      <Col span={10}
        style={{
          marginTop: 20,
          width: '210mm',
          marginBottom: 20
        }}>
        <div>
          <Row>
            <h3 style={{
              marginLeft: 10,
              color: ' #FF111B',
              fontWeight: 'bold'
            }}>New Purchase Order</h3>
          </Row>
          {/* enter old Form here */}
          <Row style={{marginBottom: 2}}>
          </Row>
          <div id="divToPrint" style={{
            minWidth: '210mm',
            minHeight: '297mm',
            justifyContent: 'center'
          }}>
            <Row style={{marginBottom: 25}}>
            </Row>


            <Row style={{
              marginLeft: '5.0%',
              marginRight: '7%'
            }}>
              <Col span={10} style={{
                textAlign: 'left',
                borderStyle: borderStyle,
                marginLeft: '0%'
              }}>
                <Logo />
              </Col>
              <Col span={1} />
              <Col span={11} style={{
                alignContent: 'start',
                borderStyle: borderStyle,
                textAlign: 'center',
                marginLeft: '7.5%'
              }}>
                <Row style={{
                  fontSize: 18,
                  borderColor: 'black',
                  backgroundColor: '#7f7f7f',
                  color: 'white',
                  marginTop: 10,
                  borderStyle: 'solid',
                  borderWidth: 'thin',
                  borderBottom: 'none',
                  fontFamily: 'Arial',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  height: 25,
                  marginBottom: 0
                }}>
                  <Col span={24} style={{textAlign: 'center'}}>
                    PURCHASE ORDER
                  </Col>
                </Row>
                <Row style={{
                  borderColor: 'black',
                  marginTop: 0,
                  fontSize: 13,
                  fontFamily: 'Arial',
                  textAlign: 'center',
                  borderStyle: 'solid',
                  borderTop: 'none',
                  borderWidth: 'thin',
                  marginBottom: 10
                }}
                >
                  <Col span={24} style={{
                    textAlign: 'center',
                    color: 'black'
                  }}>
                    OPC-2020-{purchaseOrderNo}
                  </Col>
                </Row>
                <Row style={{
                  fontFamily: 'Arial',
                  fontSize: 13,
                  color: 'black',
                  textAlign: 'left',
                  marginLeft: '4%',
                  borderStyle: borderStyle
                }}>
                  <Col span={10}>
                    PR / Doc # :
                  </Col>
                  <Col span={10} style={{
                    textAlign: 'center',
                    marginLeft: '5%'
                  }}>
                    <Select style={{width: 150}} onSelect={(e) => onSelectClick(e)}>
                      {searchPurchaseRequestList()}
                    </Select>
                  </Col>
                </Row>
              </Col>
            </Row>



            <Row style={{
              marginBottom: 10,
              color: 'black',
              fontFamily: 'Arial'
            }}>
              <Col span={10} style={{
                display: 'block',
                textAlign: 'left',
                marginLeft: '5%',
                borderStyle: borderStyle
              }}>
                <Row style={{
                  marginBottom: 0,
                  height: 16
                }}>
                  <Col span={24} style={{
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    letterSpacing: '-0.5px',
                    fontSize: 17
                  }}>
                    ON POINT CONSTRUCTION
                  </Col>
                </Row>
                <Row style={{
                  marginBottom: 0,
                  height: 16
                }}>
                  <Col span={24} style={{
                    fontFamily: 'Arial',
                    textAlign: 'left',
                    fontSize: 14
                  }}>
                    28A Sanson Road, Lahug
                  </Col>
                </Row>
                <Row style={{
                  marginBottom: 0,
                  height: 16
                }}>
                  <Col span={24} style={{
                    fontFamily: 'Arial',
                    fontSize: 14
                  }}>
                    Cebu City, Philippines
                  </Col>
                </Row>
              </Col>
              <Col span={1} />
              <Col span={10} style={{
                alignContent: 'start',
                borderStyle: borderStyle,
                textAlign: 'left'
              }}>
                <Col span={1}></Col>
                <Row>
                  <Col span={24}>
                    <br />
                  </Col>
                </Row>
                <Row style={{borderStyle: borderStyle}}>
                  <Col span={10} style={{marginLeft: '6%'}}>
                    Order Date:
                  </Col>
                  <Col span={10} style={{textAlign: 'center'}}>
                    {`${moment(new Date()).format('L')}`}
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <br />
                  </Col>
                </Row>
              </Col>
            </Row>


            <Row style={{
              color: 'black',
              fontFamily: 'Arial'
            }}>
              <Col span={10} style={{
                borderStyle: 'solid',
                borderWidth: 'thin',
                marginLeft: '5%',
                textAlign: 'center',
                borderColor: 'black',
                borderTop: 'none'
              }}>
                <Row style={{
                  marginBottom: 20,
                  borderStyle: borderStyle
                }}>
                  <Col span={24} style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    fontFamily: 'Arial',
                    fontSize: 14,
                    borderColor: 'black',
                    backgroundColor: '#EEECE1',
                    borderLeft: 'none',
                    borderRight: 'none'
                  }}>
                    VENDOR
                  </Col>
                </Row>
                <Row style={{borderStyle: borderStyle}}>

                  <Col span={5} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    Name:
                  </Col>
                  <Col span={1}></Col>
                  <Col span={17} style={{
                    textAlign: 'start',
                    marginLeft: 5,
                    borderStyle: borderStyle
                  }}>
                    {/* <Select style={{width: 225}} onSelect={(e) => onVendorSelect(e)}>
                      {searchVendorsList()}
                    </Select> */}
                    <AutoComplete
                      showSearch
                      allowClear
                      style={{
                        width: 200,
                        textAlign: 'left',
                        color: 'black'
                      }}
                      onBlur = {(e) => onVendorBlur(e.target.value)}
                      onSelect = {(e) => onVendorSelect(e)}
                      options={vendorOptions}
                      placeholder="Vendor"
                      filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={5} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    Address:
                  </Col>
                  <Col span={1}>
                  </Col>
                  <Col span={17} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    {selectedVendor.location}
                  </Col>
                </Row>
                <Row>
                  <Col span={5} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    Tel:
                  </Col>
                  <Col span={1}>
                  </Col>
                  <Col span={17} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    {selectedVendor.telNo}
                  </Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={5} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    Terms:
                  </Col>
                  <Col span={1}>
                  </Col>
                  <Col span={17} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    {selectedVendor.terms}
                  </Col>
                </Row>
              </Col>
              <Col span={1} style={{borderStyle: borderStyle}} />
              <Col flex={11} style={{
                marginLeft: '1%',
                borderStyle: 'solid',
                borderWidth: 'thin',
                borderColor: 'black',
                marginRight: '2%',
                borderTop: 'none'
              }}>
                <Row style={{
                  marginBottom: 20,
                  borderStyle: borderStyle
                }}>
                  <Col span={24} style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    fontFamily: 'Arial',
                    fontSize: 14,
                    textAlign: 'center',
                    borderColor: 'black',
                    backgroundColor: '#EEECE1',
                    borderLeft: 'none',
                    borderRight: 'none'
                  }}>
                    JOB ADDRESS
                  </Col>
                </Row>
                <Row style={{borderStyle: borderStyle}}>
                  <Col span={5} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    Req By:
                  </Col>
                  <Col style={{
                    textAlign: 'start',
                    marginLeft: '2.4%'
                  }}>
                    {purchaseRequest.requestedBy}
                  </Col>
                </Row>
                <Row>
                  <Col span={5} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    Project:
                  </Col>
                  <Col style={{
                    textAlign: 'start',
                    marginLeft: '2.4%'
                  }}>
                    <Select style={{
                      width: 200,
                      fontSize: 14
                    }}>
                      {searchProjectsList()}
                    </Select>
                  </Col>
                </Row>
                <Row>
                  <Col span={6} style={{
                    textAlign: 'start',
                    marginLeft: 5
                  }}>
                    Category:
                  </Col>
                  <Col style={{
                    textAlign: 'start',
                    marginLeft: '2.4%'
                  }}>
                  </Col>
                </Row>
              </Col>
              <Col span={1} style={{marginRight: 10}}></Col>
            </Row>


            <Row style={{
              marginTop: 20,
              fontFamily: 'Arial',
              color: 'black'
            }}>
              <Col span={24} style={{
                textAlign: 'center',
                fontSize: 15
              }}>
                PLEASE SUPPLY THE FOLLOWING:
              </Col>
            </Row>

            <Row style={{
              marginTop: '1%',
              fontFamily: 'Arial',
              color: 'black',
              borderTop: 'solid',
              marginLeft: '5%',
              marginRight: '7%',
              borderBottom: 'solid',
              borderWidth: 'thin',
              height: '70px'
            }}>
              <Col span={1} style={{borderStyle: borderStyle}}></Col>
              <Col span={20} style={{
                borderStyle: borderStyle
              }}>
                <Row style={{marginTop: '3%'}}>
                  <Col span={2} style={{borderStyle: borderStyle}}>IT</Col>
                  <Col span={8} style={{
                    borderStyle: borderStyle,
                    textAlign: 'center'
                  }}>DESCRIPTION</Col>
                  <Col span={2} style={{borderStyle: borderStyle}}>QTY</Col>
                  <Col span={2} style={{borderStyle: borderStyle}}>UNIT</Col>
                  <Col span={3} style={{
                    borderStyle: borderStyle,
                    textAlign: 'center'
                  }}>UNIT PRICE</Col>
                  <Col span={4} style={{
                    borderStyle: borderStyle,
                    textAlign: 'right'
                  }}>TOTAL</Col>
                  <Col span={2} style={{textAlign: 'center',
                    marginLeft: 10}}>
                  CATEGORY
                  </Col>
                </Row>
              </Col>
              <Col span={1} style={{borderStyle: borderStyle}}></Col>
            </Row>


            <Row style={{
              marginTop: '0.5%',
              color: 'black',
              fontFamily: 'Arial'
            }}>
              <Col span={1} style={{borderStyle: borderStyle}}></Col>
              <Col span={20} style={{borderStyle: borderStyle}}>
                {ordersToDisplay()}
                <Row style={{
                  marginTop: '1%',
                  marginBottom: '20px',
                  color: 'black',
                  fontFamily: 'Arial'
                }}>
                  <Col span={20}></Col>
                  <Col span={2} style={{textAlign: 'center'}}>---</Col>
                  <Col span={2}></Col>
                </Row>
                {finalOrdersDisplay}
              </Col>
              <Col span={1} style={{borderStyle: borderStyle}}></Col>
            </Row>



            <Row style={{
              marginTop: '2%',
              marginBottom: '20px',
              color: 'black',
              fontFamily: 'Arial'
            }}>
              <Col span={16}></Col>
              <Col span={6} style={{
                borderTop: 'solid',
                borderWidth: 'thin',
                textAlign: 'left'
              }}>Total Amount <b style={{
                  fontSize: '10',
                  fontFamily: 'Arial',
                  textAlign: 'right',
                  marginLeft: '15%'
                }}>1,275.00</b></Col>
            </Row>



            <Row style={{
              fontFamily: 'Arial',
              borderTop: 'solid',
              borderWidth: 'thin',
              marginLeft: '5%',
              marginRight: '7%',
              color: 'black'
            }}>
              <Col span={1}>
              </Col>
              <Col span={20}>
                <Row>
                  <Col span={7} style={{textAlign: 'left'}}>Authorized by:</Col>
                  <Col span={11}></Col>
                  <Col span={4} style={{textAlign: 'left'}}>Conformed by:</Col>
                </Row>
              </Col>
              <Col span={1}>
              </Col>
            </Row>

            <Row style={{
              fontFamily: 'Arial',
              color: 'black',
              textAlign: 'center',
              marginTop: '25px',
              marginLeft: '5%',
              marginRight: '7%'
            }}>
              <Col span={1}>
              </Col>
              <Col span={8}>
                Mr. Martin Gerard Tan
              </Col>
            </Row>

            <Row style={{
              fontFamily: 'Arial',
              textAlign: 'center',
              color: 'black',
              marginLeft: '5%',
              marginRight: '7%'
            }}>
              <Col span={1}>
              </Col>
              <Col span={8}>
                (Signature over printed name)
              </Col>
              <Col span={6}>
              </Col>
              <Col span={9}>
                (Print name & signature)
              </Col>
            </Row>

            <Row style={{
              fontFamily: 'Arial',
              textAlign: 'center',
              color: 'black',
              marginLeft: '5%',
              marginRight: '7%'
            }}>
              <Col span={1} style={{
                borderTop: 'solid',
                borderWidth: 'thin'
              }}>
              </Col>
              <Col span={8} style={{
                fontWeight: 'bold',
                borderTop: 'solid',
                borderWidth: 'thin'
              }}>
                On Point Construction
              </Col>
              <Col span={6}>
              </Col>
              <Col span={9} style={{
                fontWeight: 'bold',
                borderTop: 'solid',
                borderWidth: 'thin'
              }}>
                Vendor
              </Col>
            </Row>

            <Row style={{
              fontFamily: 'Arial',
              color: 'black',
              textAlign: 'center',
              marginTop: '15px',
              marginLeft: '5%',
              marginRight: '7%'
            }}>
              <Col span={17}></Col>
              <Col span={5}>RR Reference:</Col>
            </Row>

            <Row style={{
              fontFamily: 'Arial',
              textAlign: 'center',
              color: 'black'
            }}>
              <Col span={15}></Col>
              <Col span={7}>
                <Row>
                  <Col span={6}>
                    OR#:
                  </Col>
                  <Col span={6}>
                    RR#:
                  </Col>
                  <Col span={6}>
                    Date:
                  </Col>
                  <Col span={6}>
                    By:
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row style={{marginTop: '30px'}}>

            </Row>
          </div>
        </div>

        <Modal
          title={selectedProject.projectCode + " orders"}
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
                            {
                              validator: (_, value) => value
                              <= quantityLeft || value === undefined ?
                                Promise.resolve() :
                                Promise.reject(`Should not exceed ${quantityLeft}`)
                            }
                          ]}
                        >
                          <InputNumber
                            placeholder={quantityLeft}
                            style={{
                              width: 100,
                              border: '1px solid black'
                            }}
                            allowClear
                          // placeholder={}
                          />
                        </Form.Item>
                      </div>
                      <div style={{
                        zIndex: 500,
                        marginLeft: 180,
                        position: 'absolute'
                      }}>
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
                            placeholder="" style={{
                              width: 120,
                              border: '1px solid black'
                            }} allowClear />
                        </Form.Item>
                      </div>
                      <div style={{
                        zIndex: 500,
                        marginLeft: 180,
                        position: 'flex'
                      }}>
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
                            placeholder="Category" style={{
                              width: 120,
                              border: '1px solid black'
                            }} allowClear>
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
                        color: 'black'
                      }}>
                        {`for ${selectedKey}.`}
                      </div>
                    </Row>
                  )
                })
              }
            </Form>
          </Row>
        </Modal>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%'
        }}>
          <Button style={{
            marginRight: 20,
            marginTop: -10,
            marginBottom: 20,
            backgroundColor: '#13407F',
            color: 'white'
          }}
          onClick={onProceed}
          > Proceed</Button>
        </div>
        {purchaseOrderFlag}
      </Col>
    </Row>
  );
});

export default AddPurchaseOrder;
