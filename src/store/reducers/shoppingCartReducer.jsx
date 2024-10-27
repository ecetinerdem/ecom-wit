import { loadCartFromStorage } from "@/utils/localStorage";
import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SET_ADDRESS, SET_PAYMENT, UPDATE_QUANTITY, CALCULATE_CART_TOTALS } from "../actions/shoppingCartActions";

const initialState = {
  cart: loadCartFromStorage(),
  payment: {},
  address: {},
  subtotal: 0,
  tax: 0,
  total: 0
};

// Helper functions for calculations
const calculateSubtotal = (cart) => {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const calculateTax = (subtotal) => {
  return subtotal * 0.18; // 18% KDV for Turkey
};

const calculateTotal = (subtotal, tax) => {
  return subtotal + tax;
};

const shoppingCartReducer = (state = initialState, action) => {
  let updatedCart;
  let subtotal;
  let tax;
  let total;

  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        updatedCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, action.payload];
      }
      
      subtotal = calculateSubtotal(updatedCart);
      tax = calculateTax(subtotal);
      total = calculateTotal(subtotal, tax);

      return {
        ...state,
        cart: updatedCart,
        subtotal,
        tax,
        total
      };

    case REMOVE_FROM_CART:
      updatedCart = state.cart.filter(item => item.id !== action.payload);
      subtotal = calculateSubtotal(updatedCart);
      tax = calculateTax(subtotal);
      total = calculateTotal(subtotal, tax);

      return {
        ...state,
        cart: updatedCart,
        subtotal,
        tax,
        total
      };

    case UPDATE_QUANTITY:
      updatedCart = state.cart.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      subtotal = calculateSubtotal(updatedCart);
      tax = calculateTax(subtotal);
      total = calculateTotal(subtotal, tax);

      return {
        ...state,
        cart: updatedCart,
        subtotal,
        tax,
        total
      };

    case CLEAR_CART:
      localStorage.removeItem('cart');
      return {
        ...state,
        cart: [],
        subtotal: 0,
        tax: 0,
        total: 0
      };

    // Keeping your existing cases for address and payment
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };

    case CALCULATE_CART_TOTALS:
      return {
        ...state,
        subtotal: action.payload.subtotal,
        tax: action.payload.tax,
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;