import { GameBoard } from '../models.ts'

export const generateEmptyBoard = (size: number): GameBoard => {
  return new Array(size).fill(null).map(() => new Array(size).fill(0))
}
