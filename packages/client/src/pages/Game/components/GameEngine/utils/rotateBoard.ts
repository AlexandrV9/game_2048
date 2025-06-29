import { GameBoard } from '../models.ts'
import { generateEmptyBoard } from './generateEmptyBoard.ts'

export const rotateBoard = (size: number, board: GameBoard): GameBoard => {
  const newBoard = generateEmptyBoard(size)
  for (let row = 0; row < size; row++) {
    for (let cell = 0; cell < size; cell++) {
      newBoard[cell][size - row - 1] = board[row][cell]
    }
  }
  return newBoard
}
