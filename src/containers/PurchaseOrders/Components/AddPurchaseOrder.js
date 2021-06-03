import React, { useState, memo, useEffect, useRef } from "react";
import {
  Row,
  // Col,
  Form,
  Select,
  Col,
  Spin,
  Button,
  Input,
  Modal,
  AutoComplete,
  InputNumber,
  message,
} from "antd";
import OPC from '../../../api/OPC';
import { MinusCircleOutlined, WindowsFilled } from "@ant-design/icons";
import Logopng from "./../../../assets/images/Logo.jpg";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as actions from "../../../store/purchaseorders/actions/Actions";
import * as vendorActions from '../../../store/vendors/actions/actions';
import Logo from "./../../../components/logo/Logo";
import moment from "moment";
import Order from "./Order";
import Arial from "./../../../assets/Fonts/ARIAL.TTF";
import ArialBold from "./../../../assets/Fonts/ARIALBD.TTF";
import VendorList from "../../Vendors/VendorList";
import { uuid } from "uuidv4";
//import {getPurchaseRequest} from '../../../graphql/queries';

const AddPurchaseOrder = memo(() => {
  const dispatcher = useDispatch();
  const [selectedForm] = Form.useForm();
  const { Option } = Select;
  // const [ordersList, setOrdersList] = useState({});
  // const [selectedVendor, setSelectedVendor] = useState({});
  const [selectedProject, setSelectedProject] = useState({});
  const [purchaseRequestData, setPurchaseRequestData] = useState(0);
  const [newVendorModal, setNewVendorModal] = useState(false);
  const [newVendorForm, setNewVendorForm] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [displayedOrders, setDisplayedOrders] = useState("");
  const [orderState, setOrderState] = useState([]);
  const [ordersKey, setOrdersKey] = useState();
  const [orderCounter, setOrderCounter] = useState(0);
  const [projectCategories, setProjectCategories] = useState(0);
  const [myDocumentVisible, setMyDocumentVisible] = useState(false);
  const [printDocument, setPrintDocument] = useState("");
  const [purchaseOrderId, setPurchaseOrderId] = useState([0, 0]);
  //const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState({});

  const [transferParams, setTransferParams] = useState({
    ordersInTransfer: [],
    selectedKeys: [],
    targetKeys: [],
    openTransferModal: false,
  });

  const formRef = useRef(null);
  const borderStyle = "none";
  const flexProps = [11, 1.5, 9.8];
  const flexProps3 = [1, 10, 60, 12, 12, 18, 14, 1];

  Font.register({ family: "Arial", src: Arial });
  Font.register({ family: "ArialBold", src: ArialBold });

  // const [purchaseRequestProducts, setPurchaseRequestProducts] = useState({});
  const {
    purchaseRequestList,
    vendorsList,
    loadingState,
    purchaseRequest,
    purchaseOrderNo,
    selectedVendor,
    purchaseOrder,
    fetchedCategories,
    totalPrice,
    vendor,
    worksheet,
    //purchaseRequestProducts,
    projectsList,
  } = useSelector(
    ({ purchaseOrder, vendor }) => ({
      selectedVendor: purchaseOrder.vendor,
      loadingState: purchaseOrder.loading,
      purchaseOrderNo: purchaseOrder.purchaseOrderId,
      purchaseRequest: purchaseOrder.purchaseRequest,
      purchaseOrder: purchaseOrder.purchaseOrder,
      totalPrice: purchaseOrder.totalPrice,
      vendor: purchaseOrder.vendor,
      fetchedCategories: purchaseOrder.categories,
      purchaseRequestList: purchaseOrder.purchaseRequests,
      //purchaseRequestProducts: purchaseOrder.purchaseRequest,
      vendorsList: vendor.vendors,
      projectsList: purchaseOrder.projects,
    }),
    shallowEqual
  );

  const [totalPriceState, setTotalPriceState] = useState(
    purchaseOrder.totalPrice
  );

  useEffect(() => {
    dispatcher(actions.fetchPurchaseOrderId());
    dispatcher(actions.getProjects());
    dispatcher(vendorActions.fetchVendors());
    dispatcher(actions.getPurchaseRequests());
  }, [dispatcher]);

  const currentYear = moment(new Date()).format("YYYY");
  const [purchaseOrderData, setPurchaseOrderData] = useState({
    requestedBy: "Engr. Jojo Salamanes",
    project: "",
    vendor: "",
    status: "pending",
    purchaseOrderNo: purchaseOrderNo,
    notes: "",
    purchaseRequestNo: "",
    orders: [
      {
        product: "",
        unit: "",
        quantity: 0,
        quantityReceived: 0,
        unitPrice: 0,
        category: "",
      },
    ],
    totalPrice: 0,
  });

  const [purchaseOrderYear, setPurchaseOrderYear] = useState(currentYear);
  const [purchaseOrderNewNumber, setPurchaseOrderNewNumber] = useState(0);
  const handleCancel = () => {
    setTransferParams({
      ...transferParams,
      openTransferModal: false,
      selectedKeys: [],
    });
  };

  const ordersToDisplay = () => {
    let newCounterFlag = 0;
    if (purchaseRequestData !== 0) {
      const newPurchaseRequestOrders = [];
      for (const key in purchaseRequestData.orders) {
        if (purchaseRequestData.orders[key].quantity_left > 0) {
          newPurchaseRequestOrders.push({
            ...purchaseRequestData.orders[key],
          });
          newCounterFlag += 1;
        }
      }
      const newerPurchaseRequestOrders = [];
      for (const key in purchaseRequestData.orders) {
        if (purchaseRequestData.orders[key].quantity_left > 0) {
          newerPurchaseRequestOrders.push({
            ...purchaseRequestData.orders[key],
          });
        }
      }
      const newerPurchaseRequestData = {
        ...purchaseRequestData,
        orders: newerPurchaseRequestOrders,
      };
      const ordersDisplay = newerPurchaseRequestData.orders.map(
        (order, index) => {
          const emptyOrders = [];
          order.total_price = order.quantity_left * order.unit_price;
          setDisplayedOrders(emptyOrders);
          if (orderCounter === newCounterFlag) {
            return (
              <Row key={"div" + index}>
                <Col span={23}>
                  <Order
                    style={{ marginRight: 0 }}
                    key={"order" + index + ordersKey}
                    order={order}
                    index={index}
                    categories={projectCategories}
                  />
                </Col>
                <Col span={1}>
                  <Button
                    key={"btn" + index}
                    onClick={() => onDeleteClicked(index, newerPurchaseRequestData)}
                    style={{ borderStyle: "none", marginLeft: 0 }}
                  >
                    <MinusCircleOutlined
                      key={"circle" + index}
                      style={{ color: "red" }}
                    />
                  </Button>
                </Col>
              </Row>
            );
          }

          const newKey = uuid();
          setOrdersKey(newKey);
          return (
            <Row key={"div" + index}>
              <Col span={23}>
                <Order
                  style={{ marginRight: 0 }}
                  key={"orderNew" + index + newKey}
                  order={order}
                  index={index}
                  categories={projectCategories}
                />
              </Col>
              <Col span={1}>
                <Button
                  key={"btn" + index}
                  onClick={() => onDeleteClicked(index, newerPurchaseRequestData)}
                  style={{ borderStyle: "none", marginLeft: 0 }}
                >
                  <MinusCircleOutlined
                    key={"circle" + index}
                    style={{ color: "red" }}
                  />
                </Button>
              </Col>
            </Row>
          );
        }
      );
      setOrderCounter(newCounterFlag);
      setDisplayedOrders(ordersDisplay);
    }
  };

  useEffect(() => {
    ordersToDisplay();
  }, [
    purchaseRequestData,
    projectCategories,
    totalPrice,
    orderState,
    totalPriceState,
    purchaseRequest,
    purchaseOrder,
    vendorName,
    vendorsList,
    purchaseOrderData,
  ]);

  const onSelectClick = async (data) => {
    const today = new Date();
    let counterFlag = 0;
    try {
      const fetchedPurchaseRequest = await OPC.get('/purchase_requests/' + data);
      const fetchedOrders = await OPC.get('/purchase_requests/orders/' + data);
      const orders = [];
      for (const key in fetchedOrders.data) {
        orders.push(fetchedOrders.data[key]);
      }
      const selectedPurchaseRequest = {
        ...fetchedPurchaseRequest.data,
        orders: orders
      }

      dispatcher(actions.setPurchaseRequestData(selectedPurchaseRequest));
      const initTotalPrice = [];
      let newTotalAmount = 0;
      for (const key in selectedPurchaseRequest.orders) {
        if (selectedPurchaseRequest.orders[key].quantity_left > 0) {
          initTotalPrice.push({
            ...initTotalPrice[key],
            product: selectedPurchaseRequest.orders[key].product,
            quantity: selectedPurchaseRequest.orders[key].quantity_left,
            unit: selectedPurchaseRequest.orders[key].unit,
            orderId: selectedPurchaseRequest.orders[key].purchase_request_order_id,
            itemType: selectedPurchaseRequest.orders[key].item_type,
            unitPrice: selectedPurchaseRequest.orders[key].unit_price,
            totalPrice:
              selectedPurchaseRequest.orders[key].quantity_left *
              selectedPurchaseRequest.orders[key].unit_price,
          });
          newTotalAmount +=
            selectedPurchaseRequest.orders[key].quantity_left *
            selectedPurchaseRequest.orders[key].unit_price;
          counterFlag += 1;
        }
      }
      const newKey = uuid();
      setOrdersKey(newKey);
      setOrderCounter(counterFlag);
      dispatcher(actions.initOrders(initTotalPrice));
      setPurchaseRequestData(selectedPurchaseRequest);
      const newPurchaseOrderData = {
        ...purchaseOrder,
        purchaseRequestNo: selectedPurchaseRequest.purchase_request_number,
        purchaseOrderNo: purchaseOrder.purchaseOrderNo,
        requestedBy: selectedPurchaseRequest.requested_by,
        purchaseRequestId: selectedPurchaseRequest.purchase_request_id,
        totalPrice: newTotalAmount,
        orders: initTotalPrice,
      };
      setOrderState(newPurchaseOrderData.orders);
      setPurchaseOrderData(newPurchaseOrderData);
      dispatcher(actions.setPurchaseOrder(newPurchaseOrderData));
    } catch (error) {
      console.error(error.message);
    }
    // dispatcher(actions.getPurchaseRequests());
    // const thisPurchaseRequestList = [...purchaseRequestList];
    // const selectedPurchaseRequest = thisPurchaseRequestList.find(
    //   (element) => element.purchase_request_id === data
    // );

  };

  const onDeleteClicked = (index, newerPurchaseRequest) => {
    const newPurchaseRequest = { ...newerPurchaseRequest };
    newPurchaseRequest.orders.splice(index, 1);
    const newPurchaseOrder = {
      ...purchaseOrder,
    };
    newPurchaseOrder.orders.splice(index, 1);
    let newTotalPrice = 0;
    for (const key in newPurchaseOrder.orders) {
      newTotalPrice += newPurchaseOrder.orders[key].totalPrice;
      console.log(newPurchaseOrder.orders[key].totalPrice);
    }
    const newerPurchaseOrder = {
      ...purchaseOrder,
      totalPrice: newTotalPrice,
    };
    console.log('newPurchaseOrder: ', newerPurchaseOrder);
    setOrderState(newPurchaseRequest.orders);
    setPurchaseRequestData(newPurchaseRequest);
    setPurchaseOrderData(newerPurchaseOrder);
    dispatcher(actions.setPurchaseOrder(newerPurchaseOrder));
    //  ordersToDisplay2(newPurchaseRequest);
  };

  const setProject = async (selectedProject) => {
    if (!selectedProject) {
      setSelectedProject({});
      return;
    }
    const projectSelected = projectsList.find(
      (data) => data.project_id === selectedProject
    );
    setSelectedProject(projectSelected);

    const categories = [];

    try {
      const response = await OPC.get('/project_categories/' + selectedProject);
      for (const key in response.data) {
        categories.push(response.data[key].subcategory_category);
      }
      console.log('fetchedCategories: ', categories);
      setProjectCategories(categories);
    } catch (error) {
      console.error(error.message);
    }

    setPurchaseOrderData({
      ...purchaseOrderData,
      project: projectSelected.project_id
    });
    const newPurchaseOrderData = {
      ...purchaseOrder,
      project: projectSelected.project_id,
      projectCode: projectSelected.project_code
    };
    dispatcher(actions.setPurchaseOrder(newPurchaseOrderData));
    setProjectCategories(categories);
  };

  const onVendorSelect = (data, object) => {
    const newVendor = object;
    const newPurchaseOrderData = {
      ...purchaseOrder,
      vendor: newVendor.id,
    };
    setPurchaseOrderData({
      ...purchaseOrderData,
      vendor: newVendor.id,
    });
    dispatcher(actions.setVendor(newVendor.id));
    console.log('purchaseOrderData: ', newPurchaseOrderData);
    dispatcher(actions.setPurchaseOrder(newPurchaseOrderData));
  };

  const onVendorBlur = (data) => {
    const test = vendorsList.find((element) => element.name === data);
    if (test === undefined) {
      setVendorName(data);
      setNewVendorModal(true);
    }
  };

  const onVendorCancel = () => {
    setNewVendorModal(false);
  };

  const vendorFormCancel = () => {
    setNewVendorForm(false);
  };

  const createNewVendor = () => {
    setNewVendorModal(false);
    setNewVendorForm(true);
  };

  const vendorFormSubmit = () => {
    formRef.current.submit();
    dispatcher(actions.getVendors());
    vendorsList.map((vendors) => {
      const newVendor = vendors;
      vendorOptions.push({
        value: newVendor.name,
        id: newVendor.vendor_id
      });
    });
  };

  const onNotesChange = (data) => {
    const oldPurchaseOrder = purchaseOrder;
    const newPurchaseOrder = {
      ...purchaseOrder,
      notes: data,
    };
    dispatcher(actions.setPurchaseOrder(newPurchaseOrder));
  };

  const onPONumberInput1 = (purchaseOrderYear) => {
    const oldPurchaseOrder = {
      ...purchaseOrder,
    };
    const newPurchaseOrder = {
      ...oldPurchaseOrder,
      purchaseOrderId: parseFloat(purchaseOrderYear + purchaseOrderId[1]),
      purchaseOrderNo:
        "OPCDC-" + purchaseOrderYear + "-" + purchaseOrderNewNumber,
    };
    setPurchaseOrderYear(purchaseOrderYear);
    const newPurchaseOrderId = purchaseOrderYear;
    setPurchaseOrderId([purchaseOrderYear, purchaseOrderId[1]]);
    dispatcher(actions.setPurchaseOrder(newPurchaseOrder));
  };

  const onPONumberInput2 = (purchaseOrderNumber) => {
    const oldPurchaseOrder = {
      ...purchaseOrder,
    };
    const newPurchaseOrder = {
      ...oldPurchaseOrder,
      purchaseOrderId: parseFloat(purchaseOrderId[0] + purchaseOrderNumber),
      purchaseOrderNo: "OPCDC-" + purchaseOrderYear + "-" + purchaseOrderNumber,
    };
    setPurchaseOrderNewNumber(purchaseOrderNumber);
    const newPurchaseOrderId = purchaseOrderNumber;
    setPurchaseOrderId([purchaseOrderId[0], purchaseOrderNumber]);
    dispatcher(actions.setPurchaseOrder(newPurchaseOrder));
  };

  const onVendorSubmit = (values) => {
    dispatcher(actions.newVendor(values));
    //dispatcher(actions.setVendor(values.vendorName));
    setNewVendorForm(false);
  };

  const searchPurchaseRequestList = () =>
    purchaseRequestList.map((purchaseRequest) => {
      if (purchaseRequest.status === 'PENDING') {
        return (
          (
            <Option key={purchaseRequest.purchase_request_id} value={purchaseRequest.purchase_request_id}>
              {purchaseRequest.purchase_request_number}
            </Option>
          )
        )
      }
    }
    );

  const vendorOptions = [];

  vendorsList.map((vendors) => {
    const newVendor = vendors;
    vendorOptions.push({
      value: newVendor.name,
      id: newVendor.vendor_id
    });
  });

  const searchProjectsList = () =>
    projectsList.map((project) => (
      <Option key={project.project_id} value={project.project_id}>
        {project.project_code}
      </Option>
    ));

  const setOrders = async () => {
    await selectedForm.validateFields();

    const values = selectedForm.getFieldsValue();
    const newOrderInTransfer = transferParams.ordersInTransfer
      .filter((data) => {
        return transferParams.selectedKeys.includes(data.key);
      })
      .map((data) => {
        const newValues = parseFloat(values[`${data.product}price`])
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
        const price = values[`${data.product}price`];
        const qty = values[`${data.product}quantityLeft`] || data.quantity_left;
        const totalPrice = parseFloat(price * qty)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
        return {
          ...data,
          quantity_left:
            values[`${data.product}quantityLeft`] || data.quantity_left,
          unitPrice: newValues,
          category: values[`${data.product}category`],
          itemTotal: totalPrice,
          key: `deducted${data.key}`,
          disabled: true,
        };
      });
    // console.log(newOrderInTransfer)

    const toConcatOrderInTransfer = transferParams.ordersInTransfer;

    const applyDisable = toConcatOrderInTransfer.map((data) => {
      if (transferParams.selectedKeys.includes(data.key)) {
        return {
          ...data,
          //disabled: true,
          quantity_left:
            data.quantity_left - values[`${data.product}quantityLeft`] || 0,
        };
      }
      return data;
    });

    const concatenatedOrderInTransfer = applyDisable.concat(newOrderInTransfer);

    const oldTargetKeys = transferParams.targetKeys;

    const newTargetKeys = oldTargetKeys.concat(
      newOrderInTransfer.map((data) => data.key)
    );
    setTransferParams({
      ...transferParams,
      ordersInTransfer: concatenatedOrderInTransfer,
      targetKeys: newTargetKeys,
      openTransferModal: false,
    });
    setPurchaseOrderData({
      ...purchaseOrderData,
      orders: newOrderInTransfer,
    });

    selectedForm.resetFields();
  };

  const showedCategories = () => {
    if (projectCategories === null) {
      return (
        <Option key="0" value="0">
          Please select a Project
        </Option>
      );
    }
    return projectCategories
      .map((e) => (
        <Option key={"category-" + e} value={e}>
          {e}
        </Option>
      ))
      .concat(<Option key="Not Specified">Not Specified</Option>);
  };

  const onProceed = () => {
    setPrintDocument("");
    if (
      purchaseOrder.purchaseRequestNo === "" ||
      purchaseOrder.orders.length > 24
    ) {
      message.error("Invalid Purchase Order!");
    } else {
      dispatcher(actions.addPurchaseOrder(purchaseOrder));
    }
  };

  const noClick = () => {
    setPrintDocument("");
    setMyDocumentVisible(false);
  };

  const proceedClick = () => {
    console.log('purhcaseOrder: ', purchaseOrder);
    const newDocument = (
      <MyDocument purchaseOrder={purchaseOrder} vendor={vendor} />
    );
    setPrintDocument(newDocument);
    setMyDocumentVisible(true);
  };

  const styles = StyleSheet.create({
    page: {
      display: "grid",
      marginTop: 30,
      paddingTop: 35,
      fontFamily: "Arial",
      paddingHorizontal: 35,
    },
    image: {
      paddingRight: 30,
      marginRight: 40,
    },
    firstRow: {
      flexDirection: "row",
    },
    pdfViewer: {
      height: "13in",
      width: "8.5in",
    },
    flexOne: {
      flex: 1,
    },
    purchaseOrderText: {
      borderStyle: "solid",
      color: "white",
      fontSize: 12,
      fontFamily: "ArialBold",
      backgroundColor: "#7f7f7f",
      borderWidth: "1",
      height: "20px",
      marginTop: 5,
      textAlign: "center",
    },
    purchaseOrderNo: {
      textAlign: "center",
      fontFamily: "Arial",
      fontSize: 10,
      height: "15px",
      borderStyle: "solid",
      borderWidth: "1",
      borderTopWidth: "0",
      fontWeight: "bold",
    },
    prDoc: {
      flexDirection: "row",
      fontFamily: "Arial",
      marginTop: 10,
    },
    centerText: {
      fontSize: 10,
      textAlign: "center",
    },
    secondRow: {
      flexDirection: "row",
    },
    middleMargins: {
      flex: 1,
      marginVertical: 18,
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="Folio" style={styles.page}>
        <View style={styles.firstRow}>
          <View style={{ flex: flexProps[0] }}>
            <Image src={Logopng} style={styles.image} />
          </View>

          <View style={{ flex: flexProps[1] }}></View>

          <View style={{ flex: flexProps[2], alignContent: "center" }}>
            <Text
              style={{
                padding: "1",
                justifyContent: "center",
                fontSize: 14,
                fontFamily: "ArialBold",
                borderStyle: "solid",
                textAlign: "center",
                color: "white",
                height: "20px",
                backgroundColor: "#7f7f7f",
                borderColor: "black",
                borderWidth: "1",
              }}
            >
              PURCHASE ORDER
            </Text>
            <Text style={styles.purchaseOrderNo}>
              {purchaseOrder.purchaseOrderNo}
            </Text>

            <View style={styles.prDoc}>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>PR / Doc # :</Text>
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>
                  {purchaseOrder.purchaseRequestNo}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: flexProps[0] }}>
            <View>
              <Text style={{ fontFamily: "ArialBold", fontSize: 8 }}>
                ON POINT CONSTRUCTION AND DEVELOPMENT CORPORATION
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>28 A Sanson Road, Lahug</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>Cebu City, Philippines</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>(032) 266 3356</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>
                onpointconstruction.ph@gmail.com
              </Text>
            </View>
          </View>

          <View style={{ flex: flexProps[1] }} />

          <View style={{ flex: flexProps[2], textAlign: "center" }}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "white", fontSize: 10 }}>_</Text>
              </View>
              <View style={{ flex: 2, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10 }}>Order Date:</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10 }}>
                    {`${moment(new Date()).format("L")}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View
            style={{
              flex: flexProps[0],
              fontFamily: "Arial",
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "1",
              fontSize: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                height: "15px",
                backgroundColor: "#eeece1",
                borderWidth: "1",
                borderStyle: "solid",
                borderLeftWidth: "0",
                borderRightWidth: "0",
                borderTopWidth: "0",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 10 }}>VENDOR</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 2 }}>Name:</Text>
                <Text style={{ marginBottom: 2 }}>Address:</Text>
                <Text style={{ marginBottom: 2 }}>Tel:</Text>
                <Text style={{ marginBottom: 2 }}>Terms:</Text>
              </View>

              <View style={{ flex: 3 }}>
                <Text style={{ marginBottom: 2 }}>{vendor.name}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.location}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.tel_no}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.terms}</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: flexProps[1] }}></View>

          <View
            style={{
              flex: flexProps[2],
              borderStyle: "solid",
              borderWidth: "1",
              fontSize: 10,
            }}
          >
            <View
              style={{
                borderStyle: "solid",
                backgroundColor: "#eeece1",
                borderWidth: "1",
                height: "15px",
                borderLeftWidth: "0",
                borderRightWidth: "0",
                borderTopWidth: "0",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 10 }}>
                JOB ADDRESS
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginLeft: 5 }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 2 }}>Req By:</Text>
                <Text style={{ marginBottom: 2 }}>Project:</Text>
                <Text style={{ marginBottom: 2 }}>Category:</Text>
              </View>

              <View style={{ flex: 3 }}>
                <Text style={{ marginBottom: 2 }}>
                  {purchaseOrder.requestedBy}
                </Text>
                <Text style={{ marginBottom: 2 }}>{purchaseOrder.projectCode}</Text>
                <Text style={{ marginBottom: 2 }}></Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 10 }}>
            PLEASE SUPPLY THE FOLLOWING:
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              fontFamily: "Arial",
              fontSize: 10,
              borderStyle: "solid",
              textAlign: "center",
              height: "50px",
              borderTopWidth: "1",
              borderBottomWidth: "1",
            }}
          >
            <View style={{ flex: flexProps3[0] }}></View>
            <View style={{ flex: flexProps3[1], marginVertical: 18 }}>
              <Text>IT</Text>
            </View>
            <View style={{ flex: flexProps3[2], marginVertical: 18 }}>
              <Text>DESCRIPTION</Text>
            </View>
            <View style={{ flex: flexProps3[3], marginVertical: 18 }}>
              <Text>QTY</Text>
            </View>
            <View style={{ flex: flexProps3[4], marginVertical: 18 }}>
              <Text>UNIT</Text>
            </View>
            <View style={{ flex: flexProps3[5], marginVertical: 18 }}>
              <Text>UNIT PRICE</Text>
            </View>
            <View style={{ flex: flexProps3[6], marginVertical: 18 }}>
              <Text>TOTAL</Text>
            </View>
            <View style={{ flex: flexProps3[7] }}></View>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>{ordersDisplay2}</View>
        <View>
          <View
            style={{
              fontFamily: "Arial",
              fontSize: 10,
              textAlign: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1 }}>
              <Text>***NOTHING FOLLOWS***</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text></Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            fontFamily: "Arial",
            fontSize: 10,
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "ArialBold" }}>Notes: </Text>
          </View>
          <View style={{ flex: 10 }}>
            <Text>{purchaseOrder.notes}</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <View>{ordersDisplay3}</View>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 5 }}>
              <Text style={{ color: "white" }}>_</Text>
            </View>

            <View
              style={{
                borderStyle: "solid",
                borderTopWidth: 1,
                flex: 2,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 7, marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontFamily: "Arial", fontSize: 10 }}>
                  Total Amount
                </Text>
              </View>
              <View style={{ flex: 4, marginTop: 5 }}>
                <Text style={{ fontFamily: "Arial", fontSize: 10 }}>
                  {parseFloat(purchaseOrder.totalPrice)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={{flexDirection: 'row', fontFamily: "Arial", fontSize: 10, marginTop: 15, marginBottom: 15}}>
          <View>
            <Text>REMARKS:</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', fontFamily: "Arial", fontSize: 10}}>
          <View>
            <Text>If you have any questions about this purchase order, please contact us. Thank you.</Text>
          </View>
        </View> */}

        <View>
          <View
            style={{ borderStyle: "solid", borderTopWidth: 1, marginTop: 15 }}
          ></View>
        </View>

        <View>
          <View
            style={{ flexDirection: "row", fontFamily: "Arial", fontSize: 10 }}
          >
            <View style={{ flex: 18, marginLeft: 5 }}>
              <Text>Prepared by:</Text>
            </View>
            <View style={{ flex: 15 }}>
              <Text>Approved by:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>Conformed by:</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 6 }}>
              <Text
                style={{
                  fontSize: "9",
                  fontFamily: "Arial",
                  textAlign: "left",
                }}
              >
                HAROLD FLORES
              </Text>
            </View>
            <View style={{ flex: 4 }} />
            <View style={{ flex: 6 }}>
              <Text
                style={{
                  fontSize: "9",
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              >
                MGT1/BMC/MGT3
              </Text>
            </View>
            <View style={{ flex: 4 }} />
            <View style={{ flex: 5 }}></View>
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            fontFamily: "Arial",
            textAlign: "center",
            fontSize: 10,
          }}
        >
          <View style={{ flex: 6 }}>
            <Text>(Signature over printed name)</Text>
          </View>
          <View style={{ flex: 4 }}></View>
          <View style={{ flex: 5 }}>
            <Text>(Print name & signature)</Text>
          </View>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            fontFamily: "ArialBold",
            fontSize: "10",
          }}
        >
          <View
            style={{
              flex: 6,
              borderStyle: "solid",
              borderTopWidth: 1,
              textAlight: "left",
            }}
          >
            <Text>ON POINT CONSTRUCTION</Text>
          </View>
          <View style={{ flex: 4 }}></View>
          <View
            style={{
              flex: 6,
              borderStyle: "solid",
              borderTopWidth: 1,
              textAlign: "center",
            }}
          >
            <Text>ON POINT CONSTRUCTION</Text>
          </View>
          <View style={{ flex: 4 }}></View>
          <View
            style={{
              flex: 5,
              borderStyle: "solid",
              borderTopWidth: 1,
              textAlign: "center",
            }}
          >
            <Text>VENDOR</Text>
          </View>
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              ></Text>
            </View>
            <View style={{ flex: 5 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              >
                RR Reference:
              </Text>
            </View>
          </View>
        </View> */}

        {/* <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              ></Text>
            </View>
            <View style={{ flex: 5, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  OR#:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  RR#:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  Date:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  By:
                </Text>
              </View>
            </View>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            fontFamily: "ArialBold",
            fontSize: "10",
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>Warehouse Copy</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </Page>
      <Page size="Folio" style={styles.page}>
        <View style={styles.firstRow}>
          <View style={{ flex: flexProps[0] }}>
            <Image src={Logopng} style={styles.image} />
          </View>

          <View style={{ flex: flexProps[1] }}></View>

          <View style={{ flex: flexProps[2], alignContent: "center" }}>
            <Text
              style={{
                padding: "1",
                justifyContent: "center",
                fontSize: 14,
                fontFamily: "ArialBold",
                borderStyle: "solid",
                textAlign: "center",
                color: "white",
                height: "20px",
                backgroundColor: "#7f7f7f",
                borderColor: "black",
                borderWidth: "1",
              }}
            >
              PURCHASE ORDER
            </Text>
            <Text style={styles.purchaseOrderNo}>
              {purchaseOrder.purchaseOrderNo}
            </Text>

            <View style={styles.prDoc}>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>PR / Doc # :</Text>
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>
                  {purchaseOrder.purchaseRequestNo}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: flexProps[0] }}>
            <View>
              <Text style={{ fontFamily: "ArialBold", fontSize: 8 }}>
                ON POINT CONSTRUCTION AND DEVELOPMENT CORPORATION
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>28 A Sanson Road, Lahug</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>Cebu City, Philippines</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>(032) 266 3356</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>
                onpointconstruction.ph@gmail.com
              </Text>
            </View>
          </View>

          <View style={{ flex: flexProps[1] }} />

          <View style={{ flex: flexProps[2], textAlign: "center" }}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "white", fontSize: 10 }}>_</Text>
              </View>
              <View style={{ flex: 2, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10 }}>Order Date:</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10 }}>
                    {`${moment(new Date()).format("L")}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View
            style={{
              flex: flexProps[0],
              fontFamily: "Arial",
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "1",
              fontSize: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                height: "15px",
                backgroundColor: "#eeece1",
                borderWidth: "1",
                borderStyle: "solid",
                borderLeftWidth: "0",
                borderRightWidth: "0",
                borderTopWidth: "0",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 10 }}>VENDOR</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 2 }}>Name:</Text>
                <Text style={{ marginBottom: 2 }}>Address:</Text>
                <Text style={{ marginBottom: 2 }}>Tel:</Text>
                <Text style={{ marginBottom: 2 }}>Terms:</Text>
              </View>

              <View style={{ flex: 3 }}>
                <Text style={{ marginBottom: 2 }}>{vendor.name}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.location}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.tel_no}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.terms}</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: flexProps[1] }}></View>

          <View
            style={{
              flex: flexProps[2],
              borderStyle: "solid",
              borderWidth: "1",
              fontSize: 10,
            }}
          >
            <View
              style={{
                borderStyle: "solid",
                backgroundColor: "#eeece1",
                borderWidth: "1",
                height: "15px",
                borderLeftWidth: "0",
                borderRightWidth: "0",
                borderTopWidth: "0",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 10 }}>
                JOB ADDRESS
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginLeft: 5 }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 2 }}>Req By:</Text>
                <Text style={{ marginBottom: 2 }}>Project:</Text>
                <Text style={{ marginBottom: 2 }}>Category:</Text>
              </View>

              <View style={{ flex: 3 }}>
                <Text style={{ marginBottom: 2 }}>
                  {purchaseOrder.requestedBy}
                </Text>
                <Text style={{ marginBottom: 2 }}>{purchaseOrder.projectCode}</Text>
                <Text style={{ marginBottom: 2 }}></Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 10 }}>
            PLEASE SUPPLY THE FOLLOWING:
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              fontFamily: "Arial",
              fontSize: 10,
              borderStyle: "solid",
              textAlign: "center",
              height: "50px",
              borderTopWidth: "1",
              borderBottomWidth: "1",
            }}
          >
            <View style={{ flex: flexProps3[0] }}></View>
            <View style={{ flex: flexProps3[1], marginVertical: 18 }}>
              <Text>IT</Text>
            </View>
            <View style={{ flex: flexProps3[2], marginVertical: 18 }}>
              <Text>DESCRIPTION</Text>
            </View>
            <View style={{ flex: flexProps3[3], marginVertical: 18 }}>
              <Text>QTY</Text>
            </View>
            <View style={{ flex: flexProps3[4], marginVertical: 18 }}>
              <Text>UNIT</Text>
            </View>
            <View style={{ flex: flexProps3[5], marginVertical: 18 }}>
              <Text>UNIT PRICE</Text>
            </View>
            <View style={{ flex: flexProps3[6], marginVertical: 18 }}>
              <Text>TOTAL</Text>
            </View>
            <View style={{ flex: flexProps3[7] }}></View>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>{ordersDisplay2}</View>
        <View>
          <View
            style={{
              fontFamily: "Arial",
              fontSize: 10,
              textAlign: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1 }}>
              <Text>***NOTHING FOLLOWS***</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text></Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            fontFamily: "Arial",
            fontSize: 10,
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "ArialBold" }}>Notes: </Text>
          </View>
          <View style={{ flex: 10 }}>
            <Text>{purchaseOrder.notes}</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <View>{ordersDisplay3}</View>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 5 }}>
              <Text style={{ color: "white" }}>_</Text>
            </View>

            <View
              style={{
                borderStyle: "solid",
                borderTopWidth: 1,
                flex: 2,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 7, marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontFamily: "Arial", fontSize: 10 }}>
                  Total Amount
                </Text>
              </View>
              <View style={{ flex: 4, marginTop: 5 }}>
                <Text style={{ fontFamily: "Arial", fontSize: 10 }}>
                  {parseFloat(purchaseOrder.totalPrice)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={{flexDirection: 'row', fontFamily: "Arial", fontSize: 10, marginTop: 15, marginBottom: 15}}>
          <View>
            <Text>REMARKS:</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', fontFamily: "Arial", fontSize: 10}}>
          <View>
            <Text>If you have any questions about this purchase order, please contact us. Thank you.</Text>
          </View>
        </View> */}

        <View>
          <View
            style={{ borderStyle: "solid", borderTopWidth: 1, marginTop: 15 }}
          ></View>
        </View>

        <View>
          <View
            style={{ flexDirection: "row", fontFamily: "Arial", fontSize: 10 }}
          >
            <View style={{ flex: 18, marginLeft: 5 }}>
              <Text>Prepared by:</Text>
            </View>
            <View style={{ flex: 15 }}>
              <Text>Approved by:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>Conformed by:</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 6 }}>
              <Text
                style={{
                  fontSize: "9",
                  fontFamily: "Arial",
                  textAlign: "left",
                }}
              >
                HAROLD FLORES
              </Text>
            </View>
            <View style={{ flex: 4 }} />
            <View style={{ flex: 6 }}>
              <Text
                style={{
                  fontSize: "9",
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              >
                MGT1/BMC/MGT3
              </Text>
            </View>
            <View style={{ flex: 4 }} />
            <View style={{ flex: 5 }}></View>
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            fontFamily: "Arial",
            textAlign: "center",
            fontSize: 10,
          }}
        >
          <View style={{ flex: 6 }}>
            <Text>(Signature over printed name)</Text>
          </View>
          <View style={{ flex: 4 }}></View>
          <View style={{ flex: 5 }}>
            <Text>(Print name & signature)</Text>
          </View>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            fontFamily: "ArialBold",
            fontSize: "10",
          }}
        >
          <View
            style={{
              flex: 6,
              borderStyle: "solid",
              borderTopWidth: 1,
              textAlight: "left",
            }}
          >
            <Text>ON POINT CONSTRUCTION</Text>
          </View>
          <View style={{ flex: 4 }}></View>
          <View
            style={{
              flex: 6,
              borderStyle: "solid",
              borderTopWidth: 1,
              textAlign: "center",
            }}
          >
            <Text>ON POINT CONSTRUCTION</Text>
          </View>
          <View style={{ flex: 4 }}></View>
          <View
            style={{
              flex: 5,
              borderStyle: "solid",
              borderTopWidth: 1,
              textAlign: "center",
            }}
          >
            <Text>VENDOR</Text>
          </View>
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              ></Text>
            </View>
            <View style={{ flex: 5 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              >
                RR Reference:
              </Text>
            </View>
          </View>
        </View> */}

        {/* <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              ></Text>
            </View>
            <View style={{ flex: 5, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  OR#:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  RR#:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  Date:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  By:
                </Text>
              </View>
            </View>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            fontFamily: "ArialBold",
            fontSize: "10",
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>Accounting Copy</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </Page>
      <Page size="Folio" style={styles.page}>
        <View style={styles.firstRow}>
          <View style={{ flex: flexProps[0] }}>
            <Image src={Logopng} style={styles.image} />
          </View>

          <View style={{ flex: flexProps[1] }}></View>

          <View style={{ flex: flexProps[2], alignContent: "center" }}>
            <Text
              style={{
                padding: "1",
                justifyContent: "center",
                fontSize: 14,
                fontFamily: "ArialBold",
                borderStyle: "solid",
                textAlign: "center",
                color: "white",
                height: "20px",
                backgroundColor: "#7f7f7f",
                borderColor: "black",
                borderWidth: "1",
              }}
            >
              PURCHASE ORDER
            </Text>
            <Text style={styles.purchaseOrderNo}>
              {purchaseOrder.purchaseOrderNo}
            </Text>

            <View style={styles.prDoc}>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>PR / Doc # :</Text>
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.centerText}>
                  {purchaseOrder.purchaseRequestNo}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: flexProps[0] }}>
            <View>
              <Text style={{ fontFamily: "ArialBold", fontSize: 8 }}>
                ON POINT CONSTRUCTION AND DEVELOPMENT CORPORATION
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>28 A Sanson Road, Lahug</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>Cebu City, Philippines</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>(032) 266 3356</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>
                onpointconstruction.ph@gmail.com
              </Text>
            </View>
          </View>

          <View style={{ flex: flexProps[1] }} />

          <View style={{ flex: flexProps[2], textAlign: "center" }}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "white", fontSize: 10 }}>_</Text>
              </View>
              <View style={{ flex: 2, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10 }}>Order Date:</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10 }}>
                    {`${moment(new Date()).format("L")}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View
            style={{
              flex: flexProps[0],
              fontFamily: "Arial",
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "1",
              fontSize: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                height: "15px",
                backgroundColor: "#eeece1",
                borderWidth: "1",
                borderStyle: "solid",
                borderLeftWidth: "0",
                borderRightWidth: "0",
                borderTopWidth: "0",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 10 }}>VENDOR</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 2 }}>Name:</Text>
                <Text style={{ marginBottom: 2 }}>Address:</Text>
                <Text style={{ marginBottom: 2 }}>Tel:</Text>
                <Text style={{ marginBottom: 2 }}>Terms:</Text>
              </View>

              <View style={{ flex: 3 }}>
                <Text style={{ marginBottom: 2 }}>{vendor.name}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.location}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.tel_no}</Text>
                <Text style={{ marginBottom: 2 }}>{vendor.terms}</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: flexProps[1] }}></View>

          <View
            style={{
              flex: flexProps[2],
              borderStyle: "solid",
              borderWidth: "1",
              fontSize: 10,
            }}
          >
            <View
              style={{
                borderStyle: "solid",
                backgroundColor: "#eeece1",
                borderWidth: "1",
                height: "15px",
                borderLeftWidth: "0",
                borderRightWidth: "0",
                borderTopWidth: "0",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 10 }}>
                JOB ADDRESS
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginLeft: 5 }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 2 }}>Req By:</Text>
                <Text style={{ marginBottom: 2 }}>Project:</Text>
                <Text style={{ marginBottom: 2 }}>Category:</Text>
              </View>

              <View style={{ flex: 3 }}>
                <Text style={{ marginBottom: 2 }}>
                  {purchaseOrder.requestedBy}
                </Text>
                <Text style={{ marginBottom: 2 }}>{purchaseOrder.projectCode}</Text>
                <Text style={{ marginBottom: 2 }}></Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 10 }}>
            PLEASE SUPPLY THE FOLLOWING:
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              fontFamily: "Arial",
              fontSize: 10,
              borderStyle: "solid",
              textAlign: "center",
              height: "50px",
              borderTopWidth: "1",
              borderBottomWidth: "1",
            }}
          >
            <View style={{ flex: flexProps3[0] }}></View>
            <View style={{ flex: flexProps3[1], marginVertical: 18 }}>
              <Text>IT</Text>
            </View>
            <View style={{ flex: flexProps3[2], marginVertical: 18 }}>
              <Text>DESCRIPTION</Text>
            </View>
            <View style={{ flex: flexProps3[3], marginVertical: 18 }}>
              <Text>QTY</Text>
            </View>
            <View style={{ flex: flexProps3[4], marginVertical: 18 }}>
              <Text>UNIT</Text>
            </View>
            <View style={{ flex: flexProps3[5], marginVertical: 18 }}>
              <Text>UNIT PRICE</Text>
            </View>
            <View style={{ flex: flexProps3[6], marginVertical: 18 }}>
              <Text>TOTAL</Text>
            </View>
            <View style={{ flex: flexProps3[7] }}></View>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>{ordersDisplay2}</View>
        <View>
          <View
            style={{
              fontFamily: "Arial",
              fontSize: 10,
              textAlign: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1 }}>
              <Text>***NOTHING FOLLOWS***</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text></Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            fontFamily: "Arial",
            fontSize: 10,
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "ArialBold" }}>Notes: </Text>
          </View>
          <View style={{ flex: 10 }}>
            <Text>{purchaseOrder.notes}</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <View>{ordersDisplay3}</View>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 5 }}>
              <Text style={{ color: "white" }}>_</Text>
            </View>

            <View
              style={{
                borderStyle: "solid",
                borderTopWidth: 1,
                flex: 2,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 7, marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontFamily: "Arial", fontSize: 10 }}>
                  Total Amount
                </Text>
              </View>
              <View style={{ flex: 4, marginTop: 5 }}>
                <Text style={{ fontFamily: "Arial", fontSize: 10 }}>
                  {parseFloat(purchaseOrder.totalPrice)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={{flexDirection: 'row', fontFamily: "Arial", fontSize: 10, marginTop: 15, marginBottom: 15}}>
          <View>
            <Text>REMARKS:</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', fontFamily: "Arial", fontSize: 10}}>
          <View>
            <Text>If you have any questions about this purchase order, please contact us. Thank you.</Text>
          </View>
        </View> */}

        <View>
          <View
            style={{ borderStyle: "solid", borderTopWidth: 1, marginTop: 15 }}
          ></View>
        </View>

        <View>
          <View
            style={{ flexDirection: "row", fontFamily: "Arial", fontSize: 10 }}
          >
            <View style={{ flex: 18, marginLeft: 5 }}>
              <Text>Prepared by:</Text>
            </View>
            <View style={{ flex: 15 }}>
              <Text>Approved by:</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Text>Conformed by:</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 6 }}>
              <Text
                style={{
                  fontSize: "9",
                  fontFamily: "Arial",
                  textAlign: "left",
                }}
              >
                HAROLD FLORES
              </Text>
            </View>
            <View style={{ flex: 4 }} />
            <View style={{ flex: 6 }}>
              <Text
                style={{
                  fontSize: "9",
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              >
                MGT1/BMC/MGT3
              </Text>
            </View>
            <View style={{ flex: 4 }} />
            <View style={{ flex: 5 }}></View>
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            fontFamily: "Arial",
            textAlign: "center",
            fontSize: 10,
          }}
        >
          <View style={{ flex: 6 }}>
            <Text>(Signature over printed name)</Text>
          </View>
          <View style={{ flex: 4 }}></View>
          <View style={{ flex: 5 }}>
            <Text>(Print name & signature)</Text>
          </View>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            fontFamily: "ArialBold",
            fontSize: "10",
          }}
        >
          <View
            style={{
              flex: 6,
              borderStyle: "solid",
              borderTopWidth: 1,
              textAlight: "left",
            }}
          >
            <Text>ON POINT CONSTRUCTION</Text>
          </View>
          <View style={{ flex: 4 }}></View>
          <View
            style={{
              flex: 6,
              borderStyle: "solid",
              borderTopWidth: 1,
              textAlign: "center",
            }}
          >
            <Text>ON POINT CONSTRUCTION</Text>
          </View>
          <View style={{ flex: 4 }}></View>
          <View
            style={{
              flex: 5,
              borderStyle: "solid",
              borderTopWidth: 1,
              textAlign: "center",
            }}
          >
            <Text>VENDOR</Text>
          </View>
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              ></Text>
            </View>
            <View style={{ flex: 5 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              >
                RR Reference:
              </Text>
            </View>
          </View>
        </View> */}

        {/* <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              ></Text>
            </View>
            <View style={{ flex: 5, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  OR#:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  RR#:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  Date:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  By:
                </Text>
              </View>
            </View>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            fontFamily: "ArialBold",
            fontSize: "10",
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text>Supplier's Copy</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </Page>
    </Document>
  );

  // Create Document Component

  const newPurchaseOrderOrders = [];

  for (const key in purchaseOrder.orders) {
    if (purchaseOrder.orders[key].quantity > 0) {
      newPurchaseOrderOrders.push({
        ...purchaseOrder.orders[key],
      });
    }
  }

  const ordersDisplay2 = newPurchaseOrderOrders.map((order, index) => (
    <View
      key={order.id}
      style={{
        fontFamily: "Arial",
        fontSize: 10,
        textAlign: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ flex: flexProps3[0] }}></View>
      <View style={{ flex: flexProps3[1] }}>
        <Text>{index + 1}</Text>
      </View>
      <View style={{ flex: flexProps3[2], textAlign: "left", marginLeft: 20 }}>
        <Text>{order.product}</Text>
      </View>
      <View style={{ flex: flexProps3[3] }}>
        <Text>{order.quantity}</Text>
      </View>
      <View style={{ flex: flexProps3[4] }}>
        <Text>{order.unit}</Text>
      </View>
      <View style={{ flex: flexProps3[5] }}>
        <Text>
          {parseFloat(order.unitPrice)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </Text>
      </View>
      <View style={{ flex: flexProps3[6] }}>
        <Text>
          {parseFloat(order.totalPrice)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </Text>
      </View>
      <View style={{ flex: flexProps3[7] }}></View>
    </View>
  ));

  const newOrdersDisplay = [];
  for (let i = 0; i <= 26 - newPurchaseOrderOrders.length; i += 1) {
    newOrdersDisplay.push({ key: i });
  }

  const ordersDisplay3 = newOrdersDisplay.map((order) => (
    <View
      key={order.key}
      style={{
        fontFamily: "Arial",
        fontSize: 10,
        textAlign: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ flex: flexProps3[0] }}></View>
      <View style={{ flex: flexProps3[1] }}>
        <Text style={{ color: "white" }}>_</Text>
      </View>
      <View style={{ flex: flexProps3[2], textAlign: "left", marginLeft: 20 }}>
        <Text style={{ color: "white" }}>_</Text>
      </View>
      <View style={{ flex: flexProps3[3] }}>
        <Text style={{ color: "white" }}>_</Text>
      </View>
      <View style={{ flex: flexProps3[4] }}>
        <Text style={{ color: "white" }}>_</Text>
      </View>
      <View style={{ flex: flexProps3[5] }}>
        <Text style={{ color: "white" }}>_</Text>
      </View>
      <View style={{ flex: flexProps3[6] }}>
        <Text style={{ color: "white" }}>_</Text>
      </View>
      <View style={{ flex: flexProps3[7] }}></View>
    </View>
  ));

  return (
    <div>
      <Spin spinning={loadingState} tip="Please wait a moment..." size="large">
        <Row>
          <Col span={5}></Col>
          <Col
            span={10}
            style={{
              marginTop: 20,
              width: "210mm",
              marginBottom: 20,
            }}
          >
            <div>
              <Row>
                <h3
                  style={{
                    marginLeft: 10,
                    color: " #FF111B",
                    fontWeight: "bold",
                  }}
                >
                  New Purchase Order
                </h3>
              </Row>
              {/* enter old Form here */}
              <Row style={{ marginBottom: 2 }}></Row>
              <div
                id="divToPrint"
                style={{
                  minWidth: "210mm",
                  minHeight: "297mm",
                  justifyContent: "center",
                }}
              >
                <Row style={{ marginBottom: 25 }}></Row>

                <Row
                  style={{
                    marginLeft: "5.0%",
                    marginRight: "7%",
                  }}
                >
                  <Col
                    span={10}
                    style={{
                      textAlign: "left",
                      borderStyle: borderStyle,
                      marginLeft: "0%",
                    }}
                  >
                    <Logo />
                  </Col>
                  <Col span={1} />
                  <Col
                    span={11}
                    style={{
                      alignContent: "start",
                      borderStyle: borderStyle,
                      textAlign: "center",
                      marginLeft: "7.5%",
                    }}
                  >
                    <Row
                      style={{
                        fontSize: 18,
                        borderColor: "black",
                        backgroundColor: "#7f7f7f",
                        color: "white",
                        marginTop: 10,
                        borderStyle: "solid",
                        borderWidth: "thin",
                        borderBottom: "none",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        textAlign: "center",
                        height: 25,
                        marginBottom: 0,
                      }}
                    >
                      <Col span={24} style={{ textAlign: "center" }}>
                        PURCHASE ORDER
                      </Col>
                    </Row>
                    <Row
                      style={{
                        borderColor: "black",
                        marginTop: 0,
                        fontSize: 13,
                        fontFamily: "Arial",
                        textAlign: "center",
                        borderStyle: "solid",
                        borderTop: "none",
                        borderWidth: "thin",
                        marginBottom: 10,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          textAlign: "left",
                          color: "black",
                        }}
                      >
                        <Row>
                          <Col span={10} style={{ textAlign: "right" }}>
                            OPCDC -
                          </Col>
                          <Col span={1} />
                          <Col span={5}>
                            <Input
                              style={{ textAlign: "left" }}
                              defaultValue={currentYear}
                              onChange={(e) => onPONumberInput1(e.target.value)}
                            />
                          </Col>
                          <Col span={1} />
                          <Col span={1}>-</Col>
                          <Col span={5}>
                            <Input
                              style={{ textAlign: "left" }}
                              onChange={(e) => onPONumberInput2(e.target.value)}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        fontFamily: "Arial",
                        fontSize: 13,
                        color: "black",
                        textAlign: "left",
                        marginLeft: "4%",
                        borderStyle: borderStyle,
                      }}
                    >
                      <Col span={10}>PR / Doc # :</Col>
                      <Col
                        span={10}
                        style={{
                          textAlign: "center",
                          marginLeft: "5%",
                        }}
                      >
                        <Select
                          style={{ width: 150 }}
                          onSelect={(e) => {
                            onSelectClick(e);
                          }}
                        >
                          {searchPurchaseRequestList()}
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row
                  style={{
                    marginBottom: 10,
                    color: "black",
                    fontFamily: "Arial",
                  }}
                >
                  <Col
                    span={10}
                    style={{
                      display: "block",
                      textAlign: "left",
                      marginLeft: "5%",
                      borderStyle: borderStyle,
                    }}
                  >
                    <Row
                      style={{
                        marginBottom: 0,
                        height: 16,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Arial",
                          letterSpacing: "-0.5px",
                          fontSize: 17,
                        }}
                      >
                        ON POINT CONSTRUCTION
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginBottom: 0,
                        height: 16,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          fontFamily: "Arial",
                          textAlign: "left",
                          fontSize: 14,
                        }}
                      >
                        28A Sanson Road, Lahug
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginBottom: 0,
                        height: 16,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          fontFamily: "Arial",
                          fontSize: 14,
                        }}
                      >
                        Cebu City, Philippines
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1} />
                  <Col
                    span={10}
                    style={{
                      alignContent: "start",
                      borderStyle: borderStyle,
                      textAlign: "left",
                    }}
                  >
                    <Col span={1}></Col>
                    <Row>
                      <Col span={24}>
                        <br />
                      </Col>
                    </Row>
                    <Row style={{ borderStyle: borderStyle }}>
                      <Col span={10} style={{ marginLeft: "6%" }}>
                        Order Date:
                      </Col>
                      <Col span={10} style={{ textAlign: "center" }}>
                        {`${moment(new Date()).format("L")}`}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <br />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row
                  style={{
                    color: "black",
                    fontFamily: "Arial",
                  }}
                >
                  <Col
                    span={10}
                    style={{
                      borderStyle: "solid",
                      borderWidth: "thin",
                      marginLeft: "5%",
                      textAlign: "center",
                      borderColor: "black",
                      borderTop: "none",
                    }}
                  >
                    <Row
                      style={{
                        marginBottom: 20,
                        borderStyle: borderStyle,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          borderStyle: "solid",
                          borderWidth: "thin",
                          fontFamily: "Arial",
                          fontSize: 14,
                          borderColor: "black",
                          backgroundColor: "#EEECE1",
                          borderLeft: "none",
                          borderRight: "none",
                        }}
                      >
                        VENDOR
                      </Col>
                    </Row>
                    <Row style={{ borderStyle: borderStyle }}>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Name:
                      </Col>
                      <Col span={1}></Col>
                      <Col
                        span={17}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                          borderStyle: borderStyle,
                        }}
                      >
                        {/* <Select style={{width: 225}} onSelect={(e) => onVendorSelect(e)}>
                      {searchVendorsList()}
                    </Select> */}
                        <AutoComplete
                          showSearch
                          allowClear={true}
                          style={{
                            width: 200,
                            textAlign: "left",
                            color: "black",
                          }}
                          onBlur={(e) => onVendorBlur(e.target.value)}
                          onSelect={(e, object) => onVendorSelect(e, object)}
                          options={vendorOptions}
                          filterOption={(inputValue, option) =>
                            option.value
                              .toUpperCase()
                              .indexOf(inputValue.toUpperCase()) !== -1
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Address:
                      </Col>
                      <Col span={1}></Col>
                      <Col
                        span={17}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        {selectedVendor.location}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Tel:
                      </Col>
                      <Col span={1}></Col>
                      <Col
                        span={17}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        {selectedVendor.tel_no}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 30 }}>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Terms:
                      </Col>
                      <Col span={1}></Col>
                      <Col
                        span={17}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        {selectedVendor.terms}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1} style={{ borderStyle: borderStyle }} />
                  <Col
                    flex={11}
                    style={{
                      marginLeft: "1%",
                      borderStyle: "solid",
                      borderWidth: "thin",
                      borderColor: "black",
                      marginRight: "2%",
                      borderTop: "none",
                    }}
                  >
                    <Row
                      style={{
                        marginBottom: 20,
                        borderStyle: borderStyle,
                      }}
                    >
                      <Col
                        span={24}
                        style={{
                          borderStyle: "solid",
                          borderWidth: "thin",
                          fontFamily: "Arial",
                          fontSize: 14,
                          textAlign: "center",
                          borderColor: "black",
                          backgroundColor: "#EEECE1",
                          borderLeft: "none",
                          borderRight: "none",
                        }}
                      >
                        JOB ADDRESS
                      </Col>
                    </Row>
                    <Row style={{ borderStyle: borderStyle }}>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Req By:
                      </Col>
                      <Col
                        style={{
                          textAlign: "start",
                          marginLeft: "2.4%",
                        }}
                      >
                        {purchaseRequest.requested_by}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        span={5}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Project:
                      </Col>
                      <Col
                        style={{
                          textAlign: "start",
                          marginLeft: "2.4%",
                        }}
                      >
                        <Select
                          onSelect={(e) => setProject(e)}
                          style={{
                            width: 200,
                            fontSize: 14,
                          }}
                        >
                          {searchProjectsList()}
                        </Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        span={6}
                        style={{
                          textAlign: "start",
                          marginLeft: 5,
                        }}
                      >
                        Category:
                      </Col>
                      <Col
                        style={{
                          textAlign: "start",
                          marginLeft: "2.4%",
                        }}
                      ></Col>
                    </Row>
                  </Col>
                  <Col span={1} style={{ marginRight: 10 }}></Col>
                </Row>

                <Row
                  style={{
                    marginTop: 20,
                    fontFamily: "Arial",
                    color: "black",
                  }}
                >
                  <Col
                    span={24}
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                    }}
                  >
                    PLEASE SUPPLY THE FOLLOWING:
                  </Col>
                </Row>

                <Row
                  style={{
                    marginTop: "1%",
                    fontFamily: "Arial",
                    color: "black",
                    borderTop: "solid",
                    marginLeft: "5%",
                    marginRight: "7%",
                    borderBottom: "solid",
                    borderWidth: "thin",
                    height: "70px",
                  }}
                >
                  <Col span={1} style={{ borderStyle: borderStyle }}></Col>
                  <Col
                    span={20}
                    style={{
                      borderStyle: borderStyle,
                    }}
                  >
                    <Row style={{ marginTop: "3%" }}>
                      <Col span={1} style={{ borderStyle: borderStyle }}>
                        IT
                      </Col>
                      <Col
                        span={7}
                        style={{
                          borderStyle: borderStyle,
                          textAlign: "center",
                        }}
                      >
                        DESCRIPTION
                      </Col>
                      <Col span={2} style={{ borderStyle: borderStyle }}>
                        QTY
                      </Col>
                      <Col span={2} style={{ borderStyle: borderStyle }}>
                        UNIT
                      </Col>
                      <Col
                        span={3}
                        style={{
                          borderStyle: borderStyle,
                          textAlign: "center",
                        }}
                      >
                        UNIT PRICE
                      </Col>
                      <Col
                        span={4}
                        style={{
                          borderStyle: borderStyle,
                          textAlign: "right",
                        }}
                      >
                        TOTAL
                      </Col>
                      <Col
                        span={2}
                        style={{ textAlign: "center", marginLeft: 10 }}
                      >
                        CATEGORY
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1} style={{ borderStyle: borderStyle }}></Col>
                </Row>

                <Row
                  style={{
                    marginTop: "0.5%",
                    color: "black",
                    fontFamily: "Arial",
                  }}
                >
                  <Col span={1} style={{ borderStyle: borderStyle }}></Col>
                  <Col span={20} style={{ borderStyle: borderStyle }}>
                    {displayedOrders}
                    <Row
                      style={{
                        marginTop: "1%",
                        marginBottom: "20px",
                        color: "black",
                        fontFamily: "Arial",
                      }}
                    >
                      <Col span={20}></Col>
                      <Col span={2} style={{ textAlign: "center" }}>
                        ---
                      </Col>
                      <Col span={2}></Col>
                    </Row>
                  </Col>
                  <Col span={1} style={{ borderStyle: borderStyle }}></Col>
                </Row>

                <Row
                  style={{
                    marginTop: "2%",
                    marginBottom: "20px",
                    color: "black",
                    fontFamily: "Arial",
                  }}
                >
                  <Col span={16}></Col>
                  <Col
                    span={6}
                    style={{
                      borderTop: "solid",
                      borderWidth: "thin",
                      textAlign: "left",
                    }}
                  >
                    Total Amount{" "}
                    <b
                      style={{
                        fontSize: "10",
                        fontFamily: "Arial",
                        textAlign: "right",
                        marginLeft: "15%",
                      }}
                    >
                      {parseFloat(purchaseOrder.totalPrice)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </b>
                  </Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    marginLeft: "5%",
                    marginRight: "7%",
                    fontSize: "10",
                    color: "black",
                    marginBottom: 10,
                  }}
                >
                  <Col span={1} />
                  <Col span={2}>Notes:</Col>
                  <Col>
                    <Input
                      onChange={(e) => onNotesChange(e.target.value)}
                      style={{ width: 275 }}
                    />
                  </Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    fontSize: "10",
                    marginLeft: "5%",
                    color: "black",
                    marginRight: "7%",
                    marginBottom: 10,
                  }}
                >
                  <Col span={1} />
                  <Col>REMARKS:</Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    marginLeft: "5%",
                    marginRight: "7%",
                    marginBottom: 10,
                  }}
                >
                  <Col span={1} />
                  <Col>
                    If you have any questions about this purchase order, please
                    contact us. Thank you.
                  </Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    borderTop: "solid",
                    borderWidth: "thin",
                    marginLeft: "5%",
                    marginRight: "7%",
                    color: "black",
                  }}
                >
                  <Col span={1}></Col>
                  <Col span={20}>
                    <Row>
                      <Col span={4} style={{ textAlign: "left" }}>
                        Prepared by:
                      </Col>
                      <Col span={7}></Col>
                      <Col span={7} style={{ textAlign: "left" }}>
                        Approved by:
                      </Col>
                      <Col span={2} />
                      <Col span={4} style={{ textAlign: "left" }}>
                        Conformed by:
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1}></Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    color: "black",
                    textAlign: "center",
                    marginTop: "25px",
                    marginLeft: "5%",
                    marginRight: "7%",
                  }}
                >
                  <Col span={4}>Harold Flores</Col>
                  <Col span={4} />
                  <Col span={7}>MGT1/BMC/MGT3</Col>
                </Row>

                {/* <Row
                  style={{
                    fontFamily: "Arial",
                    textAlign: "center",
                    color: "black",
                    marginLeft: "5%",
                    marginRight: "7%",
                  }}
                >
                  <Col span={1}></Col>
                  <Col span={8}>(Signature over printed name)</Col>
                  <Col span={6}></Col>
                  <Col span={9}>(Print name & signature)</Col>
                </Row> */}

                <Row
                  style={{
                    fontFamily: "Arial",
                    color: "black",
                    marginLeft: "5%",
                    marginRight: "7%",
                  }}
                >
                  {/* <Col
                    span={1}
                    style={{
                      borderTop: "solid",
                      borderWidth: "thin",
                    }}
                  ></Col> */}
                  <Col
                    span={6}
                    style={{
                      fontWeight: "bold",
                      borderTop: "solid",
                      borderWidth: "thin",
                      textAlign: "left",
                    }}
                  >
                    On Point Construction
                  </Col>
                  <Col span={3} />
                  <Col
                    span={6}
                    style={{
                      fontWeight: "bold",
                      borderTop: "solid",
                      borderWidth: "thin",
                    }}
                  >
                    On Point Construction
                  </Col>
                  <Col span={3} />
                  <Col
                    span={6}
                    style={{
                      fontWeight: "bold",
                      borderTop: "solid",
                      borderWidth: "thin",
                    }}
                  >
                    Vendor
                  </Col>
                </Row>

                {/* <Row
                  style={{
                    fontFamily: "Arial",
                    color: "black",
                    textAlign: "center",
                    marginTop: "15px",
                    marginLeft: "5%",
                    marginRight: "7%",
                  }}
                >
                  <Col span={17}></Col>
                  <Col span={5}>RR Reference:</Col>
                </Row>

                <Row
                  style={{
                    fontFamily: "Arial",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  <Col span={15}></Col>
                  <Col span={7}>
                    <Row>
                      <Col span={6}>OR#:</Col>
                      <Col span={6}>RR#:</Col>
                      <Col span={6}>Date:</Col>
                      <Col span={6}>By:</Col>
                    </Row>
                  </Col>
                </Row> */}

                <Row style={{ marginTop: "30px" }}></Row>
              </div>
            </div>
            <Modal
              visible={newVendorModal}
              onCancel={onVendorCancel}
              onOk={createNewVendor}
              maskClosable={false}
              okText="Yes"
              cancelText="No"
              style={{ width: 500, marginTop: 300 }}
            >
              Vendor not found. Create New Vendor?
            </Modal>

            <Modal
              title="Add Vendor"
              maskClosable={false}
              visible={newVendorForm}
              onOk={vendorFormSubmit}
              onCancel={vendorFormCancel}
              width={600}
              okText="Add"
              cancelText="Cancel"
            >
              <VendorList
                reference={formRef}
                onSubmit={onVendorSubmit}
                initName={vendorName}
              />
            </Modal>

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
              <Row
                style={{
                  color: "black",
                  marginLeft: 10,
                  marginTop: -10,
                }}
              >
                <Form form={selectedForm}>
                  {transferParams.selectedKeys.map((selectedKey) => {
                    const {
                      quantity_left,
                    } = transferParams.ordersInTransfer.find(
                      (data) => data.key === selectedKey
                    );
                    return (
                      <Row key={selectedKey}>
                        <div>
                          <Form.Item
                            label="Quantity"
                            name={`${selectedKey}quantityLeft`}
                            style={{ marginLeft: 10 }}
                            rules={[
                              {
                                validator: (_, value) =>
                                  value <= quantity_left || value === undefined
                                    ? Promise.resolve()
                                    : Promise.reject(
                                      `Should not exceed ${quantity_left}`
                                    ),
                              },
                            ]}
                          >
                            <InputNumber
                              placeholder={quantity_left}
                              style={{
                                width: 100,
                                border: "1px solid black",
                              }}
                              allowClear
                            // placeholder={}
                            />
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            zIndex: 500,
                            marginLeft: 180,
                            position: "absolute",
                          }}
                        >
                          <Form.Item
                            label="Price"
                            name={`${selectedKey}price`}
                            style={{ marginLeft: 10 }}
                            rules={[
                              {
                                type: "number",
                                message: "Must be a number!",
                              },
                              {
                                required: true,
                                message: "Price is required!",
                              },
                            ]}
                          >
                            <InputNumber
                              placeholder=""
                              style={{
                                width: 120,
                                border: "1px solid black",
                              }}
                              allowClear
                            />
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            zIndex: 500,
                            marginLeft: 180,
                            position: "flex",
                          }}
                        >
                          <Form.Item
                            label="Category"
                            name={`${selectedKey}category`}
                            style={{ marginLeft: 10 }}
                            rules={[
                              {
                                required: true,
                                message: "Category is required!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Category"
                              style={{
                                width: 120,
                                border: "1px solid black",
                              }}
                              allowClear
                            >
                              {showedCategories()}
                            </Select>
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            zIndex: 500,
                            marginTop: 3,
                            marginLeft: 580,
                            fontSize: 15,
                            color: "black",
                          }}
                        >
                          {`for ${selectedKey}.`}
                        </div>
                      </Row>
                    );
                  })}
                </Form>
              </Row>
            </Modal>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <Button
                size="large"
                style={{
                  marginRight: 20,
                  marginTop: -50,
                  marginBottom: 20,
                  backgroundColor: "#13407F",
                  color: "white",
                  fontSize: 30,
                  height: 75,
                }}
                onClick={proceedClick}
              >
                {" "}
                Proceed{" "}
              </Button>
              <Modal
                visible={myDocumentVisible}
                title="Proceed?"
                maskClosable={false}
                onCancel={noClick}
                okButtonProps={{ visible: false, disabled: true }}
                onOk={onProceed}
              >
                {/* <PDFViewer style={{ height: "100%" }}>
                  {printDocument}
                </PDFViewer> */}
                <PDFDownloadLink
                  fileName={purchaseOrder.purchaseOrderNo}
                  document={printDocument}
                >
                  {({ blob, url, loading, error }) => (loading ? 'Preparing document...' : <Button style={{
                    backgroundColor: "#13407F",
                    color: "white",
                  }} onClick={onProceed}>Download & Save</Button>)}
                </PDFDownloadLink>
              </Modal>
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
});

export default AddPurchaseOrder;
