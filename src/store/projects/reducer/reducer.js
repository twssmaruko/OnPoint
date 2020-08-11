import * as actionTypes from '../actionTypes';

const initialState = {
  key: '',
  budget: {
    contractPrice: 0,
    budgetPrice: 0,
    profit: 0,
    profitMargin: '0%',
    budgetCost: [],
    budgetCostCount: 0
  },
  loading: false
}

const projectReducer = (state = initialState, action) => {

  switch (action.type) {
  case actionTypes.ADD_BUDGETCOST: {
    return {
      ...state,
      budget: {...state.budget,
        budgetCostCount: state.budget.budgetCostCount + 1,
        budgetCost: action.data}
    };
  }
  case actionTypes.UPDATE_CONTRACT_PRICE:
    return {
      ...state,
      budget: {...state.budget,
        contractPrice: action.data
      }
    }
  case actionTypes.UPDATE_BUDGETCOST:
    return {
      ...state,
      budget: {...state.budget,
        budgetCost: action.data}
    }
  case actionTypes.UPDATE_BUDGET_PRICE:
    return {
      ...state,
      budget: {...state.budget,
        budgetPrice: action.data}
    }
  case actionTypes.UPDATE_PROFIT:
    return {
      ...state,
      budget: {...state.budget,
        profit: action.data}
    }
  case actionTypes.UPDATE_PROFIT_MARGIN:
    return {
      ...state,
      budget: {...state.budget,
        profitMargin: action.data}
    }
  case actionTypes.CREATE_PROJECT_START:
    return {
      ...state,
      loading: false
    }
  case actionTypes.CREATE_PROJECT_SUCCESS:
    return {
      ...state,
      loading: false
    }
  case actionTypes.CREATE_PROJECT_FAIL:
    return {
      ...state,
      loading: false
    }
  case actionTypes.FETCH_PROJECTS_START:
    return {
      ...state,
      loading: false
    }
  case actionTypes.FETCH_PROJECTS_SUCCESS:
    return {
      ...state,
      budget: action.data,
      loading: false
    }
  case actionTypes.FETCH_PROJECTS_FAIL:
    return {
      ...state,
      loading: false
    }
  default: return state;
  }
}

export default projectReducer;