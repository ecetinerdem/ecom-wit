export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';
export const CALCULATE_CART_TOTALS = 'CALCULATE_CART_TOTALS';

// Cart Actions
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0].url,
    quantity: 1,
    stock: product.stock
  }
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity }
});

export const clearCart = () => ({
  type: CLEAR_CART
});

// Keeping your existing address and payment actions
export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
});

// Thunks with localStorage
export const addToCartWithStorage = (product) => {
  return (dispatch, getState) => {
    dispatch(addToCart(product));
    const { cart } = getState().shoppingCart;
    saveCartToStorage(cart);
  };
};

export const updateQuantityWithStorage = (productId, quantity) => {
  return (dispatch, getState) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity(productId, quantity));
    }
    const { cart } = getState().shoppingCart;
    saveCartToStorage(cart);
  };
};

export const removeFromCartWithStorage = (productId) => {
  return (dispatch, getState) => {
    dispatch(removeFromCart(productId));
    const { cart } = getState().shoppingCart;
    saveCartToStorage(cart);
  };
};

// utils/localStorage.js
export const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Error loading cart from storage:', err);
    return [];
  }
};

export const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Error saving cart to storage:', err);
  }
};

export const calculateCartTotals = () => (dispatch, getState) => {
  const { cart } = getState().shoppingCart;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  dispatch({
    type: CALCULATE_CART_TOTALS,
    payload: { subtotal, tax, total },
  });
};