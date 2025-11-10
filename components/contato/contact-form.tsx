/**
 * Contact Form Component
 *
 * Formulário de contato com validação HTML5, layout responsivo em 2 colunas
 * (mobile: 1 coluna) e informações de contato complementares. Integração com
 * hook useContactForm e SITE_CONFIG para dados de contato.
 *
 * @module components/contato/contact-form
 * @fileoverview Formulário de contato completo com layout 2 colunas
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * import { ContactForm } from '@/components/contato/contact-form';
 *
 * export default function ContactPage() {
 *   return (
 *     <div>
 *       <ContactForm />
 *     </div>
 *   );
 * }
 * ```
 */

'use client';

// ============================================================================
// IMPORTS
// ============================================================================

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { SITE_CONFIG } from '@/constants';
import { CARD_CLASSES, cn } from '@/lib/utils';
import {
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  User,
} from 'lucide-react';
import React from 'react';
import { useContactForm } from './hooks';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Item de informação de contato
 *
 * @interface ContactInfoItem
 * @property {string} label - Label/badge do item
 * @property {string} value - Valor/informação do item
 * @property {string} [href] - URL opcional (para links)
 * @property {boolean} [isExternal] - Indica se é link externo
 */
interface ContactInfoItem {
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
}

// ============================================================================
// DATA CONFIGURATION
// ============================================================================

/**
 * Lista de informações de contato para exibição
 *
 * Array contendo informações de contato (email, LinkedIn, GitHub)
 * que serão exibidas no card lateral do formulário.
 *
 * @type {ContactInfoItem[]}
 * @constant
 */
const CONTACT_INFO_ITEMS: ReadonlyArray<ContactInfoItem> = [
  {
    label: 'E-mail',
    value: SITE_CONFIG.contact.email.address,
  },
  {
    label: 'LinkedIn',
    value: SITE_CONFIG.linkedin.replace('https://', ''),
    href: SITE_CONFIG.linkedin,
    isExternal: true,
  },
  {
    label: 'GitHub',
    value: SITE_CONFIG.github.replace('https://', ''),
    href: SITE_CONFIG.github,
    isExternal: true,
  },
] as const;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ContactForm Component
 *
 * Componente de formulário de contato com:
 * - Layout responsivo em 2 colunas (mobile: 1 coluna)
 * - Validação HTML5 nativa
 * - Formulário controlado com React hooks
 * - Cards informativos complementares
 * - Acessibilidade WCAG AA compliant
 *
 * @component
 * @returns {JSX.Element} Grid com formulário e informações de contato
 *
 * @remarks
 * Este componente utiliza:
 * - useContactForm hook para gerenciamento de estado
 * - Validação HTML5 (required, email type)
 * - Layout responsivo com Tailwind CSS
 * - Constantes centralizadas do SITE_CONFIG
 * - Design system com shadcn/ui
 *
 * @see {@link useContactForm} Hook customizado para gerenciamento do formulário
 * @see {@link SITE_CONFIG} Constantes centralizadas de configuração
 */
