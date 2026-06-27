"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string; // small eyebrow text
  title: string;
  gradient: string; // the word to highlight with gradient
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  gradient,
  description,
}: SectionHeadingProps) {
  // Split title around gradient word for inline highlight
  const parts = title.split(gradient);

  return (
    <motion.div
      className="mb-14 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {label && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
          {label}
        </p>
      )}
      <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
        {parts[0]}
        <span className="gradient-text">{gradient}</span>
        {parts[1]}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </motion.div>
  );
}
