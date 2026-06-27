"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, X, Sparkles, RotateCcw } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  onClose: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateId() {
  return Math.random().toString(36).slice(2);
}

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "assistant",
  content:
    "Hey! I'm Imadh's AI assistant. Ask me anything about his projects, tech stack, or experience. 👋",
  timestamp: new Date(),
};

const SUGGESTIONS = [
  "What projects has Imadh built?",
  "What is his tech stack?",
  "Tell me about Campus Reserve",
  "How can I contact Imadh?",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      setInput("");

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      try {
        // All messages except the initial welcome message
        const history = [...messages.filter((m) => m.id !== "init"), userMessage].map(
          ({ role, content }) => ({ role, content })
        );

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Something went wrong.");
        }

        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to reach the AI assistant.";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const reset = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <motion.div
      key="chat-panel"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className="flex w-[360px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--color-surface)] shadow-2xl shadow-black/50"
      style={{ height: "520px" }}
      aria-label="AI chat assistant"
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="relative flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
        {/* Subtle gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/5" />

        {/* Avatar */}
        <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
          <Bot className="h-4.5 w-4.5 text-white" />
          {/* Live green dot */}
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[var(--color-surface)]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
            Ask Imadh&apos;s AI
          </p>
          <p className="text-[10px] text-[var(--color-text-secondary)]">
            Powered by Fikra API · fikra-fast-8b
          </p>
        </div>

        <div className="flex items-center gap-1">
          {/* Reset */}
          <button
            onClick={reset}
            aria-label="Reset conversation"
            className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:bg-white/[0.06] hover:text-violet-400"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:bg-white/[0.06] hover:text-violet-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Messages ────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Icon */}
              <div
                className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md shadow-violet-500/20"
                    : "bg-white/10 ring-1 ring-white/10"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Sparkles className="h-3.5 w-3.5" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-sm bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20"
                    : "rounded-tl-sm border border-white/[0.07] bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md shadow-violet-500/20">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/[0.07] bg-[var(--color-surface-hover)] px-4 py-3">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.span
                    key={i}
                    className="block h-1.5 w-1.5 rounded-full bg-violet-400"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7,
                      delay,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-xs text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Suggestions — only visible while just initial message */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-1 flex flex-wrap gap-1.5"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[10px] text-violet-300 transition-all hover:border-violet-500/50 hover:bg-violet-500/20"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06] p-3">
        <div className="flex items-end gap-2 rounded-xl border border-white/[0.08] bg-[var(--color-surface-hover)] px-3 py-2 transition-colors focus-within:border-violet-500/40">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something…"
            rows={1}
            disabled={loading}
            aria-label="Chat message input"
            className="max-h-24 flex-1 resize-none bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/60 focus:outline-none disabled:opacity-50"
            style={{ lineHeight: "1.5" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="mb-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        <p className="mt-1.5 text-center text-[9px] text-[var(--color-text-secondary)]/40">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </motion.div>
  );
}
