import { useEffect, useRef, useState } from 'react';
import { applyTheme, readStoredTheme, saveTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const preference = useRef<Theme | null>(null);

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    preference.current = readStoredTheme();

    function syncTheme(): void {
      const next = preference.current ?? (system.matches ? 'dark' : 'light');
      applyTheme(next);
      setTheme(next);
    }

    function handleStorage(event: StorageEvent): void {
      if (event.key !== null && event.key !== THEME_STORAGE_KEY) return;
      preference.current = readStoredTheme();
      syncTheme();
    }

    syncTheme();
    system.addEventListener('change', syncTheme);
    window.addEventListener('storage', handleStorage);
    return () => {
      system.removeEventListener('change', syncTheme);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  function toggleTheme(): void {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    preference.current = next;
    applyTheme(next);
    setTheme(next);
    saveTheme(next);
  }

  return { theme, toggleTheme };
}
