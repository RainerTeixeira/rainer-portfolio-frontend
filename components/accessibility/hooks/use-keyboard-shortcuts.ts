/**
 * Keyboard Shortcuts Hook
 *
 * Hook que gerencia detecção de atalho (Ctrl+/ ou Cmd+/) para abrir
 * dialog de atalhos. Inclui listener de teclado com cleanup automático.
 *
 * @module components/accessibility/hooks/use-keyboard-shortcuts
 * @fileoverview Hook para gerenciamento de atalhos de teclado
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * useKeyboardShortcuts Hook
 *
 * Detecta atalho Ctrl+/ (ou Cmd+/ no Mac) e gerencia estado do dialog
 * de atalhos. Listener de teclado com cleanup automático.
 *
 * @returns {Object} Estado e controles
 * @returns {boolean} open - Se o dialog está aberto
 * @returns {Function} setOpen - Função para abrir/fechar dialog
 *
 * @example
 * ```tsx
 * import { useKeyboardShortcuts } from '@/components/accessibility/hooks'
 *
 * function KeyboardShortcutsDialog() {
 *   const { open, setOpen } = useKeyboardShortcuts()
 *
 *   return (
 *     <>
 *       <Button onClick={() => setOpen(true)}>Atalhos</Button>
 *       <Dialog open={open} onOpenChange={setOpen}>
 *         Dialog content here
 *       </Dialog>
 *     </>
 *   )
 * }
 * ```
 */
export function useKeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ctrl + / ou Cmd + / para mostrar atalhos
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setOpen(true);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    open,
    setOpen,
  };
}
