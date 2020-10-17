import * as actionTypes from '../actionTypes';
import {updateObject} from '../../utility';

const initialState = {
  key: '',
  projectId: 'Please select a Project',
  selectedProject: {
    projectCode: '',
    clientName: '',
    projectName: '',
    location: '',
    budget: {
      contractPrice: 0,
      budgetPrice: 0,
      profit: 0,
      profitMargin: '0%',
      budgetCost: [
        {
          amountSpent: 0,
          itemCode: '',
          name: '',
          subCategoriesCount: 0,
          totalCost: 0,
          subCategories: [
            {
              amountSpent: 0,
              itemCode: '',
              name: '',
              subCategoryItemCount: 0,
              totalCost: 0,
              subCateogryItem: [
                {
                  amountSpent: 0,
                  category: '',
                  cost: 0,
                  index: 0,
                  itemCode: 1,
                  name: ''
                }
              ]
            }
          ]
        }
      ],
      budgetCostCount: 0
    }
  },
  projects: [],
  project: {
    projectCode: '',
    clientName: '',
    projectName: '',
    location: '',
    budget: {
      contractPrice: 0,
      budgetPrice: 0,
      profit: 0,
      profitMargin: '0%',
      budgetCost: [],
      budgetCostCount: 0
    }
  },
  loading: false
}

const addBudgetCost = (state, action) =>  {
  const newBudgetCost = {...state,
    project: {...state.project,
      budget: {...state.project.budget,
        budgetCostCount: state.project.budget.budgetCostCount + 1,
        budgetCost: action.data}
    }};
  return updateObject(state, newBudgetCost)

};

const updateContractPrice = (state, action) => {
  const newContractPrice = {...state,
    project: {
      ...state.project,
      budget: {...state.project.budget,
        contractPrice: action.data
      }
    }};
  return updateObject(state, newContractPrice);
}

const updateBudgetCost = (state, action) => {
  const updatedBudgetCost = {...state,
    project: {...state.project,
      budget: {
        ...state.project.budget,
        budgetCost: action.data
      }}}
  return updateObject(state, updatedBudgetCost);
}

const updateBudgetPrice = (state, action) => {
  const updatedBudgetPrice = {...state,
    project: {...state.project,
      budget: {...state.project.budget,
        budgetPrice: action.data}
    }
  }
  return updateObject(state, updatedBudgetPrice);
}

const updateProfit = (state, action) => {
  const updatedProfit = {
    ...state,
    project: {...state.project,
      budget: {...state.project.budget,
        profit: action.data}
    }
  }
  return updateObject(state, updatedProfit);
}

const updateProfitMargin = (state, action) => {
  const updatedProfitMargin = {
    ...state,
    project: {...state.project,
      budget: {...state.project.budget,
        profitMargin: action.data}
    }
  }
  return updateObject(state, updatedProfitMargin);
}

const createProjectStart = (state) => updateObject(state, {loading: true})


const createProjectSuccess = (state, action) => {
  const newProject = updateObject(action.projectData, {id: action.projectId});
  return updateObject(state, {
    loading: false,
    projects: state.projects.concat(newProject)
  });
}

const setProjectId = (state, action) => updateObject(state, {projectId: action.data});

const createProjectFail = (state) => updateObject(state, {loading: false})


const fetchProjectsStart = (state) => updateObject(state, {loading: true})

const fetchSelectedProject = (state, action) => updateObject(state, {
  selectedProject: action.data
})
const fetchProjectsSuccess = (state, action) => updateObject(state, {
  projects: action.projects,
  loading: false
});

const fetchProjectsFail = (state) => updateObject(state, {loading: false})

const updateClient = (state, action) => {
  const updatedClient = {...state,
    project: {
      ...state.project,
      clientName: action.data
    }}
  return updateObject(state, updatedClient)
}

const updateProjectName = (state, action) => {
  const updatedProjectName = {...state,
    project: {
      ...state.project,
      projectName: action.data
    }}
  return updateObject(state, updatedProjectName);
}

const updateLocation = (state, action) => {
  const updatedLocation = {
    ...state,
    project: {
      ...state.project,
      location: action.data
    }
  }
  return updateObject(state, updatedLocation);
}

const updateProjectCode = (state, action) => {
  const updatedProjectCode = {
    ...state,
    project: {
      ...state.project,
      projectCode: action.data
    }
  };
  return updateObject(state, updatedProjectCode);
}

