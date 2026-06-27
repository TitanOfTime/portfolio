"use client";

import { motion } from "framer-motion";
import { Layout, Server, Cloud, Cpu } from "lucide-react";
import { skillCategories } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  Server,
  Cloud,
  Cpu,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const skillVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <SectionHeading
          label="My toolbox"
          title="The toolbox I "
          gradient="build with"
          description="Technologies and tools I use to craft scalable, production-ready applications."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="card flex flex-col gap-5 p-6"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20">
                    {Icon && (
                      <Icon className="h-4.5 w-4.5 text-violet-400" />
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {category.title}
                  </h3>
                </div>

                {/* Skill list */}
                <motion.ul
                  variants={containerVariants}
                  className="flex flex-col gap-2"
                >
                  {category.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={skillVariants}
                      className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500/70" />
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
