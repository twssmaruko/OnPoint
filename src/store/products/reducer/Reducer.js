import * as actions from '../ActionTypes';

const initialState = {
  products: [],
  subscriptions: []
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_PRODUCTS:
    return {
      ...state,
      products: action.data
    };
  case actions.SET_SUBSCRIPTIONS:
    return {
      ...state,
      subscriptions: action.data
    };
  default:
    return state;
  }
};

export default productsReducer;
