import dotenv from 'dotenv'

dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
    // __SERVER_PORT__: process.env.SERVER_PORT,
  }
}
