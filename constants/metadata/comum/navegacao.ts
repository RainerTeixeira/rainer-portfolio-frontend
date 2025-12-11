/**
 * @fileoverview Navegação e IDs de seções
 * @module constants/metadata/comum/navegacao
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * IDs de seções para navegação interna e âncoras.
 * Usado para scroll suave e links internos.
 */

/**
 * IDs das seções da página
 * @constant
 * @description IDs para navegação e scroll
 */
export const SECTION_IDS = {
  HERO: 'hero',
  STATS: 'estatisticas',
  HIGHLIGHTS: 'destaques',
  PORTFOLIO: 'portfolio',
  TECH: 'tecnologias',
  ABOUT: 'sobre',
  TESTIMONIALS: 'depoimentos',
  NEWSLETTER: 'newsletter',
  CTA: 'cta',
  CONTACT: 'contato',
  BLOG: 'blog',
  FAQ: 'faq',
} as const;

/**
 * Menu de navegação principal
 * @constant
 * @description Links do menu principal
 */
export const NAVEGACAO = [
  {
    nome: 'Início',
    href: '/',
    icone: 'Home',
  },
  {
    nome: 'Sobre',
    href: '/sobre',
    icone: 'User',
  },
  {
    nome: 'Blog',
    href: '/blog',
    icone: 'BookOpen',
  },
  {
    nome: 'Contato',
    href: '/contato',
    icone: 'Mail',
  },
] as const;

/**
 * Navegação principal para compatibilidade
 * @constant
 * @description Navegação principal com nome completo
 */
export const NAVIGATION = NAVEGACAO.map(item => ({
  ...item,
  fullName: item.nome,
}));

/**
 * Breadcrumbs para páginas
 * @constant
 * @description Navegação estrutural
 */
export const BREADCRUMBS = {
  home: [
    { label: 'Início', href: '/' },
  ],
  sobre: [
    { label: 'Início', href: '/' },
    { label: 'Sobre', href: '/sobre' },
  ],
  contato: [
    { label: 'Início', href: '/' },
    { label: 'Contato', href: '/contato' },
  ],
  blog: [
    { label: 'Início', href: '/' },
    { label: 'Blog', href: '/blog' },
  ],
  dashboard: [
    { label: 'Início', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  privacidade: [
    { label: 'Início', href: '/' },
    { label: 'Privacidade', href: '/privacidade' },
  ],
  termos: [
    { label: 'Início', href: '/' },
    { label: 'Termos', href: '/termos' },
  ],
  cookies: [
    { label: 'Início', href: '/' },
    { label: 'Cookies', href: '/cookies' },
  ],
} as const;

