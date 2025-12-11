# 🧪 08-TESTES - Estratégia de Testes

## 📋 Índice da Seção

- [Visão Geral dos Testes](#-visão-geral-dos-testes)
- [Tipos de Testes](#-tipos-de-testes)
- [Unit Tests](#-unit-tests)
- [Integration Tests](#-integration-tests)
- [E2E Tests](#-e2e-tests)
- [Performance Tests](#-performance-tests)
- [Coverage e Relatórios](#-coverage-e-relatórios)
- [CI/CD Integration](#cicd-integration)

---

## 🎯 Visão Geral dos Testes

### Estratégia de Testes

O projeto implementa uma **estratégia de testes completa** com múltiplas camadas de cobertura:

```
🧪 TESTING STRATEGY
├─ 🧩 Unit Tests           (Jest + React Testing Library)
├─ 🔗 Integration Tests    (Jest + MSW)
├─ 🎭 E2E Tests           (Playwright)
├─ ⚡ Performance Tests    (Lighthouse CI)
├─ 🎨 Visual Tests         (Storybook + Chromatic)
└─ 📊 Coverage Reports     (Istanbul + Codecov)
```

### Métricas de Qualidade

- **Coverage**: 95%+ em todas as camadas
- **Testes Unitários**: 300+ testes
- **Testes E2E**: 50+ cenários
- **Performance**: Lighthouse 95+ score
- **Visual Regression**: 100+ componentes

---

## 📋 Tipos de Testes

### Pirâmide de Testes

```typescript
// Estrutura da pirâmide de testes
const TestingPyramid = {
  // 70% - Unit Tests (rápidos, isolados)
  unit: {
    count: 300,
    duration: '< 1s',
    tools: ['Jest', 'React Testing Library'],
    coverage: 'Functions, Components, Hooks, Utils'
  },
  
  // 20% - Integration Tests (médios, colaborativos)
  integration: {
    count: 100,
    duration: '< 5s',
    tools: ['Jest', 'MSW', 'React Testing Library'],
    coverage: 'API Integration, State Management, Form Handling'
  },
  
  // 10% - E2E Tests (lentos, fluxos completos)
  e2e: {
    count: 50,
    duration: '< 30s',
    tools: ['Playwright', 'Cypress'],
    coverage: 'User Workflows, Critical Paths, Cross-browser'
  }
};
```

### Test Configuration

```json
// jest.config.mjs
import nextJest from 'next/jest.js';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/__mocks__/**',
  ],
  moduleNameMapping: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'coverage', outputName: 'junit.xml' }],
    ['jest-html-reporters', { publicPath: 'coverage', filename: 'report.html' }],
  ],
};

export default createJestConfig(config);

// jest.setup.mjs
import '@testing-library/jest-dom';
import { server } from './src/mocks/server.js';

// Start MSW server for all tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
```

---

## 🧩 Unit Tests

### Component Tests

```typescript
// src/components/domain/home/__tests__/hero-section.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HeroSection } from '../hero-section';
import { CONTEUDO_HERO } from '@/constants/content/home/hero';

// Mock analytics
jest.mock('@/lib/analytics', () => ({
  analytics: {
    track: jest.fn(),
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('HeroSection', () => {
  const defaultProps = {
    onCTAClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders hero content correctly', () => {
    render(<HeroSection {...defaultProps} />);
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CONTEUDO_HERO.titulos[0]
    );
    
    expect(screen.getByText(CONTEUDO_HERO.subtitulos[0])).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: CONTEUDO_HERO.cta.texto })).toBeInTheDocument();
  });

  it('handles CTA click correctly', async () => {
    render(<HeroSection {...defaultProps} />);
    
    const ctaButton = screen.getByRole('button', { name: CONTEUDO_HERO.cta.texto });
    fireEvent.click(ctaButton);
    
    await waitFor(() => {
      expect(defaultProps.onCTAClick).toHaveBeenCalledTimes(1);
    });
  });

  it('tracks analytics events on mount', () => {
    const { analytics } = require('@/lib/analytics');
    
    render(<HeroSection {...defaultProps} />);
    
    expect(analytics.track).toHaveBeenCalledWith('hero_view', {
      title: CONTEUDO_HERO.titulos[0],
      subtitle: CONTEUDO_HERO.subtitulos[0],
    });
  });

  it('renders without animation when animated prop is false', () => {
    render(<HeroSection {...defaultProps} animated={false} />);
    
    const heroContainer = screen.getByRole('heading', { level: 1 }).parentElement;
    expect(heroContainer).not.toHaveStyle({ opacity: 0 });
  });

  it('is accessible', async () => {
    const { container } = render(<HeroSection {...defaultProps} />);
    
    // Check for proper heading hierarchy
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings[0]).toHaveAttribute('role', 'heading');
    expect(headings[0]).toHaveAttribute('aria-level', '1');
    
    // Check for button accessibility
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type');
    expect(button).toBeEnabled();
  });
});

// src/components/domain/contato/__tests__/contact-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../contact-form';
import { contatoService } from '@/lib/api/services';

// Mock the service
jest.mock('@/lib/api/services', () => ({
  contatoService: {
    sendContact: jest.fn(),
  },
}));

// Mock toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ContactForm', () => {
  const mockSendContact = contatoService.sendContact as jest.MockedFunction<typeof contatoService.sendContact>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    const user = userEvent.setup();
    mockSendContact.mockResolvedValue(undefined);
    
    render(<ContactForm />);
    
    // Fill form
    await user.type(screen.getByLabelText(/nome/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/assunto/i), 'Test Subject');
    await user.type(screen.getByLabelText(/mensagem/i), 'Test message');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /enviar/i }));
    
    await waitFor(() => {
      expect(mockSendContact).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      });
    });
    
    expect(require('react-hot-toast').toast.success).toHaveBeenCalledWith(
      'Mensagem enviada com sucesso!'
    );
  });

  it('handles submission errors', async () => {
    const user = userEvent.setup();
    mockSendContact.mockRejectedValue(new Error('Network error'));
    
    render(<ContactForm />);
    
    // Fill and submit form
    await user.type(screen.getByLabelText(/nome/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/mensagem/i), 'Test message');
    
    await user.click(screen.getByRole('button', { name: /enviar/i }));
    
    await waitFor(() => {
      expect(require('react-hot-toast').toast.error).toHaveBeenCalledWith(
        'Erro ao enviar mensagem'
      );
    });
  });
});
```

### Hook Tests

```typescript
// src/hooks/__tests__/use-auth.test.tsx
import { renderHook, act } from '@testing-library/react';
import { AuthContextProvider, useAuth } from '../use-auth';
import { authService } from '@/lib/api/services';

// Mock the service
jest.mock('@/lib/api/services', () => ({
  authService: {
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    loginWithGoogle: jest.fn(),
    loginWithGitHub: jest.fn(),
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

describe('useAuth', () => {
  const mockLogin = authService.login as jest.MockedFunction<typeof authService.login>;
  const mockLogout = authService.logout as jest.MockedFunction<typeof authService.logout>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides initial auth state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('handles login successfully', async () => {
    const mockUser = { id: '1', email: 'test@example.com', fullName: 'Test User' };
    mockLogin.mockResolvedValue({ user: mockUser, token: 'mock-token' });
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles login errors', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      try {
        await result.current.login('test@example.com', 'wrong-password');
      } catch (error) {
        // Expected error
      }
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('handles logout', async () => {
    const mockUser = { id: '1', email: 'test@example.com', fullName: 'Test User' };
    mockLogin.mockResolvedValue({ user: mockUser, token: 'mock-token' });
    mockLogout.mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // Login first
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    // Then logout
    await act(async () => {
      await result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(mockLogout).toHaveBeenCalled();
  });
});
```

### Utility Tests

```typescript
// src/utils/__tests__/validation.test.ts
import { validateEmail, validatePhone, validateCPF } from '../validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('user@sub.domain.com')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test..test@example.com')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null as any)).toBe(false);
      expect(validateEmail(undefined as any)).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('validates Brazilian phone numbers', () => {
      expect(validatePhone('(11) 99999-9999')).toBe(true);
      expect(validatePhone('11999999999')).toBe(true);
      expect(validatePhone('+55 11 99999-9999')).toBe(true);
      expect(validatePhone('011999999999')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('(11) 1234-5678')).toBe(false);
      expect(validatePhone('(11) 99999-999')).toBe(false);
    });
  });

  describe('validateCPF', () => {
    it('validates correct CPF numbers', () => {
      expect(validateCPF('123.456.789-09')).toBe(true);
      expect(validateCPF('12345678909')).toBe(true);
    });

    it('rejects invalid CPF numbers', () => {
      expect(validateCPF('111.111.111-11')).toBe(false);
      expect(validateCPF('123.456.789-00')).toBe(false);
      expect(validateCPF('1234567890')).toBe(false);
    });
  });
});

// src/utils/__tests__/formatting.test.ts
import { formatDate, formatCurrency, formatNumber } from '../formatting';

describe('Formatting Utils', () => {
  describe('formatDate', () => {
    it('formats dates correctly in pt-BR', () => {
      expect(formatDate('2025-12-11')).toBe('11 de dezembro de 2025');
      expect(formatDate(new Date('2025-12-11'))).toBe('11 de dezembro de 2025');
    });

    it('handles different locales', () => {
      expect(formatDate('2025-12-11', 'en-US')).toBe('December 11, 2025');
      expect(formatDate('2025-12-11', 'es-ES')).toBe('11 de diciembre de 2025');
    });

    it('handles invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('Data inválida');
      expect(formatDate(null as any)).toBe('Data inválida');
    });
  });

  describe('formatCurrency', () => {
    it('formats currency correctly in BRL', () => {
      expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
      expect(formatCurrency(0)).toBe('R$ 0,00');
      expect(formatCurrency(-100)).toBe('-R$ 100,00');
    });

    it('handles different currencies', () => {
      expect(formatCurrency(1234.56, 'en-US', 'USD')).toBe('$1,234.56');
      expect(formatCurrency(1234.56, 'es-ES', 'EUR')).toBe('1.234,56 €');
    });
  });
});
```

---

## 🔗 Integration Tests

### API Integration Tests

```typescript
// src/__tests__/integration/api.test.ts
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { contatoService } from '@/lib/api/services';

const server = setupServer(
  // Mock API endpoints
  rest.post('/api/contact', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, message: 'Contact form submitted' })
    );
  }),
  
  rest.get('/api/posts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        posts: [
          { id: '1', title: 'Test Post', slug: 'test-post' },
          { id: '2', title: 'Another Post', slug: 'another-post' },
        ],
        total: 2,
      })
    );
  }),
  
  rest.get('/api/posts/:slug', (req, res, ctx) => {
    const { slug } = req.params;
    
    if (slug === 'not-found') {
      return res(
        ctx.status(404),
        ctx.json({ error: 'Post not found' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json({
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        content: 'Test content',
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Integration', () => {
  describe('Contact Service', () => {
    it('submits contact form successfully', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      };

      const result = await contatoService.sendContact(contactData);

      expect(result).toEqual({ success: true, message: 'Contact form submitted' });
    });

    it('handles API errors', async () => {
      // Override handler for this test
      server.use(
        rest.post('/api/contact', (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({ error: 'Internal server error' })
          );
        })
      );

      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      };

      await expect(contatoService.sendContact(contactData)).rejects.toThrow();
    });
  });

  describe('Posts Service', () => {
    it('fetches posts list', async () => {
      const result = await postsService.getPosts();

      expect(result.posts).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.posts[0]).toHaveProperty('title', 'Test Post');
    });

    it('fetches single post', async () => {
      const result = await postsService.getPost('test-post');

      expect(result).toHaveProperty('id', '1');
      expect(result).toHaveProperty('title', 'Test Post');
    });

    it('handles 404 for non-existent post', async () => {
      await expect(postsService.getPost('not-found')).rejects.toThrow('Post not found');
    });
  });
});
```

### State Management Tests

```typescript
// src/__tests__/integration/auth-context.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContextProvider, useAuth } from '@/components/providers/auth-context-provider';
import { authService } from '@/lib/api/services';

// Mock the service
jest.mock('@/lib/api/services', () => ({
  authService: {
    login: jest.fn(),
    logout: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));

const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span data-testid="user-email">{user?.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login('test@example.com', 'password')}>
          Login
        </button>
      )}
    </div>
  );
};

describe('Auth Context Integration', () => {
  const mockLogin = authService.login as jest.MockedFunction<typeof authService.login>;
  const mockLogout = authService.logout as jest.MockedFunction<typeof authService.logout>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('manages authentication state across components', async () => {
    const mockUser = { id: '1', email: 'test@example.com', fullName: 'Test User' };
    mockLogin.mockResolvedValue({ user: mockUser, token: 'mock-token' });

    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>
    );

    // Initially not authenticated
    expect(screen.queryByTestId('user-email')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

    // Click login
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Should be authenticated after login
    await waitFor(() => {
      expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
    });
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();

    // Click logout
    await userEvent.click(screen.getByRole('button', { name: 'Logout' }));

    // Should be logged out
    await waitFor(() => {
      expect(screen.queryByTestId('user-email')).not.toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
});
```

---

## 🎭 E2E Tests

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'playwright-results.xml' }],
    process.env.CI ? ['github'] : ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Scenarios

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Senha')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Senha').fill('password123');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Bem-vindo, Test User')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Senha').fill('wrongpassword');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.getByText('Email ou senha inválidos')).toBeVisible();
    await expect(page).toHaveURL('/dashboard/login');
  });

  test('should login with OAuth Google', async ({ page }) => {
    // Mock OAuth flow for testing
    await page.route('**/auth/oauth/google', (route) => {
      route.fulfill({
        status: 302,
        headers: {
          Location: '/dashboard/login/callback?code=test-code&state=test-state',
        },
      });
    });

    await page.route('**/auth/oauth/google/callback', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: { id: '1', email: 'google@example.com', fullName: 'Google User' },
          tokens: { accessToken: 'mock-token' },
        }),
      });
    });

    await page.getByRole('button', { name: 'Continuar com Google' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Bem-vindo, Google User')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Senha').fill('password123');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await expect(page).toHaveURL('/dashboard');

    // Then logout
    await page.getByRole('button', { name: 'Sair' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});

// e2e/contact.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contato');
  });

  test('should submit contact form successfully', async ({ page }) => {
    await page.getByLabel('Nome').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Assunto').fill('Test Subject');
    await page.getByLabel('Mensagem').fill('This is a test message');
    await page.getByRole('button', { name: 'Enviar' }).click();

    await expect(page.getByText('Mensagem enviada com sucesso!')).toBeVisible();
    
    // Form should be reset
    await expect(page.getByLabel('Nome')).toHaveValue('');
    await expect(page.getByLabel('Email')).toHaveValue('');
  });

  test('should validate required fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Enviar' }).click();

    await expect(page.getByText('Nome é obrigatório')).toBeVisible();
    await expect(page.getByText('Email é obrigatório')).toBeVisible();
    await expect(page.getByText('Mensagem é obrigatória')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByRole('button', { name: 'Enviar' }).click();

    await expect(page.getByText('Email inválido')).toBeVisible();
  });

  test('should handle submission errors', async ({ page }) => {
    // Mock API error
    await page.route('**/api/contact', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await page.getByLabel('Nome').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Mensagem').fill('Test message');
    await page.getByRole('button', { name: 'Enviar' }).click();

    await expect(page.getByText('Erro ao enviar mensagem')).toBeVisible();
  });
});

