/**
 * Testes para página Dashboard
 */

import DashboardPage from '@/app/dashboard/page';
import { render, screen } from '@testing-library/react';

// Mock do Editor e suas dependências
jest.mock('@/components/dashboard/Editor', () => ({
  Editor: () => <div data-testid="editor">Editor</div>,
}));

// Mock das extensões do Tiptap antes de qualquer import
jest.mock('@tiptap/extension-code-block-lowlight', () => {
  const mockExtend = jest.fn((config: any) => ({
    name: 'codeBlockLowlight',
    ...config,
  }));
  return {
    default: mockExtend,
  };
});

jest.mock('@tiptap/react', () => ({
  useEditor: jest.fn(() => ({
    chain: () => ({ focus: () => ({ run: jest.fn() }) }),
    isActive: jest.fn(() => false),
    getAttributes: jest.fn(() => ({})),
  })),
  EditorContent: () => <div data-testid="editor-content">Editor</div>,
}));

jest.mock('@tiptap/starter-kit', () => ({
  default: jest.fn(),
}));

// Mock dos componentes
jest.mock('@/components/dashboard', () => ({
  DashboardStats: () => <div data-testid="dashboard-stats">Stats</div>,
  RecentPosts: () => <div data-testid="recent-posts">Posts</div>,
  AnalyticsOverview: () => <div data-testid="analytics">Analytics</div>,
  HelpCenter: () => <div data-testid="help">Help</div>,
  ProfileHeader: () => <div data-testid="profile">Profile</div>,
  QuickActions: () => <div data-testid="actions">Actions</div>,
  QuickStats: () => <div data-testid="stats">Stats</div>,
  RecentPostsList: () => (
    <div data-testid="recent-posts-list">Recent Posts</div>
  ),
}));

jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

jest.mock('@/components/providers/auth-provider', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'test@example.com' },
    isAuthenticated: true,
    isLoading: false,
  }),
}));

describe('Dashboard Page', () => {
  it('deve renderizar a página de dashboard', async () => {
    render(await DashboardPage());
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('deve exibir estatísticas do dashboard', async () => {
    render(await DashboardPage());
    expect(screen.getByTestId('dashboard-stats')).toBeInTheDocument();
  });
});
