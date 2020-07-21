import * as actions from '../ActionTypes';

const initialState = {
    products: [],
    purchaseRequests: [],
    purchaseRequestCount: 0,
    purchaseRequestData: {orders: {items: []}},
    subscriptions: []
};

const purchaseRequestReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SET_PRODUCTS:
        return {
            ...state,
            products: action.data
        };
    case actions.SET_PURCHASEREQUESTS:
        return {
            ...state,
            purchaseRequests: action.data
        };
    case actions.SET_PURCHASEREQUESTSCOUNT:
        return {
            ...state,
            purchaseRequestCount: action.data
        };
    case actions.SET_PURCHASEREQUESTDATA:
        return {
            ...state,
            purchaseRequestData: action.data
        };
    case action.SET_PURCHASEREQUESTSUBSCRIPTIONS:
        return {
            ...state,
            subscriptions: action.data
        };
    default:
        return state;
    }
};

export default purchaseRequestReducer;
