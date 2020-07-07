import { message } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import * as actionTypes from '../ActionTypes';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../graphql/mutations';
import {
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
} from '../../../graphql/subscriptions';
import { listProducts } from '../../../graphql/queries';
import {
  setOpenModal,
  setShowSpin,
  setTableSpin,
} from '../../ui/actions/Actions';

export const setProducts = (data) => ({
  type: actionTypes.SET_PRODUCTS,
  data,
});

export const setSubscriptions = (data) => ({
  type: actionTypes.SET_SUBSCRIPTIONS,
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
    message.error('Error getting products');
  }
};

export const addProduct = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin(true));
    await API.graphql(graphqlOperation(createProduct, { input: data }));
    message.success('Product added succesfully!');
    dispatch(setOpenModal(false));
    dispatch(setShowSpin(false));
  } catch (e) {
    message.error('Adding product failed!');
    dispatch(setShowSpin(false));
  }
};

export const editProduct = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin(true));
    const { id, name, description } = data;
    const input = { id, name, description };
    await API.graphql(graphqlOperation(updateProduct, { input }));
    message.success('Product updated succesfully!');
    dispatch(setOpenModal(false));
    dispatch(setShowSpin(false));
  } catch (e) {
    message.error('Updating product failed!');
    dispatch(setShowSpin(false));
  }
};

export const removeProduct = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin(true));
    const input = {
      id: data,
    };
    await API.graphql(graphqlOperation(deleteProduct, { input }));
    message.success('Product deleted succesfully!');
    dispatch(setOpenModal(false));
    dispatch(setShowSpin(false));
  } catch (e) {
    message.error('Deleting product failed!');
    dispatch(setShowSpin(false));
  }
};

export const initSubscriptions = () => (dispatch, getState) => {
  try {
    const addListener = API.graphql(graphqlOperation(onCreateProduct)).subscribe({
      next: (productData) => {
        const { products } = getState().products;
        const addedData = productData.value.data.onCreateProduct;
        const newProducts = [addedData].concat(products);
        dispatch(setProducts(newProducts));
      },
    });
    const updateListener = API.graphql(graphqlOperation(onUpdateProduct)).subscribe({
      next: (productData) => {
        const { products } = getState().products;
        const updatedData = productData.value.data.onUpdateProduct;
        const newProducts = products.map((product) => {
          if (product.id === updatedData.id) {
            return updatedData;
          }
          return product;
        });
        dispatch(setProducts(newProducts));
      },
    });
    const deleteListener = API.graphql(graphqlOperation(onDeleteProduct)).subscribe({
      next: (productData) => {
        const { products } = getState().products;
        const deletedData = productData.value.data.onDeleteProduct;
        const newProducts = products.filter((product) => deletedData.id !== product.id);
        dispatch(setProducts(newProducts));
      },
    });
    const subscriptions = [addListener, updateListener, deleteListener];
    dispatch(setSubscriptions(subscriptions));
  } catch (e) {
    message.error('Error in subscriptions!');
  }
};

export const unsubscribe = () => (dispatch, getState) => {
  try {
    const { subscriptions } = getState().products;
    subscriptions.forEach((listener) => {
      listener.unsubscribe();
    });
    dispatch(setSubscriptions([]));
  } catch (e) {
    message.error('Error while unsubscribing!');
  }
};
