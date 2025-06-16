// File Path: src/hooks/useScrollAnimation.ts
// Purpose: Provides a simple React hook that returns a ref and a boolean indicating
//          whether the target element has entered the viewport using the Intersection Observer API.
// Key Components/Logic:
//   - useScrollAnimation: Hook that sets up an IntersectionObserver on a ref.
//   - Returns [ref, isVisible]. isVisible becomes true once the element intersects.
// Role in Application: Enables fade-in or other scroll-based reveal animations across the app.

import { useEffect, useRef, useState, RefObject } from 'react';

/**
 * useScrollAnimation
 * Detects when an element enters the viewport.
 * @param threshold – Intersection ratio that triggers visibility (default 0.15)
 * @param rootMargin – Margin around the target element (default '0px')
 * @returns Tuple of React ref and visibility boolean
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  threshold = 0.15,
  rootMargin: string = '0px'
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
} 