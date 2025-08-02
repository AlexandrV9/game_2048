import { ReactNode } from 'react'

export type ThemeType = 'dark' | 'light' | 'system'

export type ThemeContextType = {
  theme: ThemeType
  toggleTheme: (theme: ThemeType) => void
}

export type ThemeProviderProps = {
  initialTheme?: ThemeType
  storageKey?: string
  children: ReactNode
}
