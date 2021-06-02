//import {API, graphqlOperation} from 'aws-amplify';
import { message } from 'antd';
//import {purchaseRequestDayCreatedAt} from '../../../graphql/queries';
import { setShowSpin1, setShowSpin2, setOpenModal1 } from '../../ui/actions/Actions';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import * as actionTypes from '../ActionTypes';
import axios from '../../../axios-orders';
import OPC from '../../../api/OPC';
import { RestOutlined } from '@ant-design/icons';
import { onCreatePurchaseRequest, onDeletePurchaseRequest } from '../../../graphql/subscriptions';

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

export const setProjectsInStore = (projectData) => ({
  type: actionTypes.SET_PROJECTSINPURCHASEORDER,
  projectData
})

const setOrdersReceivedInStore = (data) => ({
  type: actionTypes.SET_ORDERS_RECEIEVED,
  data
})

export const setProjectInStore = (data) => ({
  type: actionTypes.FETCH_PROJECT,
  data
})

const fetchWorksheetToStore = (data) => ({
  type: actionTypes.FETCH_WORKSHEET,
  data
})

const fetchPurchaseOrderIdInStore = (data) => ({
  type: actionTypes.FETCH_PURCHASEORDER_ID,
  data
})

const fetchPurchaseOrdersToStore = (purchaseOrders, purchaseOrdersPending) => ({
  type: actionTypes.FETCH_PURCHASEORDERS,
  purchaseOrders,
  purchaseOrdersPending
})

const setVendorInStore = (data) => ({
  type: actionTypes.SET_VENDOR,
  data
})

const setTotalPriceInStore = (data) => ({
  type: actionTypes.SET_TOTALPRICE,
  data
})

const setLoading = (data) => ({
  type: actionTypes.SET_LOADING,
  data
})

const deletePurchaseOrderInStore = (id, data) => ({
  type: actionTypes.DELETE_PURCHASEORDER,
  id,
  data
})

const setCategoriesInStore = (data) => ({
  type: actionTypes.SET_CATEGORIES,
  data
})

export const setSamplePurchaseOrder = (data) => ({
  type: actionTypes.SET_SAMPLE_PURCHASEORDER,
  data
})

export const setCategories = (data) => async (dispatch) => {
  const fetchedCategories = [];
  try {
    const response = await OPC.get('/project_categories/' + data.project_id);
    console.log(response.data);
    for (const key in response.data) {
      fetchedCategories.push(response.data[key].subcategory_category);
    }
    dispatch(setCategoriesInStore(fetchedCategories));
  } catch (error) {
    console.error(error.message);
  }
}

export const getSamplePO = () => async (dispatch) => {
  const fetchedPurchaseOrders = [];
  try {
    const result = await axios.get('/purchaseorders.json');
    for (const key in result.data) {
      fetchedPurchaseOrders.push({
        ...result.data[key],
        id: key
      })
    }
    dispatch(setSamplePurchaseOrder(fetchedPurchaseOrders));
  } catch (error) {
    message.error('Error getting the purchaseOrders!');
    console.error(error);
  }

}

export const setPurchaseOrder = (data) => ({
  type: actionTypes.SET_PURCHASEORDER,
  data
})

export const initOrders = (data) => (dispatch) => {
  dispatch(setTotalPriceInStore(data));
}


export const newVendor = (vendorData) => async (dispatch, getState) => {
  // Marco Code
  dispatch(setLoading(true));
  const vendorsList = getState().purchaseOrder.vendors;
  const newVendors = vendorsList;
  newVendors.push(vendorData);
  try {
    await axios.post('/vendors.json', vendorData);
    dispatch(setVendorInStore(vendorData))
    dispatch(setVendors(newVendors));
    dispatch(setLoading(false));
    message.success('New Vendor created');
  } catch (error) {
    message.error('Cannot add new Vendor');
    console.error(error);
    dispatch(setLoading(false));
  }
}

