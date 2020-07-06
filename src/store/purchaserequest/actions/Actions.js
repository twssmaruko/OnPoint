import { message } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import _ from 'lodash';
import {
  searchProducts,
  getPurchaseRequest,
  purchaseRequestDayCreatedAt,
  purchaseRequestMonthCreatedAt,
  purchaseRequestStatusCreatedAt,
  purchaseRequestIsApprovedCreatedAt,
  purchaseRequestStatusIsApprovedCreatedAt,
  purchaseRequestStatusMonthYearCreatedAt,
  purchaseRequestIsApprovedMonthYearCreatedAt,
  purchaseRequestStatusDayMonthYearCreatedAt,
  purchaseRequestIsApprovedDayMonthYearcreatedAt,
  purchaseRequestStatusIsApprovedMonthYear,
  purchaseRequestStatusIsApprovedDayMonthYear,
} from '../../../graphql/queries'; import * as actionTypes from '../ActionTypes';
import {
  setShowSpin, setModalSpin, setOpenModal, setOpenAnotherModal, setTableSpin,
} from '../../ui/actions/Actions';
import {
  createPurchaseRequest,
  createOrder,
  updatePurchaseRequest,
} from '../../../graphql/mutations';

import {
  onCreatePurchaseRequest,
  onUpdatePurchaseRequest,
} from '../../../graphql/subscriptions';

export const setProducts = (data) => ({
  type: actionTypes.SET_PRODUCTS,
  data,
});

export const setPurchaseRequests = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTS,
  data,
});

export const setPurchaseRequestData = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTDATA,
  data,
});

export const setPurchaseRequestCount = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTSCOUNT,
  data,
});

export const setSubscriptions = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTSUBSCRIPTIONS,
  data,
});

export const getProducts = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin(true));
    const queryData = await API.graphql(graphqlOperation(searchProducts, {
      filter:
        {
          name:
            {
              matchPhrasePrefix: data,
            },
        },
      limit: 5,
    }));
    const itemsInProducts = queryData.data.searchProducts.items;
    dispatch(setProducts(itemsInProducts));
    dispatch(setShowSpin(false));
  } catch (e) {
    dispatch(setShowSpin(false));
    message.error('Error getting products');
    throw new Error(e);
  }
};

export const invokeUpdatePurchaseRequest = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin(true));
    await API.graphql(graphqlOperation(updatePurchaseRequest, { input: data }));
    dispatch(setShowSpin(false));
    dispatch(setOpenAnotherModal(false));
    message.success('Updated Successfully!');
  } catch (e) {
    message.error('Error updating purchase request');
  }
};

export const initiateUpdateModal = (data) => async (dispatch) => {
  try {
    const queryData = await API.graphql(graphqlOperation(getPurchaseRequest, {
      id: data,
    }));
    const purchaseRequestData = queryData.data.getPurchaseRequest;
    await dispatch(setPurchaseRequestData(purchaseRequestData));
    dispatch(setOpenAnotherModal(true));
  } catch (e) {
    message.error('Error getting Purchase Request data!');
  }
};

export const getMonthlyPurchaseRequests = () => async (dispatch) => {
  try {
    const queryData = await API.graphql(graphqlOperation(purchaseRequestMonthCreatedAt, {
      monthYear: moment(new Date()).format('MM-YYYY'),
      sortDirection: 'DESC',
    }));
    const { items } = queryData.data.purchaseRequestMonthCreatedAt;
    if (items.length) {
      dispatch(setPurchaseRequestCount(items[0].count));
      dispatch(setPurchaseRequests(items));
    }
  } catch (e) {
    message.error('Cannot get latest List of  Purchase Requests');
  }
};

