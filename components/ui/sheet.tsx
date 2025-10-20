/**
 * Componentes de Sheet (Painel Lateral)
 * 
 * Sistema composable para painéis laterais/drawers deslizantes.
 * Baseado em Radix UI Dialog, mas adaptado para slide-ins dos 4 lados.
 * 
 * Componentes disponíveis:
 * - Sheet: container root (controla estado aberto/fechado)
 * - SheetTrigger: elemento que abre o sheet (botão, link, etc)
 * - SheetContent: conteúdo do sheet com animação de entrada
 * - SheetClose: botão para fechar o sheet
 * - SheetHeader: cabeçalho do sheet
 * - SheetTitle: título do sheet
 * - SheetDescription: descrição/subtítulo
 * - SheetFooter: rodapé com ações
 * - SheetOverlay: camada escura sobre o conteúdo
 * - SheetPortal: portal para renderizar fora do DOM tree
 * 
 * @fileoverview Sistema de painéis laterais deslizantes
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Componente Sheet (Root)
 * 
 * Container root que gerencia estado do sheet.
 * Controla se está aberto/fechado via prop `open` ou modo não controlado.
 * 
 * @param {React.ComponentProps<typeof SheetPrimitive.Root>} props - Props do Radix Dialog
 * @param {boolean} [props.open] - Estado aberto (modo controlado)
 * @param {Function} [props.onOpenChange] - Callback de mudança de estado
 * @returns {JSX.Element} Container do sheet
 */
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

/**
 * Componente SheetTrigger (Gatilho)
 * 
 * Elemento que abre o sheet quando clicado.
 * Pode ser botão, link ou qualquer elemento clicável.
 * 
 * @param {React.ComponentProps<typeof SheetPrimitive.Trigger>} props - Props do trigger
 * @returns {JSX.Element} Trigger do sheet
 */
function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

/**
 * Componente SheetClose (Fechar)
 * 
 * Botão ou elemento que fecha o sheet quando clicado.
 * 
 * @param {React.ComponentProps<typeof SheetPrimitive.Close>} props - Props do close
 * @returns {JSX.Element} Botão de fechar
 */
function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

/**
 * Componente SheetPortal (Portal)
 * 
 * Renderiza conteúdo em portal fora do DOM tree.
 * Útil para evitar problemas de z-index e overflow.
 * 
 * @param {React.ComponentProps<typeof SheetPrimitive.Portal>} props - Props do portal
 * @returns {JSX.Element} Portal
 */
function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

/**
 * Componente SheetOverlay (Overlay)
 * 
 * Camada semi-transparente escura sobre o conteúdo da página.
 * Aparece quando sheet está aberto. Clicar fecha o sheet.
 * 
 * @param {React.ComponentProps<typeof SheetPrimitive.Overlay>} props - Props do overlay
 * @param {string} [props.className] - Classes CSS adicionais
 * @returns {JSX.Element} Overlay escurecido
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Componente SheetContent (Conteúdo)
 * 
 * Painel deslizante com conteúdo do sheet.
 * Pode deslizar de qualquer um dos 4 lados da tela.
 * 
 * Inclui automaticamente:
 * - SheetOverlay
 * - Botão X para fechar (canto superior direito)
 * - Animações de entrada/saída baseadas no lado
 * 
 * @param {React.ComponentProps<typeof SheetPrimitive.Content>} props - Props do content
 * @param {"top" | "right" | "bottom" | "left"} [props.side="right"] - Lado de entrada
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {React.ReactNode} props.children - Conteúdo do sheet
 * @returns {JSX.Element} Painel deslizante
 * 
 * @example
 * <Sheet>
 *   <SheetTrigger>Abrir Menu</SheetTrigger>
 *   <SheetContent side="left">
 *     <SheetHeader>
 *       <SheetTitle>Menu</SheetTitle>
 *     </SheetHeader>
 *     <div>Conteúdo do sheet aqui</div>
 *   </SheetContent>
 * </Sheet>
 */
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          /** Lado direito: slide horizontal da direita, altura total, max 400px */
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          /** Lado esquerdo: slide horizontal da esquerda */
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          /** Lado superior: slide vertical do topo */
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          /** Lado inferior: slide vertical do fundo */
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        {/** Botão X fixo no canto superior direito */}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

/**
 * Componente SheetHeader (Cabeçalho)
 * 
 * Área de cabeçalho do sheet, tipicamente contém título e descrição.
 * 
 * @param {React.ComponentProps<"div">} props - Props do div
 * @returns {JSX.Element} Header do sheet
 */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

/**
 * Componente SheetFooter (Rodapé)
 * 
 * Área de rodapé do sheet, tipicamente com botões de ação.
 * Posicionado no final do sheet (mt-auto).
 * 
 * @param {React.ComponentProps<"div">} props - Props do div
 * @returns {JSX.Element} Footer do sheet
 */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

/**
 * Componente SheetTitle (Título)
 * 
 * Título principal do sheet, renderizado com semântica apropriada
 * para leitores de tela (Radix adiciona acessibilidade).
 * 
 * @param {React.ComponentProps<typeof SheetPrimitive.Title>} props - Props do title
 * @returns {JSX.Element} Título do sheet
 */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Componente SheetDescription (Descrição)
 * 
 * Subtítulo ou descrição complementar ao título.
 * Texto menor em cor muted.
 * 
 * @param {React.ComponentProps<typeof SheetPrimitive.Description>} props - Props da description
 * @returns {JSX.Element} Descrição do sheet
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
