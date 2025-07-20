import { useEffect, useRef } from 'react'

const NOTIFICATION_TIMEOUT = 300000

const handleNotification = async (onChangeVisibility: VoidFunction) => {
  if (window.Notification?.permission !== 'granted') {
    await window.Notification?.requestPermission()
  }

  document.addEventListener('visibilitychange', onChangeVisibility)
}

export const useNotification = () => {
  const timeoutId = useRef<NodeJS.Timeout>()

  const showNotification = () => {
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
  }

  useEffect(() => {
    handleNotification(showNotification)

    return () => {
      clearTimeout(timeoutId.current)
      document.removeEventListener('visibilitychange', showNotification)
    }
  }, [])
}
