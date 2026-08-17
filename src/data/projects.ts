export type Locale = "pt-BR" | "en";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  /** Ano ou intervalo exibido como metadado do "plano". */
  year: string;
  title: string;
  /** Uma linha, dita como cartaz de filme. */
  tagline: Record<Locale, string>;
  /** 2–3 frases: o que é, e o que foi difícil de verdade. */
  description: Record<Locale, string>;
  /** O detalhe técnico que mostra senioridade. Aparece em destaque. */
  highlight: Record<Locale, string>;
  role: Record<Locale, string>;
  stack: string[];
  links: ProjectLink[];
  /** Usado no gradiente/luz do card. */
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "condostatus",
    year: "2025 — hoje",
    title: "CondoStatus",
    tagline: {
      "pt-BR": "SaaS B2B de gestão de condomínios",
      en: "B2B condo management SaaS",
    },
    description: {
      "pt-BR":
        "Produto próprio, do zero à cobrança recorrente: multi-tenant com RLS no Supabase, convites, permissões por condomínio e billing com trial-before-billing. Rodando em produção com síndicos reais.",
      en: "My own product, from zero to recurring revenue: multi-tenant with Supabase RLS, invites, per-condo permissions and trial-before-billing. Live in production with real building managers.",
    },
    highlight: {
      "pt-BR":
        "Asaas no lugar do Stripe — Pix Automático nativo, boleto recorrente e NFS-e são inegociáveis no B2B brasileiro. Depois, caçada de INP no mobile: 1.472ms rastreados até um listener de mousedown no menu de usuário.",
      en: "Asaas over Stripe — native Pix Automático, recurring boleto and NFS-e are non-negotiable for Brazilian B2B. Then a mobile INP hunt: 1,472ms traced down to a single mousedown listener in the user menu.",
    },
    role: { "pt-BR": "Produto, arquitetura e código", en: "Product, architecture and code" },
    stack: ["Next.js", "Supabase", "PostgreSQL/RLS", "Asaas", "Tailwind", "Vercel"],
    links: [{ label: "condostatus.com.br", href: "https://condostatus.com.br" }],
    accent: "#f97316",
  },
  {
    slug: "candle-cross",
    year: "2026",
    title: "Candle Cross",
    tagline: {
      "pt-BR": "O gráfico do Bitcoin virou pista de moto",
      en: "The Bitcoin chart became a dirt track",
    },
    description: {
      "pt-BR":
        "Jogo de dirt bike no browser onde o terreno é gerado a partir dos candles semanais reais de BTC da Binance. Sem engine: física, colisão e render escritos à mão em JavaScript.",
      en: "A browser dirt-bike game where the terrain is generated from real weekly BTC candles from Binance. No engine: physics, collision and rendering hand-written in JavaScript.",
    },
    highlight: {
      "pt-BR":
        "Spline de Catmull-Rom pra transformar candles em terreno contínuo e dirigível, combo multiplier e detecção de perfect landing. Vanilla JS em vez de Unity: build leve o bastante pros portais de jogos.",
      en: "Catmull-Rom spline turning candles into continuous, rideable terrain, combo multipliers and perfect-landing detection. Vanilla JS instead of Unity: builds light enough for web game portals.",
    },
    role: { "pt-BR": "Game design e engenharia", en: "Game design and engineering" },
    stack: ["Vanilla JS", "Canvas 2D", "Binance API", "Vercel"],
    links: [
      { label: "GitHub", href: "https://github.com/AndreBordignon/dirty-bike-cripto" },
    ],
    accent: "#fdba74",
  },
  {
    slug: "acop",
    year: "2026",
    title: "ACOP",
    tagline: {
      "pt-BR": "Site institucional que existe pra converter filiação",
      en: "An institutional site built to convert memberships",
    },
    description: {
      "pt-BR":
        "Site da Associação de Condomínios do Oeste do Paraná com painel administrativo completo: cadastro de associados e empresas, eventos com RSVP, galeria e aprovação de participantes. Contrato anual.",
      en: "Site for the condo association of western Paraná with a full admin panel: member and company registration, events with RSVP, gallery and attendee approval. Annual contract.",
    },
    highlight: {
      "pt-BR":
        "Formulários com React Hook Form + Zod e teste automatizado em todos eles — é por onde entra a receita do cliente. Painel admin em API routes do Next, Postgres serverless no Neon.",
      en: "Forms with React Hook Form + Zod, automated tests on every one of them — that's where the client's revenue comes in. Admin panel on Next API routes, serverless Postgres on Neon.",
    },
    role: { "pt-BR": "Freelance · full-stack", en: "Freelance · full-stack" },
    stack: ["Next.js", "Neon", "React Hook Form", "Zod", "Tailwind", "Vercel"],
    links: [],
    accent: "#fdba74",
  },
  {
    slug: "crypto-analytics",
    year: "2026",
    title: "Crypto Analytics",
    tagline: {
      "pt-BR": "Meu indicador de trading, portado pro browser",
      en: "My trading indicator, ported to the browser",
    },
    description: {
      "pt-BR":
        "Dashboard de mercado sobre a API Pro da DefiLlama, com a lógica do indicador Smart Trend Predictor X portada de Pine para JavaScript. Funding rate, open interest e klines da Binance no mesmo painel.",
      en: "A market dashboard on top of DefiLlama's Pro API, with the Smart Trend Predictor X indicator logic ported from Pine to JavaScript. Funding rate, open interest and Binance klines in one panel.",
    },
    highlight: {
      "pt-BR":
        "Proxy serverless na frente da API paga — a chave nunca chega no client. O indicador roda no browser sobre os mesmos dados que a exchange serve.",
      en: "A serverless proxy in front of the paid API — the key never reaches the client. The indicator runs in the browser over the same data the exchange serves.",
    },
    role: { "pt-BR": "Projeto próprio", en: "Own project" },
    stack: ["Next.js", "DefiLlama Pro", "Binance API", "Chart.js", "Vercel"],
    links: [],
    accent: "#f97316",
  },
  {
    slug: "cinematic-engine",
    year: "2026",
    title: "Cinematic Engine",
    tagline: {
      "pt-BR": "A engine que renderiza esta página",
      en: "The engine rendering this page",
    },
    description: {
      "pt-BR":
        "Template de sites cinematográficos com engine e skin separadas: tema por CSS variables, página montada a partir de um registry declarativo de seções e uma biblioteca de heróis 3D plugáveis.",
      en: "A cinematic site template with engine and skin fully separated: theming via CSS variables, pages assembled from a declarative section registry, and a library of pluggable 3D heroes.",
    },
    highlight: {
      "pt-BR":
        "Trocar uma linha no brand.ts reskina o site inteiro — cor, fonte e luz do WebGL juntos. Nasceu de um serviço done-for-you, virou o produto que vende os outros.",
      en: "Changing one line in brand.ts reskins the entire site — color, type and WebGL lighting together. Born as a done-for-you service, it became the product that sells the rest.",
    },
    role: { "pt-BR": "Produto e engenharia", en: "Product and engineering" },
    stack: ["Next.js", "GSAP", "Lenis", "React Three Fiber", "Tailwind"],
    links: [],
    accent: "#fdba74",
  },
  {
    slug: "poker-timer",
    year: "2026",
    title: "Poker Tournament Timer",
    tagline: {
      "pt-BR": "Timer de torneio com cara de cassino",
      en: "A tournament clock that feels like a casino floor",
    },
    description: {
      "pt-BR":
        "Gerenciador de torneios de poker com progressão automática de blinds, controles de mesa (play, pause, ajuste rápido de tempo) e alertas visuais. Construído porque a mesa da sexta precisava.",
      en: "A poker tournament manager with automatic blind progression, table controls (play, pause, quick time adjustments) and visual alerts. Built because Friday's home game needed it.",
    },
    highlight: {
      "pt-BR":
        "Estado de torneio inteiro em Zustand, pronto pra persistir — o timer sobrevive a um refresh no meio do nível. Next.js 15 com App Router.",
      en: "The whole tournament state in Zustand, ready to persist — the clock survives a refresh mid-level. Next.js 15 with the App Router.",
    },
    role: { "pt-BR": "Projeto próprio", en: "Own project" },
    stack: ["Next.js 15", "TypeScript", "Zustand", "Tailwind"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/AndreBordignon/poker-tournament-manager",
      },
    ],
    accent: "#f97316",
  },
];
