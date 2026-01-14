/**
 * Tech Stack Showcase Component
 *
 * Carrossel horizontal de tecnologias com logos e animação suave. Exibe skills
 * e tecnologias dominadas em formato de showcase infinito, integrado com
 * SKILLS do SITE_CONFIG.
 *
 * @module components/domain/home/tech-stack
 * @fileoverview Carrossel de tecnologias com animação infinita
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <TechStackShowcase />
 * ```
 *
 * Características:
 * - Carrossel horizontal infinito
 * - Logos de tecnologias com hover effects
 * - Animações suaves e contínuas
 * - Integração com SKILLS do SITE_CONFIG
 * - Layout responsivo
 * - Suporte a tema claro/escuro
 */

'use client';

export const dynamic = 'force-dynamic';

import { SKILLS } from '@/components/icons/skills';
import { Badge, cn } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { METRICAS } from '@/constants';
import { tokens } from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function TechStackShowcase() {
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

  // Usa SKILLS da constante (com ícones)
  const technologies = SKILLS;

  // Duplicate technologies for infinite scroll effect
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <section className="relative overflow-hidden" style={{
      paddingTop: tokens.primitives.spacing['16'],
      paddingBottom: tokens.primitives.spacing['16']
    }}>
      <div className="mx-auto" style={{
        maxWidth: tokens.primitives.breakpoints['7xl'],
        paddingLeft: tokens.primitives.spacing['6'],
        paddingRight: tokens.primitives.spacing['6']
      }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: tokens.primitives.spacing['12'] }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2"
            style={{ marginBottom: tokens.primitives.spacing['4'] }}
          >
            <Badge
              className={cn(
                'border',
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-200'
                  : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 text-blue-700'
              )}
            >
              <Sparkles className="mr-1" style={{
                width: tokens.primitives.spacing['3'],
                height: tokens.primitives.spacing['3']
              }} />
              Stack Tecnológico
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold mb-4"
            style={{
              fontSize: tokens.primitives.typography.fontSize['3xl'],
              color: isDark ? tokens.primitives.color.cyan['200'] : tokens.primitives.color.gray['900'],
              fontFamily: isDark ? tokens.primitives.typography.fontFamily.mono : tokens.primitives.typography.fontFamily.sans
            }}
          >
            Tecnologias Dominadas
          </motion.h2>
          <p className="mx-auto" style={{
            color: isDark ? tokens.primitives.color.gray['400'] : tokens.primitives.color.gray['600'],
            maxWidth: '32rem'
          }}>
            Stack moderna para desenvolvimento full-stack com foco em
            performance e escalabilidade
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 pointer-events-none" style={{
            width: tokens.primitives.spacing['20'],
            background: `linear-gradient(to right, ${isDark ? tokens.primitives.color.gray['900'] : tokens.primitives.color.white}, ${isDark ? tokens.primitives.color.gray['900'] : tokens.primitives.color.white}80%, transparent)`
          }} />
          <div className="absolute right-0 top-0 bottom-0 pointer-events-none" style={{
            width: tokens.primitives.spacing['20'],
            background: `linear-gradient(to left, ${isDark ? tokens.primitives.color.gray['900'] : tokens.primitives.color.white}, ${isDark ? tokens.primitives.color.gray['900'] : tokens.primitives.color.white}80%, transparent)`
          }} />

          {/* Carousel Container */}
          <div className="overflow-hidden" style={{
            paddingTop: tokens.primitives.spacing['4'],
            paddingBottom: tokens.primitives.spacing['4']
          }}>
            <motion.div
              className="flex"
              style={{ gap: tokens.primitives.spacing['6'] }}
              animate={{
                x: [0, -50 * technologies.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 40,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedTech.map((tech, index) => (
                <Card
                  key={`${tech.fullName}-${index}`}
                  className="shrink-0 group transition-all duration-300"
                  style={{
                    width: '280px',
                    backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : tokens.primitives.color.white,
                    borderColor: isDark ? tokens.primitives.color.cyan['400'] + '30' : tokens.primitives.color.gray['200']
                  }}
                >
                  <CardContent style={{ padding: tokens.primitives.spacing['6'] }}>
                    {/* Icon */}
                    <div className="relative" style={{ marginBottom: tokens.primitives.spacing['4'] }}>
                      <div
                        className="mx-auto rounded-xl p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                        style={{
                          width: tokens.primitives.spacing['20'],
                          height: tokens.primitives.spacing['20'],
                          background: tech.color,
                          marginBottom: tokens.primitives.spacing['4']
                        }}
                      >
                        <div style={{ color: tokens.primitives.color.white }}>{tech.icon}</div>
                      </div>
                      {/* Glow Effect */}
                      <div
                        className="mx-auto rounded-xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-30"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: tokens.primitives.spacing['20'],
                          height: tokens.primitives.spacing['20'],
                          background: tech.color
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="font-bold mb-1 group-hover:text-cyan-400 transition-colors" style={{
                        fontSize: tokens.primitives.typography.fontSize.lg,
                        color: isDark ? tokens.primitives.color.gray['100'] : tokens.primitives.color.gray['900']
                      }}>
                        {tech.fullName}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs border"
                        style={{
                          borderColor: isDark ? tokens.primitives.color.cyan['400'] + '30' : tokens.primitives.color.gray['300'],
                          color: isDark ? tokens.primitives.color.gray['400'] : tokens.primitives.color.gray['600']
                        }}
                      >
                        {tech.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-center"
          style={{ marginTop: tokens.primitives.spacing['12'] }}
        >
          <div>
            <div className="font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" style={{
              fontSize: tokens.primitives.typography.fontSize['3xl']
            }}>
              Tecnologias
            </div>
            <div className="text-sm mt-1" style={{
              color: isDark ? tokens.primitives.color.gray['400'] : tokens.primitives.color.gray['600'],
              marginTop: tokens.primitives.spacing['1']
            }}>
              {METRICAS.tecnologiasDominadas} tecnologias dominadas
            </div>
          </div>
          <div className="w-px" style={{
            backgroundColor: isDark ? tokens.primitives.color.cyan['400'] + '20' : tokens.primitives.color.gray['200']
          }} />
          <div>
            <div className="font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" style={{
              fontSize: tokens.primitives.typography.fontSize['3xl']
            }}>
              Experiência
            </div>
            <div className="text-sm mt-1" style={{
              color: isDark ? tokens.primitives.color.gray['400'] : tokens.primitives.color.gray['600'],
              marginTop: tokens.primitives.spacing['1']
            }}>
              {METRICAS.anosExperiencia} anos de experiência
            </div>
          </div>
          <div className="w-px" style={{
            backgroundColor: isDark ? tokens.primitives.color.cyan['400'] + '20' : tokens.primitives.color.gray['200']
          }} />
          <div>
            <div className="font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" style={{
              fontSize: tokens.primitives.typography.fontSize['3xl']
            }}>
              Projetos Completos
            </div>
            <div className="text-sm mt-1" style={{
              color: isDark ? tokens.primitives.color.gray['400'] : tokens.primitives.color.gray['600'],
              marginTop: tokens.primitives.spacing['1']
            }}>
              {METRICAS.projetosOpenSource} projetos open source
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



