import { useEffect, useState } from 'react';

export function useScrollThreshold(threshold = 16): boolean {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    function updateScroll(): void {
      setIsPastThreshold(window.scrollY > threshold);
    }

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [threshold]);

  return isPastThreshold;
}
