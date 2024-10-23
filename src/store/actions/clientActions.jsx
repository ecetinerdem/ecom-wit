
import { toast } from 'react-toastify';
import { getGravatarUrl } from '../../utils/gravatarUtil';
import api from '../../services/api'; // Import your Axios instance

export const setCurrentUser = (user) => {
  const gravatarUrl = user.email ? getGravatarUrl(user.email) : null;
  return {
    type: 'SET_USER',
    payload: { ...user, gravatarUrl }
  };
};

export const clearUser = () => ({
  type: 'SET_USER',
  payload: {}, // Clear user data
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

export const login = (email, password, rememberMe) => {
  return async (dispatch) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const userData = response.data;

      // Add Gravatar URL to user data
      const userDataWithGravatar = {
        ...userData,
        gravatarUrl: getGravatarUrl(email)
      };

      dispatch(setCurrentUser(userDataWithGravatar));

      if (rememberMe) {
        localStorage.setItem('token', userData.token);
      }

      return userDataWithGravatar;
    } catch (error) {
      toast.error('Login failed! Please check your credentials.');
      throw error;
    }
  };
};
