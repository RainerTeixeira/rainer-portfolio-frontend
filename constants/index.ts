/**
 * Constantes e Configurações Globais do Portfólio
 * 
 * Este arquivo centraliza todas as constantes utilizadas em toda a aplicação,
 * incluindo informações do site, navegação, configurações do footer e dados
 * de contato. Usar constantes centralizadas facilita manutenção e consistência.
 * 
 * @fileoverview Constantes e configurações globais da aplicação
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

// =============================================================================
// CONFIGURAÇÕES PRINCIPAIS DO SITE
// =============================================================================

/**
 * Configuração principal do site
 * 
 * Objeto imutável (as const) contendo todas as informações fundamentais
 * do portfólio e dados de contato profissional. Utilizado em múltiplos
 * componentes como Navbar, Footer, SEO metadata, etc.
 * 
 * @constant
 * @type {Object}
 * @readonly
 * 
 * @property {string} name - Nome da marca/empresa (Rainer Soft)
 * @property {string} title - Título profissional principal
 * @property {string} description - Descrição curta para SEO e apresentação
 * @property {string} url - URL principal do portfólio
 * @property {string} experience - Anos de experiência profissional
 * @property {string} email - Email profissional para contato
 * @property {string} phone - Telefone com código do país (+55 Brasil)
 * @property {string} location - Localização geográfica (cidade, estado, país)
 * @property {string} github - URL do perfil no GitHub
 * @property {string} linkedin - URL do perfil no LinkedIn
 * @property {string} portfolio - URL do site/portfólio oficial
 * @property {string[]} technologies - Array de tecnologias principais dominadas
 * 
 * @example
 * import { SITE_CONFIG } from '@/constants'
 * 
 * console.log(SITE_CONFIG.email) // "suporte@rainersoft.com.br"
 * console.log(SITE_CONFIG.technologies) // ["React", "Next.js", ...]
 */
export const SITE_CONFIG = {
  // Informações básicas
  /** Nome da marca/empresa exibido no site */
  name: "Rainer Soft",
  
  /** Título profissional principal */
  title: "Desenvolvedor Full-Stack", 
  
  /** Descrição resumida da proposta de valor profissional */
  description: "Especializado em soluções modernas e inovadoras para empresas que buscam transformação digital",
  
  /** URL base do portfólio/site oficial */
  url: "https://rainersoft.com.br",
  
  /** Anos de experiência na área */
  experience: "5+ anos",
  
  // Informações de contato
  /** Email profissional para contato comercial e suporte */
  email: "suporte@rainersoft.com.br",
  
  /** Telefone com WhatsApp (código do país + DDD + número) */
  phone: "+(55) 24 99913-7382",
  
  /** Localização geográfica completa */
  location: "Volta Redonda, RJ - Brasil",
  
  /** URL do perfil profissional no GitHub */
  github: "https://github.com/rainerteixeira",
  
  /** URL do perfil profissional no LinkedIn */
  linkedin: "https://linkedin.com/in/rainerteixeira",
  
  /** URL do portfólio/site oficial */
  portfolio: "https://rainersoft.com.br",
  
  /** Keywords para SEO */
  keywords: ["Desenvolvedor Full-Stack", "React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Volta Redonda", "Rainer Teixeira"],
  
  // Tecnologias
  /** 
   * Lista das principais tecnologias e ferramentas dominadas
   * Usada para exibir stack tecnológico em seções do portfólio
   */
  technologies: ["React", "Next.js", "Node.js", "TypeScript", "Python", "PostgreSQL", "Docker", "AWS"]
} as const
// =============================================================================
// NAVEGAÇÃO E ESTRUTURA
// =============================================================================

/**
 * Item de navegação
 */
export interface NavigationItem {
  name: string
  href: string
  description: string
}

/**
 * Configuração de navegação principal
 * 
 * Array imutável contendo todos os itens do menu de navegação principal.
 * Usado na Navbar e em outros componentes que precisam listar páginas.
 * 
 * @constant
 * @type {ReadonlyArray<NavigationItem>}
 * @readonly
 * 
 * @example
 * import { NAVIGATION } from '@/constants'
 * 
 * NAVIGATION.map(item => (
 *   <Link href={item.href}>{item.name}</Link>
 * ))
 */
export const NAVIGATION: ReadonlyArray<NavigationItem> = [
  /** Link para a página inicial */
  { name: "Home", href: "/", description: "Página inicial com apresentação" },
  
  /** Link para o blog técnico */
  { name: "Blog", href: "/blog", description: "Artigos e tutoriais sobre tecnologia" },
  
  /** Link para página sobre/biografia */
  { name: "Sobre", href: "/sobre", description: "Informações sobre experiência e habilidades" },
  
  /** Link para página de contato */
  { name: "Contato", href: "/contato", description: "Formulário de contato e informações" }
] as const

/**
 * Item de serviço oferecido
 * 
 * @typedef {Object} ServiceItem
 * @property {string} name - Nome do serviço
 * @property {string} icon - Nome do ícone (Lucide React)
 * @property {string} description - Descrição breve do serviço
 */

