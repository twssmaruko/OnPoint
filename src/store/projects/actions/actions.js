import * as actionTypes from '../actionTypes';
import axios from '../../../axios-orders';
import {setShowSpin2} from '../../ui/actions/Actions';
import {message} from 'antd';

export const applyBudgetCostToStore = (data) => ({
  type: actionTypes.ADD_BUDGETCOST,
  data: data //where data is basically updatedBudgetCost
})

const updateBudgetPrice = (data) => ({
  type: actionTypes.UPDATE_BUDGET_PRICE,
  data: data
})

const updateProfit = (data) => ({
  type: actionTypes.UPDATE_PROFIT,
  data: data
})

const updateProfitMargin = (data) => ({
  type: actionTypes.UPDATE_PROFIT_MARGIN,
  data: data
})

const setProjectIdInStore = (data) => ({
  type: actionTypes.SET_PROJECT_ID,
  data
})

export const updateProjectCode = (data) => ({
  type: actionTypes.UPDATE_PROJECT_CODE,
  data: data
})

export const updateClient = (data) => ({
  type: actionTypes.UPDATE_CLIENT,
  data: data
})

export const updateProjectName = (data) => ({
  type: actionTypes.UPDATE_PROJECT_NAME,
  data: data
})

export const updateLocation = (data) => ({
  type: actionTypes.UPDATE_LOCATION,
  data: data
})

export const addBudgetCost = () => (dispatch, getState) => {

  const oldBudgetCost = getState().project.project.budget.budgetCost; /// basically getting ra the current value of your budgetcost sa 'store'
  //const oldBudgetCostCount = getState().project.budget.budgetCostCount;


  const budgetCostToBeAdded = {
    itemCode: '',
    name: '',
    subCategoriesCount: 0,
    amountSpent: 0,
    totalCost: 0,
    subCategories: []
  }
  const updatedBudgetCost = oldBudgetCost.concat(budgetCostToBeAdded);
  // const updatedBudgetCostCount = oldBudgetCostCount + 1;
  //dispatch (incrementBudgetCostCount(updatedBudgetCostCount))
  dispatch (applyBudgetCostToStore(updatedBudgetCost))
}

export const updateBudgetCostInStore = (data) => ({
  type: actionTypes.UPDATE_BUDGETCOST,
  data: data
})

export const updateBudgetCostCode = (index, data) => (dispatch, getState) => {
  const updatedBudgetCost = getState().project.project.budget.budgetCost[index];
  const allBudgetCosts = getState().project.project.budget.budgetCost;

  updatedBudgetCost.itemCode = data
  allBudgetCosts[index] = updatedBudgetCost;

  dispatch(updateBudgetCostInStore(allBudgetCosts));
}

export const updateBudgetCostName = (index, data) => (dispatch, getState) => {
  const updatedBudgetCost = getState().project.project.budget.budgetCost[index];
  const allBudgetCosts = getState().project.project.budget.budgetCost;

  updatedBudgetCost.name = data
  allBudgetCosts[index] = updatedBudgetCost;

  dispatch(updateBudgetCostInStore(allBudgetCosts));
}

export const addSubCategory = (index) => (dispatch, getState) => {
  const oldSubCategory = getState().project.project.budget.budgetCost[index].subCategories;

  const subCategoryToBeAdded = {
    itemCode: '',
    name: '',
    subCategoryItemCount: 0,
    amountSpent: 0,
    totalCost: 0,
    subCategoryItem: []
  };

  const updatedSubCategories = oldSubCategory.concat(subCategoryToBeAdded);
  const allBudgetCosts = getState().project.project.budget.budgetCost;
  allBudgetCosts[index].subCategories = updatedSubCategories;
  allBudgetCosts[index].subCategoriesCount += 1;
  dispatch(updateBudgetCostInStore(allBudgetCosts));
}

