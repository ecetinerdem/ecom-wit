// productActions.js
import api from '../../services/api';
import { toast } from 'react-toastify';

// Action Types (let's organize them at the top)
export const ACTION_TYPES = {
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_CATEGORY_ID: 'SET_CATEGORY_ID',
  SET_GENDER: 'SET_GENDER',
  SET_CATEGORY_NAME: 'SET_CATEGORY_NAME',
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

export const setCategoryId = (categoryId) => ({
  type: ACTION_TYPES.SET_CATEGORY_ID,
  payload: categoryId,
});

export const setGender = (gender) => ({
  type: ACTION_TYPES.SET_GENDER,
  payload: gender,
});

export const setCategoryName = (categoryName) => ({
  type: ACTION_TYPES.SET_CATEGORY_NAME,
  payload: categoryName,
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
      
      const { 
        limit, 
        offset, 
        filter,  // This is our search term
        sort,
        categoryId 
      } = getState().products;
      
      // Build query parameters
      let queryParams = new URLSearchParams();
      
      // Add pagination
      queryParams.append('limit', limit);
      queryParams.append('offset', offset);
      
      // Add category if exists
      if (categoryId || options.category) {
        queryParams.append('category', options.category || categoryId);
      }
      
      // Add filter/search if exists
      if (filter && filter.trim()) {
        queryParams.append('filter', filter.trim());
      }
      
      // Add sort if exists
      if (sort.field && sort.order) {
        queryParams.append('sort', `${sort.field}:${sort.order}`);
      }
      
      // Log the final URL for debugging
      console.log('Fetching products with URL:', `/products?${queryParams.toString()}`);
      
      const response = await api.get(`/products?${queryParams.toString()}`);
      
      dispatch(fetchProductsSuccess(response.data));
      dispatch(setFetchState('FETCHED'));
      
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
      toast.error('Failed to fetch products');
    }
  };
};

// Helper action for category navigation
export const navigateToCategory = (gender, categoryName, categoryId) => {
  return (dispatch) => {
    dispatch(setGender(gender));
    dispatch(setCategoryName(categoryName));
    dispatch(setCategoryId(categoryId));
    dispatch(fetchProducts({ category: categoryId }));
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
    dispatch(setFilter(searchTerm));
    dispatch(setOffset(0)); // Reset to first page
    dispatch(fetchProducts());
  };
};

// Helper action for handling sort
export const handleSort = (sortString) => {
  return (dispatch) => {
    // Parse the sort string (e.g., "price:desc")
    const [field, order] = sortString.split(':');
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