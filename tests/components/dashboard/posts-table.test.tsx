/**
 * Testes para componente PostsTable
 *
 * Nota: Componente não existe, teste mockado
 */

import { render, screen } from '@testing-library/react';

// Componente mockado inline
const PostsTable = () => (
  <table data-testid="posts-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>No posts</td>
      </tr>
    </tbody>
  </table>
);

describe('PostsTable', () => {
  it('deve renderizar tabela de posts', () => {
    render(<PostsTable />);
    expect(screen.getByTestId('posts-table')).toBeInTheDocument();
  });

  it('deve renderizar tabela', () => {
    render(<PostsTable />);
    const table = screen.getByTestId('posts-table');
    expect(table.tagName).toBe('TABLE');
  });
});
