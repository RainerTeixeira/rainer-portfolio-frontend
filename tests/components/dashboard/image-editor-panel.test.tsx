/**
 * Testes para componente ImageEditorPanel
 */

import { ImageEditorPanel } from '@/components/dashboard/image-editor-panel';
import { render } from '@testing-library/react';

// Mock do editor do Tiptap
const mockEditor = {
  state: {
    selection: {
      from: 0,
      to: 0,
      $from: {
        pos: 0,
        nodeAfter: null,
        nodeBefore: null,
      },
    },
    doc: {
      nodesBetween: jest.fn(),
    },
  },
  chain: jest.fn().mockReturnThis(),
  updateAttributes: jest.fn().mockReturnThis(),
  run: jest.fn(),
};

describe('ImageEditorPanel', () => {
  it('deve renderizar o painel de edição de imagem', () => {
    const { container } = render(
      <ImageEditorPanel
        editor={mockEditor as any}
        imageAttributes={{
          src: '/test.jpg',
          alt: 'Test',
        }}
        onClose={jest.fn()}
      />
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar painel', () => {
    const { container } = render(
      <ImageEditorPanel
        editor={mockEditor as any}
        imageAttributes={{
          src: '/test.jpg',
        }}
        onClose={jest.fn()}
      />
    );
    const panel = container.querySelector('div') || container.firstChild;
    expect(panel).toBeTruthy();
  });
});
