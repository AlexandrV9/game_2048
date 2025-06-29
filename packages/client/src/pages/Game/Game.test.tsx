import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Game2048 from './Game'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Game2048 Component', () => {
  it('рендерит заголовок и кнопки', () => {
    renderWithRouter(<Game2048 />)

    expect(screen.getByText('2048')).toBeInTheDocument()
    expect(screen.getByText('Start game')).toBeInTheDocument()
    expect(screen.getByText('Restart')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('начинает новую игру по клику Start game', () => {
    renderWithRouter(<Game2048 />)
    const startButton = screen.getByText('Start game')
    fireEvent.click(startButton)

    expect(screen.getByText('Score: 0')).toBeInTheDocument()
  })

  it('разрешает клик на таб и дизейблит его после начала игры', () => {
    renderWithRouter(<Game2048 />)

    const hardTab = screen.getByText('Hard')
    expect(hardTab).toBeInTheDocument()
    expect(hardTab).toBeEnabled()

    fireEvent.click(hardTab)

    fireEvent.click(screen.getByText('Start game'))

    expect(hardTab).toBeDisabled()
  })

  it('canvas присутствует и имеет корректные размеры', () => {
    renderWithRouter(<Game2048 />)
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
    renderWithRouter(<Game2048 />)

    fireEvent.click(screen.getByText('Start game'))

    const canvas = screen.getByTestId('game-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    const fillRectSpy = jest.spyOn(ctx!, 'fillRect')

    fireEvent.keyDown(window, { key: 'ArrowLeft' })

    expect(fillRectSpy).toHaveBeenCalled()
  })

  it('реагирует на свайп', () => {
    renderWithRouter(<Game2048 />)
    fireEvent.click(screen.getByText('Start game'))

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
