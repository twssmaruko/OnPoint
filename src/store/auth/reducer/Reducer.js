import * as actions from '../ActionTypes';

const initialState = {
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SET_USER:
        return {
            ...state,
            user: action.data
        };
    default:
        return state;
    }
};

export default authReducer;
