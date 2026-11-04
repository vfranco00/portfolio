import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./brand-icons";
import { profile } from "@/content/profile";

const links = [
  { href: `mailto:${profile.email}`, label: profile.email, icon: Mail, external: false },
  { href: profile.linkedin, label: "linkedin.com/in/ofrancodev", icon: Linkedin, external: true },
  { href: profile.github, label: "github.com/vfranco00", icon: Github, external: true },
];

export function Contact() {
  return (
    <footer id="contato" className="relative overflow-hidden pt-24 pb-10 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 left-1/2 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-jade/[0.08] blur-[140px]"
      />
      <div className="container-page relative">
        <p className="eyebrow mb-6 text-bone">Próximo passo</p>
        <h2 data-reveal className="display max-w-[1000px] text-[clamp(3rem,9vw,7.5rem)] text-cream">
          Vamos colocar IA na mesa de milhões de pessoas?
        </h2>

        <ul className="mt-16 grid gap-3 md:grid-cols-3">
          {links.map(({ href, label, icon: Icon, external }, i) => (
            <li key={href} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-onyx px-5 py-5 transition-colors hover:border-jade/60"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="size-4 shrink-0 text-stone" strokeWidth={1.5} />
                  <span className="truncate text-[15px] text-cream">{label}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-bone transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-jade" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-24 flex flex-col gap-3 border-t border-white/[0.07] pt-6 font-mono text-[11px] text-bone md:flex-row md:items-center md:justify-between">
          <p>© 2026 {profile.name} · feito com Next.js 16, React 19, Tailwind v4 e beUI</p>
          <p>
            CSP estrita · SRI · zero rastreadores · <span className="text-jade">●</span> operacional
          </p>
        </div>
      </div>
    </footer>
  );
}
