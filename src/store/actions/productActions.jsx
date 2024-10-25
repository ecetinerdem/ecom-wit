// productActions.js
import api from '../../services/api';
import { toast } from 'react-toastify';

// Action Types (let's organize them at the top)
export const ACTION_TYPES = {
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_PRODUCT_LIST: 'SET_PRODUCT_LIST',
  SET_TOTAL: 'SET_TOTAL',
  SET_FETCH_STATE: 'SET_FETCH_STATE',
  SET_LIMIT: 'SET_LIMIT',
  SET_OFFSET: 'SET_OFFSET',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  SET_SORT: 'SET_SORT',
  FETCH_PRODUCTS_START: 'FETCH_PRODUCTS_START',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE: 'FETCH_PRODUCTS_FAILURE'
};

// Action Creators
export const setCategories = (categories) => ({
  type: ACTION_TYPES.SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (productList) => ({
  type: ACTION_TYPES.SET_PRODUCT_LIST,
  payload: productList,
});

export const setTotal = (total) => ({
  type: ACTION_TYPES.SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: ACTION_TYPES.SET_FETCH_STATE,
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: ACTION_TYPES.SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: ACTION_TYPES.SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: ACTION_TYPES.SET_FILTER,
  payload: filter,
});

// New action creators for search and sort
export const setSearch = (searchTerm) => ({
  type: ACTION_TYPES.SET_SEARCH,
  payload: searchTerm,
});

export const setSort = (sortConfig) => ({
  type: ACTION_TYPES.SET_SORT,
  payload: sortConfig,
});

// Products fetching action creators
export const fetchProductsStart = () => ({
  type: ACTION_TYPES.FETCH_PRODUCTS_START
});

export const fetchProductsSuccess = (data) => ({
  type: ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
  payload: data
});

export const fetchProductsFailure = (error) => ({
  type: ACTION_TYPES.FETCH_PRODUCTS_FAILURE,
  payload: error
});

// Enhanced thunk action for fetching products
export const fetchProducts = (options = {}) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchProductsStart());
      dispatch(setFetchState('FETCHING'));
      
      // Get current state values
      const { 
        limit, 
        offset, 
        filter, 
        search, 
        sort 
      } = getState().products;
      
      // Construct query parameters
      const queryParams = {
        limit,
        offset,
        ...options
      };
      
      // Add filter if exists
      if (filter) {
        queryParams.filter = filter;
      }
      
      // Add search if exists
      if (search) {
        queryParams.search = search;
      }
      
      // Add sort if exists
      if (sort.field) {
        queryParams.sortField = sort.field;
        queryParams.sortOrder = sort.order;
      }
      
      const response = await api.get('/products', { params: queryParams });
      const { products, total } = response.data;
      
      dispatch(fetchProductsSuccess({ products, total }));
      dispatch(setFetchState('FETCHED'));
      dispatch(setProductList(products));
      dispatch(setTotal(total));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
      dispatch(setFetchState('ERROR'));
      toast.error('Failed to fetch products');
      console.error('Error fetching products:', error);
    }
  };
};

// Helper action for handling page changes
export const handlePageChange = (newPage) => {
  return (dispatch, getState) => {
    const { limit } = getState().products;
    const newOffset = (newPage - 1) * limit;
    
    dispatch(setOffset(newOffset));
    dispatch(fetchProducts());
  };
};

// Helper action for handling limit changes
export const handleLimitChange = (newLimit) => {
  return (dispatch) => {
    dispatch(setLimit(newLimit));
    dispatch(setOffset(0)); // Reset to first page
    dispatch(fetchProducts());
  };
};

// Helper action for handling filter changes
export const handleFilterChange = (newFilter) => {
  return (dispatch) => {
    dispatch(setFilter(newFilter));
    dispatch(setOffset(0)); // Reset to first page
    dispatch(fetchProducts());
  };
};

// Helper action for handling search
export const handleSearch = (searchTerm) => {
  return (dispatch) => {
    dispatch(setSearch(searchTerm));
    dispatch(setOffset(0)); // Reset to first page
    dispatch(fetchProducts());
  };
};

// Helper action for handling sort
export const handleSort = (field, order = 'asc') => {
  return (dispatch) => {
    dispatch(setSort({ field, order }));
    dispatch(fetchProducts());
  };
};

// Existing categories fetch action
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/categories');
      const categories = response.data;
      dispatch(setCategories(categories));
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error('Error fetching categories:', error);
    }
  };
};