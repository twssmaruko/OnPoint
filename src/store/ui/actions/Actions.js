// import { Auth } from 'aws-amplify';
import * as actionTypes from '../ActionTypes';

export const setOpenModal = (data) => ({
  type: actionTypes.SET_OPENMODAL,
  data,
});

export const setModalSpin = (data) => ({
  type: actionTypes.SET_MODALSPIN,
  data,
});

export const setTableSpin = (data) => ({
  type: actionTypes.SET_TABLESPIN,
  data,
});
