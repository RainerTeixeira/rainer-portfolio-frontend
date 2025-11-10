/**
 * Componentes de Tooltip (Dica/Hint)
 *
 * Sistema composable para exibir dicas contextuais ao hover/focus.
 * Baseado em Radix UI Tooltip com posicionamento inteligente.
 *
 * Componentes disponíveis:
 * - TooltipProvider: provedor global de tooltips (controla delay)
 * - Tooltip: container root (integra provider automaticamente)
 * - TooltipTrigger: elemento que dispara o tooltip
 * - TooltipContent: conteúdo do tooltip com animação e seta
 *
 * Características:
 * - Posicionamento automático (top, right, bottom, left)
 * - Delay configurável (padrão 0ms)
 * - Seta apontando para o trigger
 * - Animações de fade e zoom
 * - Acessível (keyboard navigation)
 *
 * @fileoverview Sistema de tooltips acessíveis
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Componente TooltipProvider (Provedor)
 *
 * Provedor de contexto para tooltips. Deve envolver todos os tooltips
 * para compartilhar configurações globais como delay.
 *
 * @param {React.ComponentProps<typeof TooltipPrimitive.Provider>} props - Props do provider
 * @param {number} [props.delayDuration=0] - Delay em ms antes de mostrar tooltip
 * @returns {JSX.Element} Provider de tooltips
 *
 * @example
 * <TooltipProvider delayDuration={200}>
 *   <App />
 * </TooltipProvider>
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * Componente Tooltip (Root)
 *
 * Container root do tooltip. Inclui TooltipProvider automaticamente,
 * então não é necessário envolver manualmente.
 *
 * @param {React.ComponentProps<typeof TooltipPrimitive.Root>} props - Props do root
 * @returns {JSX.Element} Container do tooltip
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * Componente TooltipTrigger (Gatilho)
 *
 * Elemento que dispara o tooltip ao hover ou focus.
 * Pode ser botão, link, ícone ou qualquer elemento interativo.
 *
 * @param {React.ComponentProps<typeof TooltipPrimitive.Trigger>} props - Props do trigger
 * @returns {JSX.Element} Trigger do tooltip
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/**
 * Componente TooltipContent (Conteúdo)
 *
 * Balão flutuante com conteúdo do tooltip.
 * Posiciona-se automaticamente próximo ao trigger.
 *
 * Inclui:
 * - Animações de fade e zoom
 * - Seta apontando para o trigger
 * - Slide baseado no lado posicionado
 * - Portal para renderizar fora do DOM tree
 *
 * @param {React.ComponentProps<typeof TooltipPrimitive.Content>} props - Props do content
 * @param {number} [props.sideOffset=0] - Distância em px do trigger
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {React.ReactNode} props.children - Conteúdo do tooltip
 * @returns {JSX.Element} Balão do tooltip
 *
 * @example
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button size="icon">
 *       <InfoIcon />
 *     </Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <p>Informação útil aqui</p>
 *   </TooltipContent>
 * </Tooltip>
 *
 * @example
 * // Com sideOffset para afastar do trigger
 * <TooltipContent sideOffset={8}>
 *   Tooltip distante
 * </TooltipContent>
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className
        )}
        {...props}
      >
        {children}
        {/** Seta apontando para o trigger, posicionada automaticamente */}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
