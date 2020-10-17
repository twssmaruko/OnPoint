import * as actions from '../ActionTypes';
import {updateObject} from '../../utility';

const initialState = {
  products: [],
  subscriptions: [],
  loading: false
};

const setProducts = (state, action) => updateObject(state, {products: action.data})

const setSubscriptions = (state, action) => updateObject(state, {subscriptions: action.data})

const addProductStart = (state) => updateObject(state, {loading: true})

const addProductFail = (state) => updateObject(state, {loading: false})

const addProductSuccess = (state, action) => {
  const newProduct = updateObject(action.productData, {id: action.productId});
  return updateObject(state, {
    loading: false,
    products: state.products.concat(newProduct)
  });
}

const fetchProductsStart = (state) => updateObject(state, {loading: true})
const fetchProductsSuccess = (state, action) => updateObject(state, {
  products: action.products,
  loading: false
})
const fetchProductsFail = (state) => updateObject(state, {loading: false})

const removeProductStart = (state) => updateObject(state, {loading: true})

const removeProductFail = (state) => updateObject(state, {loading: false})

const removeProductSuccess = (state, action) => {
  const newProducts = updateObject(action.productData, {id: action.productId})
  const stateProducts = state.products
  for (const id in state.products) {
    if (stateProducts[id].id === newProducts.id) {
      stateProducts.splice(id, 1);
      break;
    }
  }
  return updateObject(state, {
    loading: false,
    products: stateProducts.concat()
  })
}

const editProductStart = (state) => updateObject(state, {loading: true})

const editProductSuccess = (state, action) => {
  const newProducts = updateObject(action.productData, {id: action.productId})
  const stateProducts = state.products;
  for (const id in state.products) {
    if (stateProducts[id].id === newProducts.id) {
      stateProducts[id] = newProducts
      break;
    }
  }
  return updateObject(state, {
    loading: false,
    products: stateProducts.concat()
  })
}
const editProductFail = (state) => updateObject(state, {loading: false})

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_PRODUCTS: return setProducts(state, action)
  case actions.SET_SUBSCRIPTIONS: return setSubscriptions(state, action)
  case actions.ADD_PRODUCT_START: return addProductStart(state)
  case actions.ADD_PRODUCT_FAIL: return addProductFail(state)
  case actions.ADD_PRODUCT_SUCCESS: return addProductSuccess(state, action)
  case actions.FETCH_PRODUCTS_START: return fetchProductsStart(state)
  case actions.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state, action)
  case actions.FETCH_PRODUCTS_FAIL: return fetchProductsFail(state)
  case actions.REMOVE_PRODUCT_START: return removeProductStart(state)
  case actions.REMOVE_PRODUCT_FAIL: return removeProductFail(state)
  case actions.REMOVE_PRODUCT_SUCCESS: return removeProductSuccess(state, action)
  case actions.EDIT_PRODUCT_START: return editProductStart(state)
  case actions.EDIT_PRODUCT_SUCCESS: return editProductSuccess(state, action)
  case actions.EDIT_PRODUCT_FAIL: return editProductFail(state)
  default: return state;
  }
};

export default productsReducer;