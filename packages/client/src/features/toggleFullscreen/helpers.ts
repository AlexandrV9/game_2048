export function toggleFullscreen(elem?: HTMLElement | null) {
  const target = elem || document.documentElement

  if (!document.fullscreenElement) {
    target.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}
