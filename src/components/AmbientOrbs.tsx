"use client";

/**
 * AmbientOrbs
 * ───────────
 * Pure-CSS animated background orbs for atmospheric depth.
 * Three orbs use staggered float + pulse-glow keyframes.
 * All transforms are GPU-composited — zero layout cost.
 */
export default function AmbientOrbs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Top-left violet orb */}
      <div
        className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(109,40,217,0.3) 40%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-1 18s ease-in-out infinite",
        }}
      />

      {/* Centre-right indigo orb */}
      <div
        className="absolute top-1/3 -right-64 h-[700px] w-[700px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.5) 0%, rgba(139,92,246,0.2) 45%, transparent 70%)",
          filter: "blur(100px)",
          animation: "orb-drift-2 22s ease-in-out infinite",
        }}
      />

      {/* Bottom-left purple orb */}
      <div
        className="absolute -bottom-48 left-1/4 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)",
          filter: "blur(90px)",
          animation: "orb-drift-3 26s ease-in-out infinite",
        }}
      />
    </div>
  );
}
