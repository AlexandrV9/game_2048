import { Avatar, AvatarImage, Button, Card } from '@/shared/ui'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import crownImage from '../../shared/assets/Home/Crown.svg'
import forumImage from '../../shared/assets/Home/Forum.svg'
import gameImage from '../../shared/assets/Home/Game.svg'
import helpImage from '../../shared/assets/Home/Help.svg'
import homeImage from '../../shared/assets/Home/Home.svg'
import quitImage from '../../shared/assets/Home/Quit.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '@/shared/auth'
import { routesName } from '@/shared/configs/routes'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

export default function HomePage() {
  const avatarLink = useSelector((state: RootState) => state.user).user?.avatar
  const avatar = avatarLink
    ? `http://localhost:3001/yandex-api/resources${avatarLink}`
    : null
  const { signOut } = useAuth()

  return (
    <Card.Root className="w-screen h-screen flex flex-col bg-[#fbfbe9] overflow-x-hidden rounded-none gap-0 py-0 border-0">
      <Card.Header className="flex flex-col gap-0 p-0 ">
        <nav className="static flex flex-row items-center justify-center ml-[91vw]">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-[2vw] h-[2vw] text-[#6c6150] hover:bg-[#6c6150]/10 ml-0 mt-[2vh]">
                <img src={helpImage} alt="help" className="w-[2vw] h-[2vw]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="static z-1002 w-[30vw] bg-[#6c6150] text-[#fbfbe9] border-none shadow-lg mr-[8vw] mt-[1vh] rounded-2xl"
              align="start">
              <div className="p-[1vw]">
                <h4 className="text-center font-bold text-sm mb-[1vw]">
                  Правила:
                </h4>
                <ul className="text-sm space-y-[0.5vw]">
                  <li>
                    1. В каждом раунде появляется плитка номинала «2» или «4».
                  </li>
                  <li>
                    2. Нажатием стрелки игрок может скинуть все плитки игрового
                    поля в одну из 4 сторон. Если при сбрасывании две плитки
                    одного номинала «налетают» одна на другую, то они
                    превращаются в одну, номинал которой равен сумме
                    соединившихся плиток. После каждого хода на свободной секции
                    поля появляется новая плитка номиналом «2» или «4». Если при
                    нажатии кнопки местоположение плиток или их номинал не
                    изменится, то ход не совершается. Если в одной строчке или в
                    одном столбце находится более двух плиток одного номинала,
                    то при сбрасывании они начинают соединяться с той стороны, в
                    которую были направлены. Например, находящиеся в одной
                    строке плитки (4, 4, 4) после хода влево превратятся в (8,
                    4), а после хода вправо — в (4, 8). Данная обработка
                    неоднозначности позволяет более точно формировать стратегию
                    игры.
                  </li>
                  <li>
                    4. За каждое соединение игровые очки увеличиваются на
                    номинал получившейся плитки.
                  </li>
                  <li>
                    5. Игра заканчивается поражением, если после очередного хода
                    невозможно совершить действие.
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
          <div className="static w-[3vw] h-[3vw] mt-[1vw] mr-[3vw]  ml-[1vw]  rounded-full shadow-md opacity-100 hover:opacity-70 transition-opacity duration-300">
            <Avatar className="w-[3vw] h-[3vw]">
              <Link to={`${routesName.profile}/1`} className="text-blue-600">
                <AvatarImage
                  src={
                    avatar
                      ? avatar
                      : 'https://sun9-25.userapi.com/c10968/u85534956/141244771/x_4ee7e2c5.jpg'
                  }
                  alt="avatar"
                  className="rounded-full w-[3vw] h-[3vw]"
                />
              </Link>
            </Avatar>
          </div>
        </nav>
        <div className="mt-[3vh] ml-[46vw]">
          <img
            src={homeImage}
            alt="2048"
            className="text-[#6c6150] w-[8vw] h-[8vw]"
          />
        </div>
      </Card.Header>
      <Card.Content className="relative w-[60vw] h-[70vh] mt-[3vh] mb-0 p-[1vw] bg-[#fbfbe9] rounded-lg self-center border-none">
        <nav className="h-full justify-start">
          <div className="flex flex-col gap-[1vw] justify-start h-full">
            <Link to={routesName.game} className="w-max self-center">
              <Button className="h-[10vh] w-[25vw] bg-[#f6e5b4] hover:bg-[#fae5a7] active:bg-[#faedc6] cursor-pointer flex flex-row p-4 shadow-md rounded-[4vw] items-center justify-center border-none mx-auto">
                <img
                  src={gameImage}
                  alt="game"
                  className="rounded-full w-[3vw] h-[3vw] mr-[0.5vw] text-[#6c6150]"
                />
                <span className="text-[#FFA28D] font-bold text-[2vw]">
                  ИГРАТЬ
                </span>
              </Button>
            </Link>

            <Link to={routesName.leaderBoard} className="w-max self-center">
              <Button className="h-[10vh] w-[25vw] bg-[#f6e5b4] hover:bg-[#fae5a7] active:bg-[#faedc6] cursor-pointer flex flex-row p-4 shadow-md rounded-[4vw] items-center justify-center border-none mx-auto">
                <img
                  src={crownImage}
                  alt="leader"
                  className="rounded-full w-[3vw] h-[3vw] mr-[0.5vw] text-[#6c6150]"
                />
                <span className="text-[#FFA28D] font-bold text-[2vw]">
                  ЛИДЕРЫ
                </span>
              </Button>
            </Link>

            <Link to={routesName.forum} className="w-max self-center">
              <Button className="h-[10vh] w-[25vw] bg-[#f6e5b4] hover:bg-[#fae5a7] active:bg-[#faedc6] cursor-pointer flex flex-row p-4 shadow-md rounded-[4vw] items-center justify-center border-none mx-auto">
                <img
                  src={forumImage}
                  alt="forum"
                  className="rounded-full w-[3vw] h-[3vw] mr-[0.5vw] text-[#6c6150]"
                />
                <span className="text-[#FFA28D] font-bold text-[2vw]">
                  ФОРУМ
                </span>
              </Button>
            </Link>

            <Button
              onClick={() => signOut()}
              className="h-[10vh] w-[25vw] bg-[#f6e5b4] hover:bg-[#fae5a7] active:bg-[#faedc6] cursor-pointer flex flex-row p-4 shadow-md rounded-[4vw] items-center justify-center border-none mx-auto">
              <img
                src={quitImage}
                alt="quit"
                className="rounded-full w-[3vw] h-[3vw] mr-[0.5vw] text-[#6c6150]"
              />
              <span className="text-[#FFA28D] font-bold text-[2vw]">ВЫХОД</span>
            </Button>
          </div>
        </nav>
      </Card.Content>
    </Card.Root>
  )
}
