import {Auth} from 'aws-amplify';
import {message} from 'antd';
import * as actionTypes from '../ActionTypes';

export const setUser = (data) => ({
    type: actionTypes.SET_USER,
    data
});

export const signIn = (data) => async (dispatch) => {
    try {
        const {username, password} = data.values;
        const {history} = data.props;
        const user = await Auth.signIn(username, password);
        message.success('Log in Succesful!');
        dispatch(setUser(user));
        history.push('/');
    } catch (e) {
        message.error(e);
    }
};

export const signOut = () => async (dispatch) => {
    try {
        await Auth.signOut();
        dispatch(setUser(null));
    } catch (e) {
        message.error(e);
    }
};

export const checkAuth = () => async (dispatch) => {
    try {
        const user = await Auth.currentAuthenticatedUser();
        dispatch(setUser(user));
    } catch (e) {
    // message.error(e);
    }
};
