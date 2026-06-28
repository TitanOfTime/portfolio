"use client";

import { useEffect } from "react";

/**
 * CursorSpotlight
 * ───────────────
 * Renders a glowing violet/indigo radial gradient that follows the user's cursor.
 * Uses CSS custom properties on the <html> element to avoid React re-renders.
 */
export default function CursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;

    const updateCursor = (e: MouseEvent) => {
      root.style.setProperty("--cursor-x", `${e.clientX}px`);
      root.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    // Set initial position out of view to avoid jarring jump
    root.style.setProperty("--cursor-x", "-1000px");
    root.style.setProperty("--cursor-y", "-1000px");

    window.addEventListener("mousemove", updateCursor, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateCursor);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(
          700px circle at var(--cursor-x, -1000px) var(--cursor-y, -1000px),
          rgba(139, 92, 246, 0.08) 0%,
          rgba(79, 70, 229, 0.03) 40%,
          transparent 80%
        )`,
      }}
    />
  );
}