// e2e/blog.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Blog Functionality', () => {
  test('should display blog posts list', async ({ page }) => {
    await page.goto('/blog');

    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(3);
  });

  test('should navigate to post detail', async ({ page }) => {
    await page.goto('/blog');
    
    await page.locator('[data-testid="post-card"]').first().click();
    
    await expect(page).toHaveURL(/\/blog\/[\w-]+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('[data-testid="post-content"]')).toBeVisible();
  });

  test('should filter posts by category', async ({ page }) => {
    await page.goto('/blog');
    
    await page.getByRole('button', { name: 'React' }).click();
    
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(2);
    await expect(page.getByText('Mostrando 2 posts')).toBeVisible();
  });

  test('should search posts', async ({ page }) => {
    await page.goto('/blog');
    
    await page.getByPlaceholder('Buscar posts...').fill('React');
    await page.getByRole('button', { name: 'Buscar' }).click();
    
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(2);
  });
});
```

---

## ⚡ Performance Tests

### Lighthouse CI Configuration

```yaml
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000', 'http://localhost:3000/sobre', 'http://localhost:3000/blog'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:pwa': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### Performance Test Scripts

```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should load homepage within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check Core Web Vitals
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const vitals: any = {};
          
          entries.forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              vitals.lcp = entry.startTime;
            }
            if (entry.entryType === 'first-input') {
              vitals.fid = (entry as any).processingStart - entry.startTime;
            }
            if (entry.entryType === 'layout-shift') {
              vitals.cls = (entry as any).value;
            }
          });
          
          resolve(vitals);
        }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      });
    });
    
    expect(vitals.lcp).toBeLessThan(2500); // LCP < 2.5s
    expect(vitals.fid).toBeLessThan(100);  // FID < 100ms
    expect(vitals.cls).toBeLessThan(0.1);  // CLS < 0.1
  });

  test('should have efficient bundle size', async ({ page }) => {
    const responses: any[] = [];
    
    page.on('response', (response) => {
      if (response.url().includes('.js') || response.url().includes('.css')) {
        responses.push({
          url: response.url(),
          size: parseInt(response.headers()['content-length'] || '0'),
        });
      }
    });
    
    await page.goto('/');
    
    const totalJS = responses
      .filter(r => r.url.includes('.js'))
      .reduce((sum, r) => sum + r.size, 0);
    
    const totalCSS = responses
      .filter(r => r.url.includes('.css'))
      .reduce((sum, r) => sum + r.size, 0);
    
    // JavaScript should be under 250KB gzipped
    expect(totalJS).toBeLessThan(250 * 1024);
    
    // CSS should be under 50KB gzipped
    expect(totalCSS).toBeLessThan(50 * 1024);
  });

  test('should handle images efficiently', async ({ page }) => {
    const imageResponses: any[] = [];
    
    page.on('response', (response) => {
      if (response.url().includes('.jpg') || response.url().includes('.png') || response.url().includes('.webp')) {
        imageResponses.push({
          url: response.url(),
          size: parseInt(response.headers()['content-length'] || '0'),
        });
      }
    });
    
    await page.goto('/');
    
    // Images should be optimized
    imageResponses.forEach((image) => {
      expect(image.size).toBeLessThan(500 * 1024); // Each image under 500KB
    });
    
    // Check for modern formats
    const hasWebP = imageResponses.some(r => r.url.includes('.webp'));
    expect(hasWebP).toBe(true);
  });
});
```

