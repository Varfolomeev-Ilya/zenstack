import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  const applyTheme = () => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    root.setAttribute('data-theme', theme);

    setTheme(theme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const init = async () => {
      const saved = localStorage.getItem('theme') as Theme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = saved || (prefersDark ? 'dark' : 'light');

      setTheme(initialTheme);
      applyTheme();
    };

    init();
  }, []);

  return { theme, setTheme: applyTheme, toggleTheme: applyTheme };
}
