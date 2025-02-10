import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  error: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return {
        message: action.payload,
        error: false,
      };
    },
    setError(state, action) {
      return {
        message: action.payload,
        error: true,
      };
    },
    clearNotification(state) {
      return {
        ...state,
        message: null,
      };
    },
  },
});

const { setMessage, setError, clearNotification } = notificationSlice.actions;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export const setErrorMessage = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setError(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
