/**
 * Contact Section Component
 *
 * Seção de contato para a página inicial. Apresenta informações de contato,
 * disponibilidade e call-to-actions com animações suaves e design responsivo.
 *
 * @module components/domain/home/contact-section
 * @fileoverview Componente de seção de contato com visual premium e padrão enterprise
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * import { ContactSection } from '@/components/domain/home/contact-section';
 *
 * export default function HomePage() {
 *   return (
 *     <main>
 *       <ContactSection />
 *     </main>
 *   );
 * }
 * ```
 */

'use client';

// ============================================================================
// IMPORTS
// ============================================================================

import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { DESENVOLVEDOR } from '@/constants/metadata/comum/desenvolvedor';
import { CONTATO } from '@/constants/metadata/comum/social';
import { INFO_CONTATO } from '@/constants/content/contato/formulario';
import {
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Zap,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Configuração de item de contato
 *
 * @interface ContactInfoItem
 * @property {React.ComponentType} icon - Componente de ícone do Lucide React
 * @property {string} title - Título do método de contato
 * @property {string} content - Conteúdo/informação de contato
 * @property {string} gradient - Classes CSS para gradiente de fundo
 * @property {string} iconBg - Classes CSS para gradiente do ícone
 * @property {string | null} href - URL de ação (mailto:, tel:, ou null)
 * @property {string} [description] - Descrição adicional opcional
 */
interface ContactInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  gradient: string;
  iconBg: string;
  href: string | null;
  description?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ContactSection Component
 *
 * Componente de seção de contato com:
 * - Design premium e profissional
 * - Animações suaves com Framer Motion
 * - Cards informativos de contato
 * - Call-to-actions destacados
 * - Suporte a dark mode
 * - Responsivo e acessível
 *
 * @component
 * @returns {JSX.Element} Seção de contato completa
 *
 * @remarks
 * Este componente utiliza:
 * - Framer Motion para animações
 * - next-themes para gerenciamento de tema
 * - Constantes centralizadas do SITE_CONFIG
 * - Design system com Tailwind CSS
 * - Acessibilidade WCAG AA compliant
 *
 * @see {@link SITE_CONFIG} Para informações de contato centralizadas
 */
export const ContactSection = memo(function ContactSection() {
  // ========================================================================
  // HOOKS & STATE
  // ========================================================================

  /**
   * Hook para gerenciar tema (dark/light mode)
   * @type {Object}
   * @property {string} resolvedTheme - Tema atual resolvido
   */
  const { resolvedTheme } = useTheme();

  /**
   * Estado para controlar montagem do componente (evita hydration mismatch)
   * @type {[boolean, Function]}
   */
  const [mounted, setMounted] = useState(false);

  /**
   * Efeito para marcar componente como montado após primeira renderização
   * Previne problemas de hidratação com next-themes
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Determina se o tema atual é dark mode
   * Só retorna true após montagem para evitar hydration mismatch
   * @type {boolean}
   */
  const isDark = mounted ? resolvedTheme === 'dark' : false;

  // ========================================================================
  // DATA CONFIGURATION
  // ========================================================================

  /**
   * Array de informações de contato
   *
   * Configuração dos métodos de contato disponíveis com:
   * - Ícones, títulos e conteúdo
   * - Gradientes personalizados para cada item
   * - Links de ação (mailto, tel)
   *
   * @type {ContactInfoItem[]}
   * @constant
   */
  const contactInfo: ContactInfoItem[] = [
    {
      icon: Mail,
      title: 'Email',
      content: CONTATO.email,
      gradient: 'from-cyan-500 to-blue-600',
      iconBg: 'from-cyan-400 to-blue-500',
      href: `mailto:${CONTATO.email}`,
      description: `Respondo em ${CONTATO.tempoResposta.email}`,
    },
    {
      icon: Clock,
      title: 'Horário',
      content: CONTATO.horarioAtendimento.dias,
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'from-purple-400 to-pink-500',
      href: null,
      description: `${CONTATO.horarioAtendimento.horario} - ${CONTATO.horarioAtendimento.fuso}`,
    },
    {
      icon: MapPin,
      title: 'Localização',
      content: 'Brasil',
      gradient: 'from-orange-500 to-amber-600',
      iconBg: 'from-orange-400 to-amber-500',
      href: null,
      description: 'Atendimento remoto global',
    },
  ];

  // ========================================================================
  // RENDER HELPERS
  // ========================================================================

  /**
   * Renderiza o conteúdo de um item de contato
   *
   * Se o item possui href, renderiza como link clicável.
   * Caso contrário, renderiza como texto estático.
   *
   * @param {ContactInfoItem} item - Item de contato a ser renderizado
   * @returns {JSX.Element} Conteúdo renderizado (link ou span)
   */
  const renderContactContent = (item: ContactInfoItem) => {
    if (item.href) {
      return (
        <a
          href={item.href}
          className="hover:underline hover:text-foreground dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          aria-label={`${item.title}: ${item.content}`}
        >
          {item.content}
        </a>
      );
    }
    return <span>{item.content}</span>;
  };

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <section
      id="contato"
      className="py-20 sm:py-24 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background Glow Effect */}
      <div
        className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          {/* ================================================================
              HEADER SECTION
              ================================================================ */}

          <header className="text-center mb-16">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-2.5 rounded-full',
                'text-white font-bold text-sm mb-8 shadow-xl',
                isDark
                  ? 'bg-linear-to-r from-green-400 via-emerald-400 to-green-500'
                  : 'bg-linear-to-r from-green-500 via-emerald-500 to-green-600'
              )}
              role="status"
              aria-label="Status de disponibilidade"
            >
              <div
                className="w-2 h-2 bg-white rounded-full animate-pulse"
                aria-hidden="true"
              />
              {DESENVOLVEDOR.disponibilidade}
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            >
              <span className="bg-linear-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Desenvolvedor Full-Stack Disponível
              </span>
            </motion.h2>

            {/* Primary Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4"
            >
              React, Next.js, Node.js e TypeScript para seu próximo projeto
            </motion.p>

            {/* Expertise Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm sm:text-base text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto"
            >
              <span className="font-semibold text-foreground dark:text-purple-200">
                Entrego:
              </span>
              {' '}
              Código limpo e documentado, performance excepcional (Lighthouse 95+), SEO avançado e suporte completo do desenvolvimento ao deploy.
            </motion.p>
          </header>

          {/* ================================================================
              CONTACT CARDS GRID
              ================================================================ */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-stretch">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={`contact-${item.title.toLowerCase()}`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    duration: 0.5,
                  }}
                  className="group/contact"
                >
                  <div className="relative h-full">
                    {/* Card Background Glow */}
                    <div
                      className={cn(
                        'absolute inset-0 bg-linear-to-br',
                        item.iconBg,
                        'rounded-2xl blur-2xl opacity-0',
                        'group-hover/contact:opacity-20',
                        'transition-opacity duration-500'
                      )}
                      aria-hidden="true"
                    />

                    {/* Card Container */}
                    <div
                      className={cn(
                        'relative h-full flex flex-col',
                        'bg-card/80 dark:bg-black/60 backdrop-blur-xl',
                        'border border-border/50 dark:border-cyan-400/20',
                        'hover:border-primary dark:hover:border-cyan-400/60',
                        'rounded-2xl p-8',
                        'transition-all duration-500',
                        'hover:shadow-2xl hover:-translate-y-1',
                        'overflow-hidden text-center'
                      )}
                    >
                      {/* Internal Glow */}
                      <div
                        className={cn(
                          'absolute inset-0 bg-linear-to-br',
                          item.gradient,
                          'opacity-0 group-hover/contact:opacity-10',
                          'transition-opacity duration-500'
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative z-10">
                        {/* Icon Container */}
                        <div className="relative mb-6">
                          <div
                            className={cn(
                              'absolute inset-0 bg-linear-to-br',
                              item.iconBg,
                              'rounded-xl blur-md opacity-40'
                            )}
                            aria-hidden="true"
                          />
                          <div
                            className={cn(
                              'relative inline-flex p-4 rounded-xl',
                              'bg-linear-to-br',
                              item.iconBg,
                              'shadow-xl',
                              'group-hover/contact:scale-110',
                              'transition-transform duration-300'
                            )}
                            aria-hidden="true"
                          >
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-sm sm:text-base font-black mb-3 text-foreground dark:text-white leading-tight whitespace-nowrap"
                          title={item.title}
                        >
                          {item.title}
                        </h3>

                        {/* Content */}
                        <div className="text-sm font-medium text-muted-foreground dark:text-gray-300 mb-2">
                          {renderContactContent(item)}
                        </div>

                        {/* Description (if available) */}
                        {item.description && (
                          <div className="text-xs text-muted-foreground dark:text-gray-400 mt-2">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* ================================================================
              CALL TO ACTION SECTION
              ================================================================ */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center"
          >
            <div className="relative bg-card/90 dark:bg-black/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-border/50 dark:border-cyan-400/30 shadow-2xl overflow-hidden max-w-4xl mx-auto">
              {/* CTA Background Glow */}
              <div
                className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-400/10 dark:via-purple-400/10 dark:to-pink-400/10"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Response Time Message */}
                <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 mb-8 leading-relaxed">
                  <span className="font-bold text-foreground dark:text-cyan-200">
                    Respondo em {CONTATO.tempoResposta.email}.
                  </span>{' '}
                  Vamos conversar sobre como posso ajudar seu projeto a crescer com tecnologia moderna e código profissional.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Primary CTA - Contact Form */}
                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      'group/btn gap-3 text-lg px-10 py-6',
                      'text-white shadow-2xl hover:shadow-3xl',
                      'transition-all duration-300 hover:scale-105',
                      isDark
                        ? 'bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 shadow-cyan-500/30 hover:shadow-cyan-500/50'
                        : 'bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-blue-500/30 hover:shadow-blue-500/50'
                    )}
                    aria-label="Abrir formulário de contato"
                  >
                    <Link href="/contato">
                      <MessageSquare className="h-6 w-6" aria-hidden="true" />
                      <span className="font-bold">Iniciar Conversa</span>
                      <Send
                        className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>

                  {/* Secondary CTA - Direct Email */}
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className={cn(
                      'gap-3 text-lg px-10 py-6 border-2',
                      'dark:border-cyan-400/50 dark:hover:bg-cyan-400/10',
                      'dark:hover:border-cyan-400/80',
                      'backdrop-blur-sm hover:scale-105',
                      'transition-all duration-300 font-semibold'
                    )}
                    aria-label={`Enviar email para ${CONTATO.email}`}
                  >
                    <a href={`mailto:${CONTATO.email}`}>
                      <Mail className="h-6 w-6" aria-hidden="true" />
                      Enviar Email Direto
                    </a>
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {/* Availability Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-green-500/10 to-emerald-500/10 dark:from-green-400/20 dark:to-emerald-400/20 border border-green-400/30"
                    role="status"
                    aria-label="Status de disponibilidade imediata"
                  >
                    <Zap
                      className="w-5 h-5 text-green-600 dark:text-green-400"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-bold text-foreground dark:text-green-300">
                      {DESENVOLVEDOR.especialidades}
                    </span>
                  </div>

                  {/* Working Hours Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-400/20 dark:to-cyan-400/20 border border-blue-400/30"
                    role="status"
                    aria-label="Horário de atendimento"
                  >
                    <Clock
                      className="w-5 h-5 text-blue-600 dark:text-blue-400"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-bold text-foreground dark:text-blue-300">
                      {CONTATO.horarioAtendimento.dias}{' '}
                      {CONTATO.horarioAtendimento.horario}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

/**
 * Display name para debugging e React DevTools
 * @type {string}
 */
ContactSection.displayName = 'ContactSection';
