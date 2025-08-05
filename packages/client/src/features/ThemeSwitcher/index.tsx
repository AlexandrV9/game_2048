import { useTheme } from '@/shared/lib'
import { Button } from '@/shared/ui'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  )
}
