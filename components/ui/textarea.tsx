/**
 * Componente Textarea
 *
 * Textarea reutilizável com estilos consistentes.
 * Suporta estados, validação e estilos cyberpunk.
 *
 * @fileoverview Componente de textarea para formulários
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'dark:bg-black/50 dark:border-cyan-400/30 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus-visible:ring-cyan-400 dark:focus-visible:border-cyan-400',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
