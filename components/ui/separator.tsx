/**
 * Componente Separator (Separador)
 * 
 * Linha divisória visual para separar seções de conteúdo.
 * Baseado em Radix UI Separator com suporte a orientação horizontal/vertical.
 * 
 * Características:
 * - Orientação horizontal ou vertical
 * - Pode ser decorativo (não afeta leitores de tela)
 * - Altura/largura de 1px
 * - Cor baseada em --border do tema
 * 
 * @fileoverview Componente de separador visual
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "../../lib/utils"

/**
 * Componente Separator
 * 
 * Renderiza linha divisória horizontal ou vertical.
 * 
 * Por padrão é decorativo (não anunciado por leitores de tela).
 * Para separadores semânticos, defina decorative={false}.
 * 
 * @param {React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>} props - Props do Radix Separator
 * @param {"horizontal" | "vertical"} [props.orientation="horizontal"] - Orientação da linha
 * @param {boolean} [props.decorative=true] - Se é apenas decorativo (não semântico)
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {React.Ref} ref - Ref encaminhada
 * @returns {JSX.Element} Linha separadora
 * 
 * @example
 * // Separador horizontal (padrão)
 * <Separator />
 * 
 * @example
 * // Separador vertical
 * <div className="flex h-20">
 *   <div>Esquerda</div>
 *   <Separator orientation="vertical" className="mx-4" />
 *   <div>Direita</div>
 * </div>
 * 
 * @example
 * // Separador semântico (não decorativo)
 * <Separator decorative={false} />
 */
const Separator = React.forwardRef<
    React.ComponentRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    (
        { className, orientation = "horizontal", decorative = true, ...props },
        ref
    ) => (
        <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
                "shrink-0 bg-border",
                /** Define dimensões baseado na orientação */
                orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                className
            )}
            {...props}
        />
    )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
