"use client";

import { useState, useRef, useCallback } from "react";
import type { Persona, Platform, Tone } from "@/lib/prompts";

interface GenerateParams {
  persona: Persona;
  platform: Platform;
  tone: Tone;
  content: string;
}

export function useGenerate() {
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastParamsRef = useRef<GenerateParams | null>(null);

  const generate = useCallback(async (params: GenerateParams) => {
    // Abort any in-flight request
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;
    lastParamsRef.current = params;

    setOutput("");
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error || `Request failed (${res.status})`
        );
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setOutput((prev) => prev + text);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setIsGenerating(false);
  }, []);

  const regenerate = useCallback(() => {
    if (lastParamsRef.current) {
      generate(lastParamsRef.current);
    }
  }, [generate]);

  return { output, isGenerating, error, generate, abort, regenerate };
}
