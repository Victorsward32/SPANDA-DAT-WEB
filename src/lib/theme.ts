export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'spanda-theme';
export const THEME_COLORS: Record<Theme, string> = {
  light: '#fbfbfd',
  dark: '#0d1526',
};

export function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The toggle still works when browser storage is unavailable.
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}
