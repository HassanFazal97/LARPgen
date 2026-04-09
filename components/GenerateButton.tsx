"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function GenerateButton({
  onClick,
  isGenerating,
  disabled,
  onAbort,
}: {
  onClick: () => void;
  isGenerating: boolean;
  disabled: boolean;
  onAbort: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.button
            key="stop"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={onAbort}
            className="w-full rounded-2xl bg-red-500/10 border border-red-500/20 px-6 py-4 text-sm font-semibold text-red-400 transition-all duration-200 hover:bg-red-500/15 hover:border-red-500/30 flex items-center justify-center gap-2.5"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
            Stop Generating
          </motion.button>
        ) : (
          <motion.button
            key="generate"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            disabled={disabled}
            whileHover={disabled ? {} : { scale: 1.01 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            className="group relative w-full rounded-2xl px-6 py-4 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
            style={{
              background: disabled
                ? "rgba(168, 85, 247, 0.2)"
                : "linear-gradient(135deg, #a855f7, #7c3aed)",
            }}
          >
            {!disabled && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500 via-accent to-purple-600" />
            )}
            {!disabled && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(168,85,247,0.4)]" />
            )}
            <span className="relative z-10">Generate Post</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
