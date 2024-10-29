import { ADD_CARD_FAILURE, ADD_CARD_REQUEST, ADD_CARD_SUCCESS, DELETE_CARD_FAILURE, DELETE_CARD_REQUEST, DELETE_CARD_SUCCESS, FETCH_CARDS_FAILURE, FETCH_CARDS_REQUEST, FETCH_CARDS_SUCCESS, UPDATE_CARD_FAILURE, UPDATE_CARD_REQUEST, UPDATE_CARD_SUCCESS } from "../actions/creditCardActions";

// creditCardReducer.js
const initialState = {
    cards: [],
    loading: false,
    error: null,
    addingCard: false,
    updatingCard: false,
    deletingCard: false
  };
  
  const creditCardReducer = (state = initialState, action) => {
    switch (action.type) {
      // Fetch cases
      case FETCH_CARDS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CARDS_SUCCESS:
        return { ...state, loading: false, cards: action.payload, error: null };
      case FETCH_CARDS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Add cases
      case ADD_CARD_REQUEST:
        return { ...state, addingCard: true, error: null };
      case ADD_CARD_SUCCESS:
        return {
          ...state,
          addingCard: false,
          cards: [...state.cards, action.payload],
          error: null
        };
      case ADD_CARD_FAILURE:
        return { ...state, addingCard: false, error: action.payload };
  
      // Update cases
      case UPDATE_CARD_REQUEST:
        return { ...state, updatingCard: true, error: null };
      case UPDATE_CARD_SUCCESS:
        return {
          ...state,
          updatingCard: false,
          cards: state.cards.map(card => 
            card.id === action.payload.id ? action.payload : card
          ),
          error: null
        };
      case UPDATE_CARD_FAILURE:
        return { ...state, updatingCard: false, error: action.payload };
  
      // Delete cases
      case DELETE_CARD_REQUEST:
        return { ...state, deletingCard: true, error: null };
      case DELETE_CARD_SUCCESS:
        return {
          ...state,
          deletingCard: false,
          cards: state.cards.filter(card => card.id !== action.payload),
          error: null
        };
      case DELETE_CARD_FAILURE:
        return { ...state, deletingCard: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default creditCardReducer;