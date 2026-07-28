import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['pt-BR', 'en'],
  defaultLocale: 'pt-BR',

  // O mercado-alvo é o Brasil: pt-BR mora na raiz (`/servicos`), inglês em `/en`.
  // Também é o que faz o canonical apontar para uma URL 200 em vez de um redirect.
  localePrefix: 'as-needed',

  // Slug traduzido = palavra-chave na URL, que é sinal real de busca.
  pathnames: {
    '/': '/',
    '/servicos': { 'pt-BR': '/servicos', en: '/services' },
    '/servicos/[slug]': { 'pt-BR': '/servicos/[slug]', en: '/services/[slug]' },
    '/cases': { 'pt-BR': '/cases', en: '/case-studies' },
    '/cases/[slug]': { 'pt-BR': '/cases/[slug]', en: '/case-studies/[slug]' },
    '/sobre': { 'pt-BR': '/sobre', en: '/about' },
  },
});

export type Pathname = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
