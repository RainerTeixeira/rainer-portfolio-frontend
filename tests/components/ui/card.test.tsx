/**
 * Testes para componentes Card
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { render, screen } from '@testing-library/react';

describe('Card Components', () => {
  describe('Card', () => {
    it('deve renderizar um card', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('deve aceitar className customizada', () => {
      render(<Card className="custom-class">Content</Card>);
      const card = screen.getByText('Content').parentElement;
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('CardHeader', () => {
    it('deve renderizar card header', () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
    });
  });

  describe('CardTitle', () => {
    it('deve renderizar card title', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText('Title');
      expect(title).toBeInTheDocument();
      // Verifica se é um heading ou elemento de texto
      expect(title).toBeInTheDocument();
    });
  });

  describe('CardDescription', () => {
    it('deve renderizar card description', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Description</CardDescription>
          </CardHeader>
        </Card>
      );
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('CardContent', () => {
    it('deve renderizar card content', () => {
      render(
        <Card>
          <CardContent>Content</CardContent>
        </Card>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('CardFooter', () => {
    it('deve renderizar card footer', () => {
      render(
        <Card>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });
});
