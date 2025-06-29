import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { getCellColor } from '@/pages/Game/components/GameEngine/utils/cellColor.ts'
import { generateEmptyBoard } from '@/pages/Game/components/GameEngine/utils/generateEmptyBoard.ts'
import {
  GameBoard,
  GameMoveDirections,
  GameStatusType,
  PressingKeyObj,
  SMALL_SWIPE,
  TouchCoords,
} from './models.ts'
import styles from '@/pages/Game/style.module.css'
import { addRandomCell } from '@/pages/Game/components/GameEngine/utils/addRandomCell.ts'
import { moveLeft } from '@/pages/Game/components/GameEngine/utils/moveLeft.ts'
import { cloneBoard } from '@/pages/Game/components/GameEngine/utils/helpers.ts'
import { rotateBoard } from '@/pages/Game/components/GameEngine/utils/rotateBoard.ts'
import { endGameCheck } from '@/pages/Game/components/GameEngine/utils/endGameCheck.ts'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/AlertDialog/alert-dialog.tsx'
import { Button } from '@/shared/ui'
import { GameStatus } from '@/pages/Game/types.ts'

const getInitialCanvasSize = (cellCount: number) => {
  const size = Math.floor((window.innerHeight * 0.6) / cellCount) * cellCount
  return { width: size, height: size }
}

interface GameEngineProps {
  score: number
  setScore: Dispatch<SetStateAction<number>>
  handleGameOver: (score: number) => void
  gameStatus: GameStatusType
  setGameStatus: Dispatch<SetStateAction<GameStatusType>>
  size: number
  handleGoToStart: () => void
}

const GameEngine: React.FC<GameEngineProps> = ({
  score,
  setScore,
  handleGameOver,
  size,
  gameStatus,
  setGameStatus,
  handleGoToStart,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<TouchCoords | null>(null)
  const [board, setBoard] = useState<GameBoard>(generateEmptyBoard(size))
  const [isWinGameContinue, setIsWinGameContinue] = useState(false)
  const [canvasSize, setCanvasSize] = useState(getInitialCanvasSize(size))
  const [showDialog, setShowDialog] = useState(false)
  const [dialogType, setDialogType] = useState<GameStatusType | null>(null)

  const startGame = () => {
    const newBoard = addRandomCell(addRandomCell(generateEmptyBoard(size)))
    setBoard(newBoard)
    setScore(0)
    setGameStatus(GameStatus.playing)
    setIsWinGameContinue(false)
  }

  const handleContinue = () => {
    setShowDialog(false)
    if (dialogType === GameStatus.lose) {
      startGame()
    } else {
      setGameStatus(GameStatus.playing)
      setIsWinGameContinue(true)
    }
    setDialogType(null)
  }

  const handleExit = () => {
    setShowDialog(false)
    setGameStatus(GameStatus.idle)
    setDialogType(null)
    handleGameOver(score)
  }

  const draw = () => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) {
      return
    }
    const cellSize = canvasSize.width / size
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
    board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        //Cell
        ctx.fillStyle = getCellColor(cell)
        ctx.fillRect(
          cellIndex * cellSize,
          rowIndex * cellSize,
          cellSize,
          cellSize
        )
        // Border
        ctx.strokeStyle = '#bbb'
        ctx.strokeRect(
          cellIndex * cellSize,
          rowIndex * cellSize,
          cellSize,
          cellSize
        )
        //Number
        if (cell !== 0) {
          ctx.fillStyle = 'black'
          ctx.font = `bold ${cellSize / 3}px sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(
            cell.toString(),
            cellIndex * cellSize + cellSize / 2,
            rowIndex * cellSize + cellSize / 2
          )
        }
      })
    })
  }

  const handleKeyDown = (event: KeyboardEvent | PressingKeyObj) => {
    if (gameStatus !== GameStatus.playing) return

    let newBoard: GameBoard = cloneBoard(board)
    let moved = false
    let points = 0
    let win = false

    switch (event.key) {
      case GameMoveDirections.left:
        ;[newBoard, moved, points, win] = moveLeft(size, newBoard)
        break
      case GameMoveDirections.right:
        newBoard = rotateBoard(size, rotateBoard(size, newBoard))
        ;[newBoard, moved, points, win] = moveLeft(size, newBoard)
        newBoard = rotateBoard(size, rotateBoard(size, newBoard))
        break
      case GameMoveDirections.up:
        newBoard = rotateBoard(
          size,
          rotateBoard(size, rotateBoard(size, newBoard))
        )
        ;[newBoard, moved, points, win] = moveLeft(size, newBoard)
        newBoard = rotateBoard(size, newBoard)
        break
      case GameMoveDirections.down:
        newBoard = rotateBoard(size, newBoard)
        ;[newBoard, moved, points, win] = moveLeft(size, newBoard)
        newBoard = rotateBoard(
          size,
          rotateBoard(size, rotateBoard(size, newBoard))
        )
        break
    }

    if (moved) {
      setBoard(addRandomCell(newBoard))
      setScore(score => score + points)
      if (win && !isWinGameContinue) {
        setGameStatus(GameStatus.win)
        setDialogType(GameStatus.win)
        setShowDialog(true)
      }
      if (endGameCheck(size, newBoard)) {
        setGameStatus(GameStatus.lose)
        setDialogType(GameStatus.lose)
        setShowDialog(true)
      }
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartRef.current) return

    const touch = e.changedTouches[0]
    const dx = touch.clientX - touchStartRef.current.x
    const dy = touch.clientY - touchStartRef.current.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    if (Math.max(absDx, absDy) < SMALL_SWIPE) return

    const direction =
      absDx > absDy
        ? dx > 0
          ? GameMoveDirections.right
          : GameMoveDirections.left
        : dy > 0
        ? GameMoveDirections.down
        : GameMoveDirections.up

    handleKeyDown({ key: direction })

    touchStartRef.current = null
  }

  useEffect(() => {
    const resize = () => {
      const newCellSize =
        Math.floor(
          Math.min(window.innerWidth * 0.6, window.innerHeight * 0.6) / size
        ) * size
      setCanvasSize({ width: newCellSize, height: newCellSize })
    }

    resize()
    window.addEventListener('resize', resize)
    startGame()
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [board, gameStatus])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [board, gameStatus, size])

  useEffect(() => {
    let frameId: number
    const render = () => {
      draw()
      frameId = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(frameId)
  }, [board, canvasSize])

  return (
    <div ref={containerRef} className={styles.content}>
      <div className="w-full flex items-center justify-between sm:flex-row mb-3 gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Результат: {score}
        </h3>
        <div className="flex gap-1">
          <Button variant="outline" onClick={handleGoToStart}>
            Назад
          </Button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogType === GameStatus.win
                ? 'Вы выиграли!'
                : `Игра окончена, ваш результат: ${score}`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogType === GameStatus.win
                ? 'Хотите продолжить играть?'
                : 'Хотите начать заново?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleExit}>
              Закончить игру
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>
              {dialogType === GameStatus.win ? 'Продолжить' : 'Начать заново'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default GameEngine
