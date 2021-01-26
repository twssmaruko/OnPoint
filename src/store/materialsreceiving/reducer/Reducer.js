import * as actions from '../ActionTypes';
import {updateObject} from '../../utility';

const initialState = {
  purchaseOrderNo: '',
  loading: false,
  projects: '',
  categories: [],
  materialsReceiving: {
    materialsReceivingNo: '',
    purchaseOrderNo: '',
    orders: [
      {
        product: '',
        unit: '',
        quantityReceived: '',
        unitPrice: 0,
        category: '',
        receivedSoFar: 0

      }
    ],
    deliveryDate: '',
    deliveryTime: '',
    deliveredBy: 'Engr Jojo Salamanes',
    project: ''
  },
  purchaseOrders: [],
  purchaseOrder: {}
};

const createMMR = (state, action) => updateObject(state, {
  materialsReceiving: action.data
})

const fetchPurchaseOrders = (state, action) => updateObject(state, {
  purchaseOrders: action.data
})

const setPurchaseOrder = (state, action) => updateObject(state, {
  purchaseOrder: action.data
})

const setLoading = (state, action) => updateObject(state, {
  loading: action.data
})

const setMRR = (state, action) => updateObject(state, {
  materialsReceiving: action.data
})

const fetchProjects = (state, action) => updateObject(state, {
  projects: action.data
})

const setCategories = (state, action) => updateObject(state, {
  categories: action.data
})

const materialsReceivingReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.CREATE_MMR: return createMMR(state, action)
  case actions.FETCH_PURCHASEORDERS: return fetchPurchaseOrders(state, action);
  case actions.SET_PURCHASEORDER: return setPurchaseOrder(state, action);
  case actions.SET_MRR: return setMRR(state, action);
  case actions.SET_LOADING: return setLoading(state, action);
  case actions.FETCH_PROJECTS: return fetchProjects(state, action);
  case actions.SET_CATEGORIES: return setCategories(state, action);
  default: return state;
  }
}

export default materialsReceivingReducer;