export const setOrder = (data, index) => (dispatch, getState) => {
  dispatch(setLoading(true));
  const oldOrder = getState().purchaseOrder.totalPrice;
  const oldPurchaseOrder = getState().purchaseOrder.purchaseOrder;
  const newOrder = oldOrder;
  newOrder[index] = data
  let finalTotalPrice = 0;
  const newPurchaseOrder = {
    ...oldPurchaseOrder,
    orders: newOrder
  }


  for (const key in newOrder) {
    finalTotalPrice += newOrder[key].totalPrice
  }
  const finalPurchaseOrder = {
    ...newPurchaseOrder,
    totalPrice: finalTotalPrice
  }
  // console.log('finalTotalPrice: ', finalTotalPrice);
  dispatch(setPurchaseOrder(finalPurchaseOrder));
  dispatch(setLoading(false));
}

export const setProject = (projectData) => {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(setProjectInStore(projectData));
    dispatch(setLoading(false));
  }
}

export const setPurchaseRequestData = (purchaseRequestId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const prId = purchaseRequestId.purchase_request_id;
    const fetchedPurchaseRequest = await OPC.get('/purchase_requests/' + prId);
    const newPurchaseRequest = fetchedPurchaseRequest.data;
    dispatch(setPurchaseRequest(newPurchaseRequest));
    dispatch(setLoading(false));
  } catch (error) {
    message.error(error);
    dispatch(setLoading(false));
  }
}

export const fetchProjectForPurchaseOrder = (projectCodeData) => async (dispatch) => {
  const fetchedProjects = [];
  dispatch(setLoading(true));
  try {
    const result = await OPC.get('/projects')
    for (const key in result.data) {
      fetchedProjects.push({
        ...result.data[key]
      })
    }
    const projectSelected = fetchedProjects
      .find(project => project.project_code === projectCodeData);
    dispatch(setProjectInStore(projectSelected));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    message.error(error);
  }
}

export const setVendor = (vendorId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await OPC.get('/vendors/' + vendorId);
    const fetchedVendor = result.data
    dispatch(setVendorInStore(fetchedVendor[0]));
    dispatch(setLoading(false));
  } catch (error) {
    message.error(error)
  }
}

