import type { Locale } from "./projects";
import type { LocalizedList, LocalizedText } from "./services";

/**
 * Conteúdo longo de case, por slug de projeto. O resumo curto continua em
 * `projects.ts` (usado na home); aqui mora o que sustenta uma página inteira.
 *
 * Tudo aqui é fato verificável de projeto real — número inventado em portfólio
 * é a coisa mais fácil de desmentir numa reunião.
 */
export type CaseStudy = {
  slug: string;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  /** Frase auto-contida de abertura. */
  lede: LocalizedText;
  challenge: LocalizedText;
  approach: LocalizedText;
  outcome: LocalizedText;
  /** Fatos curtos e checáveis, exibidos como lista. */
  facts: LocalizedList;
  keywords: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "condostatus",
    seoTitle: {
      "pt-BR": "CondoStatus — SaaS de gestão de condomínios feito do zero",
      en: "CondoStatus — condo management SaaS built from scratch",
    },
    seoDescription: {
      "pt-BR":
        "Como construí um SaaS B2B multi-tenant de gestão de condomínios sozinho: Supabase com RLS, cobrança recorrente por Pix e uma caçada de 1.472ms de INP no mobile.",
      en: "How I built a multi-tenant B2B condo management SaaS solo: Supabase with RLS, recurring Pix billing, and a 1,472ms mobile INP hunt.",
    },
    lede: {
      "pt-BR":
        "CondoStatus é um SaaS B2B de gestão de condomínios que eu construí sozinho, do primeiro commit à cobrança recorrente, e que roda em produção com síndicos reais.",
      en: "CondoStatus is a B2B condo management SaaS I built solo, from first commit to recurring revenue, running in production with real building managers.",
    },
    challenge: {
      "pt-BR":
        "Gestão de condomínio no Brasil é um problema de permissão antes de ser um problema de tela: cada síndico enxerga só o próprio condomínio, cada morador só o que lhe diz respeito, e um vazamento entre inquilinos não é bug — é incidente. Somado a isso, o produto precisava cobrar de verdade, e cobrar no Brasil significa Pix, boleto e nota fiscal de serviço, não apenas cartão internacional.",
      en: "Condo management in Brazil is a permissions problem before it's a UI problem: each manager sees only their own building, each resident only what concerns them, and a leak between tenants isn't a bug — it's an incident. On top of that the product had to actually charge money, and charging in Brazil means Pix, boleto and service invoices, not just international cards.",
    },
    approach: {
      "pt-BR":
        "Multi-tenant com Row Level Security no Postgres do Supabase, de modo que o isolamento vive no banco e não na camada de aplicação — mesmo uma consulta escrita errada não atravessa a fronteira do tenant. Para pagamento, escolhi Asaas em vez de Stripe: Pix Automático nativo, boleto recorrente e emissão de NFS-e são inegociáveis no B2B brasileiro, e nenhum gateway internacional resolve os três. O modelo é trial-before-billing, com o estado da assinatura refletido na interface inteira.",
      en: "Multi-tenant with Row Level Security on Supabase's Postgres, so isolation lives in the database and not in the application layer — even a badly written query can't cross the tenant boundary. For payments I chose Asaas over Stripe: native Pix Automático, recurring boleto and Brazilian e-invoicing are non-negotiable in local B2B, and no international gateway covers all three. The model is trial-before-billing, with subscription state reflected across the whole interface.",
    },
    outcome: {
      "pt-BR":
        "O produto está em produção e cobrando. O capítulo mais instrutivo veio depois do lançamento: o INP no mobile estava em 1.472ms nas rotas de dashboard e de condomínio — quase um segundo e meio entre o toque e a resposta. Rastreei até um listener de `mousedown` no menu de usuário, com o agravante de que uma extensão de cripto no navegador estava contaminando os traces de performance do Chrome e me mandando na direção errada. Aprendizado que virou regra: descartar perfil de navegador com extensão antes de acreditar no trace.",
      en: "The product is live and billing. The most instructive chapter came after launch: mobile INP was at 1,472ms on the dashboard and building routes — nearly a second and a half between tap and response. I traced it to a `mousedown` listener in the user menu, with the twist that a crypto browser extension was contaminating Chrome's performance traces and pointing me the wrong way. The lesson became a rule: discard browser profiles with extensions before trusting a trace.",
    },
    facts: {
      "pt-BR": [
        "Multi-tenant com isolamento no banco (RLS), não na aplicação",
        "Asaas escolhido sobre Stripe por Pix Automático, boleto e NFS-e",
        "Modelo trial-before-billing com cancelamento até o fim do período pago",
        "INP mobile de 1.472ms rastreado até um único listener de mousedown",
        "Convites, permissões por condomínio e papéis de síndico e morador",
      ],
      en: [
        "Multi-tenant with isolation in the database (RLS), not the app layer",
        "Asaas chosen over Stripe for Pix Automático, boleto and e-invoicing",
        "Trial-before-billing with access until the end of the paid period",
        "1,472ms mobile INP traced to a single mousedown listener",
        "Invites, per-building permissions, manager and resident roles",
      ],
    },
    keywords: ["SaaS", "Supabase", "Next.js", "multi-tenant", "Pix", "Asaas"],
  },

  {
    slug: "candle-cross",
    seoTitle: {
      "pt-BR": "Candle Cross — o gráfico do Bitcoin virou pista de moto",
      en: "Candle Cross — the Bitcoin chart became a dirt track",
    },
    seoDescription: {
      "pt-BR":
        "Jogo de browser onde o terreno é gerado a partir de candles semanais reais de BTC. Física, colisão e render escritos à mão em JavaScript, sem engine.",
      en: "A browser game where terrain is generated from real weekly BTC candles. Physics, collision and rendering hand-written in JavaScript, no engine.",
    },
    lede: {
      "pt-BR":
        "Candle Cross é um jogo de dirt bike no navegador em que o terreno não é desenhado por ninguém: ele é gerado a partir dos candles semanais reais de Bitcoin da Binance.",
      en: "Candle Cross is a browser dirt-bike game where nobody draws the terrain: it's generated from real weekly Bitcoin candles pulled from Binance.",
    },
    challenge: {
      "pt-BR":
        "Dado de mercado é serrilhado: candles são degraus, e degrau não é pista — uma moto simplesmente trava em cada quina. O desafio era transformar uma série temporal real em terreno contínuo e divertido de pilotar, sem perder a relação com o dado original, e ainda caber no orçamento de peso dos portais de jogos web.",
      en: "Market data is jagged: candles are steps, and steps aren't a track — a bike simply jams on every corner. The challenge was turning a real time series into continuous, fun-to-ride terrain without losing the relationship to the underlying data, and still fitting the size budget of web game portals.",
    },
    approach: {
      "pt-BR":
        "Interpolação por spline de Catmull-Rom sobre os fechamentos, que passa exatamente pelos pontos originais mas entrega curvas suaves entre eles — o gráfico continua sendo o gráfico, e vira pista. Escolhi JavaScript puro em vez de Unity: build de Unity para web pesa demais para Poki e CrazyGames, e um jogo 2D com física simples não justifica uma engine inteira. Física, colisão e render são meus, com todas as constantes centralizadas num único arquivo de configuração para dar balanceamento rápido.",
      en: "Catmull-Rom spline interpolation over the closes, which passes exactly through the original points while producing smooth curves between them — the chart stays the chart, and becomes a track. I chose plain JavaScript over Unity: Unity web builds are too heavy for Poki and CrazyGames, and a 2D game with simple physics doesn't justify a whole engine. Physics, collision and rendering are mine, with every constant centralized in a single config file for fast balancing.",
    },
    outcome: {
      "pt-BR":
        "Versão 0.2 rodando, com multiplicador de combo e detecção de aterrissagem perfeita, controles aéreos no estilo Hill Climb Racing e o pacote leve o bastante para submissão a portal. O projeto virou também a semente visual do meu portfólio: a cena 3D da página inicial deste site usa a mesma ideia de transformar candle em relevo.",
      en: "Version 0.2 is running, with combo multipliers and perfect-landing detection, Hill Climb Racing-style air control, and a package light enough for portal submission. The project also became the visual seed of my portfolio: the 3D scene on this site's home page uses the same idea of turning candles into relief.",
    },
    facts: {
      "pt-BR": [
        "Terreno gerado a partir de candles semanais reais de BTC (Binance)",
        "Spline de Catmull-Rom para transformar degraus em pista dirigível",
        "Vanilla JS em vez de Unity, por peso de build nos portais web",
        "Física, colisão e render escritos à mão, constantes num só arquivo",
        "v0.2 com combo multiplier e detecção de perfect landing",
      ],
      en: [
        "Terrain generated from real weekly BTC candles (Binance)",
        "Catmull-Rom spline turning steps into a rideable track",
        "Vanilla JS instead of Unity, due to web portal build size",
        "Hand-written physics, collision and rendering; constants in one file",
        "v0.2 with combo multipliers and perfect-landing detection",
      ],
    },
    keywords: ["JavaScript", "Canvas", "game", "Binance", "física"],
  },

  {
    slug: "ciss",
    seoTitle: {
      "pt-BR": "CISS — modernizar apps React Native em produção sem parar a esteira",
      en: "CISS — modernizing production React Native apps without stopping delivery",
    },
    seoDescription: {
      "pt-BR":
        "Apps Expo em produção no varejo, atualizados em waves revertíveis, com uma rede de testes Jest de caracterização construída antes de qualquer bump arriscado.",
      en: "Production Expo apps in retail, upgraded in revertible waves, with a Jest characterization test net built before any risky bump.",
    },
    lede: {
      "pt-BR":
        "Na CISS eu desenvolvo e modernizo aplicativos React Native que estão em produção no varejo — o tipo de projeto em que a parte difícil não é escrever a funcionalidade, é atualizar um app vivo sem quebrar quem depende dele todo dia.",
      en: "At CISS I build and modernize React Native apps running in retail production — the kind of project where the hard part isn't shipping a feature, it's upgrading a live app without breaking the people who depend on it daily.",
    },
    challenge: {
      "pt-BR":
        "Um app com dependências muito defasadas, sem nenhum teste automatizado, com as pastas nativas geradas por prebuild (ou seja, mudança nativa só se verifica com build real em dispositivo) e com feature branches continuando a entrar durante a modernização. Atualizar tudo de uma vez seria um pull request impossível de revisar e impossível de reverter.",
      en: "An app with badly outdated dependencies, zero automated tests, native folders generated by prebuild (meaning native changes can only be verified with a real device build), and feature branches still landing during the modernization. Upgrading everything at once would be a pull request impossible to review and impossible to revert.",
    },
    approach: {
      "pt-BR":
        "Modernização em waves: um cluster de dependência por pull request, cada fase mergeável e revertível isoladamente com um único `git revert`, ordenadas por raio de impacto vezes probabilidade de quebra. Antes de qualquer bump arriscado, construí uma rede de testes Jest de caracterização — testes que não descrevem o comportamento ideal, e sim o comportamento atual, para que qualquer desvio apareça. QA manual em build real antes de cada merge, porque em projeto com prebuild o diff de git não conta a história inteira.",
      en: "Modernization in waves: one dependency cluster per pull request, each phase independently mergeable and revertible with a single `git revert`, ordered by blast radius times probability of breakage. Before any risky bump I built a Jest characterization test net — tests that describe current behavior rather than ideal behavior, so any drift shows up. Manual QA on a real build before each merge, because in a prebuild project the git diff doesn't tell the whole story.",
    },
    outcome: {
      "pt-BR":
        "A primeira wave (Jest, alinhamento do SDK, cliente HTTP) foi entregue sem interromper as entregas de produto que continuavam acontecendo em paralelo. Do lado do build nativo, resolvi uma sequência de bloqueios de iOS que costuma consumir dias: conflito do macro `FMT_STRING` da lib `fmt` com o Apple Clang mais novo, resolvido com downgrade controlado de Xcode; falha do ReactCodegen por caminho de `node` não encontrado; e localização do SDK do iphoneos.",
      en: "The first wave (Jest, SDK alignment, HTTP client) shipped without interrupting the product work happening in parallel. On the native side I cleared a sequence of iOS blockers that usually eats days: the `fmt` library's `FMT_STRING` macro conflicting with the newest Apple Clang, solved with a controlled Xcode downgrade; ReactCodegen failing because the `node` binary path wasn't found; and iphoneos SDK location.",
    },
    facts: {
      "pt-BR": [
        "Expo SDK 53, React Native 0.79, React 19, Hermes, New Architecture ligada",
        "Um cluster de dependência por PR, cada fase revertível com um comando",
        "Rede de testes Jest de caracterização criada antes dos bumps arriscados",
        "Conflito de `FMT_STRING` com Apple Clang resolvido por downgrade de Xcode",
        "Pastas nativas gitignored: verificação só com build real via EAS",
      ],
      en: [
        "Expo SDK 53, React Native 0.79, React 19, Hermes, New Architecture on",
        "One dependency cluster per PR, each phase revertible with one command",
        "Jest characterization test net built before the risky bumps",
        "`FMT_STRING` clash with Apple Clang solved by a controlled Xcode downgrade",
        "Native folders gitignored: verification only through real EAS builds",
      ],
    },
    keywords: ["React Native", "Expo", "Jest", "iOS", "modernização"],
  },

  {
    slug: "acop",
    seoTitle: {
      "pt-BR": "ACOP — site institucional com painel administrativo completo",
      en: "ACOP — institutional site with a full admin panel",
    },
    seoDescription: {
      "pt-BR":
        "Site de associação construído para converter visita em filiação: formulários validados e testados, eventos com RSVP e painel administrativo em Next.js com Postgres serverless.",
      en: "An association website built to convert visits into memberships: validated and tested forms, events with RSVP, and a Next.js admin panel on serverless Postgres.",
    },
    lede: {
      "pt-BR":
        "ACOP é o site da Associação de Condomínios do Oeste do Paraná, construído com um objetivo único: transformar visita em filiação — e com o painel administrativo para a equipe tocar tudo sem depender de mim.",
      en: "ACOP is the website of the condominium association of western Paraná, built with a single goal: turning visits into memberships — with an admin panel so the team can run everything without depending on me.",
    },
    challenge: {
      "pt-BR":
        "Site institucional de associação costuma virar folheto parado. Este precisava ser operacional: receber cadastro de associados e de empresas parceiras, publicar eventos com confirmação de presença e controle de lotação, manter galeria de fotos e diretoria atualizadas — tudo editável por gente não técnica, e com o formulário funcionando, porque é literalmente por onde entra a receita do cliente.",
      en: "Association websites usually end up as static brochures. This one had to be operational: accept member and partner-company registrations, publish events with RSVP and capacity control, keep a photo gallery and board members up to date — all editable by non-technical staff, and with the forms actually working, because that's literally where the client's revenue comes in.",
    },
    approach: {
      "pt-BR":
        "Formulários com React Hook Form e validação por Zod, com teste automatizado em todos eles — é o único ponto do site onde uma falha silenciosa custa dinheiro direto. Painel administrativo construído com API routes do próprio Next.js, sem serviço externo de backend, sobre Postgres serverless no Neon para manter o custo fixo perto de zero. Checagem de e-mail e CNPJ duplicados no cadastro, upload de banner e vídeo do YouTube embutido nos eventos.",
      en: "Forms with React Hook Form and Zod validation, with automated tests on every one of them — it's the one place on the site where a silent failure costs money directly. Admin panel built on Next.js API routes, with no external backend service, over serverless Postgres on Neon to keep fixed costs near zero. Duplicate email and tax-ID checks on registration, banner upload and embedded YouTube video for events.",
    },
    outcome: {
      "pt-BR":
        "Contrato anual em vigor desde março de 2026, com o site em produção e a equipe da associação operando o painel sozinha. Ao longo do ano o cliente mudou a campanha de captação — de isenção de doze meses para filiação gratuita — e a troca foi feita em um pull request curto, porque a copy promocional estava isolada em vez de espalhada pelo código.",
      en: "An annual contract running since March 2026, with the site in production and the association's team operating the panel on their own. Over the year the client changed the acquisition campaign — from a twelve-month fee waiver to free membership — and the switch shipped in a short pull request, because the promotional copy was isolated instead of scattered through the code.",
    },
    facts: {
      "pt-BR": [
        "Teste automatizado em todos os formulários de cadastro",
        "Painel administrativo em API routes do Next.js, sem backend externo",
        "Postgres serverless no Neon para custo fixo próximo de zero",
        "Eventos com RSVP, controle de lotação, banner e vídeo embutido",
        "Contrato anual, em produção desde março de 2026",
      ],
      en: [
        "Automated tests on every registration form",
        "Admin panel on Next.js API routes, no external backend",
        "Serverless Postgres on Neon for near-zero fixed cost",
        "Events with RSVP, capacity control, banners and embedded video",
        "Annual contract, in production since March 2026",
      ],
    },
    keywords: ["Next.js", "Neon", "Zod", "React Hook Form", "painel administrativo"],
  },

  {
    slug: "crypto-analytics",
    seoTitle: {
      "pt-BR": "Crypto Analytics — indicador de trading portado para o browser",
      en: "Crypto Analytics — a trading indicator ported to the browser",
    },
    seoDescription: {
      "pt-BR":
        "Dashboard de mercado sobre a API Pro da DefiLlama com um indicador portado de Pine para JavaScript, atrás de um proxy serverless que mantém a chave fora do client.",
      en: "A market dashboard over DefiLlama's Pro API with an indicator ported from Pine to JavaScript, behind a serverless proxy that keeps the key off the client.",
    },
    lede: {
      "pt-BR":
        "Crypto Analytics é um dashboard de mercado que roda no navegador a lógica de um indicador de trading que eu usava no TradingView, portado de Pine Script para JavaScript.",
      en: "Crypto Analytics is a market dashboard that runs, in the browser, the logic of a trading indicator I used on TradingView, ported from Pine Script to JavaScript.",
    },
    challenge: {
      "pt-BR":
        "Indicador de plataforma fechada só existe dentro da plataforma: não dá para cruzar com dados de outra fonte, nem automatizar, nem olhar vários ativos ao mesmo tempo. Além disso, a API de dados que eu precisava é paga — e chave de API paga não pode chegar ao navegador do usuário, por motivos óbvios de custo.",
      en: "An indicator on a closed platform only exists inside that platform: you can't cross it with other data sources, automate it, or watch several assets at once. On top of that, the data API I needed is paid — and a paid API key can't reach the user's browser, for obvious cost reasons.",
    },
    approach: {
      "pt-BR":
        "Portei a lógica do indicador para JavaScript, o que exigiu reproduzir o comportamento de séries do Pine sem as garantias que a plataforma dá de graça. Na frente da API paga fica um proxy serverless: o browser chama a minha rota, a minha rota chama a DefiLlama com a chave que vive apenas no servidor. Somei ao painel os dados públicos da Binance — klines, funding rate e open interest — para ter posicionamento além de preço.",
      en: "I ported the indicator logic to JavaScript, which meant reproducing Pine's series semantics without the guarantees the platform gives for free. In front of the paid API sits a serverless proxy: the browser calls my route, my route calls DefiLlama with a key that only lives on the server. I added Binance's public data — klines, funding rate and open interest — to see positioning and not just price.",
    },
    outcome: {
      "pt-BR":
        "O indicador roda sobre os mesmos dados que a exchange serve, com a chave paga nunca exposta. O padrão de proxy serverless virou algo que eu reaproveito em todo projeto que consome API paga a partir do cliente.",
      en: "The indicator runs over the same data the exchange serves, with the paid key never exposed. The serverless proxy pattern became something I reuse in every project that consumes a paid API from the client.",
    },
    facts: {
      "pt-BR": [
        "Indicador portado de Pine Script para JavaScript",
        "Proxy serverless mantém a chave da API paga fora do navegador",
        "Dados da DefiLlama Pro somados a klines, funding rate e open interest",
        "Deploy na Vercel, sem servidor dedicado",
      ],
      en: [
        "Indicator ported from Pine Script to JavaScript",
        "Serverless proxy keeps the paid API key out of the browser",
        "DefiLlama Pro data combined with klines, funding rate and open interest",
        "Deployed on Vercel, no dedicated server",
      ],
    },
    keywords: ["Next.js", "API", "trading", "DefiLlama", "Binance"],
  },

  {
    slug: "cinematic-engine",
    seoTitle: {
      "pt-BR": "Cinematic Engine — a engine que renderiza este portfólio",
      en: "Cinematic Engine — the engine rendering this portfolio",
    },
    seoDescription: {
      "pt-BR":
        "Template de sites cinematográficos com engine e skin separadas: tema por CSS variables, páginas montadas por registry declarativo e heróis 3D plugáveis.",
      en: "A cinematic site template with engine and skin fully separated: CSS-variable theming, pages assembled from a declarative registry, and pluggable 3D heroes.",
    },
    lede: {
      "pt-BR":
        "Cinematic Engine é o template que eu uso para produzir sites cinematográficos sob medida em dias em vez de semanas, com o núcleo de animação e 3D separado do que muda a cada cliente.",
      en: "Cinematic Engine is the template I use to produce custom cinematic websites in days instead of weeks, with the animation and 3D core separated from whatever changes per client.",
    },
    challenge: {
      "pt-BR":
        "Site cinematográfico dá muito trabalho e quase nada desse trabalho é reaproveitável quando cada projeto é escrito do zero. Ao mesmo tempo, transformar tudo num tema configurável costuma matar exatamente o que fazia o site ser especial. Eu precisava de uma linha que separasse o que é estável do que é autoral.",
      en: "Cinematic sites take a lot of work, and almost none of it is reusable when each project is written from scratch. At the same time, turning everything into a configurable theme usually kills exactly what made the site special. I needed a line separating what is stable from what is authored.",
    },
    approach: {
      "pt-BR":
        "Separação estrita entre engine e skin, com a engine sem nenhum import da pasta de configuração. Três sistemas de personalização: tema por CSS variables, em que trocar um arquivo de marca reskina o site inteiro incluindo a luz da cena WebGL; registry declarativo de seções, em que a página é uma lista de tipo mais variante mais ordem; e uma biblioteca de heróis 3D plugáveis.",
      en: "A strict split between engine and skin, with the engine importing nothing from the config folder. Three customization systems: CSS-variable theming, where swapping one brand file reskins the entire site including the WebGL scene's lighting; a declarative section registry, where a page is a list of type plus variant plus order; and a library of pluggable 3D heroes.",
    },
    outcome: {
      "pt-BR":
        "O primeiro cliente saiu do template, e a experiência já produziu o aprendizado mais valioso: um fork antigo não recebe as cenas novas, e uma variante inexistente falhava silenciosamente em vez de gritar. A engine ganhou tolerância a isso, e cada fork de cliente passou a ser versionado antes de qualquer sincronização.",
      en: "The first client shipped from the template, and the experience produced the most valuable lesson already: an older fork doesn't get the new scenes, and a missing variant failed silently instead of shouting. The engine gained tolerance for that, and every client fork is now versioned before any sync.",
    },
    facts: {
      "pt-BR": [
        "Engine sem nenhum import da configuração — a fronteira é verificável",
        "Tema por CSS variables: um arquivo reskina site e cena 3D juntos",
        "Página montada a partir de um registry declarativo de seções",
        "Heróis 3D plugáveis: monólito, partículas e produto",
      ],
      en: [
        "Engine imports nothing from config — the boundary is verifiable",
        "CSS-variable theming: one file reskins site and 3D scene together",
        "Pages assembled from a declarative section registry",
        "Pluggable 3D heroes: monolith, particles and product",
      ],
    },
    keywords: ["Next.js", "GSAP", "WebGL", "template", "design system"],
  },

  {
    slug: "poker-timer",
    seoTitle: {
      "pt-BR": "Poker Tournament Timer — relógio de torneio com cara de cassino",
      en: "Poker Tournament Timer — a tournament clock with a casino feel",
    },
    seoDescription: {
      "pt-BR":
        "Gerenciador de torneios de poker em Next.js 15 e Zustand, com progressão automática de blinds e estado que sobrevive a um refresh no meio do nível.",
      en: "A poker tournament manager in Next.js 15 and Zustand, with automatic blind progression and state that survives a refresh mid-level.",
    },
    lede: {
      "pt-BR":
        "Poker Tournament Timer é um gerenciador de torneios de poker com progressão automática de blinds, construído porque a mesa de sexta-feira precisava e nenhuma das opções gratuitas prestava.",
      en: "Poker Tournament Timer is a poker tournament manager with automatic blind progression, built because Friday's home game needed one and none of the free options were any good.",
    },
    challenge: {
      "pt-BR":
        "Relógio de torneio parece trivial até você operar um. No meio da mesa, alguém pede mais cinco minutos, o nível precisa voltar, o navegador é atualizado por acidente — e um timer que perde o estado nesse momento acaba com o torneio.",
      en: "A tournament clock looks trivial until you operate one. Mid-game someone asks for five more minutes, the level needs to go back, the browser gets refreshed by accident — and a clock that loses state at that moment ends the tournament.",
    },
    approach: {
      "pt-BR":
        "Todo o estado do torneio em uma store Zustand desenhada para persistência, de modo que o relógio sobrevive a um refresh no meio do nível. Controles pensados para uso com uma mão só na beira da mesa: play, pausa, avançar e voltar nível, e ajuste rápido de tempo. Alertas visuais quando o nível está acabando, e uma direção visual inspirada em cassino, porque o timer fica projetado na parede.",
      en: "The whole tournament state in a Zustand store designed for persistence, so the clock survives a refresh mid-level. Controls built for one-handed use at the edge of the table: play, pause, next and previous level, and quick time adjustments. Visual alerts when a level is about to end, and a casino-inspired visual direction, because the clock ends up projected on a wall.",
    },
    outcome: {
      "pt-BR":
        "Versão 1.0 implementada e em uso, com estrutura de doze níveis de blind pré-configurada e layout que funciona tanto no celular do organizador quanto projetado na parede.",
      en: "Version 1.0 implemented and in use, with a twelve-level blind structure preconfigured and a layout that works both on the organizer's phone and projected on a wall.",
    },
    facts: {
      "pt-BR": [
        "Next.js 15 com App Router e estado em Zustand",
        "Estrutura de doze níveis de blind pré-configurada",
        "Ajuste rápido de tempo e navegação entre níveis durante a partida",
        "Layout responsivo, do celular à projeção na parede",
      ],
      en: [
        "Next.js 15 with the App Router and Zustand state",
        "Twelve-level blind structure preconfigured",
        "Quick time adjustments and level navigation mid-game",
        "Responsive layout, from phone to wall projection",
      ],
    },
    keywords: ["Next.js", "Zustand", "TypeScript", "timer"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function caseTitle(slug: string, locale: Locale) {
  return getCaseStudy(slug)?.seoTitle[locale];
}
