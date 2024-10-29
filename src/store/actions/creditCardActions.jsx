import api from '../../services/api';
import { toast } from 'react-toastify';

// Action Types
export const FETCH_CARDS_REQUEST = 'FETCH_CARDS_REQUEST';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';

export const ADD_CARD_REQUEST = 'ADD_CARD_REQUEST';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE';

export const UPDATE_CARD_REQUEST = 'UPDATE_CARD_REQUEST';
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const UPDATE_CARD_FAILURE = 'UPDATE_CARD_FAILURE';

export const DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const DELETE_CARD_FAILURE = 'DELETE_CARD_FAILURE';

// Action Creators
const fetchCardsRequest = () => ({ type: FETCH_CARDS_REQUEST });
const fetchCardsSuccess = (cards) => ({ type: FETCH_CARDS_SUCCESS, payload: cards });
const fetchCardsFailure = (error) => ({ type: FETCH_CARDS_FAILURE, payload: error });

const addCardRequest = () => ({ type: ADD_CARD_REQUEST });
const addCardSuccess = (card) => ({ type: ADD_CARD_SUCCESS, payload: card });
const addCardFailure = (error) => ({ type: ADD_CARD_FAILURE, payload: error });

const updateCardRequest = () => ({ type: UPDATE_CARD_REQUEST });
const updateCardSuccess = (card) => ({ type: UPDATE_CARD_SUCCESS, payload: card });
const updateCardFailure = (error) => ({ type: UPDATE_CARD_FAILURE, payload: error });

const deleteCardRequest = () => ({ type: DELETE_CARD_REQUEST });
const deleteCardSuccess = (cardId) => ({ type: DELETE_CARD_SUCCESS, payload: cardId });
const deleteCardFailure = (error) => ({ type: DELETE_CARD_FAILURE, payload: error });

// Thunks
// creditCardActions.js
export const addCardThunk = (cardData) => async (dispatch) => {
    dispatch(addCardRequest());
    try {
      const formattedData = {
        card_no: cardData.card_no.replace(/\s/g, ''),
        expire_month: parseInt(cardData.expire_month),
        expire_year: parseInt(cardData.expire_year),
        name_on_card: cardData.name_on_card,
        cvv: cardData.cvv
      };
  
      const response = await api.post('/user/card', formattedData);
      dispatch(addCardSuccess(response.data));
      toast.success('Card added successfully');
      return response.data; // Return the response data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add card';
      dispatch(addCardFailure(errorMessage));
      toast.error(errorMessage);
      return Promise.reject(errorMessage); // Explicitly reject the promise
    }
  };
  
  export const updateCardThunk = (cardData) => async (dispatch) => {
    dispatch(updateCardRequest());
    try {
      const formattedData = {
        card_no: cardData.card_no.replace(/\s/g, ''),
        expire_month: parseInt(cardData.expire_month),
        expire_year: parseInt(cardData.expire_year),
        name_on_card: cardData.name_on_card,
        cvv: cardData.cvv
      };
  
      const response = await api.put(`/user/card/${cardData.id}`, formattedData);
      dispatch(updateCardSuccess(response.data));
      toast.success('Card updated successfully');
      return response.data; // Return the response data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update card';
      dispatch(updateCardFailure(errorMessage));
      toast.error(errorMessage);
      return Promise.reject(errorMessage); // Explicitly reject the promise
    }
  };
  
  export const fetchCardsThunk = (cardData) => async (dispatch) => {
    dispatch(fetchCardsRequest());
    try {
      const response = await api.get('/user/card');
      dispatch(fetchCardsSuccess(response.data));
      return response.data; // Return the response data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch cards';
      dispatch(fetchCardsFailure(errorMessage));
      toast.error(errorMessage);
      return Promise.reject(errorMessage); // Explicitly reject the promise
    }
  };
  
  export const deleteCardThunk = (cardId) => async (dispatch) => {
    dispatch(deleteCardRequest());
    try {
      await api.delete(`/user/card/${cardId}`);
      dispatch(deleteCardSuccess(cardId));
      toast.success('Card deleted successfully');
      return true; // Return success indicator
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete card';
      dispatch(deleteCardFailure(errorMessage));
      toast.error(errorMessage);
      return Promise.reject(errorMessage); // Explicitly reject the promise
    }
  };