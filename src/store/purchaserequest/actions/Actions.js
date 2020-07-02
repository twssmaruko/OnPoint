import { message } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import { searchProducts } from '../../../graphql/queries'; import * as actionTypes from '../ActionTypes';
import { setShowSpin } from '../../ui/actions/Actions';

export const setProducts = (data) => ({
  type: actionTypes.SET_PRODUCTS,
  data,
});

export const getProducts = (data) => async (dispatch) => {
  try {
    dispatch(setShowSpin(true));
    const products = await API.graphql(graphqlOperation(searchProducts, {
      filter:
        {
          name:
            {
              matchPhrasePrefix: data,
            },
        },
      limit: 5,
    }));
    const itemsInProducts = products.data.searchProducts.items;
    dispatch(setProducts(itemsInProducts));
    dispatch(setShowSpin(false));
  } catch (e) {
    dispatch(setShowSpin(false));
    message.error('Error getting products');
    throw new Error(e);
  }
};
