"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import PersonaSelector from "@/components/PersonaSelector";
import PlatformSelector from "@/components/PlatformSelector";
import ToneSelector from "@/components/ToneSelector";
import ContextInputs from "@/components/ContextInputs";
import GenerateButton from "@/components/GenerateButton";
import OutputCard from "@/components/OutputCard";
import { useGenerate } from "@/lib/useGenerate";
import type { Persona, Platform, Tone } from "@/lib/prompts";

export default function Home() {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [tone, setTone] = useState<Tone | null>(null);
  const [content, setContent] = useState("");

  const { output, isGenerating, error, generate, abort, regenerate } =
    useGenerate();

  const canGenerate =
    persona && platform && tone && content.trim() && !isGenerating;

  const handleGenerate = () => {
    if (!persona || !platform || !tone || !content.trim()) return;
    generate({ persona, platform, tone, content: content.trim() });
  };

  return (
    <div className="min-h-screen relative">
      <div className="mx-auto max-w-2xl px-4 pb-24">
        <Header />

        <div className="space-y-6">
          {/* Input */}
          <ContextInputs content={content} onContentChange={setContent} />

          {/* Config panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl glass-strong p-5 space-y-5"
          >
            {/* Persona row */}
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-muted/40 mb-2.5">
                Persona
              </label>
              <PersonaSelector selected={persona} onSelect={setPersona} />
            </div>

            {/* Platform + Tone side by side on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-widest text-muted/40 mb-2.5">
                  Platform
                </label>
                <PlatformSelector selected={platform} onSelect={setPlatform} />
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-widest text-muted/40 mb-2.5">
                  Tone
                </label>
                <ToneSelector selected={tone} onSelect={setTone} />
              </div>
            </div>
          </motion.div>

          {/* Generate */}
          <GenerateButton
            onClick={handleGenerate}
            isGenerating={isGenerating}
            disabled={!canGenerate}
            onAbort={abort}
          />

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                className="rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm px-5 py-4 text-sm text-red-400/80"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Output */}
          <OutputCard
            output={output}
            isGenerating={isGenerating}
            onRegenerate={regenerate}
          />

          <AnimatePresence>
            {!output && !isGenerating && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center text-sm text-muted/25 pt-4"
              >
                Your personal brand awaits.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
