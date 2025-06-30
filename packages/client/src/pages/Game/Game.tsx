import React, { useRef, useEffect, useState } from 'react'
import { getCellColor } from './utils/cellColor'
import { generateEmptyBoard } from './utils/generateEmptyBoard'
import {
  GameBoard,
  GameMoveDirections,
  GameStatus,
  GameStatusType,
  PressingKeyObj,
  SMALL_SWIPE,
  TouchCoords,
} from './models'
import { addRandomCell } from './utils/addRandomCell'
import { moveLeft } from './utils/moveLeft'
import { cloneBoard } from './utils/helpers'
import { rotateBoard } from './utils/rotateBoard'
import { endGameCheck } from './utils/endGameCheck'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/AlertDialog/alert-dialog'
import { Link } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/Tabs/tabs'
import { Button } from '@/shared/ui/index'
import { routesName } from '@/shared/configs/routes'

const getInitialCanvasSize = (cellCount: number) => {
  const size = Math.floor((window.innerHeight * 0.6) / cellCount) * cellCount
  return { width: size, height: size }
}

const Game2048: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<TouchCoords | null>(null)
  const [size, setSize] = useState(4)
  const [board, setBoard] = useState<GameBoard>(generateEmptyBoard(size))
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState<GameStatusType>(GameStatus.idle)
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
    <div
      ref={containerRef}
      className="w-full h-dvh flex flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        {' '}
        2048
      </h1>
      <div
        className="flex flex-col-reverse sm:flex-row justify-between mb-1 gap-2"
        style={{ width: 'min(60dvh, 60dvw)' }}>
        <div className="flex flex-col justify-end">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Score: {score}
          </h3>
          <Tabs
            defaultValue={size.toString()}
            onValueChange={(value: string) => setSize(Number(value))}>
            <TabsList>
              <TabsTrigger
                value="8"
                disabled={gameStatus === GameStatus.playing}>
                Easy
              </TabsTrigger>
              <TabsTrigger
                value="4"
                disabled={gameStatus === GameStatus.playing}>
                Normal
              </TabsTrigger>
              <TabsTrigger
                value="3"
                disabled={gameStatus === GameStatus.playing}>
                Hard
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={startGame}>
            Start game
          </Button>
          <Button
            variant="outline"
            className="border-2 cursor-pointer"
            onClick={startGame}>
            Restart
          </Button>
          <Button className="cursor-pointer">
            <Link to={routesName.home}>Home</Link>
          </Button>
        </div>
      </div>
      <canvas
        data-testid="game-canvas"
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogType === GameStatus.win
                ? 'You win!'
                : `Game over, your score: ${score}`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogType === GameStatus.win
                ? 'Do you want to continue playing?'
                : 'Do you want to restart game?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleExit}>
              {dialogType === GameStatus.win ? 'Exit' : 'Back to game'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>
              {dialogType === GameStatus.win ? 'Continue' : 'Restart'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Game2048
