// src/pages/OrderHistory.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistoryThunk } from '../store/actions/orderActions';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const OrderHistoryContent = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrderHistoryThunk());
  }, [dispatch]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) return <div>Loading order history...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orders.length) return <div>No past orders found.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {orders.map((order) => (
          <div key={order.id}>
            <div
              onClick={() => toggleOrderDetails(order.id)}
              className="flex items-center justify-between p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
            >
              <div>
                <p className="text-gray-700 font-semibold">Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <p className="text-gray-500">Total: ${order.price}</p>
              </div>
              {expandedOrder === order.id ? <ChevronUp /> : <ChevronDown />}
            </div>
            {expandedOrder === order.id && (
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold">Order Details</h3>
                <ul className="mt-2 space-y-2">
                  {order.products.map((product, index) => (
                    <li key={index} className="flex justify-between">
                      <span>Product ID: {product.product_id}</span>
                      <span>Quantity: {product.count}</span>
                      <span>Detail: {product.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryContent;
