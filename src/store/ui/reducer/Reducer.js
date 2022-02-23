import * as actions from '../ActionTypes';

const initialState = {
  openModal1: false,
  openModal2: false,
  openModal3: false,
  openModal4: false,
  openModal5: false,
  gasOrderModal: false,
  gasDocModal: false,
  showSpin1: false,
  showSpin2: false,
  showSpin3: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_OPENMODAL1:
    return {
      ...state,
      openModal1: action.data
    };
  case actions.SET_OPENMODAL2:
    return {
      ...state,
      openModal2: action.data
    };
    case actions.SET_OPENMODAL3:
    return {
      ...state,
      openModal3: action.data
    };
    case actions.SET_OPENMODAL4:
    return {
      ...state,
      openModal4: action.data
    };
    case actions.SET_OPENMODAL5:
      return {
        ...state,
        openModal5: action.data
      };
  case actions.SET_SHOWSPIN1:
    return {
      ...state,
      showSpin1: action.data
    };
  case actions.SET_SHOWSPIN2:
    return {
      ...state,
      showSpin2: action.data
    };
  case actions.SET_SHOWSPIN3:
    return {
      ...state,
      showSpin3: action.data
    };
  case actions.SET_OPENGASORDERMODAL:
    return {
      ...state,
      gasOrderModal: action.data
    }
  case actions.SET_OPENGASDOCMODAL:
    return {
      ...state,
      gasDocModal: action.data
    }
  default:
    return state;
  }
};

export default ui;
