import { message } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import _ from 'lodash';
import axios from '../../../axios-orders';
import OPC from '../../../api/OPC';
import {
  //searchProducts,
  // getPurchaseRequest,
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
  purchaseRequestStatusIsApprovedDayMonthYear
} from '../../../graphql/queries';
import * as actionTypes from '../ActionTypes';
import {
  setShowSpin1, setShowSpin2, setOpenModal1, setOpenModal2, setShowSpin3
} from '../../ui/actions/Actions';
import {
  // createPurchaseRequest,
  updatePurchaseRequest
} from '../../../graphql/mutations';

import {
  onCreatePurchaseRequest,
  onUpdatePurchaseRequest
} from '../../../graphql/subscriptions';

export const setProducts = (data) => ({
  type: actionTypes.SET_PRODUCTS,
  data
});

export const setPurchaseRequests = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTS,
  data
});

export const setPurchaseRequestData = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTDATA,
  data
});

export const setPurchaseRequestCount = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTSCOUNT,
  data
});

export const setSubscriptions = (data) => ({
  type: actionTypes.SET_PURCHASEREQUESTSUBSCRIPTIONS,
  data
});
export const updatePurchaseRequestNumber = (data) => ({
  type: actionTypes.UPDATE_PURCHASEREQUEST_NUMBER,
  data
})
const addPurchaseRequestStart = () => ({
  type: actionTypes.ADD_PURCHASEREQUEST_START
})
const addPurchaseRequestSuccess = (id, purchaseRequestData) => ({
  type: actionTypes.ADD_PURCHASEREQUEST_SUCCESS,
  purchaseRequestId: id,
  purchaseRequestData
})

const addPurchaseRequestFail = (error) => ({
  type: actionTypes.ADD_PURCHASEREQUEST_FAIL,
  error
})

const fetchPurchaseRequestsStart = () => ({
  type: actionTypes.FETCH_PURCHASEREQUESTS_START
})
const fetchPurchaseRequestsSuccess = (purchaseRequests, purchaseRequestsPending) => ({
  type: actionTypes.FETCH_PURCHASEREQUESTS_SUCCESS,
  purchaseRequests,
  purchaseRequestsPending
})
const fetchPurchaseRequestsFail = (error) => ({
  type: actionTypes.FETCH_PURCHASEREQUESTS_FAIL,
  error
})

const updatePurchaseRequestStart = () => ({
  type: actionTypes.UPDATE_PURCHASEREQUEST_START
})

const updatePurchaseRequestFail = (error) => ({
  type: actionTypes.UPDATE_PURCHASEREQUEST_FAIL,
  error
})

const updatePurchaseRequestSuccess = (id, purchaseRequestData) => ({
  type: actionTypes.UPDATE_PURCHASEREQUEST_SUCCESS,
  purchaseRequestId: id,
  purchaseRequestData
})

const updatePurchaseRequestIdInStore = (purchaseRequestId) => ({
  type: actionTypes.UPDATE_PURCHASEREQUESTID_IN_STORE,
  purchaseRequestId
})

const fetchPurchaseRequestsGasToStore = (data) => ({
  type: actionTypes.FETCH_PURCHASEREQUESTS_GAS,
  data
})

const deletePurchaseRequestInStore = (id, data) => ({
  type: actionTypes.DELETE_PURCHASEREQUEST,
  id,
  data
})

export const getProducts = () => {
  return dispatch => {
    dispatch(setShowSpin1(true));
    axios.get('/products.json')
      .then((response) => {
        const fetchedProducts = [];
        for (const key in response.data) {
          fetchedProducts.push({
            ...response.data[key],
            id: key
          });
        }
        // console.log(fetchedProducts);
        dispatch(setProducts(fetchedProducts));
        dispatch(setShowSpin1(false));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setShowSpin1(false));
        message.error('Error fetching products');
      })
  }
  //try {}
  // const queryData = await API.graphql(graphqlOperation(searchProducts, {
  //   filter:
  //     {
  //       name:
  //         {
  //           matchPhrasePrefix: data
  //         }
  //     },
  //   limit: 5
  // }));
  // const itemsInProducts = queryData.data.searchProducts.items;
  // dispatch(setProducts(itemsInProducts));
  // dispatch(setShowSpin1(false));
  // } catch (e) {
  //   console.error(e);
  //   dispatch(setShowSpin1(false));
  //   message.error('Error getting products');
  // }
};

export const invokeUpdatePurchaseRequest = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin1(true));
    await API.graphql(graphqlOperation(updatePurchaseRequest, { input: data }));
    dispatch(setShowSpin1(false));
    dispatch(setOpenModal2(false));
    message.success('Updated Successfully!');
  } catch (e) {
    console.error(e);
    message.error('Error updating purchase request');
  }
};

