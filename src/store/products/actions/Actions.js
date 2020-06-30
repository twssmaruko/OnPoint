import { message } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import * as actionTypes from '../ActionTypes';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../graphql/mutations';
import { listProducts } from '../../../graphql/queries';
import {
  setOpenModal,
  setModalSpin,
  setTableSpin,
} from '../../ui/actions/Actions';

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
    message.error('error getting products');
  }
};

export const addProduct = (data) => async (dispatch) => {
  try {
    dispatch(setModalSpin(true));
    await API.graphql(graphqlOperation(createProduct, { input: data }));
    message.success('Product added succesfully!');
    dispatch(setOpenModal(false));
    dispatch(setModalSpin(false));
    dispatch(getProducts());
  } catch (e) {
    message.error('Adding product failed!');
    dispatch(setModalSpin(false));
  }
};

export const editProduct = (data) => async (dispatch) => {
  try {
    dispatch(setModalSpin(true));
    const { id, name, description } = data;
    const input = { id, name, description };
    await API.graphql(graphqlOperation(updateProduct, { input }));
    message.success('Product updated succesfully!');
    dispatch(setOpenModal(false));
    dispatch(setModalSpin(false));
    dispatch(getProducts());
  } catch (e) {
    message.error('Updating product failed!');
    dispatch(setModalSpin(false));
  }
};

export const removeProduct = (data) => async (dispatch) => {
  try {
    dispatch(setModalSpin(true));
    const input = {
      id: data,
    };
    await API.graphql(graphqlOperation(deleteProduct, { input }));
    message.success('Product deleted succesfully!');
    dispatch(setOpenModal(false));
    dispatch(setModalSpin(false));
    dispatch(getProducts());
  } catch (e) {
    message.error('Deleting product failed!');
    console.log(e);
    dispatch(setModalSpin(false));
  }
};
