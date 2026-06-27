"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import type { Project } from "@/lib/data";
import { GithubIcon } from "./Icons";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Track active image via IntersectionObserver on the scroll container
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index);
  }, []);

  const hasImages = project.imageUrls.length > 0;
  const allErrored =
    hasImages && project.imageUrls.every((_, i) => imageErrors[i]);

  return (
    <motion.article
      id={project.slug}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="card group flex flex-col overflow-hidden"
    >
      {/* ── Image carousel area ────────────────────────────── */}
      <div className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-[var(--color-surface-hover)]">
        {hasImages && !allErrored ? (
          <>
            {/* Scrollable image strip */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="scrollbar-hide flex h-full w-full snap-x snap-mandatory overflow-x-auto"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {project.imageUrls.map((url, i) => {
                // Use the explicit mobileImageIndices from data.ts — no filename guessing.
                // If the index is listed, render a phone mockup; otherwise full-bleed desktop.
                const isMobile = project.mobileImageIndices?.includes(i) ?? false;

                return (
                  <div
                    key={url}
                    className="relative h-full w-full flex-shrink-0 snap-start flex items-center justify-center overflow-hidden"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    {!imageErrors[i] ? (
                      <>
                        {/* Blurred reflection backdrop — fills the landscape card space */}
                        <Image
                          src={url}
                          alt=""
                          fill
                          sizes="120px"
                          className="object-cover blur-2xl scale-125 opacity-30 select-none pointer-events-none"
                          aria-hidden
                        />

                        {isMobile ? (
                          /* ── Phone mockup frame ── */
                          <div className="relative my-2 h-[calc(100%-0.75rem)] aspect-[9/16] rounded-2xl border-[3px] border-neutral-700 bg-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden">
                            {/* Speaker notch */}
                            <div className="absolute top-1.5 left-1/2 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-neutral-700" />
                            <Image
                              src={url}
                              alt={`${project.title} screenshot ${i + 1}`}
                              fill
                              sizes="(max-width: 768px) 280px, 380px"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              onError={() =>
                                setImageErrors((prev) => ({ ...prev, [i]: true }))
                              }
                            />
                          </div>
                        ) : (
                          /* ── Desktop full-bleed ── */
                          <div className="relative h-full w-full">
                            <Image
                              src={url}
                              alt={`${project.title} screenshot ${i + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 520px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={() =>
                                setImageErrors((prev) => ({ ...prev, [i]: true }))
                              }
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageOff className="h-8 w-8 text-[var(--color-text-secondary)]/30" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Dot indicators — visible when >1 image */}
            {project.imageUrls.length > 1 && (
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm">
                {project.imageUrls.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      scrollRef.current?.scrollTo({
                        left: i * (scrollRef.current.clientWidth),
                        behavior: "smooth",
                      });
                    }}
                    aria-label={`View screenshot ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-4 bg-violet-400"
                        : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Scroll hint overlay — shows on hover when multiple images */}
            {project.imageUrls.length > 1 && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-black/60 px-2 py-1 text-[10px] text-white/70 backdrop-blur-sm">
                  scroll →
                </div>
              </div>
            )}
          </>
        ) : (
          /* Gradient fallback when no images */
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-900/30 to-indigo-900/20">
            <div className="flex flex-col items-center gap-2 opacity-40">
              <ImageOff className="h-8 w-8 text-violet-400" />
              <span className="text-xs text-violet-400">No preview</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Card body ──────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Title */}
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>

        {/* GitHub link(s) */}
        {(project.githubLink || project.githubLinks) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.06] pt-3">
            {project.githubLinks ? (
              project.githubLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:text-violet-400"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>{link.label}</span>
                </a>
              ))
            ) : (
              project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:text-violet-400"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  View on GitHub
                </a>
              )
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
