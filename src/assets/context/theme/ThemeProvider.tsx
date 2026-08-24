import { PropsWithChildren, useEffect, useState } from 'react'
import { Theme, ThemeContext } from './ThemeContext'
function getTheme(): Theme {
  const localStorageTheme = localStorage.getItem('theme') as Theme | null
  if (localStorageTheme) return localStorageTheme
  const systemPreferDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches
  return systemPreferDark ? 'dark' : 'light'
}
export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => getTheme())
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
