import { Marquee } from "@/components/motion/marquee";
import { stackGroups } from "@/content/profile";

const ribbon = ["Claude", "GPT", "Gemini", "RAG", "pgvector", "TypeScript", "Python", "Next.js", "FastAPI", "Supabase", "AWS", "Playwright", "n8n", "Docker"];

export function Stack() {
  return (
    <section id="stack" className="border-y border-white/[0.06] bg-onyx py-24 md:py-32">
      <div className="container-page">
        <p className="eyebrow mb-5 text-bone">Stack</p>
        <h2 className="display max-w-[820px] text-[clamp(2.6rem,6vw,5rem)] text-cream">
          Ferramenta certa, em produção, com motivo.
        </h2>
      </div>

      <Marquee speed={40} fade pauseOnHover gap="3rem" className="mt-14 py-2">
        {ribbon.map((r) => (
          <span key={r} className="font-display text-[clamp(2rem,4vw,3.25rem)] font-light tracking-[-0.04em] text-white/25">
            {r}
          </span>
        ))}
      </Marquee>

      <div className="container-page mt-14">
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((g, i) => (
            <div key={g.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="border-t border-white/10 pt-5">
              <dt className="eyebrow mb-4 text-bone">{g.title}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span key={item} className="rounded border border-white/[0.07] bg-ember px-2 py-1 font-mono text-[12px] text-stone">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
