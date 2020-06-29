import { message } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import * as actionTypes from '../ActionTypes';
import { createProduct } from '../../../graphql/mutations';
import { listProducts } from '../../../graphql/queries';
import { setOpenModal, setShowSpin, setTableSpin } from '../../ui/actions/Actions';

export const setProducts = (data) => ({
  type: actionTypes.SET_PRODUCTS,
  data,
});

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setTableSpin(true));
    const products = await API.graphql(graphqlOperation(listProducts));
    const newProducts = products.data.listProducts.items;
    dispatch(setProducts(newProducts));
    dispatch(setTableSpin(false));
  } catch (e) {
    dispatch(setTableSpin(false));
    message.error('Error getting products.');
  }
};

export const addProducts = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin(true));
    await API.graphql(graphqlOperation(createProduct, { input: data }));
    message.success('Product added succesfuly!');
    dispatch(setOpenModal(false));
    dispatch(setShowSpin(false));
    dispatch(getProducts());
  } catch (e) {
    message.error('theres an error logging in');
    dispatch(setShowSpin(false));
  }
};
