import { Button, Tooltip } from '@/shared/ui'
import { FullscreenOffIcon, FullscreenOnIcon } from '@/shared/ui/icons'
import { useCallback, useEffect, useState } from 'react'
import { toggleFullscreen } from './helpers'

export const ToggleFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFullscreenAllowed, setIsFullscreenAllowed] = useState(false)

  const handleClick = useCallback(() => {
    toggleFullscreen()
  }, [])

  const tooltipText = !isFullscreenAllowed
    ? 'Fullscreen is not allowed in this browser'
    : isFullscreen
    ? 'Click to exit fullscreen'
    : 'Click to enter fullscreen'

  useEffect(() => {
    setIsFullscreen(!!document.fullscreenElement)

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    setIsFullscreenAllowed(
      typeof document.documentElement.requestFullscreen === 'function'
    )
  }, [])

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Button onClick={handleClick} disabled={!isFullscreenAllowed}>
          {isFullscreen ? <FullscreenOnIcon /> : <FullscreenOffIcon />}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>{tooltipText}</p>
      </Tooltip.Content>
    </Tooltip>
  )
}