---

## 📊 Coverage e Relatórios

### Coverage Configuration

```json
// package.json - scripts
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --coverage --watchAll=false --ci",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:performance": "lhci autorun",
    "test:all": "pnpm run test:ci && pnpm run test:e2e && pnpm run test:performance"
  }
}

// .nycrc.json (for additional coverage)
{
  "all": true,
  "include": [
    "src/**/*.{js,jsx,ts,tsx}"
  ],
  "exclude": [
    "src/**/*.stories.{js,jsx,ts,tsx}",
    "src/**/*.d.ts",
    "src/**/__mocks__/**",
    "src/**/__tests__/**"
  ],
  "reporter": [
    "text",
    "text-summary",
    "html",
    "lcov",
    "json"
  ],
  "report-dir": "coverage",
  "check-coverage": true,
  "branches": 90,
  "functions": 95,
  "lines": 95,
  "statements": 95
}
```

### Coverage Reports

```typescript
// scripts/generate-coverage-report.ts
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface CoverageData {
  total: {
    lines: { covered: number; total: number; percentage: number };
    functions: { covered: number; total: number; percentage: number };
    branches: { covered: number; total: number; percentage: number };
    statements: { covered: number; total: number; percentage: number };
  };
  files: Array<{
    path: string;
    lines: { covered: number; total: number; percentage: number };
    functions: { covered: number; total: number; percentage: number };
    branches: { covered: number; total: number; percentage: number };
    statements: { covered: number; total: number; percentage: number };
  }>;
}

function generateCoverageReport(): void {
  try {
    // Run tests with coverage
    execSync('pnpm run test:ci', { stdio: 'inherit' });
    
    // Read coverage data
    const coverageData = JSON.parse(
      fs.readFileSync('coverage/coverage-summary.json', 'utf-8')
    ) as CoverageData;
    
    // Generate HTML report
    const htmlReport = generateHTMLReport(coverageData);
    fs.writeFileSync('coverage/coverage-report.html', htmlReport);
    
    // Generate markdown report
    const markdownReport = generateMarkdownReport(coverageData);
    fs.writeFileSync('coverage/coverage-report.md', markdownReport);
    
    // Check thresholds
    checkCoverageThresholds(coverageData);
    
    console.log('✅ Coverage reports generated successfully');
  } catch (error) {
    console.error('❌ Error generating coverage reports:', error);
    process.exit(1);
  }
}

function generateHTMLReport(data: CoverageData): string {
  const { total } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Coverage Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .metric { display: inline-block; margin: 10px; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .metric h3 { margin: 0 0 10px 0; }
        .metric .percentage { font-size: 24px; font-weight: bold; }
        .metric .details { font-size: 14px; color: #666; }
        .good { color: #28a745; }
        .warning { color: #ffc107; }
        .bad { color: #dc3545; }
      </style>
    </head>
    <body>
      <h1>Test Coverage Report</h1>
      
      <div class="metric">
        <h3>Lines</h3>
        <div class="percentage ${getCoverageClass(total.lines.percentage)}">
          ${total.lines.percentage.toFixed(1)}%
        </div>
        <div class="details">${total.lines.covered}/${total.lines.total}</div>
      </div>
      
      <div class="metric">
        <h3>Functions</h3>
        <div class="percentage ${getCoverageClass(total.functions.percentage)}">
          ${total.functions.percentage.toFixed(1)}%
        </div>
        <div class="details">${total.functions.covered}/${total.functions.total}</div>
      </div>
      
      <div class="metric">
        <h3>Branches</h3>
        <div class="percentage ${getCoverageClass(total.branches.percentage)}">
          ${total.branches.percentage.toFixed(1)}%
        </div>
        <div class="details">${total.branches.covered}/${total.branches.total}</div>
      </div>
      
      <div class="metric">
        <h3>Statements</h3>
        <div class="percentage ${getCoverageClass(total.statements.percentage)}">
          ${total.statements.percentage.toFixed(1)}%
        </div>
        <div class="details">${total.statements.covered}/${total.statements.total}</div>
      </div>
      
      <h2>File Coverage</h2>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Lines</th>
            <th>Functions</th>
            <th>Branches</th>
            <th>Statements</th>
          </tr>
        </thead>
        <tbody>
          ${data.files.map(file => `
            <tr>
              <td>${file.path}</td>
              <td class="${getCoverageClass(file.lines.percentage)}">${file.lines.percentage.toFixed(1)}%</td>
              <td class="${getCoverageClass(file.functions.percentage)}">${file.functions.percentage.toFixed(1)}%</td>
              <td class="${getCoverageClass(file.branches.percentage)}">${file.branches.percentage.toFixed(1)}%</td>
              <td class="${getCoverageClass(file.statements.percentage)}">${file.statements.percentage.toFixed(1)}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;
}

