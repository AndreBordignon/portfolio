import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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
import JsonLd from "@/components/seo/JsonLd";
import { graph, personSchema, practiceSchema, websiteSchema } from "@/lib/jsonld";
import { baseUrl, siteName } from "@/lib/site";
import type { Locale } from "@/data/projects";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Só o que é comum a todas as páginas. Título, descrição, canonical e hreflang
 * são responsabilidade de cada `page.tsx`, via `pageMetadata()`.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPtBR = locale === "pt-BR";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: siteName[locale as Locale],
      // As páginas passam só o próprio nome; a marca entra aqui.
      template: `%s | ${isPtBR ? "André Bordignon" : "André Bordignon"}`,
    },
    authors: [{ name: "André Bordignon", url: baseUrl }],
    creator: "André Bordignon",
    publisher: "André Bordignon",
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

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const typedLocale = locale as Locale;
  const isPtBR = locale === "pt-BR";

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} grain vignette antialiased`}
      >
        {/* Entidades do site. Cada página acrescenta o próprio bloco. */}
        <JsonLd
          data={graph(
            personSchema(typedLocale),
            practiceSchema(typedLocale),
            websiteSchema(typedLocale),
          )}
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
