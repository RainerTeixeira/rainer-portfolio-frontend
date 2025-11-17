/**
 * Testimonials Component (Diferenciais)
 *
 * Seção de diferenciais mostrando pontos fortes e diferenciais profissionais.
 * Exibe cards com ícones, gradientes coloridos e animações suaves.
 *
 * @module components/home/testimonials
 * @fileoverview Seção de diferenciais profissionais com design premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <Testimonials />
 * ```
 *
 * Características:
 * - Cards de diferenciais com ícones
 * - Gradientes coloridos por diferencial
 * - Badges de destaque
 * - Animações suaves com Framer Motion
 * - Layout responsivo em grid
 * - Suporte a tema claro/escuro
 */

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Code,
  GitBranch,
  Layers,
  Shield,
  Target,
  Zap,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Testimonials() {
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

  const differentials = [
    {
      icon: Code,
      title: 'Clean Code',
      description:
        'TypeScript strict mode, ESLint configurado, documentação JSDoc completa e padrões consistentes. Código que outros desenvolvedores querem trabalhar.',
      gradient: 'from-cyan-500 to-blue-600',
      iconBg: 'from-cyan-400 to-blue-500',
      badge: 'Clean Code',
    },
    {
      icon: Zap,
      title: 'Performance 95+',
      description:
        'Lighthouse Score 95+, Core Web Vitals excelentes, lazy loading estratégico, code splitting e cache inteligente. Aplicações rápidas que convertem.',
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'from-purple-400 to-pink-500',
      badge: 'Lighthouse 95+',
    },
    {
      icon: Shield,
      title: 'Security First',
      description:
        'Autenticação JWT robusta, validações em backend e frontend, sanitização de dados, proteção XSS/CSRF e boas práticas OWASP.',
      gradient: 'from-green-500 to-emerald-600',
      iconBg: 'from-green-400 to-emerald-500',
      badge: 'Security First',
    },
    {
      icon: BookOpen,
      title: '100% Documentado',
      description:
        'JSDoc em todo código, README detalhado, comentários explicativos e arquitetura bem documentada. Facilita manutenção e colaboração.',
      gradient: 'from-orange-500 to-amber-600',
      iconBg: 'from-orange-400 to-amber-500',
      badge: '100% Documentado',
    },
    {
      icon: Layers,
      title: 'Arquitetura Modular',
      description:
        'Componentização modular, separação de responsabilidades, padrões de design aplicados e código preparado para crescer sem refatoração.',
      gradient: 'from-blue-500 to-indigo-600',
      iconBg: 'from-blue-400 to-indigo-500',
      badge: 'Modular',
    },
    {
      icon: GitBranch,
      title: 'Git Expert',
      description:
        'Commits semânticos, feature branches, pull requests documentados, versionamento organizado e histórico limpo. Trabalho em equipe facilitado.',
      gradient: 'from-red-500 to-rose-600',
      iconBg: 'from-red-400 to-rose-500',
      badge: 'Git Expert',
    },
  ];

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brilho de fundo */}
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl"></div>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full ${isDark ? 'bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400' : 'bg-linear-to-r from-blue-500 via-purple-500 to-pink-500'} text-white font-bold text-sm mb-8 shadow-xl`}
          >
            <Award className="w-5 h-5" />
            Meus Diferenciais
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-linear-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
          >
            Por Que Me Escolher
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Qualidade técnica, código profissional e{' '}
            <span className="font-bold text-foreground dark:text-cyan-200">
              comprometimento com excelência
            </span>{' '}
            em cada linha
          </motion.p>
        </div>

        {/* Diferenciais Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
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
                <div className="relative h-full">
                  {/* Brilho de fundo */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${item.iconBg} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  {/* Card */}
                  <Card
                    className={cn(
                      'relative h-full flex flex-col bg-card/80 dark:bg-black/60 backdrop-blur-xl',
                      'border border-border/50 dark:border-cyan-400/20',
                      'hover:border-primary dark:hover:border-cyan-400/60',
                      'transition-all duration-500',
                      'hover:shadow-2xl hover:-translate-y-2',
                      'overflow-hidden'
                    )}
                  >
                    {/* Brilho interno */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <CardContent className="p-8 relative z-10 flex flex-col">
                      {/* Badge pequeno */}
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 rounded-full bg-linear-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-400/20 dark:to-purple-400/20 border border-cyan-400/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                          {item.badge}
                        </div>
                      </div>

                      {/* Ícone */}
                      <div className="relative mb-6">
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${item.iconBg} rounded-2xl blur-md opacity-40`}
                        ></div>
                        <div
                          className={`relative inline-flex p-4 rounded-2xl bg-linear-to-br ${item.iconBg} shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      {/* Título */}
                      <h3
                        className="text-sm sm:text-base font-black mb-3 text-foreground dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-tight whitespace-nowrap"
                        title={item.title}
                      >
                        {item.title}
                      </h3>

                      {/* Descrição */}
                      <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed grow">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/20 dark:via-purple-400/20 dark:to-pink-400/20 border-2 border-cyan-400/30">
            <Target className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <span className="text-base font-bold text-foreground dark:text-white">
              Pronto para entregar{' '}
              <span className="bg-linear-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                qualidade comprovada
              </span>{' '}
              no seu projeto
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
