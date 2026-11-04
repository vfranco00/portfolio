/**
 * Fonte única do conteúdo do portfólio.
 * Tudo aqui vem do currículo "AI Engineer — iFood GenAI" (nov/2026).
 * Nenhum componente escreve texto de carreira à mão: ele lê daqui.
 */

export type ProjectCategory = "ia" | "produto" | "dados" | "seguranca";

export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory[];
  context: string;
  highlights: string[];
  stack: string[];
  metric?: { value: string; label: string };
  link?: { href: string; label: string };
  featured?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  place: string;
  bullets: string[];
}

export const profile = {
  name: "Victor Caetano",
  handle: "ofrancodev",
  role: "AI Engineer · Full Stack",
  location: "Ouro Branco, MG · remoto",
  email: "victorfranco02@outlook.com",
  linkedin: "https://linkedin.com/in/ofrancodev",
  github: "https://github.com/vfranco00",
  headline: "Coloco LLMs em produção — e mantenho no ar.",
  summary:
    "Desenvolvedor Full Stack com foco em IA. Construo pipelines de RAG, agentes com structured outputs e plataformas inteiras orquestrando até 7 agentes de código em paralelo — com contratos, worktrees isoladas e gates de qualidade.",
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Fluente (C2)" },
    { name: "Espanhol", level: "Básico" },
  ],
} as const;

export const heroMetrics: Metric[] = [
  { value: 4, prefix: "~", suffix: " anos", label: "de engenharia de software" },
  { value: 93, suffix: "%", label: "menos tempo de busca num parque de 10 mil+ ativos" },
  { value: 653, label: "testes no gate de qualidade da Órbita" },
  { value: 90, suffix: "+", label: "decisões de arquitetura registradas (ADRs)" },
];