export function ContactForm() {
  // ========================================================================
  // HOOKS
  // ========================================================================

  /**
   * Hook customizado para gerenciamento do formulário
   * Retorna: formData, handleChange, handleSubmit
   *
   * @type {Object}
   * @property {Object} formData - Estado do formulário (name, email, subject, message)
   * @property {Function} handleChange - Handler para mudanças nos campos
   * @property {Function} handleSubmit - Handler para submissão do formulário
   */
  const { formData, handleChange, handleSubmit } = useContactForm();

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <div
      className={cn('max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8')}
      role="region"
      aria-labelledby="contact-form-title"
    >
      {/* ================================================================
          COLUMN 1: CONTACT FORM
          ================================================================ */}

      <Card
        className={cn(CARD_CLASSES.full, 'shadow-lg dark:shadow-cyan-400/10')}
      >
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 dark:bg-cyan-400/10">
              <MessageSquare className="h-5 w-5 text-primary dark:text-cyan-400" />
            </div>
            <div>
              <CardTitle id="contact-form-title" className="text-2xl">
                Envie uma Mensagem
              </CardTitle>
              <CardDescription className="mt-1">
                Preencha o formulário e entrarei em contato em breve
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className={cn('space-y-5')}
            noValidate
            aria-label="Formulário de contato"
          >
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome completo *
              </Label>
              <Input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Seu nome completo"
                aria-required="true"
                aria-describedby="name-description"
                className="h-11"
              />
              <span id="name-description" className="sr-only">
                Campo obrigatório para identificação
              </span>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="contact-email"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                E-mail *
              </Label>
              <Input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="seu@email.com"
                aria-required="true"
                aria-describedby="email-description"
                className="h-11"
              />
              <span id="email-description" className="sr-only">
                Campo obrigatório. Será usado para resposta ao seu contato
              </span>
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <Label htmlFor="contact-subject">
                Assunto{' '}
                <span className="text-muted-foreground text-xs">
                  (opcional)
                </span>
              </Label>
              <Input
                type="text"
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Sobre o que você gostaria de conversar?"
                aria-describedby="subject-description"
                className="h-11"
              />
              <span id="subject-description" className="sr-only">
                Campo opcional para especificar o assunto do contato
              </span>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label
                htmlFor="contact-message"
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Mensagem *
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                autoComplete="off"
                placeholder="Descreva seu projeto, dúvida ou proposta..."
                aria-required="true"
                aria-describedby="message-description"
                className="min-h-[140px] resize-none"
              />
              <span id="message-description" className="sr-only">
                Campo obrigatório. Descreva seu projeto, dúvida ou proposta
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold"
              size="lg"
              aria-label="Enviar mensagem de contato"
            >
              <Send className="mr-2 h-4 w-4" />
              Enviar Mensagem
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ================================================================
          COLUMN 2: CONTACT INFORMATION
          ================================================================ */}

      <div className="space-y-6">
        {/* Contact Info Card */}
        <Card
          className={cn(CARD_CLASSES.full, 'shadow-lg dark:shadow-cyan-400/10')}
        >
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary dark:text-cyan-400" />
              Informações de Contato
            </CardTitle>
            <CardDescription>
              Entre em contato através dos canais abaixo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {CONTACT_INFO_ITEMS.map((item, index) => (
              <React.Fragment
                key={`contact-info-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {item.label === 'E-mail' && (
                        <Mail className="mr-1 h-3 w-3" />
                      )}
                      {item.label === 'LinkedIn' && (
                        <Linkedin className="mr-1 h-3 w-3" />
                      )}
                      {item.label === 'GitHub' && (
                        <Github className="mr-1 h-3 w-3" />
                      )}
                      {item.label}
                    </Badge>
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block text-sm font-medium text-primary hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={`${item.label}: ${item.value}`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground dark:text-gray-300">
                      {item.value}
                    </p>
                  )}
                </div>
                {index < CONTACT_INFO_ITEMS.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </CardContent>
        </Card>

        {/* Response Time Card */}
        <Card
          className={cn(CARD_CLASSES.full, 'shadow-lg dark:shadow-cyan-400/10')}
        >
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary dark:text-cyan-400" />
              Tempo de Resposta
            </CardTitle>
            <CardDescription>
              Quando você pode esperar uma resposta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground leading-relaxed text-sm space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span>Normalmente respondo em até</span>
                <Badge variant="secondary" className="font-semibold">
                  {SITE_CONFIG.contact.email.responseTime.toLowerCase()}
                </Badge>
                <span>durante dias úteis.</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span>Para projetos urgentes, entre em contato via</span>
                {SITE_CONFIG.contact.phone.whatsapp ? (
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.phone.number.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold transition-colors"
                    aria-label="Abrir WhatsApp para contato urgente"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <span className="font-semibold">telefone</span>
                )}
                <span>.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * Display name para debugging e React DevTools
 * @type {string}
 */
ContactForm.displayName = 'ContactForm';
