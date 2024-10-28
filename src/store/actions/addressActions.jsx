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
    const formattedAddresses = response.data.map(address => ({
      ...address,
      name: String(address.name || ''),
      surname: String(address.surname || ''),
      address: String(address.address || ''),
      city: String(address.city || ''),
      district: String(address.district || '')
    }));
    
    dispatch({
      type: ADDRESS_ACTIONS.FETCH_ADDRESSES_SUCCESS,
      payload: formattedAddresses
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
    const formattedAddress = {
      ...response.data,
      name: String(response.data.name || ''),
      surname: String(response.data.surname || ''),
      address: String(response.data.address || ''),
      city: String(response.data.city || ''),
      district: String(response.data.district || '')
    };
    
    dispatch({
      type: ADDRESS_ACTIONS.ADD_ADDRESS_SUCCESS,
      payload: formattedAddress
    });
    
    // Fetch updated address list after adding
    dispatch(fetchAddresses());
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
    const formattedAddress = {
      ...response.data,
      name: String(response.data.name || ''),
      surname: String(response.data.surname || ''),
      address: String(response.data.address || ''),
      city: String(response.data.city || ''),
      district: String(response.data.district || '')
    };
    
    dispatch({
      type: ADDRESS_ACTIONS.UPDATE_ADDRESS_SUCCESS,
      payload: formattedAddress
    });
    
    // Fetch updated address list after updating
    dispatch(fetchAddresses());
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
    
    // Fetch updated address list after deleting
    dispatch(fetchAddresses());
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
  payload: address ? {
    ...address,
    name: String(address.name || ''),
    surname: String(address.surname || ''),
    address: String(address.address || ''),
    city: String(address.city || ''),
    district: String(address.district || '')
  } : null
});

export const setSelectedBillingAddress = (address) => ({
  type: ADDRESS_ACTIONS.SET_SELECTED_BILLING_ADDRESS,
  payload: address ? {
    ...address,
    name: String(address.name || ''),
    surname: String(address.surname || ''),
    address: String(address.address || ''),
    city: String(address.city || ''),
    district: String(address.district || '')
  } : null
});