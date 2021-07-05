import { message } from "antd";
import * as actionTypes from "../ActionTypes";
import axios from "../../../axios-orders";
import OPC from '../../../api/OPC';

const createMRRToStore = (data) => ({
  type: actionTypes.CREATE_MMR,
  data,
});

const fetchPurchaseOrdersToStore = (data) => ({
  type: actionTypes.FETCH_PURCHASEORDERS,
  data,
});

const setPurchaseOrderToStore = (data) => ({
  type: actionTypes.SET_PURCHASEORDER,
  data,
});

const setLoading = (data) => ({
  type: actionTypes.SET_LOADING,
  data,
});

const fetchProjectsToStore = (data) => ({
  type: actionTypes.FETCH_PROJECTS,
  data,
});

const setCategoriesToStore = (data) => ({
  type: actionTypes.SET_CATEGORIES,
  data,
});

export const setValid = (data) => ({
  type: actionTypes.SET_VALID,
  data,
});

const setProject = (data) => ({
  type: actionTypes.SET_PROJECT,
  data,
});

export const createMRR = (MRR) => {};

export const setMRR = (data) => ({
  type: actionTypes.SET_MRR,
  data,
});

export const fetchProjects = () => async (dispatch) => {
  try {
    const result = await axios.get("/projects.json");
    const fetchedProjects = [];
    for (const key in result.data) {
      fetchedProjects.push({
        ...result.data[key],
        id: key,
      });
    }
    dispatch(fetchProjectsToStore(fetchedProjects));
    dispatch(setLoading(false));
  } catch (error) {
    message.error("Unable to fetch projects");
    console.error(error);
    dispatch(setLoading(false));
  }
};

export const fetchPurchaseOrders = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await OPC.get('/purchase_order_pending');
    console.log(result.data);

    dispatch(fetchPurchaseOrdersToStore(result.data));
    dispatch(setLoading(false));
  } catch (error) {
    message.error("Unable to fetch purchase orders!");
    console.error(error);
    dispatch(setLoading(false));
  }
};

export const setPurchaseOrder = (data) => async (dispatch) => {
  dispatch(setPurchaseOrderToStore(data));
  // try {
  //   dispatch(setLoading(true));
  //   const result = await axios.get('/purchaseorders/' + data + '.json');
  //   const fetchedPurchaseOrder = result.data;
  //   dispatch(setPurchaseOrderToStore(fetchedPurchaseOrder));
  //   dispatch(setLoading(false));

  // } catch (error) {
  //   message.error('unable to fetch purchase order');
  //   console.error(error);
  //   dispatch(setLoading(false));
  // }
};

export const createMMR = () => async (dispatch, getState) => {
  const materialsReceiving = getState().materialsReceiving.materialsReceiving;
  const selectedPurchaseOrder = getState().materialsReceiving.purchaseOrder;
  const selectedProject = getState().materialsReceiving.project;
  console.log("materialsReceiving: ", materialsReceiving);
  console.log("selectedPurchaseOrder: ", selectedPurchaseOrder);
  console.log("project: ", selectedProject);
};

export const setCategories = (data) => async (dispatch) => {
  try {
    console.log("data: ", data);
    const result = await axios.get("/projects.json");
    const fetchedProjects = [];
    for (const key in result.data) {
      fetchedProjects.push({
        ...result.data[key],
        id: key,
      });
    }
    const foundProject = fetchedProjects.find(
      (element) => element.projectCode === data
    );
    dispatch(setProject(foundProject));
    dispatch(fetchProjectsToStore(foundProject));

    const categories = [];

    for (const budgetCost in foundProject.budget.budgetCost) {
      for (const subCategories in foundProject.budget.budgetCost[budgetCost]
        .subCategories) {
        for (const subCategoryItems in foundProject.budget.budgetCost[
          budgetCost
        ].subCategories[subCategories].subCategoryItem) {
          const newCategories =
            foundProject.budget.budgetCost[budgetCost].itemCode +
            "." +
            foundProject.budget.budgetCost[budgetCost].subCategories[
              subCategories
            ].itemCode +
            "." +
            foundProject.budget.budgetCost[budgetCost].subCategories[
              subCategories
            ].subCategoryItem[subCategoryItems].itemCode;
          categories.push(newCategories);
        }
      }
    }
    console.log("categories: ", categories);
    dispatch(setCategoriesToStore(categories));

    dispatch(setLoading(false));
  } catch (error) {
    message.error("Unable to fetch projects");
    console.error(error);
    dispatch(setLoading(false));
  }
};
