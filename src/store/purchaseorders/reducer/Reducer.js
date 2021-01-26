import * as actions from '../ActionTypes';
import {updateObject} from '../../utility';

const initialState = {
  loading: false,
  purchaseRequests: [],
  vendors: [],
  vendor: {},
  projects: [],
  project: {},
  samplePO: [],
  totalPrice: 5,
  purchaseOrder: {requestedBy: 'Engr. Jojo Salamanes',
    project: '',
    vendor: '',
    status: 'pending',
    purchaseOrderNo: 0,
    purchaseRequest: {},
    addNotes: '',
    purchaseRequestNo: '',
    notes: '',
    orders: [
      {
        product: '',
        quantity: 0,
        unit: '',
        unitPrice: 0,
        category: ''
      }
    ],
    totalPrice: 0
  },
  ordersReceived: [],
  purchaseOrderId: 0,
  purchaseOrders: [],
  purchaseOrdersPending: [],
  purchaseRequest: 0
};

const setPurchaseRequestsInPurchaseOrder = (state, action) => updateObject(state,
  {purchaseRequests: action.data});

const setPurchaseRequestInPurchaseOrder = (state, action) => updateObject(state,
  {purchaseRequest: action.data});

const setVendorsInPurchaseOrder = (state, action) => updateObject(state,
  {vendors: action.data});

const setProjectsInPurchaseOrder = (state, action) =>  updateObject(state,
  {projects: action.projectData})

const fetchPurchaseOrderId = (state, action) =>  updateObject(state,
  {purchaseOrderId: action.data})

const fetchProject = (state, action) => updateObject(state, {project: action.data});

const fetchPurchaseOrders = (state, action) => updateObject(state,
  {purchaseOrders: action.purchaseOrders,
    purchaseOrdersPending: action.purchaseOrdersPending});

const setOrdersReceived = (state, action) => updateObject(state,
  {ordersReceived: action.data})

const setVendor = (state, action) => updateObject(state,
  {vendor: action.data})

const setTotalPrice = (state, action) => updateObject(state, {
  totalPrice: action.data})

const setPurchaseOrder = (state, action) => updateObject(state, {
  purchaseOrder: action.data
})

const setLoading = (state, action) => updateObject(state, {
  loading: action.data
})

const setSamplePurchaseOrder = (state, action) => updateObject(state, {
  samplePO: action.data
})

const purchaseOrderReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_PURCHASEREQUESTSINPURCHASEORDER:
    return setPurchaseRequestsInPurchaseOrder(state, action)
  case actions.SET_PURCHASEREQUESTINPURCHASEORDER:
    return setPurchaseRequestInPurchaseOrder(state, action)
  case actions.SET_VENDORSINPURCHASEORDER:
    return setVendorsInPurchaseOrder(state, action)
  case actions.SET_PROJECTSINPURCHASEORDER:
    return setProjectsInPurchaseOrder(state, action)
  case actions.FETCH_PURCHASEORDER_ID: return fetchPurchaseOrderId(state, action)
  case actions.FETCH_PROJECT: return fetchProject(state, action);
  case actions.FETCH_PURCHASEORDERS: return fetchPurchaseOrders(state, action);
  case actions.SET_ORDERS_RECEIEVED: return setOrdersReceived(state, action);
  case actions.SET_VENDOR: return setVendor(state, action)
  case actions.SET_TOTALPRICE: return setTotalPrice(state, action);
  case actions.SET_PURCHASEORDER: return setPurchaseOrder(state, action);
  case actions.SET_LOADING: return setLoading(state, action);
  case actions.SET_SAMPLE_PURCHASEORDER: return setSamplePurchaseOrder(state, action);
  default:
    return state;
  }
};

export default purchaseOrderReducer;
