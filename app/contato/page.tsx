/**
 * Contact Page Component
 *
 * Página de contato com formulário completo, informações de contato e seção
 * FAQ. Inclui cards informativos, partículas animadas decorativas e integração
 * com ContactForm e SITE_CONFIG.
 *
 * @module app/contato/page
 * @fileoverview Página de contato completa da aplicação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /contato
 * // Renderizada automaticamente pelo Next.js App Router
 * ```
 */

'use client';

// ============================================================================
// NEXT.JS IMPORTS
// ============================================================================

import Image from 'next/image';
import React from 'react';

// ============================================================================
// ICONS
// ============================================================================

import { HelpCircle } from 'lucide-react';

// ============================================================================
// CONTACT COMPONENTS
// ============================================================================

import { ContactForm } from '@/components/contato/contact-form';

// ============================================================================
// UI COMPONENTS
// ============================================================================

import { ContactInfoCard } from '@/components/contato/contact-info-card';
import { BackToTop, PageHeader, ParticlesEffect } from '@/components/ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// ============================================================================
// DESIGN TOKENS
// ============================================================================

import { cn } from '@/lib/utils';
import { BACKGROUND } from '@rainer/design-tokens';

// ============================================================================
// CONSTANTS
// ============================================================================

import type { ContactInfoCardConfig, FAQItem } from '@/constants';
import { CONTACT_INFO_CARDS, FAQ_ITEMS, SITE_CONFIG } from '@/constants';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

// Types são importados de constants

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ContactPage Component
 *
 * Componente principal da página de contato. Renderiza:
 * - Header com título e descrição
 * - Formulário de contato completo
 * - Cards informativos (horário, localização, telefone, email)
 * - Seção FAQ com accordion
 * - Efeitos visuais (partículas, gradientes)
 *
 * @component
 * @returns {JSX.Element} Página de contato completa
 *
 * @remarks
 * Este componente utiliza:
 * - Next.js App Router para renderização
 * - Partículas animadas para efeito visual
 * - Cards informativos responsivos
 * - Accordion para FAQ
 * - Constantes centralizadas do SITE_CONFIG
 * - Design system com Tailwind CSS
 * - Acessibilidade WCAG AA compliant
 *
 * @see {@link ContactForm} Componente de formulário de contato
 * @see {@link SITE_CONFIG} Constantes centralizadas de configuração
 */
export default function ContactPage() {
  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <div className={cn('min-h-screen', BACKGROUND.FULL)}>
      {/* ================================================================
          PARTICLES EFFECT
          ================================================================ */}

      <ParticlesEffect variant="alt2" />

      {/* ================================================================
          PAGE HEADER
          ================================================================ */}

      <PageHeader
        title="Vamos Conversar Sobre Seu Projeto"
        description={`Estou disponível para projetos freelancer, desenvolvimento de aplicações web, sistemas full-stack e oportunidades de colaboração. Se você precisa de um desenvolvedor comprometido com qualidade, código limpo e resultado que funciona, vamos conversar! Respondo todos os contatos em até ${SITE_CONFIG.contact.email.responseTime.toLowerCase()} com atenção e interesse real em entender como posso ajudar a concretizar sua ideia.`}
      >
        {/* Decorative Icon */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div
            className={cn(
              'absolute inset-0 rounded-full blur-xl opacity-0 dark:opacity-100',
              BACKGROUND.DECORATIVE_BLUR
            )}
            aria-hidden="true"
          />
          <Image
            src="/images/delivery.svg"
            alt="Ícone de comunicação e entrega de projetos"
            fill
            className="object-contain relative z-10 filter dark:brightness-0 dark:invert"
            sizes="96px"
            priority
          />
        </div>
      </PageHeader>

      {/* ================================================================
          CONTACT FORM SECTION
          ================================================================ */}

      <section
        aria-labelledby="contact-form-heading"
        className="max-w-7xl mx-auto px-6 py-12 relative z-10"
      >
        <h2 id="contact-form-heading" className="sr-only">
          Formulário de Contato
        </h2>
        <ContactForm />
      </section>

      {/* ================================================================
          CONTACT INFO CARDS SECTION
          ================================================================ */}

      <section
        aria-labelledby="contact-info-heading"
        className="max-w-7xl mx-auto px-6 pb-16 relative z-10"
      >
        <div className="text-center mb-8">
          <h2
            id="contact-info-heading"
            className="text-3xl font-bold mb-2 dark:text-cyan-200"
          >
            Informações de Contato
          </h2>
          <p className="text-muted-foreground">
            Escolha a forma de contato que preferir
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_INFO_CARDS.map((card: ContactInfoCardConfig) => (
            <ContactInfoCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              primary={card.content.primary}
              secondary={card.content.secondary}
              href={card.href}
              iconColor={card.iconColor}
              borderColor={card.borderColor}
              hoverBorder={card.hoverBorder}
              textColor={card.textColor}
              hoverText={card.hoverText}
            />
          ))}
        </div>
      </section>

      {/* ================================================================
          FAQ SECTION
          ================================================================ */}

      <section
        aria-labelledby="faq-heading"
        className="max-w-5xl mx-auto px-6 pb-16 relative z-10"
      >
        <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 dark:bg-cyan-400/10">
                <HelpCircle
                  className="h-5 w-5 text-primary dark:text-cyan-400"
                  aria-hidden="true"
                />
              </div>
              <div>
                <CardTitle
                  id="faq-heading"
                  className="text-2xl font-bold dark:text-cyan-200"
                >
                  Perguntas Frequentes
                </CardTitle>
                <CardDescription>
                  Tire suas dúvidas sobre nossos serviços
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {FAQ_ITEMS.map((item: FAQItem, index) => (
                <React.Fragment key={item.value}>
                  <AccordionItem
                    value={item.value}
                    className="border rounded-lg px-4 hover:bg-accent/50 transition-colors"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                  {index < FAQ_ITEMS.length - 1 && (
                    <div className="py-1" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* ================================================================
          BACK TO TOP BUTTON
          ================================================================ */}

      <BackToTop />
    </div>
  );
}
