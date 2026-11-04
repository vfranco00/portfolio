import { education, experiences, profile } from "@/content/profile";

export function Trajectory() {
  return (
    <section id="trajetoria" className="paper py-24 md:py-36">
      <div className="container-page grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-5 text-muted-foreground">Trajetória</p>
          <h2 className="display text-[clamp(2.6rem,5.4vw,4.5rem)]">
            Da indústria pesada à IA em produção.
          </h2>
          <p className="mt-6 max-w-[420px] text-[16px] leading-relaxed text-muted-foreground">
            Gerdau, Vallourec e Seidor me ensinaram sistema que não pode cair. A Nevus me deu o produto inteiro para
            construir com IA.
          </p>

          <div className="mt-12 space-y-8 border-t border-border pt-8">
            <div>
              <p className="eyebrow mb-3 text-muted-foreground">Formação</p>
              <p className="text-[16px] font-medium">{education.course}</p>
              <p className="text-[14px] text-muted-foreground">{education.school}</p>
              <p className="font-mono text-[12px] text-muted-foreground">{education.period}</p>
              <p className="mt-3 text-[14px] italic leading-relaxed text-muted-foreground">TCC: {education.thesis}</p>
            </div>
            <div>
              <p className="eyebrow mb-3 text-muted-foreground">Cursos</p>
              <ul className="space-y-1 text-[14px]">
                {education.courses.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3 text-muted-foreground">Idiomas</p>
              <ul className="flex flex-wrap gap-2">
                {profile.languages.map((l) => (
                  <li key={l.name} className="rounded-full bg-leaf px-3 py-1 text-[12px] font-medium text-forest">
                    {l.name} · {l.level}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ol className="relative border-l border-border">
          {experiences.map((e, i) => (
            <li key={e.company + e.period} data-reveal className="relative pb-14 pl-8 last:pb-0 md:pl-12">
              <span
                aria-hidden
                className={
                  i === 0
                    ? "absolute top-1.5 -left-[5px] size-[9px] rounded-full bg-jade ring-4 ring-leaf"
                    : "absolute top-1.5 -left-[4px] size-[7px] rounded-full bg-foreground/30"
                }
              />
              <p className="font-mono text-[12px] text-muted-foreground">
                {e.period} · {e.place}
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-light leading-tight tracking-[-0.03em]">
                {e.company}
              </h3>
              <p className="text-[15px] font-medium">{e.role}</p>
              <ul className="mt-4 space-y-2">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                    <span className="mt-[11px] h-px w-3 shrink-0 bg-foreground/30" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
