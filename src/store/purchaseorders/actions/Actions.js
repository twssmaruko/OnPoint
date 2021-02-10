//import {API, graphqlOperation} from 'aws-amplify';
import { message } from 'antd';
//import {purchaseRequestDayCreatedAt} from '../../../graphql/queries';
import { setShowSpin1, setShowSpin2, setOpenModal1 } from '../../ui/actions/Actions';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import * as actionTypes from '../ActionTypes';
import axios from '../../../axios-orders';
import { RestOutlined } from '@ant-design/icons';

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

export const setSamplePurchaseOrder = (data) => ({
  type: actionTypes.SET_SAMPLE_PURCHASEORDER,
  data
})

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
    const fetchedPurchaseRequest = await axios.get('/purchaserequests/' + purchaseRequestId + '.json');
    const newPurchaseRequest = fetchedPurchaseRequest.data
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
    const result = await axios.get('/projects.json')
    for (const key in result.data) {
      fetchedProjects.push({
        ...result.data[key],
        id: key
      })
    }
    const projectSelected = fetchedProjects
      .find(project => project.projectCode === projectCodeData);
    dispatch(setProjectInStore(projectSelected));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    message.error(error);
  }
}

export const setVendor = (vendorName) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const fetchedVendors = [];
    const result = await axios.get('/vendors.json');
    for (const key in result.data) {
      fetchedVendors.push({
        ...result.data[key],
        id: key
      })
    }
    const newVendor = fetchedVendors.find((vendor) => vendor.vendorName === vendorName);
    dispatch(setVendorInStore(newVendor));
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
    const result = await axios.get('/purchaseorders.json');
    const fetchedPurchaseOrders = [];
    for (const key in result.data) {
      fetchedPurchaseOrders.push({
        ...result.data[key],
        id: key
      })
    }
    const pendingPurchaseOrders = [];
    for (const key in result.data) {
      if (result.data[key].status === 'pending') {
        pendingPurchaseOrders.push({
          ...result.data[key],
          id: key
        })
      }
    }
    dispatch(fetchPurchaseOrdersToStore(fetchedPurchaseOrders, pendingPurchaseOrders));
    dispatch(setShowSpin2(false));
    dispatch(setLoading(false));
  } catch (error) {
    message.error('failed to retrieve purchase orders');
    console.error(error);
    dispatch(setLoading(false));
    dispatch(setShowSpin2(false));
  }
}
export const getProjects = () => {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(setShowSpin2(true));
    axios.get('/projects.json')
      .then((response) => {
        const fetchedProjects = [];
        for (const key in response.data) {
          fetchedProjects.push({
            ...response.data[key],
            id: key
          })
        }
        dispatch(setProjectsInStore(fetchedProjects));
        dispatch(setShowSpin2(false));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        message.error('unable to fetch projects');
        console.error(error);
      })
  }
}
export const getPurchaseRequests = () => {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(setShowSpin1(true));
    axios.get('/purchaserequests.json')
      .then((response) => {
        const fetchedPurchaseRequests = [];
        for (const key in response.data) {
          if (response.data[key].isApproved === "APPROVED" && response.data[key].status !== 'ORDERED') {
            fetchedPurchaseRequests.push({
              ...response.data[key],
              id: key
            })
          }
        }
        dispatch(setShowSpin1(false));
        dispatch(setLoading(false));
        dispatch(setPurchaseRequests(fetchedPurchaseRequests))
      })
      .catch((error) => {
        dispatch(setLoading(false));
        message.error('Could not obtain purchase requests');
        console.error(error);
      })
  }
};

