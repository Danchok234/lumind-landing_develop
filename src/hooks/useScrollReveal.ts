'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * True once the observed element has entered the viewport. Stays true
 * afterwards (the observer disconnects on first intersection) so the
 * reveal animation only plays once per mount.
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
