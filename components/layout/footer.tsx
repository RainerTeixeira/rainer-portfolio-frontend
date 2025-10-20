/**
 * Footer Component
 * 
 * Rodapé responsivo profissional com design premium e tema dual.
 * Organiza informações em grid de 4 colunas com cards interativos.
 * 
 * Características:
 * - Grid responsivo (1 coluna mobile → 4 colunas desktop)
 * - Tema dual: minimalista no light mode, cyberpunk no dark mode
 * - Cards com hover effects e glassmorphism
 * - Partículas animadas decorativas no dark mode
 * - Ícones dinâmicos configuráveis via Lucide React
 * - Acessibilidade completa (ARIA labels, semântica HTML5)
 * 
 * @fileoverview Componente de rodapé global da aplicação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Constants & Configuration
// ============================================================================

import { SITE_CONFIG, FOOTER_CONFIG } from "@/constants"

// ============================================================================
// Icons
// ============================================================================

import { 
  Mail, Phone, MapPin, Github as GitHubIcon, Linkedin, ExternalLink, 
  Globe, Zap, Users, Cloud, Layers, Code, Database, 
  Server, Cpu, Network, Shield, Settings, Monitor, 
  Smartphone, Wifi, Lock, FileText, Terminal, GitBranch, Package
} from "lucide-react"

// ============================================================================
// Utils
// ============================================================================

import { getIcon, cn } from "@/lib/utils"

// ============================================================================
// Constants
// ============================================================================

/**
 * Estilos constantes do footer
 * 
 * Objeto imutável com classes CSS reutilizáveis para elementos do footer.
 * Separar estilos facilita manutenção e garante consistência visual.
 * 
 * @constant
 * @type {Object}
 * @readonly
 * 
 * @property {string} card - Classes para cards de seção
 * @property {string} title - Classes para títulos de seção
 * @property {string} item - Classes para itens de informação
 * @property {string} icon - Classes para ícones
 * @property {string} text - Classes para texto comum
 * @property {string} link - Classes para links externos
 */
const FOOTER_STYLES = {
  /** Estilo de card para cada seção do footer - Premium */
  card: cn(
    "text-left bg-card/60 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8",
    "border border-border/50 dark:border-cyan-400/20 hover:border-primary/40 dark:hover:border-cyan-400/50",
    "hover:bg-card/80 dark:hover:bg-black/70 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-cyan-500/20",
    "transition-all duration-500 h-full flex flex-col group",
    "relative overflow-hidden",
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/0 before:via-primary/0 before:to-primary/0",
    "hover:before:from-primary/5 hover:before:via-transparent hover:before:to-primary/5",
    "dark:hover:before:from-cyan-400/5 dark:hover:before:via-transparent dark:hover:before:to-purple-400/5",
    "before:transition-all before:duration-500 before:pointer-events-none"
  ),
  
  /** Estilo dos títulos de seção com hover effect */
  title: cn(
    "text-base sm:text-lg font-semibold text-foreground dark:text-cyan-300",
    "mb-4 sm:mb-6 md:mb-8 group-hover:text-primary dark:group-hover:text-cyan-200",
    "transition-colors duration-300"
  ),
  
  /** Estilo de item de informação com ícone */
  item: cn(
    "flex items-start justify-start gap-1 p-1.5 xs:p-2 sm:p-3 rounded-lg",
    "hover:bg-muted/30 dark:hover:bg-cyan-400/10 transition-colors",
    "border border-transparent dark:hover:border-cyan-400/20"
  ),
  
  /** Estilo dos ícones (tamanho responsivo, cor primária) */
  icon: cn(
    "h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary dark:text-cyan-400",
    "mt-0.5 flex-shrink-0"
  ),
  
  /** Estilo de texto padrão (responsivo, cor muted) */
  text: cn(
    "text-xs sm:text-sm text-muted-foreground dark:text-gray-300"
  ),
  
  /** Estilo de link externo com hover effect */
  link: cn(
    "flex items-center justify-start gap-1 text-xs sm:text-sm",
    "text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-cyan-300",
    "transition-colors group p-1.5 xs:p-2 sm:p-3 rounded-lg",
    "hover:bg-muted/30 dark:hover:bg-cyan-400/10 border border-transparent dark:hover:border-cyan-400/20"
  )
} as const

