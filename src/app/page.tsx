import { connection } from "next/server";
import { Contact } from "@/components/site/contact";
import { Engineering } from "@/components/site/engineering";
import { Hero } from "@/components/site/hero";
import { Nav } from "@/components/site/nav";
import { LastroCase } from "@/components/site/lastro-case";
import { OrbitaCase } from "@/components/site/orbita-case";
import { RevealObserver } from "@/components/site/reveal-observer";
import { Showcase } from "@/components/site/showcase";
import { Projects } from "@/components/site/projects";
import { Security } from "@/components/site/security";
import { Stack } from "@/components/site/stack";
import { Trajectory } from "@/components/site/trajectory";

export default async function Home() {
  // Renderiza por requisição para o nonce da CSP chegar aos scripts.
  await connection();
  return (
    <>
      <Nav />
      <main id="conteudo">
        <Hero />
        <OrbitaCase />
        <LastroCase />
        <Showcase />
        <Projects />
        <Engineering />
        <Security />
        <Stack />
        <Trajectory />
      </main>
      <Contact />
      <RevealObserver />
    </>
  );
}
