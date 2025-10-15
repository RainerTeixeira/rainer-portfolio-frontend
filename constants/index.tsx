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

import React from "react"

// =============================================================================
// CONFIGURAÇÕES PRINCIPAIS DO SITE
// =============================================================================

/**
 * Configuração principal do site
 * 
 * Objeto imutável (as const) contendo todas as informações fundamentais
 * do portfólio e dados de contato profissional.
 * 
 * @constant
 */
export const SITE_CONFIG = {
  // Informações básicas
  name: "RainerSoft",
  title: "Empresa de Desenvolvimento Full-Stack | Especialista em React, Next.js & Node.js", 
  description: 
    "RainerSoft é uma empresa especializada em desenvolvimento Full-Stack com domínio técnico avançado " +
    "em React 19, Next.js 15, TypeScript, Node.js e bancos de dados. Desenvolvemos aplicações web " +
    "completas e profissionais: dashboards interativos, sistemas de autenticação, PWAs, integrações " +
    "com APIs e arquiteturas escaláveis. Portfólio comprovado com projetos reais de alta complexidade. " +
    "Código limpo, documentação completa e resultados que impressionam. Transformamos ideias em " +
    "software funcional que resolve problemas reais.",
  url: "https://rainersoft.com.br",
  experience: "5+",
  projects: "10+",
  
  // Contato
  email: "suporte@rainersoft.com.br",
  phone: "+55 24 99913-7382",
  location: "Volta Redonda, RJ",
  
  // Redes sociais
  github: "https://github.com/rainerteixeira",
  linkedin: "https://linkedin.com/in/rainerteixeira",
  instagram: "https://instagram.com/rainerteixeira",
  
  // Stack principal
  technologies: [
    "React", 
    "Next.js", 
    "TypeScript", 
    "Node.js", 
    "Python", 
    "PostgreSQL", 
    "MongoDB", 
    "Redis",
    "Docker", 
    "Kubernetes", 
    "AWS", 
    "Azure"
  ],
  
  // SEO - Keywords otimizadas estrategicamente
  keywords: [
    // Profissão + Localização
    "desenvolvedor full-stack Volta Redonda",
    "desenvolvedor React Next.js Rio de Janeiro",
    "programador TypeScript Brasil",
    "desenvolvedor web RJ",
    "freelancer desenvolvimento full-stack",
    "desenvolvedor React avançado Brasil",
    "programador full stack remoto",
    
    // Tecnologias Core
    "React", 
    "Next.js 15", 
    "TypeScript", 
    "Node.js", 
    "Python",
    "PostgreSQL", 
    "MongoDB", 
    "Redis",
    "Docker", 
    "Kubernetes", 
    "AWS", 
    "Azure",
    
    // Serviços Oferecidos
    "desenvolvimento web completo React",
    "aplicações Next.js TypeScript",
    "dashboard interativo React",
    "sistema autenticação JWT",
    "API REST Node.js",
    "PWA progressive web app",
    "integração APIs externas",
    "frontend responsivo profissional",
    "backend Node.js Fastify",
    
    // Deploy & Infraestrutura
    "deploy Vercel profissional",
    "CI/CD GitHub Actions",
    "deploy aplicação Next.js",
    "versionamento Git avançado",
    "Docker containerização",
    "deploy automatizado",
    "GitHub portfolio projetos",
    
    // Metodologias e Expertise
    "clean code profissional",
    "arquitetura componentizada",
    "código TypeScript type-safe",
    "Git flow profissional",
    "documentação JSDoc completa",
    "testes automatizados",
    
    // Habilidades Avançadas
    "React 19 Hooks avançados",
    "TypeScript tipos complexos",
    "state management Zustand",
    "animações Framer Motion",
    "Tailwind CSS design system",
    "Prisma ORM PostgreSQL",
    
    // Portfolio
    "portfolio desenvolvedor completo",
    "projetos full-stack GitHub",
    "dashboard administrativo React",
    "sistema blog completo",
    "freelancer aplicações web",
    "desenvolvimento sob medida"
  ]
} as const

// =============================================================================
// NAVEGAÇÃO E ESTRUTURA
// =============================================================================

/**
 * Item de navegação do menu principal
 */
