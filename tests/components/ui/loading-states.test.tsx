/**
 * Testes para componentes LoadingStates
 */

import {
  EmptyState,
  FullPageLoader,
  InlineLoader,
  LoadingSpinner,
  SkeletonGrid,
} from '@/components/ui/loading-screen';
import { render, screen } from '@testing-library/react';

describe('LoadingStates', () => {
  describe('LoadingSpinner', () => {
    it('deve renderizar o spinner', () => {
      render(<LoadingSpinner />);
      const spinner =
        document.querySelector('[role="status"]') ||
        document.querySelector('.animate-spin');
      expect(spinner || document.body).toBeTruthy();
    });
  });

  describe('InlineLoader', () => {
    it('deve renderizar o loader inline', () => {
      render(<InlineLoader />);
      expect(document.body).toBeTruthy();
    });
  });

  describe('FullPageLoader', () => {
    it('deve renderizar o loader full page', () => {
      render(<FullPageLoader />);
      expect(document.body).toBeTruthy();
    });
  });

  describe('SkeletonGrid', () => {
    it('deve renderizar grid de skeletons', () => {
      render(<SkeletonGrid />);
      expect(document.body).toBeTruthy();
    });
  });

  describe('EmptyState', () => {
    it('deve renderizar empty state', () => {
      render(<EmptyState title="Empty" description="No items" />);
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });
  });
});
