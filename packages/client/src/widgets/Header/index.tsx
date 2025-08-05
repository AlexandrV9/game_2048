import { RootState } from '@/app/store'
import { ThemeSwitcher } from '@/features'
import { routesName } from '@/shared/configs/routes'
import { Avatar, AvatarImage, Button, Tooltip } from '@/shared/ui'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GameRules } from './GameRules'
import { ToggleFullscreen } from '@/features/toggleFullscreen'
import { ArrowLeftIcon } from '@/shared/ui/icons'

const fallbackAvatar =
  'https://sun9-25.userapi.com/c10968/u85534956/141244771/x_4ee7e2c5.jpg'

export interface HeaderProps {
  isShowFullscreenButton?: boolean
  isShowGameRules?: boolean
  isShowGoToHomeButton?: boolean
  isShowUserAvatar?: boolean
}

export const Header = ({
  isShowGameRules = false,
  isShowFullscreenButton = false,
  isShowGoToHomeButton = false,
  isShowUserAvatar = true,
}: HeaderProps) => {
  const navigate = useNavigate()

  const avatarLink = useSelector((state: RootState) => state.user).user?.avatar
  const avatar = avatarLink
    ? `${import.meta.env.VITE_AVATAR_URL}${avatarLink}`
    : null

  return (
    <header className="flex w-full p-[1rem]">
      {isShowGoToHomeButton && (
        <Tooltip>
          <Tooltip.Trigger>
            <Button onClick={() => navigate(routesName.home)}>
              <ArrowLeftIcon />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>Go to home page</p>
          </Tooltip.Content>
        </Tooltip>
      )}

      <div className="flex items-center gap-[1rem] ml-auto">
        <ThemeSwitcher />
        {isShowFullscreenButton && <ToggleFullscreen />}
        {isShowGameRules && (
          <div className="flex items-center justify-center">
            <GameRules />
          </div>
        )}
        {isShowUserAvatar && (
          <Avatar className="w-[3vw] h-[3vw] rounded-full shadow-md opacity-100 hover:opacity-70 transition-opacity duration-300">
            <Link to={`${routesName.profile}/1`} className="text-blue-600">
              <AvatarImage
                src={avatar ? avatar : fallbackAvatar}
                alt="avatar"
                className="rounded-full w-[3vw] h-[3vw]"
              />
            </Link>
          </Avatar>
        )}
      </div>
    </header>
  )
}
