import { ImageResponse } from "next/og";

export const alt = "Victor Caetano — AI Engineer · Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#121212",
          color: "#faf9f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#b4b4b2" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#00c27a" }} />
          todos os sistemas operacionais
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, letterSpacing: -4, lineHeight: 1 }}>
          <span>Coloco LLMs em produção</span>
          <span style={{ color: "#868684" }}>— e mantenho no ar.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b4b4b2" }}>
          <span>Victor Caetano · AI Engineer · Full Stack</span>
          <span style={{ color: "#00c27a" }}>RAG · Agentes · Multiagente</span>
        </div>
      </div>
    ),
    size,
  );
}
