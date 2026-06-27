"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const isScrollingToRef = useRef(false);

  // Intersection Observer to track active section while scrolling
  useEffect(() => {
    const sections = navLinks.map((link) => link.href.slice(1));
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isScrollingToRef.current) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-25% 0px -55% 0px", // Trigger when section is in core viewport area
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Intercept nav clicks to smooth scroll and keep URL clean
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      isScrollingToRef.current = true;
      setActiveSection(id);
      
      // Keep the URL clean (invisible hash)
      window.history.replaceState(null, "", window.location.pathname);
      
      el.scrollIntoView({ behavior: "smooth" });
      
      // Reset isScrollingTo flag after scroll animation completes (~800ms)
      setTimeout(() => {
        isScrollingToRef.current = false;
      }, 800);
    }
  };

  return (
    <header className="navbar-blur fixed top-0 left-0 right-0 z-50">
      <div className="section-container flex h-16 items-center justify-between">
        
        {/* Logo (icon + imadh.com) */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.replaceState(null, "", window.location.pathname);
            setActiveSection("about");
            setMobileOpen(false);
          }}
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-violet-600/20 to-indigo-600/20 p-0.5 ring-1 ring-white/10 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-md object-cover"
            />
          </div>
          <div className="text-sm font-bold tracking-tight text-white">
            imadh
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent font-extrabold">
              .com
            </span>
          </div>
        </Link>

        {/* Desktop Centralized Capsule Nav */}
        <nav className="hidden items-center rounded-full border border-white/[0.06] bg-black/40 p-1 backdrop-blur-md md:flex gap-0.5">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] border border-white/[0.05]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:block">
          <a
            href="mailto:immylance@gmail.com"
            className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/10 transition-all hover:opacity-95 hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]"
          >
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/5 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] bg-[var(--color-background)] md:hidden"
          >
            <div className="section-container flex flex-col gap-1 py-4">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? "bg-white/5 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="mailto:immylance@gmail.com"
                className="mt-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Let&apos;s talk
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
