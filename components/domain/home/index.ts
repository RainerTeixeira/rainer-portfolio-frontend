/**
 * Home Components Exports
 *
 * Barrel file para centralizar exportações das seções da página principal.
 *
 * @module components/domain/home/index
 * @fileoverview Exporta todas as seções da home page
 * @author Rainer Teixeira
 * @version 3.1.0
 * @since 1.0.0
 *
 * @example
 * ```ts
 * import { HeroSection, TechnicalHighlight } from '@/components/domain/home';
 * ```
 * responsividade.
 *
 * @author
 * Rainer Teixeira <contato@rainersoft.com>
 */

// Seção hero (destaque principal da home)
export { HeroSection } from './hero-section';

// Seção de destaques de serviços oferecidos
export { Highlights } from './highlights';

// Seção "Sobre" com apresentação profissional
export { AboutSection } from './about-section';

// Seção de formulário de contato resumido
export { ContactSection } from './contact-section';

// Seção de newsletter + formulário reutilizável
export { NewsletterSection, NewsletterForm } from './newsletter-section';

// Seção de estatísticas/metricas com animações
export { StatsShowcase } from './stats-showcase';

// Seção de diferenciais técnicos detalhados
export { TechnicalHighlight } from './technical-highlight';

// Seção de call-to-action principal de conversão
export { CTASection } from './cta-section';

// Seção de showcase de stack/tecnologias
export { TechStackShowcase } from './tech-stack';

// Seção de portfolio/projetos em destaque
export { PortfolioShowcase } from './portfolio-showcase';
