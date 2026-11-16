import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { navigation } from '@/data/site';
import { useScrollThreshold } from '@/hooks/use-scroll-threshold';
import type { OptimizedImage } from '@/types/hero';
import ThemeToggle from './ThemeToggle';

interface Props {
  logo: OptimizedImage;
  onNavigate: (target: string) => void;
  onRequestDemo: () => void;
  activeTarget: string;
}

export default function SiteHeader({ logo, onNavigate, onRequestDemo, activeTarget }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isScrolled = useScrollThreshold();

  function navigate(target: string): void {
    setMenuOpen(false);
    onNavigate(target);
  }

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <svg className="brand-color-filter" aria-hidden="true" width="0" height="0">
        <defs>
          <filter id="brand-dark-colors" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 .875 1.427 0 0  0 1.875 1.114 0 0  0 .875 1.427 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
      <div className="header-inner">
        <a href={import.meta.env.BASE_URL} className="brand" aria-label="Spanda DAT home">
          <img {...logo} alt="Spanda DAT" fetchPriority="high" />
        </a>
        <nav
          className="primary-nav"
          id="main-navigation"
          aria-label="Main navigation"
          data-open={menuOpen}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setMenuOpen(false);
              menuButton.current?.focus();
            }
          }}
        >
          {navigation.map((item) => (
            <button
              type="button"
              onClick={() => navigate(item.target)}
              key={item.target}
              aria-current={activeTarget === item.target ? 'true' : undefined}
            >{item.label}<ArrowUpRight className="nav-mobile-arrow" aria-hidden="true" /></button>
          ))}
        </nav>
        <div className="header-actions">
          <Button className="request-demo-button" size="sm" onClick={() => {
            setMenuOpen(false);
            onRequestDemo();
          }}>Request Demo<ArrowUpRight className="demo-arrow" aria-hidden="true" /></Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            className="mobile-menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            ref={menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
