import axios from 'axios';
import { toast } from 'react-toastify'; // For showing error messages

export const setCurrentUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const setRoles = (roles) => ({
  type: 'SET_ROLES',
  payload: roles,
});

export const setTheme = (theme) => ({
  type: 'SET_THEME',
  payload: theme,
});

export const setLanguage = (language) => ({
  type: 'SET_LANGUAGE',
  payload: language,
});

// Thunk to fetch roles if not already fetched
export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { client } = getState();
    
    if (!client.roles.length) {
      try {
        
        const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/roles');
        
        
        dispatch(setRoles(response.data));
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    }
  };
};




// actions/clientActions.js


export const login = (email, password, rememberMe) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', {
        email,
        password,
      });

      const userData = response.data;
      dispatch(setCurrentUser(userData)); // Use the renamed action creator

      if (rememberMe) {
        localStorage.setItem('token', userData.token);
      }

      return userData; // Return the user data
    } catch (error) {
      toast.error('Login failed! Please check your credentials.');
      throw error; // Re-throw the error so it can be caught in the onSubmit function
    }
  };
};