interface NavigationItem {
  name: string
  href: string
  description: string
}

/**
 * Configuração de navegação principal
 */
export const NAVIGATION: ReadonlyArray<NavigationItem> = [
  { 
    name: "Home", 
    href: "/", 
    description: "Página inicial com portfólio e apresentação profissional" 
  },
  { 
    name: "Blog", 
    href: "/blog", 
    description: "Artigos técnicos, tutoriais e insights sobre desenvolvimento" 
  },
  { 
    name: "Sobre", 
    href: "/sobre", 
    description: "Experiência profissional, habilidades técnicas e trajetória" 
  },
  { 
    name: "Contato", 
    href: "/contato", 
    description: "Entre em contato para projetos e consultoria técnica" 
  }
] as const

/**
 * Item de serviço oferecido
 */
interface ServiceItem {
  name: string
  icon: string
  description: string
}

/**
 * Configuração de ícone
 */
interface IconConfig {
  icon: string
  description?: string
}

/**
 * Configuração do Footer
 */
export const FOOTER_CONFIG = {
  contact: {
    title: "Contato",
    email: { icon: "Mail" },
    phone: { icon: "Phone" },
    location: { icon: "MapPin" }
  },

  services: {
    title: "Soluções Desenvolvidas",
    items: [
      { 
        name: "Aplicações Web Full-Stack Completas", 
        icon: "Globe", 
        description: 
          "Sistemas web profissionais com React, Next.js, TypeScript, autenticação, " +
          "dashboards administrativos e integrações com APIs. Código enterprise-grade." 
      },
      { 
        name: "Dashboards & Painéis Administrativos", 
        icon: "Zap", 
        description: 
          "Sistemas de gestão com gráficos em tempo real, CRUD completo, autenticação JWT, " +
          "editor WYSIWYG e interface moderna e responsiva." 
      },
      { 
        name: "PWAs & Aplicações Offline-First", 
        icon: "Users", 
        description: 
          "Progressive Web Apps instaláveis que funcionam sem internet, com service workers, " +
          "cache inteligente e experiência nativa." 
      },
      { 
        name: "APIs REST & Backend Node.js", 
        icon: "Cloud", 
        description: 
          "APIs robustas com Node.js, NestJS, Express, PostgreSQL/MongoDB, Prisma ORM, " +
          "validações Zod e deploy com Docker." 
      },
      { 
        name: "Desenvolvimento Sob Medida", 
        icon: "Layers", 
        description: 
          "Projetos personalizados full-stack do zero. Arquitetura escalável, código limpo, " +
          "documentação completa e suporte técnico." 
      }
    ]
  },

  links: {
    title: "Links",
    github: { 
      icon: "Github", 
      description: "Projetos open source" 
    },
    linkedin: { 
      icon: "Linkedin", 
      description: "Perfil profissional" 
    },
    portfolio: { 
      icon: "ExternalLink", 
      description: "Website oficial" 
    }
  }
} as const

// =============================================================================
// STACK TECNOLÓGICO COM ÍCONES
// =============================================================================

/**
 * Item de tecnologia com ícone
 */
export interface SkillItem {
  name: string
  category: string
  color: string
  icon: React.ReactElement
}

/**
 * Skills/Tecnologias com ícones para carrossel
 * 
 * Array contendo todas as tecnologias dominadas com seus respectivos
 * ícones SVG, categorias e cores. Usado para exibir o tech stack
 * visualmente em carrosséis, cards e outros componentes.
 */
