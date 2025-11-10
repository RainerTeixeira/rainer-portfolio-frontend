/**
 * Navigation
 *
 * Configuração de navegação e menu do site.
 *
 * @module constants/site/navigation
 * @author Rainer Teixeira
 * @version 2.0.0
 */

/**
 * Item de navegação do menu principal
 */
export interface NavigationItem {
  fullName: string;
  href: string;
  description: string;
}

/**
 * Navegação principal
 */
export const NAVIGATION: ReadonlyArray<NavigationItem> = [
  {
    fullName: 'Home',
    href: '/',
    description: 'Página inicial com portfólio e apresentação profissional',
  },
  {
    fullName: 'Blog',
    href: '/blog',
    description: 'Artigos técnicos, tutoriais e insights sobre desenvolvimento',
  },
  {
    fullName: 'Sobre',
    href: '/sobre',
    description: 'Experiência profissional, habilidades técnicas e trajetória',
  },
  {
    fullName: 'Contato',
    href: '/contato',
    description: 'Entre em contato para projetos e consultoria técnica',
  },
] as const;
