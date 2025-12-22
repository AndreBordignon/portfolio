import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import HeaderNavigation from "../components/HeaderNavigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://andrebordignon.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPtBR = locale === "pt-BR";

  const title = isPtBR
    ? "André Bordignon - Desenvolvedor Front-End | React | React Native | Portfólio"
    : "André Bordignon - Front-End Developer | React | React Native | Portfolio";

  const description = isPtBR
    ? "Desenvolvedor Front-End especializado em React, React Native e Node.js com 9+ anos de experiência. Criando experiências digitais incríveis com tecnologias modernas. Veja meus projetos e entre em contato!"
    : "Front-End Developer specialized in React, React Native and Node.js with 9+ years of experience. Creating amazing digital experiences with modern technologies. Check out my projects and get in touch!";

  const keywords = isPtBR
    ? [
        "desenvolvedor front-end",
        "desenvolvedor react",
        "desenvolvedor react native",
        "desenvolvedor javascript",
        "desenvolvedor typescript",
        "desenvolvedor node.js",
        "desenvolvedor web",
        "desenvolvedor mobile",
        "portfólio desenvolvedor",
        "freelancer desenvolvedor",
        "react developer",
        "react native developer",
        "frontend developer",
        "web developer",
        "mobile developer",
        "javascript developer",
        "typescript developer",
        "next.js",
        "tailwind css",
        "redux",
        "graphql",
      ]
    : [
        "front-end developer",
        "react developer",
        "react native developer",
        "javascript developer",
        "typescript developer",
        "node.js developer",
        "web developer",
        "mobile developer",
        "developer portfolio",
        "freelance developer",
        "next.js",
        "tailwind css",
        "redux",
        "graphql",
        "frontend developer",
      ];

  const canonicalUrl = `${baseUrl}/${locale === "pt-BR" ? "" : locale}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "André Bordignon" }],
    creator: "André Bordignon",
    publisher: "André Bordignon",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "pt-BR": `${baseUrl}/pt-BR`,
        en: `${baseUrl}/en`,
        "x-default": baseUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt-BR" ? "pt_BR" : "en_US",
      url: canonicalUrl,
      title,
      description,
      siteName: "André Bordignon - Portfólio",
      images: [
        {
          url: `${baseUrl}/andre-bordignon.jpg`,
          width: 1200,
          height: 630,
          alt: "André Bordignon - Desenvolvedor Front-End",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@andrebordignon",
      images: [`${baseUrl}/andre-bordignon.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const isPtBR = locale === "pt-BR";

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "André Bordignon",
    jobTitle: isPtBR ? "Desenvolvedor Front-End" : "Front-End Developer",
    description: isPtBR
      ? "Desenvolvedor Front-End especializado em React, React Native e Node.js com 9+ anos de experiência"
      : "Front-End Developer specialized in React, React Native and Node.js with 9+ years of experience",
    url: `${baseUrl}/${locale === "pt-BR" ? "" : locale}`,
    image: `${baseUrl}/andre-bordignon.jpg`,
    sameAs: [
      "https://github.com/AndreBordignon",
      "https://linkedin.com/in/andrebordignon/",
    ],
    email: "andre@andrebordignon.dev",
    knowsAbout: [
      "React",
      "React Native",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Next.js",
      "Front-End Development",
      "Web Development",
      "Mobile Development",
    ],
    alumniOf: {
      "@type": "Organization",
      name: isPtBR ? "Desenvolvedor de Software" : "Software Developer",
    },
  };

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="beforeInteractive"
        />
        <NextIntlClientProvider messages={messages}>
          <HeaderNavigation />
          {children}
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-EEKP219BC9" />
        <Analytics />
      </body>
    </html>
  );
}
