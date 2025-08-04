import { useCallback, useState, useMemo, useEffect } from 'react'
import { ThemeContext } from './context'
import { ThemeProviderProps, ThemeType } from './types'

export const ThemeProvider = ({
  children,
  initialTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(() => initialTheme)

  const toggleTheme = useCallback((value: ThemeType) => {
    setTheme(value)
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (themeValue: string) => {
      root.classList.remove('light', 'dark')
      root.classList.add(themeValue)
    }

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      const setSystemTheme = () => {
        applyTheme(systemTheme.matches ? 'dark' : 'light')
      }
      setSystemTheme()
      systemTheme.addEventListener('change', setSystemTheme)
      return () => {
        systemTheme.removeEventListener('change', setSystemTheme)
      }
    } else {
      applyTheme(theme)
    }
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
