import { GameBoard } from '../models.js'

export const getRandomNumber = (max: number) => Math.floor(Math.random() * max)

export const cloneBoard = (board: GameBoard) => board.map(row => [...row])
