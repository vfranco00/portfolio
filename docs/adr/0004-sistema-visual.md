# ADR-0004 — Sistema visual

- **Status:** aceito
- **Data:** 2026-11-03

## Contexto

Duas referências foram escolhidas: o **Warp** (fundo escuro e quente, terminais como imagem do produto, código com dourado e cobalto) e o **Mural** (troca do preto para o branco, títulos finos com letras apertadas, um só acento jade). O resultado precisava ser único e combinar com o assunto: IA em produção e monitoramento.

## Decisão

- **Conceito:** "console noturno, virada para o papel". O site é escuro como um terminal. As seções de explicação (case da Órbita, engenharia e trajetória) viram para o papel com a classe `.paper`, que redefine os tokens. A mesma mão escreve sobre o fundo oposto.
- **Cor:** só o jade como acento, com o sentido de "sistema saudável" (status, CTA, métricas). O dourado e o cobalto só aparecem dentro de terminal e código.
- **Tipografia:** Inter Tight 300 com tracking de −0,05em nos títulos; Inter no texto; JetBrains Mono nos rótulos e no código. Todas auto-hospedadas pelo `next/font`, o que atende `font-src 'self'`.
- **Forma:** botões com raio de 8px e borda escura (do Mural); cards planos, separados por cor de fundo e não por sombra. A única sombra fica no card que "flutua" (o trace da onda).
- **Movimento:** só `transform` e `opacity`, com `prefers-reduced-motion` respeitado (o terminal e o trace aparecem completos de uma vez).

## Consequências

- Todos os tokens estão em `src/app/globals.css`. Trocar o acento é mudar uma variável.