export const projects: Project[] = [
  {
    slug: "orbita",
    name: "Órbita",
    tagline: "A plataforma que vigia todos os produtos da empresa.",
    category: ["produto", "ia", "seguranca"],
    context:
      "Plataforma operacional interna da Nevus Digital: gestão ágil, cofre de credenciais cifrado com auditoria, agenda com Google Calendar/Meet e chamados que os clientes abrem por um widget dentro dos próprios sistemas.",
    highlights: [
      "Vigia por eventos que monitora e-commerce, SaaS, ERP e agentes de IA no n8n, com classificação de severidade e regras anti-ruído: só abre chamado para o erro que persiste, volta ou se repete.",
      "Desenvolvida com até 7 agentes Claude Code em paralelo — cada um com worktree, arquivos exclusivos e briefing escrito.",
      "Cada onda passa por um gate: 653 testes, 210 cenários de RLS e E2E em Playwright.",
      "Padrão de performance registrado em ADR que reduz as idas ao banco por tela.",
    ],
    stack: ["Next.js 16", "React 19", "Supabase", "RLS", "Vercel", "Playwright"],
    metric: { value: "7", label: "agentes em paralelo" },
    featured: true,
  },
  {
    slug: "rag-onca-pintada",
    name: "RAG de triagem no WhatsApp",
    tagline: "Um agente que responde com a base certa — e prova isso.",
    category: ["ia", "dados"],
    context: "Agente de triagem para o Instituto Onça-Pintada.",
    highlights: [
      "Base de conhecimento de 125 chunks escrita e validada.",
      "Ingestão no n8n com embeddings OpenAI text-embedding-3-small no Supabase (pgvector).",
      "Validador em Python que reproduz o chunking do pipeline para garantir que o que foi escrito é o que o modelo recupera.",
    ],
    stack: ["n8n", "OpenAI", "pgvector", "Supabase", "Python"],
    metric: { value: "125", label: "chunks validados" },
    featured: true,
  },
  {
    slug: "instagram-agent",
    name: "Agente de DMs do Instagram",
    tagline: "Workflows de IA gerados por código, não por cliques.",
    category: ["ia"],
    context: "Agente em n8n que atende as mensagens diretas de uma marca.",
    highlights: [
      "Workflows gerados por uma DSL em JavaScript — versionáveis e revisáveis como código.",
      "Classificação com GPT e structured outputs (JSON Schema estrito).",
      "Retry, modo simulado para testes e alerta de erro.",
    ],
    stack: ["n8n", "GPT", "JSON Schema", "JavaScript"],
    metric: { value: "100%", label: "saídas tipadas" },
  },
  {
    slug: "central-do-uniforme",
    name: "Central do Uniforme",
    tagline: "E-commerce em produção com pagamento por benefício governamental.",
    category: ["produto"],
    context: "Principal desenvolvedor do e-commerce, com mais de 1.900 commits.",
    highlights: [
      "Integrações com Bling ERP, Mercado Pago/Pix e pagamento por benefício governamental.",
      "137 arquivos de teste e CI no GitHub Actions.",
      "Monitor de produção com 59 verificações automáticas.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Drizzle"],
    metric: { value: "1.900+", label: "commits" },
    featured: true,
  },
  {
    slug: "aprova-r1",
    name: "Aprova R1",
    tagline: "SaaS multi-tenant em produção.",
    category: ["produto", "seguranca"],
    context: "Contribuição em um SaaS multi-tenant com isolamento por tenant no banco.",
    highlights: [
      "Supabase com RLS para isolar os dados de cada cliente.",
      "Webhooks de pagamento Asaas/EFI e observabilidade com Sentry.",
    ],
    stack: ["Next.js", "Hono", "Supabase", "RLS", "Sentry"],
  },
  {
    slug: "atacadao-mobile",
    name: "Atacadão ERP · Rastreio",
    tagline: "App de entregas com mapa em tempo real.",
    category: ["produto"],
    context: "App mobile de rastreio de entregas do Atacadão ERP.",
    highlights: ["Mapas com MapLibre e atualização em tempo real."],
    stack: ["React Native", "Expo", "MapLibre", "Realtime"],
  },
  {
    slug: "nevus-plugin",
    name: "Plugin de engenharia para Claude Code",
    tagline: "Padrões da empresa como skills que todo agente segue.",
    category: ["ia"],
    context: "Plugin interno da Nevus para o Claude Code.",
    highlights: [
      "Skills que padronizam monitoramento, suporte e performance em todos os projetos.",
      "Regras para agentes (CLAUDE.md/AGENTS.md) mantidas em 14 repositórios.",
    ],
    stack: ["Claude Code", "Skills", "Plugins", "Markdown"],
    metric: { value: "14", label: "repositórios" },
  },
  {
    slug: "kip",
    name: "Kip Investimentos",
    tagline: "Assistente de investimentos com RAG e cotações da B3.",
    category: ["ia", "dados"],
    context: "Chat com IA (assistente K4) apoiado por uma base curada sobre ações, FIIs e cripto.",
    highlights: [
      "Metadados por perfil de investidor e embeddings gemini-embedding-001 com busca vetorial no Supabase.",
      "Feed de notícias com ingestão RSS e resumo automático por IA via cron.",
      "Cotações reais da B3 via brapi.dev.",
    ],
    stack: ["Next.js", "Vercel AI SDK", "Gemini", "pgvector"],
  },
  {
    slug: "nutri-agent",
    name: "NutriAgent",
    tagline: "LLM + fallback determinístico contra alucinação.",
    category: ["ia"],
    context: "Planejador nutricional full stack: calorias, cardápios semanais e listas de compras.",
    highlights: [
      "Sistema híbrido: o LLM estima o geral e um fallback determinístico com cache cobre os alimentos brasileiros em que o modelo erra.",
    ],
    stack: ["Python", "FastAPI", "React", "Gemini", "Docker"],
  },
  {
    slug: "sec-agent",
    name: "sec-agent",
    tagline: "Auditoria de segurança com leak gate, em conformidade com a LGPD.",
    category: ["seguranca", "ia"],
    context: "Agente de segurança em Claude Code que cobre código, infraestrutura, banco e aplicações web.",
    highlights: [
      "Redação automática de segredos e PII antes de qualquer saída.",
      "Separação de ambientes (produção, staging e dev).",
      "Leak gate que bloqueia o relatório se algo sensível escapar.",
    ],
    stack: ["Claude Code", "Python", "Semgrep", "gitleaks"],
    featured: true,
  },
  {
    slug: "chuplec",
    name: "Chuplec",
    tagline: "Monolito modular em arquitetura hexagonal.",
    category: ["produto"],
    context: "E-commerce em portas e adaptadores, desenvolvido com Claude Code como agente de codificação.",
    highlights: ["580 testes automatizados e E2E em Playwright."],
    stack: ["Next.js 15", "PostgreSQL", "Prisma", "Docker"],
    metric: { value: "580", label: "testes" },
  },
  {
    slug: "lastro",
    name: "Lastro",
    tagline: "Governança de ativos de TI e FinOps, nascida num parque de 10 mil+ ativos.",
    category: ["dados", "produto", "seguranca"],
    context:
      "Console SaaS multi-tenant de ITAM e descomissionamento auditável. A base foi uma solução que liderei para um parque de mais de 10 mil ativos numa operação industrial global.",
    highlights: [
      "Na origem: −93% no tempo de busca de ativos, 95%+ de precisão e inventário de mensal para tempo real.",
      "Hoje: coletor e sentinela em Python, console em Next.js e Supabase com RLS por cliente.",
      "Esteira de descomissionamento com portões, segregação de funções e nenhuma credencial destrutiva.",
    ],
    stack: ["Python", "Next.js", "Drizzle", "Supabase", "RLS", "AWS"],
    metric: { value: "10 mil+", label: "ativos na origem" },
    link: { href: "https://lastrgovernance.vercel.app", label: "lastrgovernance.vercel.app" },
    featured: true,
  },
];

