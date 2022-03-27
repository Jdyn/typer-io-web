import { createContext, ReactNode, useEffect, useState } from 'react';

export default function getInitialTheme() {
  if (typeof window !== 'undefined') {
    const persistedColorPreference = window.localStorage.getItem('theme');

    if (persistedColorPreference === 'light' || persistedColorPreference === 'dark') {
      return persistedColorPreference;
    }
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

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', newTheme);
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
