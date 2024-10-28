// src/store/reducers/addressReducer.js
import { ADDRESS_ACTIONS } from '../actions/addressActions';

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  selectedShippingAddress: null,
  selectedBillingAddress: null
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_ACTIONS.FETCH_ADDRESSES_REQUEST:
    case ADDRESS_ACTIONS.ADD_ADDRESS_REQUEST:
    case ADDRESS_ACTIONS.UPDATE_ADDRESS_REQUEST:
    case ADDRESS_ACTIONS.DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADDRESS_ACTIONS.FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload
      };

    case ADDRESS_ACTIONS.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: [...state.addresses, action.payload]
      };

    case ADDRESS_ACTIONS.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.map(address => 
          address.id === action.payload.id ? action.payload : address
        )
      };

    case ADDRESS_ACTIONS.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter(address => address.id !== action.payload)
      };

    case ADDRESS_ACTIONS.FETCH_ADDRESSES_FAILURE:
    case ADDRESS_ACTIONS.ADD_ADDRESS_FAILURE:
    case ADDRESS_ACTIONS.UPDATE_ADDRESS_FAILURE:
    case ADDRESS_ACTIONS.DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ADDRESS_ACTIONS.SET_SELECTED_SHIPPING_ADDRESS:
      return {
        ...state,
        selectedShippingAddress: action.payload
      };

    case ADDRESS_ACTIONS.SET_SELECTED_BILLING_ADDRESS:
      return {
        ...state,
        selectedBillingAddress: action.payload
      };

    default:
      return state;
  }
};

export default addressReducer;