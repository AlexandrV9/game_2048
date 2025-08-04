import { createContext, useContext } from 'react'
import { ThemeContextType } from './types'

const initialState: ThemeContextType = {
  theme: 'system',
  toggleTheme: () => null,
}

export const ThemeContext = createContext<ThemeContextType | null>(initialState)

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
