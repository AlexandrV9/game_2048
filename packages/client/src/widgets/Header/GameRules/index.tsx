import { Button } from '@/shared/ui'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'

import helpImage from '@/shared/assets/Home/Help.svg'

export const GameRules = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#6c6150] hover:bg-[#6c6150]/10">
          <img src={helpImage} alt="help" className="w-[2vw] h-[2vw]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-1002 w-[30vw] bg-[#6c6150] text-[#fbfbe9] border-none shadow-lg mr-[8vw] mt-[1vh] rounded-2xl"
        align="start">
        <div className="p-[1vw]">
          <h4 className="text-center font-bold text-sm mb-[1vw]">Правила:</h4>
          <ul className="text-sm space-y-[0.5vw]">
            <li>1. В каждом раунде появляется плитка номинала «2» или «4».</li>
            <li>
              2. Нажатием стрелки игрок может скинуть все плитки игрового поля в
              одну из 4 сторон. Если при сбрасывании две плитки одного номинала
              «налетают» одна на другую, то они превращаются в одну, номинал
              которой равен сумме соединившихся плиток. После каждого хода на
              свободной секции поля появляется новая плитка номиналом «2» или
              «4». Если при нажатии кнопки местоположение плиток или их номинал
              не изменится, то ход не совершается. Если в одной строчке или в
              одном столбце находится более двух плиток одного номинала, то при
              сбрасывании они начинают соединяться с той стороны, в которую были
              направлены. Например, находящиеся в одной строке плитки (4, 4, 4)
              после хода влево превратятся в (8, 4), а после хода вправо — в (4,
              8). Данная обработка неоднозначности позволяет более точно
              формировать стратегию игры.
            </li>
            <li>
              4. За каждое соединение игровые очки увеличиваются на номинал
              получившейся плитки.
            </li>
            <li>
              5. Игра заканчивается поражением, если после очередного хода
              невозможно совершить действие.
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
