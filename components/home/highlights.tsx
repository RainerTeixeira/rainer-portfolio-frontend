/**
 * Seção de Destaques (Highlights)
 * 
 * Exibe cards de serviços profissionais oferecidos.
 * Cada card apresenta título, descrição, badge, ícone e lista de features.
 * 
 * Componente otimizado com React.memo para evitar re-renderizações
 * desnecessárias em atualizações de estado da página.
 * 
 * @fileoverview Seção de highlights/destaques de serviços
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { memo } from "react"
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Code, Cloud, Zap, Briefcase, Sparkles, Star, LucideIcon
} from "lucide-react"
import { SECTION_CLASSES, CARD_CLASSES } from "@/lib/utils"

/**
 * Interface de serviço
 * 
 * Define a estrutura de dados para cada serviço exibido
 * 
 * @interface Service
 * @property {string} title - Título do serviço
 * @property {string} description - Descrição breve do serviço
 * @property {LucideIcon} icon - Componente de ícone Lucide
 * @property {string} badge - Texto do badge de destaque
 * @property {string[]} features - Lista de tecnologias/features do serviço
 */
interface Service {
  title: string
  description: string
  icon: LucideIcon
  badge: string
  features: string[]
}

/**
 * Componente Highlights
 * 
 * Renderiza grid de cards de serviços profissionais.
 * Cada serviço é apresentado em um card com ícone, título,
 * descrição, badge e lista de features técnicas.
 * 
 * Otimizações:
 * - React.memo para prevenir re-renders desnecessários
 * - ServiceCard memoizado separadamente
 * - Grid responsivo (1 coluna mobile -> 2 colunas desktop)
 * 
 * @returns {JSX.Element} Seção de highlights com grid de serviços
 * 
 * @example
 * import { Highlights } from '@/components/home/highlights'
 * 
 * <Highlights />
 */
