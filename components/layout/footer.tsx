import { SITE_CONFIG, FOOTER_CONFIG } from "@/constants"
import { 
  Mail, Phone, MapPin, Github, Linkedin, ExternalLink, 
  Globe, Zap, Users, Cloud, Layers, Code, Database, 
  Server, Cpu, Network, Shield, Settings, Monitor, 
  Smartphone, Wifi, Lock, FileText, Terminal, GitBranch, Package
} from "lucide-react"

// Estilos (modo claro limpo, modo escuro cyberpunk)
const FOOTER_STYLES = {
  card: "text-left bg-card/40 dark:bg-black/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-border/40 dark:border-cyan-400/20 hover:border-border/70 dark:hover:border-cyan-400/50 hover:bg-card/60 dark:hover:bg-black/60 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-cyan-500/10 transition-all duration-500 h-full flex flex-col group backdrop-blur-sm",
  title: "text-base sm:text-lg font-semibold text-foreground dark:text-cyan-300 mb-4 sm:mb-6 md:mb-8 group-hover:text-primary dark:group-hover:text-cyan-200 transition-colors duration-300",
  item: "flex items-start justify-start gap-1 p-2 sm:p-3 rounded-lg hover:bg-muted/30 dark:hover:bg-cyan-400/10 transition-colors border border-transparent dark:hover:border-cyan-400/20",
  icon: "h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary dark:text-cyan-400 mt-0.5 flex-shrink-0",
  text: "text-xs sm:text-sm text-muted-foreground dark:text-gray-300",
  link: "flex items-center justify-start gap-1 text-xs sm:text-sm text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-cyan-300 transition-colors group p-2 sm:p-3 rounded-lg hover:bg-muted/30 dark:hover:bg-cyan-400/10 border border-transparent dark:hover:border-cyan-400/20"
} as const

// Mapeamento de nomes de ícones para componentes
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
  Package
} as const

type IconName = keyof typeof ICON_COMPONENTS

// Componente para itens de contato
function ContactItem({ icon: Icon, label, value, href, type = "text" }: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  value: string
  href?: string
  type?: "text" | "link"
}) {
  const content = href ? (
    <a 
      href={href} 
      className={`${FOOTER_STYLES.text} text-muted-foreground hover:text-primary transition-colors break-words`}
      aria-label={`${type === "link" ? "Visitar" : type === "text" ? "Enviar email para" : "Ligar para"} ${value}`}
    >
      {value}
    </a>
  ) : (
    <p className={`${FOOTER_STYLES.text} text-muted-foreground`}>{value}</p>
  )

  return (
    <div className={FOOTER_STYLES.item}>
      <Icon className={FOOTER_STYLES.icon} aria-hidden={true} />
      <div className="min-w-0 flex-1">
        <p className={`${FOOTER_STYLES.text} font-medium text-foreground`}>{label}</p>
        {content}
      </div>
    </div>
  )
}

