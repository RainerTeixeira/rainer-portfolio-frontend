/**
 * Testes para hook useFocusTrap
 */

import { useFocusTrap } from '@/components/accessibility/hooks/use-focus-trap';
import { renderHook } from '@testing-library/react';

describe('useFocusTrap', () => {
  it('deve criar ref para trap de foco', () => {
    const { result } = renderHook(() => useFocusTrap());
    expect(result.current).toBeDefined();
  });
});
