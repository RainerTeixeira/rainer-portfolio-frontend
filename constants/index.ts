/**
 * @fileoverview Export principal das constantes
 * @module constants
 * @version 2.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Ponto central de exportação de todas as constantes
 * organizadas por contexto e página.
 * 
 * @estrutura
 * ```
 * constants/
 * ├── comum/         # Constantes compartilhadas
 * ├── home/          # Constantes da página inicial
 * ├── sobre/         # Constantes da página sobre
 * ├── contato/       # Constantes da página contato
 * └── blog/          # Constantes do blog
 * ```
 * 
 * @exemplo
 * ```tsx
 * import { DESENVOLVEDOR, SERVICOS, FAQ } from '@/constants';
 * ```
 */

// ============================================================================
// CONSTANTES COMUNS
// ============================================================================

export { DESENVOLVEDOR, BIO, METRICAS } from './comum/desenvolvedor';
export {
  PALAVRAS_CHAVE,
  META_PADRAO,
  OPEN_GRAPH,
  SEO_CONFIG,
  OPEN_GRAPH_IMAGE_ALT,
} from './comum/seo';
export { REDES_SOCIAIS, CONTATO } from './comum/social';
export { SECTION_IDS, NAVEGACAO, NAVIGATION, BREADCRUMBS } from './comum/navegacao';
export { SITE_CONFIG, POLICIES_LAST_UPDATED, COPYRIGHT } from './comum/site';
export { SKILLS_DATA, TECH_BY_LAYER } from './comum/skills';
export type { SkillItemData } from './comum/skills';

// ============================================================================
// PÁGINA HOME
// ============================================================================

export { CONTEUDO_HERO, ESTILOS_HERO, CTA_HERO } from './home/hero';
export { SERVICOS, DIFERENCIAIS } from './home/servicos';
export { PROJETOS, METRICAS_PROJETOS } from './home/portfolio';

// ============================================================================
// PÁGINA SOBRE
// ============================================================================

export { EXPERIENCIA, HABILIDADES, FORMACAO, PROFESSIONAL_METRICS } from './sobre/experiencia';

// Aliases para compatibilidade com imports antigos
export { EXPERIENCIA as EXPERIENCE } from './sobre/experiencia';

// ============================================================================
// PÁGINA CONTATO
// ============================================================================

export { CAMPOS_FORMULARIO, MENSAGENS, INFO_CONTATO } from './contato/formulario';
export type { ContactInfoCardConfig } from './contato/formulario';
export { FAQ } from './contato/faq';
export type { FAQItem } from './contato/faq';
// Aliases para compatibilidade
export { FAQ as FAQ_ITEMS } from './contato/faq';
export { INFO_CONTATO as CONTACT_INFO_CARDS } from './contato/formulario';

// ============================================================================
// BLOG
// ============================================================================

export { CATEGORIAS, TAGS_POPULARES, CONFIG_BLOG } from './blog/categorias';

// ============================================================================
// NAMESPACES ORGANIZADOS
// ============================================================================

/**
 * Namespace comum
 * @namespace
 * @description Constantes compartilhadas entre páginas
 */
export * as Comum from './comum/desenvolvedor';
export * as SEO from './comum/seo';
export * as Social from './comum/social';

/**
 * Namespace home
 * @namespace
 * @description Constantes da página inicial
 */
export * as Hero from './home/hero';
export * as Servicos from './home/servicos';
export * as Portfolio from './home/portfolio';

/**
 * Namespace sobre
 * @namespace
 * @description Constantes da página sobre
 */
export * as Sobre from './sobre/experiencia';

/**
 * Namespace contato
 * @namespace
 * @description Constantes da página contato
 */
export * as Formulario from './contato/formulario';
export * as PerguntasFrequentes from './contato/faq';

/**
 * Namespace blog
 * @namespace
 * @description Constantes do blog
 */
export * as Blog from './blog/categorias';

