import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCardsThunk, addCardThunk, updateCardThunk, deleteCardThunk } from '../store/actions/creditCardActions';
import { useForm } from 'react-hook-form';
import { CreditCard, Trash2, Edit, Plus } from 'lucide-react';

const PaymentContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cards, loading, error } = useSelector((state) => state.creditCard);
  const cartTotal = useSelector((state) => state.shoppingCart.total);
  const { isAuthenticated, loading: authLoading, authCheckComplete } = useSelector(state => state.auth);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editingCard, setEditingCard] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    if (authCheckComplete && !isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated, history, authCheckComplete]);

  // Fetch cards only if authenticated
  useEffect(() => {
    if (isAuthenticated && authCheckComplete) {
      dispatch(fetchCardsThunk()).catch((error) => {
        console.error('Failed to fetch cards:', error);
      });
    }
  }, [dispatch, isAuthenticated, authCheckComplete]);

  const onSubmit = async (data) => {
    try {
      if (editingCard) {
        await dispatch(updateCardThunk({ ...data, id: editingCard.id }))
          .then((response) => {
            if (response) {
              setShowAddForm(false);
              setEditingCard(null);
              reset();
              // Refresh cards list
              dispatch(fetchCardsThunk());
            }
          });
      } else {
        await dispatch(addCardThunk(data))
          .then((response) => {
            if (response) {
              setShowAddForm(false);
              reset();
              // Refresh cards list
              dispatch(fetchCardsThunk());
            }
          });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };
  
  const handleDelete = async (cardId) => {
    try {
      await dispatch(deleteCardThunk(cardId)).unwrap();
      setSelectedCard(null); // Clear selection if deleted card was selected
      dispatch(fetchCardsThunk());
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    reset({
      card_no: card.card_no,
      expire_month: card.expire_month,
      expire_year: card.expire_year,
      name_on_card: card.name_on_card,
      cvv: '', // CVV should always be re-entered for security
    });
    setShowAddForm(true);
  };

  const handleCompletePayment = async () => {
    if (!selectedCard) {
      return;
    }

    if (authLoading || !authCheckComplete) {
        return (
          <div className="w-full h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
          </div>
        );
      }
    
      // Render loading state for cards
      if (loading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#23A6F0]"></div>
          </div>
        );
      }
    
      // Show error state
      if (error) {
        return (
          <div className="text-center text-red-500 p-4">
            <p>Error loading payment methods. Please try again later.</p>
          </div>
        );
      }
    
      // Render main content only if authenticated
      if (!isAuthenticated) {
        return null; // Return null as we're already redirecting in useEffect
      }
    
    try {
      // Add your payment processing logic here
      // For example:
      // await dispatch(processPaymentThunk({ cardId: selectedCard, amount: cartTotal }));
      history.push('/orders');
    } catch (error) {
      console.error('Payment processing error:', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error loading payment methods. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Card Management */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Payment Methods</h2>
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setEditingCard(null);
                  reset();
                }}
                className="flex items-center gap-2 bg-[#23A6F0] text-white px-4 py-2 rounded-lg"
              >
                <Plus size={20} />
                Add New Card
              </button>
            </div>

            {/* Add/Edit Card Form */}
            {showAddForm && (
              <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      {...register("card_no", { 
                        required: true, 
                        pattern: /^\d{16}$/,
                        maxLength: 16
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 px-3 py-2"
                      placeholder="1234567890123456"
                      type="text"
                      inputMode="numeric"
                      onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16)}
                    />
                    {errors.card_no && <span className="text-red-500 text-sm">Valid 16-digit card number required</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                    <input
                      {...register("name_on_card", { required: true })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 px-3 py-2"
                    />
                    {errors.name_on_card && <span className="text-red-500 text-sm">Name is required</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Month</label>
                    <input
                      {...register("expire_month", { 
                        required: true, 
                        min: 1, 
                        max: 12,
                        pattern: /^(0?[1-9]|1[012])$/
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 px-3 py-2"
                      type="text"
                      inputMode="numeric"
                      maxLength="2"
                      onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2)}
                    />
                    {errors.expire_month && <span className="text-red-500 text-sm">Valid month (1-12) required</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Year</label>
                    <input
                      {...register("expire_year", { 
                        required: true, 
                        min: new Date().getFullYear(),
                        max: new Date().getFullYear() + 20,
                        pattern: /^\d{4}$/
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 px-3 py-2"
                      type="text"
                      inputMode="numeric"
                      maxLength="4"
                      onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4)}
                    />
                    {errors.expire_year && <span className="text-red-500 text-sm">Valid 4-digit year required</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      {...register("cvv", { 
                        required: true, 
                        pattern: /^\d{3}$/
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 px-3 py-2"
                      type="text"
                      inputMode="numeric"
                      maxLength="3"
                      onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3)}
                      placeholder="123"
                    />
                                        {errors.cvv && <span className="text-red-500 text-sm">Valid 3-digit CVV required</span>}
                  </div>
                </div>

                <div className="mt-4 flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#23A6F0] text-white px-4 py-2 rounded-lg"
                  >
                    {editingCard ? 'Update Card' : 'Add Card'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCard(null);
                      setShowAddForm(false);
                      reset();
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Saved Cards List */}
            <div className="space-y-4">
              {cards.map((card) => (
                <div key={card.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      checked={selectedCard === card.id}
                      onChange={() => setSelectedCard(card.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <CreditCard className="text-[#23A6F0]" size={24} />
                    <div>
                      <p className="font-medium">**** **** **** {card.card_no.slice(-4)}</p>
                      <p className="text-sm text-gray-600">{card.name_on_card}</p>
                      <p className="text-sm text-gray-600">Expires: {card.expire_month}/{card.expire_year}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(card)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee</span>
                <span>$0.00</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCompletePayment}
              className="w-full mt-6 bg-[#2DC071] text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
              disabled={!selectedCard}
            >
              Complete Payment
            </button>

            {!cards.length && (
              <p className="text-sm text-red-500 mt-2 text-center">
                Please add a payment method to continue
              </p>
            )}
            {cards.length > 0 && !selectedCard && (
              <p className="text-sm text-red-500 mt-2 text-center">
                Please select a card to complete payment
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentContent;