import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/providers/Cursor";
import Preloader from "@/components/chrome/Preloader";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import ContactDock from "@/components/chrome/ContactDock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Serifa editorial: só nos acentos tipográficos e nos números grandes.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
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
    ? "André Bordignon - Desenvolvedor Front-End | React | React Native"
    : "André Bordignon - Front-End Developer | React | React Native";

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

  const messages = await getMessages();

  const isPtBR = locale === "pt-BR";

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
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} grain vignette antialiased`}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="beforeInteractive"
        />

        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
        >
          {isPtBR ? "Pular para o conteúdo" : "Skip to content"}
        </a>

        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <Preloader />
            <Cursor />
            <Header />
            {children}
            <Footer />
            <ContactDock />
          </SmoothScroll>
        </NextIntlClientProvider>

        <GoogleAnalytics gaId="G-EEKP219BC9" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
