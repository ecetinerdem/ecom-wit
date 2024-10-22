import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_FETCH_STATE,
} from '../actions/clientActions';

const initialState = {
  user: {}, // User info will include the avatar
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en',
  fetchState: 'NOT_FETCHED',
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }; // User object contains all info
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    default:
      return state;
  }
}
