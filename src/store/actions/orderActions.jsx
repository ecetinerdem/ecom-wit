// orderActions.js
import api from '../../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { clearCart } from './shoppingCartActions';

export const ORDER_ACTION = 'ORDER_ACTION';
export const SAVE_ORDER_HISTORY = 'SAVE_ORDER_HISTORY';

const orderAction = (actionType, payload) => ({
  type: ORDER_ACTION,
  actionType,
  payload
});

// Load orders from localStorage
export const loadOrdersFromStorage = () => {
  try {
    const orders = localStorage.getItem('orderHistory');
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Error loading orders from storage:', error);
    return [];
  }
};

// Save orders to localStorage
const saveOrdersToStorage = (orders) => {
  try {
    localStorage.setItem('orderHistory', JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders to storage:', error);
  }
};

// Format cart items for order submission
const formatOrderProducts = (cartItems) => {
  return cartItems.map(item => ({
    product_id: item.id,
    count: item.quantity,
    detail: item.detail || ''  // Add detail if available
  }));
};

// Create order thunk
export const createOrderThunk = (orderData) => async (dispatch, getState) => {
  dispatch(orderAction('CREATE', { loading: true }));
  
  try {
    // Format the order data according to the required structure
    const formattedOrder = {
      address_id: orderData.address_id,
      order_date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      card_no: orderData.card_no.replace(/\s/g, ''),
      card_name: orderData.card_name,
      card_expire_month: parseInt(orderData.card_expire_month),
      card_expire_year: parseInt(orderData.card_expire_year),
      card_ccv: parseInt(orderData.card_ccv),
      price: getState().shoppingCart.total,
      products: formatOrderProducts(getState().shoppingCart.cart)
    };

    // Send POST request to create order
    const response = await api.post('/order', formattedOrder);
    
    // Save to local storage
    const orders = loadOrdersFromStorage();
    const updatedOrders = [...orders, response.data];
    saveOrdersToStorage(updatedOrders);
    
    // Update redux state
    dispatch(orderAction('CREATE', { 
      data: response.data,
      loading: false 
    }));
    
    // Clear the cart
    dispatch(clearCart());
    
    // Show success message
    toast.success('Order completed successfully! Thank you for your purchase.');
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create order';
    dispatch(orderAction('CREATE', { 
      error: errorMessage,
      loading: false 
    }));
    toast.error(errorMessage);
    return Promise.reject(errorMessage);
  }
};

// Fetch order history thunk
export const fetchOrderHistoryThunk = () => async (dispatch) => {
  dispatch(orderAction('FETCH', { loading: true }));
  
  try {
    const response = await api.get('/order');
    saveOrdersToStorage(response.data);
    
    dispatch(orderAction('FETCH', { 
      data: response.data,
      loading: false 
    }));
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
    dispatch(orderAction('FETCH', { 
      error: errorMessage,
      loading: false 
    }));
    return Promise.reject(errorMessage);
  }
};