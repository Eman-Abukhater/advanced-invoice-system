'use client';
import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '../theme/theme';

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
