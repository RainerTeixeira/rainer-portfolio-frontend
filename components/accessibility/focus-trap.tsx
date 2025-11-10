/**
 * Focus Trap Component
 *
 * Componente para manter o foco dentro de um container. Essencial para
 * modals e dialogs, garantindo que usuários navegando por teclado não
 * saiam acidentalmente do conteúdo focado.
 *
 * @module components/accessibility/focus-trap
 * @fileoverview Componente de focus trap para modals e dialogs
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <FocusTrap active={isOpen}>
 *   <Dialog>
 *     <DialogContent>...</DialogContent>
 *   </Dialog>
 * </FocusTrap>
 * ```
 */

'use client';

import { ReactNode } from 'react';
import { useFocusTrap } from './hooks';

interface FocusTrapProps {
  children: ReactNode;
  active?: boolean;
}

export function FocusTrap({ children, active = true }: FocusTrapProps) {
  const containerRef = useFocusTrap(active);

  return <div ref={containerRef}>{children}</div>;
}
