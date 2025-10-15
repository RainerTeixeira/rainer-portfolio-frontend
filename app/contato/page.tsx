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
import { ParticlesEffect, PageHeader, BackToTop } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Phone, Mail } from "lucide-react"

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
        title="Vamos Conversar Sobre Seu Projeto"
        description="Estou disponível para projetos freelancer, desenvolvimento de aplicações web, sistemas full-stack e oportunidades de colaboração. Se você precisa de um desenvolvedor comprometido com qualidade, código limpo e resultado que funciona, vamos conversar! Respondo todos os contatos em até 24 horas com atenção e interesse real em entender como posso ajudar a concretizar sua ideia."
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
      <div className="max-w-7xl mx-auto px-6 pb-8 relative z-10">
        <ContactForm />
      </div>

      {/** Informações Adicionais */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Horário */}
          <Card className="dark:bg-black/30 dark:border-cyan-400/20">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-3 text-cyan-400" />
              <h3 className="font-semibold mb-2 dark:text-cyan-200">Horário</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Seg - Sex<br />
                9:00 - 18:00
              </p>
            </CardContent>
          </Card>

          {/* Localização */}
          <Card className="dark:bg-black/30 dark:border-purple-400/20">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-purple-400" />
              <h3 className="font-semibold mb-2 dark:text-purple-200">Localização</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Volta Redonda, RJ<br />
                Brasil
              </p>
            </CardContent>
          </Card>

          {/* Telefone */}
          <Card className="dark:bg-black/30 dark:border-pink-400/20">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-3 text-pink-400" />
              <h3 className="font-semibold mb-2 dark:text-pink-200">Telefone</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                +55 24 99913-7382<br />
                WhatsApp disponível
              </p>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="dark:bg-black/30 dark:border-orange-400/20">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-3 text-orange-400" />
              <h3 className="font-semibold mb-2 dark:text-orange-200">Email</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                suporte@rainersoft.com.br<br />
                Resposta em 24h
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}