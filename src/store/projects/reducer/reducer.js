import * as actionTypes from '../actionTypes';

const initialState = {
  budget: {
    contractPrice: 0,
    budgetPrice: 0,
    profit: 0,
    profitMargin: '0%',
    budgetCost: [
      {
        itemCode: '',
        name: '',
        subCategories: [
          {
            itemCode: '',
            name: '',
            subCategoryItem: [
              {
                itemNo: '',
                name: '',
                cost: 0
              }
            ],
            totalCost: 0
          }
        ],
        totalCost: 0
      }
    ]
  }
}

const projectReducer = (state = initialState, action) => {

  switch (action.type) {
  case actionTypes.ADD_BUDGETCOST: {
    return {
      ...state,
      budget: {...state.budget,
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
  }
}

export default projectReducer;