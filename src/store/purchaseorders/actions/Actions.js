//import {API, graphqlOperation} from 'aws-amplify';
import {message} from 'antd';
//import {purchaseRequestDayCreatedAt} from '../../../graphql/queries';
import {setShowSpin1, setShowSpin2, setOpenModal1} from '../../ui/actions/Actions';
import {v4 as uuidv4} from 'uuid';
import * as actionTypes from '../ActionTypes';
import axios from '../../../axios-orders';

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

const setProjectInStore = (data) => ({
  type: actionTypes.FETCH_PROJECT,
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

export const setProject = (projectData) => {
  return dispatch => {
    dispatch(setProjectInStore(projectData));
  }
}

export const setPurchaseRequestData = (purchaseRequestId) => async (dispatch) => {
  try {
    const fetchedPurchaseRequest = await axios.get('/purchaserequests/' + purchaseRequestId + '.json');
    const newPurchaseRequest = fetchedPurchaseRequest.data
    dispatch(setPurchaseRequest(newPurchaseRequest));
  } catch (error) {
    message.error(error);
  }
}

export const fetchProjectForPurchaseOrder = (projectCodeData) => async (dispatch) => {
  const fetchedProjects = [];
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
  } catch (error) {
    message.error(error);
  }
}

export const setVendor = (vendorName) => async (dispatch) => {
  try {
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
    for (const key in fetchedPurchaseOrders) {
      if (fetchedPurchaseOrders[key].status === 'Pending') {
        pendingPurchaseOrders.push({
          ...fetchedPurchaseOrders[key],
          id: key
        })
      }
    }
    dispatch(fetchPurchaseOrdersToStore(fetchedPurchaseOrders, pendingPurchaseOrders));
    dispatch(setShowSpin2(false));
  } catch (error) {
    message.error('failed to retrieve purchase orders');
    console.error(error);
    dispatch(setShowSpin2(false));
  }
}
export const getProjects = () => {
  return dispatch => {

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
      })
      .catch((error) => {
        message.error('unable to fetch projects');
        console.error(error);
      })
  }
}
export const getPurchaseRequests = () => {
  return dispatch => {
    dispatch(setShowSpin1(true));
    axios.get('/purchaserequests.json')
      .then((response) => {
        const fetchedPurchaseRequests = [];
        for (const key in response.data) {
          if (response.data[key].isApproved==="APPROVED" && response.data[key].status !== 'ORDERED') {
            fetchedPurchaseRequests.push({
              ...response.data[key],
              id: key
            })
          }
        }
        dispatch(setShowSpin1(false));
        dispatch(setPurchaseRequests(fetchedPurchaseRequests))
      })
      .catch((error) => {
        message.error('Could not obtain purchase requests');
        console.error(error);
      })
    // try {
    //   if (data) {
    //     dispatch(setShowSpin1(true));
    //     const queryData = await API.graphql(graphqlOperation(searchPurchaseRequests, {
    //       filter:
    //         {
    //           purchaseRequestNo:
    //             {
    //               matchPhrasePrefix: data
    //             }
    //         },
    //       limit: 5
    //     }));
    //     const purchaseRequests = queryData.data.searchPurchaseRequests.items;
    //     if (purchaseRequests.length) {
    //       dispatch(setPurchaseRequests(purchaseRequests));
    //       dispatch(setShowSpin1(false));
    //     }
    //   }

  // } catch (e) {
  //   console.error(e)
  //   dispatch(setShowSpin1(false));
  //   message.error('Error getting Purchase Request!');
  // }
  }
};

export const fetchPurchaseOrderId = () => async (dispatch) => {
  dispatch(setShowSpin2(true));
  try {
    const response = await axios.get('/currentPurchaseOrderId.json');
    dispatch(fetchPurchaseOrderIdInStore(response.data));
    dispatch(setShowSpin2(false));
  } catch (error) {
    message.error('failed to fetch purchase order id');
    console.error(error);
    dispatch(setShowSpin2(false));
  }
}

export const addPurchaseOrder = (purchaseOrderData) => async (dispatch) => {
  dispatch(setShowSpin2(true));
  // const newUnitPrice =  parseFloat(purchaseOrderData.unitPrice.split(',').join(''));
  // const newItemTotal = parseFloat(purchaseOrderData.itemTotal.split(',').join(''))
  const newOrders = [];
  for (const key in purchaseOrderData.orders) {
    const newUnitPrice = parseFloat(purchaseOrderData.orders[key].unitPrice.split(',').join(''));
    const newItemTotal = parseFloat(purchaseOrderData.orders[key].itemTotal.split(',').join(''));
    newOrders.push({
      quantity: purchaseOrderData.orders[key].quantityLeft,
      id: purchaseOrderData.orders[key].id,
      category: purchaseOrderData.orders[key].category,
      product: purchaseOrderData.orders[key].product,
      unit: purchaseOrderData.orders[key].unit,
      unitPrice: newUnitPrice,
      didReceive: false,
      itemTotal: newItemTotal
    })
  }
  const newPurchaseRequestOrders = purchaseOrderData.prOrders;
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
    ...purchaseOrderData.purchaseRequest,
    orders: newPurchaseRequestOrders,
    status: newPrStatus
  }

  const newPurchaseOrderData = {
    purchaseOrderNo: purchaseOrderData.purchaseOrderNo,
    purchaseOrderId: purchaseOrderData.currentId,
    orders: newOrders,
    dateCreated: purchaseOrderData.dateCreated,
    project: purchaseOrderData.project,
    purchaseRequestNo: purchaseOrderData.purchaseRequestNo,
    requestedBy: purchaseOrderData.requestedBy,
    vendor: purchaseOrderData.vendor,
    addNotes: purchaseOrderData.addNotes,
    status: "Pending",
    isApproved: true
  }
  const newPurchaseOrderNo = purchaseOrderData.currentId + 1;
  try {

    await axios.put('/purchaserequests/' + purchaseOrderData.prId + '.json', newPurchaseRequest);
    await axios.put('/currentPurchaseOrderId.json', newPurchaseOrderNo)
    await axios.post('/purchaseorders.json', newPurchaseOrderData);

    // console.log(response.data);
    dispatch(setShowSpin2(false));
    alert('Purchase order created!');
    dispatch(setOpenModal1(false));
    window.location.reload(false);

  } catch (error) {
    message.error('Failed to add purchase order');
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
