import * as actions from '../ActionTypes';
import {updateObject} from '../../utility';

const initialState = {
  purchaseRequests: [],
  vendors: [],
  projects: [],
  project: {},
  ordersReceived: [],
  purchaseOrderId: 0,
  purchaseOrders: [],
  purchaseRequest: {
    orders: [
      {
        product: []
      }
    ]
  }
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
  {purchaseOrders: action.data});

const setOrdersReceived = (state, action) => updateObject(state,
  {ordersReceived: action.data})

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
  default:
    return state;
  }
};

export default purchaseOrderReducer;
