import type { MetadataRoute } from "next";

// Portfólio instalável como app (Chrome, Edge, Android e "Adicionar à Tela de Início" no iOS).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Victor Caetano — AI Engineer",
    short_name: "Victor Caetano",
    description: "Portfólio de AI Engineer e Full Stack: RAG, agentes e plataformas em produção.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#121212",
    lang: "pt-BR",
    categories: ["portfolio", "developer"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