export const fetchPurchaseOrderId = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setShowSpin2(true));
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

  const fetchedPurchaseRequests = await axios.get('/purchaserequests.json');
  const purchaseRequests = []
  for (const key in fetchedPurchaseRequests.data) {
    purchaseRequests.push({
      ...fetchedPurchaseRequests.data[key],
      id: key
    })
  }
  const selectedPurchaseRequest = purchaseRequests.find((element) =>
    element.purchaseRequestNo === purchaseOrderData.purchaseRequestNo);

  const newPurchaseRequestOrders = [];
  for (const key in selectedPurchaseRequest.orders) {
    const orderFound = purchaseOrderData.orders.find((element) =>
      element.product === selectedPurchaseRequest.orders[key].product);
    if (orderFound === undefined) {
      newPurchaseRequestOrders.push({
        ...selectedPurchaseRequest.orders[key]
      })

    } else {
      const newQuantityLeft = selectedPurchaseRequest.orders[key].quantityLeft - orderFound.quantity
      newPurchaseRequestOrders.push({
        ...selectedPurchaseRequest.orders[key],
        quantityLeft: newQuantityLeft,
        purchaseOrderNo: purchaseOrderData.purchaseOrderNo
      })
    }
  }


  let prFlag = 0;
  let newPrStatus = 'PENDING';
  for (const key in newPurchaseRequestOrders) {
    if (newPurchaseRequestOrders[key].quantityLeft === 0 ||
      newPurchaseRequestOrders[key].quantityLeft === undefined) {
      prFlag += 1;
    }
  }

  if (prFlag === newPurchaseRequestOrders.length) {
    newPrStatus = 'ORDERED';
  }

  const newPurchaseRequest = {
    ...selectedPurchaseRequest,
    orders: newPurchaseRequestOrders,
    status: newPrStatus
  }

  const currentPurchaseOrderNo = await axios.get('/currentPurchaseOrderId.json');
  const updatedPurchaseOrderOrders = [];
  for (const key in purchaseOrderData.orders) {
    if (purchaseOrderData.orders[key].quantity !== 0) {
      updatedPurchaseOrderOrders.push({
        ...purchaseOrderData.orders[key],
      })
    }
  }
  console.log(purchaseOrderData);
  const newPurchaseOrderId = currentPurchaseOrderNo.data;
  const purchaseOrderNoDisplay = purchaseOrderData.purchaseOrderNo
  const purchaseOrderIdDisplay = purchaseOrderData.purchaseOrderNo
  const newPurchaseOrderData = {
    ...purchaseOrderData,
    orders: updatedPurchaseOrderOrders,
    purchaseOrderNo: purchaseOrderNoDisplay,
    dateCreated: newDate
  }
  const newPurchaseOrderNo = parseFloat(purchaseOrderIdDisplay) + 1
  try {

    await axios.put('/purchaserequests/' + selectedPurchaseRequest.id + '.json', newPurchaseRequest);
    //await axios.put('/currentPurchaseOrderId.json', newPurchaseOrderNo)
    await axios.post('/purchaseorders.json', newPurchaseOrderData);

    // console.log(response.data);
    dispatch(setLoading(false));
    dispatch(setShowSpin2(false));
    alert('Purchase order created!');
    dispatch(setOpenModal1(false));
    window.location.reload(false);

  } catch (error) {
    message.error('Failed to add purchase order');
    dispatch(setLoading(false));
    console.error(error);
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
    const response = await axios.get('/purchaserequests/' + data + '.json');
    // .then((response) => {
    //   dispatch(setShowSpin2(false));
    //   dispatch(setPurchaseRequest(response.data));
    // })
    dispatch(setShowSpin2(false));
    dispatch(setPurchaseRequest(response.data));
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

export const deletePurchaseOrder = (data) => async(dispatch) => {
  const newURL = 'purchaseorders/'+ data.id + '.json';

  try{
    
    const fetchedPurchaseOrder = data
    await axios.delete(newURL);
    dispatch(deletePurchaseOrderInStore(data.id, fetchedPurchaseOrder))
    dispatch(fetchPurchaseOrders());
    message.success('purchase order removed');


  }catch(error) {
    message.error('unable to delete purchase order');
    console.error(error);
  }

}

export const fetchWorksheet = () => async (dispatch) => {
  
  try{
    dispatch(setLoading(true));
    const result = await axios.get('/purchaseorders.json');
    console.log('result: ', result.data);
    const fetchedPurchaseOrders = [];
    for (const key in result.data) {
      fetchedPurchaseOrders.push({
        ...result.data[key],
        id: key
      })
    }

    dispatch(setLoading(false));

  } catch (error) {
    message.error('failed to fetch worksheet!');
    console.error(error);
    dispatch(setLoading(false));
  }
}
