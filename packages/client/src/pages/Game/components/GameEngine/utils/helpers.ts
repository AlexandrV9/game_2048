import { GameBoard } from '../models'

export const getRandomNumber = (max: number) => Math.floor(Math.random() * max)

export const cloneBoard = (board: GameBoard) => board.map(row => [...row])
