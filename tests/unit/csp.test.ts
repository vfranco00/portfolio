import { describe, expect, it } from "vitest";
import { buildCsp } from "@/proxy";

describe("Content-Security-Policy", () => {
  const prod = buildCsp("abc123", false);

  it("só executa script com nonce em produção", () => {
    const script = prod.split("; ").find((d) => d.startsWith("script-src"));
    expect(script).toBe("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
    expect(script).not.toContain("unsafe-inline");
    expect(script).not.toContain("unsafe-eval");
  });

  it("bloqueia plugins, framing e troca de base", () => {
    expect(prod).toContain("object-src 'none'");
    expect(prod).toContain("frame-ancestors 'none'");
    expect(prod).toContain("base-uri 'self'");
  });

  it("libera eval só em desenvolvimento", () => {
    expect(buildCsp("n", true)).toContain("'unsafe-eval'");
  });
});
