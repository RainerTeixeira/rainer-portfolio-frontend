/**
 * Seção Sobre Mim (About Section)
 * 
 * Card de apresentação pessoal/profissional com:
 * - Avatar/foto
 * - Estatísticas (anos de experiência, projetos, clientes)
 * - Descrição resumida
 * - Call-to-action para página completa
 * 
 * Componente otimizado com React.memo para performance.
 * 
 * @fileoverview Seção de apresentação profissional na home
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Target, Lightbulb, Rocket, Award, ArrowRight, LucideIcon } from "lucide-react"
import Link from "next/link"
import { SECTION_CLASSES, CARD_CLASSES } from "@/lib/utils"

/**
 * Item de estatística
 * 
 * @typedef {Object} StatItem
 * @property {LucideIcon} icon - Ícone representativo
 * @property {string} value - Valor numérico (ex: "5+ Anos")
 * @property {string} label - Label descritivo (ex: "Experiência")
 */

/**
 * Props do componente AboutSection
 * 
 * @interface AboutSectionProps
 * @property {StatItem[]} [stats] - Array opcional de estatísticas customizadas
 */
interface AboutSectionProps {
  stats?: Array<{
    icon: LucideIcon
    value: string
    label: string
  }>
}

/**
 * Componente AboutSection
 * 
 * Renderiza card de apresentação profissional com avatar,
 * estatísticas e call-to-action.
 * 
 * Aceita estatísticas customizadas via props ou usa defaults.
 * 
 * Características:
 * - Avatar com imagem ou fallback
 * - Grid de 3 estatísticas
 * - Texto de bio resumida
 * - Botão CTA para página /sobre completa
 * - Responsivo e otimizado
 * 
 * @param {AboutSectionProps} props - Propriedades do componente
 * @param {StatItem[]} [props.stats] - Estatísticas customizadas (opcional)
 * @returns {JSX.Element} Card de apresentação profissional
 * 
 * @example
 * // Com estatísticas padrão
 * <AboutSection />
 * 
 * @example
 * // Com estatísticas customizadas
 * <AboutSection stats={[
 *   { icon: Target, value: "10+", label: "Anos" }
 * ]} />
 */
