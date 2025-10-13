/**
 * Componente Button (Botão)
 * 
 * Botão altamente customizável com múltiplas variantes e tamanhos.
 * Baseado em Radix UI Slot para composição flexível e class-variance-authority
 * para gerenciamento de variantes.
 * 
 * Variantes disponíveis:
 * - default: botão primário padrão
 * - destructive: para ações destrutivas (deletar, remover)
 * - outline: botão com borda e fundo transparente
 * - secondary: botão secundário
 * - ghost: botão sem background (apenas hover)
 * - link: estilo de link com underline
 * 
 * Tamanhos disponíveis:
 * - sm, default, lg: para botões de texto
 * - icon, icon-sm, icon-lg: para botões apenas com ícone
 * 
 * @fileoverview Componente de botão reutilizável com variantes
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Variantes do botão usando CVA (Class Variance Authority)
 * 
 * Define classes base e variantes para diferentes estilos e tamanhos.
 * CVA permite composição type-safe de classes CSS baseada em props.
 * 
 * Classes base:
 * - inline-flex: layout flex inline
 * - items-center justify-center: centralização
 * - gap-2: espaçamento entre elementos internos
 * - whitespace-nowrap: previne quebra de texto
 * - rounded-md: bordas arredondadas
 * - transition-all: transições suaves
 * - disabled:opacity-50: estado desabilitado
 * - focus-visible:ring: anel de foco para acessibilidade
 * - aria-invalid: estilos para estados de erro
 * 
 * @constant
 * @type {Function}
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    /**
     * Variantes de estilo
     * Cada variante define aparência diferente do botão
     */
    variants: {
      variant: {
        /** Botão primário padrão - fundo sólido na cor primária */
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        
        /** Botão destrutivo - para ações perigosas/irreversíveis */
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        
        /** Botão outline - apenas borda, fundo transparente */
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        
        /** Botão secundário - cor secundária */
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        
        /** Botão ghost - sem fundo, apenas hover */
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        
        /** Estilo de link - sem fundo, com underline no hover */
        link: "text-primary underline-offset-4 hover:underline",
      },
      
      /**
       * Variantes de tamanho
       * Define altura, padding e ajustes quando há ícones
       */
      size: {
        /** Tamanho padrão - h-9 (36px) */
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        
        /** Tamanho pequeno - h-8 (32px) */
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        
        /** Tamanho grande - h-10 (40px) */
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        
        /** Apenas ícone - quadrado 36x36px */
        icon: "size-9",
        
        /** Apenas ícone pequeno - quadrado 32x32px */
        "icon-sm": "size-8",
        
        /** Apenas ícone grande - quadrado 40x40px */
        "icon-lg": "size-10",
      },
    },
    
    /**
     * Variantes padrão aplicadas quando props não são fornecidas
     */
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Props do componente Button
 * 
 * @typedef {Object} ButtonProps
 * @property {string} [className] - Classes CSS adicionais
 * @property {string} [variant] - Variante de estilo
 * @property {string} [size] - Tamanho do botão
 * @property {boolean} [asChild] - Se deve renderizar como Slot (composição)
 */

/**
 * Componente Button
 * 
 * Botão reutilizável com suporte a múltiplas variantes e tamanhos.
 * Pode ser renderizado como <button> ou como Slot para composição
 * com outros componentes (ex: Link do Next.js).
 * 
 * Características:
 * - Suporte a variantes de estilo via CVA
 * - Tamanhos flexíveis
 * - Composição via asChild (Radix Slot)
 * - Acessibilidade (focus, aria-invalid)
 * - Estados disabled e hover
 * - Suporte a ícones
 * 
 * @param {ButtonProps} props - Propriedades do componente
 * @param {string} [props.variant="default"] - Variante de estilo
 * @param {string} [props.size="default"] - Tamanho do botão
 * @param {boolean} [props.asChild=false] - Se true, renderiza como Slot
 * @param {string} [props.className] - Classes CSS adicionais
 * @returns {JSX.Element} Botão estilizado
 * 
 * @example
 * // Botão padrão
 * <Button>Clique aqui</Button>
 * 
 * @example
 * // Botão destructive
 * <Button variant="destructive">Deletar</Button>
 * 
 * @example
 * // Como Link do Next.js (composição)
 * <Button asChild>
 *   <Link href="/sobre">Ver mais</Link>
 * </Button>
 * 
 * @example
 * // Botão apenas com ícone
 * <Button size="icon" aria-label="Menu">
 *   <Menu />
 * </Button>
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  /**
   * Determina o componente a renderizar
   * - asChild true: usa Slot (composição/delegação)
   * - asChild false: usa button nativo
   */
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
