/**
 * CTA Section Component
 *
 * Call-to-action final da home com visual premium. Seção de conversão com
 * design impactante, múltiplas ações (contato, currículo) e efeitos visuais
 * animados.
 *
 * @module components/home/cta-section
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

import { Button } from '@/components/ui/button';
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

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brilho de fundo gigante */}
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Card principal gigante */}
          <div className="relative bg-card/90 dark:bg-black/70 backdrop-blur-2xl rounded-[32px] p-12 sm:p-16 lg:p-20 border-2 border-border/50 dark:border-cyan-400/30 shadow-2xl overflow-hidden">
            {/* Efeito de brilho animado */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-400/10 dark:via-purple-400/10 dark:to-pink-400/10 animate-pulse"></div>

            {/* Partículas decorativas */}
            <div
              className={`absolute top-10 left-10 w-20 h-20 ${isDark ? 'bg-cyan-400/20' : 'bg-blue-500/20'} rounded-full blur-2xl animate-pulse`}
            ></div>
            <div
              className={`absolute bottom-10 right-10 w-32 h-32 ${isDark ? 'bg-purple-400/20' : 'bg-purple-500/20'} rounded-full blur-3xl animate-pulse`}
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className={`absolute top-1/2 left-1/4 w-24 h-24 ${isDark ? 'bg-pink-400/20' : 'bg-pink-500/20'} rounded-full blur-2xl animate-pulse`}
              style={{ animationDelay: '2s' }}
            ></div>

            <div className="relative z-10 text-center">
              {/* Badge de destaque */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${isDark ? 'bg-linear-to-r from-green-400 via-emerald-400 to-green-500' : 'bg-linear-to-r from-green-500 via-emerald-500 to-green-600'} text-white font-bold text-sm mb-8 shadow-xl`}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Aberto para Oportunidades
              </motion.div>

              {/* Título principal */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight"
              >
                <span className="bg-linear-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Pronto para Entregar
                </span>
                <br />
                <span className="bg-linear-to-r from-pink-600 via-purple-600 to-cyan-600 dark:from-pink-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Resultados Reais
                </span>
              </motion.h2>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl text-muted-foreground dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Busco oportunidades em{' '}
                <span className="font-bold text-foreground dark:text-cyan-200">
                  desenvolvimento full-stack
                </span>{' '}
                onde possa aplicar minhas habilidades técnicas e contribuir com{' '}
                <span className="font-bold text-foreground dark:text-purple-200">
                  código de qualidade desde o primeiro dia
                </span>
                . Vamos conversar sobre como posso agregar valor ao seu time!
              </motion.p>

              {/* Botões CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12"
              >
                <Button
                  asChild
                  size="lg"
                  className={`group/btn gap-3 text-lg px-10 py-7 ${isDark ? 'bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 shadow-cyan-500/30 hover:shadow-cyan-500/50' : 'bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-blue-500/30 hover:shadow-blue-500/50'} text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}
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
                  className="gap-3 text-lg px-10 py-7 border-2 dark:border-cyan-400/50 dark:hover:bg-cyan-400/10 dark:hover:border-cyan-400/80 backdrop-blur-sm hover:scale-105 transition-all duration-300 font-semibold"
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
                className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base"
              >
                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-linear-to-r from-cyan-500/10 to-cyan-500/5 dark:from-cyan-400/20 dark:to-cyan-400/10 border border-cyan-400/30 shadow-lg">
                  <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-bold text-foreground dark:text-cyan-300">
                    Stack Completa
                  </span>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-linear-to-r from-purple-500/10 to-purple-500/5 dark:from-purple-400/20 dark:to-purple-400/10 border border-purple-400/30 shadow-lg">
                  <Rocket className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-bold text-foreground dark:text-purple-300">
                    Projetos Comprovados
                  </span>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-linear-to-r from-pink-500/10 to-pink-500/5 dark:from-pink-400/20 dark:to-pink-400/10 border border-pink-400/30 shadow-lg">
                  <Sparkles className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  <span className="font-bold text-foreground dark:text-pink-300">
                    Disponível Agora
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
