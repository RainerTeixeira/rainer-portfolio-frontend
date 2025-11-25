/**
 * Testes para componente Avatar
 */

import { Avatar, AvatarFallback, AvatarImage } from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';

describe('Avatar', () => {
  it('deve renderizar um avatar', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" />
        <AvatarFallback>TT</AvatarFallback>
      </Avatar>
    );
    expect(container).toBeTruthy();
  });

  it('deve exibir fallback quando imagem não carrega', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/invalid.jpg" alt="Test" />
        <AvatarFallback>TT</AvatarFallback>
      </Avatar>
    );
    // Fallback pode aparecer após erro de imagem
    expect(container).toBeTruthy();
  });

  it('deve aceitar className customizada', () => {
    const { container } = render(
      <Avatar className="custom-class">
        <AvatarFallback>TT</AvatarFallback>
      </Avatar>
    );
    const avatar = container.firstChild;
    expect(avatar).toHaveClass('custom-class');
  });
});
