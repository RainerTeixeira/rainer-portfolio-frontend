/**
 * Author Card Component
 *
 * Componente de card do autor para exibição de informações sobre o autor do
 * post. Inclui avatar, biografia, role e links sociais (GitHub, LinkedIn,
 * Twitter, Website).
 *
 * @module components/domain/blog/author-card
 * @fileoverview Card de informações do autor do post
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <AuthorCard
 *   name="Rainer Teixeira"
 *   bio="Desenvolvedor Full-Stack..."
 *   avatar="/logo.png"
 *   role="Desenvolvedor Full-Stack"
 *   social={{
 *     github: "https://github.com/rainer",
 *     linkedin: "https://linkedin.com/in/rainer"
 *   }}
 * />
 * ```
 *
 * Características:
 * - Avatar com fallback para iniciais
 * - Bio e role do autor
 * - Links sociais (GitHub, LinkedIn, Twitter, Website)
 * - Design responsivo e acessível
 * - Integração com SITE_CONFIG para valores padrão
 */

'use client';

export const dynamic = 'force-dynamic';

// ============================================================================
// IMPORTS
// ============================================================================

import { Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent, cn } from '@rainersoft/ui';
import { SITE_CONFIG } from '@/constants';
import { GithubIcon, Globe, Linkedin, Twitter } from 'lucide-react';
import * as React from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Configuração de links sociais do autor
 *
 * @interface AuthorSocialLinks
 * @property {string} [github] - URL do perfil GitHub
 * @property {string} [linkedin] - URL do perfil LinkedIn
 * @property {string} [twitter] - URL do perfil Twitter/X
 * @property {string} [website] - URL do website pessoal
 */
interface AuthorSocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

/**
 * Props do componente AuthorCard
 *
 * @interface AuthorCardProps
 * @property {string} [name] - Nome do autor (padrão: "Rainer Teixeira")
 * @property {string} [bio] - Biografia do autor
 * @property {string} [avatar] - URL do avatar do autor
 * @property {string} [role] - Cargo/função do autor
 * @property {AuthorSocialLinks} [social] - Links sociais do autor
 * @property {string} [className] - Classes CSS adicionais
 */
interface AuthorCardProps {
  name?: string;
  bio?: string;
  avatar?: string;
  role?: string;
  social?: AuthorSocialLinks;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Valores padrão do autor
 * @type {Object}
 * @constant
 */
const DEFAULT_AUTHOR = {
  name: 'Rainer Teixeira',
  bio: 'Desenvolvedor Full-Stack com projetos reais em React, Next.js, TypeScript e Node.js. Apaixonado por código limpo, arquitetura bem pensada e tecnologias modernas.',
  avatar: '/logo.png',
  role: 'Desenvolvedor Full-Stack | Portfolio Comprovado',
} as const;

/**
 * Máximo de caracteres para iniciais do avatar
 * @type {number}
 * @constant
 */
const MAX_AVATAR_INITIALS = 2;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * AuthorCard Component
 *
 * Renderiza card de informações do autor com avatar,
 * biografia, role e links sociais. Integrado com SITE_CONFIG para valores
 * padrão.
 *
 * @component
 * @param {AuthorCardProps} props - Propriedades do card
 * @returns {JSX.Element} Card do autor renderizado
 *
 * @remarks
 * Este componente utiliza:
 * - SITE_CONFIG para valores padrão de links sociais
 * - Avatar component com fallback para iniciais
 * - Design system com Tailwind CSS
 * - Acessibilidade WCAG AA compliant
 *
 * @see {@link SITE_CONFIG} Configurações centralizadas do site
 */
export function AuthorCard({
  name = DEFAULT_AUTHOR.name,
  bio = DEFAULT_AUTHOR.bio,
  avatar = DEFAULT_AUTHOR.avatar,
  role = DEFAULT_AUTHOR.role,
  social = {
    github: SITE_CONFIG.github,
    linkedin: SITE_CONFIG.linkedin,
    website: SITE_CONFIG.url,
  },
  className,
}: AuthorCardProps) {
  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  /**
   * Iniciais do autor para fallback do avatar
   * @type {string}
   */
  const avatarInitials = name
    .split(' ')
    .slice(0, MAX_AVATAR_INITIALS)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  // ========================================================================
  // RENDER HELPERS
  // ========================================================================

  /**
   * Renderiza botão de link social
   *
   * @param {string} url - URL do link social
   * @param {React.ComponentType} Icon - Componente de ícone
   * @param {string} label - Label acessível
   * @returns {JSX.Element | null} Botão renderizado ou null se URL não fornecida
   */
  const renderSocialButton = (
    url: string | undefined,
    Icon: React.ComponentType<{ className?: string }>,
    label: string
  ): React.JSX.Element | null => {
    if (!url) return null;

    return (
      <Button variant="ghost" size="sm" className="gap-2" asChild>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} de ${name}`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      </Button>
    );
  };

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <Card
      className={cn('dark:bg-black/50 dark:border-cyan-400/20', className)}
      role="complementary"
      aria-labelledby="author-name"
    >
      <CardContent className="p-6">
        <div className="flex gap-4 items-start">
          {/* ================================================================
              AVATAR
              ================================================================ */}

          <Avatar
            className="h-16 w-16 border-2 border-cyan-400/30"
            aria-hidden="true"
          >
            <AvatarImage src={avatar} alt={`Avatar de ${name}`} />
            <AvatarFallback>{avatarInitials}</AvatarFallback>
          </Avatar>

          {/* ================================================================
              AUTHOR INFO
              ================================================================ */}

          <div className="flex-1 space-y-2">
            {/* Nome e Role */}
            <div>
              <h3
                id="author-name"
                className="font-bold text-lg dark:text-cyan-200"
              >
                {name}
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {role}
              </p>
            </div>

            {/* Bio */}
            <p className="text-sm dark:text-gray-300">{bio}</p>

            {/* ================================================================
                SOCIAL LINKS
                ================================================================ */}

            <div
              className="flex items-center gap-2 pt-2"
              role="list"
              aria-label="Links sociais do autor"
            >
              {renderSocialButton(social.github, GithubIcon, 'GitHub')}
              {renderSocialButton(social.linkedin, Linkedin, 'LinkedIn')}
              {renderSocialButton(social.twitter, Twitter, 'Twitter')}
              {renderSocialButton(social.website, Globe, 'Website')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



