# ADR-0002 — CSP estrita por nonce

- **Status:** aceito
- **Data:** 2026-11-03

## Contexto

O site fala de segurança, então a própria resposta HTTP precisa provar isso: uma CSP sem `'unsafe-inline'` para scripts.

A primeira tentativa foi a opção sem servidor do guia do Next 16: página estática + SRI (`experimental.sri`) + `script-src 'self'`. Ela **falhou no build de produção**. O HTML trazia 42 scripts inline (o payload do React Server Components, `self.__next_f.push`), e o SRI só cobre os 7 scripts externos. A CSP bloqueou os inline e a página não hidratou: o título ficou invisível e o terminal parado.

## Decisão

- `src/proxy.ts` gera um nonce novo a cada requisição e monta `script-src 'self' 'nonce-…' 'strict-dynamic'`. O Next aplica o nonce sozinho a todos os scripts dele.
- A página chama `await connection()` e passa a ser renderizada por requisição. Por isso o `cacheComponents` foi desligado.
- O SRI continua ligado como segunda camada nos scripts externos.
- `style-src` mantém `'unsafe-inline'`, porque o motion anima pelo atributo `style`. Estilo não executa código, e o risco que sobra (injeção de CSS) é baixo numa página sem formulário e sem dado de usuário.

## Consequências

- Cada visita renderiza no servidor. A página é pequena, e na Vercel (Fluid Compute) isso custa milissegundos.
- Teste unitário (`tests/unit/csp.test.ts`) fixa a política. Teste E2E falha se aparecer erro no console, o que pega violação de CSP.
- Script de terceiros (analytics, por exemplo) exigirá rever a política.

## Alternativas descartadas

- **`'unsafe-inline'` em scripts:** anula a proteção contra XSS.
- **Hash de cada script inline no build:** os hashes mudam a cada build e precisariam ser injetados no cabeçalho depois. É frágil.
