import * as actions from '../ActionTypes';

const initialState = {
  purchaseRequests: [],
  vendors: [],
  purchaseRequest: {
    orders: {
      items: []
    }
  }
};

const purchaseOrderReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_PURCHASEREQUESTSINPURCHASEORDER:
    return {
      ...state,
      purchaseRequests: action.data
    };
  case actions.SET_PURCHASEREQUESTINPURCHASEORDER:
    return {
      ...state,
      purchaseRequest: action.data
    };
  case actions.SET_VENDORSINPURCHASEORDER:
    return {
      ...state,
      vendors: action.data
    };
  default:
    return state;
  }
};

export default purchaseOrderReducer;
