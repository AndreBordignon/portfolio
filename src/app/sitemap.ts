import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://andrebordignon.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', 'about', 'projects', 'contact', 'blog']
  
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate entries for each locale
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = locale === routing.defaultLocale 
        ? `${baseUrl}/${route || ''}` 
        : `${baseUrl}/${locale}/${route || ''}`
      
      sitemapEntries.push({
        url: url.replace(/\/$/, '') || baseUrl,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [
              loc,
              loc === routing.defaultLocale
                ? `${baseUrl}/${route || ''}`
                : `${baseUrl}/${loc}/${route || ''}`
            ])
          ),
        },
      })
    })
  })

  return sitemapEntries
}

