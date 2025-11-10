/**
 * Componente Skeleton (Esqueleto de Loading)
 *
 * Placeholder animado para indicar carregamento de conteúdo.
 * Melhora a percepção de performance ao mostrar estrutura da UI
 * antes do conteúdo real carregar.
 *
 * Características:
 * - Animação de pulso (animate-pulse)
 * - Cor de fundo accent
 * - Bordas arredondadas
 * - Dimensões customizáveis
 *
 * @fileoverview Componente de skeleton loading
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { cn } from '@/lib/utils';

/**
 * Componente Skeleton
 *
 * Div animada que serve como placeholder durante loading.
 * Usa animate-pulse do Tailwind para efeito de "respiração".
 *
 * @param {React.ComponentProps<"div">} props - Props nativas do div
 * @param {string} [props.className] - Classes para definir tamanho/forma
 * @returns {JSX.Element} Div de skeleton
 *
 * @example
 * // Skeleton de texto (linha)
 * <Skeleton className="h-4 w-[250px]" />
 *
 * @example
 * // Skeleton de avatar circular
 * <Skeleton className="h-12 w-12 rounded-full" />
 *
 * @example
 * // Skeleton de card completo
 * <div className="space-y-2">
 *   <Skeleton className="h-12 w-12 rounded-full" />
 *   <Skeleton className="h-4 w-[250px]" />
 *   <Skeleton className="h-4 w-[200px]" />
 * </div>
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
