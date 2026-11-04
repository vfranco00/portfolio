"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const DOTS = 400; // cada ponto = 25 ativos → 10 mil
const COLS = 40;

// Ordem pseudoaleatória determinística (igual no servidor e no cliente).
const order = Array.from({ length: DOTS }, (_, i) => (i * 157) % DOTS);
const delayOf = new Map(order.map((dot, rank) => [dot, rank]));

export function AssetPark() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const lit = reduce || inView;

  return (
    <figure ref={ref} className="flex flex-col justify-between gap-5 rounded-2xl border border-white/[0.06] bg-smoke/40 p-5 md:p-6">
      <figcaption className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-bone">parque conciliado</span>
        <span className="flex items-center gap-3 font-mono text-[10px] text-bone">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-white/15" /> origem dispersa
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-jade" /> fonte única
          </span>
        </span>
      </figcaption>
      <div
        role="img"
        aria-label="400 pontos, cada um representando 25 ativos de TI, passando de dispersos para conciliados"
        className="my-auto grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: DOTS }, (_, i) => (
          <motion.span
            key={i}
            className="aspect-square rounded-full bg-jade"
            initial={false}
            animate={{ opacity: lit ? (i % 23 === 0 ? 0.25 : i % 7 === 0 ? 0.55 : 0.9) : 0.1 }}
            transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : (delayOf.get(i) ?? 0) * 0.004 }}
          />
        ))}
      </div>
      <p className="font-mono text-[10px] text-bone">cada ponto = 25 ativos · 400 pontos = 10 mil ativos</p>
    </figure>
  );
}