export const setOrdersReceived = (initOrders, ordersData, idLink) => async (dispatch, getState) => {
  const newOrders = [];
  if (!ordersData.length) {
    message.success('no changes made');
    return;
  }
  for (const key in ordersData) {
    newOrders.push({
      ...ordersData[key],
      id: key
    });
  }
  // console.log('newOrdersPushed: ', newOrders);
  dispatch(setOrdersReceivedInStore(newOrders));
  dispatch(setShowSpin1(true));
  const fetchedProjects = [];
  try {
    const result = await axios.get('/projects.json')
    for (const key in result.data) {
      fetchedProjects.push({
        ...result.data[key],
        id: key
      })
    }
    const projectSelected = fetchedProjects.find((e) => e.projectCode === newOrders[0].projectCode);
    dispatch(setProjectInStore(projectSelected));
    //console.log('projectSelected: ', projectSelected);

    const newPurchaseOrderOrders = [];

    for (const key in newOrders) {
      const projectInStore = getState().purchaseOrder.project;
      for (const budgetCostKey in projectInStore
        .budget
        .budgetCost) {

        for (const subCategoriesKey in projectInStore
          .budget.budgetCost[budgetCostKey]
          .subCategories) {

          const foundItem = projectInStore
            .budget
            .budgetCost[budgetCostKey]
            .subCategories[subCategoriesKey]
            .subCategoryItem.find((e) => e.category === newOrders[key].category)

          if (foundItem !== undefined) {
            const newAmountSpent = newOrders[key].itemTotal;
            const newSubCategoryItemAmountSpent = projectInStore
              .budget.budgetCost[budgetCostKey]
              .subCategories[subCategoriesKey]
              .subCategoryItem[foundItem.index]
              .amountSpent + newAmountSpent;

            const newSubCategoriesAmountSpent = projectInStore
              .budget.budgetCost[budgetCostKey]
              .subCategories[subCategoriesKey]
              .amountSpent + newAmountSpent;

            const newBudgetCostAmountSpent = projectInStore
              .budget.budgetCost[budgetCostKey]
              .amountSpent + newAmountSpent;

            //  console.log('newSubCategoryItemAmountSpent: ', newSubCategoryItemAmountSpent);

            const newProject = projectInStore;
            newProject.budget.budgetCost[budgetCostKey]
              .subCategories[subCategoriesKey].subCategoryItem.splice(foundItem.index, 1, {
                ...projectInStore.budget.budgetCost[budgetCostKey]
                  .subCategories[subCategoriesKey]
                  .subCategoryItem[foundItem.index],
                amountSpent: newSubCategoryItemAmountSpent
              })

            newProject.budget.budgetCost[budgetCostKey]
              .subCategories.splice(subCategoriesKey, 1, {
                ...projectInStore.budget.budgetCost[budgetCostKey]
                  .subCategories[subCategoriesKey],
                amountSpent: newSubCategoriesAmountSpent
              })

            newProject.budget.budgetCost.splice(budgetCostKey, 1, {
              ...projectInStore.budget.budgetCost[budgetCostKey],
              amountSpent: newBudgetCostAmountSpent
            })
            const newPurchaseOrderData = {
              category: newOrders[key].category,
              didReceive: true,
              id: newOrders[key].product + newOrders[key].id + uuidv4,
              itemTotal: newOrders[key].itemTotal,
              product: newOrders[key].product,
              quantity: newOrders[key].quantity,
              unit: newOrders[key].unit,
              unitPrice: newOrders[key].unitPrice
            }
            newPurchaseOrderOrders.push(newPurchaseOrderData);
            dispatch(setProjectInStore(newProject));

          }
        }
      }
    }

    const finalPurchaseOrderOrders = [...initOrders];
    for (const key in finalPurchaseOrderOrders) {
      const orderFound = newPurchaseOrderOrders.find(
        (e) => e.product === finalPurchaseOrderOrders[key].product);
      if (orderFound !== undefined) {
        finalPurchaseOrderOrders[key] = orderFound;
      }
    }


    let newPoStatus = 'Pending';
    let didReceiveFlag = 0;
    for (const key in finalPurchaseOrderOrders) {
      if (finalPurchaseOrderOrders[key].didReceive === true ||
        finalPurchaseOrderOrders[key].didReceive === undefined) {
        didReceiveFlag += 1;
      }
    }

    if (didReceiveFlag === initOrders.length) {
      newPoStatus = 'Received';
    }

    const editedProject = getState().purchaseOrder.project;
    const fetchedPurchaseOrder = await axios.get('/purchaseorders/' + idLink + '.json');
    const finalPurchaseOrder = {
      ...fetchedPurchaseOrder.data,
      status: newPoStatus,
      orders: finalPurchaseOrderOrders
    }
    await axios.put('/projects/' + projectSelected.id + '.json', editedProject);
    await axios.put('purchaseorders/' + idLink + '.json', finalPurchaseOrder);
    message.success('Budget updated!');
    dispatch(setShowSpin1(false));
    dispatch(setOpenModal1(false))
    window.location.reload(false);
  } catch (error) {
    message.error('Purchase Order Error!');
    dispatch(setShowSpin1(false));
    console.error(error);
  }

}

