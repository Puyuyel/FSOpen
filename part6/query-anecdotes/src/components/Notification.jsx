import { useContext } from 'react'
import { useNotificationMessage } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationMessage()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification