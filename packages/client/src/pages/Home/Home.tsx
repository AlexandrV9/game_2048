import { useAuth } from '@/shared/auth'
import { routesName } from '@/shared/configs/routes'
import { useNotification } from '@/shared/hooks/useNotification'
import { Button, Card } from '@/shared/ui'
import { Header } from '@/widgets'
import homeImage from '@/shared/assets/Home/Home.svg'
import {
  CrownIcon,
  GameIcon,
  MessageIcon,
  TurnOffIcon,
} from '@/shared/ui/icons'
import { LinkButton } from './LinkButton'
import clsx from 'clsx'

export default function HomePage() {
  const { signOut } = useAuth()

  useNotification()

  return (
    <Card.Root className="w-screen h-screen flex flex-col bg-amber-50 dark:bg-gray-800 overflow-x-hidden rounded-none gap-0 py-0 border-0">
      <Card.Header className="flex flex-col gap-[1rem] p-0">
        <Header isShowGameRules />
        <div className="flex justify-center w-full">
          <img
            src={homeImage}
            alt="2048"
            className="text-amber-800 dark:text-amber-200 w-[8vw] h-[8vw]"
          />
        </div>
      </Card.Header>
      <Card.Content className="relative w-[60vw] h-[70vh] mt-[3vh] mb-0 p-[1vw] rounded-lg self-center border-none">
        <nav className="flex flex-col gap-[2rem]">
          <LinkButton
            link={routesName.game}
            text="ИГРАТЬ"
            icon={
              <GameIcon
                className="text-amber-600 dark:text-amber-100"
                size={50}
              />
            }
          />
          <LinkButton
            link={routesName.leaderBoard}
            text="ЛИДЕРЫ"
            icon={
              <CrownIcon
                className="text-amber-600 dark:text-amber-100"
                size={50}
              />
            }
          />
          <LinkButton
            link={routesName.forum}
            text="ФОРУМ"
            icon={
              <MessageIcon
                className="text-amber-600 dark:text-amber-100"
                size={50}
              />
            }
          />
          <Button
            onClick={signOut}
            className={clsx(
              'h-[10vh] w-[25vw] max-w-[500px] min-w-[300px]',
              'flex items-center justify-center',
              'dark:bg-amber-600 dark:hover:bg-amber-700 dark:active:bg-amber-500',
              'bg-amber-200 hover:bg-amber-300 active:bg-amber-100 cursor-pointer p-4 shadow-md rounded-[4vw] border-none mx-auto transition-colors'
            )}>
            <TurnOffIcon
              size={50}
              className="text-amber-600 dark:text-amber-100"
            />
            <span className="text-amber-600 dark:text-amber-100 font-bold text-[2rem]">
              ВЫХОД
            </span>
          </Button>
        </nav>
      </Card.Content>
    </Card.Root>
  )
}