export const SKILLS: ReadonlyArray<SkillItem> = [
  {
    name: "React",
    category: "Frontend",
    color: "from-cyan-500 to-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
      </svg>
    )
  },
  {
    name: "Next.js",
    category: "Framework",
    color: "from-gray-700 to-gray-900",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
      </svg>
    )
  },
  {
    name: "TypeScript",
    category: "Language",
    color: "from-blue-500 to-blue-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    color: "from-cyan-400 to-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    )
  },
  {
    name: "Node.js",
    category: "Backend",
    color: "from-green-500 to-green-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57.329.924.944.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
      </svg>
    )
  },
  {
    name: "PostgreSQL",
    category: "Database",
    color: "from-blue-600 to-blue-800",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6514.7837 19.9712.0011 17.0989.0011c-1.9313 0-3.5315.4004-4.9003 1.2267C11.0548.474 9.8387.0011 7.9026.0011c-1.9313 0-3.5315.4004-4.9003 1.2267C1.8482.474.6321.0011-1.3041.0011c-2.8723 0-4.5525.7826-5.9064 2.3252a1.5641 1.5641 0 0 0-.1509.235c-.6761 1.2079-.1492 3.6809.1222 4.7316.5961 2.3077 1.699 4.7815 3.0411 6.8297-.2321.1503-.8723.3602-2.5256.0191-.5306-.1097-.8684-.031-1.0074.2321a.5269.5269 0 0 0-.0563.1191c-.5988 1.8933.8183 3.0662 1.1656 3.3442.5232.4178.9735.6079 1.3877.5842a.4549.4549 0 0 0 .0563.0043c.4921.2181.949.3242 1.3634.3242.9989 0 1.8756-.486 2.6166-1.4452a.5313.5313 0 0 0 .0768-.4921c-.3064-1.084-.3064-2.2013 0-3.3171a.5313.5313 0 0 0-.0768-.4921c-.7409-.9592-1.6177-1.4452-2.6166-1.4452-.4144 0-.8713.1061-1.3634.3242a.4549.4549 0 0 0-.0563.0043c-.4142-.0237-.8645.1664-1.3877.5842-.3473.2779-1.7644 1.4509-1.1656 3.3442z"/>
      </svg>
    )
  },
  {
    name: "MongoDB",
    category: "Database",
    color: "from-green-600 to-green-800",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 4.604-3.254 4.293-11.375zM12 19.3s-.571-5.359.142-8.566c.713-3.207 2.061-4.906 2.061-4.906s.429 1.027.572 3.329c.142 2.302-.857 6.93-2.775 10.143z"/>
      </svg>
    )
  },
  {
    name: "Docker",
    category: "DevOps",
    color: "from-blue-500 to-blue-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
      </svg>
    )
  },
  {
    name: "AWS",
    category: "Cloud",
    color: "from-orange-400 to-orange-600",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.226.726-1.644.488-.417 1.134-.627 1.955-.627.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.296.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.263 1.005-.36C2.096.751 2.527.704 2.998.704c1.086 0 1.88.247 2.388.742.503.495.758 1.245.758 2.254v2.336zm-3.24 1.214c.264 0 .536-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.28-.511.057-.192.096-.416.096-.672v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.918 0 .376.095.655.295.846.191.2.487.296.814.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.415-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256-.063 0-.167-.024-.303-.08-.455-.199-.967-.296-1.517-.296-.455 0-.815.072-1.06.216-.247.144-.375.368-.375.671 0 .168.057.312.168.431.112.12.335.24.67.36l1.134.36c.574.183.99.439 1.237.767.247.328.367.695.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.247.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
      </svg>
    )
  },
  {
    name: "MongoDB",
    category: "Database",
    color: "from-green-600 to-green-800",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 4.604-3.254 4.293-11.375zM12 19.3s-.571-5.359.142-8.566c.713-3.207 2.061-4.906 2.061-4.906s.429 1.027.572 3.329c.142 2.302-.857 6.93-2.775 10.143z"/>
      </svg>
    )
  },
  {
    name: "Git",
    category: "Tools",
    color: "from-red-500 to-red-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
      </svg>
    )
  },
  {
    name: "GraphQL",
    category: "Backend",
    color: "from-pink-500 to-purple-600",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M12.002 0a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.54 4.931a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm0 9.862a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm-8.54 4.931a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.276zm-8.542-4.93a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.277zm0-9.863a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.542-3.378L2.953 6.777v10.448l9.049 5.224 9.047-5.224V6.777zm0 1.601 7.66 13.27H4.34zm-1.387.371L3.97 15.037V7.363zm2.774 0 6.646 3.838v7.674zM5.355 17.44h13.293l-6.646 3.836z"/>
      </svg>
    )
  },
  {
    name: "Prisma",
    category: "ORM",
    color: "from-indigo-500 to-purple-600",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M21.807 18.285L13.553.756a1.324 1.324 0 0 0-1.129-.754 1.31 1.31 0 0 0-1.206.626l-8.952 14.5a1.356 1.356 0 0 0 .016 1.455l4.376 6.227a1.363 1.363 0 0 0 1.543.463l12.838-4.354a1.325 1.325 0 0 0 .828-1.436 1.336 1.336 0 0 0-.06-.198zM17.663 17.27l-7.648 2.592-3.13-4.45 5.912-9.568 4.866 11.426z"/>
      </svg>
    )
  }
] as const

