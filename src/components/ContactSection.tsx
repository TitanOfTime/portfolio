"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function ContactSection() {
  const contactItems = [
    {
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
    },
    {
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
      icon: Phone,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/imadh-hussain",
      href: "https://linkedin.com/in/imadh-hussain",
      icon: LinkedinIcon,
    },
    {
      label: "GitHub",
      value: "github.com/TitanOfTime",
      href: "https://github.com/TitanOfTime",
      icon: GithubIcon,
    },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <SectionHeading
          label="Get in touch"
          title="Let's build something "
          gradient="together"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Left Column: CTA Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-start justify-center gap-6"
          >
            <h3 className="text-2xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-3xl">
              Let&apos;s build something <span className="gradient-text">secure & scalable</span>
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-secondary)]">
              I&apos;m actively looking for opportunities where I can contribute,
              learn, and grow. Whether you have a project in mind or just want
              to say hello — my inbox is always open.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-md transition-all hover:shadow-[0_0_24px_rgba(139,92,246,0.3)] hover:opacity-95"
            >
              <Mail className="h-4 w-4" />
              Send Email
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Right Column: Contact Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-4"
          >
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  target={item.label !== "Email" && item.label !== "Phone" ? "_blank" : undefined}
                  rel={item.label !== "Email" && item.label !== "Phone" ? "noopener noreferrer" : undefined}
                  className="card group flex items-center justify-between p-4 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/10 to-indigo-500/10 text-violet-400 group-hover:text-violet-300">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)]">
                        {item.label}
                      </span>
                      <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                        {item.value}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[var(--color-text-secondary)]/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-400" />
                </a>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