export const Highlights = memo(function Highlights() {
  /**
   * Array de serviços oferecidos
   * 
   * Cada serviço contém:
   * - title: nome do serviço
   * - description: descrição breve
   * - icon: ícone Lucide representativo
   * - badge: etiqueta de destaque (Popular, Certified, etc)
   * - features: lista de tecnologias/ferramentas usadas
   */
  const services: Service[] = [
    {
      /** Desenvolvimento web e mobile com React/Next.js */
      title: "Desenvolvimento Web & Mobile",
      description: "Criação de sites, sistemas e aplicativos personalizados.",
      icon: Code,
      badge: "Popular",
      features: ["React & Next.js", "React Native", "TypeScript", "PWA"]
    },
    {
      /** Serviços de cloud computing e infraestrutura */
      title: "Cloud Computing",
      description: "Otimização e migração para ambientes de nuvem.",
      icon: Cloud,
      badge: "AWS Certified",
      features: ["AWS Solutions", "Azure Services", "Docker", "Kubernetes"]
    },
    {
      /** Automação e scripting para otimização de processos */
      title: "Automação de Processos",
      description: "Desenvolvimento de scripts e ferramentas para automatizar tarefas.",
      icon: Zap,
      badge: "Eficiência",
      features: ["Python Scripts", "Workflow Automation", "API Integration", "Bots"]
    },
    {
      /** Consultoria estratégica em tecnologia */
      title: "Consultoria em TI",
      description: "Estratégias tecnológicas para impulsionar seu negócio.",
      icon: Briefcase,
      badge: "Estratégico",
      features: ["Tech Strategy", "Architecture Review", "Team Training", "Planning"]
    }
  ]

  /**
   * Renderização da seção
   * 
   * Estrutura:
   * 1. Header com badge, título e descrição
   * 2. Grid de cards de serviços
   */
  return (
    /**
     * Section principal de highlights
     * 
     * Utiliza SECTION_CLASSES.container para padding e layout responsivos
     * - aria-labelledby: conecta com heading para acessibilidade
     */
    <section className={SECTION_CLASSES.container} aria-labelledby="highlights-heading">
      {/**
       * Header da seção
       * - text-center: alinhamento central
       * - mb responsivo: margem inferior que cresce com tela
       */}
      <header className="text-center mb-8 xs:mb-10 sm:mb-12">
        {/**
         * Badge "Serviços" com ícone de sparkles
         * Elemento visual de categorização
         */}
        <Badge variant="secondary" className="mb-3 xs:mb-4 text-xs sm:text-sm">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Serviços
        </Badge>
        
        {/** Título principal da seção (h2 para hierarquia) */}
        <h2 id="highlights-heading" className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-3 xs:mb-4">
          Soluções Tecnológicas
        </h2>
        
        {/** Descrição/subtítulo com largura máxima para legibilidade */}
        <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
          Soluções tecnológicas completas para impulsionar seu negócio
        </p>
      </header>

      {/**
       * Grid de cards de serviços
       * 
       * Layout responsivo:
       * - Mobile: 1 coluna (stack vertical)
       * - md+: 2 colunas
       * - gap responsivo: aumenta com tamanho da tela
       * - role="list": semântica de lista
       */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8" role="list">
        {/**
         * Mapeia array de serviços
         * Cada serviço vira um ServiceCard
         */}
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  )
})

/**
 * Props do componente ServiceCard
 * 
 * @typedef {Object} ServiceCardProps
 * @property {Service} service - Dados do serviço a exibir
 */

/**
 * Interface de props do ServiceCard
 */
interface ServiceCardProps {
  service: Service
}

/**
 * Componente ServiceCard
 * 
 * Renderiza um card individual de serviço com:
 * - Ícone em círculo colorido
 * - Título e descrição
 * - Badge de destaque
 * - Lista de features/tecnologias
 * 
 * Otimizado com React.memo para performance.
 * 
 * @param {ServiceCardProps} props - Propriedades do componente
 * @param {Service} props.service - Dados do serviço
 * @returns {JSX.Element} Card de serviço formatado
 * 
 * @example
 * <ServiceCard service={{
 *   title: "Web Dev",
 *   description: "Sites modernos",
 *   icon: Code,
 *   badge: "Popular",
 *   features: ["React", "Next.js"]
 * }} />
 */
const ServiceCard = memo(function ServiceCard({ service }: ServiceCardProps) {
  /** Extrai componente de ícone do serviço */
  const IconComponent = service.icon
  
  return (
    /**
     * Card principal do serviço
     * 
     * Utiliza CARD_CLASSES.full para hover effects padronizados
     * - role="listitem": item de lista para acessibilidade
     */
    <Card className={CARD_CLASSES.full} role="listitem">
      {/**
       * Header do card
       * - space-y: espaçamento vertical entre elementos
       * - p responsivo: padding que cresce com breakpoints
       */}
      <CardHeader className="space-y-3 xs:space-y-4 p-4 xs:p-5 sm:p-6">
        {/**
         * Container flex para ícone, título e badge
         * - flex-col em mobile (vertical)
         * - flex-row em xs+ (horizontal)
         * - justify-between: espaça elementos
         */}
        <div className="flex flex-col xs:flex-row items-start justify-between gap-3 xs:gap-4">
          {/**
           * Container de ícone e textos
           * - flex: layout horizontal
           * - gap: espaçamento entre ícone e textos
           * - w-full: largura total disponível
           */}
          <div className="flex items-start gap-3 xs:gap-4 w-full">
            {/**
             * Círculo com ícone
             * - p responsivo: padding interno
             * - rounded-full: círculo perfeito
             * - bg-primary: cor de fundo primária
             * - flex-shrink-0: não encolhe com flexbox
             * - aria-hidden: decorativo, não anunciado
             */}
            <div className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-primary flex-shrink-0" aria-hidden="true">
              <IconComponent className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary-foreground" />
            </div>
            
            {/**
             * Container de título e descrição
             * - space-y: espaçamento vertical
             * - flex-1: ocupa espaço disponível
             * - min-w-0: permite text truncation se necessário
             */}
            <div className="space-y-1.5 xs:space-y-2 flex-1 min-w-0">
              {/** Título do serviço com leading tight */}
              <CardTitle className="text-base xs:text-lg sm:text-xl font-semibold leading-tight">
                {service.title}
              </CardTitle>
              
              {/** Descrição com leading relaxed para legibilidade */}
              <CardDescription className="text-muted-foreground text-xs xs:text-sm leading-relaxed">
                {service.description}
              </CardDescription>
            </div>
          </div>
          
          {/**
           * Badge de destaque (Popular, Certified, etc)
           * - text minúsculo em mobile
           * - self-start em mobile, self-auto em xs+
           * - flex-shrink-0: não encolhe
           */}
          <Badge variant="secondary" className="text-[10px] xs:text-xs self-start xs:self-auto flex-shrink-0">
            {service.badge}
          </Badge>
        </div>
      </CardHeader>
      
      {/**
       * Conteúdo do card (features)
       * - space-y: espaçamento vertical
       * - p responsivo: padding que cresce
       * - pt-0: remove padding superior (já tem no header)
       */}
      <CardContent className="space-y-3 xs:space-y-4 p-4 xs:p-5 sm:p-6 pt-0">
        {/** Separador visual entre header e features */}
        <Separator />
        
        {/**
         * Grid de features
         * - 1 coluna em mobile
         * - 2 colunas em xs+
         * - gap pequeno para compactar informações
         */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-2.5">
          {/**
           * Mapeia features do serviço
           * Cada feature é um item com ícone de estrela
           */}
          {service.features.map((feature) => (
            /**
             * Item de feature
             * - flex: ícone + texto horizontal
             * - gap: espaçamento entre ícone e texto
             */
            <div key={feature} className="flex items-center gap-1.5 xs:gap-2 text-muted-foreground">
              {/** Ícone de estrela (decorativo) */}
              <Star className="h-2.5 w-2.5 xs:h-3 xs:w-3 text-primary flex-shrink-0" aria-hidden="true" />
              {/** Nome da feature/tecnologia */}
              <span className="text-xs xs:text-sm leading-tight">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
})
