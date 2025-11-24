/**
 * Page Header Component
 *
 * Header padronizado e reutilizável para páginas internas. Título centralizado,
 * linha decorativa com gradiente e descrição opcional. Suporta children para
 * conteúdo adicional (avatar, badges, etc).
 *
 * @module components/ui/page-header
 * @fileoverview Header padronizado para páginas com design premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Header simples
 * <PageHeader
 *   title="Blog"
 *   description="Artigos sobre desenvolvimento e tecnologia"
 * />
 *
 * // Header com avatar
 * <PageHeader title="Sobre Mim" description="Minha trajetória profissional">
 *   <Avatar src="/avatar.jpg" />
 * </PageHeader>
 * ```
 *
 * Características:
 * - Layout centralizado e responsivo
 * - Linha decorativa com gradiente
 * - Tipografia cyberpunk no dark mode
 * - Slot children para conteúdo adicional (avatar, ícone, etc)
 * - Padding consistente via SECTION_CLASSES
 * - Acessibilidade completa (semântica HTML5)
 */

// ============================================================================
// Utils
// ============================================================================

import { SECTION_CLASSES } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

/**
 * Props do PageHeader
 */
interface PageHeaderProps {
  /** Título principal da página */
  readonly title: string;

  /** Descrição/subtítulo opcional */
  readonly description?: string;

  /** Conteúdo adicional (avatar, ícone, etc) */
  readonly children?: React.ReactNode;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente PageHeader
 *
 * Renderiza header centralizado e estilizado para páginas internas.
 *
 * Estrutura:
 * 1. Children (se fornecido) - ex: avatar, ícone
 * 2. Título principal (h1)
 * 3. Linha decorativa com gradiente
 * 4. Descrição (se fornecida)
 *
 * @param {PageHeaderProps} props - Propriedades do componente
 * @returns {JSX.Element} Header formatado da página
 *
 * @example
 * // Header simples
 * <PageHeader
 *   title="Blog"
 *   description="Artigos sobre desenvolvimento e tecnologia"
 * />
 *
 * @example
 * // Header com avatar
 * <PageHeader title="Sobre Mim" description="Minha trajetória profissional">
 *   <Avatar src="/avatar.jpg" />
 * </PageHeader>
 */
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    /**
     * Container principal do header
     *
     * Utiliza SECTION_CLASSES.container para padding e layout responsivos
     * - relative z-10: fica acima de backgrounds e partículas
     */
    <div className={`${SECTION_CLASSES.container} relative z-10`}>
      {/**
       * Container centralizado
       * - text-center: alinhamento central de todo conteúdo
       * - mb-12: margem inferior para separar do conteúdo da página
       */}
      <div className="text-center mb-12">
        {/**
         * Children (conteúdo adicional)
         * Renderizado antes do título se fornecido
         * Útil para avatares, ícones, badges, etc
         */}
        {children && <div className="relative mb-8">{children}</div>}

        {/**
         * Título principal da página
         *
         * - h1: elemento semântico de título principal
         * - Tamanhos responsivos: 3xl (mobile) -> 4xl (desktop)
         * - font-bold: peso de fonte negrito
         * - mb-4: margem inferior antes da linha decorativa
         * - Dark mode: cyan-200, font-mono, tracking-wider (estilo cyberpunk)
         */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground dark:text-cyan-200 dark:font-mono dark:tracking-wider">
          {title}
        </h1>

        {/**
         * Linha decorativa horizontal
         *
         * - Largura variável baseada no tamanho do título
         * - h-1: altura de 4px
         * - Gradiente horizontal de primary (light mode)
         * - Gradiente cyan -> purple (dark mode)
         * - mx-auto: centralizada horizontalmente
         * - mb-6: margem inferior antes da descrição
         */}
        <div className="w-24 h-1 bg-linear-to-r from-primary to-primary dark:from-cyan-400 dark:to-purple-400 mx-auto mb-6" />

        {/**
         * Descrição/subtítulo (opcional)
         *
         * Renderizado apenas se description for fornecida
         * - text-muted-foreground: cor suavizada
         * - text-lg: tamanho maior que texto normal
         * - max-w-2xl mx-auto: largura máxima com centralização
         * - px-2: padding lateral pequeno em mobile
         * - Dark mode: gray-300, font-mono (estilo cyberpunk)
         */}
        {description && (
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto dark:font-mono px-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
