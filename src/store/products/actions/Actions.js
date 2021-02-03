import {message} from 'antd';
import {API, graphqlOperation} from 'aws-amplify';
import * as actionTypes from '../ActionTypes';
import axios from '../../../axios-orders';
// import {
//   createProduct,
//   updateProduct,
//   deleteProduct
// } from '../../../graphql/mutations';
import {
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct
} from '../../../graphql/subscriptions';
import {listProducts} from '../../../graphql/queries';
import {
  setOpenModal1,
  setShowSpin1,
  setShowSpin2,
  setShowSpin3
} from '../../ui/actions/Actions';

export const setProducts = (data) => ({
  type: actionTypes.SET_PRODUCTS,
  data
});

export const setSubscriptions = (data) => ({
  type: actionTypes.SET_SUBSCRIPTIONS,
  data
});

const addProductStart = () => ({
  type: actionTypes.ADD_PRODUCT_START
})

const addProductSuccess = (id, productData) => ({
  type: actionTypes.ADD_PRODUCT_SUCCESS,
  productId: id,
  productData
})

const addProductFail = (error) => ({
  type: actionTypes.ADD_PRODUCT_FAIL,
  error
})

const fetchProductsStart = () => ({
  type: actionTypes.FETCH_PRODUCTS_START
})

const fetchProductsSuccess = (products) => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  products
})
const fetchProductsFail = (error) => ({
  type: actionTypes.FETCH_PRODUCTS_FAIL,
  error
})

const removeProductStart = () => ({
  type: actionTypes.REMOVE_PRODUCT_START
})

const removeProductFail = (error) => ({
  type: actionTypes.REMOVE_PRODUCT_FAIL,
  error
})

const removeProductSuccess = (id, productData) => ({
  type: actionTypes.REMOVE_PRODUCT_SUCCESS,
  productId: id,
  productData
})

const editProductStart = () => ({
  type: actionTypes.EDIT_PRODUCT_START
})

const editProductFail = (error) => ({
  type: actionTypes.EDIT_PRODUCT_FAIL,
  error
})

const editProductSuccess = (id, productData) => ({
  type: actionTypes.EDIT_PRODUCT_SUCCESS,
  productId: id,
  productData
})

export const fetchProducts = () => {
  return dispatch => {
    dispatch(setShowSpin2(true));
    dispatch(fetchProductsStart());
    axios.get('/products.json')
      .then((response) => {
        const fetchedProducts = [];
        for (const key in response.data) {
          fetchedProducts.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchProductsSuccess(fetchedProducts));
        dispatch(setShowSpin2(false));
      })
      .catch((error) => {
        dispatch(fetchProductsFail(error));
        dispatch(setShowSpin2(false));
      })
  }

}

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setShowSpin2(true));
    const queryData = await API.graphql(graphqlOperation(listProducts));
    const newProducts = queryData.data.listProducts.items;
    dispatch(setProducts(newProducts));
    dispatch(setShowSpin2(false));
  } catch (e) {
    console.error(e);
    dispatch(setShowSpin2(false));
    message.error('Error getting products');
  }
};

export const addProduct = (productData) => {
  return dispatch => {
    dispatch(setShowSpin1(true));
    dispatch(addProductStart());
    axios.post('/products.json', productData)
      .then((response) => {
        dispatch(addProductSuccess(response.data.name, productData));
        dispatch(setOpenModal1(false));
        dispatch(setShowSpin1(false));
      })
      .catch((error) => {
        dispatch(addProductFail(error));
        dispatch(setShowSpin1(false));
      });
  }


  // dispatch()
  // try {
  //   dispatch(setShowSpin1(true));
  //   await API.graphql(graphqlOperation(createProduct, {input: data}));
  //   message.success('Product added succesfully!');
  //   dispatch(setOpenModal1(false));
  //   dispatch(setShowSpin1(false));
  // } catch (e) {
  //   console.error(e);
  //   message.error('Adding product failed!');
  //   dispatch(setShowSpin1(false));
  // }
};

