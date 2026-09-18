"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

export type BlurTextDirection = "top" | "bottom";
export type BlurTextAnimateBy = "words" | "letters";
export type BlurTextSnapshot = Record<string, string | number>;

export interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: BlurTextAnimateBy;
  direction?: BlurTextDirection;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: BlurTextSnapshot;
  animationTo?: BlurTextSnapshot[];
  easing?: (value: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: "p" | "span";
}

function buildKeyframes(
  from: BlurTextSnapshot,
  steps: BlurTextSnapshot[],
): Record<string, Array<string | number>> {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step)),
  ]);

  return Array.from(keys).reduce<Record<string, Array<string | number>>>(
    (keyframes, key) => {
      keyframes[key] = [from[key], ...steps.map((step) => step[key])];
      return keyframes;
    },
    {},
  );
}

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (value) => value,
  onAnimationComplete,
  stepDuration = 0.35,
  as = "p",
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const elements = useMemo(
    () => (animateBy === "words" ? text.split(" ") : Array.from(text)),
    [animateBy, text],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) setInView(true);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion, rootMargin, threshold]);

  const defaultFrom = useMemo<BlurTextSnapshot>(
    () => direction === "top"
      ? { filter: "blur(10px)", opacity: 0, y: -50 }
      : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction],
  );
  const defaultTo = useMemo<BlurTextSnapshot[]>(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );
  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from(
    { length: stepCount },
    (_, index) => (stepCount === 1 ? 0 : index / (stepCount - 1)),
  );
  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots],
  );

  const TextElement = as;

  return (
    <TextElement
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          key={`${text}-${index}`}
          initial={reducedMotion ? false : fromSnapshot}
          animate={reducedMotion ? { filter: "blur(0px)", opacity: 1, y: 0 } : inView ? animateKeyframes : fromSnapshot}
          transition={{
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing,
          }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </TextElement>
  );
}
