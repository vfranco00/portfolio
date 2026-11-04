# ADR-0005 — Telas reais dos projetos e portfólio instalável

- **Status:** aceito
- **Data:** 2026-11-03

## Contexto

A vitrine precisava mostrar o Lastro, o NutriAgent e o Chuplec em tela de computador e no celular. Os sites publicados estavam fora do ar (o Chuplec não respondia; o domínio do Lastro dava 404) e não havia capturas prontas. Os `.env` do Chuplec e do Lastro apontam para bancos Supabase remotos, e o do Chuplec é a loja real.

## Decisão

1. **Telas reais, nunca de produção.** `scripts/capture-screens.mjs` captura cada sistema rodando localmente:
   - **Chuplec:** Postgres do próprio `docker-compose` do projeto, migrations, `db:seed` e `db:seed:demo`. `DATABASE_URL`, `APP_URL` e `BREVO_API_KEY` (vazia) são forçadas no processo, como na config de E2E do projeto, para nenhum e-mail real sair.
   - **NutriAgent:** rede Docker isolada (banco novo + API pelo Dockerfile do projeto), sem chave de e-mail, pagamento ou Gemini. `VITE_API_URL` é sempre a API local, porque sem ela o frontend fala com a API de produção. A usuária de demonstração usa um e-mail `example.com`.
   - **Lastro:** protótipo estático do console, com dados sintéticos.
2. **Origem do Lastro não aparece.** Antes de cada captura, o script troca no DOM os termos que indicariam a empresa ("Ouro Branco", "Siderúrgica", "Aciaria", "Metalurgia"). O arquivo do Lastro não é alterado.
3. **Transição sem quadro vazio.** Todas as telas de um projeto ficam montadas e só a opacidade muda, então a próxima já está carregada na hora da troca.
4. **"PWA" é o portfólio.** Nenhum dos três projetos tem manifest nem service worker, então o site não os chama de PWA. A moldura do celular mostra a interface responsiva. O próprio portfólio ganhou `manifest.webmanifest` e ícones de 192, 512 e maskable, e pode ser instalado como app. Não há service worker: o navegador já não exige um para instalar, e assim a CSP continua estrita e nenhum cache velho fica preso no aparelho do recrutador.

## Consequências

- Para atualizar as telas, basta subir o projeto localmente e rodar o script (veja o cabeçalho dele).
- Testes unitários garantem que toda tela citada existe e que cada projeto declara que usa dados de demonstração.
- Problemas achados nos outros repositórios durante a captura (ficam como follow-up neles):
  - NutriAgent: o `requirements.txt` aceita qualquer SQLAlchemy ≥ 2.0, e a 2.1 troca o driver padrão para `psycopg` 3, que não está instalado. As migrations também precisam de `greenlet`, que falta no arquivo.
  - NutriAgent: sem `VITE_API_URL`, o frontend local fala com a API de produção.
