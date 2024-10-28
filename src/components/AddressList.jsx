// src/components/Shipment/AddressList.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteAddress, setSelectedShippingAddress, setSelectedBillingAddress } from '../store/actions/addressActions';

const AddressList = ({ addresses, selectedAddress, type, onEdit, loading }) => {
  const dispatch = useDispatch();

  const handleSelect = (address) => {
    if (type === 'shipping') {
      dispatch(setSelectedShippingAddress(address));
    } else {
      dispatch(setSelectedBillingAddress(address));
    }
  };

  const handleDelete = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      dispatch(deleteAddress(addressId));
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading addresses...</div>;
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className={`p-4 border rounded-lg ${
            selectedAddress?.id === address.id ? 'border-[#23A6F0] bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <input
                type="radio"
                checked={selectedAddress?.id === address.id}
                onChange={() => handleSelect(address)}
                className="mt-1"
              />
              <div>
                <h4 className="font-semibold">{address.title}</h4>
                <p>{address.name} {address.surname}</p>
                <p>{address.phone}</p>
                <p>{address.neighborhood}</p>
                <p>{address.district}, {address.city}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(address)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {addresses.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No addresses found. Please add a new address.
        </div>
      )}
    </div>
  );
};

export default AddressList;