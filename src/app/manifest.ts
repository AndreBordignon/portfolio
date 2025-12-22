import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://andrebordignon.dev'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'André Bordignon - Portfólio | Desenvolvedor Front-End',
    short_name: 'André Bordignon',
    description: 'Desenvolvedor Front-End especializado em React, React Native e Node.js com 9+ anos de experiência',
    start_url: '/',
    display: 'standalone',
    background_color: '#1c1917',
    theme_color: '#f97316',
    icons: [
      {
        src: '/andre-bordignon.jpg',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
  }
}

