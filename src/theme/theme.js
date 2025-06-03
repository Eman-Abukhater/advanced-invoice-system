'use client';
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light theme
            primary: {
              main: '#1976d2', // ERP-style blue
            },
            secondary: {
              main: '#43a047', // ERP-style green
            },
            background: {
              default: '#f4f6f8',
              paper: '#fff',
            },
          }
        : {
            // Dark theme
            primary: {
              main: '#90caf9',
            },
            secondary: {
              main: '#81c784',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
  });
