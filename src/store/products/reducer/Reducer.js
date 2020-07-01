import * as actions from '../ActionTypes';

const initialState = {
  products: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PRODUCTS:
      return {
        ...state,
        products: action.data,
      };
    default:
      return state;
  }
};

export default productsReducer;
