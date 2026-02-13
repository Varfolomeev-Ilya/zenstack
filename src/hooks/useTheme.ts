'use client';
import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }
  const saved = localStorage.getItem('theme') as Theme | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (saved === 'dark' || saved === 'light' ? saved : null) ?? (prefersDark ? 'dark' : 'light');
}

function applyThemeToDOM(nextTheme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(nextTheme);
  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setTheme(getInitialTheme());
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  return {
    theme,
    toggleTheme,
  };
}
