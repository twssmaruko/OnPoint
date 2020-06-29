import * as actionTypes from './actionTypes';
import { updateObject } from '../utility';

const initialState = {
  vendors: [],
  // eslint-disable-next-line comma-dangle
  loading: false
};

// eslint-disable-next-line no-unused-vars
const fetchVendorsStart = (state, action) => updateObject(state, { loading: true });

const fetchVendorsSuccess = (state, action) => updateObject(state, {
  vendors: action.vendors,
  // eslint-disable-next-line comma-dangle
  loading: false
});

// eslint-disable-next-line no-unused-vars
const fetchVendorsFail = (state, action) => updateObject(state, {
  // eslint-disable-next-line comma-dangle
  loading: false
});

// eslint-disable-next-line no-unused-vars
const newVendorStart = (state, action) => updateObject(state, { loading: false });

const newVendorSuccess = (state, action) => {
  const newVendor = updateObject(action.vendorData, { id: action.vendorId });
  return updateObject(state, {
    loading: false,
    vendors: state.vendors.concat(newVendor),
  });
};

// eslint-disable-next-line no-unused-vars
const newVendorFail = (state, action) => updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VENDORS_START: return fetchVendorsStart(state, action);
    case actionTypes.FETCH_VENDORS_SUCCESS: return fetchVendorsSuccess(state, action);
    case actionTypes.FETCH_VENDORS_FAIL: return fetchVendorsFail(state, action);
    case actionTypes.NEW_VENDOR_START: return newVendorStart(state, action);
    case actionTypes.NEW_VENDOR_SUCCESS: return newVendorSuccess(state, action);
    case actionTypes.NEW_VENDOR_FAIL: return newVendorFail(state, action);
    default: return state;
  }
};

export default reducer;
