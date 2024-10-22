import axios from 'axios';

// Action to update the client reducer with user info
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

// Thunk action for logging in
export const loginUserThunk = ({ email, password }) => async (dispatch) => {
  try {
    const response = await axios.post('/login', { email, password });

    const { user, token } = response.data;

    // Dispatch user info to the client reducer
    dispatch(setUser({ ...user, gravatar: `https://www.gravatar.com/avatar/${md5(email)}` }));

    return { success: true, token };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Login failed' };
  }
};
