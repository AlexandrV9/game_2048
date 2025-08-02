import { useCallback, useState, useMemo, useEffect } from 'react'
import { ThemeContext } from './context'
import { ThemeProviderProps, ThemeType } from './types'

export const ThemeProvider = ({
  children,
  initialTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // if (localStorage) {
    //   return (localStorage.getItem(storageKey) as ThemeType) || initialTheme
    // }

    return initialTheme
  })

  const toggleTheme = useCallback((value: ThemeType) => {
    setTheme(value)
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
