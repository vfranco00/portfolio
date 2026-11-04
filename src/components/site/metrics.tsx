"use client";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { heroMetrics } from "@/content/profile";

export function Metrics() {
  return (
    <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] md:mt-28 md:grid-cols-4">
      {heroMetrics.map((m) => (
        <div key={m.label} className="flex flex-col justify-between gap-6 bg-ember p-5 md:p-7">
          <dt className="order-2 text-[13px] leading-snug text-bone">{m.label}</dt>
          <dd className="display order-1 text-[clamp(2.4rem,5vw,3.75rem)] text-cream tabular-nums">
            {m.prefix && <span className="text-bone">{m.prefix}</span>}
            <AnimatedNumber value={m.value} startOnView />
            {m.suffix && <span className="text-jade">{m.suffix}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
