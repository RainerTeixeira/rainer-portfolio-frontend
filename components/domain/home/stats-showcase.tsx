/**
 * Stats Showcase Component
 *
 * Seção de estatísticas com números e animações de contagem. Exibe métricas
 * principais (projetos, experiência, clientes, tecnologias) com ícones e
 * gradientes coloridos.
 *
 * @module components/domain/home/stats-showcase
 * @fileoverview Seção de estatísticas com animações
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <StatsShowcase />
 * ```
 *
 * Características:
 * - Cards de estatísticas com ícones
 * - Animações de contagem
 * - Gradientes coloridos por métrica
 * - Efeitos de glow no dark mode
 * - Layout responsivo em grid
 * - Suporte a tema claro/escuro
 */

'use client';

import { Card, CardContent } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { tokens } from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import { Code, Globe, Star, Trophy, Users, Zap } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

/**
 * Estatísticas com gradientes baseados em design tokens
 * Definidas fora do componente para evitar recriação e problemas de hidratação
 * Usando cores primitivas da biblioteca para consistência
 */
const palette = tokens.primitives.color;
const gradient = (from: string, to: string) => `linear-gradient(135deg, ${from}, ${to})`;

const STATS_DATA = [
  {
    icon: Code,
    value: '50K+',
    label: 'Linhas de Código',
    gradient: gradient(palette.cyan['500'], palette.blue['600']),
    iconBg: gradient(palette.cyan['400'], palette.blue['500']),
    glowColor: 'cyan-500',
  },
  {
    icon: Users,
    value: '10+',
    label: 'Projetos Full-Stack',
    gradient: gradient(palette.purple['500'], palette.pink['600']),
    iconBg: gradient(palette.purple['400'], palette.pink['500']),
    glowColor: 'purple-500',
  },
  {
    icon: Star,
    value: '95+',
    label: 'Lighthouse Score',
    gradient: gradient(palette.yellow['500'], palette.orange['600']),
    iconBg: gradient(palette.yellow['400'], palette.orange['500']),
    glowColor: 'amber-500',
  },
  {
    icon: Trophy,
    value: '200+',
    label: 'Componentes',
    gradient: gradient(palette.green['500'], palette.emerald['600']),
    iconBg: gradient(palette.green['400'], palette.emerald['500']),
    glowColor: 'green-500',
  },
  {
    icon: Zap,
    value: '< 2s',
    label: 'Load Time',
    gradient: gradient(palette.orange['500'], palette.red['600']),
    iconBg: gradient(palette.orange['400'], palette.red['500']),
    glowColor: 'orange-500',
  },
  {
    icon: Globe,
    value: '20+',
    label: 'Tecnologias',
    gradient: gradient(palette.pink['500'], palette.purple['600']),
    iconBg: gradient(palette.pink['400'], palette.purple['500']),
    glowColor: 'pink-500',
  },
] as const;

export function StatsShowcase() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Determina se o tema atual é dark mode
   * Durante SSR e primeira renderização, sempre retorna false para evitar hydration mismatch
   * Após montagem, usa o tema resolvido
   */
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: tokens.primitives.spacing['20'],
        paddingBottom: tokens.primitives.spacing['24'],
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: tokens.primitives.breakpoints['7xl'],
          paddingLeft: tokens.primitives.spacing['6'],
          paddingRight: tokens.primitives.spacing['6'],
        }}
      >
        {/* Header com efeito WOW */}
        <div
          className="text-center"
          style={{ marginBottom: tokens.primitives.spacing['16'] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full text-white font-bold text-sm shadow-xl"
            style={{
              paddingLeft: tokens.primitives.spacing['6'],
              paddingRight: tokens.primitives.spacing['6'],
              paddingTop: tokens.primitives.spacing['2.5'],
              paddingBottom: tokens.primitives.spacing['2.5'],
              marginBottom: tokens.primitives.spacing['8'],
              background: gradient(
                isDark ? palette.cyan['400'] : palette.blue['500'],
                isDark ? palette.pink['400'] : palette.purple['500']
              ),
            }}
          >
            <Trophy className="w-5 h-5" />
            Métricas de Impacto
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-black bg-clip-text text-transparent"
            style={{
              fontSize: tokens.primitives.typography.fontSize['5xl'],
              marginBottom: tokens.primitives.spacing['6'],
              backgroundImage: gradient(
                isDark ? palette.cyan['400'] : palette.cyan['600'],
                isDark ? palette.pink['400'] : palette.pink['600']
              ),
            }}
          >
            Números que Falam
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto"
            style={{
              fontSize: tokens.primitives.typography.fontSize.lg,
              color: isDark ? palette.gray['300'] : palette.gray['600'],
              maxWidth: '48rem',
              lineHeight: tokens.primitives.typography.lineHeight.relaxed,
            }}
          >
            {'Métricas reais dos projetos que comprovam '}
            <span className="font-bold text-foreground dark:text-cyan-200">
              domínio técnico avançado
            </span>
            {' e capacidade de entregar software de qualidade'}
          </motion.p>
        </div>

        {/* Stats Grid Redesenhado */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          style={{
            gap: tokens.primitives.spacing['6'],
          }}
        >
          {STATS_DATA.map((stat, index) => {
            const Icon = stat.icon;
            // Usar label como key estável para evitar problemas de hidratação
            const statKey = stat.label;
            return (
              <motion.div
                key={statKey}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="group"
              >
                <div className="relative">
                  {/* Brilho de fundo */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-linear-to-br rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500',
                      stat.iconBg
                    )}
                  ></div>

                  {/* Card */}
                  <Card
                    className={cn(
                      'relative bg-card/80 dark:bg-black/60 backdrop-blur-xl',
                      'border border-border/50 dark:border-cyan-400/20',
                      'hover:border-primary dark:hover:border-cyan-400/60',
                      'transition-all duration-500',
                      'hover:shadow-2xl hover:-translate-y-2',
                      'overflow-hidden'
                    )}
                  >
                    {/* Brilho interno */}
                    <div
                      className={cn(
                        'absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                        stat.gradient
                      )}
                    ></div>

                    <CardContent className="p-6 sm:p-8 text-center relative z-10">
                      {/* Ícone com efeito premium */}
                      <div className="relative mb-6">
                        <div
                          className={cn(
                            'absolute inset-0 bg-linear-to-br rounded-2xl blur-md opacity-40',
                            stat.iconBg
                          )}
                        ></div>
                        <div
                          className={cn(
                            'relative inline-flex p-4 rounded-2xl bg-linear-to-br shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300',
                            stat.iconBg
                          )}
                        >
                          <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        </div>
                      </div>

                      {/* Valor */}
                      <div
                        className={cn(
                          'text-4xl sm:text-5xl font-black mb-3 bg-linear-to-r bg-clip-text text-transparent',
                          stat.gradient
                        )}
                      >
                        {stat.value}
                      </div>

                      {/* Label */}
                      <div className="text-sm sm:text-base font-semibold text-muted-foreground dark:text-gray-300 group-hover:text-foreground dark:group-hover:text-white transition-colors">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