/**
 * Mapeamento de ícones disponíveis
 * 
 * Permite renderização dinâmica de ícones baseada em string.
 * Usado em conjunto com getIcon() para buscar componentes.
 */
const ICON_COMPONENTS = {
  Globe,
  Zap,
  Users,
  Cloud,
  Layers,
  Code,
  Database,
  Server,
  Cpu,
  Network,
  Shield,
  Settings,
  Monitor,
  Smartphone,
  Wifi,
  Lock,
  FileText,
  Terminal,
  GitBranch,
  Package,
  Github: GitHubIcon
} as const

// ============================================================================
// Types
// ============================================================================

/**
 * Nomes de ícones válidos
 */
type IconName = keyof typeof ICON_COMPONENTS

/**
 * Tipo base para componentes de ícone
 */
type IconComponent = React.ComponentType<{ 
  className?: string
  "aria-hidden"?: boolean 
}>

/**
 * Tipo de conteúdo de contato
 */
type ContactItemType = "text" | "link" | "tel"

/**
 * Props do item de contato
 */
interface ContactItemProps {
  readonly icon: IconComponent
  readonly label: string
  readonly value: string
  readonly href?: string
  readonly type?: ContactItemType
}

/**
 * Props do link externo
 */
interface ExternalLinkItemProps {
  readonly icon: IconComponent
  readonly label: string
  readonly href: string
  readonly ariaLabel: string
}

// ============================================================================
// Sub-components
// ============================================================================

/**
 * Item de informação de contato
 * 
 * Renderiza ícone, label e valor de contato.
 * Se href fornecido, valor se torna link clicável.
 * 
 * @param icon - Componente de ícone Lucide
 * @param label - Label descritivo (ex: "Email")
 * @param value - Valor a exibir (ex: "contato@example.com")
 * @param href - URL opcional para link (mailto:, tel:, etc)
 * @param type - Tipo de conteúdo para ARIA label
 * 
 * @example
 * ```tsx
 * <ContactItem 
 *   icon={Mail} 
 *   label="Email" 
 *   value="contato@example.com"
 *   href="mailto:contato@example.com"
 *   type="text"
 * />
 * ```
 */
function ContactItem({ icon: Icon, label, value, href, type = "text" }: ContactItemProps) {
  // Determinar label de acessibilidade baseado no tipo
  const getAriaLabel = () => {
    switch (type) {
      case "link":
        return `Visitar ${value}`
      case "tel":
        return `Ligar para ${value}`
      default:
        return `Enviar email para ${value}`
    }
  }

  // Renderizar como link ou texto
  const contentElement = href ? (
    <a 
      href={href} 
      className={cn(
        FOOTER_STYLES.text,
        "text-muted-foreground hover:text-primary transition-colors break-words"
      )}
      aria-label={getAriaLabel()}
    >
      {value}
    </a>
  ) : (
    <p className={cn(FOOTER_STYLES.text, "text-muted-foreground")}>
      {value}
    </p>
  )

  return (
    <div className={FOOTER_STYLES.item}>
      <Icon className={FOOTER_STYLES.icon} aria-hidden={true} />
      <div className="min-w-0 flex-1">
        <p className={cn(FOOTER_STYLES.text, "font-medium text-foreground")}>
          {label}
        </p>
        {contentElement}
      </div>
    </div>
  )
}

/**
 * Item de link externo
 * 
 * Renderiza link que abre em nova aba com ícone e indicador visual.
 * 
 * Características:
 * - Abre em nova aba (target="_blank")
 * - Segurança (rel="noopener noreferrer")
 * - Ícone de external link aparece no hover
 * - ARIA label descritivo
 * 
 * @param icon - Componente de ícone Lucide
 * @param label - Texto do link
 * @param href - URL de destino
 * @param ariaLabel - Label descritivo para acessibilidade
 * 
 * @example
 * ```tsx
 * <ExternalLinkItem 
 *   icon={Github} 
 *   label="GitHub" 
 *   href="https://github.com/user"
 *   ariaLabel="Visitar perfil no GitHub (abre em nova aba)"
 * />
 * ```
 */