export const updateSubCategoryCode = (index, data) => (dispatch, getState) => {
  const updatedBudgetCost = getState().project.project.budget.budgetCost[index.budgetCostIndex];
  const allBudgetCosts = getState().project.project.budget.budgetCost;

  updatedBudgetCost.subCategories[index.subCategoriesIndex].itemCode = data;
  allBudgetCosts[index.budgetCostIndex] = updatedBudgetCost;
  dispatch(updateBudgetCostInStore(allBudgetCosts));
}

export const updateSubCategoryName = (index, data) => (dispatch, getState) => {

  const updatedBudgetCost = getState().project.project.budget.budgetCost[index.budgetCostIndex];
  const allBudgetCosts = getState().project.project.budget.budgetCost;

  updatedBudgetCost.subCategories[index.subCategoriesIndex].name = data;
  allBudgetCosts[index.budgetCostIndex] = updatedBudgetCost;
  dispatch(updateBudgetCostInStore(allBudgetCosts));

}
export const addSubCategoryItem = (index) => (dispatch, getState) => {
  const oldSubCategoryItem = getState().project.project.budget
    .budgetCost[index.budgetCostIndex]
    .subCategories[index.subCategoriesIndex].subCategoryItem;

  const subCategoryItemIndex = getState().project.project.budget
    .budgetCost[index.budgetCostIndex]
    .subCategories[index.subCategoriesIndex].subCategoryItemCount;

  const projectState = getState().project.project;
  const categoryNumber = subCategoryItemIndex + 1;
  const categoryName = projectState.budget.budgetCost[index.budgetCostIndex].itemCode + '.' +
  projectState.budget.budgetCost[index.budgetCostIndex].subCategories[index.subCategoriesIndex].itemCode + '.' + categoryNumber

  const subCategoryItemToBeAdded = {
    itemCode: '',
    name: '',
    category: categoryName,
    amountSpent: 0,
    cost: 0,
    index: subCategoryItemIndex
  };

  const updatedSubCategoriesItem = oldSubCategoryItem.concat(subCategoryItemToBeAdded);
  const allBudgetCosts = getState().project.project.budget.budgetCost;

  allBudgetCosts[index.budgetCostIndex]
    .subCategories[index.subCategoriesIndex]
    .subCategoryItem = updatedSubCategoriesItem

  allBudgetCosts[index.budgetCostIndex]
    .subCategories[index.subCategoriesIndex]
    .subCategoryItemCount += 1;



  dispatch(updateBudgetCostInStore(allBudgetCosts));
}

export const updateSubCategoryItemName = (index, data) => (dispatch, getState) => {
  const updatedBudgetCost = getState().project.project.budget.budgetCost[index.budgetCostIndex];
  const allBudgetCosts = getState().project.project.budget.budgetCost;

  updatedBudgetCost.subCategories[index.subCategoriesIndex]
    .subCategoryItem[index.subCategoryItemIndex].name = data;

  updatedBudgetCost.subCategories[index.subCategoriesIndex]
    .subCategoryItem[index.subCategoryItemIndex].itemCode = index.subCategoryItemNo;

  allBudgetCosts[index.budgetCostIndex] = updatedBudgetCost;
  dispatch(updateBudgetCostInStore(allBudgetCosts));
}