/**
 * Case do Lastro. Regra: a empresa de origem não é nomeada em nenhum texto
 * (há um teste que garante isso).
 */
export const lastroCase = {
  origin: {
    title: "A origem",
    scale: [
      { value: "10 mil+", label: "ativos de TI no parque" },
      { value: "Global", label: "operação em vários países" },
      { value: "−93%", label: "no tempo de busca de um ativo" },
      { value: "95%+", label: "de precisão no inventário" },
    ],
    body: "Liderei uma solução de gestão do ciclo de vida de ativos para uma operação industrial global. Pipelines em Python (Pandas, SQLAlchemy) conciliavam diretório de identidades, gestão de endpoints, SQL Server e a API do fabricante numa fonte única de verdade. O inventário passou de mensal para tempo real, e a segunda versão foi para a nuvem com AWS Lambda e Amazon RDS.",
  },
  evolution: [
    { stage: "v1", title: "Pipelines de conciliação", detail: "Python e SQL Server; inventário de mensal para tempo real." },
    { stage: "v2", title: "Nuvem", detail: "AWS Lambda, Amazon RDS (PostgreSQL) e cargas agendadas." },
    { stage: "TCC", title: "Pesquisa", detail: "Governança de dados como estratégia de redução de custos." },
    { stage: "Hoje", title: "Lastro", detail: "Produto SaaS multi-tenant de ITAM e FinOps." },
  ],
  principle: "A garantia é imposta pela estrutura, não pela disciplina de quem opera.",
  pillars: [
    {
      title: "Isolamento entre clientes",
      detail: "RLS em toda tabela de domínio. Tabela nova sem policy faz o CI falhar antes do merge.",
    },
    {
      title: "Esteira como log de eventos",
      detail: "Cada decisão congela a evidência no evento. Um auditor em 2029 vê o mesmo dossiê de 2026.",
    },
    {
      title: "Nenhuma credencial destrutiva",
      detail: "O produto não tem como desligar nada sozinho. Zero caminhos de código com esse poder.",
    },
    {
      title: "Dado com origem",
      detail: "Tarifas versionadas em livro-razão: corrigir um preço nunca reescreve um lançamento antigo.",
    },
  ],
  pipeline: [
    { step: "Observação", who: "analista" },
    { step: "Dossiê", who: "evidência congelada" },
    { step: "Encaminhar", who: "analista" },
    { step: "Aprovar", who: "outra pessoa" },
    { step: "Quarentena", who: "reversível em < 4 min" },
    { step: "Desligar", who: "fora do produto" },
  ],
  stack: ["Python (coletor e sentinela)", "Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Supabase RLS", "Zod", "Vercel"],
  docs: { adrs: 22, format: "arc42 + MADR 4.0" },
};

