import { Mail, Globe } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./Icons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Globe,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="section-container flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
        {/* Copyright */}
        <p className="text-sm text-[var(--color-text-secondary)]">
          © {year}{" "}
          <span className="gradient-text font-medium">
            {personalInfo.name}
          </span>
          . Crafted with care.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => {
            if (link.platform === "GitHub") {
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-secondary)] transition-colors hover:bg-white/5 hover:text-violet-400"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
              );
            }
            if (link.platform === "LinkedIn") {
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-secondary)] transition-colors hover:bg-white/5 hover:text-violet-400"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                </a>
              );
            }

            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-secondary)] transition-colors hover:bg-white/5 hover:text-violet-400"
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
