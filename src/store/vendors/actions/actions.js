/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

// jtaw import code
// import {API, graphqlOperation} from 'aws-amplify';
// import {createVendor} from '../../../graphql/mutations';
// import {listVendors} from '../../../graphql/queries';

import * as actionTypes from '../actionTypes';
import axios from '../../../axios-orders';
import {message} from 'antd';
import OPC from '../../../api/OPC';
import { setShowSpin1 } from '../../ui/actions/Actions';

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

const fetchVendorToStore = (data) => ({
  type: actionTypes.FETCH_VENDOR,
  data
})

export const fetchVendors = () => async(dispatch) => {
  try {
    //const body = {vendors};
    // const response = await fetch('http://localhost:5000/vendors');
    // const jsonData = await response.json();
    const response = await OPC.get('/vendors');
    const fetchedVendors = [];
    for(const key in response.data) {
      fetchedVendors.push({
        ...response.data[key],
      })
    }
   dispatch(fetchVendorsSuccess(fetchedVendors));
  } catch (err) {
    console.error(err.message);
  }
};

export const newVendorStart = () => ({
  type: actionTypes.NEW_VENDOR_START
});

export const newVendorSuccess = (data) => ({
  type: actionTypes.NEW_VENDOR_SUCCESS,
  data
});

export const newVendorFail = (error) => ({
  type: actionTypes.NEW_VENDOR_FAIL,
  error
});

export const deleteVendor = (id) => async (dispatch) => {
  
  try {
    // const deleteVendor = await fetch(`http://localhost:5000/vendors/${id}`, {
    //   method: 'DELETE'
    // });
    const response = await OPC.delete('/vendors/' + id)
    message.success('Vendor deleted');
    dispatch(fetchVendors());
  } catch (err) {
    console.error(err.message);
  }
  // const newURL = 'vendors/'+ vendorId + '.json';

  //   try{
      
  //     await axios.delete(newURL);
  //     dispatch(fetchVendors());
  //     message.success('Vendor removed');


  //   }catch(error) {
  //     message.error('unable to delete Vendor');
  //     console.error(error);
  //   }

}

export const newVendor = (vendorData) => async (dispatch) => {
  dispatch(setShowSpin1(true));
  
  try {
    // const response = await fetch('http://localhost:5000/vendors', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(body)
    // });
    const response = await OPC.post('/vendors/', vendorData);
    dispatch(setShowSpin1(false));
    message.success('Vendor Created');
    dispatch(fetchVendors());
    
  } catch (err) {
    console.error(err.message);
  }
  // Marco Code
  // return dispatch => {
  //   dispatch(newVendorStart());
  //   axios.post('/vendors.json', vendorData)
  //     .then((response) => {
  //     // eslint-disable-next-line no-console
  //       console.log(response.data);
  //       dispatch(newVendorSuccess(response.data.name, vendorData));
  //       console.log('SUCCESS!');
  //     })
  //     .catch((error) => {
  //       dispatch(newVendorFail(error));
  //     });
  // }
  // Jtaw Code
  // try {
  //   const queryData = await API.graphql(graphqlOperation(createVendor, {input: vendorData}));
  //   const newVendorData = queryData.data.createVendor;
  //   dispatch(newVendorSuccess(newVendorData.id, newVendorData));
  // } catch (e) {
  //   console.error(e)
  //   dispatch(newVendorFail(e));
  // }
};

export const editVendor = (vendorData, id) => async(dispatch) => {
  dispatch(setShowSpin1(true));
  console.log(id);
  try {
    const response = await OPC.put('/vendors/' + id, vendorData);
    dispatch(setShowSpin1(false));
    dispatch(fetchVendors());
  } catch (err) {
    dispatch(setShowSpin1(false));
    console.error(err.message);
    
  }
}

export const fetchVendor = (vendorId) => async (dispatch) => {
  dispatch(setShowSpin1(true))
  try {
    const response = await OPC.get('/vendors/' + vendorId);
    dispatch(fetchVendorToStore(response.data[0]));
  } catch (err) {
    console.error(err.message);
  }
}
