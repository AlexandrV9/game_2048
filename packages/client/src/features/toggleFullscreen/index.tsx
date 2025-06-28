import { Button, Tooltip } from '@/shared/ui'
import { FullscreenOffIcon, FullscreenOnIcon } from '@/shared/ui/icons'
import { useCallback, useEffect, useState } from 'react'
import { toggleFullscreen } from './helpers'

export const ToggleFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement)
  const [isFullscreenAllowed, setIsFullscreenAllowed] = useState(false)

  const handleClick = useCallback(() => {
    toggleFullscreen()
  }, [])

  const getTooltipText = useCallback(() => {
    if (!isFullscreenAllowed) {
      return 'Fullscreen is not allowed in this browser'
    }

    if (isFullscreen) {
      return 'Click to button that exit fullscreen mode'
    }

    return 'Click to enter fullscreen'
  }, [isFullscreenAllowed, isFullscreen])

  useEffect(() => {
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
        <p>{getTooltipText()}</p>
      </Tooltip.Content>
    </Tooltip>
  )
}
