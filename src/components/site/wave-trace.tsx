"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { AgentActivity } from "@/components/agents/agent-activity";
import type { AgentActivityItem } from "@/components/agents/agent-activity/types";

const steps: AgentActivityItem[] = [
  { id: "spec", type: "step", label: "Escrever a spec e os contratos da onda", meta: "spec-driven" },
  { id: "brief", type: "step", label: "Distribuir briefings para 7 agentes", meta: "1 por agente" },
  { id: "wt", type: "step", label: "Abrir worktrees isoladas com arquivos exclusivos", meta: "git worktree" },
  { id: "t1", type: "tool", action: "edit", target: "src/vigia/severity.ts", additions: 142, deletions: 18 },
  { id: "t2", type: "tool", action: "edit", target: "supabase/policies/tickets.sql", additions: 61, deletions: 9 },
  { id: "t3", type: "tool", action: "run", target: "pnpm test && pnpm test:rls && pnpm e2e" },
  { id: "gate", type: "step", label: "Gate: 653 testes · 210 cenários RLS · E2E", meta: "verde" },
  { id: "adr", type: "step", label: "Registrar decisão em ADR e integrar", meta: "ADR-0xx" },
];

export function WaveTrace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const [played, setCount] = useState(0);
  const count = reduce ? steps.length : played;

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= steps.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 650);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const done = count >= steps.length;
  const items = steps.slice(0, Math.max(count, 1)).map((s, i) =>
    s.type === "step" ? { ...s, status: i < count - 1 || done ? ("complete" as const) : ("active" as const) } : s,
  );

  return (
    <div ref={ref} className="rounded-3xl border border-border bg-card p-5 shadow-[0_0_1px_rgba(11,41,70,0.32),0_24px_40px_rgba(42,82,121,0.08)] md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <p className="font-mono text-[12px] text-muted-foreground">onda de entrega · trace</p>
        <span
          className={
            done
              ? "rounded-full bg-leaf px-3 py-0.5 text-[12px] font-medium text-forest"
              : "rounded-full bg-secondary px-3 py-0.5 text-[12px] font-medium text-muted-foreground"
          }
        >
          {done ? "aprovada" : "em execução"}
        </span>
      </div>
      <AgentActivity
        items={items}
        contentType="mixed"
        status={done ? "complete" : "working"}
        duration={count * 0.65}
        defaultOpen
        activeLabel="Orquestrando agentes"
        summary="Onda concluída: 7 agentes, gate verde"
        maxHeight={420}
      />
    </div>
  );
}
