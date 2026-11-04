// Gera os ícones PNG do app instalável a partir de src/app/icon.svg.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const svg = await readFile(new URL("../src/app/icon.svg", import.meta.url), "utf8");
const browser = await chromium.launch();
for (const [name, size, pad] of [["icon-192.png", 192, 0], ["icon-512.png", 512, 0], ["icon-maskable-512.png", 512, 0.12], ["apple-touch-icon.png", 180, 0]]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const inner = Math.round(size * (1 - pad * 2));
  await page.setContent(
    `<body style="margin:0;background:#121212;display:grid;place-items:center;width:${size}px;height:${size}px">` +
      svg.replace("<svg ", `<svg width="${inner}" height="${inner}" `) +
      "</body>",
  );
  await page.screenshot({ path: fileURLToPath(new URL(`../public/${name}`, import.meta.url)), omitBackground: false });
  await page.close();
  console.log("✓", name);
}
await browser.close();
