import { Auth } from 'aws-amplify';
import { message } from 'antd';
import * as actionTypes from '../ActionTypes';

export const setSignIn = (data) => ({
  type: actionTypes.SIGN_IN,
  data,
});

export const signIn = (data) => async (dispatch) => {
  console.log('hello', data);
  const { username, password } = data;
  try {
    const user = await Auth.signIn(username, password);
    console.log(user);
  } catch (e) {
    message.error('theres an error logging in');
  }
  dispatch(setSignIn(data));
};
