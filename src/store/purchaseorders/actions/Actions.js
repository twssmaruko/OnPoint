import {API, graphqlOperation} from 'aws-amplify';
import {message} from 'antd';
import {
  searchPurchaseRequests,
  getPurchaseRequest,
  searchVendors
} from '../../../graphql/queries';
import {setShowSpin1, setShowSpin2} from '../../ui/actions/Actions';
import * as actionTypes from '../ActionTypes';

export const setPurchaseRequests = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTSINPURCHASEORDER,
  data
});

export const setPurchaseRequest = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTINPURCHASEORDER,
  data
});

export const setVendors = (data) => ({
  type: actionTypes.SET_VENDORSINPURCHASEORDER,
  data
});

export const getPurchaseRequests = (data) => async (dispatch) => {
  try {
    if (data) {
      dispatch(setShowSpin1(true));
      const queryData = await API.graphql(graphqlOperation(searchPurchaseRequests, {
        filter:
          {
            purchaseRequestNo:
              {
                matchPhrasePrefix: data
              }
          },
        limit: 5
      }));
      const purchaseRequests = queryData.data.searchPurchaseRequests.items;
      if (purchaseRequests.length) {
        dispatch(setPurchaseRequests(purchaseRequests));
        dispatch(setShowSpin1(false));
      }
    }

  } catch (e) {
    console.error(e)
    dispatch(setShowSpin1(false));
    message.error('Error getting Purchase Request!');
  }
};

export const getVendors = (data) => async (dispatch) => {
  try {
    if (data) {
      dispatch(setShowSpin2(true));
      const queryData = await API.graphql(graphqlOperation(searchVendors, {
        filter:
            {
              vendorName:
                {
                  matchPhrasePrefix: data
                }
            },
        limit: 5
      }));
      const vendors = queryData.data.searchVendors.items;
      if (vendors.length) {
        dispatch(setVendors(vendors));
        dispatch(setShowSpin2(false));
      }
    }



  } catch (e) {
    console.error(e)
    dispatch(setShowSpin2(false));
    message.error('Error getting products');
  }
};

export const getPurchestRequestData = (data) => async (dispatch) => {
  try {
    const queryData = await API.graphql(graphqlOperation(getPurchaseRequest, {id: data}));
    const purchaseRequestData = queryData.data.getPurchaseRequest;
    dispatch(setPurchaseRequest(purchaseRequestData));
  } catch (e) {
    console.error(e);
    message.error('Cannot get Purchase Request data.');
  }
};