export const updateSubCategoryItemCost = (index, data) => (dispatch, getState) => {
  const updatedBudgetCost = getState().project.project.budget.budgetCost[index.budgetCostIndex];
  const allBudgetCosts = getState().project.project.budget.budgetCost;
  const inputValue = data;

  updatedBudgetCost.subCategories[index.subCategoriesIndex]
    .subCategoryItem[index.subCategoryItemIndex].cost = parseFloat(inputValue);
  //SUBCATEGORY TOTAL COST
  let subCategoryTotalCost = 0;

  allBudgetCosts[index.budgetCostIndex]
    .subCategories[index.subCategoriesIndex]
    .subCategoryItem.forEach((e) => {
      subCategoryTotalCost += e.cost
    });
  //
  //BUDGET COST TOTAL COST

  let budgetCostTotalCost = 0;

  allBudgetCosts[index.budgetCostIndex].subCategories.forEach((e) => {
    budgetCostTotalCost += e.totalCost
  })
  //
  //BUDGET PRICE
  let budgetPrice = 0;
  allBudgetCosts.forEach((e) => {
    budgetPrice += e.totalCost;
  })
  //
  // PROFIT
  const contractPrice = parseFloat(getState().project.project.budget.contractPrice);
  const profit = contractPrice - budgetPrice;
  //
  //PROFIT MARGIN
  const profitMargin = Math.round(profit/contractPrice * 10000) / 100;
  //
  allBudgetCosts[index.budgetCostIndex] = updatedBudgetCost;
  allBudgetCosts[index.budgetCostIndex]
    .subCategories[index.subCategoriesIndex]
    .totalCost = Math.round(subCategoryTotalCost * 100)/100;

  allBudgetCosts[index.budgetCostIndex]
    .totalCost = Math.round(budgetCostTotalCost * 100)/100;

  budgetPrice= Math.round(budgetPrice * 100) / 100;
  dispatch(updateBudgetPrice(budgetPrice));
  dispatch(updateProfit(profit));
  dispatch(updateProfitMargin(profitMargin));
  dispatch(updateBudgetCostInStore(allBudgetCosts));
}

export const updateContractPrice = (data) => ({
  type: actionTypes.UPDATE_CONTRACT_PRICE,
  data: data
})

const fetchProjectsStart = () => ({
  type: actionTypes.FETCH_PROJECTS_START
})

const fetchProjectsSuccess = (projects) => ({
  type: actionTypes.FETCH_PROJECTS_SUCCESS,
  projects
})

const fetchProjectsFail = (error) => ({
  type: actionTypes.FETCH_PROJECTS_FAIL,
  error
})

export const fetchProjects = () => async (dispatch) => {
  dispatch(fetchProjectsStart());
  await axios.get('/projects.json')
    .then((res) => {
      const fetchedProjects = [];
      for (const key in res.data) {
        fetchedProjects.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchProjectsSuccess(fetchedProjects));
    })
    .catch((err) => {
      dispatch(fetchProjectsFail(err))
    })
}
const createProjectStart = () => ({
  type: actionTypes.CREATE_PROJECT_START
})

const createProjectSuccess = (id, projectData) => ({
  type: actionTypes.CREATE_PROJECT_SUCCESS,
  projectId: id,
  projectData
})

const createProjectFail = (error) => ({
  type: actionTypes.CREATE_PROJECT_FAIL,
  error
})

const fetchSelectedProjectToStore = (data) => ({
  type: actionTypes.FETCH_SELECTED_PROJECT,
  data
})

export const createProject = (projectData) => async (dispatch) => {
  dispatch(createProjectStart());
  await axios.post('/projects.json', projectData)
    .then((response) => {
    // eslint-disable-next-line no-console
      console.log(response.data);
      dispatch(createProjectSuccess(response.data.name, projectData));
    })
    .catch((error) => {
      dispatch(createProjectFail(error));
    });
}

export const setProjectId = (projectId) => async (dispatch) => {
  dispatch(setShowSpin2(true));
  const newProjectId = {
    projectId: projectId
  }
  try {
    await axios.put('/currentProjectId.json',newProjectId);
    dispatch(setProjectIdInStore(projectId));
  } catch (error) {
    message.error('oops');
    console.error(error);
  }
}

export const fetchSelectedProject = (projectId) => async (dispatch) => {

  dispatch(setShowSpin2(true));
  try {
    const response = await axios.get('/projects/' + projectId + '.json');
    dispatch(fetchSelectedProjectToStore(response.data));
    dispatch(setShowSpin2(false));
  } catch (error) {
    message.error('Failed to fetch selected project');
    console.error(error);
    dispatch(setShowSpin2(false));
  }
}