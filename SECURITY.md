# Segurança

## O que este site faz

| Controle | Onde | Por quê |
| --- | --- | --- |
| CSP com nonce por requisição e `'strict-dynamic'` | `src/proxy.ts` | Só executa script que o servidor marcou. Não há `'unsafe-inline'` nem `'unsafe-eval'` em produção. |
| SRI (`sha256`) nos scripts externos | `next.config.ts` | O navegador confere a integridade de cada bundle. |
| `frame-ancestors 'none'` + `X-Frame-Options: DENY` | proxy + config | Impede clickjacking. |
| HSTS com `preload` | `next.config.ts` | Só aceita HTTPS. |
| `Permissions-Policy` restritiva | `next.config.ts` | Sem câmera, microfone, localização nem Topics. |
| `X-Powered-By` desligado | `next.config.ts` | Não revela a tecnologia do servidor. |
| Nenhum rastreador e nenhum script de terceiros | — | Nada sai do domínio (`connect-src 'self'`). |
| Sem telefone publicado | `tests/unit/content.test.ts` | Um teste falha se um número aparecer no conteúdo. |
| gitleaks + `pnpm audit` | `.github/workflows/ci.yml` | Segredos e dependências vulneráveis barram o merge. |
| Actions fixadas por SHA, `permissions: contents: read` | CI | Protege a cadeia de suprimentos do pipeline. |

## Como verificar

```bash
pnpm build && pnpm start
curl -sI http://localhost:3000 | grep -iE "content-security|strict-transport|x-frame|permissions"
pnpm test:e2e   # inclui um teste que falha se a CSP gerar erro no console
```

## Reportar um problema

Escreva para victorfranco02@outlook.com com o assunto "segurança". Respondo em até 72 horas.
