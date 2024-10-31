// src/layouts/OrderHistoryContent.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import { fetchOrderHistoryThunk } from '../store/actions/orderActions';
import { format } from 'date-fns';

const OrderHistoryContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [expandedOrders, setExpandedOrders] = useState([]);

  const { orders, loading, error } = useSelector(state => state.order);
  const user = useSelector(state => state.client.user);

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      history.push('/login');
      return;
    }

    dispatch(fetchOrderHistoryThunk());
  }, [user, dispatch, history]);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Console logs for debugging
  console.log('Redux state:', useSelector(state => state));
  console.log('Orders from state:', orders);
  console.log('Loading:', loading);
  console.log('Error:', error);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white text-[#23A6F0] rounded-lg shadow p-6">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                    <p className="text-[#737373] font-semibold">
                      {format(new Date(order.order_date), 'PPP')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="mr-4 font-semibold">
                      ${order.price.toFixed(2)}
                    </p>
                    {expandedOrders.includes(order.id) ? (
                      <ChevronUp className="w-6 h-6 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedOrders.includes(order.id) && (
                  <div className="mt-4 border-t pt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Payment Details</h3>
                        <p className="text-[#737373] font-semibold">
                          Card holder: {order.card_name}
                        </p>
                        <p className="text-[#737373] font-semibold">
                          Card number: ****{order.card_no.toString().slice(-4)}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Products</h3>
                        <div className="space-y-2">
                          {order.products.map((product, index) => (
                            <div 
                              key={`${order.id}-${product.product_id}-${index}`}
                              className="flex justify-between items-center bg-gray-50 p-3 rounded"
                            >
                              <div>
                                <p className="font-medium">
                                  Product ID: {product.product_id}
                                </p>
                                {product.detail && (
                                  <p className="text-sm text-gray-600">
                                    {product.detail}
                                  </p>
                                )}
                              </div>
                              <p className="text-[#737373] font-semibold">
                                Quantity: {product.count}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryContent;