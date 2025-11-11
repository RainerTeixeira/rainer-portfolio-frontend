/**
 * About Section Component
 *
 * Seção de apresentação para home page. Exibe card com avatar animado,
 * métricas profissionais, badge de disponibilidade e call-to-action com
 * design moderno.
 *
 * @module components/home/about-section
 * @fileoverview Seção sobre na home page com design premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <AboutSection />
 * ```
 *
 * Características:
 * - Avatar com animação circular
 * - Cards de métricas profissionais
 * - Badge de disponibilidade
 * - Call-to-action para página sobre
 * - Tema dual (light/dark)
 * - Animações de entrada suaves
 * - Layout responsivo
 */

'use client';

// ============================================================================
// React & Hooks
// ============================================================================

import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';

// ============================================================================
// Third-party Libraries
// ============================================================================

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Code,
  Rocket,
  Sparkles,
  Target,
} from 'lucide-react';
import { useTheme } from 'next-themes';

// ============================================================================
// UI Components
// ============================================================================

import { Button } from '@/components/ui/button';

// ============================================================================
// Types
// ============================================================================

/**
 * Tipo de uma métrica profissional
 */
interface ProfessionalMetric {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly value: string;
  readonly label: string;
  readonly gradient: string;
  readonly iconBg: string;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Métricas profissionais exibidas na seção
 */
const PROFESSIONAL_STATS: readonly ProfessionalMetric[] = [
  {
    icon: Target,
    value: '10+',
    label: 'Projetos Full-Stack',
    gradient: 'from-cyan-500 to-blue-600',
    iconBg: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Code,
    value: '50K+',
    label: 'Linhas de Código',
    gradient: 'from-purple-500 to-pink-600',
    iconBg: 'from-purple-400 to-pink-500',
  },
  {
    icon: Rocket,
    value: '20+',
    label: 'Tecnologias',
    gradient: 'from-orange-500 to-amber-600',
    iconBg: 'from-orange-400 to-amber-500',
  },
] as const;

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal da About Section
 *
 * Seção de apresentação com avatar, métricas e CTA.
 * Memoizado para otimização de performance.
 */
export const AboutSection = memo(function AboutSection() {
  // ============================================================================
  // Hooks
  // ============================================================================

  const { resolvedTheme } = useTheme();

  // ============================================================================
  // State
  // ============================================================================

  const [isMounted, setIsMounted] = useState(false);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Previne erro de hidratação
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ============================================================================
  // Computed Values
  // ============================================================================

  const isDarkTheme = isMounted && resolvedTheme === 'dark';

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brilho de fundo */}
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl"></div>

        {/* Header da seção */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full ${isDarkTheme ? 'bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400' : 'bg-linear-to-r from-blue-500 via-purple-500 to-pink-500'} text-white font-bold text-sm mb-8 shadow-xl`}
          >
            <Sparkles className="w-5 h-5" />
            Conheça Meu Trabalho
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-linear-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
          >
            Sobre Mim
          </motion.h2>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 relative">
          {/* Coluna 1: Avatar + Info (2 colunas) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative bg-card/80 dark:bg-black/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-border/50 dark:border-cyan-400/30 shadow-2xl overflow-hidden">
              {/* Brilho de fundo */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>

              <div className="relative z-10 text-center">
                {/* Avatar Premium */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8">
                  {/* Círculo externo animado */}
                  <div
                    className={`absolute inset-0 rounded-full ${isDarkTheme ? 'bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400' : 'bg-linear-to-r from-blue-500 via-purple-500 to-pink-500'} animate-spin-slow opacity-60 blur-md`}
                    aria-hidden="true"
                  />

                  {/* Avatar */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/images/t1.jpg"
                      alt="Rainer Teixeira - Desenvolvedor Full-Stack"
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>

                  {/* Badge de status */}
                  <div
                    className={`absolute -bottom-2 -right-2 w-12 h-12 ${isDarkTheme ? 'bg-linear-to-br from-green-400 to-emerald-500 shadow-green-500/50' : 'bg-linear-to-br from-green-500 to-emerald-600 shadow-green-600/50'} rounded-full flex items-center justify-center shadow-xl border-4 border-background animate-pulse`}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Nome e título */}
                <h3 className="text-2xl sm:text-3xl font-black mb-3 text-foreground dark:text-white">
                  Rainer Teixeira
                </h3>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDarkTheme ? 'bg-linear-to-r from-cyan-500/10 to-purple-500/10 border-cyan-400/30' : 'bg-linear-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30'} border mb-6`}
                >
                  <div
                    className={`w-2 h-2 ${isDarkTheme ? 'bg-green-400 shadow-green-400/50' : 'bg-green-500 shadow-green-500/50'} rounded-full animate-pulse shadow-lg`}
                  ></div>
                  <span
                    className={`text-sm font-bold ${isDarkTheme ? 'text-cyan-300' : 'text-blue-700'}`}
                  >
                    Desenvolvedor Full-Stack
                  </span>
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className={`w-full group/btn ${isDarkTheme ? 'bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 shadow-cyan-500/30 hover:shadow-cyan-500/40' : 'bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-blue-500/30 hover:shadow-blue-500/40'} text-white shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <Link href="/sobre">
                    Ver Perfil Completo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Coluna 2: Stats + Bio (3 colunas) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {PROFESSIONAL_STATS.map((metric, index) => {
                const MetricIcon = metric.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group/stat"
                  >
                    <div className="relative bg-card/80 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-border/50 dark:border-cyan-400/20 hover:border-primary dark:hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden text-center">
                      {/* Brilho de fundo */}
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${metric.gradient} opacity-0 group-hover/stat:opacity-10 transition-opacity duration-500`}
                        aria-hidden="true"
                      />

                      <div className="relative z-10">
                        {/* Ícone */}
                        <div className="relative mb-4">
                          <div
                            className={`absolute inset-0 bg-linear-to-br ${metric.iconBg} rounded-xl blur-md opacity-40`}
                            aria-hidden="true"
                          />
                          <div
                            className={`relative inline-flex p-3 rounded-xl bg-linear-to-br ${metric.iconBg} shadow-lg group-hover/stat:scale-110 group-hover/stat:rotate-6 transition-all duration-300`}
                          >
                            <MetricIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </div>
                        </div>

                        {/* Valor */}
                        <div
                          className={`text-3xl sm:text-4xl font-black mb-2 bg-linear-to-r ${metric.gradient} bg-clip-text text-transparent`}
                        >
                          {metric.value}
                        </div>

                        {/* Label */}
                        <div className="text-xs sm:text-sm font-semibold text-muted-foreground dark:text-gray-300 group-hover/stat:text-foreground dark:group-hover/stat:text-white transition-colors">
                          {metric.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bio Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="relative bg-card/80 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-border/50 dark:border-purple-400/30 shadow-xl overflow-hidden"
            >
              {/* Brilho de fundo */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5 dark:from-purple-400/10 dark:via-pink-400/5 dark:to-cyan-400/10"></div>

              <div className="relative z-10 space-y-4">
                <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 leading-relaxed">
                  <span className="font-bold text-foreground dark:text-cyan-200">
                    Desenvolvedor Full-Stack
                  </span>{' '}
                  especializado em criar aplicações web completas e
                  profissionais. Portfólio comprovado com projetos reais:{' '}
                  <span className="font-semibold text-foreground/90 dark:text-purple-200">
                    portfólio enterprise com PWA, blog, autenticação e dashboard
                  </span>{' '}
                  (este site!), dashboard de criptomoedas com backend NestJS e
                  PostgreSQL, planejador financeiro full-stack e sistemas de
                  controle integrados.
                </p>

                <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 leading-relaxed">
                  Domínio técnico em:{' '}
                  <span className="font-semibold text-foreground/90 dark:text-pink-200">
                    React 19, Next.js 15, TypeScript, Node.js, NestJS,
                    PostgreSQL, Prisma ORM, Docker e CI/CD
                  </span>
                  . Código limpo, arquitetura escalável, documentação completa e{' '}
                  <span className="font-bold text-foreground dark:text-cyan-200">
                    resultados que agregam valor ao negócio
                  </span>
                  .
                </p>

                <div className="pt-4 flex items-center justify-center gap-2 text-sm font-medium">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-cyan-500/5 dark:from-cyan-400/20 dark:to-cyan-400/10 border border-cyan-400/30">
                    <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-foreground dark:text-cyan-300">
                      Lighthouse 95+
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-purple-500/5 dark:from-purple-400/20 dark:to-purple-400/10 border border-purple-400/30">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-foreground dark:text-purple-300">
                      WCAG AA
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
