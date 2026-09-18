/**
 * ScrollReveal — inspired by React Bits ScrollReveal
 * Source reference: https://github.com/DavidHDev/react-bits
 * License: MIT + Commons Clause
 * Implementation: pure Intersection Observer (no GSAP) to avoid extra deps.
 * Each child element fades + slides up when it enters the viewport.
 */
import { useEffect, useRef } from 'react';

const ScrollReveal = ({
  children,
  threshold = 0.15,
  delay = 0,
  className = '',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
