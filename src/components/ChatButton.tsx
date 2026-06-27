"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import ChatPanel from "./ChatPanel";
import AnimatedSnowy from "./AnimatedSnowy";

// Rotating messages Snowy will say
const SNOWY_MESSAGES = [
  "Psst… ask me about Imadh! 🐾",
  "Meow! I know his whole story 😼",
  "Need info on his projects? Ask me!",
  "I'm not just a pretty cat 🐱",
  "Click me! I don't bite… much. 🐾",
];

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false); // once chat opened, all nudges gone
  const [showNudge, setShowNudge] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  // ── Notification badge appears after 1.5s ─────────────────────────────────
  useEffect(() => {
    if (dismissed) return;
    const badgeTimer = setTimeout(() => setShowBadge(true), 1500);
    return () => clearTimeout(badgeTimer);
  }, [dismissed]);

  // ── Snowy peek nudge appears after 4s, then cycles every 14s ─────────────
  useEffect(() => {
    if (dismissed) return;

    const firstAppear = setTimeout(() => {
      setShowNudge(true);
      // Auto-hide after 6s
      const autoHide = setTimeout(() => setShowNudge(false), 6000);
      return () => clearTimeout(autoHide);
    }, 4000);

    // Cycle every 14s after first appearance
    const interval = setInterval(() => {
      if (!open && !dismissed) {
        setMsgIndex((i) => (i + 1) % SNOWY_MESSAGES.length);
        setShowNudge(true);
        setTimeout(() => setShowNudge(false), 5500);
      }
    }, 14000);

    return () => {
      clearTimeout(firstAppear);
      clearInterval(interval);
    };
  }, [dismissed, open]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    // First time opening: clear all nudge UI permanently
    if (!dismissed) {
      setDismissed(true);
      setShowNudge(false);
      setShowBadge(false);
    }
  };

  const handleNudgeClick = () => {
    setShowNudge(false);
    handleOpen();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Chat panel ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && <ChatPanel onClose={() => setOpen(false)} />}
      </AnimatePresence>

      {/* ── Snowy peek + speech bubble nudge ───────────────────────────────── */}
      <AnimatePresence>
        {showNudge && !open && (
          <motion.div
            key="snowy-nudge"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="flex items-end gap-2 cursor-pointer"
            onClick={handleNudgeClick}
          >
            {/* Speech bubble */}
            <motion.div
              className="relative max-w-[180px] rounded-2xl rounded-br-sm border border-white/10 bg-[#1a1030] px-3.5 py-2.5 shadow-xl shadow-black/40 backdrop-blur-md"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            >
              {/* Tail pointing bottom-right */}
              <div
                className="absolute -bottom-[6px] right-3 h-0 w-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid rgba(255,255,255,0.08)",
                }}
              />
              <div
                className="absolute -bottom-[5px] right-3 h-0 w-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid #1a1030",
                }}
              />

              <p className="text-xs font-medium leading-snug text-white/90">
                {SNOWY_MESSAGES[msgIndex]}
              </p>

              {/* Dismiss X */}
              <button
                aria-label="Dismiss"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNudge(false);
                }}
                className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </motion.div>

            {/* Snowy mini peek avatar */}
            <motion.div
              className="flex-shrink-0"
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="rounded-full ring-2 ring-violet-500/40 shadow-lg shadow-violet-500/20 overflow-hidden">
                <AnimatedSnowy size={40} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating chat button ────────────────────────────────────────────── */}
      <div className="relative">
        {/* Notification badge */}
        <AnimatePresence>
          {showBadge && !open && (
            <motion.div
              key="badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md shadow-rose-500/50"
              style={{ animation: "pulse-glow 1.8s ease-in-out infinite" }}
            >
              1
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          id="chat-button"
          onClick={handleOpen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI chat assistant"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30"
          style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
