import { createContext, ReactNode, useEffect, useState } from 'react';

const getInitialTheme = () => {
  const persistedColorPreference = window.localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (persistedColorPreference === 'light' || persistedColorPreference === 'dark')
    return persistedColorPreference;

  if (systemPrefersDark.matches) return 'dark';

  return 'light';
};

export const ThemeContext = createContext(null);

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props): JSX.Element => {
  const [theme, rawSetTheme] = useState(null);

  const setTheme = (newTheme: string): void => {
    rawSetTheme(newTheme);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', newTheme);
    }
  };

  useEffect(() => {
    rawSetTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
