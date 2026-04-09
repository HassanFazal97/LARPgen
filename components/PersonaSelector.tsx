"use client";

import { motion } from "framer-motion";
import { PERSONAS, type Persona } from "@/lib/prompts";

const personaKeys = Object.keys(PERSONAS) as Persona[];

export default function PersonaSelector({
  selected,
  onSelect,
}: {
  selected: Persona | null;
  onSelect: (p: Persona) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {personaKeys.map((key) => {
        const persona = PERSONAS[key];
        const isSelected = selected === key;
        return (
          <motion.button
            key={key}
            onClick={() => onSelect(key)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`relative flex flex-col items-center gap-2 rounded-2xl py-5 px-2 text-center transition-colors duration-200 ${
              isSelected
                ? "text-foreground"
                : "glass text-muted hover:text-foreground/70"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="persona-bg"
                className="absolute inset-0 glass-strong border-accent/30 glow-accent rounded-2xl"
                style={{ borderWidth: 1, borderStyle: "solid" }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="text-2xl relative z-10">{persona.icon}</span>
            <div className="relative z-10">
              <span className="block text-xs font-semibold leading-tight">
                {persona.label}
              </span>
              <span className="block text-[10px] text-muted/50 mt-0.5 leading-tight hidden sm:block">
                {persona.description}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
