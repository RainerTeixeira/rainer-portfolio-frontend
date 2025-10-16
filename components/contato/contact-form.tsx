/**
 * Componente ContactForm (Formulário de Contato)
 * 
 * Formulário completo de contato com validação HTML5.
 * Layout em 2 colunas: formulário + informações de contato.
 * 
 * Características:
 * - Formulário controlado com React state
 * - Validação HTML5 (required, email type)
 * - Reset após envio
 * - Cards com hover shadows
 * - Layout responsivo (1 coluna mobile, 2 desktop)
 * - Informações de contato ao lado
 * 
 * @fileoverview Formulário de contato com layout 2 colunas
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SITE_CONFIG } from "@/constants"
import { CARD_CLASSES, cn } from "@/lib/utils"
import { useContactForm } from "./hooks"

/**
 * Componente ContactForm
 * 
 * Renderiza formulário de contato completo com 2 colunas.
 * 
 * Layout:
 * - Coluna 1: formulário de envio
 * - Coluna 2: informações de contato + tempo de resposta
 * 
 * @returns {JSX.Element} Grid com formulário e informações
 * 
 * @example
 * // Em página de contato
 * <section>
 *   <h1>Entre em Contato</h1>
 *   <ContactForm />
 * </section>
 */
export function ContactForm() {
  const { formData, handleChange, handleSubmit } = useContactForm()

  return (
    <div className={cn("max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8")}>
      {/** 
       * COLUNA 1: Formulário de envio de mensagem
       * Card com campos de input e botão de envio
       */}
      <Card className={CARD_CLASSES.full}>
        <CardHeader>
          <CardTitle className="text-2xl">Envie uma Mensagem</CardTitle>
        </CardHeader>
        <CardContent>
          {/** 
           * Form controlado com validação HTML5
           * - onSubmit: handleSubmit
           * - Campos: name, email, subject, message
           * - Botão de envio full-width
           */}
          <form onSubmit={handleSubmit} className={cn("space-y-6")}>
            {/** Campo Nome (obrigatório) */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                placeholder="Seu nome completo"
              />
            </div>

            {/** Campo E-mail (obrigatório, validação HTML5) */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {/** Campo Assunto (opcional) */}
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                placeholder="Sobre o que você gostaria de conversar?"
              />
            </div>

            {/** Campo Mensagem (obrigatório, textarea) */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none transition-colors"
                placeholder="Descreva seu projeto ou dúvida..."
              />
            </div>

            {/** Botão de envio full-width */}
            <Button type="submit" className="w-full" size="lg">
              Enviar Mensagem
            </Button>
          </form>
        </CardContent>
      </Card>

      {/** 
       * COLUNA 2: Informações de contato e tempo de resposta
       * Dois cards empilhados verticalmente
       */}
      <div className="space-y-6">
        {/** Card 1: Informações de contato (email, LinkedIn, GitHub) */}
        <Card className={CARD_CLASSES.full}>
          <CardHeader>
            <CardTitle className="text-xl">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/** E-mail */}
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs">E-mail</Badge>
              <p className="text-muted-foreground">{SITE_CONFIG.email}</p>
            </div>
            <Separator />
            
            {/** LinkedIn */}
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs">LinkedIn</Badge>
              <a 
                href={SITE_CONFIG.linkedin} 
                className="text-primary hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE_CONFIG.linkedin.replace('https://', '')}
              </a>
            </div>
            <Separator />
            
            {/** GitHub */}
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs">GitHub</Badge>
              <a 
                href={SITE_CONFIG.github} 
                className="text-primary hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE_CONFIG.github.replace('https://', '')}
              </a>
            </div>
          </CardContent>
        </Card>

        {/** Card 2: Tempo de resposta */}
        <Card className={CARD_CLASSES.full}>
          <CardHeader>
            <CardTitle className="text-xl">Tempo de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Normalmente respondo em até 24 horas durante dias úteis. 
              Para projetos urgentes, entre em contato via WhatsApp.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