export const fetchPurchaseOrders = () => async (dispatch) => {
  dispatch(setShowSpin2(true));
  dispatch(setLoading(true));
  try {
    const response = await OPC.get('/purchase_orders');
    const fetchedPurchaseOrders = [];
    for(const key in response.data) {
      const projectCode = await OPC.get('/project_code/' + response.data[key].project_id);
      const prNumber = await OPC.get('/purchase_request_number/' + response.data[key].purchase_request_id);
      fetchedPurchaseOrders.push({
        ...response.data[key],
        project: projectCode.data[0].project_code,
        purchaseRequestNumber: prNumber.data[0].purchase_request_number
      })
    }
    const pendingPurchaseOrders = [];
    for(const key in fetchedPurchaseOrders) {
      if(fetchedPurchaseOrders[key].status === 'PENDING' || fetchedPurchaseOrders[key].status === 'CANCELLED') {
        pendingPurchaseOrders.push({
          ...fetchedPurchaseOrders[key]
        })
      }
    }



    dispatch(fetchPurchaseOrdersToStore(fetchedPurchaseOrders, pendingPurchaseOrders));
    dispatch(setShowSpin2(false));
  } catch (err) {
    console.error(err.message);
    dispatch(setLoading(false));
    dispatch(setShowSpin2(true));
  }
  // try {
  //   const result = await axios.get('/purchaseorders.json');
  //   const fetchedPurchaseOrders = [];
  //   for (const key in result.data) {
  //     fetchedPurchaseOrders.push({
  //       ...result.data[key],
  //       id: key
  //     })
  //   }
  //   const pendingPurchaseOrders = [];
  //   for (const key in result.data) {
  //     if (result.data[key].status === 'pending' || result.data[key].status === 'cancelled') {
  //       pendingPurchaseOrders.push({
  //         ...result.data[key],
  //         id: key
  //       })
  //     }
  //   }
  //   dispatch(fetchPurchaseOrdersToStore(fetchedPurchaseOrders, pendingPurchaseOrders));
  //   dispatch(setShowSpin2(false));
  //   dispatch(setLoading(false));
  // } catch (error) {
  //   message.error('failed to retrieve purchase orders');
  //   console.error(error);
  //   dispatch(setLoading(false));
  //   dispatch(setShowSpin2(false));
  // }
}
export const getProjects = () => async (dispatch) => {
  try {
    dispatch(setShowSpin2(true));
    const response = await OPC.get('/projects');
    const fetchedProjects = [];
    for (const key in response.data) {
      fetchedProjects.push({
        ...response.data[key]
      })
    }
    dispatch(setProjectsInStore(fetchedProjects));
    dispatch(setShowSpin2(false));
  } catch (err) {
    dispatch(setShowSpin2(false))
    message.error('unable to fetch projects');
    console.error(err.message);
  }
  // return dispatch => {
  //   dispatch(setLoading(true));
  //   dispatch(setShowSpin2(true));
  //   axios.get('/projects.json')
  //     .then((response) => {
  //       const fetchedProjects = [];
  //       for (const key in response.data) {
  //         fetchedProjects.push({
  //           ...response.data[key],
  //           id: key
  //         })
  //       }
  //       dispatch(setProjectsInStore(fetchedProjects));
  //       dispatch(setShowSpin2(false));
  //       dispatch(setLoading(false));
  //     })
  //     .catch((error) => {
  //       dispatch(setLoading(false));
  //       message.error('unable to fetch projects');
  //       console.error(error);
  //     })
  // }
}
export const getPurchaseRequests = () => async (dispatch) => {
  dispatch(setShowSpin1(true));
  try {
    const response = await OPC.get('/purchase_requests');
    dispatch(setPurchaseRequests(response.data))
    dispatch(setShowSpin1(false));
  } catch (err) {
    console.error(err.message);
    dispatch(setShowSpin1(false));
  }
  // return dispatch => {
  //   dispatch(setLoading(true));
  //   dispatch(setShowSpin1(true));
  //   axios.get('/purchaserequests.json')
  //     .then((response) => {
  //       const fetchedPurchaseRequests = [];
  //       for (const key in response.data) {
  //         if (response.data[key].isApproved === "APPROVED" && response.data[key].status !== 'ORDERED') {
  //           fetchedPurchaseRequests.push({
  //             ...response.data[key],
  //             id: key
  //           })
  //         }
  //       }
  //       dispatch(setShowSpin1(false));
  //       dispatch(setLoading(false));
  //       dispatch(setPurchaseRequests(fetchedPurchaseRequests))
  //     })
  //     .catch((error) => {
  //       dispatch(setLoading(false));
  //       message.error('Could not obtain purchase requests');
  //       console.error(error);
  //     })
  // }
};

