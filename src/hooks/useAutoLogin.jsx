// src/hooks/useAutoLogin.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api'; // Adjust the import based on your structure
import { setCurrentUser, clearUser } from '../store/actions/clientActions'; 

const useAutoLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Make a GET request to verify the token
      api.get('/verify')
        .then((response) => {
          const user = response.data;
          dispatch(setCurrentUser(user)); // Set the user in the Redux store
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token'); // Remove invalid token
          dispatch(clearUser()); // Clear user data
        });
    }
  }, [dispatch]);
};

export default useAutoLogin;
