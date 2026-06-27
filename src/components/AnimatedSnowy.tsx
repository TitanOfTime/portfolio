"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface AnimatedSnowyProps {
  size?: number; // Size of the avatar container in pixels
}

export default function AnimatedSnowy({ size = 36 }: AnimatedSnowyProps) {
  // ── Motion Values for Mouse Tracking ────────────────────────────────────────
  const mouseX = useMotionValue(0); // Normalized -1 to 1
  const mouseY = useMotionValue(0); // Normalized -1 to 1

  // Springs for smooth fluid movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // ── 3D Rotations & Offsets (Parallax) ───────────────────────────────────────
  // Rotate photo up to 25 degrees for true 3D visual look
  const rotateY = useTransform(smoothX, [-1, 1], [-25, 25]);
  const rotateX = useTransform(smoothY, [-1, 1], [25, -25]);

  // Translate slightly to follow rotation direction
  const x = useTransform(smoothX, [-1, 1], [-2.5, 2.5]);
  const y = useTransform(smoothY, [-1, 1], [-2.5, 2.5]);

  // ── Mouse Move Listener ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      style={{
        width: size,
        height: size,
        perspective: "800px", // Enables 3D space
      }}
      className="relative flex items-center justify-center select-none"
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          rotateX,
          rotateY,
          x,
          y,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -1.5, 0], // Subtle float animation
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 ring-1 ring-white/10 shadow-lg"
      >
        <Image
          src="/profile/snowy.png"
          alt="Snowy"
          width={size}
          height={size}
          className="rounded-full object-cover pointer-events-none"
          priority
        />
        {/* Shiny glass overlay for depth */}
        <div 
          className="absolute inset-0 rounded-full opacity-[0.15] bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none"
          style={{ transform: "translateZ(1px)" }}
        />
      </motion.div>
    </div>
  );
}