export const AboutSection = memo(function AboutSection({ stats }: AboutSectionProps) {
  /**
   * Estatísticas padrão
   * Usadas quando props.stats não é fornecido
   */
  const defaultStats = [
    /** Anos de experiência profissional */
    { icon: Target, value: "5+ Anos", label: "Experiência" },
    
    /** Número de projetos realizados */
    { icon: Lightbulb, value: "100+", label: "Projetos" },
    
    /** Número de clientes atendidos */
    { icon: Rocket, value: "50+", label: "Clientes" }
  ]

  /** Usa stats customizado ou fallback para default */
  const finalStats = stats || defaultStats

  /**
   * Renderização da seção
   * 
   * Estrutura:
   * 1. Header: Avatar + título + badge
   * 2. Content: Grid de stats + bio + CTA button
   */
  return (
    /**
     * Section principal de about
     * 
     * Utiliza SECTION_CLASSES.container para padding e layout responsivos
     * - aria-labelledby: conecta com heading
     */
    <section className={SECTION_CLASSES.container} aria-labelledby="about-heading">
      {/**
       * Card principal
       * 
       * Utiliza CARD_CLASSES.full para hover effects padronizados
       */}
      <Card className={CARD_CLASSES.full}>
        {/**
         * Header centralizado com avatar e títulos
         * - text-center: tudo centralizado
         * - p responsivo: padding adaptável
         */}
        <CardHeader className="text-center p-4 xs:p-5 sm:p-6">
          {/**
           * Container de avatar e títulos
           * - flex-col: layout vertical
           * - items-center: centraliza horizontalmente
           * - gap responsivo: espaçamento vertical
           */}
          <div className="flex flex-col items-center gap-3 xs:gap-4 mb-3 xs:mb-4">
            {/**
             * Avatar com imagem de perfil
             * - Tamanho responsivo (64px -> 80px)
             * - border-2: borda na cor primária
             */}
            <Avatar className="h-16 w-16 xs:h-18 xs:w-18 sm:h-20 sm:w-20 border-2 border-primary">
              {/** Imagem do avatar (se disponível) */}
              <AvatarImage src="/images/t1.jpg" alt="Rainer Teixeira" />
              
              {/**
               * Fallback com iniciais se imagem falhar
               * - bg-primary: fundo na cor primária
               * - RS: iniciais de Rainer Soft
               */}
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl xs:text-2xl">
                RS
              </AvatarFallback>
            </Avatar>
            
            {/**
             * Container de título e badge
             * - space-y: espaçamento vertical
             */}
            <div className="space-y-1.5 xs:space-y-2">
              {/** Título da seção (h2 para hierarquia) */}
              <CardTitle id="about-heading" className="text-2xl xs:text-3xl md:text-4xl font-bold">
                Sobre Mim
              </CardTitle>
              
              {/**
               * Badge de cargo/função
               * - variant="secondary": estilo secundário
               * - Ícone de troféu para destaque
               */}
              <Badge variant="secondary" className="text-xs xs:text-sm">
                <Award className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-1" />
                Full-Stack Developer
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        {/**
         * Conteúdo do card
         * - text-center: tudo centralizado
         * - space-y: espaçamento vertical entre elementos
         * - p responsivo: padding adaptável
         */}
        <CardContent className="text-center space-y-6 xs:space-y-8 p-4 xs:p-5 sm:p-6">
          {/**
           * Grid de estatísticas
           * 
           * Layout responsivo:
           * - Mobile: 1 coluna (stack vertical)
           * - xs+: 3 colunas
           * - gap responsivo
           */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 xs:gap-6">
            {/**
             * Mapeia estatísticas (experiência, projetos, clientes)
             * Cada stat tem ícone, valor grande e label
             */}
            {finalStats.map((stat, index) => {
              /** Extrai componente de ícone */
              const IconComponent = stat.icon
              
              return (
                /**
                 * Item de estatística
                 * - flex-col: layout vertical
                 * - items-center: centraliza tudo
                 * - gap: espaçamento entre elementos
                 */
                <div key={index} className="flex flex-col items-center gap-2 xs:gap-3">
                  {/**
                   * Círculo com ícone
                   * - rounded-full: círculo perfeito
                   * - bg-primary: fundo na cor primária
                   * - aria-hidden: decorativo
                   */}
                  <div className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-primary" aria-hidden="true">
                    <IconComponent className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  
                  {/**
                   * Valor e label da estatística
                   * - space-y: pequeno espaçamento vertical
                   */}
                  <div className="space-y-0.5 xs:space-y-1">
                    {/** Valor grande e em negrito */}
                    <div className="text-xl xs:text-2xl font-bold text-foreground">{stat.value}</div>
                    
                    {/** Label descritivo menor */}
                    <div className="text-xs xs:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/**
           * Parágrafo de bio/descrição
           * - max-w-4xl: largura máxima para legibilidade
           * - mx-auto: centralizado
           * - leading-relaxed: espaçamento entre linhas confortável
           * - px-2: padding lateral pequeno
           */}
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
            Com mais de 5 anos de experiência em desenvolvimento de software,
            especializo-me em criar soluções digitais inovadoras que resolvem problemas reais.
            Transformo ideias em aplicações funcionais e escaláveis.
          </p>
          
          {/**
           * Link para página /sobre completa
           * - inline-block: permite padding no Link
           */}
          <Link href="/sobre" className="inline-block">
            {/**
             * Botão CTA com ícone de seta
             * - size="lg": tamanho grande para destaque
             * - px responsivo: padding horizontal adaptável
             * - Ícone ArrowRight à direita do texto
             */}
            <Button size="lg" className="px-6 xs:px-8 text-sm xs:text-base">
              Ver Perfil Completo
              <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  )
})