const projectReducer = (state = initialState, action) => {

  switch (action.type) {
  case actionTypes.ADD_BUDGETCOST: return addBudgetCost(state, action)
  case actionTypes.UPDATE_CONTRACT_PRICE: return updateContractPrice(state, action)
  case actionTypes.UPDATE_BUDGETCOST: return updateBudgetCost(state, action)
  case actionTypes.UPDATE_BUDGET_PRICE: return updateBudgetPrice(state, action)
  case actionTypes.UPDATE_PROFIT: return updateProfit(state, action)
  case actionTypes.UPDATE_PROFIT_MARGIN: return updateProfitMargin(state, action)
  case actionTypes.CREATE_PROJECT_START: return createProjectStart(state)
  case actionTypes.CREATE_PROJECT_SUCCESS: return createProjectSuccess(state, action)
  case actionTypes.CREATE_PROJECT_FAIL: return createProjectFail(state)
  case actionTypes.FETCH_PROJECTS_START: return fetchProjectsStart(state)
  case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action)
  case actionTypes.FETCH_PROJECTS_FAIL: return fetchProjectsFail(state)
  case actionTypes.UPDATE_CLIENT: return updateClient(state, action)
  case actionTypes.UPDATE_PROJECT_NAME: return updateProjectName(state, action)
  case actionTypes.UPDATE_LOCATION: return updateLocation(state, action)
  case actionTypes.UPDATE_PROJECT_CODE: return updateProjectCode(state, action)
  case actionTypes.SET_PROJECT_ID: return setProjectId(state, action);
  case actionTypes.FETCH_SELECTED_PROJECT: return fetchSelectedProject(state, action);
  default: return state;
  }
}

// const projectReducer = (state = initialState, action) => {

//   switch (action.type) {
//   case actionTypes.ADD_BUDGETCOST: {
//     return {
//       ...state,
//       project: {...state.project,
//         budget: {...state.project.budget,
//           budgetCostCount: state.project.budget.budgetCostCount + 1,
//           budgetCost: action.data}
//       }
//     };
//   }
//   case actionTypes.UPDATE_CONTRACT_PRICE:
//     return {
//       ...state,
//       project: {...state.project,
//         budget: {...state.project.budget,
//           contractPrice: action.data
//         }
//       }
//     }
//   case actionTypes.UPDATE_BUDGETCOST:
//     return {
//       ...state,
//       project: {...state.project,
//         budget: {...state.project.budget,
//           budgetCost: action.data}
//       }
//     }
//   case actionTypes.UPDATE_BUDGET_PRICE:
//     return {
//       ...state,
//       project: {...state.project,
//         budget: {...state.project.budget,
//           budgetPrice: action.data}
//       }
//     }
//   case actionTypes.UPDATE_PROFIT:
//     return {
//       ...state,
//       project: {...state.project,
//         budget: {...state.project.budget,
//           profit: action.data}
//       }
//     }
//   case actionTypes.UPDATE_PROFIT_MARGIN:
//     return {
//       ...state,
//       project: {...state.project,
//         budget: {...state.project.budget,
//           profitMargin: action.data}
//       }
//     }
//   case actionTypes.CREATE_PROJECT_START:
//     return {
//       ...state,
//       loading: false
//     }
//   case actionTypes.CREATE_PROJECT_SUCCESS:
//     return {
//       ...state,
//       loading: false
//     }
//   case actionTypes.CREATE_PROJECT_FAIL:
//     return {
//       ...state,
//       loading: false
//     }
//   case actionTypes.FETCH_PROJECTS_START:
//     return {
//       ...state,
//       loading: false
//     }
//   case actionTypes.FETCH_PROJECTS_SUCCESS:
//     return {
//       ...state,
//       projects: action.projects,
//       loading: false
//     }
//   case actionTypes.FETCH_PROJECTS_FAIL:
//     return {
//       ...state,
//       loading: false
//     }
//   case actionTypes.UPDATE_CLIENT:
//     return {
//       ...state,
//       project: {
//         ...state.project,
//         clientName: action.data
//       }
//     }
//   case actionTypes.UPDATE_PROJECT_NAME:
//     return {
//       ...state,
//       project: {
//         ...state.project,
//         projectName: action.data
//       }
//     }
//   case actionTypes.UPDATE_LOCATION:
//     return {
//       ...state,
//       project: {
//         ...state.project,
//         location: action.data
//       }
//     }
//   case actionTypes.UPDATE_PROJECT_CODE:
//     return {
//       ...state,
//       project: {
//         ...state.project,
//         projectCode: action.data
//       }
//     }
//   default: return state;
//   }
// }

export default projectReducer;