// export const initiateUpdateModal = (data) => async (dispatch) => {
//   try {
//     // dispatch(setShowSpin1(true));
//     const queryData = await API.graphql(graphqlOperation(getPurchaseRequest, {
//       id: data
//     }));
//     const purchaseRequestData = queryData.data.getPurchaseRequest;
//     dispatch(setPurchaseRequestData(purchaseRequestData));
//     dispatch(setOpenModal2(true));
//     // dispatch(setShowSpin1(false));
//   } catch (e) {
//     console.error(e);
//     dispatch(setOpenModal2(false));
//     message.error('Error getting Purchase Request data!');
//   }
// };

export const getMonthlyPurchaseRequests = () => async (dispatch) => {
  try {
    dispatch(setShowSpin3(true));
    const queryData = await API.graphql(graphqlOperation(purchaseRequestMonthCreatedAt, {
      monthYear: moment(new Date()).format('MM-YYYY'),
      sortDirection: 'DESC'
    }));
    const { items } = queryData.data.purchaseRequestMonthCreatedAt;
    if (items.length) {
      dispatch(setPurchaseRequestCount(items[0].count));
      dispatch(setPurchaseRequests(items));
    }
    dispatch(setShowSpin3(false));
  } catch (e) {
    console.error(e);
    dispatch(setShowSpin3(false));
    message.error('Cannot get latest List of  Purchase Requests');
  }
};

export const fetchPurchaseRequests = () => async (dispatch) => {

  try {
    const purchaseRequests = await OPC.get('/purchase_requests');
    const fetchedPurchaseRequests = [];
    const pendingPurchaseRequests = [];
    for (const key in purchaseRequests.data) {
      const id = purchaseRequests.data[key].purchase_request_id;
      const purchaseRequestOrders = await OPC.get('/purchase_requests/' + id);
      fetchedPurchaseRequests.push({
        ...purchaseRequests.data[key],
        orders: purchaseRequestOrders.data
      })
      if (purchaseRequests.data[key].status === 'PENDING') {
        pendingPurchaseRequests.push({
          ...purchaseRequests.data[key],
          orders: purchaseRequestOrders.data
        })
      }
    }

    dispatch(fetchPurchaseRequestsSuccess(fetchedPurchaseRequests, pendingPurchaseRequests))
  } catch (err) {
    console.error(err.message);
  }
  // return dispatch => {
  //   dispatch(fetchPurchaseRequestsStart());
  //   dispatch(setShowSpin1(true));
  //   axios.get('/purchaserequests.json')
  //     .then((response) => {
  //       const fetchedPurchaseRequests = [];
  //       for (const key in response.data) {
  //         fetchedPurchaseRequests.push({
  //           ...response.data[key],
  //           id: key
  //         })
  //       }
  //       const pendingPurchaseRequests = [];
  //       for (const key in response.data) {
  //         if (response.data[key].status === 'PENDING') {
  //           pendingPurchaseRequests.push({
  //             ...response.data[key],
  //             id: key
  //           })
  //         }
  //       }
  //       dispatch(setShowSpin1(false));
  //       dispatch(fetchPurchaseRequestsSuccess(fetchedPurchaseRequests, pendingPurchaseRequests));
  //     }).catch((error) => {
  //       message.error('Error fetching purchase requests');
  //       dispatch(setShowSpin1(false));
  //       dispatch(fetchPurchaseRequestsFail(error));
  //     })

  //   // axios.get('/currentPurchaseRequestId.json')
  //   //   .then((response) => {
  //   //     dispatch(updatePurchaseRequestIdInStore(response.data))
  //   //   })
  //   //   .catch(() => {
  //   //     message.error('unable to update purchase request id');
  //   //   })
  // }
}

