"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="text-center pt-16 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-display text-6xl sm:text-7xl font-extrabold tracking-tighter leading-none">
          <span className="relative inline-block">
            <span className="title-gradient">LARP</span>
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            />
          </span>
          <span className="text-foreground/20 ml-2 sm:ml-3 font-bold text-5xl sm:text-6xl align-baseline">
            gen
          </span>
        </h1>
      </motion.div>

      <motion.p
        className="mt-5 text-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        persona cosplay for the chronically online
      </motion.p>
    </header>
  );
}
