import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victorcaetano.vercel.app";
const description =
  "AI Engineer e Desenvolvedor Full Stack. RAG, agentes com structured outputs, orquestração multiagente e plataformas em produção com segurança e testes como regra.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — ${profile.role}`, template: `%s · ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: ["AI Engineer", "LLM", "RAG", "Full Stack", "Next.js", "TypeScript", "Python", "Agentes de IA"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — ${profile.role}`, description },
  robots: { index: true, follow: true },
  appleWebApp: { capable: true, title: "Victor Caetano", statusBarStyle: "black-translucent" },
  icons: { apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  colorScheme: "dark",
};

// Dado estruturado (não executável): não é afetado pela CSP de scripts.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "AI Engineer",
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: ["Large Language Models", "Retrieval-Augmented Generation", "TypeScript", "Python", "Next.js"],
  alumniOf: "Instituto Federal de Minas Gerais",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-jade focus:px-4 focus:py-2 focus:text-ember"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