export const experiences: Experience[] = [
  {
    role: "Desenvolvedor Full Stack (IA e produto)",
    company: "Nevus Digital",
    period: "jul/2026 – atual",
    place: "São Paulo, SP · remoto",
    bullets: [
      "Lidero a Órbita e o vigia que monitora todos os produtos da empresa.",
      "Coordeno até 7 agentes Claude Code em paralelo com gates de qualidade.",
      "RAG, agentes em n8n e o e-commerce Central do Uniforme.",
    ],
  },
  {
    role: "Bolsista de Iniciação Científica (IA aplicada)",
    company: "Polo de Inovação IFMG",
    period: "mar/2026 – atual",
    place: "Ouro Branco, MG",
    bullets: [
      "P&D com empresa parceira: IA para automatizar a análise de documentos técnicos.",
      "Pipelines em Python e Pandas: ingestão, limpeza, extração, classificação e JSON.",
    ],
  },
  {
    role: "Estagiário em Engenharia de Software e Infraestrutura",
    company: "Gerdau Açominas",
    period: "fev/2025 – jul/2026",
    place: "Ouro Branco, MG",
    bullets: [
      "Engenharia de dados e infraestrutura: pipelines em Python, Pandas e SQLAlchemy sobre SQL Server.",
      "Cargas na nuvem com AWS Lambda e Amazon RDS; dashboards de KPI em Power BI.",
    ],
  },
  {
    role: "Desenvolvedor Back-end",
    company: "Seidor Veritas",
    period: "jun/2024 – set/2024",
    place: "Belo Horizonte, MG",
    bullets: [
      "Produto fiscal Outbound: NF-e, SEFAZ e prefeituras em TypeScript e Node.js.",
      "AWS Lambda, RabbitMQ e arquitetura orientada a eventos; sustentação N3 para reduzir o MTTR.",
    ],
  },
  {
    role: "Desenvolvedor Back-end (Estágio)",
    company: "PSV Engenharia de Sistemas",
    period: "abr/2024 – jun/2024",
    place: "Ouro Branco, MG",
    bullets: ["APIs REST e integrações em TypeScript, JavaScript e C# para clientes corporativos."],
  },
  {
    role: "Estagiário em Análise de Sistemas e SAP",
    company: "Vallourec",
    period: "abr/2022 – abr/2024",
    place: "Jeceaba, MG",
    bullets: [
      "QA no rollout internacional de SAP para a filial da França, com reconhecimento interno.",
      "Rotinas ABAP (PP/QM), dashboards em Power BI e apps em OutSystems.",
    ],
  },
];

