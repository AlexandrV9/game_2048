import React, { useEffect } from 'react'
import styles from '@/pages/Game/style.module.css'
import { Link } from 'react-router-dom'
import { routesName } from '@/shared/configs/routes'
import { Button } from '@/shared/ui'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { User } from '@/shared/types'
import { LeaderboardService } from '@/shared/api/services/leaderbord-service'

interface GameOverProps {
  currentHighScore: number
  onRestartGame: () => void
}

const GameOver: React.FC<GameOverProps> = ({
  onRestartGame,
  currentHighScore,
}) => {
  const userInfo = useSelector((state: RootState) => state.user).user

  const setUserScore = async (user: User, score: number) => {
    try {
      const response = await LeaderboardService.setUserScore({
        userId: user.id,
        userName: user.first_name,
        score: score,
      })
    } catch (error) {
      console.error('Проблема с сохранением результата')
    }
  }

  useEffect(() => {
    if (!userInfo || !currentHighScore) return
    void setUserScore(userInfo, currentHighScore)
  }, [userInfo, currentHighScore])

  return (
    <div className={`${styles.content}`}>
      <h1>Игра окончена!</h1>
      <h2 className="mt-2">Ваш результат: {currentHighScore}</h2>
      <div className="flex mt-2 gap-3">
        <Button
          variant="outline"
          className="bg-[#f6e5b4] hover:bg-[#fae5a7] active:bg-[#faedc6]"
          onClick={onRestartGame}>
          Попробовать снова
        </Button>
        <Link to={routesName.home}>
          <Button
            variant="outline"
            className="bg-[#f6e5b4] hover:bg-[#fae5a7] active:bg-[#faedc6]">
            Домой
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default GameOver
