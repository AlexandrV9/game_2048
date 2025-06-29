import { generateEmptyBoard } from './generateEmptyBoard'

describe('generateEmptyBoard', () => {
  it('создаёт пустую квадратную доску нужного размера', () => {
    const size = 4
    const board = generateEmptyBoard(size)
    expect(board.length).toBe(size)
    board.forEach(row => {
      expect(row.length).toBe(size)
      expect(row.every(cell => cell === 0)).toBe(true)
    })
  })
})
