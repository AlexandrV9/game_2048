import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder as typeof global.TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder

const mockContext = {
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: [] })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
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
  textAlign: '',
  textBaseline: '',
} as unknown as CanvasRenderingContext2D

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn((contextId: string) => {
    if (contextId === '2d') {
      return mockContext
    }
    return null
  }),
})