export const stackGroups: { title: string; items: string[] }[] = [
  {
    title: "IA e LLMs",
    items: [
      "Claude", "GPT", "Gemini", "RAG", "Embeddings", "pgvector", "Tool use",
      "Structured outputs", "Prompt engineering", "Multiagente",
    ],
  },
  {
    title: "Ferramentas de IA",
    items: ["Claude Code", "OpenAI Codex", "Gemini CLI", "Vercel AI SDK", "LangChain", "n8n"],
  },
  { title: "Linguagens", items: ["TypeScript", "Python", "JavaScript", "SQL", "C#"] },
  {
    title: "Back-end",
    items: ["Node.js", "FastAPI", "Hono", "NestJS", "Express", "REST", "RabbitMQ", "Eventos"],
  },
  { title: "Front-end e mobile", items: ["React", "Next.js", "Tailwind CSS", "React Native", "Expo"] },
  {
    title: "Dados",
    items: ["PostgreSQL", "Supabase", "SQL Server", "MongoDB", "Pandas", "Drizzle", "Prisma", "ETL"],
  },
  { title: "Cloud e DevOps", items: ["AWS Lambda", "RDS", "Vercel", "Docker", "GitHub Actions", "Sentry"] },
  {
    title: "Qualidade e segurança",
    items: ["Vitest", "Jest", "Playwright", "Semgrep", "gitleaks", "RLS", "LGPD"],
  },
];

export const principles = [
  {
    code: "01",
    title: "Spec antes de código",
    body: "Toda mudança começa por um contrato escrito. Agentes recebem briefing, arquivos exclusivos e critério de pronto — nada de “vê aí o que dá”.",
  },
  {
    code: "02",
    title: "Decisão vira ADR",
    body: "Mais de 90 decisões de arquitetura registradas com contexto, alternativas e consequência. O porquê sobrevive a quem escreveu.",
  },
  {
    code: "03",
    title: "Gate, não esperança",
    body: "Cada onda de entrega passa por testes unitários, de integração, cenários de RLS e E2E. Se o gate falha, nada sobe.",
  },
  {
    code: "04",
    title: "Uma ida ao banco por tela",
    body: "Performance é regra medida, não ajuste fino no fim: uma leitura por tela, uma ação e uma resposta, cache só do que se repete.",
  },
  {
    code: "05",
    title: "Silêncio é métrica",
    body: "Monitoramento bom não grita. Chamado só para o que não se resolveu sozinho; estado conhecido não é erro.",
  },
  {
    code: "06",
    title: "LLM com rede de proteção",
    body: "Saídas com JSON Schema estrito, retry, modo simulado e fallback determinístico onde o modelo erra.",
  },
];

export const securityLayers = [
  { title: "Isolamento por linha", detail: "RLS no Supabase com 210 cenários testados por papel e tenant." },
  { title: "Segredos fora do código", detail: "Cofre de credenciais cifrado com trilha de auditoria; gitleaks no pipeline." },
  { title: "Análise estática", detail: "SAST com Semgrep e SCA de dependências antes do merge." },
  { title: "PII sob controle", detail: "Redação automática de segredos e dados pessoais em pipelines com agentes, conforme a LGPD." },
  { title: "Leak gate", detail: "Nenhum relatório sai se algo sensível escapou — o gate barra a entrega." },
  { title: "Este site", detail: "CSP estrita sem 'unsafe-inline' em scripts, SRI, HSTS e frame-ancestors 'none'." },
];

export const education = {
  course: "Bacharelado em Sistemas de Informação",
  school: "Instituto Federal de Minas Gerais (IFMG) · Ouro Branco",
  period: "fev/2020 – dez/2027 (previsão)",
  thesis:
    "Governança e Estrutura de Dados como Estratégia de Redução de Custos e Otimização de Análises: Uma Revisão Estruturada da Literatura",
  courses: ["Desenvolvimento Web Full Stack — Trybe", "Databricks Fundamentals — Databricks"],
};

export interface Screen {
  src: string;
  label: string;
}

export interface Showcase {
  slug: string;
  name: string;
  kind: string;
  blurb: string;
  stack: string[];
  note: string;
  desktop: Screen[];
  mobile: Screen[];
}

/**
 * Telas reais, capturadas com scripts/capture-screens.mjs com cada sistema
 * rodando localmente e dados de demonstração. Nenhuma tela veio de produção.
 */
