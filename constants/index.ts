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

export { DESENVOLVEDOR, BIO, METRICAS } from './metadata/comum/desenvolvedor';
export {
  PALAVRAS_CHAVE,
  META_PADRAO,
  OPEN_GRAPH,
  SEO_CONFIG,
  OPEN_GRAPH_IMAGE_ALT,
} from './metadata/comum/seo';
export { REDES_SOCIAIS, CONTATO } from './metadata/comum/social';
export { SECTION_IDS, NAVEGACAO, NAVIGATION, BREADCRUMBS } from './metadata/comum/navegacao';
export { SITE_CONFIG, POLICIES_LAST_UPDATED, COPYRIGHT } from './metadata/comum/site';
export { SKILLS_DATA, TECH_BY_LAYER } from './metadata/comum/skills';
export type { SkillItemData } from './metadata/comum/skills';

// ============================================================================
// PÁGINA HOME
// ============================================================================

export { CONTEUDO_HERO, ESTILOS_HERO, CTA_HERO } from './content/home/hero';
export { SERVICOS, DIFERENCIAIS } from './content/home/servicos';
export { PROJETOS, METRICAS_PROJETOS } from './content/home/portfolio';

// ============================================================================
// PÁGINA SOBRE
// ============================================================================

export { EXPERIENCIA, HABILIDADES, PROFESSIONAL_METRICS } from './content/sobre/experiencia';
export { PROPOSITO, VALORES, CULTURA, COMPROMISSOS, MANIFESTO } from './content/sobre/valores';

// Aliases para compatibilidade com imports antigos
export { EXPERIENCIA as EXPERIENCE } from './content/sobre/experiencia';

// ============================================================================
// PÁGINA CONTATO
// ============================================================================

export { CAMPOS_FORMULARIO, INFO_CONTATO } from './content/contato/formulario';
export { FAQ } from './content/contato/faq';
export type { ContactInfoCardConfig } from './content/contato/formulario';
export type { FAQItem } from './content/contato/faq';
export { TEXTO_TEMPO_RESPOSTA, TEXTO_CONTATO_URGENTE } from './content/contato/textos';
// Aliases para compatibilidade
export { FAQ as FAQ_ITEMS } from './content/contato/faq';
export { INFO_CONTATO as CONTACT_INFO_CARDS } from './content/contato/formulario';

// ============================================================================
// BLOG
// ============================================================================

export { CATEGORIAS, TAGS_POPULARES, CONFIG_BLOG } from './content/blog/categorias';
// Tipos não definidos no arquivo - removidos temporariamente

// ============================================================================
// NAMESPACES ORGANIZADOS
// ============================================================================

/**
 * Namespace comum
 * @namespace
 * @description Constantes compartilhadas entre páginas
 */
export * as Comum from './metadata/comum/desenvolvedor';
export * as SEO from './metadata/comum/seo';
export * as Social from './metadata/comum/social';

/**
 * Namespace home
 * @namespace
 * @description Constantes da página inicial
 */
export * as Hero from './content/home/hero';
export * as Servicos from './content/home/servicos';
export * as Portfolio from './content/home/portfolio';

/**
 * Namespace sobre
 * @namespace
 * @description Constantes da página sobre
 */
export * as Sobre from './content/sobre/experiencia';

/**
 * Namespace contato
 * @namespace
 * @description Constantes da página contato
 */
export * as Formulario from './content/contato/formulario';
export * as PerguntasFrequentes from './content/contato/faq';

/**
 * Namespace blog
 * @namespace
 * @description Constantes do blog
 */
export * as Blog from './content/blog/categorias';

