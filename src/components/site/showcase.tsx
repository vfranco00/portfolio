"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { showcases, type Screen } from "@/content/profile";
import { cn } from "@/lib/utils";

const CYCLE_MS = 4200;

export function Showcase() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const project = showcases[active];

  // A janela "deita" e se endireita conforme entra na tela; o celular sobe em paralaxe.
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "center center"] });
  const tilt = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [140, 0]);

  // Troca as telas sozinha; pausa no hover, no foco e com movimento reduzido.
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setView((v) => v + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, active]);

  const desktop = project.desktop[view % project.desktop.length];

  function pick(i: number) {
    setActive(i);
    setView(0);
  }

  return (
    <section id="telas" className="relative overflow-hidden py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-jade/[0.06] blur-[140px]"
      />
      <div className="container-page relative">
        <ScrollReveal className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 text-bone">Telas reais · em tela grande e no celular</p>
            <h2 className="display text-[clamp(2.6rem,6vw,5rem)] text-cream">
              Software de verdade, rodando.
            </h2>
          </div>
          <p className="max-w-[480px] text-[17px] leading-relaxed text-stone lg:justify-self-end">
            Nada de mockup inventado: cada tela foi capturada com o sistema rodando, com dados de demonstração e
            nunca de produção. A mesma interface no desktop e no celular.
          </p>
        </ScrollReveal>

        <LayoutGroup id="showcase-tabs">
          <div role="tablist" aria-label="Escolher projeto" className="mt-12 flex flex-wrap gap-2">
            {showcases.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.slug}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="showcase-stage"
                  onClick={() => pick(i)}
                  className={cn(
                    "relative rounded-md px-4 py-2 text-[14px] transition-colors",
                    selected ? "text-ember" : "text-stone hover:text-cream",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="showcase-pill"
                      className="absolute inset-0 rounded-md bg-cream"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                  <span className="relative">{s.name}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div
          id="showcase-stage"
          ref={stage}
          role="tabpanel"
          aria-label={`Telas do ${project.name}`}
          className="relative mt-10 [perspective:1800px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <motion.div
            style={reduce ? undefined : { rotateX: tilt, scale, transformOrigin: "50% 100%" }}
            className="relative mr-0 lg:mr-[150px]"
          >
            <BrowserFrame title={desktop.label.includes(" · ") ? desktop.label.replace(" · ", " — ") : `${project.name} — ${desktop.label}`}>
              <Slides key={project.slug} screens={project.desktop} index={view} sizes="(min-width: 1024px) 1000px, 100vw" />
            </BrowserFrame>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { y: phoneY }}
            className="relative z-10 mr-2 ml-auto -mt-20 w-[42%] max-w-[230px] sm:-mt-28 lg:absolute lg:right-0 lg:bottom-[-48px] lg:mt-0 lg:mr-0 lg:w-[260px] lg:max-w-none"
          >
            <PhoneFrame>
              <Slides key={project.slug} screens={project.mobile} index={view} sizes="260px" />
            </PhoneFrame>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-[1fr_auto] lg:items-start">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              <p className="font-mono text-[12px] text-jade">{project.kind}</p>
              <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-stone">{project.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                {project.stack.map((s) => (
                  <li key={s} className="rounded bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-stone">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Escolher tela">
              {project.desktop.map((d, i) => {
                const on = view % project.desktop.length === i;
                return (
                  <button
                    key={d.label}
                    onClick={() => setView(i)}
                    aria-pressed={on}
                    className={cn(
                      "relative overflow-hidden rounded-full border px-3 py-1 text-[12px] transition-colors",
                      on ? "border-jade/50 text-cream" : "border-white/10 text-bone hover:text-cream",
                    )}
                  >
                    {on && !reduce && !paused && (
                      <motion.span
                        key={`${project.slug}-${view}`}
                        aria-hidden
                        className="absolute inset-y-0 left-0 bg-jade/15"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                      />
                    )}
                    <span className="relative">{d.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-bone">{project.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Todas as telas do projeto ficam montadas e só a opacidade muda: a próxima já
// está carregada na hora da troca, sem quadro vazio no meio da transição.
function Slides({ screens, index, sizes }: { screens: Screen[]; index: number; sizes: string }) {
  const reduce = useReducedMotion();
  const current = index % screens.length;
  return (
    <>
      {screens.map((screen, i) => (
        <motion.div
          key={screen.src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.015 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={i !== current}
        >
          <Image
            src={screen.src}
            alt={i === current ? screen.label : ""}
            fill
            sizes={sizes}
            className="object-cover object-top"
          />
        </motion.div>
      ))}
    </>
  );
}

function BrowserFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/[0.1] bg-smoke shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="flex h-9 items-center gap-2 border-b border-white/[0.06] bg-iron/70 px-4">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc20]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto max-w-[60%] truncate rounded-md bg-ember/60 px-4 py-0.5 font-mono text-[11px] text-bone">
          {title}
        </span>
        <span className="w-12" aria-hidden />
      </div>
      <div className="relative aspect-[16/10] bg-ember">{children}</div>
    </figure>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <figure className="rounded-[46px] border border-white/15 bg-[#0b0b0a] p-[9px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="relative overflow-hidden rounded-[38px] bg-white">
        <div className="relative z-10 flex h-8 items-center justify-between bg-black px-6 font-mono text-[10px] text-white">
          <span>9:41</span>
          <span className="absolute top-1.5 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0b0b0a] ring-1 ring-white/10" />
          <span className="flex items-center gap-1" aria-hidden>
            <span className="h-2 w-3 rounded-[2px] border border-white/80" />
          </span>
        </div>
        <div className="relative aspect-[390/800]">{children}</div>
        <div className="absolute bottom-1.5 left-1/2 z-10 h-1 w-24 -translate-x-1/2 rounded-full bg-black/40" aria-hidden />
      </div>
    </figure>
  );
}
