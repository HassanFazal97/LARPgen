"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OutputCard({
  output,
  isGenerating,
  onRegenerate,
}: {
  output: string;
  isGenerating: boolean;
  onRegenerate: () => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!output && !isGenerating) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const charCount = output.length;
  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
      className="rounded-2xl glass-strong overflow-hidden glow-accent"
    >
      <div className="p-6">
        {output ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {output}
              {isGenerating && (
                <motion.span
                  className="inline-block w-0.5 h-[18px] bg-accent ml-0.5 align-text-bottom rounded-full"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </p>
          </motion.div>
        ) : (
          <div className="flex items-center gap-3 text-muted text-sm py-2">
            <motion.div
              className="h-5 w-5 rounded-full border-2 border-accent/40 border-t-accent"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="text-muted/60">Crafting your LARP...</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/[0.04] px-6 py-3.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted/40 tabular-nums">
                {charCount} chars &middot; {wordCount} words
              </span>
              <div className="flex gap-2">
                <motion.button
                  onClick={onRegenerate}
                  disabled={isGenerating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl px-4 py-1.5 text-xs font-medium text-muted/60 transition-all duration-200 hover:text-foreground/80 hover:bg-white/[0.04] disabled:opacity-30 flex items-center gap-1.5"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Regenerate
                </motion.button>
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent/80 transition-all duration-200 hover:bg-accent/20 hover:text-accent flex items-center gap-1.5"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.svg
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                  {copied ? "Copied!" : "Copy"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
