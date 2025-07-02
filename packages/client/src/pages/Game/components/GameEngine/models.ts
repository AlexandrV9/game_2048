import { GameStatus } from '@/pages/Game/types'

export type BoardRow = number[]

export type GameBoard = BoardRow[]

export enum GameMoveDirections {
  left = 'ArrowLeft',
  right = 'ArrowRight',
  up = 'ArrowUp',
  down = 'ArrowDown',
}

export type GameStatusType = `${GameStatus}`
export type GameMoveDirectionType = `${GameMoveDirections}`

export interface TouchCoords {
  x: number
  y: number
}

export interface PressingKeyObj {
  key: GameMoveDirectionType
}

export const SMALL_SWIPE = 30
