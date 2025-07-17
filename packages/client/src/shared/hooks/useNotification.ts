import { useNavigate } from 'react-router-dom'
import { routesName } from '@/core/Routes'
import { useEffect } from 'react'

export const useNotification = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Notification.permission === 'granted') {
        const notification = new Notification(
          'Продолжайте играть, чтобы улучшить свой результат!',
          {
            body: 'Нажмите, чтобы продолжить играть',
            requireInteraction: true,
          }
        )

        notification.onclick = () => navigate(routesName.game)
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])
}
