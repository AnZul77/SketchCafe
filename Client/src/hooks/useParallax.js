import { useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * Custom hook for smooth scroll-driven parallax effects.
 * @param {number} range - The distance to move.
 * @returns {object} - Framer Motion values.
 */
export function useParallax(range = 300) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  // Smoothen the motion
  const ySpring = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return { ref, y: ySpring, opacity, scale, scrollYProgress };
}

/**
 * Specialized hook for the Home Hero "Alley Arrival" parallax.
 */
export function useHeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layer offsets
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.8]);

  return {
    ref,
    backgroundY,
    midgroundY,
    foregroundY,
    textY,
    overlayOpacity,
    scrollYProgress,
  };
}
