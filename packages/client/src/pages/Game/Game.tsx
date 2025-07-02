import React, { useState } from 'react'
import GameOver from '@/pages/Game/components/GameOver'
import StartGame from '@/pages/Game/components/StartGame'
import { GAME_STATE, GameStatus } from '@/pages/Game/types'
import styles from '@/pages/Game/style.module.css'
import { useNavigate } from 'react-router-dom'
import { routesName } from '@/shared/configs/routes'
import { GameStatusType } from '@/pages/Game/components/GameEngine/models'
import GameEngine from '@/pages/Game/components/GameEngine/GameEngine'
import { ToggleFullscreen } from '@/features/toggleFullscreen'

const GamePage: React.FC = () => {
  const navigate = useNavigate()

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

  return (
    <div className={styles.gameBackground}>
      <div className="absolute top-[30px] right-[30px]">
        <ToggleFullscreen />
      </div>
      <button
        title="На страницу домой"
        className={styles.outButton}
        onClick={() => {
          navigate(routesName.home)
        }}>
        <img alt="На страницу домой" src="/out.svg" />
      </button>
      {gameState === GAME_STATE.START && (
        <StartGame onStartGame={startGame} size={size} setSize={setSize} />
      )}
      {gameState === GAME_STATE.IN_GAME && (
        <GameEngine
          score={score}
          setScore={setScore}
          handleGameOver={handleGameOver}
          size={size}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          handleGoToStart={handleGoToStart}
        />
      )}
      {gameState === GAME_STATE.ENDGAME && (
        <GameOver currentHighScore={score} onRestartGame={handleGoToStart} />
      )}
    </div>
  )
}

export default GamePage
