import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://andrebordignon.dev'

const localeUrl = (locale: string) =>
  locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`

/**
 * O portfólio é uma página só — as seções são âncoras, não rotas.
 * O sitemap lista apenas as raízes por idioma.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, localeUrl(loc)]),
      ),
    },
  }))
}
