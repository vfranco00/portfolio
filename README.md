# Victor Caetano — Portfólio

Portfólio de **AI Engineer · Full Stack**. Uma página única que apresenta os projetos, a forma de trabalhar e as práticas de engenharia e segurança. O próprio site segue essas práticas.

> **Ideia visual:** um "console noturno" que vira para o papel. O fundo escuro e quente, com terminais, vem do Warp. A troca do escuro para o claro e os títulos finos com letras apertadas vêm do Mural. Há uma só cor de destaque, o jade (`#00c27a`), que significa "sistema saudável". O dourado e o cobalto só aparecem dentro de código.

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router) · React 19 · TypeScript strict |
| Estilo | Tailwind CSS v4 com tokens próprios (`src/app/globals.css`) |
| Componentes | [beUI](https://beui.dev) via registry shadcn (`@beui/*`) · motion |
| Testes | Vitest (unitário) · Playwright (E2E em desktop e mobile) |
| Segurança | CSP por nonce (`src/proxy.ts`) · SRI · HSTS · gitleaks · `pnpm audit` |
| Animação | motion · revelação na rolagem por `IntersectionObserver` · 3D na vitrine |
| App | instalável (manifest + ícones), sem service worker |
| Deploy | Vercel |

## Rodando

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # lint + typecheck + testes unitários
pnpm test:e2e     # build de produção + Playwright
```

Para regerar as telas da vitrine (cada projeto rodando localmente, com dados de demonstração):

```bash
node scripts/capture-screens.mjs chuplec   # ou lastro, nutri — veja o cabeçalho do script
node scripts/make-icons.mjs                # ícones do app instalável
```

## Estrutura

```
src/
  app/                 layout, página, SEO (robots, sitemap, imagem OG)
  content/profile.ts   fonte única do conteúdo (vem do currículo)
  components/
    site/              seções do portfólio (código próprio)
    motion/, agents/   componentes beUI copiados do registry
  proxy.ts             CSP por requisição com nonce
tests/
  unit/                conteúdo e política de segurança
  e2e/                 CSP sem erros, cabeçalhos, filtros, paleta ⌘K, mobile
docs/adr/              decisões de arquitetura
```

Para mudar um texto, edite `src/content/profile.ts`. Nenhum componente tem texto de carreira escrito direto no código.

## Decisões

- [ADR-0001](docs/adr/0001-pagina-unica-conteudo-tipado.md): página única com o conteúdo tipado num só arquivo
- [ADR-0002](docs/adr/0002-csp-por-nonce.md): CSP estrita por nonce no lugar de SRI sozinho
- [ADR-0003](docs/adr/0003-beui-como-codigo-copiado.md): componentes do beUI como código copiado
- [ADR-0004](docs/adr/0004-sistema-visual.md): sistema visual a partir de duas referências
- [ADR-0005](docs/adr/0005-telas-reais-e-app-instalavel.md): telas reais dos projetos e portfólio instalável

## Segurança

Veja [SECURITY.md](SECURITY.md).