export const getPurchaseRequests = (params) => async (dispatch) => {
  try {
    dispatch(setTableSpin(true));
    const paramKey = Object.keys(params);
    const checkParams = [
      _.isEmpty(_.xor(['dayMonthYear'], paramKey)),
      _.isEmpty(_.xor(['monthYear'], paramKey)),
      _.isEmpty(_.xor(['status'], paramKey)),
      _.isEmpty(_.xor(['isApproved'], paramKey)),
      _.isEmpty(_.xor(['status', 'isApproved'], paramKey)),
      _.isEmpty(_.xor(['status', 'monthYear'], paramKey)),
      _.isEmpty(_.xor(['isApproved', 'monthYear'], paramKey)),
      _.isEmpty(_.xor(['status', 'dayMonthYear'], paramKey)),
      _.isEmpty(_.xor(['isApproved', 'dayMonthYear'], paramKey)),
      _.isEmpty(_.xor(['status', 'isApproved', 'monthYear'], paramKey)),
      _.isEmpty(_.xor(['status', 'isApproved', 'dayMonthYear'], paramKey)),
    ];

    const queryArray = [
      graphqlOperation(purchaseRequestDayCreatedAt, { ...params, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestMonthCreatedAt, { ...params, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestStatusCreatedAt, { ...params, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestIsApprovedCreatedAt, { ...params, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestStatusIsApprovedCreatedAt, { status: params.status, isApprovedCreatedAt: { beginsWith: { isApproved: params.isApproved } }, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestStatusMonthYearCreatedAt, { status: params.status, monthYearCreatedAt: { beginsWith: { monthYear: params.monthYear } }, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestIsApprovedMonthYearCreatedAt, { isApproved: params.isApproved, monthYearCreatedAt: { beginsWith: { monthYear: params.monthYear } }, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestStatusDayMonthYearCreatedAt, { status: params.status, dayMonthYearCreatedAt: { beginsWith: { dayMonthYear: params.dayMonthYear } }, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestIsApprovedDayMonthYearcreatedAt, { isApproved: params.isApproved, dayMonthYearCreatedAt: { beginsWith: { dayMonthYear: params.dayMonthYear } }, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestStatusIsApprovedMonthYear, { status: params.status, isApprovedMonthYear: { beginsWith: { isApproved: params.isApproved, monthYear: params.monthYear } }, sortDirection: 'DESC' }),
      graphqlOperation(purchaseRequestStatusIsApprovedDayMonthYear, { status: params.status, isApprovedDayMonthYear: { beginsWith: { isApproved: params.isApproved, dayMonthYear: params.dayMonthYear } }, sortDirection: 'DESC' }),
    ];

    const queryDataItem = [
      'purchaseRequestDayCreatedAt',
      'purchaseRequestMonthCreatedAt',
      'purchaseRequestStatusCreatedAt',
      'purchaseRequestIsApprovedCreatedAt',
      'purchaseRequestStatusIsApprovedCreatedAt',
      'purchaseRequestStatusMonthYearCreatedAt',
      'purchaseRequestIsApprovedMonthYearCreatedAt',
      'purchaseRequestStatusDayMonthYearCreatedAt',
      'purchaseRequestIsApprovedDayMonthYearcreatedAt',
      'purchaseRequestStatusIsApprovedMonthYear',
      'purchaseRequestStatusIsApprovedDayMonthYear',
    ];

    const queryIndex = checkParams.indexOf(true);
    console.log(params);
    console.log(paramKey);
    console.log(checkParams);
    // console.log(queryArray[]);

    const queryData = await API.graphql(queryArray[queryIndex]);
    const purchaseRequests = queryData.data[queryDataItem[queryIndex]].items;
    // console.log(queryData);
    dispatch(setPurchaseRequests(purchaseRequests));
    dispatch(setTableSpin(false));
  } catch (e) {
    console.log(e);
    dispatch(setShowSpin(false));
    message.error('Error getting Purchase Request');
    throw new Error(e);
  }
};

export const addPurchaseRequest = (data) => async (dispatch, getState) => {
  try {
    dispatch(setModalSpin(true));
    if (!data.orders.length) {
      message.error('Cannot add purchase request without orders!');
      dispatch(setModalSpin(false));
      return;
    }

    const body = { ...data };
    delete body.orders;

    const { purchaseRequestCount } = getState().purchaseRequests;

    const createData = await API.graphql(graphqlOperation(createPurchaseRequest, {
      input: { ...body, count: purchaseRequestCount + 1 },
    }));

    const { id } = createData.data.createPurchaseRequest;

    data.orders.forEach(async (order) => {
      const {
        price, product, quantity, unit,
      } = order;
      const input = {
        price,
        orderProductId: product.id,
        purchaseRequestId: id,
        quantity,
        unit,
      };
      await API.graphql(graphqlOperation(createOrder, { input }));
    });
    message.success('Purchase Request added succesfully!');
    dispatch(setModalSpin(false));
    dispatch(setOpenModal(false));
  } catch (e) {
    message.error('Adding Purchase Request failed!');
    dispatch(setShowSpin(false));
    throw new Error(e);
  }
};

export const initSubscriptions = () => (dispatch, getState) => {
  try {
    const queryCreateData = API.graphql(graphqlOperation(onCreatePurchaseRequest)).subscribe({
      next: (purchaseRequestData) => {
        const { purchaseRequests } = getState().purchaseRequests;
        const addedData = purchaseRequestData.value.data.onCreatePurchaseRequest;
        const newPurchaseRequests = [addedData].concat(purchaseRequests);
        dispatch(setPurchaseRequestCount(addedData.count));
        dispatch(setPurchaseRequests(newPurchaseRequests));
      },
    });
    const queryUpdateData = API.graphql(graphqlOperation(onUpdatePurchaseRequest)).subscribe({
      next: (purchaseRequestData) => {
        const { purchaseRequests } = getState().purchaseRequests;
        const updatedData = purchaseRequestData.value.data.onUpdatePurchaseRequest;
        const newPurchaseRequests = purchaseRequests.map((product) => {
          if (product.id === updatedData.id) {
            return updatedData;
          }
          return product;
        });
        dispatch(setPurchaseRequests(newPurchaseRequests));
      },
    });

    const subscriptions = [queryCreateData, queryUpdateData];
    dispatch(setSubscriptions(subscriptions));
  } catch (e) {
    message.error('Error in subscriptions!');
  }
};

export const unsubscribe = () => (dispatch, getState) => {
  try {
    const { subscriptions } = getState().products;
    subscriptions.forEach((listener) => {
      listener.unsubscribe();
    });
    dispatch(setSubscriptions([]));
  } catch (e) {
    message.error('Error while unsubscribing!');
  }
};
