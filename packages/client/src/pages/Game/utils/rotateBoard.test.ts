import { rotateBoard } from './rotateBoard'
import { generateEmptyBoard } from './generateEmptyBoard'
import { GameBoard } from '../models'

describe('rotateBoard', () => {
  it('поворачивает 2x2 доску по часовой стрелке', () => {
    const board: GameBoard = [
      [1, 2],
      [3, 4],
    ]

    const result = rotateBoard(2, board)

    expect(result).toEqual([
      [3, 1],
      [4, 2],
    ])
  })

  it('поворачивает 3x3 доску по часовой стрелке', () => {
    const board: GameBoard = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]

    const result = rotateBoard(3, board)

    expect(result).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ])
  })

  it('не изменяет пустую доску', () => {
    const board = generateEmptyBoard(4)
    const rotated = rotateBoard(4, board)
    expect(rotated).toEqual(board)
  })

  it('не мутирует оригинальную доску', () => {
    const board: GameBoard = [
      [1, 2],
      [3, 4],
    ]
    const boardCopy = JSON.parse(JSON.stringify(board))
    rotateBoard(2, board)
    expect(board).toEqual(boardCopy)
  })
})
