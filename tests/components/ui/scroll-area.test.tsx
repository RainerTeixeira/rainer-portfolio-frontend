/**
 * Testes para componente ScrollArea
 */

import { ScrollArea, ScrollBar } from '@rainersoft/ui';
import { render } from '@testing-library/react';

describe('ScrollArea', () => {
  it('deve renderizar o scroll area', () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar conteúdo dentro do scroll area', () => {
    const { getByText } = render(
      <ScrollArea>
        <div>Scrollable content</div>
      </ScrollArea>
    );
    expect(getByText('Scrollable content')).toBeInTheDocument();
  });

  it('deve renderizar ScrollBar', () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
        <ScrollBar />
      </ScrollArea>
    );
    expect(container).toBeTruthy();
  });
});
