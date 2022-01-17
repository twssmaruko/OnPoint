import * as actionTypes from '../ActionTypes';
import {message} from 'antd';
import OPC from '../../../api/OPC';
import { setShowSpin1 } from '../../ui/actions/Actions';

const fetchEquipmentToStore = (data) => ({
    type: actionTypes.FETCH_EQUIPMENT,
    data
})

const fetchEquipment = () => async(dispatch) => {
    const response = await OPC.get('/equipment');

}

const createEquipment = (data) => async(dispatch) => {
    
}