// =============================================================================
// EXPERIÊNCIA PROFISSIONAL
// =============================================================================

/**
 * Item de experiência profissional
 */
interface ExperienceItem {
  period: string
  role: string
  description: string
}

/**
 * Histórico de experiência profissional
 */
export const EXPERIENCE: ReadonlyArray<ExperienceItem> = [
  {
    period: "Projetos Atuais",
    role: "Desenvolvedor Full-Stack | Portfolio Técnico Comprovado",
    description: 
      "Desenvolvi aplicações web completas e profissionais que demonstram domínio técnico avançado: " +
      "**Portfólio Enterprise** (Next.js 15 + React 19 + TypeScript) com PWA, sistema de blog com " +
      "editor Tiptap WYSIWYG, dashboard administrativo, autenticação completa preparada para AWS Cognito, " +
      "animações cyberpunk customizadas, carousel modular com 6 componentes, 100% documentado com JSDoc, " +
      "Lighthouse 95+, WCAG AA e LGPD compliant. **Dashboard Crypto** com backend Node.js + NestJS, " +
      "integração com APIs de criptomoedas, gráficos em tempo real com Recharts, autenticação JWT, " +
      "banco PostgreSQL com Prisma ORM e Docker containerizado. **Planejador Financeiro** full-stack " +
      "com frontend React e backend robusto. **Sistema de Controle** integrado com Supabase. Todos com " +
      "Git flow profissional, deploy automatizado e código limpo seguindo princípios SOLID."
  },
  {
    period: "Formação Técnica",
    role: "Stack Moderna & Arquitetura Profissional",
    description: 
      "Domínio técnico completo da stack moderna de desenvolvimento web: Frontend avançado " +
      "(React 19 com Hooks customizados, Context API, state management com Zustand, TypeScript types " +
      "e interfaces complexas, Tailwind CSS com design system, Framer Motion para animações fluidas, " +
      "shadcn/ui e Radix UI para componentes acessíveis), Backend profissional (Node.js 20+, NestJS " +
      "framework enterprise, Express.js, APIs RESTful bem estruturadas, autenticação JWT/OAuth2, " +
      "validação com Zod), Banco de Dados (PostgreSQL com Prisma ORM, queries otimizadas, modelagem " +
      "de dados, migrations), DevOps (Git/GitHub com feature branches e pull requests, deploy CI/CD " +
      "automatizado, Docker containerização, Vercel deployments) e Qualidade (ESLint + Prettier, " +
      "TypeScript strict mode, documentação JSDoc completa, SonarQube code quality). Arquitetura " +
      "componentizada, reutilizável e escalável aplicada em todos os projetos."
  },
  {
    period: "Base Técnica",
    role: "Fundamentos Sólidos & Aprendizado Acelerado",
    description: 
      "Base técnica sólida conquistada através de aprendizado intensivo e prática constante: Lógica " +
      "de programação avançada, algoritmos e estruturas de dados, JavaScript ES6+ moderno " +
      "(async/await, promises, destructuring, spread operators, arrow functions), HTML5 semântico, " +
      "CSS3 avançado (Flexbox, Grid, animations, transitions), responsividade mobile-first e design " +
      "acessível. Aprendi através de documentação oficial (React Docs, Next.js Docs, TypeScript " +
      "Handbook), cursos técnicos estruturados, análise de código open source e muita prática " +
      "construindo projetos reais. Desenvolvi mentalidade de resolução de problemas, debugging " +
      "sistemático, leitura de stack traces, Git para versionamento profissional e capacidade de " +
      "aprender tecnologias novas rapidamente através de documentação técnica."
  }
] as const