// Componente para links externos
function ExternalLinkItem({ icon: Icon, label, href, ariaLabel }: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  href: string
  ariaLabel: string
}) {
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
        <ExternalLink className="h-2.5 sm:h-3 w-2.5 sm:w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden={true} />
      </a>
    </li>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 dark:border-cyan-400/20 bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-black/60" role="contentinfo">
      {/* Efeito de partículas sutis - apenas no dark */}
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-10 right-1/3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
      
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 w-full">
          
          {/* Informações da empresa */}
          <address className={`${FOOTER_STYLES.card} not-italic`}>
            <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col">
              <header>
                <h3 className="text-lg sm:text-xl font-bold text-foreground dark:text-cyan-200 mb-2 dark:font-mono dark:tracking-wider">{SITE_CONFIG.name}</h3>
                <p className={`${FOOTER_STYLES.text} font-medium text-primary dark:text-cyan-400 mb-2 sm:mb-3 dark:font-mono`}>{SITE_CONFIG.title}</p>
                <p className={`${FOOTER_STYLES.text} text-muted-foreground dark:text-gray-300 leading-relaxed`}>
                  {SITE_CONFIG.description}
                </p>
              </header>
              <div className="flex justify-start mt-auto pt-3 sm:pt-4">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-cyan-400/10 dark:to-purple-400/5 text-primary dark:text-cyan-300 rounded-full text-xs font-medium border border-primary/20 dark:border-cyan-400/20 hover:border-primary/40 dark:hover:border-cyan-400/40 hover:shadow-md hover:shadow-primary/10 dark:hover:shadow-cyan-500/10 transition-all duration-300 dark:font-mono">
                  {SITE_CONFIG.experience}
                </span>
              </div>
            </div>
          </address>

          {/* Informações de contato */}
          <section className={FOOTER_STYLES.card}>
            <h4 className={FOOTER_STYLES.title}>Contato</h4>
            <address className="space-y-3 sm:space-y-4 not-italic flex-1">
              <ContactItem 
                icon={ICON_COMPONENTS[FOOTER_CONFIG.contact.email.icon as IconName] || Mail} 
                label="Email" 
                value={SITE_CONFIG.email} 
                href={`mailto:${SITE_CONFIG.email}`}
                type="text"
              />
              <ContactItem 
                icon={ICON_COMPONENTS[FOOTER_CONFIG.contact.phone.icon as IconName] || Phone} 
                label="Telefone" 
                value={SITE_CONFIG.phone} 
                href={`tel:${SITE_CONFIG.phone}`}
                type="text"
              />
              <ContactItem 
                icon={ICON_COMPONENTS[FOOTER_CONFIG.contact.location.icon as IconName] || MapPin} 
                label="Localização" 
                value={SITE_CONFIG.location}
              />
            </address>
          </section>

          {/* Serviços */}
          <section className={FOOTER_STYLES.card}>
            <h4 className={FOOTER_STYLES.title}>Serviços</h4>
            <ul className="space-y-2 sm:space-y-3 flex-1" role="list">
              {FOOTER_CONFIG.services.items.map((service) => {
                const IconComponent = ICON_COMPONENTS[service.icon as IconName] || Layers
                return (
                  <li key={service.name} className={`${FOOTER_STYLES.text} text-muted-foreground dark:text-gray-400 flex items-center justify-start gap-2 p-2 sm:p-3 rounded-lg hover:bg-muted/30 dark:hover:bg-cyan-400/10 hover:text-foreground dark:hover:text-cyan-300 transition-all duration-300 group/item border border-transparent dark:hover:border-cyan-400/20`}>
                    <IconComponent className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary dark:text-cyan-400 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" aria-hidden="true" />
                    {service.name}
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Links rápidos */}
          <nav className={FOOTER_STYLES.card} aria-label="Links externos">
            <h4 className={FOOTER_STYLES.title}>Links</h4>
            <ul className="space-y-2 sm:space-y-3 flex-1" role="list">
              <ExternalLinkItem 
                icon={ICON_COMPONENTS[FOOTER_CONFIG.links.github.icon as IconName] || Github} 
                label="GitHub" 
                href={SITE_CONFIG.github}
                ariaLabel="Visitar perfil no GitHub (abre em nova aba)"
              />
              <ExternalLinkItem 
                icon={ICON_COMPONENTS[FOOTER_CONFIG.links.linkedin.icon as IconName] || Linkedin} 
                label="LinkedIn" 
                href={SITE_CONFIG.linkedin}
                ariaLabel="Visitar perfil no LinkedIn (abre em nova aba)"
              />
              <ExternalLinkItem 
                icon={ICON_COMPONENTS[FOOTER_CONFIG.links.portfolio.icon as IconName] || ExternalLink} 
                label="Portfólio" 
                href={SITE_CONFIG.portfolio}
                ariaLabel="Visitar portfólio (abre em nova aba)"
              />
            </ul>
          </nav>
        </section>

        {/* Seção Inferior */}
        <section className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border/50 dark:border-cyan-400/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <p className={`${FOOTER_STYLES.text} text-muted-foreground dark:text-gray-400`}>
                &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.
              </p>
              <p className="text-xs text-muted-foreground mt-1 dark:font-mono">
                Desenvolvido com Next.js e Tailwind CSS
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground dark:font-mono">
              <span>Made with <span className="text-primary dark:text-cyan-400">❤️</span> in Brasil</span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}