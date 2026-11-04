"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Boxes,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  FileText,
  Link2,
  Monitor,
  Mail,
  Orbit,
  ShieldCheck,
} from "lucide-react";
import { CommandPalette, type CommandItem } from "@/components/motion/command-palette";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { profile, projects } from "@/content/profile";
import { cn } from "@/lib/utils";

export const sections = [
  { id: "orbita", label: "Órbita", icon: Orbit },
  { id: "lastro", label: "Lastro", icon: Database },
  { id: "telas", label: "Telas", icon: Monitor },
  { id: "projetos", label: "Projetos", icon: Boxes },
  { id: "engenharia", label: "Engenharia", icon: Code2 },
  { id: "seguranca", label: "Segurança", icon: ShieldCheck },
  { id: "stack", label: "Stack", icon: Cpu },
  { id: "trajetoria", label: "Trajetória", icon: BriefcaseBusiness },
] as const;

// A paleta trava o overflow do body enquanto está aberta e só solta depois do
// onSelect. Rolar no mesmo tick é ignorado; esperamos o próximo frame.
function go(id: string) {
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    ),
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = useMemo<CommandItem[]>(
    () => [
      ...sections.map((s) => ({
        id: `s-${s.id}`,
        label: s.label,
        group: "Seções",
        icon: s.icon,
        onSelect: () => go(s.id),
      })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        label: p.name,
        hint: p.stack.slice(0, 2).join(" · "),
        group: "Projetos",
        keywords: [...p.stack, ...p.category, ...p.tagline.split(" ")],
        icon: FileText,
        onSelect: () => go(`projeto-${p.slug}`),
      })),
      {
        id: "c-mail",
        label: "Enviar e-mail",
        hint: profile.email,
        group: "Contato",
        icon: Mail,
        onSelect: () => window.open(`mailto:${profile.email}`, "_self"),
      },
      {
        id: "c-linkedin",
        label: "LinkedIn",
        group: "Contato",
        icon: Link2,
        onSelect: () => window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "c-github",
        label: "GitHub",
        group: "Contato",
        icon: Link2,
        onSelect: () => window.open(profile.github, "_blank", "noopener,noreferrer"),
      },
    ],
    [],
  );

  return (
    <>
      <ScrollProgress fixed position="top" height={2} className="z-[60] bg-jade" />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-white/[0.06] bg-ember/75 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav aria-label="Principal" className="container-page flex h-16 items-center justify-between gap-6">
          <a href="#inicio" className="group flex items-center gap-2.5" aria-label="Início">
            <span className="grid size-7 place-items-center rounded-md border border-white/15 font-mono text-[11px] text-cream">
              VC
            </span>
            <span className="hidden font-mono text-[13px] text-stone sm:inline">
              ~/{profile.handle}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded-md px-3 py-2 text-[14px] text-stone transition-colors hover:text-cream"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              className="flex items-center gap-2 rounded-md border border-white/10 px-2.5 py-1.5 text-[13px] text-stone transition-colors hover:border-white/25 hover:text-cream"
            >
              <span className="lg:hidden">Menu</span>
              <span className="hidden lg:inline">Buscar</span>
              <kbd className="hidden rounded border border-white/10 px-1.5 font-mono text-[11px] lg:inline">⌘K</kbd>
            </button>
            <a
              href="#contato"
              className="rounded-md border border-ember bg-jade px-3.5 py-1.5 text-[14px] font-medium text-ember transition-[filter] hover:brightness-110"
            >
              Contato
            </a>
          </div>
        </nav>
      </header>
      <CommandPalette
        items={items}
        open={open}
        onOpenChange={setOpen}
        placeholder="Buscar seção, projeto ou tecnologia…"
        emptyMessage="Nada encontrado."
      />
    </>
  );
}
