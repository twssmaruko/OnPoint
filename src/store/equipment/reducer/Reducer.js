import * as actions from '../ActionTypes';
import {updateObject} from '../../utility';

const initialState = {
    equipment: [],
};

const createEquipment = (state, action) => updateObject(state, {
    equipment: action.data
})

const fetchEquipment = (state, action) => updateObject(state, {
    equipment: action.data
})

const equipmentReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.CREATE_EQUIPMENT: return createEquipment(state, action)
        case actions.FETCH_EQUIPMENT: return fetchEquipment(state, action)
        default: return state;
    }
}

export default equipmentReducer;