"use client";

import { motion } from "framer-motion";
import { TONES, type Tone } from "@/lib/prompts";

const toneKeys = Object.keys(TONES) as Tone[];

export default function ToneSelector({
  selected,
  onSelect,
}: {
  selected: Tone | null;
  onSelect: (t: Tone) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {toneKeys.map((key) => {
        const isSelected = selected === key;
        return (
          <motion.button
            key={key}
            onClick={() => onSelect(key)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`relative rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
              isSelected
                ? "text-white"
                : "text-muted/50 hover:text-muted"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="tone-bg"
                className="absolute inset-0 bg-accent-dim/80 rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
              />
            )}
            <span className="relative z-10">{TONES[key].label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
