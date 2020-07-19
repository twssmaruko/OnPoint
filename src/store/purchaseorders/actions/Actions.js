import { API, graphqlOperation } from 'aws-amplify';
import { message } from 'antd';
import {
  searchPurchaseRequests,
  getPurchaseRequest,
  searchVendors,
} from '../../../graphql/queries';
import { setShowSpin1, setShowSpin2 } from '../../ui/actions/Actions';
import * as actionTypes from '../ActionTypes';

export const setPurchaseRequests = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTSINPURCHASEORDER,
  data,
});

export const setPurchaseRequest = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTINPURCHASEORDER,
  data,
});

export const setVendors = (data) => ({
  type: actionTypes.SET_VENDORSINPURCHASEORDER,
  data,
});

export const getPurchaseRequests = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin1(true));
    const queryData = await API.graphql(graphqlOperation(searchPurchaseRequests, {
      filter:
          {
            purchaseRequestNo:
              {
                matchPhrasePrefix: data,
              },
          },
      limit: 5,
    }));
    const purchaseRequests = queryData.data.searchPurchaseRequests.items;
    dispatch(setPurchaseRequests(purchaseRequests));
    dispatch(setShowSpin1(false));
  } catch (e) {
    dispatch(setShowSpin1(false));
    message.error('Error getting products');
    throw new Error(e);
  }
};

export const getVendors = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin2(true));
    const queryData = await API.graphql(graphqlOperation(searchVendors, {
      filter:
          {
            vendorName:
              {
                matchPhrasePrefix: data,
              },
          },
      limit: 5,
    }));
    const vendors = queryData.data.searchVendors.items;
    dispatch(setVendors(vendors));
    dispatch(setShowSpin2(false));
  } catch (e) {
    dispatch(setShowSpin2(false));
    message.error('Error getting products');
    throw new Error(e);
  }
};

export const getPurchestRequestData = (data) => async (dispatch) => {
  try {
    const queryData = await API.graphql(graphqlOperation(getPurchaseRequest, { id: data }));
    const purchaseRequestData = queryData.data.getPurchaseRequest;
    dispatch(setPurchaseRequest(purchaseRequestData));
  } catch (e) {
    console.log(e);
    message.error('Cannot get Purchase Request data.');
  }
};
