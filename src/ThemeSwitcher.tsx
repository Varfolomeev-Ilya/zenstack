'use client';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from './hooks/useTheme';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="w-9 h-9 rounded-lg flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
