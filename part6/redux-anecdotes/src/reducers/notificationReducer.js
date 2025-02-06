import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  visible: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return { message: action.payload, visible: true }
    },
    clearNotification(state) {
      return { ...state, visible: false }
    }
  }
})

const { setMessage, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
