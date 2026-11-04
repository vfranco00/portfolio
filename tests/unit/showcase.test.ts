import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { showcases } from "@/content/profile";

describe("vitrine de telas", () => {
  it("toda tela citada existe em public/", () => {
    for (const s of showcases) {
      for (const screen of [...s.desktop, ...s.mobile]) {
        expect(existsSync(join(process.cwd(), "public", screen.src)), screen.src).toBe(true);
      }
    }
  });

  it("cada projeto tem tela de desktop e de celular", () => {
    for (const s of showcases) {
      expect(s.desktop.length, s.slug).toBeGreaterThan(0);
      expect(s.mobile.length, s.slug).toBeGreaterThan(0);
    }
  });

  it("deixa claro que os dados são de demonstração", () => {
    for (const s of showcases) expect(s.note).toMatch(/sintéticos|demonstração/);
  });
});
