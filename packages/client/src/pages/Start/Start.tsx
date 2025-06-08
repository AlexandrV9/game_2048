import React, { useRef, useEffect, useState } from 'react'
import { getCellColor } from './utils/cellColor.js'
import { generateEmptyBoard } from './utils/generateEmptyBoard.js'
import { GameBoard } from './models.js'
import { addRandomCell } from './utils/addRandomCell.js'
import { moveLeft } from './utils/moveLeft.js'
import { cloneBoard } from './utils/helpers.js'
import { rotateBoard } from './utils/rotateBoard.js'
import { endGameCheck } from './utils/endGameCheck.js'

const SIZE = 4
const CELL_SIZE = 100
const WIDTH = SIZE * CELL_SIZE
const HEIGHT = SIZE * CELL_SIZE

const Game2048: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [board, setBoard] = useState<GameBoard>(generateEmptyBoard(SIZE))
  const [score, setScore] = useState(0)
  const [isWin, setIsWin] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [isGameOver, setGameOver] = useState(false)

  const startGame = () => {
    const newBoard = addRandomCell(addRandomCell(generateEmptyBoard(SIZE)))
    setBoard(newBoard)
    setScore(0)
    setIsWin(false)
    setIsStarted(true)
    setGameOver(false)
  }

  const draw = () => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) {
      return
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        //Cell
        ctx.fillStyle = cell === 0 ? '#ccc' : getCellColor(cell)
        ctx.fillRect(
          cellIndex * CELL_SIZE,
          rowIndex * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        )
        // Border
        ctx.strokeStyle = '#bbb'
        ctx.strokeRect(
          cellIndex * CELL_SIZE,
          rowIndex * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        )
        //Number
        if (cell !== 0) {
          ctx.fillStyle = 'black'
          ctx.font = 'bold 32px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(
            cell.toString(),
            cellIndex * CELL_SIZE + CELL_SIZE / 2,
            rowIndex * CELL_SIZE + CELL_SIZE / 2
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
        ;[newBoard, moved, points, win] = moveLeft(SIZE, newBoard)
        break
      case 'ArrowRight':
        newBoard = rotateBoard(SIZE, rotateBoard(SIZE, newBoard))
        ;[newBoard, moved, points, win] = moveLeft(SIZE, newBoard)
        newBoard = rotateBoard(SIZE, rotateBoard(SIZE, newBoard))
        break
      case 'ArrowUp':
        newBoard = rotateBoard(
          SIZE,
          rotateBoard(SIZE, rotateBoard(SIZE, newBoard))
        )
        ;[newBoard, moved, points, win] = moveLeft(SIZE, newBoard)
        newBoard = rotateBoard(SIZE, newBoard)
        break
      case 'ArrowDown':
        newBoard = rotateBoard(SIZE, newBoard)
        ;[newBoard, moved, points, win] = moveLeft(SIZE, newBoard)
        newBoard = rotateBoard(
          SIZE,
          rotateBoard(SIZE, rotateBoard(SIZE, newBoard))
        )
        break
    }

    if (moved) {
      setBoard(addRandomCell(newBoard))
      setScore(score => score + points)
      if (win) {
        setIsWin(true)
        const proceed = window.confirm('You win, continue?')
        if (!proceed) {
          setIsStarted(false)
        }
      }
      if (endGameCheck(SIZE, newBoard)) {
        setIsStarted(false)
        setGameOver(true)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [board, isStarted, isWin, isGameOver])

  useEffect(() => {
    const animationLoop = () => {
      draw()
      requestAnimationFrame(animationLoop)
    }
    animationLoop()
  }, [board])

  return (
    <div>
      <h2>Score: {score}</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={startGame}>Start game</button>
        <button onClick={startGame}>Restart</button>
      </div>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
      {!isStarted && <p>Enter start game for play</p>}
      {isGameOver && <p>You lose, your score {score}</p>}
    </div>
  )
}

export default Game2048
