/**
 * Status Badge Component
 *
 * Badge de status para exibir estados de verificação (idle, checking,
 * available, unavailable). Usado em verificações de disponibilidade de
 * nickname e nome, com ícones e cores semânticas.
 *
 * @module components/dashboard/login/status-badge
 * @fileoverview Badge de status para verificações
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <StatusBadge status="available" />
 * <StatusBadge status="checking" />
 * <StatusBadge status="unavailable" />
 * ```
 *
 * Características:
 * - Estados: idle, checking, available, unavailable
 * - Ícones descritivos por estado
 * - Cores semânticas (verde para disponível, vermelho para indisponível)
 * - Animação de loading no estado checking
 * - Layout responsivo
 * - Acessibilidade completa
 */

'use client';

import { Badge } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'idle' | 'checking' | 'available' | 'unavailable';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (status === 'idle') return null;

  if (status === 'checking') {
    return (
      <Badge variant="secondary" className={cn('gap-1', className)}>
        <Loader2 className="h-3 w-3 animate-spin" />
        Verificando
      </Badge>
    );
  }

  if (status === 'available') {
    return (
      <Badge
        className={cn(
          'gap-1 bg-green-600 text-white hover:bg-green-600',
          className
        )}
      >
        <CheckCircle2 className="h-3 w-3" />
        Disponível
      </Badge>
    );
  }

  return (
    <Badge variant="destructive" className={cn('gap-1', className)}>
      <XCircle className="h-3 w-3" />
      Indisponível
    </Badge>
  );
}


