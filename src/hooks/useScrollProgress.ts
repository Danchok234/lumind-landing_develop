'use client';

import { useEffect, useRef, useState } from 'react';

const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

/**
 * How much of the element is visible in the viewport (0→1), updated as you
 * scroll. Driven by `intersectionRatio` directly — no scroll listeners, no
 * artificial tall "pin" sections — so it's cheap. Monotonically increasing:
 * once revealed, it stays revealed when the element scrolls past/out of view
 * rather than fading back out.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setProgress((prev) => Math.max(prev, entry.intersectionRatio)),
      { threshold: THRESHOLDS },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, progress };
}
