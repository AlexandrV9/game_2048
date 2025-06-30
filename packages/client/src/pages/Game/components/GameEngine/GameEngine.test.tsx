import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import GameEngine from './GameEngine'
import { GameStatus } from '@/pages/Game/types'

const mockSetScore = jest.fn()
const mockHandleGameOver = jest.fn()
const mockSetGameStatus = jest.fn()
const mockHandleGoToStart = jest.fn()

const defaultProps = {
  score: 0,
  setScore: mockSetScore,
  handleGameOver: mockHandleGameOver,
  gameStatus: GameStatus.playing,
  setGameStatus: mockSetGameStatus,
  size: 4,
  handleGoToStart: mockHandleGoToStart,
}

describe('GameEngine', () => {
  let originalGetContext: typeof HTMLCanvasElement.prototype.getContext
  let mockContext: Partial<jest.Mocked<CanvasRenderingContext2D>>
  beforeEach(() => {
    originalGetContext = HTMLCanvasElement.prototype.getContext

    mockContext = {
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      strokeRect: jest.fn(),
      strokeStyle: '',
      fillStyle: '',
      font: '',
      textAlign: 'center',
      textBaseline: 'middle',
    }

    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: jest.fn((contextId: string) => {
        if (contextId === '2d') {
          return mockContext
        }
        return null
      }),
    })
  })
  afterEach(() => {
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: originalGetContext,
    })
    jest.restoreAllMocks()
  })
  it('рендерит компонент GameEngine', () => {
    render(<GameEngine {...defaultProps} />)

    expect(screen.getByText(/Результат/i)).toBeInTheDocument()
  })

  it('вызывает handleGoToStart при нажатии кнопки "Назад"', () => {
    render(<GameEngine {...defaultProps} />)

    const backButton = screen.getByRole('button', { name: /Назад/i })
    fireEvent.click(backButton)

    expect(mockHandleGoToStart).toHaveBeenCalledTimes(1)
  })

  it('canvas присутствует и имеет корректные размеры', () => {
    render(<GameEngine {...defaultProps} />)
    const canvas = screen.getByTestId('game-canvas')

    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveAttribute('width')
    expect(canvas).toHaveAttribute('height')

    const width = parseInt(canvas.getAttribute('width') || '0', 10)
    const height = parseInt(canvas.getAttribute('height') || '0', 10)

    expect(width).toBeGreaterThan(0)
    expect(height).toBeGreaterThan(0)
  })

  it('реагирует на нажатие клавиш (ArrowLeft)', () => {
    render(<GameEngine {...defaultProps} />)

    const canvas = screen.getByTestId('game-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    const fillRectSpy = jest.spyOn(ctx!, 'fillRect')

    fireEvent.keyDown(window, { key: 'ArrowLeft' })

    expect(fillRectSpy).toHaveBeenCalled()
  })

  it('реагирует на свайп', () => {
    render(<GameEngine {...defaultProps} />)

    const canvas = screen.getByTestId('game-canvas') as HTMLCanvasElement

    const touchStart = { clientX: 100, clientY: 100 }
    const touchEnd = { clientX: 200, clientY: 100 }

    const ctx = canvas.getContext('2d')
    const fillRectSpy = jest.spyOn(ctx!, 'fillRect')

    fireEvent.touchStart(canvas, {
      touches: [touchStart],
    })
    fireEvent.touchEnd(canvas, {
      changedTouches: [touchEnd],
    })

    expect(fillRectSpy).toHaveBeenCalled()
  })
})
