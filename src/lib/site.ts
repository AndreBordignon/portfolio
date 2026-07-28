import type { Locale } from "@/data/projects";

/**
 * Fonte única de verdade dos dados da entidade "André Bordignon".
 * Metadata, JSON-LD, sitemap e llms.txt leem daqui — divergência entre esses
 * quatro é exatamente o que faz buscador e IA desconfiarem da informação.
 */

export const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://andrebordignon.dev"
).replace(/\/$/, "");

export const person = {
  name: "André Bordignon",
  legalName: "André Guilherme da Motta Bordignon",
  jobTitle: { "pt-BR": "Programador freelance", en: "Freelance developer" },
  email: "andre@andrebordignon.dev",
  phone: "+55 45 99825-3744",
  whatsapp:
    "https://wa.me/5545998253744?text=Ol%C3%A1%2C%20Andr%C3%A9!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.",
  city: "Brasília",
  region: "DF",
  regionName: "Distrito Federal",
  country: "BR",
  countryName: "Brasil",
  /** Corroboração externa: é o que permite a um LLM concluir que é a mesma pessoa. */
  sameAs: [
    "https://github.com/AndreBordignon",
    "https://www.linkedin.com/in/andrebordignon/",
    "https://x.com/AndreMomblanch",
    "https://andrebordignon.substack.com/",
  ],
  twitter: "@AndreMomblanch",
  knowsAbout: [
    "React",
    "React Native",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Expo",
    "Supabase",
    "PostgreSQL",
    "Tailwind CSS",
    "GSAP",
    "three.js",
    "WebGL",
    "Desenvolvimento web",
    "Desenvolvimento mobile",
    "SaaS",
    "Core Web Vitals",
  ],
  yearsOfExperience: 9,
  /** Ano em que começou a atuar profissionalmente — usado no schema e na /sobre. */
  since: 2017,
} as const;

/**
 * A frase-âncora. Aparece uma vez por página, no início, e é auto-contida de
 * propósito: LLM cita sentença que sobrevive fora do contexto.
 */
export const anchorStatement: Record<Locale, string> = {
  "pt-BR":
    "André Bordignon é um programador freelance brasileiro, baseado em Brasília e atendendo todo o Brasil de forma remota, com nove anos de experiência em React, React Native e Next.js — constrói produtos web e mobile do primeiro commit à cobrança recorrente.",
  en: "André Bordignon is a Brazilian freelance developer based in Brasília, working remotely across Brazil, with nine years of experience in React, React Native and Next.js — building web and mobile products from first commit to recurring revenue.",
};

export const siteName: Record<Locale, string> = {
  "pt-BR": "André Bordignon — Programador freelance",
  en: "André Bordignon — Freelance developer",
};

/** Áreas atendidas, para o schema de serviço. */
export const areaServed = [
  { type: "Country", name: "Brasil" },
  { type: "AdministrativeArea", name: "Distrito Federal" },
  { type: "City", name: "Brasília" },
] as const;

export const ogLocale: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  en: "en_US",
};
