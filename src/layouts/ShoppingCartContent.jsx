import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { removeFromCartWithStorage, updateQuantityWithStorage } from '../store/actions/shoppingCartActions';
import { calculateCartTotals } from '../store/actions/shoppingCartActions';
import { toast } from 'react-toastify';

const ShoppingCartContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state) => state.shoppingCart.cart);
  const subtotal = useSelector((state) => state.shoppingCart.subtotal);
  const tax = useSelector((state) => state.shoppingCart.tax);
  const total = useSelector((state) => state.shoppingCart.total);
  const user = useSelector((state) => state.client.user);

  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    dispatch(calculateCartTotals());
  }, [cartItems, dispatch]);

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantityWithStorage(productId, quantity));
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeFromCartWithStorage(productId));
    const newSelectedItems = { ...selectedItems };
    delete newSelectedItems[productId];
    setSelectedItems(newSelectedItems);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedItems(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const hasSelectedItems = Object.values(selectedItems).some(selected => selected);

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    
    if (!hasSelectedItems) {
      return; // Do nothing if no items are selected
    }

    // Check if user is authenticated by checking if user object has any properties
    const isAuthenticated = Object.keys(user).length > 0;

    if (isAuthenticated) {
      history.push('/shipment');
    } else {
      toast.info('Please login to continue with checkout');
      history.push('/login');
    }
  };

  return (
    <div className="shopping-cart-content mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 ml-4 md:ml-10">Your Cart</h2>

      <div className="md:flex md:gap-8 md:px-10">
        {/* Cart Items Section */}
        <div className="md:flex-1">
          <div className="cart-items bg-[#FAFAFA]">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex items-center ml-4 md:ml-6">
                  <input
                    type="checkbox"
                    checked={selectedItems[item.id] || false}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-4 h-4 mr-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                </div>
                
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
                  className="mr-6 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="md:w-96 mt-6 md:mt-0">
          <div className="bg-[#f1f0ef] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
            
            <div className="space-y-3 bg-white p-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Discount Code Section */}
            <div className="mt-6">
              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-left text-gray-600 hover:bg-gray-50">
                Add Discount Code
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-6">
              <button
                onClick={handleCheckoutClick}
                className={`w-full block text-center py-3 px-6 rounded ${
                  hasSelectedItems 
                    ? 'bg-[#2DC071] text-white hover:bg-green-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!hasSelectedItems}
              >
                Checkout
              </button>
              
              <Link
                to="/shop"
                className="w-full block text-center py-3 px-6 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartContent;