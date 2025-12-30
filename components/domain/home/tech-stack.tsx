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

import { SKILLS } from '@/components/icons/skills';
import { Badge } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { METRICAS } from '@/constants';
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
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Badge
              className={`${isDark ? 'bg-linear-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-200' : 'bg-linear-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 text-blue-700'}`}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Stack Tecnológico
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold dark:text-cyan-200 dark:font-mono mb-4"
          >
            Tecnologias Dominadas
          </motion.h2>
          <p className="text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
            Stack moderna para desenvolvimento full-stack com foco em
            performance e escalabilidade
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          {/* Carousel Container */}
          <div className="overflow-hidden py-4">
            <motion.div
              className="flex gap-6"
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
                  className="shrink-0 w-[280px] dark:bg-black/30 dark:border-cyan-400/20 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="relative mb-4">
                      <div
                        className={`w-20 h-20 mx-auto rounded-xl bg-linear-to-br ${tech.color} p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <div className="text-white">{tech.icon}</div>
                      </div>
                      {/* Glow Effect */}
                      <div
                        className={`absolute inset-0 w-20 h-20 mx-auto rounded-xl bg-linear-to-br ${tech.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-1 dark:text-gray-100 group-hover:text-cyan-400 transition-colors">
                        {tech.fullName}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs dark:border-cyan-400/30 dark:text-gray-400"
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
        >
          <div>
            <div className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Tecnologias
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              {METRICAS.tecnologiasDominadas} tecnologias dominadas
            </div>
          </div>
          <div className="w-px bg-border dark:bg-cyan-400/20" />
          <div>
            <div className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Experiência
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              {METRICAS.anosExperiencia} anos de experiência
            </div>
          </div>
          <div className="w-px bg-border dark:bg-cyan-400/20" />
          <div>
            <div className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Projetos Completos
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              {METRICAS.projetosOpenSource} projetos open source
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


