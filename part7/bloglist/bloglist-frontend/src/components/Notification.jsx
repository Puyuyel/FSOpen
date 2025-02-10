import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.message === null) {
    return null;
  }

  const className = notification.error ? 'notification error' : 'notification';

  return <div className={className}>{notification.message}</div>;
};

export default Notification;