export const getPurchaseRequests = (params) => async (dispatch) => {
  try {
    dispatch(setShowSpin3(true));
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
      _.isEmpty(_.xor(['status', 'isApproved', 'dayMonthYear'], paramKey))
    ];

    const queryArray = [
      graphqlOperation(purchaseRequestDayCreatedAt, {
        ...params,
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestMonthCreatedAt, {
        ...params,
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestStatusCreatedAt, {
        ...params,
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestIsApprovedCreatedAt, {
        ...params,
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestStatusIsApprovedCreatedAt, {
        status: params.status,
        isApprovedCreatedAt: { beginsWith: { isApproved: params.isApproved } },
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestStatusMonthYearCreatedAt, {
        status: params.status,
        monthYearCreatedAt: { beginsWith: { monthYear: params.monthYear } },
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestIsApprovedMonthYearCreatedAt, {
        isApproved: params.isApproved,
        monthYearCreatedAt: { beginsWith: { monthYear: params.monthYear } },
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestStatusDayMonthYearCreatedAt, {
        status: params.status,
        dayMonthYearCreatedAt: { beginsWith: { dayMonthYear: params.dayMonthYear } },
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestIsApprovedDayMonthYearcreatedAt, {
        isApproved: params.isApproved,
        dayMonthYearCreatedAt: { beginsWith: { dayMonthYear: params.dayMonthYear } },
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestStatusIsApprovedMonthYear, {
        status: params.status,
        isApprovedMonthYear: {
          beginsWith: {
            isApproved: params.isApproved,
            monthYear: params.monthYear
          }
        },
        sortDirection: 'DESC'
      }),
      graphqlOperation(purchaseRequestStatusIsApprovedDayMonthYear, {
        status: params.status,
        isApprovedDayMonthYear: {
          beginsWith: {
            isApproved: params.isApproved,
            dayMonthYear: params.dayMonthYear
          }
        },
        sortDirection: 'DESC'
      })
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
      'purchaseRequestStatusIsApprovedDayMonthYear'
    ];

    const queryIndex = checkParams.indexOf(true);
    // console.log(queryArray[]);

    const queryData = await API.graphql(queryArray[queryIndex]);
    const purchaseRequests = queryData.data[queryDataItem[queryIndex]].items;
    // console.log(queryData);
    dispatch(setPurchaseRequests(purchaseRequests));
    dispatch(setShowSpin3(false));
  } catch (e) {
    console.error(e);
    dispatch(setShowSpin1(false));
    message.error('Error getting Purchase Request');
  }
};

// export const addPurchaseRequest = (purchaseRequestData) => (dispatch, getState) => {
export const addPurchaseRequest = (purchaseRequestData) => async (dispatch, getState) => {

  dispatch(setShowSpin2(true));
  dispatch(addPurchaseRequestStart());

  if (!purchaseRequestData.orders.length) {
    message.error('Please create orders');
    dispatch(setShowSpin2(false));
  } else {

    try {
      const purchaseRequestPost = {
        is_approved: true,
        purchase_request_number: purchaseRequestData.purchase_request_number,
        status: 'PENDING',
        requested_by: purchaseRequestData.requested_by
      }
      const newPurchaseRequest = await OPC.post('/purchase_requests', purchaseRequestPost);
      const lastID = await OPC.get('/purchase_requests/last_id');
      const lastPurchaseRequestID = lastID.data[0].max;
      for (const key in purchaseRequestData.orders) {
        const purchaseRequestOrderPost = {
          ...purchaseRequestData.orders[key],
          quantity: purchaseRequestData.orders[key].quantity.toFixed(2),
          quantity_left: purchaseRequestData.orders[key].quantity_left.toFixed(2),
          purchase_request_id: lastPurchaseRequestID
        }
        const newPurchaseRequestOrder = await OPC.post('/purchase_requests/orders', purchaseRequestOrderPost);
      }
      message.success('Purchase Request Created');
      dispatch(fetchPurchaseRequests());
      dispatch(setShowSpin2(false));
      dispatch(setOpenModal1(false));
    } catch (err) {
      console.error(err.message);
    }
    // if (!purchaseRequestData.orders.length) {
    //   message.error('Please create orders');
    //   dispatch(setShowSpin2(false));
    // }

    // // const {purchaseRequestCount} = getState().purchaseRequests;

    // // const count = purchaseRequestCount + 1;
    // // const purchaseRequestNo = `${purchaseRequestData.monthyear}-${count}`;
    // // console.log(purchaseRequestNo);
    // const count = purchaseRequestData.purchaseRequestNo
    // //console.log('count: ', count);
    // const purchaseRequestNo = count;

    // axios.post('/purchaserequests.json', purchaseRequestData)
    //   .then((response) => {
    //     dispatch(setShowSpin2(false));
    //     dispatch(setOpenModal1(false));
    //     dispatch(addPurchaseRequestSuccess(response.data.name, purchaseRequestData))
    //     message.success('Purchase request created');
    //   })
    //   .catch((error) => {
    //     dispatch(addPurchaseRequestFail(error))
    //     dispatch(setShowSpin2(false));
    //     dispatch(setOpenModal1(false));
    //     message.error('Error creating purchase request!');
    //   });

    // axios.put('/currentPurchaseRequestId.json', count)
    //   .then(() => {
    //     dispatch(updatePurchaseRequestIdInStore(count));
    //   })
    //   .catch(() => {
    //     message.error('unable to update purchase request Id after adding');
    //   })
    // try {
    //   dispatch(setShowSpin2(true));
    //   if (!data.orders.length) {
    //     message.error('Cannot add purchase request without orders!');
    //     dispatch(setShowSpin2(false));
    //     return;
    //   }

    //   // const body = {...data};
    //   // delete body.orders;

    //   const {purchaseRequestCount} = getState().purchaseRequests;

    //   const count = purchaseRequestCount + 1;
    // const purchaseRequestNo = `${data.monthYear}-${count}`;


    //   await API.graphql(graphqlOperation(createPurchaseRequest, {
    //     input: {
    //       ...data,
    //       count,
    //       purchaseRequestNo
    //     }
    //   }));

    //   // const {id} = createdData.data.createPurchaseRequest;

    //   // data.orders.forEach(async (order) => {
    //   //   const {
    //   //     price, product, quantity, unit
    //   //   } = order;
    //   //   const input = {
    //   //     price,
    //   //     orderProductId: product.id,
    //   //     purchaseRequestId: id,
    //   //     quantity,
    //   //     unit
    //   //   };
    //   //   await API.graphql(graphqlOperation(createOrder, {input}));
    //   // });
    //   message.success('Purchase Request added succesfully!');
    //   dispatch(setShowSpin2(false));
    //   dispatch(setOpenModal1(false));
    // } catch (e) {
    //   console.error(e);
    //   message.error('Adding Purchase Request failed!');
    //   dispatch(setShowSpin1(false));
    // }
  }
};

export const editPurchaseRequest = (purchaseRequestData) => {
  return dispatch => {
    dispatch(setShowSpin1(true));
    dispatch(updatePurchaseRequestStart());
    const prURL = 'purchaserequests/' + purchaseRequestData.id + '.json';
    axios.put(prURL, purchaseRequestData)
      .then(() => {
        dispatch(updatePurchaseRequestSuccess(purchaseRequestData.id, purchaseRequestData));
        message.success('Purchase request updated');
        dispatch(setShowSpin1(false));
        dispatch(setOpenModal1(false));
      })
      .catch((error) => {
        message.error('Error updating purchase request');
        dispatch(updatePurchaseRequestFail(error));
        dispatch(setShowSpin1(false));
        dispatch(setOpenModal2(false));
        dispatch(setOpenModal1(false));
      })
  }
}

export const initSubscriptions = () => (dispatch, getState) => {
  try {
    const queryCreateData = API.graphql(graphqlOperation(onCreatePurchaseRequest)).subscribe({
      next: (purchaseRequestData) => {
        dispatch(setShowSpin3(true));
        const { purchaseRequests } = getState().purchaseRequests;
        const addedData = purchaseRequestData.value.data.onCreatePurchaseRequest;
        const newPurchaseRequests = [addedData].concat(purchaseRequests);
        dispatch(setPurchaseRequestCount(addedData.count));
        dispatch(setPurchaseRequests(newPurchaseRequests));
        dispatch(setShowSpin3(false));
      }
    });
    const queryUpdateData = API.graphql(graphqlOperation(onUpdatePurchaseRequest)).subscribe({
      next: (purchaseRequestData) => {
        dispatch(setShowSpin3(true));
        const { purchaseRequests } = getState().purchaseRequests;
        const updatedData = purchaseRequestData.value.data.onUpdatePurchaseRequest;
        const newPurchaseRequests = purchaseRequests.map((product) => {
          if (product.id === updatedData.id) {
            return updatedData;
          }
          return product;
        });
        dispatch(setPurchaseRequests(newPurchaseRequests));
        dispatch(setShowSpin3(false));
      }
    });

    const subscriptions = [queryCreateData, queryUpdateData];
    dispatch(setSubscriptions(subscriptions));
  } catch (e) {
    console.error(e);
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
    console.error(e);
    message.error('Error while unsubscribing!');
  }
};

export const deletePurchaseRequest = (data) => async (dispatch) => {

  try {

    const id = data.purchase_request_id
    console.log(id);
    const deletePurchaseRequest = await OPC.delete('/purchase_requests/' + id);
    dispatch(fetchPurchaseRequests());
    message.success('purchase request removed');


  } catch (error) {
    message.error('unable to delete purchase request');
    console.error(error);
  }

}

export const fetchPurchaseRequestsGas = (data) => async (dispatch) => {
  const fetchedPurchaseRequests = [];
  try {
    const results = await axios.get('/purchaserequests.json');
    for (const key in results.data) {
      if (results.data[key].prType == 'Fuel') {
        fetchedPurchaseRequests.push({
          ...results.data[key],
          id: key
        })
      }
    }
    dispatch(fetchPurchaseRequestsGasToStore(fetchedPurchaseRequests));
  } catch (error) {
    message.error('unable to fetch purchase requests!');
    console.error(error);
  }
}
