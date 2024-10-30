// src/components/Shipment/ShipmentContent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAddresses, setSelectedShippingAddress, setSelectedBillingAddress } from '../store/actions/addressActions';
import AddressForm from '../components/AddressForm';
import AddressList from '../components/AddressList';
import { toast } from 'react-toastify';

const ShipmentContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);
  const [useSameAddress, setUseSameAddress] = useState(false);

  const { addresses, loading } = useSelector((state) => state.address);
  const cartItems = useSelector((state) => state.shoppingCart.cart);
  const selectedShippingAddress = useSelector((state) => state.address.selectedShippingAddress);
  const selectedBillingAddress = useSelector((state) => state.address.selectedBillingAddress);

  useEffect(() => {
    if (!cartItems.length) {
      toast.info('Your cart is empty');
      history.push('/cart');
      return;
    }
    dispatch(fetchAddresses());
  }, [dispatch, history, cartItems]);

  // Effect to set default addresses if none selected
  useEffect(() => {
    if (addresses.length > 0) {
      if (!selectedShippingAddress) {
        dispatch(setSelectedShippingAddress(addresses[0]));
      }
      if (!selectedBillingAddress && !useSameAddress) {
        dispatch(setSelectedBillingAddress(addresses[0]));
      }
    }
  }, [addresses, selectedShippingAddress, selectedBillingAddress, dispatch, useSameAddress]);

  // Effect to handle "use same address" functionality
  useEffect(() => {
    if (useSameAddress && selectedShippingAddress) {
      dispatch(setSelectedBillingAddress(selectedShippingAddress));
    }
  }, [useSameAddress, selectedShippingAddress, dispatch]);

  const handleAddNewAddress = (type) => {
    if (type === 'shipping') {
      setShowShippingForm(true);
      setShowBillingForm(false);
    } else {
      setShowBillingForm(true);
      setShowShippingForm(false);
    }
    setIsEditMode(false);
    setEditAddressData(null);
  };

  const handleEditAddress = (address) => {
    setEditAddressData(address);
    setIsEditMode(true);
    if (address === selectedShippingAddress) {
      setShowShippingForm(true);
      setShowBillingForm(false);
    } else {
      setShowBillingForm(true);
      setShowShippingForm(false);
    }
  };

  const handleFormClose = () => {
    setShowShippingForm(false);
    setShowBillingForm(false);
    setIsEditMode(false);
    setEditAddressData(null);
  };

  const handleAddressSelection = (address, type) => {
    if (type === 'shipping') {
      dispatch(setSelectedShippingAddress(address));
      if (useSameAddress) {
        dispatch(setSelectedBillingAddress(address));
      }
    } else if (type === 'billing' && !useSameAddress) {
      dispatch(setSelectedBillingAddress(address));
    }
  };

  const handleUseSameAddress = (e) => {
    setUseSameAddress(e.target.checked);
    if (e.target.checked && selectedShippingAddress) {
      dispatch(setSelectedBillingAddress(selectedShippingAddress));
    }
  };

  const handleContinueToPayment = () => {
    if (!selectedShippingAddress || (!selectedBillingAddress && !useSameAddress)) {
      toast.error('Please select both shipping and billing addresses');
      return;
    }
    history.push('/payment');
  };

  return (
    <div className="mt-8 px-4 md:px-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Shipping & Billing Information</h2>

      <div className="md:flex md:gap-8">
        {/* Left Column - Address Lists */}
        <div className="md:w-2/3">
          {/* Shipping Address Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Shipping Address</h3>
              <button
                onClick={() => handleAddNewAddress('shipping')}
                className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-blue-600"
              >
                Add New Address
              </button>
            </div>
            
            <AddressList
              addresses={addresses}
              selectedAddress={selectedShippingAddress}
              type="shipping"
              onEdit={handleEditAddress}
              onSelect={handleAddressSelection}
              loading={loading}
            />
          </div>

          {/* Use Same Address Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useSameAddress}
                onChange={handleUseSameAddress}
                className="form-checkbox"
              />
              <span>Use shipping address as billing address</span>
            </label>
          </div>

          {/* Billing Address Section */}
          {!useSameAddress && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-700">Billing Address</h3>
                <button
                  onClick={() => handleAddNewAddress('billing')}
                  className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-blue-600"
                >
                  Add New Address
                </button>
              </div>
              
              <AddressList
                addresses={addresses}
                selectedAddress={selectedBillingAddress}
                type="billing"
                onEdit={handleEditAddress}
                onSelect={handleAddressSelection}
                loading={loading}
              />
            </div>
          )}
        </div>

        {/* Right Column - Summary and Actions */}
        <div className="md:w-1/3">
          <div className="bg-[#f1f0ef] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Delivery Summary</h3>
            
            {/* Selected Addresses Summary */}
            <div className="space-y-4 mb-6">
              {selectedShippingAddress && (
                <div className="p-4 bg-white rounded">
                  <p className="font-semibold">Shipping to:</p>
                  <p>{selectedShippingAddress.name} {selectedShippingAddress.surname}</p>
                  <p>{selectedShippingAddress.address}</p>
                  <p>{selectedShippingAddress.city}, {selectedShippingAddress.district}</p>
                </div>
              )}

              {!useSameAddress && selectedBillingAddress && (
                <div className="p-4 bg-white rounded">
                  <p className="font-semibold">Billing to:</p>
                  <p>{selectedBillingAddress.name} {selectedBillingAddress.surname}</p>
                  <p>{selectedBillingAddress.address}</p>
                  <p>{selectedBillingAddress.city}, {selectedBillingAddress.district}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleContinueToPayment}
                className="w-full py-3 px-6 bg-[#2DC071] text-white rounded hover:bg-green-600"
              >
                Continue to Payment
              </button>
              
              <button
                onClick={() => history.push('/cart')}
                className="w-full py-3 px-6 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      {(showShippingForm || showBillingForm) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <AddressForm
              onClose={handleFormClose}
              isEdit={isEditMode}
              initialData={editAddressData}
              type={showShippingForm ? 'shipping' : 'billing'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentContent;