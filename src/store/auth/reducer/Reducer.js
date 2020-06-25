import * as actions from '../ActionTypes';

const initialState = {
  signInData: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN:
      return {
        ...state,
        signInData: action.data,
      };
    default:
      return state;
  }
};

export default authReducer;
