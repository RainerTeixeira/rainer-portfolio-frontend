/**
 * @fileoverview Configuração de SEO e meta tags
 * @module constants/metadata/comum/seo
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Palavras-chave e configurações de SEO para
 * otimização em mecanismos de busca.
 */

import { DESENVOLVEDOR } from './desenvolvedor';

/**
 * Palavras-chave para SEO
 * @constant
 * @description Keywords organizadas por relevância
 */
export const PALAVRAS_CHAVE = {
  principais: [
    'desenvolvedor full-stack',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
  ],
  secundarias: [
    'aplicações web profissionais',
    'dashboards interativos',
    'Progressive Web Apps',
    'APIs REST',
    'performance web',
    'código limpo',
  ],
  longas: [
    'desenvolvedor React Next.js freelancer Brasil',
    'criar dashboard administrativo React TypeScript',
    'desenvolvimento PWA instalável',
    'API REST Node.js escalável',
  ],
} as const;

/**
 * Meta tags padrão
 * @constant
 * @description Configuração base para todas as páginas
 */
export const META_PADRAO = {
  titulo: `${DESENVOLVEDOR.nome} - ${DESENVOLVEDOR.tagline}`,
  descricao: 'Desenvolvedor full-stack especializado em React, Next.js e Node.js. ' +
             'Aplicações web profissionais com performance excepcional.',
  keywords: [...PALAVRAS_CHAVE.principais, ...PALAVRAS_CHAVE.secundarias].join(', '),
  autor: DESENVOLVEDOR.nome,
  idioma: 'pt-BR',
} as const;

/**
 * Open Graph para redes sociais
 * @constant
 * @description Configuração para compartilhamento social
 */
export const OPEN_GRAPH = {
  tipo: 'website',
  idioma: 'pt_BR',
  siteName: `${DESENVOLVEDOR.nome} - Rainer Soft`,
  imagem: '/og-image.png',
  twitter: '@rainerteixeira',
} as const;

/**
 * Configuração complementar de SEO para categoria e classificação do site.
 * Centraliza valores usados em metadata/layout.
 */
export const SEO_CONFIG = {
  category: 'technology',
  classification:
    'Software Development Company, Web Development, Enterprise Solutions',
} as const;

/**
 * Texto ALT padrão para a imagem Open Graph principal.
 */
export const OPEN_GRAPH_IMAGE_ALT =
  `${DESENVOLVEDOR.nome} - Desenvolvedor Full-Stack | ${OPEN_GRAPH.siteName}` as const;

