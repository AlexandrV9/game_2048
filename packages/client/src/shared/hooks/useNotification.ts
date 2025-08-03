import { useEffect, useRef, useCallback } from 'react'

const NOTIFICATION_TIMEOUT = 1000 * 300

export const useNotification = () => {
  const timeoutId = useRef<NodeJS.Timeout>()

  const showNotification = useCallback(() => {
    if (!document.hidden && timeoutId.current) {
      clearTimeout(timeoutId.current)
      return
    }
    if (!document.hidden) {
      return
    }

    const timeout = setTimeout(() => {
      if (window.Notification?.permission === 'granted') {
        const notification = new window.Notification(
          'Продолжайте играть, чтобы улучшить свой результат!',
          {
            body: 'Нажмите, чтобы продолжить играть',
            requireInteraction: true,
          }
        )

        notification.onclick = () => window.focus()
      }
    }, NOTIFICATION_TIMEOUT)

    timeoutId.current = timeout
  }, [])

  useEffect(() => {
    if (window.Notification?.permission !== 'granted') {
      window.Notification?.requestPermission()
    }

    document.addEventListener('visibilitychange', showNotification)

    return () => {
      clearTimeout(timeoutId.current)
      document.removeEventListener('visibilitychange', showNotification)
    }
  }, [showNotification])
}
