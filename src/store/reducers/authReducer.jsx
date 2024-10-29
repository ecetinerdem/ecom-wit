import { AUTH_CHECK_COMPLETE, AUTH_ERROR, AUTH_LOADING, LOGOUT, SET_USER } from "../actions/authActions";

// authReducer.js
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    authCheckComplete: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_LOADING:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case SET_USER:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null
        };
  
      case LOGOUT:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null
        };
  
      case AUTH_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
  
      case AUTH_CHECK_COMPLETE:
        return {
          ...state,
          loading: false,
          authCheckComplete: true
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;