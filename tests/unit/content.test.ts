import { describe, expect, it } from "vitest";
import { experiences, heroMetrics, lastroCase, profile, projects } from "@/content/profile";

describe("conteúdo do portfólio", () => {
  it("tem slugs de projeto únicos (viram âncoras da página)", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
  });

  it("todo projeto tem categoria, stack e ao menos um destaque", () => {
    for (const p of projects) {
      expect(p.category.length, p.slug).toBeGreaterThan(0);
      expect(p.stack.length, p.slug).toBeGreaterThan(0);
      expect(p.highlights.length, p.slug).toBeGreaterThan(0);
    }
  });

  it("links externos usam https", () => {
    const links = [profile.linkedin, profile.github, ...projects.flatMap((p) => (p.link ? [p.link.href] : []))];
    for (const l of links) expect(l).toMatch(/^https:\/\//);
  });

  it("mantém os números do currículo", () => {
    const values = heroMetrics.map((m) => m.value);
    expect(values).toEqual(expect.arrayContaining([93, 653, 90]));
    expect(experiences[0].company).toBe("Nevus Digital");
  });

  it("não publica telefone", () => {
    const dump = JSON.stringify({ profile, projects, experiences });
    expect(dump).not.toMatch(/\(\d{2}\)\s?\d{4,5}-?\d{4}/);
  });

  it("não nomeia a empresa de origem do Lastro", () => {
    const dump = JSON.stringify({ projects, lastroCase, heroMetrics });
    expect(dump).not.toMatch(/gerdau/i);
  });

  it("o case do Lastro mantém a escala do parque", () => {
    expect(lastroCase.origin.scale[0].value).toBe("10 mil+");
    expect(projects.find((p) => p.slug === "lastro")?.featured).toBe(true);
  });
});
