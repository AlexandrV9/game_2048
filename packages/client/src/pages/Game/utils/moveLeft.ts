import { GameBoard } from '../models.js'

export const moveLeft = (
  size: number,
  board: GameBoard
): [GameBoard, boolean, number, boolean] => {
  let moved = false
  let score = 0
  let won = false

  const newBoard = board.map(row => {
    const filtered = row.filter(n => n !== 0)
    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2
        if (filtered[i] === 2048) won = true
        score += filtered[i]
        filtered[i + 1] = 0
        moved = true
      }
    }
    const compacted = filtered.filter(n => n !== 0)
    while (compacted.length < size) compacted.push(0)
    if (compacted.toString() !== row.toString()) moved = true
    return compacted
  })
  return [newBoard, moved, score, won]
}
