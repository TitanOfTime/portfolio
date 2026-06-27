"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, Mail, ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./Icons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Users,
  BookOpen,
  Mail,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

export default function HeroSection() {
  const mockCode = `{
  "developer": "Imadh Hussain",
  "role": "Full Stack Software Engineer",
  "education": "Staffordshire University (BEng SE)",
  "skills": {
    "languages": ["PHP", "JavaScript", "C#", "Dart", "Python"],
    "frameworks": ["Laravel", "Next.js", "React", "Flutter", "Tailwind"],
    "databases": ["MySQL", "Firebase", "Firestore"]
  }
}`;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Background glow blobs */}
      <div
        className="blob"
        style={{
          width: "600px",
          height: "600px",
          top: "-15%",
          left: "20%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="blob"
        style={{
          width: "500px",
          height: "500px",
          bottom: "10%",
          right: "10%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10 w-full py-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Left Column: Info & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-5 text-left"
          >
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-violet-400"
            >
              Available for opportunities
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl"
            >
              Imadh <span className="gradient-text">Hussain</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="text-lg font-medium text-[var(--color-text-secondary)] sm:text-xl"
            >
              {personalInfo.title}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)]"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md transition-opacity hover:opacity-90"
              >
                View Resume
              </a>
              <a
                href="#projects"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold text-[var(--color-text-primary)] transition-all hover:bg-white/10 hover:border-white/20"
              >
                My Projects
              </a>
            </motion.div>

            {/* Social Icons row */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <a
                href="https://github.com/TitanOfTime"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--color-text-secondary)] transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-400"
              >
                <GithubIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://linkedin.com/in/imadh-hussain"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--color-text-secondary)] transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-400"
              >
                <LinkedinIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:immylance@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--color-text-secondary)] transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-400"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </motion.div>

            {/* Stats list */}
            <motion.div
              variants={containerVariants}
              className="mt-4 flex flex-wrap gap-3"
            >
              {personalInfo.stats.map((stat) => {
                const Icon = iconMap[stat.icon];
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs text-[var(--color-text-secondary)]"
                  >
                    {Icon && <Icon className="h-3.5 w-3.5 text-violet-400" />}
                    <span>{stat.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-full max-w-lg rounded-xl border border-white/10 bg-slate-950/65 p-4 font-mono text-xs shadow-2xl backdrop-blur-md">
              {/* Terminal header */}
              <div className="mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[10px] text-[var(--color-text-secondary)]">bash - portfolio.json</span>
              </div>
              {/* Code output */}
              <pre className="overflow-x-auto text-[var(--color-text-secondary)] scrollbar-hide">
                <code>
                  {mockCode.split("\n").map((line, i) => {
                    // Simple syntax coloring highlights
                    let coloredLine = line;
                    if (line.includes('"')) {
                      coloredLine = line.replace(
                        /(".*?"):/g,
                        '<span class="text-violet-400">$1</span>:'
                      ).replace(
                        /: (".*?")/g,
                        ': <span class="text-emerald-400">$1</span>'
                      );
                    }
                    return (
                      <span
                        key={i}
                        className="block"
                        dangerouslySetInnerHTML={{ __html: coloredLine }}
                      />
                    );
                  })}
                </code>
              </pre>
            </div>
          </motion.div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-1 text-xs text-[var(--color-text-secondary)] opacity-60 transition-opacity hover:opacity-100"
            aria-label="Scroll down"
          >
            <span>Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </a>
        </div>

      </div>
    </section>
  );
}
