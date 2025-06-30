import { toast } from 'react-toastify'

export function toggleFullscreen(elem?: HTMLElement | null) {
  try {
    const target = elem || document.documentElement

    if (!document.fullscreenElement) {
      target.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  } catch {
    toast.error('Failed open the screen in fullscreen mode')
  }
}
