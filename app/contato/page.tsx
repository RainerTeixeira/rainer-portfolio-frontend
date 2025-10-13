/**
 * Página Contato
 * 
 * Página de contato com formulário completo e informações
 * de contato (email, LinkedIn, GitHub, etc).
 * 
 * Layout:
 * - Header com ícone decorativo e chamada para ação
 * - Componente ContactForm (formulário + info cards)
 * - Efeitos visuais cyberpunk no dark mode
 * - Partículas animadas sutis no fundo
 * 
 * @fileoverview Página de contato
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { ContactForm } from "@/components/contato/contact-form"
import Image from "next/image"
import { ParticlesEffect, PageHeader } from "@/components/ui"

/**
 * Componente ContatoPage
 * 
 * Renderiza página completa de contato.
 * Utiliza componente ContactForm para exibir formulário
 * e informações de contato em layout 2 colunas.
 * 
 * @returns {JSX.Element} Página de contato
 * 
 * @example
 * // Rota: /contato
 * // Renderizado automaticamente pelo Next.js App Router
 */
export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
      {/** Efeito de partículas decorativas (dark mode) */}
      <ParticlesEffect variant="alt2" />
      
      {/** Header da página com ícone */}
      <PageHeader
        title="Contato"
        description="Vamos conversar sobre seu próximo projeto! Entre em contato e vamos transformar suas ideias em realidade digital."
      >
        {/** Ícone de comunicação */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-cyan-400/20 dark:to-purple-400/20 rounded-full blur-xl opacity-0 dark:opacity-100"></div>
          <Image
            src="/images/delivery.svg"
            alt="Ícone de comunicação"
            fill
            className="object-contain relative z-10 filter dark:brightness-0 dark:invert"
            sizes="96px"
          />
        </div>
      </PageHeader>

      {/** 
       * Conteúdo da página
       * Renderiza componente ContactForm que contém
       * o formulário e cards de informações de contato
       */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <ContactForm />
      </div>
    </div>
  )
}