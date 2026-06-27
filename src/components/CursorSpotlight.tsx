"use client";

import { useEffect } from "react";

/**
 * CursorSpotlight
 * ───────────────
 * Renders a large radial gradient that tracks the mouse position.
 * Mutations go directly to CSS custom properties on <html> — no React state
 * or re-renders, so it runs at native pointer-move speed without any jank.
 */
export default function CursorSpotlight() {
  useEffect(() => {
    // Initialise to centre so the spotlight is visible before any mouse move
    document.documentElement.style.setProperty("--cx", "50%");
    document.documentElement.style.setProperty("--cy", "50%");

    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--cx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cy", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20"
      style={{
        background:
          "radial-gradient(700px circle at var(--cx, 50%) var(--cy, 50%), rgba(139,92,246,0.09) 0%, rgba(79,70,229,0.04) 35%, transparent 65%)",
      }}
    />
  );
}
