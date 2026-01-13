/**
 * CTA Section Component
 *
 * Call-to-action final da home com visual premium. Seção de conversão com
 * design impactante, múltiplas ações (contato, currículo) e efeitos visuais
 * animados.
 *
 * @module components/domain/home/cta-section
 * @fileoverview Seção de call-to-action com design premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <CTASection />
 * ```
 *
 * Características:
 * - Card gigante com glassmorphism
 * - Múltiplos botões de ação
 * - Efeitos de brilho animados
 * - Partículas decorativas
 * - Animações suaves com Framer Motion
 * - Layout responsivo
 * - Suporte a tema claro/escuro
 */

'use client';

import { Button } from '@rainersoft/ui';
import { tokens } from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  MessageSquare,
  Rocket,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CTASection() {
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

  const palette = tokens.primitives.color;
  const spacing = tokens.primitives.spacing;
  const gradient = (from: string, to: string) => `linear-gradient(135deg, ${from}, ${to})`;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: spacing['20'],
        paddingBottom: spacing['32'],
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: tokens.primitives.breakpoints['7xl'],
          paddingLeft: spacing['6'],
          paddingRight: spacing['6'],
        }}
      >
        {/* Brilho de fundo gigante */}
        <div
          className="absolute inset-0 blur-3xl"
          style={{
            background: gradient(
              isDark ? palette.cyan['400'] : palette.cyan['500'],
              isDark ? palette.pink['400'] : palette.pink['500']
            ),
            opacity: isDark ? 0.08 : 0.12,
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Card principal gigante */}
          <div
            className="relative bg-card/90 dark:bg-black/70 backdrop-blur-2xl rounded-[32px] border-2 shadow-2xl overflow-hidden"
            style={{
              padding: spacing['12'],
              borderColor: isDark ? palette.cyan['400'] + '4D' : palette.gray['200'],
            }}
          >
            {/* Efeito de brilho animado */}
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                background: gradient(
                  isDark ? palette.cyan['400'] + '1A' : palette.cyan['500'] + '0D',
                  isDark ? palette.pink['400'] + '1A' : palette.pink['500'] + '0D'
                ),
              }}
            ></div>

            {/* Partículas decorativas */}
            <div
              className="absolute top-10 left-10 w-20 h-20 rounded-full blur-2xl animate-pulse"
              style={{
                backgroundColor: isDark ? palette.cyan['400'] + '33' : palette.blue['500'] + '33',
              }}
            ></div>
            <div
              className="absolute bottom-10 right-10 w-32 h-32 rounded-full blur-3xl animate-pulse"
              style={{
                animationDelay: '1s',
                backgroundColor: isDark ? palette.purple['400'] + '33' : palette.purple['500'] + '33',
              }}
              aria-hidden
            ></div>
            <div
              className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full blur-2xl animate-pulse"
              style={{
                animationDelay: '2s',
                backgroundColor: isDark ? palette.pink['400'] + '33' : palette.pink['500'] + '33',
              }}
              aria-hidden
            ></div>

            <div className="relative z-10 text-center">
              {/* Badge de destaque */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full text-white font-bold text-sm shadow-xl"
                style={{
                  paddingLeft: spacing['6'],
                  paddingRight: spacing['6'],
                  paddingTop: spacing['3'],
                  paddingBottom: spacing['3'],
                  marginBottom: spacing['8'],
                  background: gradient(
                    isDark ? palette.green['400'] : palette.green['500'],
                    isDark ? palette.emerald['400'] : palette.green['600']
                  ),
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Disponível para Novos Projetos
              </motion.div>

              {/* Título principal */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-black leading-tight"
                style={{
                  fontSize: tokens.primitives.typography.fontSize['6xl'],
                  marginBottom: spacing['6'],
                }}
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: gradient(
                      isDark ? palette.cyan['400'] : palette.cyan['600'],
                      isDark ? palette.pink['400'] : palette.pink['600']
                    ),
                  }}
                >
                  Desenvolvedor Full-Stack React e Next.js
                </span>
              </motion.h2>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mx-auto"
                style={{
                  fontSize: tokens.primitives.typography.fontSize.xl,
                  color: isDark ? palette.gray['300'] : palette.gray['600'],
                  marginBottom: spacing['12'],
                  maxWidth: '48rem',
                  lineHeight: tokens.primitives.typography.lineHeight.relaxed,
                }}
              >
                Transformo ideias em{' '}
                <span className="font-bold text-foreground dark:text-cyan-200">
                  aplicações web profissionais
                </span>{' '}
                usando React, Next.js, TypeScript e Node.js. Se você precisa de um{' '}
                <span className="font-bold text-foreground dark:text-purple-200">
                  desenvolvedor full-stack que entrega resultados
                </span>
                , vamos conversar sobre seu próximo projeto!
              </motion.p>

              {/* Botões CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center"
                style={{
                  gap: spacing['4'],
                  marginBottom: spacing['12'],
                }}
              >
                <Button
                  asChild
                  size="lg"
                  className="group/btn text-lg text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  style={{
                    gap: spacing['3'],
                    paddingLeft: spacing['10'],
                    paddingRight: spacing['10'],
                    paddingTop: spacing['7'],
                    paddingBottom: spacing['7'],
                    background: gradient(
                      isDark ? palette.cyan['500'] : palette.blue['500'],
                      isDark ? palette.pink['500'] : palette.pink['500']
                    ),
                  }}
                >
                  <Link href="/contato">
                    <MessageSquare className="h-6 w-6" />
                    <span className="font-bold">Entrar em Contato</span>
                    <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-3 text-lg border-2 backdrop-blur-sm hover:scale-105 transition-all duration-300 font-semibold"
                  style={{
                    paddingLeft: spacing['10'],
                    paddingRight: spacing['10'],
                    paddingTop: spacing['7'],
                    paddingBottom: spacing['7'],
                    borderColor: isDark ? palette.cyan['400'] + '80' : palette.gray['300'],
                    color: isDark ? palette.gray['100'] : palette.gray['800'],
                  }}
                >
                  <a href="/Curriculo_Rainer_Teixeira.pdf" download>
                    <Download className="h-6 w-6" />
                    Baixar Currículo
                  </a>
                </Button>
              </motion.div>

              {/* Trust Badges Profissionais */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center text-sm sm:text-base"
                style={{
                  gap: spacing['6'],
                }}
              >
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-full shadow-lg"
                  style={{
                    background: gradient(palette.cyan['500'] + '1A', palette.cyan['500'] + '0D'),
                    border: `1px solid ${palette.cyan['400']}4D`,
                  }}
                >
                  <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-bold text-foreground dark:text-cyan-300">
                    React + Next.js + Node.js
                  </span>
                </div>

                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-full shadow-lg"
                  style={{
                    background: gradient(palette.purple['500'] + '1A', palette.purple['500'] + '0D'),
                    border: `1px solid ${palette.purple['400']}4D`,
                  }}
                >
                  <Rocket className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-bold text-foreground dark:text-purple-300">
                    Código no GitHub
                  </span>
                </div>

                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-full shadow-lg"
                  style={{
                    background: gradient(palette.pink['500'] + '1A', palette.pink['500'] + '0D'),
                    border: `1px solid ${palette.pink['400']}4D`,
                  }}
                >
                  <Sparkles className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  <span className="font-bold text-foreground dark:text-pink-300">
                    Início Imediato
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


