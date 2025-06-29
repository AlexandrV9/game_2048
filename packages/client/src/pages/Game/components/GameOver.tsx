import React from 'react'
import styles from '@/pages/Game/style.module.css'
import { Link } from 'react-router-dom'
import { routesName } from '@/shared/configs/routes'
import { Button } from '@/shared/ui'

interface GameOverProps {
  currentHighScore: number
  onRestartGame: () => void
}

const GameOver: React.FC<GameOverProps> = ({
  onRestartGame,
  currentHighScore,
}) => {
  return (
    <div className={`${styles.content}`}>
      <h1>Игра окончена!</h1>
      <h2 className="mt-2">Ваш новый результат: {currentHighScore}</h2>
      <div className="flex mt-2 gap-3">
        <Button onClick={onRestartGame}>Попробовать снова</Button>
        <Link to={routesName.home}>
          <Button>Домой</Button>
        </Link>
      </div>
    </div>
  )
}

export default GameOver
