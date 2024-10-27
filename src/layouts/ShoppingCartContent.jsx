import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { removeFromCartWithStorage, updateQuantityWithStorage } from '../store/actions/shoppingCartActions';
import { calculateCartTotals } from '../store/actions/shoppingCartActions'; // Action to calculate totals

const ShoppingCartContent = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingCart.cart);
  const subtotal = useSelector((state) => state.shoppingCart.subtotal);
  const tax = useSelector((state) => state.shoppingCart.tax);
  const total = useSelector((state) => state.shoppingCart.total);

  // Calculate totals on initial load and whenever cartItems changes
  useEffect(() => {
    dispatch(calculateCartTotals());
  }, [cartItems, dispatch]);

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantityWithStorage(productId, quantity));
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeFromCartWithStorage(productId));
  };

  return (
    <div className="shopping-cart-content mt-8 ">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 ml-4 md:ml-10">Your Cart</h2>

      <div className="cart-items bg-[#FAFAFA]">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200">
            <img src={item.image} alt={item.name} className=" ml-4 md:ml-10 w-20 h-20 object-cover rounded" />
            
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">Price: ${item.price}</p>

              <div className="quantity-control flex items-center mt-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 bg-[#23A6F0] text-white rounded"
                >
                  -
                </button>
                <span className="px-4 text-[#23A6F0] font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-[#23A6F0] text-white rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => handleRemoveProduct(item.id)}
              className="mr-6 md:mr-10 text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-lg font-semibold">
          <span className='md:ml-10'>Subtotal:</span>
          <span className='md:mr-10'>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span className='md:ml-10'>Tax:</span>
          <span className='md:mr-10'>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-800 mt-2">
          <span className='md:ml-10'>Total:</span>
          <span className='md:mr-10'>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-center md:justify-end md:mr-10 space-x-4 mt-6">
        <Link
          to="/shop"
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Continue Shopping
        </Link>
        <Link
          to="/checkout"
          className="px-6 py-2 bg-[#2DC071] text-white rounded hover:bg-green-600"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCartContent;
