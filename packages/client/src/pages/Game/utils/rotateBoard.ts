import { GameBoard } from '../models.js'
import { generateEmptyBoard } from './generateEmptyBoard.js'

export const rotateBoard = (size: number, board: GameBoard): GameBoard => {
  const newBoard = generateEmptyBoard(size)
  for (let row = 0; row < size; row++) {
    for (let cell = 0; cell < size; cell++) {
      newBoard[cell][size - row - 1] = board[row][cell]
    }
  }
  return newBoard
}
