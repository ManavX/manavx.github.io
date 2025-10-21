import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

export function useSmoothScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      const progress = scroll / limit;
      setScrollProgress(progress);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return scrollProgress;
}
