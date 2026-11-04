/**
 * Gera as telas da vitrine de projetos (public/screens/*.jpg).
 *
 * Cada projeto roda LOCALMENTE com dados de demonstração — nunca contra banco
 * de produção. Uso:
 *
 *   node scripts/capture-screens.mjs chuplec   # Chuplec em http://localhost:3300
 *   node scripts/capture-screens.mjs lastro    # protótipo do console (arquivo HTML local)
 *   node scripts/capture-screens.mjs nutri     # NutriAgent em http://localhost:3400
 *
 * Variáveis: CHUPLEC_URL, NUTRI_URL, LASTRO_HTML (caminho do protótipo).
 */
import { mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const OUT = new URL("../public/screens/", import.meta.url);
const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

// Textos que não podem aparecer nas imagens (origem do Lastro).
const REDACT = [
  [/TI Local · Ouro Branco/g, "TI Local · Planta 01"],
  [/Ouro Branco/g, "Planta 01"],
  [/Siderúrgica Aurora/g, "Indústria Aurora"],
  [/Aciaria/g, "Produção"],
  [/Metalurgia/g, "Engenharia"],
  [/[Ss]iderúrgic[oa]s?/g, "industrial"],
];

async function shot(page, name) {
  // Esconde o indicador do `next dev` e o overlay de erros de desenvolvimento.
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: fileURLToPath(new URL(`${name}.jpg`, OUT)), type: "jpeg", quality: 82 });
  console.log("✓", name);
}

async function redact(page) {
  await page.evaluate((pairs) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      for (const [src, flags, to] of pairs) n.nodeValue = n.nodeValue.replace(new RegExp(src, flags), to);
    }
  }, REDACT.map(([re, to]) => [re.source, re.flags, to]));
}

const targets = {
  async chuplec(browser) {
    const base = process.env.CHUPLEC_URL ?? "http://localhost:3300";
    for (const [kind, opts] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
      const ctx = await browser.newContext({ ...opts, baseURL: base, reducedMotion: "reduce" });
      const page = await ctx.newPage();
      await page.goto("/", { waitUntil: "networkidle" });
      const portao = page.getByRole("dialog");
      await portao.waitFor({ state: "visible" });
      // Em `next dev` o botão pode existir antes de hidratar: tenta até fechar.
      for (let i = 0; i < 5 && (await portao.isVisible()); i++) {
        await page.getByRole("button", { name: "Sim, tenho 18 anos ou mais" }).click();
        await page.waitForTimeout(1500);
      }
      await portao.waitFor({ state: "hidden" });
      await shot(page, `chuplec-${kind}-home`);
      await page.goto("/vitrine");
      await shot(page, `chuplec-${kind}-vitrine`);
      const produto = page.locator('a[href*="/produto/"]').first();
      if (await produto.count()) {
        await page.goto(await produto.getAttribute("href"));
        await shot(page, `chuplec-${kind}-produto`);
      }
      await ctx.close();
    }
  },

  async lastro(browser) {
    const file = process.env.LASTRO_HTML;
    if (!file) throw new Error("Defina LASTRO_HTML com o caminho do protótipo do console.");
    for (const [kind, opts] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
      const ctx = await browser.newContext({ ...opts, colorScheme: "light" });
      const page = await ctx.newPage();
      await page.goto(pathToFileURL(file).href);
      await page.waitForLoadState("networkidle");
      await redact(page);
      // No celular o menu lateral vira cabeçalho; a captura mostra o conteúdo.
      const toMain = () => kind === "mobile" && page.evaluate(() => window.scrollTo(0, document.querySelector(".topbar").offsetTop));
      await toMain();
      await shot(page, `lastro-${kind}-panorama`);
      for (const view of ["desligamento", "ativos"]) {
        await page.locator(`[data-view="${view}"]`).click();
        await redact(page);
        await toMain();
        await shot(page, `lastro-${kind}-${view}`);
      }
      await ctx.close();
    }
  },

  async nutri(browser) {
    const base = process.env.NUTRI_URL ?? "http://localhost:3400";
    const routes = (process.env.NUTRI_ROUTES ?? "/").split(",");
    for (const [kind, opts] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
      const ctx = await browser.newContext({ ...opts, baseURL: base, storageState: process.env.NUTRI_STATE });
      const page = await ctx.newPage();
      for (const r of routes) {
        await page.goto(r);
        await page.waitForLoadState("networkidle");
        await shot(page, `nutri-${kind}-${r.replace(/\W+/g, "") || "home"}`);
      }
      await ctx.close();
    }
  },
};

const which = process.argv[2];
if (!targets[which]) {
  console.error(`Uso: node scripts/capture-screens.mjs <${Object.keys(targets).join("|")}>`);
  process.exit(1);
}
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  await targets[which](browser);
} finally {
  await browser.close();
}
