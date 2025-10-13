/**
 * Seção de Contato
 * 
 * Card de call-to-action para contato com informações resumidas
 * e botão para página de contato completa.
 * 
 * Apresenta:
 * - Email, telefone e localização em cards
 * - Botão CTA para página /contato
 * 
 * Componente otimizado com React.memo.
 * 
 * @fileoverview Seção de contato resumida na home
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, LucideIcon } from "lucide-react"
import Link from "next/link"
import { SECTION_CLASSES, CARD_CLASSES } from "@/lib/utils"

/**
 * Interface de informação de contato
 * 
 * @interface ContactInfo
 * @property {LucideIcon} icon - Ícone representativo (Mail, Phone, MapPin)
 * @property {string} title - Título do meio de contato
 * @property {string} content - Valor do contato (email, telefone, endereço)
 */
interface ContactInfo {
  icon: LucideIcon
  title: string
  content: string
}

/**
 * Componente ContactSection
 * 
 * Renderiza seção de contato com grid de informações e CTA.
 * 
 * Estrutura:
 * 1. Header com badge e título
 * 2. Grid de 3 cards de contato (email, telefone, localização)
 * 3. Separador visual
 * 4. Botão CTA para página /contato
 * 
 * @returns {JSX.Element} Seção de contato completa
 * 
 * @example
 * import { ContactSection } from '@/components/home/contact-section'
 * 
 * <ContactSection />
 */
export const ContactSection = memo(function ContactSection() {
  /**
   * Array de informações de contato
   * 
   * Cada item contém:
   * - icon: ícone Lucide apropriado
   * - title: título do meio de contato
   * - content: valor/informação de contato
   */
  const contactInfo: ContactInfo[] = [
    {
      /** Email profissional */
      icon: Mail,
      title: "Email",
      content: "suporte@rainersoft.com.br"
    },
    {
      /** Telefone/WhatsApp com código do país */
      icon: Phone,
      title: "Telefone",
      content: "+(55) 24 99913-7382"
    },
    {
      /** Localização geográfica */
      icon: MapPin,
      title: "Localização",
      content: "Volta Redonda, RJ - Brasil"
    }
  ]

  /**
   * Renderização da seção
   * 
   * Estrutura:
   * 1. Header: Badge + título + CTA text
   * 2. Content: Grid de cards + separador + botão
   */
  return (
    /**
     * Section principal de contato
     * 
     * Utiliza SECTION_CLASSES.container para padding e layout responsivos
     * - aria-labelledby: conecta com heading
     */
    <section className={SECTION_CLASSES.container} aria-labelledby="contact-heading">
      {/**
       * Card principal
       * 
       * Utiliza CARD_CLASSES.full para hover effects padronizados
       */}
      <Card className={CARD_CLASSES.full}>
        {/**
         * Header centralizado
         * - text-center: alinhamento central
         * - p responsivo: padding adaptável
         */}
        <CardHeader className="text-center p-4 xs:p-5 sm:p-6">
          {/**
           * Badge "Contato" com ícone de email
           * - w-fit mx-auto: largura mínima, centralizado
           */}
          <Badge variant="secondary" className="mb-3 xs:mb-4 w-fit mx-auto text-xs sm:text-sm">
            <Mail className="w-3 h-3 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" />
            Contato
          </Badge>
          
          {/** Título da seção (h2 para hierarquia) */}
          <CardTitle id="contact-heading" className="text-2xl xs:text-3xl font-bold">
            Entre em Contato
          </CardTitle>
          
          {/** Texto de call-to-action persuasivo */}
          <p className="text-base xs:text-lg sm:text-xl text-muted-foreground mt-2 px-2">
            Pronto para transformar sua ideia em realidade?
          </p>
        </CardHeader>
        
        {/**
         * Conteúdo do card
         * - text-center: centralizado
         * - space-y: espaçamento vertical generoso
         * - p responsivo: padding adaptável
         */}
        <CardContent className="space-y-6 xs:space-y-8 p-4 xs:p-5 sm:p-6">
          {/**
           * Grid de cards de contato
           * 
           * Layout responsivo:
           * - Mobile: 1 coluna
           * - sm: 2 colunas
           * - md+: 3 colunas
           * - gap responsivo
           */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6">
            {/**
             * Mapeia informações de contato
             * Cada info vira um ContactCard
             */}
            {contactInfo.map((item, index) => (
              <ContactCard key={index} item={item} />
            ))}
          </div>
          
          {/** Separador visual entre cards e botão */}
          <Separator />
          
          {/**
           * Container do botão CTA
           * - text-center: centraliza o link
           */}
          <div className="text-center">
            {/** Link para página de contato completa */}
            <Link href="/contato">
              {/**
               * Botão CTA principal
               * - size="lg": tamanho grande para destaque
               * - px responsivo: padding horizontal adaptável
               * - Ícone de email à esquerda do texto
               */}
              <Button size="lg" className="px-6 xs:px-8 text-sm xs:text-base">
                <Mail className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
})

/**
 * Props do componente ContactCard
 * 
 * @typedef {Object} ContactCardProps
 * @property {ContactInfo} item - Informação de contato a exibir
 */

/**
 * Componente ContactCard
 * 
 * Renderiza um card pequeno com informação de contato individual.
 * Inclui ícone em círculo, título e valor.
 * 
 * Otimizado com React.memo.
 * 
 * @param {ContactCardProps} props - Propriedades do componente
 * @param {ContactInfo} props.item - Informação de contato
 * @returns {JSX.Element} Card de contato formatado
 * 
 * @example
 * <ContactCard item={{
 *   icon: Mail,
 *   title: "Email",
 *   content: "email@example.com"
 * }} />
 */
const ContactCard = memo(function ContactCard({ item }: { item: ContactInfo }) {
  /** Extrai componente de ícone */
  const IconComponent = item.icon
  
  return (
    /**
     * Card individual de contato
     * 
     * Utiliza CARD_CLASSES.full para hover effects padronizados
     * - text-center: todo conteúdo centralizado
     */
    <Card className={`text-center ${CARD_CLASSES.full}`}>
      {/**
       * Conteúdo do card
       * - p responsivo: padding adaptável
       * - space-y: espaçamento vertical
       */}
      <CardContent className="p-4 xs:p-5 sm:p-6 space-y-3 xs:space-y-4">
        {/**
         * Círculo com ícone
         * - rounded-full: círculo perfeito
         * - bg-primary: fundo primário
         * - w-fit mx-auto: largura mínima, centralizado
         */}
        <div className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-primary w-fit mx-auto">
          <IconComponent className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary-foreground" />
        </div>
        
        {/**
         * Textos do card
         * - space-y: espaçamento vertical pequeno
         */}
        <div className="space-y-1 xs:space-y-2">
          {/** Título (Email, Telefone, etc) */}
          <h3 className="font-semibold text-base xs:text-lg">{item.title}</h3>
          
          {/**
           * Conteúdo (valor de contato)
           * - leading-relaxed: espaçamento confortável
           * - break-words: quebra palavras longas se necessário
           */}
          <p className="text-muted-foreground text-xs xs:text-sm leading-relaxed break-words">{item.content}</p>
        </div>
      </CardContent>
    </Card>
  )
})
