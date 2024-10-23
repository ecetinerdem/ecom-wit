import axios from 'axios';
import { toast } from 'react-toastify';

// Action to update the client reducer with user info
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

// Action for logout
export const logoutUser = () => ({
  type: 'LOGOUT'
});

// Thunk action for logging in
export const loginUserThunk = ({ email, password }) => async (dispatch) => {
  try {
    const response = await axios.post('/login', { email, password });

    const { user, token } = response.data;

    // Store token in localStorage
    localStorage.setItem('token', token);

    // Dispatch user info to the client reducer
    dispatch(setUser({ ...user, gravatar: `https://www.gravatar.com/avatar/${md5(email)}` }));

    return { success: true, token };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Login failed' };
  }
};

// Add this new thunk action for logging out
export const logoutUserThunk = () => async (dispatch) => {
  try {
    // Attempt to call logout endpoint if you have one
    try {
      await axios.post('/logout');
    } catch (err) {
      console.log('Logout API call failed, but continuing with local logout');
    }

    // Remove token from localStorage
    localStorage.removeItem('token');

    // Dispatch logout action
    dispatch(logoutUser());

    return { success: true };
  } catch (error) {
    return { success: false, message: 'Logout failed' };
  }
};