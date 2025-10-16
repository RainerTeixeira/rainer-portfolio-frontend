/**
 * Hook para Atalhos de Teclado
 * 
 * Gerencia detecção de atalho (Ctrl+/) para abrir dialog de atalhos.
 * 
 * Funcionalidades:
 * - Detecção de Ctrl+/ ou Cmd+/
 * - Estado de abertura do dialog
 * - Listener de teclado com cleanup
 * 
 * @fileoverview Hook para gerenciamento de atalhos de teclado
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useState, useEffect } from "react"

/**
 * Hook useKeyboardShortcuts
 * 
 * Detecta atalho Ctrl+/ e gerencia estado do dialog.
 * 
 * @returns {Object} Estado e controles
 * @returns {boolean} open - Se o dialog está aberto
 * @returns {Function} setOpen - Função para abrir/fechar dialog
 * 
 * @example
 * import { useKeyboardShortcuts } from '@/components/accessibility/hooks'
 * 
 * function KeyboardShortcutsDialog() {
 *   const { open, setOpen } = useKeyboardShortcuts()
 *   
 *   return (
 *     <>
 *       <Button onClick={() => setOpen(true)}>Atalhos</Button>
 *       <Dialog open={open} onOpenChange={setOpen}>
 *         {/* Conteúdo do dialog */}
 *       </Dialog>
 *     </>
 *   )
 * }
 */
export function useKeyboardShortcuts() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ctrl + / ou Cmd + / para mostrar atalhos
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return {
    open,
    setOpen,
  }
}

