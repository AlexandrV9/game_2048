import { moveLeft } from './moveLeft'
import { GameBoard } from '../models'

describe('moveLeft', () => {
  it('сдвигает и объединяет клетки влево', () => {
    const board: GameBoard = [
      [2, 2, 0, 0],
      [4, 0, 4, 0],
      [8, 0, 0, 8],
      [16, 16, 16, 16],
    ]
    const [newBoard, moved, score, won] = moveLeft(4, board)

    expect(newBoard).toEqual([
      [4, 0, 0, 0],
      [8, 0, 0, 0],
      [16, 0, 0, 0],
      [32, 32, 0, 0],
    ])
    expect(moved).toBe(true)
    expect(score).toBe(4 + 8 + 16 + 32 + 32)
    expect(won).toBe(false)
  })

  it('не делает move если нечего сдвигать или объединять', () => {
    const board: GameBoard = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 4096],
      [8192, 16384, 32768, 65536],
    ]
    const [newBoard, moved, score, won] = moveLeft(4, board)

    expect(newBoard).toEqual(board)
    expect(moved).toBe(false)
    expect(score).toBe(0)
    expect(won).toBe(false)
  })

  it('объединяет только один раз за ход', () => {
    const board: GameBoard = [
      [2, 2, 4, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    const [newBoard, moved, score, won] = moveLeft(4, board)

    expect(newBoard).toEqual([
      [4, 8, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
    expect(moved).toBe(true)
    expect(score).toBe(4 + 8)
    expect(won).toBe(false)
  })

  it('отмечает победу если появляется 2048', () => {
    const board: GameBoard = [
      [1024, 1024, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    const [newBoard, moved, score, won] = moveLeft(4, board)

    expect(newBoard).toEqual([
      [2048, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
    expect(moved).toBe(true)
    expect(score).toBe(2048)
    expect(won).toBe(true)
  })
})
