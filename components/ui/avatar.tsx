/**
 * Componentes de Avatar
 *
 * Sistema composable para exibição de avatares de usuário.
 * Baseado em Radix UI Avatar com suporte a imagem e fallback automático.
 *
 * Componentes disponíveis:
 * - Avatar: container circular para imagem de perfil
 * - AvatarImage: componente de imagem com carregamento lazy
 * - AvatarFallback: conteúdo exibido quando imagem falha ou está carregando
 *
 * Características:
 * - Formato circular (rounded-full)
 * - Fallback automático se imagem não carregar
 * - Tamanho padrão 40x40px (customizável)
 * - Aspect ratio 1:1 mantido
 *
 * @fileoverview Sistema de avatares com fallback
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '../../lib/utils';

/**
 * Componente Avatar (Container)
 *
 * Container principal do avatar. Deve conter AvatarImage e AvatarFallback.
 * Renderizado como círculo com overflow hidden para manter formato.
 *
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>} props - Props do Radix Avatar
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {React.Ref} ref - Ref encaminhada
 * @returns {JSX.Element} Container do avatar
 *
 * @example
 * <Avatar>
 *   <AvatarImage src="/foto.jpg" alt="João Silva" />
 *   <AvatarFallback>JS</AvatarFallback>
 * </Avatar>
 */
const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * Componente AvatarImage (Imagem)
 *
 * Imagem do avatar. Carrega de forma lazy e exibe fallback se falhar.
 * Mantém aspect ratio 1:1 automaticamente.
 *
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>} props - Props do Radix Avatar Image
 * @param {string} props.src - URL da imagem
 * @param {string} props.alt - Texto alternativo (acessibilidade)
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {React.Ref} ref - Ref encaminhada
 * @returns {JSX.Element} Elemento de imagem
 *
 * @example
 * <AvatarImage
 *   src="https://exemplo.com/foto.jpg"
 *   alt="Foto de perfil de João Silva"
 * />
 */
const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/**
 * Componente AvatarFallback (Fallback)
 *
 * Conteúdo exibido quando a imagem não está disponível ou falha ao carregar.
 * Geralmente contém iniciais do nome ou um ícone.
 *
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>} props - Props do Radix Avatar Fallback
 * @param {React.ReactNode} props.children - Conteúdo do fallback (ex: iniciais)
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {React.Ref} ref - Ref encaminhada
 * @returns {JSX.Element} Elemento de fallback
 *
 * @example
 * // Fallback com iniciais
 * <AvatarFallback>JS</AvatarFallback>
 *
 * @example
 * // Fallback com ícone
 * <AvatarFallback>
 *   <UserIcon className="w-6 h-6" />
 * </AvatarFallback>
 */
const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