export const fetchPurchaseOrderId = () => async (dispatch) => {
  dispatch(setLoading(true));
  //dispatch(setShowSpin2(true));
  try {
    const response = await axios.get('/currentPurchaseOrderId.json');
    dispatch(setLoading(false));
    dispatch(fetchPurchaseOrderIdInStore(response.data));
    dispatch(setShowSpin2(false));
  } catch (error) {
    message.error('failed to fetch purchase order id');
    dispatch(setLoading(false));
    console.error(error);
    dispatch(setShowSpin2(false));
  }
}

export const addPurchaseOrder = (purchaseOrderData) => async (dispatch) => {
  dispatch(setShowSpin2(true));
  dispatch(setLoading(true));
  console.log('purchaseOrderData: ', purchaseOrderData);
  const date = new Date();
  const newDate = moment(date, 'DD-MM-YYYY');
  try {
    const fetchedPurchaseRequest = await OPC.get('/purchase_requests/' + purchaseOrderData.purchaseRequestId);
    const fetchedOrders = await OPC.get('/purchase_requests/orders/' + purchaseOrderData.purchaseRequestId);

    const purchaseRequest = {
      ...fetchedPurchaseRequest.data,
      orders: fetchedOrders.data
    }
    const newPurchaseOrder = {
      purchase_request_id: purchaseOrderData.purchaseRequestId,
      vendor_id: purchaseOrderData.vendor,
      project_id: purchaseOrderData.project,
      notes: purchaseOrderData.notes,
      purchase_order_number: purchaseOrderData.purchaseOrderNo,
      date_created: date,
      requested_by: purchaseOrderData.requestedBy,
      status: 'PENDING',
      total_price: purchaseOrderData.totalPrice
    }
    const createdPurchaseOrder = await OPC.post('/purchase_orders', newPurchaseOrder);
    const fetchedId = await OPC.get('/purchase_orders/last_id');
    const purchaseOrderId = fetchedId.data[0].max;
    console.log('purchaseRequest: ', purchaseRequest);
    console.log('purchaseOrderId: ', purchaseOrderId);

    for (const key in purchaseOrderData.orders) {
      const purchaseOrderOrders = {
        purchase_order_id: purchaseOrderId,
        item_type: purchaseOrderData.orders[key].itemType,
        product: purchaseOrderData.orders[key].product,
        quantity: purchaseOrderData.orders[key].quantity,
        quantity_received: 0,
        unit: purchaseOrderData.orders[key].unit,
        category: '',
        unit_price: purchaseOrderData.orders[key].unitPrice,
        total_price: purchaseOrderData.orders[key].totalPrice
      }

      const newOrder = await OPC.post('/purchase_orders/orders', purchaseOrderOrders);

    }
  message.success('Purchase Order Created!');
  window.location.reload(false);
  } catch (error) {
    message.error('unable to create purchase order');
    console.error(error.message);
  }
  const purchaseRequests = []
  // for (const key in fetchedPurchaseRequests.data) {
  //   purchaseRequests.push({
  //     ...fetchedPurchaseRequests.data[key],
  //     id: key
  //   })
  // }
  // const selectedPurchaseRequest = purchaseRequests.find((element) =>
  //   element.id === purchaseOrderData.purchaseRequestId);

  // const newPurchaseRequestOrders = [];
  // for (const key in selectedPurchaseRequest.orders) {
  //   const orderFound = purchaseOrderData.orders.find((element) =>
  //     element.orderId === selectedPurchaseRequest.orders[key].orderId);
  //   if (orderFound === undefined) {
  //     newPurchaseRequestOrders.push({
  //       ...selectedPurchaseRequest.orders[key]
  //     })

  //   } else {
  //     const newQuantityLeft = selectedPurchaseRequest.orders[key].quantityLeft - orderFound.quantity
  //     newPurchaseRequestOrders.push({
  //       ...selectedPurchaseRequest.orders[key],
  //       quantityLeft: newQuantityLeft,
  //       purchaseOrderNo: purchaseOrderData.purchaseOrderNo
  //     })
  //   }
  // }


  // let prFlag = 0;
  // let newPrStatus = 'PENDING';
  // for (const key in newPurchaseRequestOrders) {
  //   if (newPurchaseRequestOrders[key].quantityLeft === 0 ||
  //     newPurchaseRequestOrders[key].quantityLeft === undefined) {
  //     prFlag += 1;
  //   }
  // }

  // if (prFlag === newPurchaseRequestOrders.length) {
  //   newPrStatus = 'ORDERED';
  // }

  // const newPurchaseRequest = {
  //   ...selectedPurchaseRequest,
  //   orders: newPurchaseRequestOrders,
  //   status: newPrStatus
  // }

  // const currentPurchaseOrderNo = await axios.get('/currentPurchaseOrderId.json');
  // const updatedPurchaseOrderOrders = [];
  // for (const key in purchaseOrderData.orders) {
  //   if (purchaseOrderData.orders[key].quantity !== 0) {
  //     updatedPurchaseOrderOrders.push({
  //       ...purchaseOrderData.orders[key],
  //     })
  //   }
  // }
  // console.log(purchaseOrderData);
  // const newPurchaseOrderId = currentPurchaseOrderNo.data;
  // const purchaseOrderNoDisplay = purchaseOrderData.purchaseOrderNo
  // const purchaseOrderIdDisplay = purchaseOrderData.purchaseOrderNo
  // const newPurchaseOrderData = {
  //   ...purchaseOrderData,
  //   orders: updatedPurchaseOrderOrders,
  //   purchaseOrderNo: purchaseOrderNoDisplay,
  //   dateCreated: newDate
  // }
  // const newPurchaseOrderNo = parseFloat(purchaseOrderIdDisplay) + 1
  // try {

  //   await axios.put('/purchaserequests/' + selectedPurchaseRequest.id + '.json', newPurchaseRequest);
  //   //await axios.put('/currentPurchaseOrderId.json', newPurchaseOrderNo)
  //   await axios.post('/purchaseorders.json', newPurchaseOrderData);

  //   // console.log(response.data);
  //   dispatch(setLoading(false));
  //   dispatch(setShowSpin2(false));
  //   alert('Purchase order created!');
  //   dispatch(setOpenModal1(false));
  //   window.location.reload(false);

  // } catch (error) {
  //   message.error('Failed to add purchase order');
  //   dispatch(setLoading(false));
  //   console.error(error);
  // }


}

