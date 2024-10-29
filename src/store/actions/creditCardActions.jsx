// creditCardActions.js
import api from '../../services/api';
import { toast } from 'react-toastify';

export const CARD_ACTION = 'CARD_ACTION';

const cardAction = (actionType, payload) => ({
  type: CARD_ACTION,
  actionType,
  payload
});

const apiCall = async (dispatch, actionType, apiFunc, successMessage) => {
  dispatch(cardAction(actionType, { loading: true }));
  try {
    const response = await apiFunc();
    dispatch(cardAction(actionType, { data: response.data, loading: false }));
    toast.success(successMessage);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || `Failed to ${actionType}`;
    dispatch(cardAction(actionType, { error: errorMessage, loading: false }));
    toast.error(errorMessage);
    return Promise.reject(errorMessage);
  }
};

export const fetchCardsThunk = () => (dispatch) =>
  apiCall(dispatch, 'FETCH', () => api.get('/user/card'), 'Cards fetched successfully');

export const addCardThunk = (cardData) => (dispatch) =>
  apiCall(dispatch, 'ADD', () => api.post('/user/card', formatCardData(cardData)), 'Card added successfully');

export const updateCardThunk = (cardData) => (dispatch) =>
  apiCall(dispatch, 'UPDATE', () => api.put('/user/card', formatCardDataForUpdate(cardData)), 'Card updated successfully');

export const deleteCardThunk = (cardId) => (dispatch) =>
  apiCall(dispatch, 'DELETE', () => api.delete(`/user/card/${cardId}`), 'Card deleted successfully');

// Helper function to format card data for POST
const formatCardData = (cardData) => ({
  card_no: cardData.card_no.replace(/\s/g, ''),
  expire_month: parseInt(cardData.expire_month),
  expire_year: parseInt(cardData.expire_year),
  name_on_card: cardData.name_on_card
});

// Helper function to format card data for PUT
const formatCardDataForUpdate = (cardData) => ({
  id: cardData.id,
  card_no: cardData.card_no.replace(/\s/g, ''),
  expire_month: parseInt(cardData.expire_month),
  expire_year: parseInt(cardData.expire_year),
  name_on_card: cardData.name_on_card
});