function checkCoverageThresholds(data: CoverageData): void {
  const thresholds = {
    lines: 95,
    functions: 95,
    branches: 90,
    statements: 95,
  };
  
  const { total } = data;
  
  Object.entries(thresholds).forEach(([metric, threshold]) => {
    const percentage = total[metric as keyof typeof total].percentage;
    if (percentage < threshold) {
      console.error(`❌ ${metric} coverage (${percentage.toFixed(1)}%) is below threshold (${threshold}%)`);
      process.exit(1);
    }
  });
  
  console.log('✅ All coverage thresholds met');
}

function getCoverageClass(percentage: number): string {
  if (percentage >= 95) return 'good';
  if (percentage >= 80) return 'warning';
  return 'bad';
}

generateCoverageReport();
```

---

## 🔄 CI/CD Integration

### GitHub Actions Test Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run linting
        run: pnpm run lint
        
      - name: Run type checking
        run: pnpm run type-check
        
      - name: Run unit tests
        run: pnpm run test:ci
        
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
          
      - name: Upload coverage reports
        uses: actions/upload-artifact@v3
        with:
          name: coverage-reports
          path: coverage/
          
  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps
        
      - name: Build application
        run: pnpm run build
        
      - name: Run E2E tests
        run: pnpm run test:e2e
        
      - name: Upload E2E test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          
  performance-tests:
    name: Performance Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build application
        run: pnpm run build
        
      - name: Start application
        run: pnpm run start &
        
      - name: Wait for application
        run: sleep 30
        
      - name: Run Lighthouse CI
        run: pnpm run test:performance
        
      - name: Upload Lighthouse results
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-results
          path: .lighthouseci/
```

---

## 🎯 Próximos Passos

1. **Contribuição**: Configure [09-CONTRIBUICAO](../09-CONTRIBUICAO/)

---

## 📚 Referências

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [MSW (Mock Service Worker)](https://mswjs.io/)
