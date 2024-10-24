import api from '../../services/api'; // Import your Axios instance
import { toast } from 'react-toastify';
// src/store/actions/productActions.js
export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  payload: categories,
});

export const setProductList = (productList) => ({
  type: 'SET_PRODUCT_LIST',
  payload: productList,
});

export const setTotal = (total) => ({
  type: 'SET_TOTAL',
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: 'SET_FETCH_STATE',
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: 'SET_LIMIT',
  payload: limit,
});

export const setOffset = (offset) => ({
  type: 'SET_OFFSET',
  payload: offset,
});

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: filter,
});






// Thunk action to fetch categories from the API
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/categories'); // Adjust if needed based on your API setup
      const categories = response.data;
      
      // Dispatch the action to set categories in the Redux store
      dispatch(setCategories(categories));
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error('Error fetching categories:', error);
    }
  };
};