export const fetchPurchaseRequest = (prId) => async (dispatch) => {
  dispatch(setShowSpin2(true));
  try {
    const purchaseRequest = await OPC.get('/purchase_requests/' + prId);
    const purchaseRequestOrders = await OPC.get('/purchase_requests/orders/' + prId);
    const orders = [];
    for (const key in purchaseRequestOrders.data) {
      orders.push(purchaseRequestOrders.data[key]);
    }
    const selectedPurchaseRequest = {
      ...purchaseRequest.data,
      orders: orders
    }
    dispatch(setPurchaseRequest(selectedPurchaseRequest));
    dispatch(setShowSpin2(false));
  } catch (error) {
    console.error(error.message);
    dispatch(setShowSpin2(false));
  }
}
export const getVendors = () => async (dispatch) => {

  dispatch(setShowSpin2(true));
  try {
    const response = await axios.get('/vendors.json')
    const fetchedVendors = [];
    for (const key in response.data) {
      fetchedVendors.push({
        ...response.data[key],
        id: key
      })
    }
    dispatch(setVendors(fetchedVendors))
    dispatch(setShowSpin2(false));
  } catch (error) {
    dispatch(setShowSpin2(false));
    message.error('unable to retrieve vendor');
    console.error(error);
  }


  // try {
  //   if (data) {
  //     dispatch(setShowSpin2(true));
  //     const queryData = await API.graphql(graphqlOperation(searchVendors, {
  //       filter:
  //           {
  //             vendorName:
  //               {
  //                 matchPhrasePrefix: data
  //               }
  //           },
  //       limit: 5
  //     }));
  //     const vendors = queryData.data.searchVendors.items;
  //     if (vendors.length) {
  //       dispatch(setVendors(vendors));
  //       dispatch(setShowSpin2(false));
  //     }
  //   }



  // } catch (e) {
  //   console.error(e)
  //   dispatch(setShowSpin2(false));
  //   message.error('Error getting products');
  // }
};

