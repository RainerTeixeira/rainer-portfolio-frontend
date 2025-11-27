/**
 * Highlights Component
 *
 * Seção de destaques que exibe cards de serviços profissionais oferecidos.
 * Cada card apresenta título, descrição, badge, ícone e lista de features
 * técnicas.
 *
 * @module components/home/highlights
 * @fileoverview Seção de highlights/destaques de serviços
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <Highlights />
 * ```
 *
 * Características:
 * - Cards de serviços com ícones e badges
 * - Lista de features por serviço
 * - Componente otimizado com React.memo
 * - Animações suaves
 * - Layout responsivo em grid
 * - Integração com design tokens
 */

import { Badge } from '@rainersoft/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { Separator } from '@rainersoft/ui';
import { CARD_CLASSES, SECTION_CLASSES, cn } from '@/lib/portfolio';
import {
  Briefcase,
  Cloud,
  Code,
  LucideIcon,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import { memo } from 'react';

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
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  features: string[];
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
      /** Sistemas full-stack completos */
      title: 'Aplicações Web Full-Stack',
      description:
        'Desenvolvimento completo de aplicações web profissionais com React e Next.js no frontend, Node.js no backend e PostgreSQL. Incluo autenticação segura, PWA instalável, tema claro/escuro e dashboard administrativo. Código TypeScript 100% tipado e documentado.',
      icon: Code,
      badge: 'Mais Procurado',
      features: [
        'React 19 + Next.js 15',
        'TypeScript + Node.js',
        'PostgreSQL + Prisma',
        'Deploy Profissional',
      ],
    },
    {
      /** Dashboards e painéis administrativos */
      title: 'Dashboards Interativos',
      description:
        'Painéis administrativos modernos que transformam dados em insights. Gráficos dinâmicos, tabelas com filtros avançados, relatórios exportáveis e visualizações que facilitam decisões. Interface intuitiva que sua equipe vai adorar usar.',
      icon: Cloud,
      badge: 'Alta Demanda',
      features: [
        'Gráficos Interativos',
        'Filtros Inteligentes',
        'Tempo Real',
        'Export Excel/PDF',
      ],
    },
    {
      /** PWAs e aplicações offline */
      title: 'PWAs e Performance',
      description:
        'Progressive Web Apps rápidas como apps nativos. Funcionam offline, são instaláveis e carregam em menos de 2 segundos. SEO otimizado que coloca seu site no topo do Google. Lighthouse Score 95+ garantido com Core Web Vitals excelentes.',
      icon: Zap,
      badge: 'Performance Máxima',
      features: [
        'Carregamento < 2s',
        'Funciona Offline',
        'SEO Otimizado',
        'Mobile First',
      ],
    },
    {
      /** APIs e integração */
      title: 'APIs REST Escaláveis',
      description:
        'APIs profissionais com Node.js que aguentam milhões de requisições. Autenticação JWT segura, documentação Swagger completa, integrações com serviços externos (pagamento, email, AWS). Backend robusto preparado para crescer com seu negócio.',
      icon: Briefcase,
      badge: 'Arquitetura Sólida',
      features: ['Node.js + NestJS', 'Documentação Swagger', 'Integrações', 'Escalável'],
    },
  ];

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
    <section
      className={SECTION_CLASSES.container}
      aria-labelledby="highlights-heading"
    >
      {/**
       * Header da seção com efeitos visuais aprimorados
       * - text-center: alinhamento central
       * - mb responsivo: margem inferior que cresce com tela
       * - relative: para posicionamento de elementos decorativos
       */}
      <header className="text-center mb-8 xs:mb-10 sm:mb-12 relative">
        {/**
         * Badge "Serviços" com ícone de sparkles e gradiente
         * Elemento visual de categorização
         */}
        <Badge
          variant="secondary"
          className={cn(
            'mb-3 xs:mb-4 text-xs sm:text-sm',
            'bg-linear-to-r from-secondary to-secondary/80',
            'shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20',
            'transition-all duration-300'
          )}
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 animate-pulse" />
          O Que Entrego
        </Badge>

        {/** Título principal da seção (h2 para hierarquia) com gradiente */}
        <h2
          id="highlights-heading"
          className={cn(
            'text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 xs:mb-4',
            'bg-linear-to-r from-foreground via-foreground to-foreground/80 bg-clip-text',
            'leading-tight'
          )}
        >
          Soluções que Transformam Negócios
        </h2>

        {/** Descrição/subtítulo com largura máxima para legibilidade */}
        <div className="space-y-2 max-w-4xl mx-auto px-2">
          <p className="text-base xs:text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Desenvolvimento full-stack profissional com React, Next.js e Node.js.
            Crio aplicações web que resolvem problemas reais, aumentam
            conversões e facilitam a vida dos seus usuários.
          </p>
          <p className="text-sm xs:text-base text-muted-foreground/80 leading-relaxed">
            Cada serviço entregue com código limpo, documentação completa,
            testes automatizados e performance otimizada. Projetos reais
            disponíveis no GitHub para você avaliar a qualidade.
          </p>
        </div>
      </header>

      {/**
       * Grid de cards de serviços
       *
       * Layout responsivo:
       * - Mobile: 1 coluna (stack vertical)
       * - md+: 2 colunas
       * - gap responsivo: aumenta com tamanho da tela
       * - items-stretch: garante altura uniforme
       * - role="list": semântica de lista
       */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 items-stretch"
        role="list"
      >
        {/**
         * Mapeia array de serviços
         * Cada serviço vira um ServiceCard
         */}
        {services.map(service => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
});

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
  service: Service;
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
  const IconComponent = service.icon;

  return (
    /**
     * Card principal do serviço com efeitos visuais premium
     *
     * Utiliza CARD_CLASSES.full para hover effects padronizados
     * + gradiente sutil, bordas e sombras dinâmicas
     * - role="listitem": item de lista para acessibilidade
     * - group: para hover effects coordenados
     */
    <Card
      className={cn(
        CARD_CLASSES.full,
        'group/service',
        'relative overflow-hidden',
        'h-full flex flex-col',
        'bg-linear-to-br from-muted/20 via-background to-background',
        'hover:from-muted/40 hover:via-muted/10',
        'border-2 border-border/50 hover:border-primary/40',
        'shadow-md hover:shadow-2xl hover:shadow-primary/10',
        'transition-all duration-500',
        'before:absolute before:inset-0 before:bg-linear-to-br before:from-primary/5 before:via-transparent before:to-transparent before:pointer-events-none before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500'
      )}
      role="listitem"
    >
      {/**
       * Header do card
       * - space-y: espaçamento vertical entre elementos
       * - p responsivo: padding que cresce com breakpoints
       * - relative: para ficar acima do gradiente
       */}
      <CardHeader className="space-y-1 xs:space-y-2 p-1.5 xs:p-2 sm:p-3 md:p-4 relative">
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
             * Container do ícone com anel de gradiente animado
             */}
            <div className="relative shrink-0">
              {/* Anel de gradiente que aparece no hover */}
              <div
                className={cn(
                  'absolute -inset-1 rounded-full blur-md opacity-0',
                  'bg-linear-to-r from-primary via-primary/60 to-primary',
                  'group-hover/service:opacity-75 transition-opacity duration-500'
                )}
              />
              {/**
               * Círculo com ícone e gradiente
               * - p responsivo: padding interno
               * - rounded-full: círculo perfeito
               * - bg-primary com gradiente: cor de fundo primária
               * - aria-hidden: decorativo, não anunciado
               * - Efeito de rotação suave no hover
               */}
              <div
                className={cn(
                  'p-2 xs:p-2.5 sm:p-3 rounded-full relative',
                  'bg-linear-to-br from-primary to-primary/80',
                  'shadow-lg shadow-primary/25',
                  'group-hover/service:shadow-xl group-hover/service:shadow-primary/40',
                  'group-hover/service:scale-110 group-hover/service:rotate-6',
                  'transition-all duration-500'
                )}
                aria-hidden="true"
              >
                <IconComponent className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary-foreground" />
              </div>
            </div>

            {/**
             * Container de título e descrição
             * - space-y: espaçamento vertical
             * - flex-1: ocupa espaço disponível
             * - min-w-0: permite text truncation se necessário
             */}
            <div className="space-y-1.5 xs:space-y-2 flex-1 min-w-0">
              {/** Título do serviço com leading tight e hover effect */}
              <CardTitle
                className={cn(
                  'text-xs xs:text-sm sm:text-base font-bold leading-tight whitespace-nowrap',
                  'group-hover/service:text-primary transition-colors duration-300'
                )}
                title={service.title}
              >
                {service.title}
              </CardTitle>

              {/** Descrição com leading relaxed para legibilidade */}
              <CardDescription
                className={cn(
                  'text-muted-foreground text-xs xs:text-sm leading-relaxed',
                  'group-hover/service:text-foreground/80 transition-colors duration-300'
                )}
              >
                {service.description}
              </CardDescription>
            </div>
          </div>

          {/**
           * Badge de destaque com cores e efeitos customizados
           * - text minúsculo em mobile
           * - self-start em mobile, self-auto em xs+
           * - shrink-0: não encolhe
           */}
          <Badge
            variant="secondary"
            className={cn(
              'text-[10px] xs:text-xs self-start xs:self-auto shrink-0',
              'bg-linear-to-r from-secondary to-secondary/80',
              'group-hover/service:from-primary/20 group-hover/service:to-primary/10',
              'group-hover/service:text-primary group-hover/service:border-primary/30',
              'shadow-sm group-hover/service:shadow-md',
              'transition-all duration-300'
            )}
          >
            {service.badge}
          </Badge>
        </div>
      </CardHeader>

      {/**
       * Conteúdo do card (features)
       * - space-y: espaçamento vertical
       * - p responsivo: padding que cresce
       * - pt-0: remove padding superior (já tem no header)
       * - mt-auto: empurra para baixo
       * - relative: para ficar acima do gradiente
       */}
      <CardContent className="space-y-1 xs:space-y-2 p-1.5 xs:p-2 sm:p-3 md:p-4 pt-0 mt-auto relative">
        {/** Separador visual com gradiente entre header e features */}
        <div className="relative">
          <Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
        </div>

        {/**
         * Grid de features com hover effects
         * - 1 coluna em mobile
         * - 2 colunas em xs+
         * - gap pequeno para compactar informações
         */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-2.5">
          {/**
           * Mapeia features do serviço
           * Cada feature é um item com ícone de estrela e hover effect
           */}
          {service.features.map((feature, index) => {
            /**
             * Item de feature com animação de entrada
             * - flex: ícone + texto horizontal
             * - gap: espaçamento entre ícone e texto
             * - group/feature: para hover effects
             * - Delay progressivo na animação
             */
            return (
              <div
                key={feature}
                className={cn(
                  'flex items-center gap-1.5 xs:gap-2',
                  'group/feature',
                  'p-1.5 xs:p-2 rounded-md',
                  'hover:bg-primary/5 dark:hover:bg-primary/10',
                  'transition-all duration-300'
                )}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {/** Ícone de estrela com animação (decorativo) */}
                <Star
                  className={cn(
                    'h-2.5 w-2.5 xs:h-3 xs:w-3',
                    'text-primary/70 group-hover/feature:text-primary',
                    'shrink-0',
                    'group-hover/feature:scale-125 group-hover/feature:rotate-180',
                    'transition-all duration-500'
                  )}
                  aria-hidden="true"
                />
                {/** Nome da feature/tecnologia com hover effect */}
                <span
                  className={cn(
                    'text-xs xs:text-sm leading-tight',
                    'text-muted-foreground',
                    'group-hover/feature:text-foreground group-hover/feature:font-medium',
                    'transition-all duration-300'
                  )}
                >
                  {feature}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
});


