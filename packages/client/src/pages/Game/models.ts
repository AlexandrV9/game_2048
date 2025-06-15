export type BoardRow = number[]

export type GameBoard = BoardRow[]

export enum GameStatus {
  win = 'win',
  lose = 'lose',
}

export type GameStatusType = `${GameStatus}`
