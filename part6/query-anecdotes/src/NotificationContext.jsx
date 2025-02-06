import React, { createContext, useReducer } from 'react'
import { useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[ notification, notificationDispatch ]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationMessage = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[1]
}

export default NotificationContext