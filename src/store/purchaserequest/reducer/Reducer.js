import * as actions from '../ActionTypes';
import {updateObject} from '../../utility';

const initialState = {
  products: [],
  purchaseRequests: [],
  purchaseRequestsPending: [],
  purchaseRequestCount: 0,
  purchaseRequestIds: 0,
  purchaseRequestData: {orders: {items: []}},
  subscriptions: [],
  loading: false
};

const setProducts = (state, action) => updateObject(state, {
  products: action.data
})

const setPurchaseRequests = (state, action) =>
  updateObject(state, {
    purchaseRequests: action.data
  })


const setPurchaseRequestCount = (state, action) =>
  updateObject(state, {purchaseRequestCount: action.data})

const setPurchaseRequestData =  (state, action) => updateObject(state, {
  purchaseRequestData: action.data
})

const setPurchaseRequestSubscriptions = (state, action) =>
  updateObject(state, {
    subscriptions: action.data
  })


const addPurchaseRequestStart = (state) =>
  updateObject(state, {
    loading: true
  })

const addPurchaseRequestFail = (state) =>
  updateObject(state, {
    loading: false
  })

const addPurchaseRequestSuccess = (state, action) => {
  const newPurchaseRequest = updateObject(action.purchaseRequestData,
    {id: action.purchaseRequestId});
  const newCount = state.purchaseRequestCount + 1;
  return updateObject(state, {
    loading: false,
    purchaseRequestCount: newCount,
    purchaseRequests: state.purchaseRequests.concat(newPurchaseRequest),
    purchaseRequestsPending: state.purchaseRequestsPending.concat(newPurchaseRequest)
  })
}

const fetchPurchaseRequestsStart = (state) => updateObject(state, {loading: true})
const fetchPurchaseRequestsSuccess = (state, action) => updateObject(state,
  {loading: false,
    purchaseRequests: action.purchaseRequests,
    purchaseRequestsPending: action.purchaseRequestsPending,
    purchaseRequestCount: action.purchaseRequests.length});

const fetchPurchaseRequestsFail = (state) => updateObject(state, {loading: false})

const updatePurchaseRequestStart = (state) => updateObject(state, {loading: true})

const updatePurchaseRequestSuccess = (state, action) => {
  const fetchedPurchaseRequest = updateObject(action.purchaseRequestData,
    {id: action.purchaseRequestId});
  const statePurchaseRequests = state.purchaseRequests;

  for (const id in state.purchaseRequests) {
    if (statePurchaseRequests[id].id === fetchedPurchaseRequest.id) {
      statePurchaseRequests[id] = fetchedPurchaseRequest;
      break;
    }
  }
  return updateObject(state, {
    loading: false,
    purchaseRequests: statePurchaseRequests.concat()
  })
}

const updatePurchaseRequestFail = (state) => updateObject(state, {loading: false})

const updatePurchaseRequestIdInStore = (state, action) => {
  const {purchaseRequestId} = action;
  return updateObject(state, {purchaseRequestIds: purchaseRequestId})
};

const updatePurchaseRequestNumber = (state, action) =>
  updateObject(state, {purchaseRequestIds: action.data});

  const deletePurchaseRequest = (state, action) => {
    const newPurchaseRequests = updateObject(action.data, {id: action.id})
    const statePurchaseRequests = state.purchaseRequests;
    for (const id in state.purchaseRequests) {
      if (statePurchaseRequests[id].id === newPurchaseRequests.id) {
        statePurchaseRequests.splice(id, 1);
        break;
      }
    }
    return updateObject(state, {
      purchaseRequests: statePurchaseRequests.concat()
    })
  }



const purchaseRequestReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_PRODUCTS: return setProducts(state, action)
  case actions.SET_PURCHASEREQUESTS: return setPurchaseRequests(state, action)
  case actions.SET_PURCHASEREQUESTSCOUNT: return setPurchaseRequestCount(state, action)
  case actions.SET_PURCHASEREQUESTDATA: return setPurchaseRequestData(state, action)
  case action.SET_PURCHASEREQUESTSUBSCRIPTIONS:
    return setPurchaseRequestSubscriptions(state, action)
  case actions.ADD_PURCHASEREQUEST_START: return addPurchaseRequestStart(state)
  case actions.ADD_PURCHASEREQUEST_FAIL: return addPurchaseRequestFail(state)
  case actions.ADD_PURCHASEREQUEST_SUCCESS: return addPurchaseRequestSuccess(state, action)
  case actions.FETCH_PURCHASEREQUESTS_START: return fetchPurchaseRequestsStart(state)
  case actions.FETCH_PURCHASEREQUESTS_SUCCESS: return fetchPurchaseRequestsSuccess(state, action)
  case actions.FETCH_PURCHASEREQUESTS_FAIL: return fetchPurchaseRequestsFail(state)
  case actions.UPDATE_PURCHASEREQUEST_START: return updatePurchaseRequestStart(state)
  case actions.UPDATE_PURCHASEREQUEST_SUCCESS: return updatePurchaseRequestSuccess(state, action)
  case actions.UPDATE_PURCHASEREQUEST_FAIL: return updatePurchaseRequestFail(state)
  case actions.UPDATE_PURCHASEREQUEST_NUMBER: return updatePurchaseRequestNumber(state, action)
  case actions.DELETE_PURCHASEREQUEST: return deletePurchaseRequest(state, action)
  case actions.UPDATE_PURCHASEREQUESTID_IN_STORE:
    return updatePurchaseRequestIdInStore(state, action)
  default:
    return state;
  }
};

export default purchaseRequestReducer;
