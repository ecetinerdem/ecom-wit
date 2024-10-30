// src/layouts/OrderContent.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderContent = () => {
  const history = useHistory();
  const currentOrder = useSelector(state => state.order.currentOrder);
  const loading = useSelector(state => state.order.loading);

  useEffect(() => {
    // If no current order, redirect to home
    if (!currentOrder && !loading) {
      history.push('/');
    }
  }, [currentOrder, loading, history]);

  if (!currentOrder) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Completed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <div className="mb-6">
          <p className="text-sm text-gray-500">Order number:</p>
          <p className="font-medium">{currentOrder.id}</p>
        </div>
        <button
          onClick={() => history.push('/')}
          className="w-full bg-[#23A6F0] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderContent;