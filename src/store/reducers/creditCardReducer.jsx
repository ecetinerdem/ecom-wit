import { CARD_ACTION } from "../actions/creditCardActions";

// creditCardReducer.js
const initialState = {
    cards: [],
    loading: false,
    error: null
  };
  
  const creditCardReducer = (state = initialState, action) => {
    if (action.type !== CARD_ACTION) return state;
  
    const { actionType, payload } = action;
  
    switch (actionType) {
      case 'FETCH':
        return payload.loading
          ? { ...state, loading: true, error: null }
          : { ...state, cards: payload.data, loading: false, error: null };
      case 'ADD':
        return payload.loading
          ? { ...state, loading: true, error: null }
          : { ...state, cards: [...state.cards, payload.data], loading: false, error: null };
      case 'UPDATE':
        return payload.loading
          ? { ...state, loading: true, error: null }
          : { ...state, cards: state.cards.map(card => card.id === payload.data.id ? payload.data : card), loading: false, error: null };
      case 'DELETE':
        return payload.loading
          ? { ...state, loading: true, error: null }
          : { ...state, cards: state.cards.filter(card => card.id !== payload.data), loading: false, error: null };
      default:
        return { ...state, loading: false, error: payload.error };
    }
  };
  
  export default creditCardReducer;