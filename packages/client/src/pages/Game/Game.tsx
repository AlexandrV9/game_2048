import GameEngine from '@/pages/Game/components/GameEngine/GameEngine'
import { GameStatusType } from '@/pages/Game/components/GameEngine/models'
import GameOver from '@/pages/Game/components/GameOver'
import StartGame from '@/pages/Game/components/StartGame'
import styles from '@/pages/Game/style.module.css'
import { GAME_STATE, GameStatus } from '@/pages/Game/types'
import { useNotification } from '@/shared/hooks/useNotification'
import { Header } from '@/widgets'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GamePage: React.FC = () => {
  const navigate = useNavigate()
  useNotification()

  const [gameState, setGameState] = useState<GAME_STATE>(GAME_STATE.START)
  const [score, setScore] = useState(0)
  const [size, setSize] = useState(4)
  const [gameStatus, setGameStatus] = useState<GameStatusType>(GameStatus.idle)

  const startGame = () => {
    setGameState(GAME_STATE.IN_GAME)
  }

  const handleGameOver = () => {
    setGameState(GAME_STATE.ENDGAME)
  }

  const handleGoToStart = () => {
    setGameState(GAME_STATE.START)
  }

  const getContent = () => {
    switch (gameState) {
      case GAME_STATE.START:
        return (
          <StartGame onStartGame={startGame} size={size} setSize={setSize} />
        )
      case GAME_STATE.IN_GAME:
        return (
          <GameEngine
            score={score}
            setScore={setScore}
            handleGameOver={handleGameOver}
            size={size}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            handleGoToStart={handleGoToStart}
          />
        )
      case GAME_STATE.ENDGAME:
        return (
          <GameOver currentHighScore={score} onRestartGame={handleGoToStart} />
        )
    }
  }

  const content = getContent()

  return (
    <div className={styles.gameBackground}>
      <Header isShowFullscreenButton isShowGoToHomeButton />
      {content}
    </div>
  )
}

export default GamePage
