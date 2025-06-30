import { addRandomCell } from './addRandomCell'
import { generateEmptyBoard } from './generateEmptyBoard'

describe('addRandomCell', () => {
  it('добавляет одну случайную ячейку 2 или 4 на пустую доску', () => {
    const size = 4
    const board = generateEmptyBoard(size)
    const newBoard = addRandomCell(board)

    const nonZeroCells = newBoard.flat().filter(v => v !== 0)
    expect(nonZeroCells.length).toBe(1)
    expect([2, 4]).toContain(nonZeroCells[0])
  })

  it('не меняет доску, если нет пустых клеток', () => {
    const fullBoard = Array(4)
      .fill(0)
      .map(() => [2, 4, 8, 16])
    const newBoard = addRandomCell(fullBoard)
    expect(newBoard).toEqual(fullBoard)
  })
})
