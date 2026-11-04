import { Bot, Database, LifeBuoy, Radar, ShoppingBag, Store, Workflow, KeyRound } from "lucide-react";
import { WaveTrace } from "./wave-trace";

const sources = [
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Store, label: "SaaS multi-tenant" },
  { icon: Database, label: "ERP" },
  { icon: Bot, label: "Agentes de IA · n8n" },
];

const noiseRules = [
  { rule: "Crítico abre na hora", detail: "Severidade alta não espera janela." },
  { rule: "Ocorrência só se durar, voltar ou insistir", detail: "Erro que some sozinho não vira chamado." },
  { rule: "Estado conhecido não é erro", detail: "Manutenção e limites esperados ficam fora." },
  { rule: "Rotina é o sinal de vida", detail: "Silêncio inesperado também é alerta." },
];

export function OrbitaCase() {
  return (
    <section id="orbita" className="paper relative py-24 md:py-36">
      <div className="container-page">
        <div data-reveal className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 text-muted-foreground">Case 01 · Nevus Digital</p>
            <h2 className="display text-[clamp(2.6rem,6vw,5rem)]">
              Órbita: a plataforma que vigia todos os produtos da empresa.
            </h2>
          </div>
          <p className="max-w-[520px] text-[17px] leading-relaxed text-muted-foreground lg:justify-self-end">
            Lidero a plataforma operacional da Nevus: gestão ágil, cofre de credenciais cifrado com auditoria,
            agenda com Google Calendar/Meet e chamados que os clientes abrem de dentro dos próprios sistemas.
            Tudo em Next.js 16, React 19 e Supabase com RLS.
          </p>
        </div>

        {/* Diagrama de arquitetura */}
        <figure data-reveal className="mt-16 rounded-3xl bg-ember p-5 text-cream md:mt-20 md:p-10" aria-labelledby="arq-caption">
          <figcaption id="arq-caption" className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <span className="eyebrow text-bone">Arquitetura · fluxo de um evento</span>
            <span className="font-mono text-[11px] text-bone">evento → severidade → anti-ruído → chamado</span>
          </figcaption>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1.25fr_auto_1fr] lg:items-stretch">
            <div className="grid gap-2">
              <p className="eyebrow mb-1 text-bone">Produtos</p>
              {sources.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-smoke/60 px-4 py-3 text-[14px]">
                  <Icon className="size-4 text-stone" strokeWidth={1.5} />
                  {label}
                </div>
              ))}
            </div>

            <Flow label="eventos" />

            <div className="relative overflow-hidden rounded-xl border border-jade/40 bg-[linear-gradient(180deg,rgba(0,194,122,0.10),rgba(0,194,122,0.02))] p-5">
              <div className="flex items-center gap-2.5">
                <Radar className="size-5 text-jade" strokeWidth={1.5} />
                <p className="font-display text-[22px] font-light tracking-tight">Vigia</p>
                <span className="ml-auto rounded-full bg-jade/15 px-2 py-0.5 font-mono text-[10px] text-jade">anti-ruído</span>
              </div>
              <ul className="mt-5 space-y-3">
                {noiseRules.map((r) => (
                  <li key={r.rule} className="border-t border-white/[0.07] pt-3">
                    <p className="text-[14px] text-cream">{r.rule}</p>
                    <p className="text-[13px] text-bone">{r.detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Flow label="só o que persiste" />

            <div className="grid gap-2">
              <p className="eyebrow mb-1 text-bone">Operação</p>
              <Node icon={LifeBuoy} title="Chamados" detail="Fila única de suporte" />
              <Node icon={Workflow} title="Órbita Assist" detail="Widget dentro dos sistemas dos clientes" />
              <Node icon={KeyRound} title="Cofre cifrado" detail="Credenciais com trilha de auditoria" />
              <Node icon={Database} title="Supabase + RLS" detail="210 cenários por papel e tenant" />
            </div>
          </div>
        </figure>

        {/* Como é construída */}
        <div data-reveal className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-5 text-muted-foreground">Como é construída</p>
            <h3 className="display text-[clamp(2rem,4.2vw,3.4rem)]">
              Até 7 agentes de código em paralelo. Zero conflito.
            </h3>
            <p className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-muted-foreground">
              Cada agente Claude Code recebe um briefing escrito, uma worktree isolada e arquivos exclusivos. Eu desenho
              os contratos, reviso e decido; a onda só sobe se passar no gate de qualidade. As decisões viram ADRs —
              já são mais de 90.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["653", "testes no gate"],
                ["210", "cenários de RLS"],
                ["90+", "ADRs"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dd className="display text-[2.4rem]">{v}</dd>
                  <dt className="mt-1 text-[13px] text-muted-foreground">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <WaveTrace />
        </div>
      </div>
    </section>
  );
}

function Flow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-1 lg:flex-col lg:px-1" aria-hidden>
      <div className="relative h-8 w-px overflow-hidden bg-white/10 lg:h-px lg:w-16">
        <span className="absolute inset-y-0 left-0 w-1/4 bg-jade lg:animate-[lane_1.8s_linear_infinite]" />
      </div>
      <span className="ml-3 font-mono text-[10px] text-bone lg:mt-2 lg:ml-0">{label}</span>
    </div>
  );
}

function Node({ icon: Icon, title, detail }: { icon: typeof Radar; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/[0.08] bg-smoke/60 px-4 py-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-stone" strokeWidth={1.5} />
      <div>
        <p className="text-[14px]">{title}</p>
        <p className="text-[12px] text-bone">{detail}</p>
      </div>
    </div>
  );
}
