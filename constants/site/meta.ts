/**
 * Meta Tags & SEO
 *
 * Configurações de SEO, meta tags e Open Graph.
 *
 * @module constants/site/meta
 * @author Rainer Teixeira
 * @version 2.0.0
 */

/**
 * Data da última atualização das políticas do site
 * (Cookies, Privacidade, Termos)
 */
export const POLICIES_LAST_UPDATED = '2025-01-15' as const;

// =============================================================================
// RE-EXPORTS (para manter compatibilidade)
// =============================================================================

export type {
  ContactConfig,
  Email,
  Location,
  Phone,
  WorkingHours,
} from './config';

export { CONTACT_CONFIG } from './config';

// =============================================================================
// SEO E META TAGS
// =============================================================================

import { SITE_CONFIG } from './config';

/**
 * Stack tecnológica (usado para keywords)
 */
const TECHNOLOGIES = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
] as const;

/**
 * Keywords otimizadas para SEO (sem repetições)
 */
export const SEO_KEYWORDS = [
  // Profissão + Localização
  'desenvolvedor full-stack Volta Redonda',
  'desenvolvedor React Next.js Rio de Janeiro',
  'programador TypeScript Brasil',
  'desenvolvedor web RJ',
  'freelancer desenvolvimento full-stack',
  'desenvolvedor React avançado Brasil',
  'programador full stack remoto',

  // Tecnologias Core
  ...TECHNOLOGIES,
  'Next.js 15',

  // Serviços
  'desenvolvimento web completo React',
  'aplicações Next.js TypeScript',
  'dashboard interativo React',
  'sistema autenticação JWT',
  'API REST Node.js',
  'PWA progressive web app',
  'integração APIs externas',
  'frontend responsivo profissional',
  'backend Node.js Fastify',

  // Deploy & Infraestrutura
  'deploy Vercel profissional',
  'CI/CD GitHub Actions',
  'deploy aplicação Next.js',
  'versionamento Git avançado',
  'Docker containerização',
  'deploy automatizado',
  'GitHub portfolio projetos',

  // Metodologias
  'clean code profissional',
  'arquitetura componentizada',
  'código TypeScript type-safe',
  'Git flow profissional',
  'documentação JSDoc completa',
  'testes automatizados',

  // Habilidades
  'React 19 Hooks avançados',
  'TypeScript tipos complexos',
  'state management Zustand',
  'animações Framer Motion',
  'Tailwind CSS design system',
  'Prisma ORM PostgreSQL',

  // Portfolio
  'portfolio desenvolvedor completo',
  'projetos full-stack GitHub',
  'dashboard administrativo React',
  'sistema blog completo',
  'freelancer aplicações web',
  'desenvolvimento sob medida',
] as const;

/**
 * Helper para criar configuração de SEO padrão
 */
function createDefaultSEO() {
  return {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    keywords: [] as readonly string[], // Será preenchido abaixo
    openGraph: {
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      type: 'website' as const,
      siteName: SITE_CONFIG.fullName,
      images: [
        {
          url: `${SITE_CONFIG.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: [`${SITE_CONFIG.url}/og-image.png`],
    },
  };
}

/**
 * Configuração padrão de SEO
 */
export const DEFAULT_SEO = {
  ...createDefaultSEO(),
  keywords: SEO_KEYWORDS,
} as const;
