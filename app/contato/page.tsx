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

import Image from 'next/image';
import React from 'react';
import { HelpCircle } from 'lucide-react';

import { ContactForm } from '@/components/domain/contato/contact-form';
import { ContactInfoCard } from '@/components/domain/contato/contact-info-card';
import { BackToTop, PageHeader, ParticlesEffect, Accordion, AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@rainersoft/ui';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';
import { Separator } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import type { ContactInfoCardConfig, FAQItem } from '@/constants';
import { CONTACT_INFO_CARDS, FAQ_ITEMS } from '@/constants';
import { CONTATO } from '@/constants/metadata/comum/social';

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
  return (
    <div className={cn('min-h-screen bg-background dark:bg-black')}>
      {/* Efeito de partículas decorativo no background */}
      <ParticlesEffect variant="alt2" />

      {/* Cabeçalho da página com título, descrição e ícone decorativo */}
      <PageHeader
        title="Vamos Transformar Sua Ideia em Realidade"
        description={`Estou disponível para novos projetos e oportunidades de colaboração. Se você precisa de um desenvolvedor Full-Stack comprometido com qualidade, código limpo e resultados que funcionam, vamos conversar! Desenvolvo aplicações web completas, dashboards interativos, sistemas de autenticação, APIs RESTful e integrações personalizadas. Respondo em ${CONTATO.tempoResposta.email} para todos os contatos, com atenção e interesse genuíno em entender como posso ajudar a concretizar seu projeto.`}
      >
        {/* Ícone decorativo com gradiente animado */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div
            className={cn(
              'absolute inset-0 rounded-full blur-xl opacity-0 dark:opacity-100',
              `${GRADIENT_DIRECTIONS.TO_BR} from-cyan-500/20 via-purple-500/15 to-pink-500/20`
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

      {/* Seção de formulário de contato */}
      {/* Formulário completo com validação, campos de nome, email, assunto e mensagem */}
      <section
        aria-labelledby="contact-form-heading"
        className="max-w-7xl mx-auto px-6 py-12 relative z-10"
      >
        <h2 id="contact-form-heading" className="sr-only">
          Formulário de Contato
        </h2>
        <ContactForm />
      </section>

      {/* Seção de informações de contato */}
      {/* Cards informativos com diferentes formas de contato: horário, localização, telefone e email */}
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
        {/* Grid responsivo de cards de informações de contato */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_INFO_CARDS.map((card: ContactInfoCardConfig) => {
            const content = typeof card.content === 'string' 
              ? { primary: card.content, secondary: undefined }
              : card.content;
              
            return (
              <ContactInfoCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                primary={content.primary}
                secondary={content.secondary}
                href={card.href || undefined}
                iconColor="text-cyan-400"
                borderColor="dark:border-cyan-400/20"
                hoverBorder={card.borderHover}
                textColor="dark:text-cyan-200"
                hoverText="dark:hover:text-cyan-300"
              />
            );
          })}
        </div>
      </section>

      {/* Seção de perguntas frequentes (FAQ) */}
      {/* Accordion com perguntas e respostas sobre serviços e processos */}
      <section
        aria-labelledby="faq-heading"
        className="max-w-5xl mx-auto px-6 pb-16 relative z-10"
      >
        <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              {/* Ícone decorativo do FAQ */}
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
            {/* Accordion com perguntas e respostas */}
            {/* Permite expandir/colapsar cada item individualmente */}
            <Accordion type="single" collapsible className="w-full space-y-2">
              {FAQ_ITEMS.map((item: FAQItem, index: number) => (
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

      {/* Botão de voltar ao topo */}
      <BackToTop />
    </div>
  );
}


