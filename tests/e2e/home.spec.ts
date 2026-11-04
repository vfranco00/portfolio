import { expect, test } from "@playwright/test";

test("carrega sem violar a CSP e sem erros no console", async ({ page }) => {
  const problems: string[] = [];
  page.on("console", (m) => m.type() === "error" && problems.push(m.text()));
  page.on("pageerror", (e) => problems.push(e.message));

  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Coloco LLMs em produção");
  // O terminal só digita se o JS hidratou sob a CSP estrita.
  await expect(page.getByText("onda aprovada")).toBeVisible({ timeout: 10_000 });
  expect(problems).toEqual([]);
});

test("envia os cabeçalhos de segurança", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toMatch(/script-src 'self' 'nonce-[^']+' 'strict-dynamic'/);
  expect(h["strict-transport-security"]).toContain("max-age=63072000");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["x-powered-by"]).toBeUndefined();
});

test("filtra projetos por área", async ({ page }) => {
  await page.goto("/#projetos");
  const cards = page.locator("#projetos article");
  const total = await cards.count();
  await page.getByRole("tab", { name: "Segurança" }).click();
  await expect(cards).not.toHaveCount(total);
  await expect(page.locator("#projeto-sec-agent")).toBeVisible();
});

test("a paleta de comandos navega até um projeto", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /menu|buscar/i }).click();
  // Espera a paleta abrir; digitar antes disso manda as teclas para a página.
  const search = page.getByRole("combobox");
  await search.fill("NutriAgent");
  await expect(page.getByRole("option")).toHaveCount(1);
  await search.press("Enter");
  await expect(page.locator("#projeto-nutri-agent")).toBeInViewport({ timeout: 5_000 });
});

test("não tem rolagem horizontal", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

test("a vitrine troca de projeto e carrega as telas", async ({ page }) => {
  await page.goto("/#telas");
  const stage = page.locator("#showcase-stage");
  await expect(stage).toHaveAttribute("aria-label", "Telas do Lastro + NutriAgent");
  await page.getByRole("tab", { name: "NutriAgent", exact: true }).click();
  await expect(stage).toHaveAttribute("aria-label", "Telas do NutriAgent");
  const visible = stage.locator('img[alt="Hoje"]').first();
  await expect(visible).toBeVisible();
  await expect.poll(() => visible.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
});

test("é instalável como app (manifest)", async ({ request }) => {
  const res = await request.get("/manifest.webmanifest");
  expect(res.ok()).toBe(true);
  const manifest = await res.json();
  expect(manifest.display).toBe("standalone");
  expect(manifest.icons.map((i: { sizes: string }) => i.sizes)).toEqual(expect.arrayContaining(["192x192", "512x512"]));
});
