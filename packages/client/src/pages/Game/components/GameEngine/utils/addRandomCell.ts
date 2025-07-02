import { getRandomNumber } from './helpers'
import { GameBoard } from '../models'

export const addRandomCell = (board: GameBoard): GameBoard => {
  const emptyCells: GameBoard = []
  board.forEach((row, rowIndex) =>
    row.forEach((cell, cellIndex) => {
      if (cell === 0) {
        emptyCells.push([rowIndex, cellIndex])
      }
    })
  )
  if (emptyCells.length === 0) {
    return board
  }
  const [row, cell] = emptyCells[getRandomNumber(emptyCells.length)]
  board[row][cell] = Math.random() < 0.5 ? 2 : 4
  return board
}
