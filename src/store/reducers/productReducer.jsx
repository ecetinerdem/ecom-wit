import { ACTION_TYPES } from '../actions/productActions';

// productReducer.js
const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  search: '',
  sort: {
    field: null,
    order: 'asc'
  },
  fetchState: 'NOT_FETCHED',
  loading: false,
  error: null,
  categoryId: null,
  gender: null,
  categoryName: null,
  currentProduct: null,
  productLoading: false,
  productError: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case ACTION_TYPES.SET_CATEGORY_ID:
      return {
        ...state,
        categoryId: action.payload
      };
        
    case ACTION_TYPES.SET_GENDER:
      return {
        ...state,
        gender: action.payload
      };
        
    case ACTION_TYPES.SET_CATEGORY_NAME:
      return {
        ...state,
        categoryName: action.payload
      };
    case ACTION_TYPES.SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
      
    case ACTION_TYPES.SET_TOTAL:
      return { ...state, total: action.payload };
      
    case ACTION_TYPES.SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
      
    case ACTION_TYPES.SET_LIMIT:
      return { ...state, limit: action.payload };
      
    case ACTION_TYPES.SET_OFFSET:
      return { ...state, offset: action.payload };
      
    case ACTION_TYPES.SET_FILTER:
      return { ...state, filter: action.payload };
      
    case ACTION_TYPES.SET_SEARCH:
      return { ...state, search: action.payload };
      
    case ACTION_TYPES.SET_SORT:
      return { ...state, sort: action.payload };
      
    case ACTION_TYPES.FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        productList: action.payload.products,
        total: action.payload.total
      };
      
    case ACTION_TYPES.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ACTION_TYPES.FETCH_PRODUCT_DETAIL_START:
      return {
        ...state,
        productLoading: true,
        productError: null
      };
      
    case ACTION_TYPES.FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productLoading: false,
        currentProduct: action.payload,
        productError: null
      };
      
    case ACTION_TYPES.FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        productLoading: false,
        productError: action.payload
      };
      
    default:
      return state;
  }
};

export default productReducer;