import { areaServed, baseUrl, person, siteName } from "@/lib/site";
import type { Locale } from "@/data/projects";

/**
 * Grafo de entidades em JSON-LD.
 *
 * Os `@id` são estáveis e referenciados entre si — assim buscador e LLM tratam
 * Person, prática freelance e site como um grafo só, e não como três fatos soltos.
 */

export const ID = {
  person: `${baseUrl}/#person`,
  practice: `${baseUrl}/#practice`,
  website: `${baseUrl}/#website`,
} as const;

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: person.city,
  addressRegion: person.region,
  addressCountry: person.country,
};

export function personSchema(locale: Locale) {
  return {
    "@type": "Person",
    "@id": ID.person,
    name: person.name,
    alternateName: person.legalName,
    jobTitle: person.jobTitle[locale],
    description:
      locale === "pt-BR"
        ? `Programador freelance com ${person.yearsOfExperience} anos de experiência em React, React Native e Next.js. Baseado em Brasília, atende todo o Brasil remotamente.`
        : `Freelance developer with ${person.yearsOfExperience} years of experience in React, React Native and Next.js. Based in Brasília, working remotely across Brazil.`,
    url: baseUrl,
    email: `mailto:${person.email}`,
    telephone: person.phone,
    address: postalAddress,
    sameAs: [...person.sameAs],
    knowsAbout: [...person.knowsAbout],
    knowsLanguage: [
      { "@type": "Language", name: "Portuguese", alternateName: "pt-BR" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    nationality: { "@type": "Country", name: person.countryName },
  };
}

export function practiceSchema(locale: Locale) {
  const isPt = locale === "pt-BR";

  return {
    "@type": "ProfessionalService",
    "@id": ID.practice,
    name: siteName[locale],
    description: isPt
      ? "Desenvolvimento freelance de sites, aplicações web e apps mobile sob medida, com React, Next.js e React Native."
      : "Freelance development of custom websites, web applications and mobile apps with React, Next.js and React Native.",
    url: baseUrl,
    email: `mailto:${person.email}`,
    telephone: person.phone,
    address: postalAddress,
    founder: { "@id": ID.person },
    provider: { "@id": ID.person },
    priceRange: "$$",
    currenciesAccepted: "BRL",
    areaServed: areaServed.map((a) => ({ "@type": a.type, name: a.name })),
    availableChannel: [
      {
        "@type": "ServiceChannel",
        serviceUrl: person.whatsapp,
        name: "WhatsApp",
      },
      {
        "@type": "ServiceChannel",
        serviceUrl: `mailto:${person.email}`,
        name: "E-mail",
      },
    ],
    serviceType: isPt
      ? [
          "Desenvolvimento de sites",
          "Desenvolvimento de aplicativos mobile",
          "Desenvolvimento de SaaS",
          "Landing pages de alto padrão",
        ]
      : [
          "Website development",
          "Mobile app development",
          "SaaS development",
          "High-end landing pages",
        ],
    sameAs: [...person.sameAs],
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: baseUrl,
    name: siteName[locale],
    inLanguage: locale,
    publisher: { "@id": ID.person },
  };
}

/** Página "sobre": diz explicitamente que a página É o perfil da Person. */
export function profilePageSchema(url: string, name: string) {
  return {
    "@type": "ProfilePage",
    url,
    name,
    mainEntity: { "@id": ID.person },
    about: { "@id": ID.person },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
  locale,
}: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
}) {
  return {
    "@type": "Service",
    name,
    description,
    url,
    serviceType: name,
    provider: { "@id": ID.person },
    areaServed: areaServed.map((a) => ({ "@type": a.type, name: a.name })),
    availableLanguage: locale === "pt-BR" ? ["pt-BR", "en"] : ["en", "pt-BR"],
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function caseSchema({
  name,
  description,
  url,
  year,
  keywords,
}: {
  name: string;
  description: string;
  url: string;
  year: string;
  keywords: string[];
}) {
  return {
    "@type": "CreativeWork",
    name,
    description,
    url,
    author: { "@id": ID.person },
    creator: { "@id": ID.person },
    // `year` pode ser "2026" ou "2024 — hoje"; o schema quer só o ano inicial.
    datePublished: year.match(/\d{4}/)?.[0],
    keywords: keywords.join(", "),
    inLanguage: "pt-BR",
  };
}

/** Embrulha as entidades num `@graph` único — um script por página. */
export function graph(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
