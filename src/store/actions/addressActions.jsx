// src/store/actions/addressActions.js
import { toast } from 'react-toastify';
import api from '../../services/api';

// Action Types
export const ADDRESS_ACTIONS = {
  FETCH_ADDRESSES_REQUEST: 'FETCH_ADDRESSES_REQUEST',
  FETCH_ADDRESSES_SUCCESS: 'FETCH_ADDRESSES_SUCCESS',
  FETCH_ADDRESSES_FAILURE: 'FETCH_ADDRESSES_FAILURE',
  
  ADD_ADDRESS_REQUEST: 'ADD_ADDRESS_REQUEST',
  ADD_ADDRESS_SUCCESS: 'ADD_ADDRESS_SUCCESS',
  ADD_ADDRESS_FAILURE: 'ADD_ADDRESS_FAILURE',
  
  UPDATE_ADDRESS_REQUEST: 'UPDATE_ADDRESS_REQUEST',
  UPDATE_ADDRESS_SUCCESS: 'UPDATE_ADDRESS_SUCCESS',
  UPDATE_ADDRESS_FAILURE: 'UPDATE_ADDRESS_FAILURE',
  
  DELETE_ADDRESS_REQUEST: 'DELETE_ADDRESS_REQUEST',
  DELETE_ADDRESS_SUCCESS: 'DELETE_ADDRESS_SUCCESS',
  DELETE_ADDRESS_FAILURE: 'DELETE_ADDRESS_FAILURE',
  
  SET_SELECTED_SHIPPING_ADDRESS: 'SET_SELECTED_SHIPPING_ADDRESS',
  SET_SELECTED_BILLING_ADDRESS: 'SET_SELECTED_BILLING_ADDRESS'
};

// Fetch Addresses
export const fetchAddresses = () => async (dispatch) => {
  dispatch({ type: ADDRESS_ACTIONS.FETCH_ADDRESSES_REQUEST });
  
  try {
    const response = await api.get('/user/address');
    dispatch({
      type: ADDRESS_ACTIONS.FETCH_ADDRESSES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ADDRESS_ACTIONS.FETCH_ADDRESSES_FAILURE,
      payload: error.message
    });
    toast.error('Failed to fetch addresses');
  }
};

// Add Address
export const addAddress = (addressData) => async (dispatch) => {
  dispatch({ type: ADDRESS_ACTIONS.ADD_ADDRESS_REQUEST });
  
  try {
    const response = await api.post('/user/address', addressData);
    dispatch({
      type: ADDRESS_ACTIONS.ADD_ADDRESS_SUCCESS,
      payload: response.data
    });
    toast.success('Address added successfully');
  } catch (error) {
    dispatch({
      type: ADDRESS_ACTIONS.ADD_ADDRESS_FAILURE,
      payload: error.message
    });
    toast.error('Failed to add address');
  }
};

// Update Address
export const updateAddress = (addressData) => async (dispatch) => {
  dispatch({ type: ADDRESS_ACTIONS.UPDATE_ADDRESS_REQUEST });
  
  try {
    const response = await api.put('/user/address', addressData);
    dispatch({
      type: ADDRESS_ACTIONS.UPDATE_ADDRESS_SUCCESS,
      payload: response.data
    });
    toast.success('Address updated successfully');
  } catch (error) {
    dispatch({
      type: ADDRESS_ACTIONS.UPDATE_ADDRESS_FAILURE,
      payload: error.message
    });
    toast.error('Failed to update address');
  }
};

// Delete Address
export const deleteAddress = (addressId) => async (dispatch) => {
  dispatch({ type: ADDRESS_ACTIONS.DELETE_ADDRESS_REQUEST });
  
  try {
    await api.delete(`/user/address/${addressId}`);
    dispatch({
      type: ADDRESS_ACTIONS.DELETE_ADDRESS_SUCCESS,
      payload: addressId
    });
    toast.success('Address deleted successfully');
  } catch (error) {
    dispatch({
      type: ADDRESS_ACTIONS.DELETE_ADDRESS_FAILURE,
      payload: error.message
    });
    toast.error('Failed to delete address');
  }
};

// Set Selected Addresses
export const setSelectedShippingAddress = (address) => ({
  type: ADDRESS_ACTIONS.SET_SELECTED_SHIPPING_ADDRESS,
  payload: address
});

export const setSelectedBillingAddress = (address) => ({
  type: ADDRESS_ACTIONS.SET_SELECTED_BILLING_ADDRESS,
  payload: address
});