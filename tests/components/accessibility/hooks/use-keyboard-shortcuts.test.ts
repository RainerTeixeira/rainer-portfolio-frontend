/**
 * Testes para hook useKeyboardShortcuts
 */

import { useKeyboardShortcuts } from '@/components/accessibility/hooks/use-keyboard-shortcuts';
import { renderHook } from '@testing-library/react';

describe('useKeyboardShortcuts', () => {
  it('deve registrar atalhos de teclado', () => {
    const { result } = renderHook(() => useKeyboardShortcuts({}));
    expect(result.current).toBeDefined();
  });
});
