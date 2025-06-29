import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import styles from '@/pages/Game/style.module.css'
import { Button } from '@/shared/ui'
import { GameStatusType } from '@/pages/Game/components/GameEngine/models.ts'
import clsx from 'clsx'

interface StartGameProps {
  onStartGame: () => void
  size: number
  setSize: Dispatch<SetStateAction<number>>
}

const StartGame: React.FC<StartGameProps> = ({
  onStartGame,
  size,
  setSize,
}) => {
  const [countdown, setCountdown] = useState(-1)
  const [showInstructions, setShowInstructions] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      onStartGame()
    }
  }, [countdown, onStartGame])

  const handleStartClick = () => {
    setCountdown(3)
  }

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions)
  }

  return (
    <>
      {countdown > 0 ? (
        <div className={styles.countdown}>
          <h1>{countdown}</h1>
        </div>
      ) : (
        <div className={clsx(styles.content, 'gap-4')}>
          <h1>Добро пожаловать в 2048!</h1>
          <h3>Выберите сложность</h3>
          <div className="flex flex-row gap-2">
            <Button
              variant={size === 8 ? 'default' : 'outline'}
              onClick={() => {
                setSize(8)
              }}>
              Легко
            </Button>
            <Button
              variant={size === 4 ? 'default' : 'outline'}
              onClick={() => {
                setSize(4)
              }}>
              Нормально
            </Button>
            <Button
              variant={size === 3 ? 'default' : 'outline'}
              onClick={() => {
                setSize(3)
              }}>
              Сложно
            </Button>
          </div>
          <Button variant="default" onClick={handleStartClick}>
            Начать игру
          </Button>
          <Button variant="default" onClick={toggleInstructions}>
            {showInstructions ? 'Скрыть подсказки' : 'Показать подсказки'}
          </Button>
          {showInstructions && (
            <div className={styles.instructions}>
              <h2>Как играть:</h2>
              <h3>Основные правила:</h3>
              <p>
                Игра 2048 — это логическая игра, в которой вам нужно
                комбинировать плитки, чтобы создать плитку с числом 2048.
              </p>

              <h3>Управление:</h3>
              <p>
                Вы можете управлять плитками с помощью стрелок на клавиатуре:
              </p>
              <ul>
                <li>
                  <strong>Вверх</strong> — перемещает плитки вверх.
                </li>
                <li>
                  <strong>Вниз</strong> — перемещает плитки вниз.
                </li>
                <li>
                  <strong>Влево</strong> — перемещает плитки влево.
                </li>
                <li>
                  <strong>Вправо</strong> — перемещает плитки вправо.
                </li>
              </ul>
              <h3>Комбинирование плиток:</h3>
              <p>
                Когда плитки с одинаковыми числами сталкиваются, они
                объединяются в одну плитку с суммой этих чисел. Например, если
                вы переместите плитку с 2 и плитку с 2, они объединятся в плитку
                с 4.
              </p>
              <h3>Цель игры:</h3>
              <p>
                Ваша цель — создать плитку с числом 2048. Однако, если вы
                достигнете этого числа, вы можете продолжать играть, чтобы
                установить новый рекорд!
              </p>

              <h3>Советы:</h3>
              <ul>
                <li>Старайтесь держать плитки с большими числами в углах.</li>
                <li>Не забывайте планировать свои ходы заранее.</li>
                <li>
                  Избегайте случайных движений — всегда думайте о следующем
                  шаге!
                </li>
              </ul>

              <p>Удачи!</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default StartGame
