/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

// jtaw import code
import {API, graphqlOperation} from 'aws-amplify';
import {createVendor} from '../../../graphql/mutations';
import {listVendors} from '../../../graphql/queries';

import * as actionTypes from '../actionTypes';
// import axios from '../../../axios-orders';

export const fetchVendorsStart = () => ({
  type: actionTypes.FETCH_VENDORS_START
});

export const fetchVendorsSuccess = (vendors) => ({
  type: actionTypes.FETCH_VENDORS_SUCCESS,
  vendors
});

export const fetchVendorsFail = (error) => ({
  type: actionTypes.FETCH_VENDORS_FAIL,
  error
});

export const fetchVendors = () => async (dispatch) => {
  // marco code
  // dispatch(fetchVendorsStart());
  // axios.get('/vendors.json')
  //   .then((res) => {
  //     const fetchedVendors = [];
  //     for (const key in res.data) {
  //       fetchedVendors.push({
  //         ...res.data[key],
  //         id: key,
  //       });
  //     }
  //     // eslint-disable-next-line no-console
  //     console.log(fetchedVendors);
  //     dispatch(fetchVendorsSuccess(fetchedVendors));
  //   })
  //   .catch((err) => {
  //     dispatch(fetchVendorsFail(err));
  //   });

  // Jtaw code
  try {
    dispatch(fetchVendorsStart());
    const queryData = await API.graphql(graphqlOperation(listVendors));
    const fetchedVendors = queryData.data.listVendors.items;
    dispatch(fetchVendorsSuccess(fetchedVendors));
  } catch (e) {
    console.error(e)
    dispatch(fetchVendorsFail(e));
  }
};

export const newVendorStart = () => ({
  type: actionTypes.NEW_VENDOR_START
});

export const newVendorSuccess = (id, vendorData) => ({
  type: actionTypes.NEW_VENDOR_SUCCESS,
  vendorId: id,
  vendorData
});

export const newVendorFail = (error) => ({
  type: actionTypes.NEW_VENDOR_FAIL,
  error
});

export const newVendor = (vendorData) => async (dispatch) => {
  // Marco Code
  // dispatch(newVendorStart());
  // axios.post('/vendors.json', vendorData)
  //   .then((response) => {
  //     // eslint-disable-next-line no-console
  //     console.log(response.data);
  //     dispatch(newVendorSuccess(response.data.name, vendorData));
  //   })
  //   .catch((error) => {
  //     dispatch(newVendorFail(error));
  //   });

  // Jtaw Code
  try {
    const queryData = await API.graphql(graphqlOperation(createVendor, {input: vendorData}));
    const newVendorData = queryData.data.createVendor;
    dispatch(newVendorSuccess(newVendorData.id, newVendorData));
  } catch (e) {
    console.error(e)
    dispatch(newVendorFail(e));
  }
};
