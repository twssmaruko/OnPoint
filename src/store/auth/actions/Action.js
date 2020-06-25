import * as actionTypes from '../ActionTypes';

export const setSignIn = (data) => ({
  type: actionTypes.SIGN_IN,
  data,
});

export const signIn = (data) => {
  console.log('hello', data);
  return (dispatch) => {
    dispatch(setSignIn(data));
  };
};
