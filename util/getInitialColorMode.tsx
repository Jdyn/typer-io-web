import { createContext, useState, ReactNode, useEffect } from 'react';

export default function getInitialTheme() {
  const persistedColorPreference = window.localStorage.getItem('theme');

  if (
    persistedColorPreference === 'light' ||
    persistedColorPreference === 'dark'
  ) {
    return persistedColorPreference;
  }

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'dark';
  }

  return 'dark';
}

export const ThemeContext = createContext(null);

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props): JSX.Element => {
  const [theme, rawSetTheme] = useState(getInitialTheme);

  const setTheme = (newTheme: string): void => {
    rawSetTheme(newTheme);

    window.localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
