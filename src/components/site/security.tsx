import { ShieldCheck } from "lucide-react";
import { securityLayers } from "@/content/profile";

const headers = [
  ["content-security-policy", "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none'"],
  ["strict-transport-security", "max-age=63072000; includeSubDomains; preload"],
  ["x-content-type-options", "nosniff"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  ["permissions-policy", "camera=(), microphone=(), geolocation=()"],
  ["cross-origin-opener-policy", "same-origin"],
];

export function Security() {
  return (
    <section id="seguranca" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <div className="container-page relative">
        <div data-reveal className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 text-bone">Cybersecurity · AppSec · LGPD</p>
            <h2 className="display text-[clamp(2.6rem,6vw,5rem)] text-cream">
              Segurança em camadas, não em promessa.
            </h2>
          </div>
          <p className="max-w-[500px] text-[17px] leading-relaxed text-stone lg:justify-self-end">
            Construí o sec-agent, que audita código, infraestrutura, banco e aplicações web com redação automática de
            segredos e PII e um leak gate antes do relatório. As mesmas camadas valem para tudo o que entrego.
          </p>
        </div>

        <ol className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {securityLayers.map((l, i) => (
            <li key={l.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="rounded-xl border border-white/[0.07] bg-onyx p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-bone">camada {String(i + 1).padStart(2, "0")}</span>
                <ShieldCheck className="size-4 text-jade" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-[17px] font-medium text-cream">{l.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-stone">{l.detail}</p>
            </li>
          ))}
        </ol>

        <figure data-reveal className="mt-12 overflow-hidden rounded-xl border border-white/[0.08] bg-smoke/60">
          <figcaption className="flex items-center justify-between border-b border-white/[0.06] bg-iron/50 px-4 py-2.5">
            <span className="font-mono text-[11px] text-bone">curl -sI https://este-site · cabeçalhos de resposta</span>
            <span className="font-mono text-[11px] text-jade">200 OK</span>
          </figcaption>
          <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7">
            {headers.map(([k, v]) => (
              <code key={k} className="block whitespace-pre">
                <span className="text-cobalt">{k}</span>
                <span className="text-bone">: </span>
                <span className="text-gold">{v}</span>
              </code>
            ))}
          </pre>
        </figure>
      </div>
    </section>
  );
}
