

export const applyBudgetCostToStore = (data) => ({
  type: actionTypes.ADD_BUDGETCOST,
  data: data //where data is basically updatedBudgetCost
})


export const addBudgetCost = (newBudgetCostfromUi) => async (dispatch, getState) => {

  const oldBudgetCost = getState().budget.budgetCost; /// basically getting ra the current value of your budgetcost sa 'store'

  const updatedBudgetCost = oldBudgetCost.concat(newBudgetCostfromUi);

  dispatch (applyBudgetCostToStore(updatedBudgetCost))
}

return {
  ...state,
  budget: {...state.budget,
    budgetCost: action.data}
}