function ExternalLinkItem({ icon: Icon, label, href, ariaLabel }: ExternalLinkItemProps) {
  return (
    <li>
      <a 
        href={href} 
        className={FOOTER_STYLES.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        <Icon className="h-3.5 sm:h-4 w-3.5 sm:w-4" aria-hidden={true} />
        <span>{label}</span>
        <ExternalLink 
          className="h-2.5 sm:h-3 w-2.5 sm:w-3 opacity-0 group-hover:opacity-100 transition-opacity" 
          aria-hidden={true} 
        />
      </a>
    </li>
  )
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal do rodapé
 * 
 * Renderiza footer completo com 4 seções em grid responsivo:
 * 1. **Sobre** - Informações da empresa/profissional
 * 2. **Contato** - Email, telefone e localização
 * 3. **Serviços** - Lista de serviços oferecidos
 * 4. **Links** - Redes sociais e links externos
 * 
 * Design Dual:
 * - Light mode: minimalista e limpo
 * - Dark mode: cyberpunk com partículas e neon
 * 
 * @returns Rodapé global da aplicação
 * 
 * @example
 * ```tsx
 * // Usado automaticamente no layout raiz
 * <Footer />
 * ```
 */
export function Footer() {
  return (
    <footer 
      className="relative border-t border-border/40 dark:border-cyan-400/30 bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-black/60 overflow-hidden" 
      role="contentinfo"
    >
      {/* Camada de brilho de fundo premium */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />
      
      {/* Partículas decorativas animadas (apenas dark mode) */}
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60 shadow-lg shadow-cyan-400/50" />
        <div 
          className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-40 shadow-lg shadow-purple-400/50" 
          style={{ animationDelay: '1s' }} 
        />
        <div 
          className="absolute bottom-40 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-50 shadow-lg shadow-pink-400/50" 
          style={{ animationDelay: '2s' }} 
        />
      </div>
      
      {/* Divisor premium no topo */}
      <div 
        className="relative h-1 bg-gradient-to-r from-transparent via-cyan-400/50 dark:via-cyan-400/30 to-transparent" 
        aria-hidden="true"
      />
      
      {/**
       * Container principal do conteúdo
       * - max-w-7xl: largura máxima de 1280px
       * - mx-auto: centraliza horizontalmente
       * - px/py responsivos: padding que cresce com breakpoints
       * - z-10: acima das partículas de fundo
       */}
      <div className="w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 relative z-10">
      
        {/**
         * Grid principal de seções
         * 
         * Layout responsivo:
         * - Mobile: 1 coluna (stack vertical)
         * - Tablet: 2 colunas
         * - Desktop: 4 colunas
         * - gap responsivo: aumenta com tamanho da tela
         */}
        <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 w-full">
          
          {/* Informações da empresa */}
          {/**
           * Card de informações da empresa
           * 
           * - address: elemento semântico para informações de contato
           * - not-italic: remove itálico padrão de <address>
           * - space-y: espaçamento vertical entre elementos filhos
           * - flex flex-col: layout vertical
           */}
          <address className={`${FOOTER_STYLES.card} not-italic`}>
            <div className="space-y-2 xs:space-y-3 sm:space-y-4 flex-1 flex flex-col">
              <header>
                {/** Nome da empresa em fonte mono cyberpunk no dark mode com hover effect */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground dark:text-cyan-200 mb-2 dark:font-mono dark:tracking-wider group-hover:text-primary dark:group-hover:text-cyan-100 transition-colors duration-300">
                  {SITE_CONFIG.name}
                </h3>
                
                {/** Título profissional em cor primária com gradiente */}
                <p className={`${FOOTER_STYLES.text} font-semibold text-primary dark:text-cyan-400 mb-2 sm:mb-3 dark:font-mono text-sm sm:text-base`}>
                  {SITE_CONFIG.title}
                </p>
                
                {/** Descrição com leading relaxado para legibilidade */}
                <p className={`${FOOTER_STYLES.text} text-muted-foreground dark:text-gray-300 leading-relaxed text-xs sm:text-sm`}>
                  {SITE_CONFIG.description}
                </p>
              </header>
              {/**
               * Badge de experiência no final do card
               * - mt-auto: empurra para o final do flex container
               * - Gradiente sutil de background
               * - Bordas arredondadas (pill)
               * - Hover effects com sombra e escala
               */}
              <div className="flex justify-start mt-auto pt-3 sm:pt-4">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-cyan-400/10 dark:via-purple-400/5 dark:to-purple-400/10 text-primary dark:text-cyan-300 rounded-full text-xs sm:text-sm font-semibold border border-primary/20 dark:border-cyan-400/20 hover:border-primary/40 dark:hover:border-cyan-400/40 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-cyan-500/20 transition-all duration-300 dark:font-mono hover:scale-105 cursor-default inline-flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  {SITE_CONFIG.experience}
                </span>
              </div>
            </div>
          </address>

          {/* Informações de contato */}
          {/**
           * Card de contato
           * Lista todos os meios de contato com ícones e links
           */}
          <section className={FOOTER_STYLES.card}>
            {/** Título da seção */}
            <h4 className={FOOTER_STYLES.title}>Contato</h4>
            
            {/**
             * Address semântico com lista de contatos
             * - not-italic: remove estilo itálico padrão
             * - space-y: espaçamento vertical entre itens
             * - flex-1: ocupa espaço disponível no card
             */}
            <address className="space-y-2 xs:space-y-3 sm:space-y-4 not-italic flex-1">
              {/**
               * Email com link mailto
               * Ícone dinâmico baseado em FOOTER_CONFIG, fallback para Mail
               */}
              <ContactItem 
                icon={getIcon(ICON_COMPONENTS, FOOTER_CONFIG.contact.email.icon as IconName, Mail)} 
                label="Email" 
                value={SITE_CONFIG.email} 
                href={`mailto:${SITE_CONFIG.email}`}
                type="text"
              />
              
              {/**
               * Telefone com link tel
               * Permite discar diretamente em dispositivos móveis
               */}
              <ContactItem 
                icon={getIcon(ICON_COMPONENTS, FOOTER_CONFIG.contact.phone.icon as IconName, Phone)} 
                label="Telefone" 
                value={SITE_CONFIG.phone} 
                href={`tel:${SITE_CONFIG.phone}`}
                type="tel"
              />
              
              {/**
               * Localização (sem link)
               * Apenas informação textual
               */}
              <ContactItem 
                icon={getIcon(ICON_COMPONENTS, FOOTER_CONFIG.contact.location.icon as IconName, MapPin)} 
                label="Localização" 
                value={SITE_CONFIG.location}
              />
            </address>
          </section>

          {/* Serviços */}
          {/**
           * Card de serviços oferecidos
           * Lista todos os serviços profissionais com ícones
           */}
          <section className={FOOTER_STYLES.card}>
            {/** Título da seção de serviços */}
            <h4 className={FOOTER_STYLES.title}>Serviços</h4>
            
            {/**
             * Lista de serviços
             * - space-y: espaçamento vertical
             * - flex-1: ocupa espaço disponível
             * - role="list": semântica explícita
             */}
            <ul className="space-y-1 xs:space-y-2 sm:space-y-3 flex-1" role="list">
              {/**
               * Mapeia serviços de FOOTER_CONFIG
               * Cada serviço tem ícone dinâmico e hover effects
               */}
              {FOOTER_CONFIG.services.items.map((service) => {
                /** Resolve componente de ícone baseado em string name com helper */
                const IconComponent = getIcon(ICON_COMPONENTS, service.icon as IconName, Layers)
                return (
                  /**
                   * Item de serviço
                   * - group/item: permite hover effects em filhos
                   * - Ícone escala 110% no hover (scale-110)
                   * - Background e borda cyan no hover (dark mode)
                   */
                  <li key={service.name} className={`${FOOTER_STYLES.text} text-muted-foreground dark:text-gray-400 flex items-center justify-start gap-2 p-2 sm:p-3 rounded-lg hover:bg-muted/30 dark:hover:bg-cyan-400/10 hover:text-foreground dark:hover:text-cyan-300 transition-all duration-300 group/item border border-transparent dark:hover:border-cyan-400/20`}>
                    {/** Ícone do serviço com animação de escala */}
                    <IconComponent className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary dark:text-cyan-400 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" aria-hidden="true" />
                    {/** Nome do serviço */}
                    {service.name}
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Links rápidos */}
          {/**
           * Card de links para redes sociais
           * Navegação semântica com aria-label
           */}
          <nav className={FOOTER_STYLES.card} aria-label="Links externos">
            {/** Título da seção de links */}
            <h4 className={FOOTER_STYLES.title}>Links</h4>
            
            {/**
             * Lista de links externos
             * - space-y: espaçamento vertical
             * - flex-1: ocupa espaço disponível
             * - role="list": semântica explícita
             */}
            <ul className="space-y-1 xs:space-y-2 sm:space-y-3 flex-1" role="list">
              {/** Link para GitHub com ícone dinâmico */}
              <ExternalLinkItem 
                icon={getIcon(ICON_COMPONENTS, FOOTER_CONFIG.links.github.icon as IconName, GitHubIcon)} 
                label="GitHub" 
                href={SITE_CONFIG.github}
                ariaLabel="Visitar perfil no GitHub (abre em nova aba)"
              />
              
              {/** Link para LinkedIn com ícone dinâmico */}
              <ExternalLinkItem 
                icon={getIcon(ICON_COMPONENTS, FOOTER_CONFIG.links.linkedin.icon as IconName, Linkedin)} 
                label="LinkedIn" 
                href={SITE_CONFIG.linkedin}
                ariaLabel="Visitar perfil no LinkedIn (abre em nova aba)"
              />
              
              {/** Link para website oficial com ícone dinâmico */}
              <ExternalLinkItem 
                icon={getIcon(ICON_COMPONENTS, FOOTER_CONFIG.links.portfolio.icon as IconName, ExternalLink)} 
                label="Website" 
                href={SITE_CONFIG.url}
                ariaLabel="Visitar website oficial (abre em nova aba)"
              />
            </ul>
          </nav>
        </section>

        {/* Seção Inferior */}
        {/**
         * Seção de copyright e créditos
         * 
         * - mt: margin-top responsivo para separar do grid
         * - pt: padding-top após borda
         * - border-t: linha separadora superior
         */}
        <section className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border/50 dark:border-cyan-400/20">
          {/**
           * Container flex responsivo
           * - flex-col: vertical em mobile (empilhado)
           * - sm:flex-row: horizontal em desktop (lado a lado)
           * - justify-between: espaça copyright e "made with love" em desktop
           * - items-start: alinhado à esquerda
           * - gap responsivo: menor em mobile, maior em desktop
           */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 sm:gap-6">
            {/* Bloco de copyright */}
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-foreground dark:text-cyan-300 mb-2 flex items-center gap-2 justify-center sm:justify-start">
                <span className="inline-block w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></span>
                &copy; {new Date().getFullYear()} {SITE_CONFIG.name}
              </p>
              
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                Desenvolvido com <span className="font-semibold text-foreground dark:text-cyan-400">Next.js 15</span>, <span className="font-semibold text-foreground dark:text-purple-400">React 19</span> e <span className="font-semibold text-foreground dark:text-pink-400">TypeScript</span>
              </p>
            </div>
            
            {/* Badges de qualidade */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-400/20 dark:to-emerald-400/20 border border-green-400/30">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-green-700 dark:text-green-300">Online</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 dark:from-cyan-400/20 dark:to-blue-400/20 border border-cyan-400/30">
                <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300">Made with ❤️ in Brasil</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}