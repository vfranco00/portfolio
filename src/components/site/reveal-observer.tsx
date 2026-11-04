"use client";

import { useEffect } from "react";

/**
 * Revela na rolagem todo elemento com `data-reveal`. O estado escondido só
 * existe depois que esta classe entra no <html>: sem JavaScript, nada some.
 * A cascata vem de `style={{ "--i": n }}` no próprio elemento (ver globals.css).
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const watch = () => document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    watch();
    // Cards que entram depois (filtros, troca de abas) também são observados.
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
