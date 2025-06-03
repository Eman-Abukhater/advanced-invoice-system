'use client';
import { IconButton, useTheme, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeToggle } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const theme = useTheme();
  const { toggleTheme } = useThemeToggle();

  return (
    <Tooltip title="Toggle theme">
      <IconButton onClick={toggleTheme} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}