export const editProduct = (productData) => {
  return dispatch => {
    dispatch(setShowSpin1(true));
    dispatch(editProductStart());
    const putURL = 'products/' + productData.id + '.json';
    axios.put(putURL, productData)
      .then(() => {
        dispatch(editProductSuccess(productData.id, productData))
        message.success('Product edited');
        dispatch(setOpenModal1(false));
        dispatch(setShowSpin1(false));
      })
      .catch((error) => {
        dispatch(editProductFail(error));
        message.success('Product Edit Error!');
        dispatch(setOpenModal1(false));
        dispatch(setShowSpin1(false));
      })

  }
  // try {
  //   dispatch(setShowSpin1(true));
  //   const {id, name, description} = data;
  //   const input = {
  //     id,
  //     name,
  //     description
  //   };
  //   await API.graphql(graphqlOperation(updateProduct, {input}));
  //   message.success('Product updated succesfully!');
  //   dispatch(setOpenModal1(false));
  //   dispatch(setShowSpin1(false));
  // } catch (e) {
  //   console.error(e);
  //   message.error('Updating product failed!');
  //   dispatch(setShowSpin1(false));
  // }
};

export const removeProduct = (productData) => {
  console.log(productData);
  return dispatch => {
    dispatch(setShowSpin3(true));
    dispatch(removeProductStart());
    const newURL = 'products/'+ productData.id + '.json';
    axios.delete(newURL)
      .then(() => {
        dispatch(removeProductSuccess(productData.id, productData));
        message.success('Product removed');
        dispatch(setOpenModal1(false));
        dispatch(setShowSpin1(false));
      })
      .catch((error) => {
        dispatch(removeProductFail(error));
        dispatch(setOpenModal1(false));
        dispatch(setShowSpin1(false));
      })
  }


  // try {
  //   dispatch(setShowSpin1(true));
  //   const input = {
  //     id: data
  //   };
  //   await API.graphql(graphqlOperation(deleteProduct, {input}));
  //   message.success('Product deleted succesfully!');
  //   dispatch(setOpenModal1(false));
  //   dispatch(setShowSpin1(false));
  // } catch (e) {
  //   console.error(e);
  //   message.error('Deleting product failed!');
  //   dispatch(setShowSpin1(false));
  // }
};

export const initSubscriptions = () => (dispatch, getState) => {
  try {
    const addListener = API.graphql(
      graphqlOperation(onCreateProduct)
    ).subscribe({
      next: (productData) => {
        const {products} = getState().products;
        const addedData = productData.value.data.onCreateProduct;
        const newProducts = [addedData].concat(products);
        dispatch(setProducts(newProducts));
      }
    });
    const updateListener = API.graphql(
      graphqlOperation(onUpdateProduct)
    ).subscribe({
      next: (productData) => {
        const {products} = getState().products;
        const updatedData = productData.value.data.onUpdateProduct;
        const newProducts = products.map((product) => {
          if (product.id === updatedData.id) {
            return updatedData;
          }
          return product;
        });
        dispatch(setProducts(newProducts));
      }
    });
    const deleteListener = API.graphql(
      graphqlOperation(onDeleteProduct)
    ).subscribe({
      next: (productData) => {
        const {products} = getState().products;
        const deletedData = productData.value.data.onDeleteProduct;
        const newProducts = products.filter((product) => deletedData.id !== product.id);
        dispatch(setProducts(newProducts));
      }
    });
    const subscriptions = [addListener, updateListener, deleteListener];
    dispatch(setSubscriptions(subscriptions));
  } catch (e) {
    console.error(e);
    message.error('Error in subscriptions!');
  }
};

export const unsubscribe = () => (dispatch, getState) => {
  try {
    const {subscriptions} = getState().products;
    subscriptions.forEach((listener) => {
      listener.unsubscribe();
    });
    dispatch(setSubscriptions([]));
  } catch (e) {
    console.error(e);
    message.error('Error while unsubscribing!');
  }
};
