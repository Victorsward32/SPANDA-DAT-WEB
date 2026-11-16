import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <Sun className="theme-icon-sun" aria-hidden="true" />
      <Moon className="theme-icon-moon" aria-hidden="true" />
    </Button>
  );
}
