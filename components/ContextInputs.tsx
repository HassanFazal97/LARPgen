"use client";

import { motion } from "framer-motion";

export default function ContextInputs({
  content,
  onContentChange,
}: {
  content: string;
  onContentChange: (v: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
    >
      <label className="block text-xs font-medium uppercase tracking-wider text-muted/60 mb-3">
        What&apos;s the LARP?
      </label>
      <div className="relative group">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Describe your idea, paste a draft, or drop some bullet points...

e.g. 'I just quit my job at Google to build an AI tool for dentists. We have 3 beta users and $0 revenue but I've never been more alive.'"
          rows={4}
          maxLength={2000}
          className="w-full rounded-2xl glass px-5 py-4 text-sm text-foreground placeholder:text-muted/30 focus:border-accent/40 focus:outline-none transition-all duration-300 resize-y min-h-[120px] focus:shadow-[0_0_30px_rgba(168,85,247,0.08)] focus:bg-white/[0.04]"
        />
        <div className="flex justify-end mt-1.5 px-1">
          <span
            className={`text-xs transition-colors duration-200 ${
              content.length > 1800
                ? "text-red-400/70"
                : content.length > 0
                  ? "text-muted/30"
                  : "text-transparent"
            }`}
          >
            {content.length}/2000
          </span>
        </div>
      </div>
    </motion.div>
  );
}
