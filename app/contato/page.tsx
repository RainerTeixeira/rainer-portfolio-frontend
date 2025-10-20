/**
 * Contact Page Component
 * 
 * Página de contato profissional com formulário e informações.
 * Exibe formulário de contato e cards informativos sobre disponibilidade.
 * 
 * Características:
 * - Header com ícone decorativo
 * - Formulário de contato completo
 * - Cards informativos (horário, localização, telefone, email)
 * - Efeitos visuais cyberpunk no dark mode
 * - Partículas animadas decorativas
 * 
 * @fileoverview Página de contato da aplicação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Next.js Imports
// ============================================================================

import Image from "next/image"

// ============================================================================
// Icons
// ============================================================================

import { Clock, MapPin, Phone, Mail } from "lucide-react"

// ============================================================================
// Contact Components
// ============================================================================

import { ContactForm } from "@/components/contato/contact-form"

// ============================================================================
// UI Components
// ============================================================================

import { ParticlesEffect, PageHeader, BackToTop } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"

// ============================================================================
// Constants
// ============================================================================

/**
 * Informações de contato da empresa
 */
const CONTACT_INFO = {
  workingHours: {
    days: 'Seg - Sex',
    hours: '9:00 - 18:00'
  },
  location: {
    city: 'Volta Redonda, RJ',
    country: 'Brasil'
  },
  phone: {
    number: '+55 24 99913-7382',
    whatsapp: true
  },
  email: {
    address: 'suporte@rainersoft.com.br',
    responseTime: 'Resposta em 24h'
  }
} as const

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal da Contact Page
 * 
 * Renderiza página de contato com:
 * - Header com ícone decorativo
 * - Formulário de contato
 * - Cards de informações adicionais
 * 
 * @returns Página de contato completa
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
      {/* Efeito de partículas decorativas */}
      <ParticlesEffect variant="alt2" />
      
      {/* Header da página */}
      <PageHeader
        title="Vamos Conversar Sobre Seu Projeto"
        description="Estou disponível para projetos freelancer, desenvolvimento de aplicações web, sistemas full-stack e oportunidades de colaboração. Se você precisa de um desenvolvedor comprometido com qualidade, código limpo e resultado que funciona, vamos conversar! Respondo todos os contatos em até 24 horas com atenção e interesse real em entender como posso ajudar a concretizar sua ideia."
      >
        {/* Ícone decorativo */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-cyan-400/20 dark:to-purple-400/20 rounded-full blur-xl opacity-0 dark:opacity-100" 
            aria-hidden="true"
          />
          <Image
            src="/images/delivery.svg"
            alt="Ícone de comunicação"
            fill
            className="object-contain relative z-10 filter dark:brightness-0 dark:invert"
            sizes="96px"
          />
        </div>
      </PageHeader>

      {/* Formulário de contato */}
      <div className="max-w-7xl mx-auto px-6 pb-8 relative z-10">
        <ContactForm />
      </div>

      {/* Cards de informações adicionais */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Horário de atendimento */}
          <Card className="dark:bg-black/30 dark:border-cyan-400/20">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-3 text-cyan-400" aria-hidden="true" />
              <h3 className="font-semibold mb-2 dark:text-cyan-200">
                Horário
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {CONTACT_INFO.workingHours.days}<br />
                {CONTACT_INFO.workingHours.hours}
              </p>
            </CardContent>
          </Card>

          {/* Localização */}
          <Card className="dark:bg-black/30 dark:border-purple-400/20">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-purple-400" aria-hidden="true" />
              <h3 className="font-semibold mb-2 dark:text-purple-200">
                Localização
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {CONTACT_INFO.location.city}<br />
                {CONTACT_INFO.location.country}
              </p>
            </CardContent>
          </Card>

          {/* Telefone */}
          <Card className="dark:bg-black/30 dark:border-pink-400/20">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-3 text-pink-400" aria-hidden="true" />
              <h3 className="font-semibold mb-2 dark:text-pink-200">
                Telefone
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {CONTACT_INFO.phone.number}<br />
                {CONTACT_INFO.phone.whatsapp && 'WhatsApp disponível'}
              </p>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="dark:bg-black/30 dark:border-orange-400/20">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-3 text-orange-400" aria-hidden="true" />
              <h3 className="font-semibold mb-2 dark:text-orange-200">
                Email
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {CONTACT_INFO.email.address}<br />
                {CONTACT_INFO.email.responseTime}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botão Back to Top */}
      <BackToTop />
    </div>
  )
}