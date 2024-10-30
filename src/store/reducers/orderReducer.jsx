import { loadOrdersFromStorage, ORDER_ACTION } from "../actions/orderActions";

// orderReducer.js
const initialState = {
    orders: loadOrdersFromStorage(),
    currentOrder: null,
    loading: false,
    error: null
  };
  
  const orderReducer = (state = initialState, action) => {
    if (action.type !== ORDER_ACTION) return state;
  
    const { actionType, payload } = action;
  
    switch (actionType) {
      case 'CREATE':
        if (payload.loading) {
          return { ...state, loading: true, error: null };
        }
        if (payload.error) {
          return { ...state, error: payload.error, loading: false };
        }
        return {
          ...state,
          orders: [...state.orders, payload.data],
          currentOrder: payload.data,
          loading: false,
          error: null
        };
  
      case 'FETCH':
        if (payload.loading) {
          return { ...state, loading: true, error: null };
        }
        if (payload.error) {
          return { ...state, error: payload.error, loading: false };
        }
        return {
          ...state,
          orders: payload.data,
          loading: false,
          error: null
        };
  
      default:
        return state;
    }
  };
  
  export default orderReducer;