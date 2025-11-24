/**
 * Componente Input (Campo de Entrada)
 *
 * Campo de entrada de texto estilizado e acessível.
 * Suporta todos os tipos nativos de input HTML5 com estilos consistentes.
 *
 * Características:
 * - Estilos para estados: normal, focus, disabled, invalid
 * - Suporte a dark mode
 * - Estilos específicos para input type="file"
 * - Bordas e ring de foco para acessibilidade
 * - Transições suaves em cor e sombra
 * - Placeholder com cor muted
 * - Seleção de texto estilizada
 *
 * @fileoverview Componente de input estilizado
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Componente Input
 *
 * Campo de entrada (input) HTML com estilos consistentes.
 * Suporta todos os tipos HTML5: text, email, password, number, file, etc.
 *
 * Classes aplicadas:
 * - Base: altura 36px (h-9), bordas arredondadas, padding horizontal
 * - Focus: borda e ring coloridos para acessibilidade
 * - Invalid: borda e ring vermelhos quando aria-invalid
 * - Disabled: opacidade reduzida, cursor not-allowed
 * - File: estilos específicos para botão de seleção de arquivo
 * - Dark mode: background semi-transparente
 *
 * @param {React.ComponentProps<"input">} props - Props nativas do input
 * @param {string} [props.type="text"] - Tipo do input (text, email, etc)
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {string} [props.placeholder] - Texto placeholder
 * @param {boolean} [props.disabled] - Se input está desabilitado
 * @returns {JSX.Element} Input estilizado
 *
 * @example
 * // Input de texto simples
 * <Input type="text" placeholder="Digite seu nome" />
 *
 * @example
 * // Input de email com validação
 * <Input
 *   type="email"
 *   placeholder="email@exemplo.com"
 *   aria-invalid={!isEmailValid}
 *   required
 * />
 *
 * @example
 * // Input de arquivo
 * <Input
 *   type="file"
 *   accept="image/*"
 *   onChange={handleFileChange}
 * />
 */
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        /** Classes base: layout, tipografia, transições */
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',

        /** Estado de foco: borda e ring para acessibilidade */
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',

        /** Estado inválido: borda e ring vermelhos */
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

        className
      )}
      {...props}
    />
  );
}

export { Input };
