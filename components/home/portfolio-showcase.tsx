/**
 * Portfolio Showcase Component
 *
 * Showcase de projetos com cards de projetos em destaque. Exibe projetos com
 * imagens, descrições, tags de tecnologias e links para GitHub e demo.
 *
 * @module components/home/portfolio-showcase
 * @fileoverview Showcase de projetos com design premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <PortfolioShowcase />
 * ```
 *
 * Características:
 * - Grid responsivo de projetos
 * - Cards com imagens e descrições
 * - Tags de tecnologias
 * - Links para GitHub e demo
 * - Animações suaves com Framer Motion
 * - Layout responsivo
 * - Integração com SITE_CONFIG
 */

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_CONFIG } from '@/constants';
import { motion } from 'framer-motion';
import { ArrowRight, Award, ExternalLink, GithubIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function PortfolioShowcase() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Determina se o tema atual é dark mode
   * Só retorna true após montagem para evitar hydration mismatch
   */
  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const projects = [
    {
      title: 'Design Tokens',
      subtitle: '@rainer/design-tokens',
      description:
        'Biblioteca enterprise-grade de design tokens com temas Light & Dark, múltiplos formatos de exportação (Tailwind, CSS Vars, JSON), TypeScript type-safe, Storybook para documentação visual e zero dependencies.',
      image: '/images/b1.png',
      tags: ['TypeScript', 'Design System', 'Storybook', 'NPM'],
      featured: true,
      github: `${SITE_CONFIG.github}/@rainer-design-tokens`,
      demo: undefined,
    },
    {
      title: 'Crypto Dashboard',
      subtitle: 'Real-time Market Analytics',
      description:
        'Dashboard de criptomoedas em tempo real com pipeline ETL completo, backend FastAPI, PostgreSQL, cache Redis, gráficos interativos e comunicação via WebSockets para atualizações instantâneas.',
      image: '/images/b2.png',
      tags: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Redis'],
      featured: true,
      github: `${SITE_CONFIG.github}/crypto-dash`,
      demo: undefined,
    },
    {
      title: 'Financial Planner',
      subtitle: 'Multi Family Office System',
      description:
        'Sistema completo de planejamento financeiro para Multi Family Office com projeções patrimoniais até 2060, gestão de ativos financeiros e imobiliários, movimentações e seguros de vida.',
      image: '/images/b3.png',
      tags: ['Next.js 14', 'Fastify', 'Prisma', 'PostgreSQL'],
      featured: true,
      github: `${SITE_CONFIG.github}/financial-planner-case`,
      demo: undefined,
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            className={`mb-4 ${isDark ? 'bg-linear-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-200' : 'bg-linear-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 text-blue-700'}`}
          >
            <Award className="h-3 w-3 mr-1" />
            Portfolio Real
          </Badge>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold dark:text-cyan-200 dark:font-mono mb-4"
          >
            Projetos que Desenvolvi
          </motion.h2>
          <p className="text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
            Sistemas full-stack complexos e funcionais que comprovam domínio
            técnico real. Código disponível no GitHub.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full dark:bg-black/40 dark:border-cyan-400/20 hover:shadow-xl hover:shadow-cyan-500/10 dark:hover:border-cyan-400/40 transition-all duration-300 overflow-hidden group flex flex-col">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    className={`absolute inset-0 ${isDark ? 'bg-linear-to-t from-black/60 to-transparent' : 'bg-linear-to-t from-gray-900/50 to-transparent'}`}
                  />
                  {project.featured && (
                    <Badge
                      className={`absolute top-4 right-4 ${isDark ? 'bg-linear-to-r from-cyan-500 to-purple-500' : 'bg-linear-to-r from-blue-500 to-purple-500'} text-white border-0 shadow-lg`}
                    >
                      ⭐ Projeto Real
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Title Section */}
                  <div className="mb-3 min-h-14">
                    <h3
                      className="font-bold text-base sm:text-lg mb-1 dark:text-gray-100 group-hover:text-cyan-400 transition-colors leading-tight"
                      title={project.title}
                    >
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p
                        className="text-xs font-mono text-muted-foreground dark:text-gray-500 mb-2"
                        title={project.subtitle}
                      >
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-5 leading-relaxed grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs px-2 py-0.5 dark:border-cyan-400/30 dark:text-cyan-300/80 hover:dark:border-cyan-400/50 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {project.demo && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 dark:border-cyan-400/30"
                        asChild
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Projeto
                        </a>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={project.demo ? 'ghost' : 'outline'}
                      className={
                        project.demo ? '' : 'flex-1 dark:border-cyan-400/30'
                      }
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="h-4 w-4" />
                        {!project.demo && (
                          <span className="ml-2">Ver no GitHub</span>
                        )}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Ver Mais */}
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="dark:border-cyan-400/30 gap-2"
          >
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="h-4 w-4" />
              Ver Mais no GitHub
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
