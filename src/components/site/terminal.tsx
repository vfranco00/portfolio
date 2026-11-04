"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Tone = "cmd" | "info" | "agent" | "ok" | "muted";
type Line = { tone: Tone; text: string; meta?: string; delay: number };

const script: Line[] = [
  { tone: "cmd", text: "orbita wave start --agents 7 --gate strict", delay: 500 },
  { tone: "info", text: "briefings", meta: "7 contratos escritos · critério de pronto", delay: 700 },
  { tone: "info", text: "worktrees", meta: "isoladas · arquivos exclusivos por agente", delay: 450 },
  { tone: "agent", text: "agent-1  vigia/severity.ts", meta: "+142 −18", delay: 380 },
  { tone: "agent", text: "agent-2  assist/widget.tsx", meta: "+96 −4", delay: 220 },
  { tone: "agent", text: "agent-3  rls/tickets.sql", meta: "+61 −9", delay: 220 },
  { tone: "agent", text: "agent-4  rag/ingest.py", meta: "+208 −31", delay: 220 },
  { tone: "muted", text: "… agent-5 · agent-6 · agent-7", delay: 300 },
  { tone: "info", text: "gate", meta: "653 testes · 210 cenários RLS · E2E Playwright", delay: 900 },
  { tone: "ok", text: "onda aprovada · ADR registrado · deploy na Vercel", delay: 700 },
];

export function Terminal({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const shown = reduce ? script.length : typed;

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      if (i >= script.length) return;
      t = setTimeout(() => {
        i += 1;
        setTyped(i);
        next();
      }, script[i].delay);
    };
    next();
    return () => clearTimeout(t);
  }, [reduce]);

  const done = shown >= script.length;

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-white/[0.08] bg-smoke/70 shadow-[0_40px_120px_-40px_rgba(0,194,122,0.25)] backdrop-blur",
        className,
      )}
      aria-label="Terminal demonstrando uma onda de desenvolvimento com 7 agentes em paralelo"
    >
      <div className="flex h-9 items-center gap-2 border-b border-white/[0.06] bg-iron/60 px-4">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc20]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-bone">orbita — zsh — 7 agentes</span>
      </div>
      <div className="min-h-[316px] space-y-1.5 p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        {script.slice(0, shown).map((l, i) => (
          <TermLine key={i} line={l} />
        ))}
        {!done && <span className="inline-block h-4 w-2 animate-[blink_1s_steps(1)_infinite] bg-cream/80 align-middle" />}
        {done && (
          <p className="pt-2 text-bone">
            <span className="text-jade">❯</span>{" "}
            <span className="inline-block h-4 w-2 animate-[blink_1s_steps(1)_infinite] bg-cream/80 align-middle" />
          </p>
        )}
      </div>
    </figure>
  );
}

function TermLine({ line }: { line: Line }) {
  switch (line.tone) {
    case "cmd":
      return (
        <p className="text-cream">
          <span className="text-jade">❯</span> {line.text}
        </p>
      );
    case "info":
      return (
        <p className="text-stone">
          <span className="text-cobalt">▸ {line.text.padEnd(10, " ")}</span>
          <span className="text-gold">{line.meta}</span>
        </p>
      );
    case "agent":
      return (
        <p className="flex justify-between gap-4 text-stone">
          <span className="truncate">{line.text}</span>
          <span className="shrink-0 text-bone">{line.meta}</span>
        </p>
      );
    case "ok":
      return (
        <p className="text-jade">
          ✓ <span className="text-cream">{line.text}</span>
        </p>
      );
    default:
      return <p className="text-bone">{line.text}</p>;
  }
}
