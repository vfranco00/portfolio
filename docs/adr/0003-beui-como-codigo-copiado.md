# ADR-0003 — beUI como código copiado

- **Status:** aceito
- **Data:** 2026-11-03

## Contexto

O beUI não é um pacote de runtime. Os componentes vêm do registry `@beui` do shadcn e são copiados para o projeto.

## Decisão

- Componentes usados: `command-palette`, `text-reveal`, `animated-number`, `marquee`, `scroll-progress`, `agent-activity` (mais as dependências que eles puxam).
- Eles ficam em `src/components/motion/` e `src/components/agents/` **como vieram**, para poderem ser atualizados com `shadcn add @beui/<slug> --overwrite`.
- O ESLint desliga três regras do React Compiler (`set-state-in-effect`, `refs`, `immutability`) só nessas duas pastas. O código próprio (`src/components/site/`) segue todas as regras.
- Uma exceção foi corrigida: o `text-shimmer` do registry importava de si mesmo. O import foi apontado para `@/lib/text-shimmer`.

## Consequências

- Os componentes podem ser atualizados sem conflito com mudanças locais.
- As regras desligadas valem só para código de terceiros revisado, nunca para código novo.
