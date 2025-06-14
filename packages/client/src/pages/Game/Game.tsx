import React, { useRef, useEffect, useState } from 'react'
import { getCellColor } from './utils/cellColor.js'
import { generateEmptyBoard } from './utils/generateEmptyBoard.js'
import { GameBoard, GameStatus, GameStatusType } from './models.js'
import { addRandomCell } from './utils/addRandomCell.js'
import { moveLeft } from './utils/moveLeft.js'
import { cloneBoard } from './utils/helpers.js'
import { rotateBoard } from './utils/rotateBoard.js'
import { endGameCheck } from './utils/endGameCheck.js'
import { Button } from '@/components/ui/button.js'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog.js'
import { Link } from 'react-router-dom'
import { routesName } from '@/core/Routes.js'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.js'

// const SIZE = 3

const getInitialCanvasSize = (cellCount: number) => {
  const size = Math.floor((window.innerHeight * 0.6) / cellCount) * cellCount
  return { width: size, height: size }
}

const Game2048: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(4)
  const [board, setBoard] = useState<GameBoard>(generateEmptyBoard(size))
  const [score, setScore] = useState(0)
  const [isWin, setIsWin] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [isGameOver, setGameOver] = useState(false)
  const [canvasSize, setCanvasSize] = useState(getInitialCanvasSize(size))
  const [showDialog, setShowDialog] = useState(false)
  const [dialogType, setDialogType] = useState<GameStatusType | null>(null)

  const startGame = () => {
    const newBoard = addRandomCell(addRandomCell(generateEmptyBoard(size)))
    setBoard(newBoard)
    setScore(0)
    setIsWin(false)
    setIsStarted(true)
    setGameOver(false)
  }

  const handleContinue = () => {
    setShowDialog(false)
    if (dialogType === GameStatus.lose) {
      startGame()
    } else {
      setIsStarted(true)
      setIsWin(false)
    }
    setDialogType(null)
  }

  const handleExit = () => {
    setShowDialog(false)
    setIsStarted(false)
    setGameOver(false)
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isStarted || isWin) return

    let newBoard: GameBoard = cloneBoard(board)
    let moved = false
    let points = 0
    let win = false

    switch (event.key) {
      case 'ArrowLeft':
        ;[newBoard, moved, points, win] = moveLeft(size, newBoard)
        break
      case 'ArrowRight':
        newBoard = rotateBoard(size, rotateBoard(size, newBoard))
        ;[newBoard, moved, points, win] = moveLeft(size, newBoard)
        newBoard = rotateBoard(size, rotateBoard(size, newBoard))
        break
      case 'ArrowUp':
        newBoard = rotateBoard(
          size,
          rotateBoard(size, rotateBoard(size, newBoard))
        )
        ;[newBoard, moved, points, win] = moveLeft(size, newBoard)
        newBoard = rotateBoard(size, newBoard)
        break
      case 'ArrowDown':
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
      if (win && isWin) {
        setIsWin(true)
        setDialogType(GameStatus.win)
        setShowDialog(true)
      }
      if (endGameCheck(size, newBoard)) {
        setIsStarted(false)
        setGameOver(true)
        setDialogType(GameStatus.lose)
        setShowDialog(true)
      }
    }
  }

  useEffect(() => {
    const resize = () => {
      const newCellSize =
        Math.floor(
          Math.min(window.innerWidth * 0.6, window.innerHeight * 0.6) / size
        ) * size
      console.log('Resized to:', newCellSize, 'x', newCellSize)
      setCanvasSize({ width: newCellSize, height: newCellSize })
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [board, isStarted, isWin, isGameOver])

  useEffect(() => {
    if (canvasSize.width === 0) return
    const animationLoop = () => {
      draw()
      requestAnimationFrame(animationLoop)
    }
    animationLoop()
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
              <TabsTrigger value="8" disabled={isStarted || isGameOver}>
                Easy
              </TabsTrigger>
              <TabsTrigger value="4" disabled={isStarted || isGameOver}>
                Normal
              </TabsTrigger>
              <TabsTrigger value="3" disabled={isStarted || isGameOver}>
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
