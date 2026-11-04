"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project, type ProjectCategory } from "@/content/profile";
import { cn } from "@/lib/utils";

const filters: { id: "todos" | ProjectCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "ia", label: "IA e agentes" },
  { id: "produto", label: "Produto" },
  { id: "dados", label: "Dados" },
  { id: "seguranca", label: "Segurança" },
];

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("todos");
  const reduce = useReducedMotion();
  const list = active === "todos" ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <section id="projetos" className="relative py-24 md:py-36">
      <div className="container-page">
        <div data-reveal className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5 text-bone">Projetos · {projects.length} em produção e P&D</p>
            <h2 className="display max-w-[760px] text-[clamp(2.6rem,6vw,5rem)] text-cream">
              Do RAG ao e‑commerce. Tudo com teste, métrica e dono.
            </h2>
          </div>
        </div>

        <LayoutGroup>
          <div role="tablist" aria-label="Filtrar projetos" className="mt-12 flex flex-wrap gap-2">
            {filters.map((f) => {
              const selected = active === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(f.id)}
                  className={cn(
                    "relative rounded-md px-4 py-2 text-[14px] transition-colors",
                    selected ? "text-ember" : "text-stone hover:text-cream",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-md bg-cream"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </div>

          <motion.ul layout={!reduce} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p) => (
                <motion.li
                  key={p.slug}
                  layout={!reduce}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                  className={cn(p.featured && active === "todos" && "lg:col-span-1", "flex")}
                >
                  <ProjectCard project={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article
      id={`projeto-${p.slug}`}
      className="group relative flex w-full flex-col rounded-xl border border-white/[0.07] bg-onyx p-6 transition-colors hover:border-white/[0.16] md:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {p.category.map((c) => (
            <span key={c} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-bone">
              {filters.find((f) => f.id === c)?.label}
            </span>
          ))}
        </div>
        {p.metric && (
          <div className="text-right">
            <p className="font-display text-[26px] font-light leading-none tracking-tight text-jade">{p.metric.value}</p>
            <p className="mt-1 text-[11px] text-bone">{p.metric.label}</p>
          </div>
        )}
      </div>

      <h3 className="mt-8 font-display text-[26px] font-light leading-tight tracking-[-0.03em] text-cream">{p.name}</h3>
      <p className="mt-2 text-[15px] text-stone">{p.tagline}</p>

      <details className="group/d mt-5 border-t border-white/[0.07] pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] text-bone transition-colors hover:text-cream [&::-webkit-details-marker]:hidden">
          Como foi feito
          <span className="font-mono transition-transform group-open/d:rotate-45">+</span>
        </summary>
        <p className="mt-3 text-[14px] leading-relaxed text-stone">{p.context}</p>
        <ul className="mt-3 space-y-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-[14px] leading-relaxed text-stone">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-jade" />
              {h}
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-auto pt-6">
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s} className="rounded bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-stone">
              {s}
            </li>
          ))}
        </ul>
        {p.link && (
          <a
            href={p.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-cream underline-offset-4 hover:underline"
          >
            {p.link.label}
            <ArrowUpRight className="size-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
