"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { UserCircle, Code2, Smartphone, Cpu, Users2, Mail, Globe, Phone } from "lucide-react";
import { personalInfo } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { GithubIcon, LinkedinIcon } from "./Icons";

const focusCards = [
  {
    title: "Software Dev",
    description: "Crafting robust web backends and reactive frontends using Laravel, PHP, React, and Next.js.",
    icon: Code2,
  },
  {
    title: "Mobile Apps",
    description: "Building resilient cross-platform apps using Flutter with offline caching and native features.",
    icon: Smartphone,
  },
  {
    title: "Clean Architecture",
    description: "Designing decoupled, scalable systems using MVC architecture and strict OOP principles.",
    icon: Cpu,
  },
  {
    title: "Leadership & Collaboration",
    description: "Leading the APIIT FCS tech club and driving impactful hackathons, workshops, and student tech initiatives.",
    icon: Users2,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
} as const;

export default function AboutSection() {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section id="about" className="relative py-24">
      <div className="section-container">
        <SectionHeading
          label="Who I am"
          title="About "
          gradient="Me"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column: Profile Card (4 cols) */}
          <motion.div
            className="flex justify-center lg:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="card relative w-full max-w-sm overflow-hidden p-6 text-center">
              {/* Photo backdrop area */}
              <div className="relative mx-auto mb-4 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/10 p-1">
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[var(--color-surface)] overflow-hidden">
                  {!avatarError ? (
                    <Image
                      src="/profile/avatar.jpeg"
                      alt={personalInfo.name}
                      fill
                      sizes="144px"
                      className="object-cover"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <UserCircle strokeWidth={1} className="h-24 w-24 text-violet-400/80" />
                  )}
                </div>
                {/* Status bubble */}
                <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-surface)] bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>

              {/* Title & Info */}
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                {personalInfo.name}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {personalInfo.title}
              </p>

              {/* Quick bio details */}
              <div className="mt-5 flex flex-col gap-2.5 border-y border-white/[0.06] py-4 text-left text-xs text-[var(--color-text-secondary)]">
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-violet-400">
                  <Mail className="h-3.5 w-3.5 text-violet-500" />
                  View CV
                </a>
                <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-violet-400">
                  <Phone className="h-3.5 w-3.5 text-violet-500" />
                  {personalInfo.phone}
                </a>
                <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-violet-400">
                  <Globe className="h-3.5 w-3.5 text-violet-500" />
                  {personalInfo.website}
                </a>
              </div>

              {/* Social Stack */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <a
                  href="https://github.com/TitanOfTime"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--color-text-secondary)] transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-400"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/in/imadh-hussain"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--color-text-secondary)] transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-400"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & 2x2 Focus Cards (8 cols) */}
          <div className="flex flex-col gap-8 lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-base leading-relaxed text-[var(--color-text-secondary)]"
            >
              {personalInfo.bio}
            </motion.p>

            {/* 2x2 capability grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {focusCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    whileHover={{ y: -3 }}
                    className="card flex gap-4 p-5"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/15 to-indigo-500/15">
                      <Icon className="h-4.5 w-4.5 text-violet-400" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {card.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
