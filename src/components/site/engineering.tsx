import { principles } from "@/content/profile";

const pyramid = [
  { label: "E2E · Playwright", width: "52%", note: "fluxos críticos de ponta a ponta" },
  { label: "RLS · 210 cenários", width: "68%", note: "permissão testada por papel e tenant" },
  { label: "Integração", width: "84%", note: "banco, webhooks e integrações reais" },
  { label: "Unitários · Vitest/Jest", width: "100%", note: "regras de negócio isoladas" },
];

export function Engineering() {
  return (
    <section id="engenharia" className="paper py-24 md:py-36">
      <div className="container-page">
        <div data-reveal>
        <p className="eyebrow mb-5 text-muted-foreground">Engenharia de software</p>
        <h2 className="display max-w-[900px] text-[clamp(2.6rem,6vw,5rem)]">
          Velocidade de agente. Disciplina de engenheiro.
        </h2>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.code} data-reveal style={{ "--i": i } as React.CSSProperties} className="flex flex-col gap-4 bg-background p-7 md:p-9">
              <span className="font-mono text-[12px] text-forest">{p.code}</span>
              <h3 className="font-display text-[26px] font-light leading-tight tracking-[-0.03em]">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4 text-muted-foreground">Pirâmide de testes</p>
            <h3 className="display text-[clamp(2rem,3.8vw,3rem)]">Cada camada pega um tipo de erro.</h3>
            <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-muted-foreground">
              Na Órbita, no Central do Uniforme (137 arquivos de teste, 59 verificações em produção) e no Chuplec (580
              testes), o gate é o mesmo: se uma camada falha, nada sobe.
            </p>
          </div>
          <ol className="space-y-2.5" aria-label="Pirâmide de testes, do topo para a base">
            {pyramid.map((l, i) => (
              <li key={l.label} data-reveal style={{ "--i": i } as React.CSSProperties} className="grid grid-cols-[1fr] items-center gap-2 sm:grid-cols-[1fr_210px] sm:gap-6">
                <div className="flex justify-center">
                  <div
                    className="flex h-14 min-w-fit items-center justify-center rounded-lg bg-ember px-5 text-cream"
                    style={{ width: l.width }}
                  >
                    <span className="whitespace-nowrap font-mono text-[12px]">{l.label}</span>
                  </div>
                </div>
                <p className="text-center text-[13px] text-muted-foreground sm:text-left">{l.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
