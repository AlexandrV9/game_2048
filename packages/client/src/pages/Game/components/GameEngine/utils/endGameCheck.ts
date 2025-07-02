import { GameBoard } from '../models'

export const endGameCheck = (size: number, board: GameBoard): boolean => {
  for (let row = 0; row < size; row++) {
    for (let cell = 0; cell < size; cell++) {
      if (board[row][cell] === 0) {
        return false
      }
      if (cell < size - 1 && board[row][cell] === board[row][cell + 1])
        return false
      if (row < size - 1 && board[row][cell] === board[row + 1][cell])
        return false
    }
  }
  return true
}
