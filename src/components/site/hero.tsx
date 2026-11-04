import { ArrowDownRight } from "lucide-react";
import { TextReveal } from "@/components/motion/text-reveal";
import { profile } from "@/content/profile";
import { Metrics } from "./metrics";
import { Terminal } from "./terminal";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-jade/[0.07] blur-[120px]"
      />

      <div className="container-page relative">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-stone">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-[pulse-ring_1.8s_ease-out_infinite] rounded-full bg-jade" />
              <span className="relative size-2 rounded-full bg-jade" />
            </span>
            todos os sistemas operacionais · aberto a oportunidades
          </span>
          <span className="font-mono text-[11px] text-bone">{profile.location}</span>
        </div>

        <p className="eyebrow mb-6 text-bone">{profile.name} — {profile.role}</p>
        <h1 className="display text-[clamp(2.9rem,7.6vw,7.4rem)] text-cream">
          <TextReveal text="Coloco LLMs em produção" split="word" className="block" />
          <TextReveal text="— e mantenho no ar." split="word" delay={0.25} className="block text-stone" />
        </h1>

        <div className="mt-14 grid items-start gap-14 lg:mt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="max-w-[560px] text-[17px] leading-relaxed text-stone md:text-[19px]">
              {profile.summary}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#orbita"
                className="group inline-flex items-center gap-2 rounded-md border border-ember bg-jade py-2.5 pr-12 pl-4 text-[15px] font-medium text-ember transition-[filter] hover:brightness-110 relative"
              >
                Ver os cases
                <ArrowDownRight className="absolute right-3.5 size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#projetos"
                className="border-b border-cream/40 pb-0.5 text-[15px] text-cream transition-colors hover:border-cream"
              >
                Todos os projetos
              </a>
              <code className="hidden font-mono text-[13px] text-bone md:inline">
                <span className="text-jade">●</span> pressione <span className="text-cream">⌘K</span> para navegar
              </code>
            </div>
          </div>

          <Terminal />
        </div>

        <Metrics />
      </div>
    </section>
  );
}
