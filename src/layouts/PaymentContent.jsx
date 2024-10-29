import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCardsThunk, addCardThunk, updateCardThunk, deleteCardThunk } from '../store/actions/creditCardActions';
import { calculateCartTotals } from '../store/actions/shoppingCartActions';
import { useForm } from 'react-hook-form';
import { CreditCard, Trash2, Edit, Plus } from 'lucide-react';

const PaymentContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { cards, loading, error } = useSelector((state) => state.creditCard);
  const { subtotal, tax, total } = useSelector((state) => state.shoppingCart);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editingCard, setEditingCard] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCardsThunk());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    dispatch(calculateCartTotals());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      if (editingCard) {
        await dispatch(updateCardThunk({ ...data, id: editingCard.id }));
      } else {
        await dispatch(addCardThunk(data));
      }
      setShowAddForm(false);
      setEditingCard(null);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await dispatch(deleteCardThunk(cardId));
      if (selectedCard === cardId) setSelectedCard(null);
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
    });
    setShowAddForm(true);
  };

  const handleCompletePayment = async () => {
    if (!selectedCard) return;
    try {
      // Add your payment processing logic here
      history.push('/order');
    } catch (error) {
      console.error('Payment processing error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
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

            {showAddForm && (
              <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      {...register("card_no", {
                        required: "Card number is required",
                        pattern: {
                          value: /^[0-9]{16}$/,
                          message: "Please enter a valid 16-digit card number"
                        }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-[#23A6F0] focus:outline-none text-lg py-2 px-3"
                      type="text"
                      maxLength={16}
                    />
                    {errors.card_no && <span className="text-red-500 text-sm">{errors.card_no.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                    <input
                      {...register("name_on_card", { 
                        required: "Name on card is required",
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message: "Please enter only characters and spaces"
                        }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-[#23A6F0] focus:outline-none text-lg py-2 px-3"
                      type="text"
                    />
                    {errors.name_on_card && <span className="text-red-500 text-sm">{errors.name_on_card.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiration Month</label>
                    <select
                      {...register("expire_month", {
                        required: "Expiration month is required"
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-[#23A6F0] focus:outline-none text-lg py-2 px-3"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    {errors.expire_month && <span className="text-red-500 text-sm">{errors.expire_month.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiration Year</label>
                    <input
                      {...register("expire_year", {
                        required: "Expiration year is required",
                        pattern: {
                          value: /^\d{4}$/,
                          message: "Please enter a valid 4-digit year"
                        },
                        min: { value: new Date().getFullYear(), message: "Invalid year" },
                        max: { value: new Date().getFullYear() + 10, message: "Invalid year" }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-[#23A6F0] focus:outline-none text-lg py-2 px-3"
                      type="text"
                      maxLength={4}
                    />
                    {errors.expire_year && <span className="text-red-500 text-sm">{errors.expire_year.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      {...register("cvv", {
                        required: "CVV is required",
                        pattern: {
                          value: /^\d{3}$/,
                          message: "Please enter a valid 3-digit CVV"
                        }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-[#23A6F0] focus:outline-none text-lg py-2 px-3"
                      type="password"
                      maxLength={3}
                    />
                    {errors.cvv && <span className="text-red-500 text-sm">{errors.cvv.message}</span>}
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCard(null);
                      reset();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#23A6F0] text-white rounded-lg hover:bg-[#1a94d9]"
                  >
                    {editingCard ? 'Update Card' : 'Add Card'}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {Array.isArray(cards) && cards.length > 0 ? (
                cards.map((card) => (
                  card && card.id ? (
                    <div
                      key={card.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedCard === card.id
                          ? 'border-[#23A6F0] bg-blue-50'
                          : 'border-gray-200 hover:border-[#23A6F0]'
                      }`}
                      onClick={() => setSelectedCard(card.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <CreditCard className="text-[#23A6F0]" size={24} />
                          <div>
                            <p className="font-medium">
                              **** **** **** {card.card_no ? card.card_no.slice(-4) : 'XXXX'}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires {card.expire_month || 'XX'}/{card.expire_year || 'XXXX'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(card);
                            }}
                            className="p-2 text-gray-500 hover:text-[#23A6F0] rounded-full hover:bg-blue-50"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(card.id);
                            }}
                            className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null
                ))
              ) : (
                <p>No cards available. Please add a card.</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>${tax?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCompletePayment}
              className={`w-full mt-6 py-3 px-4 rounded-lg transition-colors ${
                selectedCard
                  ? 'bg-[#2DC071] hover:bg-[#25a862] text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!selectedCard || loading}
            >
              {loading ? 'Processing...' : 'Complete Payment'}
            </button>

            {!cards.length ? (
              <p className="text-sm text-red-500 mt-2 text-center">
                Please add a payment method to continue
              </p>
            ) : !selectedCard && (
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