export const showcases: Showcase[] = [
  {
    slug: "destaque",
    name: "Lastro + NutriAgent",
    kind: "No computador, o Lastro · no celular, o NutriAgent",
    blurb:
      "Dois produtos lado a lado: o console de governança de ativos onde a decisão precisa de tela grande, e o app de nutrição com LLM que vive no bolso.",
    stack: ["Next.js", "React", "FastAPI", "Python", "Supabase RLS", "Gemini"],
    note: "dados sintéticos e de demonstração",
    desktop: [
      { src: "/screens/lastro-desktop-panorama.jpg", label: "Lastro · Panorama" },
      { src: "/screens/lastro-desktop-desligamento.jpg", label: "Lastro · Descomissionamento" },
      { src: "/screens/lastro-desktop-ativos.jpg", label: "Lastro · Parque" },
    ],
    mobile: [
      { src: "/screens/nutri-mobile-dashboard.jpg", label: "NutriAgent · Hoje" },
      { src: "/screens/nutri-mobile-diario.jpg", label: "NutriAgent · Diário" },
      { src: "/screens/nutri-mobile-recipes.jpg", label: "NutriAgent · Receitas" },
    ],
  },
  {
    slug: "lastro",
    name: "Lastro",
    kind: "Console SaaS · ITAM e FinOps",
    blurb: "Panorama do parque, esteira de descomissionamento com dossiê e qualidade do dado por campo crítico.",
    stack: ["Next.js", "Python", "Supabase RLS", "Drizzle"],
    note: "protótipo do console · dados sintéticos",
    desktop: [
      { src: "/screens/lastro-desktop-panorama.jpg", label: "Panorama" },
      { src: "/screens/lastro-desktop-desligamento.jpg", label: "Descomissionamento" },
      { src: "/screens/lastro-desktop-ativos.jpg", label: "Parque e qualidade" },
    ],
    mobile: [
      { src: "/screens/lastro-mobile-panorama.jpg", label: "Panorama" },
      { src: "/screens/lastro-mobile-desligamento.jpg", label: "Descomissionamento" },
      { src: "/screens/lastro-mobile-ativos.jpg", label: "Parque e qualidade" },
    ],
  },
  {
    slug: "nutri-agent",
    name: "NutriAgent",
    kind: "App de nutrição com LLM",
    blurb: "Dia alimentar com macros, diário com a tabela TACO e receitas da comunidade. A IA estima o geral e um fallback determinístico cobre os alimentos brasileiros.",
    stack: ["React", "FastAPI", "Gemini", "PostgreSQL"],
    note: "ambiente local · usuária de demonstração",
    desktop: [
      { src: "/screens/nutri-desktop-dashboard.jpg", label: "Hoje" },
      { src: "/screens/nutri-desktop-diario.jpg", label: "Diário alimentar" },
      { src: "/screens/nutri-desktop-recipes.jpg", label: "Receitas" },
      { src: "/screens/nutri-desktop-home.jpg", label: "Landing" },
    ],
    mobile: [
      { src: "/screens/nutri-mobile-dashboard.jpg", label: "Hoje" },
      { src: "/screens/nutri-mobile-diario.jpg", label: "Diário alimentar" },
      { src: "/screens/nutri-mobile-recipes.jpg", label: "Receitas" },
      { src: "/screens/nutri-mobile-home.jpg", label: "Landing" },
    ],
  },
  {
    slug: "chuplec",
    name: "Chuplec",
    kind: "E-commerce · arquitetura hexagonal",
    blurb: "Loja de cervejas com curadoria, vitrine por tipo e checkout com Mercado Pago. Monolito modular com 580 testes.",
    stack: ["Next.js 15", "Prisma", "PostgreSQL", "Playwright"],
    note: "ambiente local · catálogo de demonstração",
    desktop: [
      { src: "/screens/chuplec-desktop-home.jpg", label: "Home" },
      { src: "/screens/chuplec-desktop-vitrine.jpg", label: "Vitrine" },
    ],
    mobile: [
      { src: "/screens/chuplec-mobile-home.jpg", label: "Home" },
      { src: "/screens/chuplec-mobile-vitrine.jpg", label: "Vitrine" },
    ],
  },
];
