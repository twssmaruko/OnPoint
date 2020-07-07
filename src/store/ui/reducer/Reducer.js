import * as actions from '../ActionTypes';

const initialState = {
  openModal: false,
  openAnotherModal: false,
  showSpin: false,
  tableSpin: false,
  modalSpin: false,
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_OPENMODAL:
      return {
        ...state,
        openModal: action.data,
      };
    case actions.SET_SHOWSPIN:
      return {
        ...state,
        showSpin: action.data,
      };
    case actions.SET_TABLESPIN:
      return {
        ...state,
        tableSpin: action.data,
      };
    case actions.SET_MODALSPIN:
      return {
        ...state,
        modalSpin: action.data,
      };
    case actions.SET_OPENANOTHERMODAL:
      return {
        ...state,
        openAnotherModal: action.data,
      };
    default:
      return state;
  }
};

export default ui;
