/**
 * Constants Barrel Export
 *
 * Exporta todas as constantes e configurações do projeto.
 * Estrutura modular seguindo Domain-Driven Design (DDD).
 *
 * @module constants
 * @fileoverview Barrel export para todas as constantes
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Import direto do barrel
 * import { SITE_CONFIG, NAVIGATION, SKILLS_DATA } from '@/constants'
 *
 * // Equivale a:
 * import { SITE_CONFIG } from '@/constants/site/config'
 * import { NAVIGATION } from '@/constants/site/navigation'
 * import { SKILLS_DATA } from '@/constants/data/skills'
 * ```
 */

// Site constants (configurações do site)
export * from './site';

// Data constants (dados estáticos)
export * from './data';

// Types são re-exportados automaticamente via barrel exports acima

// NOTA: Design tokens devem ser importados diretamente de '@rainer/design-tokens'
// conforme a documentação da biblioteca. Não re-exportamos aqui para evitar
// problemas com resolução de módulos.
//
// Use: import { GRADIENTS, SHADOWS } from '@rainer/design-tokens'
//
// Estrutura DDD (Domain-Driven Design):
// - constants/site/ - Configurações do site (config, meta, navigation, social)
// - constants/data/ - Dados estáticos (skills, services, experience)
// - components/icons/skills/ - Ícones React SVG (separados das constantes)
//
// Para usar skills com ícones:
// import { SKILLS } from '@/components/icons/skills/skills-with-icons'
