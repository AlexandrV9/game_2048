import { endGameCheck } from './endGameCheck'
import { GameBoard } from '../models'

describe('endGameCheck', () => {
  it('возвращает false если есть хотя бы одна пустая клетка (0)', () => {
    const board: GameBoard = [
      [2, 4, 2],
      [4, 0, 2],
      [2, 4, 8],
    ]
    expect(endGameCheck(3, board)).toBe(false)
  })

  it('возвращает false если есть соседние одинаковые по горизонтали', () => {
    const board: GameBoard = [
      [2, 2, 4],
      [8, 16, 32],
      [64, 128, 256],
    ]
    expect(endGameCheck(3, board)).toBe(false)
  })

  it('возвращает false если есть соседние одинаковые по вертикали', () => {
    const board: GameBoard = [
      [2, 4, 8],
      [2, 16, 32],
      [4, 128, 256],
    ]
    expect(endGameCheck(3, board)).toBe(false)
  })

  it('возвращает true если нет пустых и нет соседних одинаковых', () => {
    const board: GameBoard = [
      [2, 4, 8],
      [16, 32, 64],
      [128, 256, 512],
    ]
    expect(endGameCheck(3, board)).toBe(true)
  })

  it('работает на поле 4x4', () => {
    const board: GameBoard = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 4096],
      [8192, 16384, 32768, 65536],
    ]
    expect(endGameCheck(4, board)).toBe(true)
  })
})
