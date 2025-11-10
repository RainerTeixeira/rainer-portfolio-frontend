/**
 * Keyboard Shortcuts Component
 *
 * Dialog que exibe todos os atalhos de teclado disponíveis na aplicação.
 * Organiza atalhos por categoria (Navegação, Blog) e permite acesso rápido
 * via Ctrl + /.
 *
 * @module components/accessibility/keyboard-shortcuts
 * @fileoverview Dialog de atalhos de teclado da aplicação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado no layout ou navbar
 * <KeyboardShortcuts />
 * ```
 */

'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Keyboard } from 'lucide-react';
import { useKeyboardShortcuts } from './hooks';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  { keys: ['Ctrl', 'K'], description: 'Abrir busca', category: 'Navegação' },
  {
    keys: ['Ctrl', '/'],
    description: 'Mostrar atalhos',
    category: 'Navegação',
  },
  { keys: ['/'], description: 'Focar na busca', category: 'Navegação' },
  { keys: ['Esc'], description: 'Fechar modal/dialog', category: 'Navegação' },
  { keys: ['←', '→'], description: 'Navegar entre posts', category: 'Blog' },
  { keys: ['L'], description: 'Curtir post', category: 'Blog' },
  { keys: ['S'], description: 'Salvar post', category: 'Blog' },
  { keys: ['C'], description: 'Comentar', category: 'Blog' },
];

export function KeyboardShortcuts() {
  const { open, setOpen } = useKeyboardShortcuts();

  const groupedShortcuts = shortcuts.reduce(
    (acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = [];
      }
      acc[shortcut.category]!.push(shortcut);
      return acc;
    },
    {} as Record<string, Shortcut[]>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        title="Atalhos de teclado (Ctrl + /)"
      >
        <Keyboard className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Atalhos de Teclado</DialogTitle>
            <DialogDescription>
              Use estes atalhos para navegar mais rapidamente
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {Object.entries(groupedShortcuts).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold mb-3">{category}</h3>
                <div className="space-y-2">
                  {items.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex gap-1">
                        {shortcut.keys.map((key, i) => (
                          <kbd
                            key={i}
                            className="px-2 py-1 text-xs font-semibold bg-muted border border-border rounded"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-muted-foreground text-center pt-4 border-t">
            Pressione{' '}
            <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs">
              Esc
            </kbd>{' '}
            para fechar
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
