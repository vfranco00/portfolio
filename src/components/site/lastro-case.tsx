import { ArrowRight, ArrowUpRight } from "lucide-react";
import { lastroCase } from "@/content/profile";
import { AssetPark } from "./asset-park";

export function LastroCase() {
  const { origin, evolution, principle, pillars, pipeline, stack, docs } = lastroCase;

  return (
    <section id="lastro" className="relative border-y border-white/[0.06] bg-onyx py-24 md:py-36">
      <div className="container-page">
        <div data-reveal className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 text-bone">Case 02 · Governança de ativos e FinOps</p>
            <h2 className="display text-[clamp(2.6rem,6vw,5rem)] text-cream">
              Lastro: 10 mil ativos pelo mundo, uma fonte única de verdade.
            </h2>
          </div>
          <p className="max-w-[500px] text-[17px] leading-relaxed text-stone lg:justify-self-end">
            Começou como uma solução que liderei num parque global com mais de 10 mil ativos. O que aprendi ali foi a
            base para construir e aprimorar o Lastro de hoje: um SaaS de ITAM e FinOps em que cada número tem origem e
            nenhuma decisão destrutiva depende de alguém lembrar de uma regra.
          </p>
        </div>

        {/* Origem */}
        <div data-reveal className="mt-16 grid gap-6 rounded-3xl border border-white/[0.07] bg-ember p-5 md:mt-20 md:p-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="flex flex-col">
            <p className="eyebrow text-bone">{origin.title}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
              {origin.scale.map((s) => (
                <div key={s.label}>
                  <dd className="display text-[clamp(2.2rem,4vw,3.25rem)] text-cream">{s.value}</dd>
                  <dt className="mt-2 text-[13px] text-bone">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-10 text-[15px] leading-relaxed text-stone">{origin.body}</p>
          </div>
          <AssetPark />
        </div>

        {/* Evolução */}
        <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {evolution.map((e, i) => (
            <li key={e.stage} data-reveal style={{ "--i": i } as React.CSSProperties} className="relative bg-ember p-6">
              <div className="flex items-center gap-3">
                <span
                  className={
                    i === evolution.length - 1
                      ? "rounded-full bg-jade px-2.5 py-0.5 font-mono text-[11px] text-ember"
                      : "rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[11px] text-stone"
                  }
                >
                  {e.stage}
                </span>
                {i < evolution.length - 1 && <ArrowRight className="hidden size-3.5 text-bone lg:block" aria-hidden />}
              </div>
              <p className="mt-5 text-[17px] text-cream">{e.title}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-bone">{e.detail}</p>
            </li>
          ))}
        </ol>

        {/* Princípio */}
        <blockquote data-reveal className="mx-auto mt-24 max-w-[980px] text-center md:mt-32">
          <p className="eyebrow mb-6 text-bone">O princípio que atravessa as 22 decisões</p>
          <p className="display text-[clamp(2rem,4.6vw,3.9rem)] text-cream">“{principle}”</p>
        </blockquote>

        {/* Esteira */}
        <figure data-reveal className="mt-16 rounded-2xl border border-white/[0.07] bg-ember p-5 md:p-8" aria-labelledby="esteira-caption">
          <figcaption id="esteira-caption" className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="eyebrow text-bone">Esteira de descomissionamento</span>
            <span className="font-mono text-[11px] text-bone">quem encaminha não aprova · log de eventos imutável</span>
          </figcaption>
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {pipeline.map((p, i) => {
              const tone =
                p.step === "Aprovar"
                  ? "border-jade/50 bg-jade/[0.08]"
                  : p.step === "Desligar"
                    ? "border-dashed border-white/20"
                    : "border-white/[0.08] bg-smoke/50";
              return (
                <li key={p.step} className={`rounded-lg border px-4 py-3.5 ${tone}`}>
                  <span className="font-mono text-[10px] text-bone">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1 text-[15px] text-cream">{p.step}</p>
                  <p className={p.step === "Aprovar" ? "text-[12px] text-jade" : "text-[12px] text-bone"}>{p.who}</p>
                </li>
              );
            })}
          </ol>
        </figure>

        {/* Pilares */}
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="rounded-xl border border-white/[0.07] bg-ember p-6">
              <h3 className="text-[16px] font-medium text-cream">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-stone">{p.detail}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/[0.07] pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-1.5" aria-label="Stack do Lastro">
            {stack.map((s) => (
              <li key={s} className="rounded bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-stone">
                {s}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="font-mono text-[12px] text-bone">
              {docs.adrs} ADRs · {docs.format}
            </span>
            <a
              href="https://lastrgovernance.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-ember bg-jade px-3.5 py-1.5 text-[14px] font-medium text-ember transition-[filter] hover:brightness-110"
            >
              Ver o Lastro
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
