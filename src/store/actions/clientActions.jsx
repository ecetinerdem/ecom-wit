// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state,
});

// Thunk Action Creator to Fetch Roles
export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client; // Access roles from client reducer

    if (roles.length === 0) {
      dispatch(setFetchState('FETCHING')); // Optionally set fetch state to FETCHING
      try {
        const response = await fetch('/api/roles'); // Fetch roles from an API
        const data = await response.json();
        dispatch(setRoles(data)); // Dispatch the setRoles action with the fetched data
        dispatch(setFetchState('FETCHED')); // Optionally set fetch state to FETCHED
      } catch (error) {
        console.error('Failed to fetch roles', error);
        dispatch(setFetchState('FAILED')); // Optionally set fetch state to FAILED
      }
    }
  };
};