export const getPurchaseRequestData = (data) => async (dispatch) => {

  try {
    dispatch(setShowSpin2(true));
    const response = await OPC.get('/purchase_requests/' + data);
    // .then((response) => {
    //   dispatch(setShowSpin2(false));
    //   dispatch(setPurchaseRequest(response.data));
    // })
    dispatch(setShowSpin2(false));
    dispatch(setPurchaseRequest(response.data[0]));
  } catch (error) {
    message.error('failed to retrieve purchase request');
    console.error(error);
    dispatch(setShowSpin2(false));

  }



  // try {
  //   const queryData = await API.graphql(graphqlOperation(getPurchaseRequest, {id: data}));
  //   const purchaseRequestData = queryData.data.getPurchaseRequest;
  //   dispatch(setPurchaseRequest(purchaseRequestData));
  // } catch (e) {
  //   console.error(e);
  //   message.error('Cannot get Purchase Request data.');
  // }

};

export const deletePurchaseOrder = (data) => async (dispatch) => {
  const newURL = 'purchaseorders/' + data.id + '.json';

  try {

    const fetchedPurchaseOrder = data
    await axios.delete(newURL);
    dispatch(deletePurchaseOrderInStore(data.id, fetchedPurchaseOrder))
    dispatch(fetchPurchaseOrders());
    message.success('purchase order removed');


  } catch (error) {
    message.error('unable to delete purchase order');
    console.error(error);
  }

}

export const fetchWorksheet = () => async (dispatch) => {

  try {
    dispatch(setLoading(true));
    const result = await axios.get('/purchaseorders.json');
    const fetchedPurchaseOrders = [];
    const worksheetData = [];
    for (const key in result.data) {
      // fetchedPurchaseOrders.push({
      //   ...result.data[key],
      //   id: key
      // })
      const purchaseOrderNo = result.data[key].purchaseOrderId.toString();
      const purchaseRequestNo = result.data[key].purchaseRequestNo;
      const project = result.data[key].project;
      const vendor = result.data[key].vendor;
      const orders = result.data[key].orders;
      const year = result.data[key].dateCreated.slice(0, 4);
      const month = result.data[key].dateCreated.slice(5, 7);
      const day = result.data[key].dateCreated.slice(8, 10)
      for (const i in orders) {
        worksheetData.push({
          purchaseOrderNo: purchaseOrderNo,
          purchaseRequestNo: purchaseRequestNo,
          project: project,
          vendor: vendor,
          category: orders[i].category,
          itemType: orders[i].itemType,
          product: orders[i].product,
          quantity: orders[i].quantity,
          unit: orders[i].unit,
          unitPrice: orders[i].unitPrice,
          totalPrice: orders[i].totalPrice,
          year: year,
          month: month,
          day: day

        })
      }
    }
    dispatch(fetchWorksheetToStore(worksheetData));
    dispatch(setLoading(false));
    message.success('worksheet loaded');

  } catch (error) {
    message.error('failed to fetch worksheet!');
    console.error(error);
    dispatch(setLoading(false));
  }
}

export const cancelPurchaseOrder = (data) => async (dispatch) => {
  try {
    const result = await axios.get('/purchaseorders/' + data + '.json');
    const newPurchaseOrder = {
      ...result.data,
      status: 'cancelled'
    }
    await axios.put('/purchaseorders/' + data + '/.json', newPurchaseOrder);
    message.success('Purchase Order cancelled');
    window.location.reload(false);
  } catch (error) {
    message.error('Could not cancel purchase order!');
    console.error(error);
  }
}
