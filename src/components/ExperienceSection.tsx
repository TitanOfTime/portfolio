"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { experiences, education } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const typeColors: Record<string, string> = {
  Leadership: "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/20",
  Teaching: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/20",
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <SectionHeading
          label="My journey"
          title="Where I've made an "
          gradient="impact"
        />

        <div className="relative flex flex-col gap-6">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent md:block" />

          {/* Experience cards */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="card relative flex flex-col gap-4 p-6 md:ml-16"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[2.875rem] top-6 hidden h-3.5 w-3.5 items-center justify-center md:flex">
                <div className="h-3.5 w-3.5 rounded-full border-2 border-violet-500 bg-[var(--color-background)] shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
              </div>

              {/* Top row */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-violet-400">
                    {exp.company}
                  </p>
                </div>
                <span
                  className={`rounded-full border bg-gradient-to-r px-3 py-0.5 text-xs font-medium ${typeColors[exp.type] ?? "from-gray-500/20 to-gray-500/20 text-gray-400 border-gray-500/20"}`}
                >
                  {exp.type}
                </span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-violet-500/70" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-violet-500/70" />
                  {exp.location}
                </span>
              </div>

              {/* Description */}
              <ul className="flex flex-col gap-2">
                {exp.description.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500/70" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Education card */}
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: (experiences.length + index) * 0.1,
              }}
              className="card relative flex flex-col gap-4 p-6 md:ml-16"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[2.875rem] top-6 hidden h-3.5 w-3.5 items-center justify-center md:flex">
                <div className="h-3.5 w-3.5 rounded-full border-2 border-indigo-500 bg-[var(--color-background)] shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              </div>

              {/* Top row */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-indigo-400">
                    {edu.institution}
                  </p>
                </div>
                <span className="rounded-full border border-indigo-500/20 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 px-3 py-0.5 text-xs font-medium text-indigo-400">
                  Education
                </span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-indigo-500/70" />
                  {edu.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-indigo-500/70" />
                  {edu.location}
                </span>
              </div>

              {/* Achievements */}
              {edu.achievements.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400/70">
                    Achievements
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {edu.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500/70" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
