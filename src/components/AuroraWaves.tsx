"use client";

import { useEffect } from "react";

/**
 * AuroraWaves
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders 4 layered SVG sine-wave bands behind the entire page, coloured with
 * the site's slate → violet → indigo palette.
 *
 * Performance strategy
 * ─────────────────────
 * • All animation is driven by CSS @keyframes (wave-drift-*) registered in
 *   globals.css — fully GPU-composited, zero JS animation loop.
 * • Mouse parallax and scroll-speed multiplier are written as CSS custom
 *   properties directly on <html> via a passive event listener — no React
 *   state, no re-renders.
 * • SVG viewBox is oversized (2400 wide) so the translateX drift never
 *   exposes a hard edge.
 * • position: fixed + pointer-events: none keeps it outside all layout flow.
 * • will-change: transform is set inline on every animated element to hint the
 *   browser to promote them to their own compositor layer.
 */

// Wave path generator — produces a smooth sine-band SVG path
// that fills from y=waveMid±amp down to the bottom of the viewBox.
function wavePath(
  width: number,
  height: number,
  waveMid: number,   // vertical midpoint of the wave centre line
  amplitude: number, // peak-to-trough half-height
  phase: number,     // horizontal phase offset in px (for uniqueness)
  frequency: number  // how many full cycles across the width
): string {
  const pts: string[] = [];
  const steps = 120;
  const dx = width / steps;

  for (let i = 0; i <= steps; i++) {
    const x = i * dx;
    const y =
      waveMid +
      amplitude * Math.sin((((x + phase) / width) * Math.PI * 2 * frequency));
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  // Close the path along the bottom edge
  pts.push(`L ${width} ${height} L 0 ${height} Z`);
  return pts.join(" ");
}

// Precompute wave paths — these are static SVG strings, generated once at
// module-evaluation time, not on every render.
const W = 2400;
const H = 900;

const WAVES = [
  {
    // Layer 1 — deepest, widest, most opaque — slate-violet gradient
    path: wavePath(W, H, 520, 110, 0, 1.6),
    gradient: { from: "rgba(15,10,40,0.55)", to: "rgba(79,46,180,0.18)" },
    animation: "wave-drift-1 22s ease-in-out infinite",
    opacity: 0.55,
    yOffset: "0%",
    blur: 0,
  },
  {
    // Layer 2 — mid, violet-indigo
    path: wavePath(W, H, 480, 90, 320, 2.0),
    gradient: { from: "rgba(109,40,217,0.28)", to: "rgba(49,46,129,0.12)" },
    animation: "wave-drift-2 18s ease-in-out infinite",
    opacity: 0.7,
    yOffset: "2%",
    blur: 0,
  },
  {
    // Layer 3 — upper, indigo-purple, slightly blurred for depth
    path: wavePath(W, H, 440, 70, 640, 2.5),
    gradient: { from: "rgba(139,92,246,0.22)", to: "rgba(99,102,241,0.08)" },
    animation: "wave-drift-3 14s ease-in-out infinite",
    opacity: 0.8,
    yOffset: "4%",
    blur: 2,
  },
  {
    // Layer 4 — top accent, bright violet shimmer edge
    path: wavePath(W, H, 400, 55, 960, 3.0),
    gradient: { from: "rgba(167,139,250,0.18)", to: "rgba(139,92,246,0.04)" },
    animation: "wave-drift-4 10s ease-in-out infinite",
    opacity: 0.9,
    yOffset: "6%",
    blur: 1,
  },
] as const;

export default function AuroraWaves() {
  // ── Mouse parallax → CSS custom properties, zero React re-renders ──────────
  useEffect(() => {
    const root = document.documentElement;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;   // -1 … 1
      const ny = (e.clientY / innerHeight) * 2 - 1;  // -1 … 1
      root.style.setProperty("--wave-mx", `${(nx * 30).toFixed(1)}px`);
      root.style.setProperty("--wave-my", `${(ny * 14).toFixed(1)}px`);
    };

    // Scroll: increase translateY slightly so waves feel anchored as you scroll
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1);
      root.style.setProperty("--wave-scroll", `${(progress * 60).toFixed(1)}px`);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Sensible defaults so waves are positioned before any mouse move
    root.style.setProperty("--wave-mx", "0px");
    root.style.setProperty("--wave-my", "0px");
    root.style.setProperty("--wave-scroll", "0px");

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {WAVES.map((wave, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            // Translate via CSS vars (mouse parallax) — individual layers move
            // at different rates for genuine depth separation
            transform: `translateX(calc(var(--wave-mx, 0px) * ${(i + 1) * 0.6})) translateY(calc(var(--wave-my, 0px) * ${(i + 1) * 0.4} + var(--wave-scroll, 0px) * ${0.1 + i * 0.04}))`,
            willChange: "transform",
            bottom: 0,
            top: wave.yOffset,
          }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            style={{
              animation: wave.animation,
              willChange: "transform",
              filter: wave.blur > 0 ? `blur(${wave.blur}px)` : undefined,
              opacity: wave.opacity,
            }}
          >
            <defs>
              <linearGradient
                id={`waveGrad-${i}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={wave.gradient.from} />
                <stop offset="100%" stopColor={wave.gradient.to} />
              </linearGradient>
            </defs>
            <path d={wave.path} fill={`url(#waveGrad-${i})`} />
          </svg>
        </div>
      ))}

      {/* Subtle top-edge shimmer line — the "crest" of the topmost wave */}
      <div
        className="absolute inset-x-0 z-10"
        style={{
          top: "36%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.25) 20%, rgba(139,92,246,0.5) 50%, rgba(99,102,241,0.25) 80%, transparent 100%)",
          transform:
            "translateX(calc(var(--wave-mx, 0px) * 1.4)) translateY(calc(var(--wave-my, 0px) * 0.8))",
          willChange: "transform",
          animation: "wave-drift-4 10s ease-in-out infinite",
          filter: "blur(0.5px)",
        }}
      />
    </div>
  );
}
