// =============================================================================
// CONFIGURAÇÕES PRINCIPAIS DO SITE
// =============================================================================

export const SITE_CONFIG = {
  // Informações básicas
  name: "Rainer Teixeira",
  title: "Desenvolvedor Full-Stack", 
  description: "Especializado em soluções modernas e inovadoras para empresas que buscam transformação digital",
  url: "https://rainersoft.com.br",
  experience: "5+ anos",
  
  // Informações de contato
  email: "suporte@rainersoft.com.br",
  phone: "+(55) 24 99913-7382",
  location: "Volta Redonda, RJ - Brasil",
  github: "https://github.com/rainerteixeira",
  linkedin: "https://linkedin.com/in/rainerteixeira",
  portfolio: "https://rainersoft.com.br",
  
  // Tecnologias
  technologies: ["React", "Next.js", "Node.js", "TypeScript", "Python", "PostgreSQL", "Docker", "AWS"]
} as const
// =============================================================================
// NAVEGAÇÃO E ESTRUTURA
// =============================================================================

export const NAVIGATION = [
  { name: "Home", href: "/home", description: "Página inicial com apresentação" },
  { name: "Blog", href: "/blog", description: "Artigos e tutoriais sobre tecnologia" },
  { name: "Sobre", href: "/sobre", description: "Informações sobre experiência e habilidades" },
  { name: "Contato", href: "/contato", description: "Formulário de contato e informações" }
] as const

export const FOOTER_CONFIG = {
  // Seção: Informações da Empresa
  company: {
    title: "Informações",
    name: { icon: "User" },
    subtitle: { icon: "Award" },
    description: { icon: "FileText" },
    experience: { icon: "Calendar" }
  },

  // Seção: Contato
  contact: {
    title: "Contato",
    email: { icon: "Mail" },
    phone: { icon: "Phone" },
    location: { icon: "MapPin" }
  },

  // Seção: Serviços
  services: {
    title: "Serviços",
    items: [
      { name: "Desenvolvimento Web", icon: "Globe", description: "Sites e aplicações web modernas" },
      { name: "APIs REST", icon: "Zap", description: "Integração e comunicação entre sistemas" },
      { name: "Consultoria Técnica", icon: "Users", description: "Orientação estratégica em tecnologia" },
      { name: "Soluções Cloud", icon: "Cloud", description: "Migração e otimização para nuvem" },
      { name: "Arquitetura de Software", icon: "Layers", description: "Estruturação e organização de sistemas" }
    ]
  },

  // Seção: Links
  links: {
    title: "Links",
    github: { icon: "Github", description: "Repositórios e projetos" },
    linkedin: { icon: "Linkedin", description: "Perfil profissional" },
    portfolio: { icon: "ExternalLink", description: "Site oficial" }
  }
} as const

export const  NAVBAR_CONFIG = {
  title: "Rainer Teixeira",
  exemplo: [
    
    { name: "Home", href: "/home" },
  ]
} as const