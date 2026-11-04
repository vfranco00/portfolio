# ADR-0001 — Página única com conteúdo tipado

- **Status:** aceito
- **Data:** 2026-11-03

## Contexto

O portfólio acompanha uma candidatura para AI Engineer. Quem avalia tem pouco tempo e precisa ver tudo o que o currículo traz: projetos, stack, segurança e trajetória. O conteúdo muda sempre que o currículo muda.

## Decisão

- Uma página só, com seções ancoradas e uma paleta ⌘K para pular entre elas e entre os projetos.
- Todo o texto fica em `src/content/profile.ts`, com tipos (`Project`, `Experience`, `Metric`). Os componentes só leem esse arquivo.
- Testes unitários garantem slugs únicos, links em HTTPS e os números do currículo, e impedem que um telefone seja publicado.

## Consequências

- Atualizar o currículo é editar um arquivo, com checagem de tipos.
- Um blog ou uma página por projeto exigiria rotas novas. Hoje isso não é necessário.
