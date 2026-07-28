import type { Locale } from "./projects";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type Service = {
  id: string;
  /** Slug por idioma: palavra-chave na URL é sinal de busca real. */
  slug: Record<Locale, string>;
  title: LocalizedText;
  /** Rótulo curto para navegação e breadcrumb. */
  navLabel: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  /** Frase auto-contida de abertura — a que uma IA consegue citar sozinha. */
  lede: LocalizedText;
  intro: LocalizedText;
  /** H2 em forma de pergunta: é como as pessoas perguntam para uma IA. */
  blocks: { heading: LocalizedText; body: LocalizedText }[];
  deliverables: LocalizedList;
  stack: string[];
  faq: { question: LocalizedText; answer: LocalizedText }[];
  /** Slugs de projetos que servem de prova. */
  relatedCases: string[];
};

export const services: Service[] = [
  {
    id: "freelance",
    slug: {
      "pt-BR": "programador-freelance",
      en: "freelance-developer",
    },
    title: {
      "pt-BR": "Programador freelance",
      en: "Freelance developer",
    },
    navLabel: { "pt-BR": "Programador freelance", en: "Freelance developer" },
    seoTitle: {
      "pt-BR": "Programador freelance em Brasília — React, Next.js e React Native",
      en: "Freelance developer in Brazil — React, Next.js and React Native",
    },
    seoDescription: {
      "pt-BR":
        "Programador freelance com 9 anos de experiência. Sites, sistemas web e aplicativos mobile sob medida em React, Next.js e React Native. Baseado em Brasília, atendo todo o Brasil remotamente.",
      en: "Freelance developer with 9 years of experience. Custom websites, web systems and mobile apps in React, Next.js and React Native. Based in Brasília, working remotely across Brazil.",
    },
    lede: {
      "pt-BR":
        "André Bordignon é um programador freelance brasileiro que constrói sites, sistemas web e aplicativos mobile sob medida — sozinho, do primeiro commit até o software rodando em produção com cliente pagando.",
      en: "André Bordignon is a Brazilian freelance developer who builds custom websites, web systems and mobile apps — solo, from the first commit to software running in production with paying customers.",
    },
    intro: {
      "pt-BR":
        "Não sou agência e não terceirizo. Você fala com quem escreve o código, o que significa decisão técnica rápida e nenhuma camada de gerente entre o problema e a solução. Trabalho com contrato de escopo fechado ou por período, remoto para todo o Brasil, com reuniões em horário comercial de Brasília.",
      en: "I'm not an agency and I don't subcontract. You talk to the person writing the code, which means fast technical decisions and no layer of account managers between the problem and the fix. I work on fixed-scope contracts or retainers, remotely across Brazil, with meetings on Brasília business hours.",
    },
    blocks: [
      {
        heading: {
          "pt-BR": "O que um programador freelance faz que uma agência não faz?",
          en: "What does a freelance developer do that an agency doesn't?",
        },
        body: {
          "pt-BR":
            "Assume o problema inteiro. Numa agência, o orçamento é dividido entre atendimento, design, desenvolvimento e gestão — e o desenvolvedor recebe um escopo já traduzido, geralmente errado. Trabalhando direto, o que você paga vira código, e quem decide a arquitetura é quem vai manter ela. Em contrapartida, um freelancer não escala infinitamente: eu pego poucos projetos por vez, e digo não quando não caibo no prazo.",
          en: "They own the whole problem. In an agency the budget is split across account management, design, development and coordination — and the developer receives a scope that has already been translated, usually badly. Working directly, what you pay turns into code, and whoever decides the architecture is the person who will maintain it. The trade-off: a freelancer doesn't scale infinitely. I take few projects at a time and say no when I don't fit the deadline.",
        },
      },
      {
        heading: {
          "pt-BR": "Que tipo de projeto eu pego?",
          en: "What kind of projects do I take?",
        },
        body: {
          "pt-BR":
            "Produto digital com lógica de verdade: SaaS com assinatura e multi-tenant, site institucional com painel administrativo, aplicativo React Native em produção, landing page de alto padrão. O denominador comum é precisar de alguém que pense no problema, não que preencha template. Se o que você precisa é um site de cinco páginas sem regra de negócio, um construtor visual sai mais barato — e eu digo isso na primeira conversa.",
          en: "Digital products with real logic: subscription multi-tenant SaaS, institutional sites with an admin panel, production React Native apps, high-end landing pages. The common thread is needing someone to think about the problem, not fill in a template. If what you need is a five-page brochure site with no business rules, a website builder is cheaper — and I'll tell you that in the first conversation.",
        },
      },
      {
        heading: {
          "pt-BR": "Como é trabalhar comigo, na prática?",
          en: "What is it actually like to work with me?",
        },
        body: {
          "pt-BR":
            "Começa com uma conversa de 30 minutos sobre o problema, não sobre tecnologia. Sai dali um escopo escrito com o que entra, o que não entra e o prazo. Durante o projeto você acompanha em ambiente de preview a cada entrega — nada de sumir por três semanas e reaparecer com um ZIP. Toda decisão técnica que muda o rumo fica registrada por escrito, porque daqui a um ano alguém vai perguntar por quê.",
          en: "It starts with a 30-minute conversation about the problem, not about technology. Out of it comes a written scope: what's in, what's out, and the deadline. During the project you follow along in a preview environment on every delivery — no disappearing for three weeks and coming back with a ZIP. Every technical decision that changes direction gets written down, because a year from now someone will ask why.",
        },
      },
      {
        heading: {
          "pt-BR": "E depois que entrega?",
          en: "And after delivery?",
        },
        body: {
          "pt-BR":
            "O código é seu, no seu repositório, com as chaves nas suas contas. Ofereço manutenção mensal para quem quer alguém de plantão, mas não prendo ninguém: um projeto entregue tem que conseguir sobreviver sem mim, e é assim que eu escrevo. Documentação de arquitetura e decisões vai junto na entrega.",
          en: "The code is yours, in your repository, with the keys in your own accounts. I offer monthly maintenance for those who want someone on call, but nobody is locked in: a delivered project has to survive without me, and that's how I write it. Architecture and decision documentation ships with the project.",
        },
      },
    ],
    deliverables: {
      "pt-BR": [
        "Sites e landing pages sob medida",
        "SaaS multi-tenant com assinatura e cobrança recorrente",
        "Painéis administrativos e áreas logadas",
        "Aplicativos iOS e Android com React Native e Expo",
        "Integrações de pagamento brasileiras (Pix, boleto, NFS-e)",
        "Auditoria e correção de performance (Core Web Vitals)",
        "Modernização de projetos legados sem parar a entrega",
      ],
      en: [
        "Custom websites and landing pages",
        "Multi-tenant SaaS with subscriptions and recurring billing",
        "Admin panels and authenticated areas",
        "iOS and Android apps with React Native and Expo",
        "Brazilian payment integrations (Pix, boleto, e-invoicing)",
        "Performance audits and fixes (Core Web Vitals)",
        "Legacy modernization without stopping delivery",
      ],
    },
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Expo",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "Tailwind CSS",
      "Vercel",
    ],
    faq: [
      {
        question: {
          "pt-BR": "Quanto custa contratar um programador freelance?",
          en: "How much does hiring a freelance developer cost?",
        },
        answer: {
          "pt-BR":
            "Depende do escopo, e eu só passo número depois de entender o problema — orçamento antes disso é chute. Trabalho de duas formas: escopo fechado, com valor e prazo definidos antes de começar, ou contratação por período mensal para quem tem demanda contínua. Na primeira conversa eu digo qual dos dois faz sentido no seu caso, e se o seu orçamento não comporta, eu falo na hora em vez de enrolar.",
          en: "It depends on scope, and I only quote after understanding the problem — anything before that is guesswork. I work two ways: fixed scope, with price and deadline agreed up front, or a monthly retainer for continuous demand. In the first conversation I'll tell you which one fits, and if your budget doesn't cover it, I say so right away instead of stalling.",
        },
      },
      {
        question: {
          "pt-BR": "Você atende fora de Brasília?",
          en: "Do you work outside Brasília?",
        },
        answer: {
          "pt-BR":
            "Sim. Sou baseado em Brasília e atendo todo o Brasil remotamente — a maior parte dos meus clientes nunca me viu pessoalmente. Reuniões por chamada de vídeo em horário comercial de Brasília (UTC-3), e comunicação assíncrona no resto do tempo.",
          en: "Yes. I'm based in Brasília and work remotely across Brazil — most of my clients have never met me in person. Video calls during Brasília business hours (UTC-3), and asynchronous communication the rest of the time.",
        },
      },
      {
        question: {
          "pt-BR": "Quanto tempo leva um projeto?",
          en: "How long does a project take?",
        },
        answer: {
          "pt-BR":
            "Uma landing page sob medida costuma levar de duas a três semanas. Um site institucional com painel administrativo, de seis a dez semanas. Um SaaS com assinatura e multi-tenant não sai em menos de três meses até a primeira versão cobrável. Esses números são de projetos que eu realmente entreguei, não estimativa otimista de proposta comercial.",
          en: "A custom landing page usually takes two to three weeks. An institutional site with an admin panel, six to ten weeks. A multi-tenant SaaS with subscriptions doesn't reach a first billable version in under three months. These numbers come from projects I actually delivered, not from optimistic sales estimates.",
        },
      },
      {
        question: {
          "pt-BR": "O código fica comigo?",
          en: "Do I own the code?",
        },
        answer: {
          "pt-BR":
            "Sim. Repositório no seu GitHub, deploy na sua conta da Vercel, banco na sua conta. Você não fica refém de mim nem de plataforma proprietária. Se um dia quiser trocar de desenvolvedor, leva tudo.",
          en: "Yes. Repository on your GitHub, deploy on your Vercel account, database on your account. You're not held hostage by me or by a proprietary platform. If one day you want to switch developers, you take everything with you.",
        },
      },
      {
        question: {
          "pt-BR": "Você faz o design também?",
          en: "Do you do the design too?",
        },
        answer: {
          "pt-BR":
            "Faço, e é parte do que me diferencia — os sites que eu entrego têm direção de arte de verdade, não template. Se você já tem identidade visual ou um designer, trabalho a partir do que existe. Se não tem, eu desenho.",
          en: "I do, and it's part of what sets me apart — the sites I deliver have real art direction, not templates. If you already have a brand or a designer, I work from what exists. If you don't, I design it.",
        },
      },
    ],
    relatedCases: ["condostatus", "acop", "ciss"],
  },

  {
    id: "cinematic",
    slug: {
      "pt-BR": "sites-cinematograficos",
      en: "cinematic-websites",
    },
    title: {
      "pt-BR": "Sites cinematográficos",
      en: "Cinematic websites",
    },
    navLabel: { "pt-BR": "Sites cinematográficos", en: "Cinematic websites" },
    seoTitle: {
      "pt-BR": "Sites cinematográficos e landing pages de alto padrão sob medida",
      en: "Cinematic websites and high-end landing pages, custom built",
    },
    seoDescription: {
      "pt-BR":
        "Sites com scroll animado, 3D em WebGL e direção de arte — nível Awwwards, sem sacrificar performance nem acessibilidade. Construídos sob medida em Next.js, GSAP e React Three Fiber.",
      en: "Websites with scroll-driven animation, WebGL 3D and real art direction — Awwwards level, without sacrificing performance or accessibility. Custom built with Next.js, GSAP and React Three Fiber.",
    },
    lede: {
      "pt-BR":
        "Site cinematográfico é um site em que o scroll dirige a atenção como uma câmera dirige um plano: cada seção é uma cena, o movimento tem peso e intenção, e a página conta uma história em vez de listar informação.",
      en: "A cinematic website is one where scrolling directs attention the way a camera directs a shot: each section is a scene, motion has weight and intent, and the page tells a story instead of listing information.",
    },
    intro: {
      "pt-BR":
        "A página que você está lendo agora foi construída assim — e é o argumento mais honesto que eu tenho. Role a página inicial deste site e veja o que acontece com as partículas: aquilo é WebGL amarrado ao scroll, rodando a 60fps, sem travar o celular e degradando com elegância para quem pediu menos movimento no sistema.",
      en: "The page you're reading was built this way — and it's the most honest argument I have. Scroll this site's home page and watch what happens to the particles: that's WebGL tied to the scroll, running at 60fps, without choking phones, and degrading gracefully for anyone who asked their system for less motion.",
    },
    blocks: [
      {
        heading: {
          "pt-BR": "O que torna um site 'cinematográfico'?",
          en: "What makes a website 'cinematic'?",
        },
        body: {
          "pt-BR":
            "Não é quantidade de efeito — é direção. Sites premiados quase sempre têm um único golpe de mestre e o resto sóbrio o bastante para ele respirar. O que separa cinema de template é peso no movimento (easing próprio, inércia, antecipação), ritmo entre momentos densos e silêncios, tipografia em escala editorial e uma paleta apertada com direção de luz consistente entre o HTML e o 3D. Efeito empilhado sem hierarquia parece demo de biblioteca, não produto.",
          en: "It isn't the amount of effects — it's direction. Award-winning sites almost always have a single masterstroke and keep everything else sober enough to let it breathe. What separates cinema from template is weight in the motion (custom easing, inertia, anticipation), rhythm between dense moments and silence, editorial-scale typography, and a tight palette with consistent lighting direction across HTML and 3D. Effects piled up without hierarchy look like a library demo, not a product.",
        },
      },
      {
        heading: {
          "pt-BR": "Isso não deixa o site lento?",
          en: "Doesn't that make the site slow?",
        },
        body: {
          "pt-BR":
            "Deixa, quando é mal feito — e é assim que morre a maioria das tentativas. Eu trabalho com orçamento de performance definido antes da primeira linha: LCP abaixo de 2,5s, 60fps no scroll, nada de animar propriedade cara, WebGL carregado sob demanda e pausado quando sai da tela. No site que você está lendo, o three.js inteiro fica num chunk separado que só baixa depois do primeiro paint.",
          en: "It does when it's done badly — and that's how most attempts die. I work with a performance budget defined before the first line of code: LCP under 2.5s, 60fps while scrolling, no animating expensive properties, WebGL loaded on demand and paused when off screen. On the site you're reading, all of three.js sits in a separate chunk that only downloads after the first paint.",
        },
      },
      {
        heading: {
          "pt-BR": "E quem não pode ou não quer ver animação?",
          en: "What about people who can't or don't want animation?",
        },
        body: {
          "pt-BR":
            "O conteúdo continua lá. Todo site que eu entrego é construído em camadas: o HTML semântico funciona sozinho, com JavaScript desligado, e a animação é melhoria progressiva por cima. Quem tem 'reduzir movimento' ativado no sistema recebe a página sem o movimento, sem layout quebrado. Isso não é só acessibilidade — é também o que faz o Google conseguir ler a página.",
          en: "The content is still there. Every site I deliver is built in layers: semantic HTML works on its own with JavaScript disabled, and animation is progressive enhancement on top. Anyone with 'reduce motion' enabled gets the page without the motion and without a broken layout. This isn't only accessibility — it's also what lets Google read the page.",
        },
      },
      {
        heading: {
          "pt-BR": "Para quem isso vale a pena?",
          en: "Who is this worth it for?",
        },
        body: {
          "pt-BR":
            "Para quem vende algo em que percepção de qualidade faz parte do preço: lançamento de produto, marca de alto padrão, portfólio de estúdio, captação de investimento. Se o objetivo é converter tráfego pago no menor custo possível, uma landing simples e rápida ganha — e eu digo isso antes de você gastar.",
          en: "For anyone selling something where perceived quality is part of the price: a product launch, a premium brand, a studio portfolio, a fundraising deck's companion site. If the goal is converting paid traffic at the lowest possible cost, a simple fast landing page wins — and I'll say so before you spend.",
        },
      },
    ],
    deliverables: {
      "pt-BR": [
        "Direção de arte e sistema visual (tipografia, paleta, luz)",
        "Scroll suave com Lenis e narrativa dirigida por GSAP ScrollTrigger",
        "Cena 3D em WebGL amarrada ao scroll, com fallback no mobile",
        "Reveals tipográficos, cursor custom e microinterações",
        "Orçamento de performance e acessibilidade verificados na entrega",
        "SEO técnico: metadata, dados estruturados e conteúdo legível sem JS",
      ],
      en: [
        "Art direction and visual system (typography, palette, lighting)",
        "Smooth scroll with Lenis and a narrative driven by GSAP ScrollTrigger",
        "Scroll-tied WebGL 3D scene, with a mobile fallback",
        "Typographic reveals, custom cursor and microinteractions",
        "Performance and accessibility budgets verified on delivery",
        "Technical SEO: metadata, structured data and content readable without JS",
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "GSAP ScrollTrigger",
      "Lenis",
      "React Three Fiber",
      "three.js",
      "GLSL",
      "Tailwind CSS",
      "Vercel",
    ],
    faq: [
      {
        question: {
          "pt-BR": "Quanto tempo leva um site cinematográfico?",
          en: "How long does a cinematic website take?",
        },
        answer: {
          "pt-BR":
            "De duas a quatro semanas para uma página única com uma cena 3D, contando direção de arte. Sites com várias páginas e mais de uma cena passam disso. Boa parte do prazo vai em decisão visual, não em código — quanto mais claro estiver o que a marca é, mais rápido anda.",
          en: "Two to four weeks for a single page with one 3D scene, art direction included. Multi-page sites with more than one scene take longer. A good part of the timeline goes into visual decisions, not code — the clearer the brand already is, the faster it moves.",
        },
      },
      {
        question: {
          "pt-BR": "Funciona no celular?",
          en: "Does it work on mobile?",
        },
        answer: {
          "pt-BR":
            "Funciona, com uma versão pensada para o celular e não apenas encolhida. Scroll com trava e cena 3D pesada engasgam em aparelho mediano, então o mobile recebe menos partículas, sem seção travada e com animação mais curta. É decisão de projeto, não acidente.",
          en: "It does, with a version designed for mobile rather than just shrunk down. Pinned scroll and heavy 3D scenes choke mid-range phones, so mobile gets fewer particles, no pinned sections and shorter animations. That's a design decision, not an accident.",
        },
      },
      {
        question: {
          "pt-BR": "Preciso ter identidade visual pronta?",
          en: "Do I need an existing brand identity?",
        },
        answer: {
          "pt-BR":
            "Não. Se você já tem, eu trabalho a partir dela. Se não tem, a direção de arte faz parte do projeto — paleta, tipografia e direção de luz são decididas junto com você antes de qualquer animação.",
          en: "No. If you have one, I work from it. If you don't, art direction is part of the project — palette, typography and lighting direction are decided with you before any animation happens.",
        },
      },
      {
        question: {
          "pt-BR": "Dá para aplicar isso num site que já existe?",
          en: "Can this be applied to an existing site?",
        },
        answer: {
          "pt-BR":
            "Dá, e frequentemente é o caminho mais barato. A arquitetura em camadas foi feita para isso: o conteúdo e as rotas continuam, e o movimento entra por cima, camada por camada, sem reescrever o site inteiro.",
          en: "Yes, and it's often the cheaper path. The layered architecture exists for this: content and routes stay, and motion goes on top, layer by layer, without rewriting the whole site.",
        },
      },
    ],
    relatedCases: ["cinematic-engine", "candle-cross", "acop"],
  },
];

export function getService(id: string) {
  return services.find((s) => s.id === id);
}

export function getServiceBySlug(locale: Locale, slug: string) {
  return services.find((s) => s.slug[locale] === slug);
}
