/**
 * Componente Progress (Barra de Progresso)
 * 
 * Barra de progresso visual para indicar conclusão de tarefas ou processos.
 * Baseado em Radix UI Progress com animação suave.
 * 
 * Características:
 * - Formato pill (rounded-full)
 * - Animação suave via transition-all
 * - Valor de 0 a 100 (porcentagem)
 * - Acessível (usa role="progressbar" do Radix)
 * - Responsivo (largura 100% por padrão)
 * 
 * @fileoverview Componente de barra de progresso
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../../lib/utils"

/**
 * Componente Progress
 * 
 * Renderiza barra de progresso horizontal com indicador animado.
 * O indicador se move de forma suave usando transform: translateX.
 * 
 * @param {React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>} props - Props do Radix Progress
 * @param {number} [props.value] - Valor atual (0-100)
 * @param {number} [props.max=100] - Valor máximo (padrão 100)
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {React.Ref} ref - Ref encaminhada
 * @returns {JSX.Element} Barra de progresso
 * 
 * @example
 * // Barra de progresso simples
 * <Progress value={50} />
 * 
 * @example
 * // Barra de progresso com aria-label
 * <Progress 
 *   value={uploadProgress} 
 *   aria-label="Progresso do upload"
 * />
 * 
 * @example
 * // Upload de arquivo
 * const [progress, setProgress] = useState(0)
 * 
 * <Progress value={progress} className="w-full" />
 * <p>{progress}% concluído</p>
 */
const Progress = React.forwardRef<
    React.ComponentRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
            className
        )}
        {...props}
    >
        {/**
         * Indicador de progresso
         * Move-se horizontalmente usando translateX
         * - Começa 100% fora da tela (esquerda)
         * - Move-se para direita conforme value aumenta
         * - Em value=100, translateX=0 (totalmente visível)
         */}
        <ProgressPrimitive.Indicator
            className="h-full w-full flex-1 bg-primary transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