/**
 * Configuração de ícone
 * 
 * @typedef {Object} IconConfig
 * @property {string} icon - Nome do ícone (Lucide React)
 * @property {string} [description] - Descrição opcional
 */

/**
 * Configuração do Footer
 * 
 * Objeto que define a estrutura e conteúdo do rodapé da aplicação.
 * Organizado em seções (company, contact, services, links) para
 * facilitar renderização e manutenção.
 * 
 * @constant
 * @type {Object}
 * @readonly
 * 
 * @property {Object} company - Seção de informações da empresa
 * @property {string} company.title - Título da seção ("Informações")
 * @property {IconConfig} company.name - Configuração do ícone para nome
 * @property {IconConfig} company.subtitle - Configuração do ícone para subtitle
 * @property {IconConfig} company.description - Configuração do ícone para descrição
 * @property {IconConfig} company.experience - Configuração do ícone para experiência
 * 
 * @property {Object} contact - Seção de contato
 * @property {string} contact.title - Título da seção ("Contato")
 * @property {IconConfig} contact.email - Configuração do ícone para email
 * @property {IconConfig} contact.phone - Configuração do ícone para telefone
 * @property {IconConfig} contact.location - Configuração do ícone para localização
 * 
 * @property {Object} services - Seção de serviços oferecidos
 * @property {string} services.title - Título da seção ("Serviços")
 * @property {ServiceItem[]} services.items - Array de serviços com ícones e descrições
 * 
 * @property {Object} links - Seção de links externos
 * @property {string} links.title - Título da seção ("Links")
 * @property {IconConfig} links.github - Configuração do link GitHub
 * @property {IconConfig} links.linkedin - Configuração do link LinkedIn
 * @property {IconConfig} links.portfolio - Configuração do link portfólio
 * 
 * @example
 * import { FOOTER_CONFIG } from '@/constants'
 * 
 * console.log(FOOTER_CONFIG.services.items[0].name) // "Desenvolvimento Web"
 */
export const FOOTER_CONFIG = {
  // Seção: Informações da Empresa
  /**
   * Seção com informações gerais da empresa/profissional
   * Cada propriedade possui um ícone associado para UI
   */
  company: {
    /** Título da seção exibido no footer */
    title: "Informações",
    
    /** Ícone para o nome da empresa */
    name: { icon: "User" },
    
    /** Ícone para o título profissional */
    subtitle: { icon: "Award" },
    
    /** Ícone para a descrição */
    description: { icon: "FileText" },
    
    /** Ícone para anos de experiência */
    experience: { icon: "Calendar" }
  },

  // Seção: Contato
  /**
   * Seção com informações de contato
   * Cada meio de contato possui um ícone específico
   */
  contact: {
    /** Título da seção de contato */
    title: "Contato",
    
    /** Ícone para email (envelope) */
    email: { icon: "Mail" },
    
    /** Ícone para telefone */
    phone: { icon: "Phone" },
    
    /** Ícone para localização geográfica */
    location: { icon: "MapPin" }
  },

  // Seção: Serviços
  /**
   * Seção listando serviços profissionais oferecidos
   * Cada serviço possui nome, ícone e descrição
   */
  services: {
    /** Título da seção de serviços */
    title: "Serviços",
    
    /** 
     * Array de serviços oferecidos
     * Cada item representa uma especialidade ou área de atuação
     */
    items: [
      /** Desenvolvimento de sites e aplicações web responsivas e modernas */
      { name: "Desenvolvimento Web", icon: "Globe", description: "Sites e aplicações web modernas" },
      
      /** Criação de APIs RESTful para integração de sistemas */
      { name: "APIs REST", icon: "Zap", description: "Integração e comunicação entre sistemas" },
      
      /** Consultoria e orientação técnica em projetos de software */
      { name: "Consultoria Técnica", icon: "Users", description: "Orientação estratégica em tecnologia" },
      
      /** Migração e otimização de infraestrutura para cloud (AWS, Azure, etc) */
      { name: "Soluções Cloud", icon: "Cloud", description: "Migração e otimização para nuvem" },
      
      /** Planejamento e estruturação de arquitetura de software escalável */
      { name: "Arquitetura de Software", icon: "Layers", description: "Estruturação e organização de sistemas" }
    ]
  },

  // Seção: Links
  /**
   * Seção com links para redes sociais e perfis profissionais
   * Cada link possui ícone e descrição
   */
  links: {
    /** Título da seção de links */
    title: "Links",
    
    /** Link para GitHub com repositórios e projetos open-source */
    github: { icon: "Github", description: "Repositórios e projetos" },
    
    /** Link para perfil profissional no LinkedIn */
    linkedin: { icon: "Linkedin", description: "Perfil profissional" },
    
    /** Link para site/portfólio oficial */
    portfolio: { icon: "ExternalLink", description: "Site oficial" }
  }
} as const

// =============================================================================
// RE-EXPORT de SKILLS e EXPERIENCE do arquivo index.tsx
// =============================================================================

/**
 * Re-exporta SKILLS e EXPERIENCE do arquivo index.tsx
 * para manter compatibilidade com imports existentes
 */
export { SKILLS, EXPERIENCE, type SkillItem } from "./index.tsx" 