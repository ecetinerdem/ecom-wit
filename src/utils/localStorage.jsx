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