/**
 * Testes para hook useTableOfContents
 */

import { useTableOfContents } from '@/components/blog/hooks/use-table-of-contents';
import { renderHook } from '@testing-library/react';

describe('useTableOfContents', () => {
  it('deve retornar estado inicial', () => {
    const ref = { current: document.createElement('article') };
    const { result } = renderHook(() => useTableOfContents(ref as any));

    expect(result.current).toHaveProperty('headings');
    expect(result.current).toHaveProperty('activeId');
    expect(result.current).toHaveProperty('scrollToHeading');
    expect(Array.isArray(result.current.headings)).toBe(true);
    expect(typeof result.current.scrollToHeading).toBe('function');
  });
});
