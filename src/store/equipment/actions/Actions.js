import * as actionTypes from '../ActionTypes';
import { message } from 'antd';
import OPC from '../../../api/OPC';
import { setShowSpin1 } from '../../ui/actions/Actions';

const fetchEquipmentToStore = (data) => ({
    type: actionTypes.FETCH_EQUIPMENT,
    data
})

const createEquipmentSuccess = (data) => ({
    type: actionTypes.CREATE_EQUIPMENT,
    data
})

export const fetchEquipment = () => async (dispatch) => {
    const response = await OPC.get('/equipment');
    dispatch(fetchEquipmentToStore(response.data));

}

export const createEquipment = (equipmentData) => async (dispatch) => {
    try {
        const newEquipment = await OPC.post('/equipment', equipmentData);
        dispatch(fetchEquipment());
    } catch (error) {
        console.error(error.message);
    }

}

export const editEquipment = (equipmentData) => async (dispatch) => {
    try {
        const editEquipmnent = await OPC.put('/equipment/' + equipmentData.equipment_id, equipmentData);
        dispatch(fetchEquipment());
        message.success('Equipment edited');
    } catch (err) {
        console.error(err.message);
    }

}

export const deleteEquipment = (equipmentID) => async (dispatch) => {
    console.log('kcel: ', equipmentID);
    try {
        const deletedEquipment = await OPC.delete('/equipment/' + equipmentID);
        dispatch(fetchEquipment());
        message.success('Equipment deleted!');

    } catch (err) {
        console.error(err.message);
        message.error('unable to delete equipment');
    }
}
