/**
 * Componente Badge (Etiqueta/Tag)
 * 
 * Pequenos elementos visuais para destacar informações, categorias,
 * status ou tags. Renderizado como pill (bordas totalmente arredondadas).
 * 
 * Variantes disponíveis:
 * - default: badge primário (cor primária)
 * - secondary: badge secundário (cor secundária)
 * - destructive: badge para status negativos/erros
 * - outline: badge apenas com borda
 * 
 * @fileoverview Componente de badge/etiqueta reutilizável
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * Variantes do badge usando CVA
 * 
 * Define classes base e variantes para diferentes estilos.
 * 
 * Classes base:
 * - inline-flex: layout flex inline
 * - items-center: centralização vertical
 * - rounded-full: bordas totalmente arredondadas (pill)
 * - border: borda de 1px
 * - px-2.5 py-0.5: padding pequeno
 * - text-xs: texto pequeno
 * - font-semibold: negrito
 * - transition-colors: transições suaves de cor
 * - focus:ring: anel de foco para acessibilidade
 * 
 * @constant
 * @type {Function}
 */
const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        /**
         * Variantes de estilo
         * Cada variante define aparência diferente do badge
         */
        variants: {
            variant: {
                /** Badge primário - cor primária com borda transparente */
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                
                /** Badge secundário - cor secundária */
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                
                /** Badge destrutivo - para status negativos/erros */
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                
                /** Badge outline - apenas borda, fundo transparente */
                outline: "text-foreground",
            },
        },
        
        /**
         * Variante padrão aplicada quando prop não é fornecida
         */
        defaultVariants: {
            variant: "default",
        },
    }
)

/**
 * Interface de props do Badge
 * Extende HTMLAttributes do div e inclui variantes do CVA
 * 
 * @interface BadgeProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @extends VariantProps<typeof badgeVariants>
 */
export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

/**
 * Componente Badge
 * 
 * Renderiza uma etiqueta/tag pequena para destacar informações.
 * Ideal para status, categorias, contadores ou labels.
 * 
 * @param {BadgeProps} props - Propriedades do componente
 * @param {string} [props.variant="default"] - Variante de estilo
 * @param {string} [props.className] - Classes CSS adicionais
 * @returns {JSX.Element} Badge estilizado
 * 
 * @example
 * // Badge simples
 * <Badge>Novo</Badge>
 * 
 * @example
 * // Badge secundário com ícone
 * <Badge variant="secondary">
 *   <Star className="w-3 h-3 mr-1" />
 *   Popular
 * </Badge>
 * 
 * @example
 * // Badge destrutivo
 * <Badge variant="destructive">Erro</Badge>
 */
function Badge({ className, variant, ...props }: BadgeProps) {
    /**
     * Renderiza div com classes de badge aplicadas
     * - Combina classes de variante com className customizado
     * - Spread ...props para passar atributos HTML
     */
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
