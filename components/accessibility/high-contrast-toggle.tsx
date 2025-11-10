/**
 * High Contrast Toggle Component
 *
 * Botão para alternar modo de alto contraste. Melhora a acessibilidade
 * para usuários com deficiência visual, aumentando o contraste entre
 * elementos e facilitando a leitura.
 *
 * @module components/accessibility/high-contrast-toggle
 * @fileoverview Toggle de alto contraste para acessibilidade
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na navbar ou menu de configurações
 * <HighContrastToggle />
 * ```
 */

'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Contrast } from 'lucide-react';
import { useHighContrast } from './hooks';

export function HighContrastToggle() {
  const { isHighContrast, toggleHighContrast } = useHighContrast();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleHighContrast}
      title={
        isHighContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'
      }
      className={cn(isHighContrast && 'bg-accent')}
    >
      <Contrast className="h-5 w-5" />
      <span className="sr-only">
        {isHighContrast ? 'Desativar' : 'Ativar'} alto contraste
      </span>
    </Button>
  );
}
