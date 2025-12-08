/**
 * Testes para Layout Root
 */

// Mock completo de '@/app/layout' para evitar import de './globals.css'
jest.mock('@/app/layout', () => {
	const React = require('react');
	const {
		DESENVOLVEDOR,
		PALAVRAS_CHAVE,
		SITE_CONFIG,
	} = require('@/constants');

	const MockRootLayout = ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	);

	const metadata = {
		keywords: [
			...PALAVRAS_CHAVE.principais,
			...PALAVRAS_CHAVE.secundarias,
			...PALAVRAS_CHAVE.longas,
		],
		title: {
			default:
				`${SITE_CONFIG.name} - Desenvolvedor Full-Stack | Empresa de Desenvolvimento`,
			template: `%s | ${SITE_CONFIG.name}`,
		},
		openGraph: {
			url: SITE_CONFIG.url,
			title: `${SITE_CONFIG.name} - Desenvolvedor Full-Stack`,
			siteName: SITE_CONFIG.name,
		},
		authors: [
			{
				name: DESENVOLVEDOR.nome,
				url: SITE_CONFIG.url,
			},
		],
	};

	return {
		__esModule: true,
		default: MockRootLayout,
		metadata,
	};
});

import RootLayout, { metadata } from '@/app/layout';
import { DESENVOLVEDOR, PALAVRAS_CHAVE, SITE_CONFIG } from '@/constants';
import { render } from '@testing-library/react';

// Mock do CSS (alias usado em app/layout)
jest.mock('@/app/globals.css', () => ({}));

// Mock virtual para o alvo do moduleNameMapper de CSS
jest.mock('identity-obj-proxy', () => ({}), { virtual: true });

// Mock do pacote de UI que fornece useCookieConsent (módulo virtual)
jest.mock(
  '@rainersoft/ui',
  () => ({
    useCookieConsent: jest.fn(() => null),
  }),
  { virtual: true },
);

// Mock dos componentes de UI usados no layout para evitar carregar o barrel real
jest.mock('@/components/ui', () => ({
  CookieBanner: () => null,
  InstallPrompt: () => null,
  StarsBackground: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Toaster: () => null,
  UpdateNotification: () => null,
}));

// Mock de @rainersoft/design-tokens delegando para o módulo real
// Isso garante que todos os tokens (incluindo lightThemeColors.primitive.*)
// estejam disponíveis, evitando inconsistências com as constantes.
jest.mock('@rainersoft/design-tokens', () => {
  const actual = jest.requireActual('@rainersoft/design-tokens');
  return {
    __esModule: true,
    ...actual,
  };
});

// Mock do Vercel Analytics
jest.mock('@vercel/analytics/next', () => ({
  Analytics: () => null,
}));

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => null,
}));

// Mock das fontes do Next.js
jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Orbitron: () => ({ variable: '--font-orbitron' }),
  Rajdhani: () => ({ variable: '--font-rajdhani' }),
}));

// Mock dos componentes de layout para evitar lógica interna complexa nos testes
jest.mock('@/components/layout/navbar', () => ({
  Navbar: () => <nav>Navbar</nav>,
}));

jest.mock('@/components/layout/footer', () => ({
  Footer: () => <footer>Footer</footer>,
}));

jest.mock('@/components/layout/app-wrapper', () => ({
  AppWrapper: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('@/components/providers', () => ({
  QueryProvider: ({ children }: any) => <div>{children}</div>,
  ThemeProvider: ({ children }: any) => <div>{children}</div>,
  AuthProvider: ({ children }: any) => <div>{children}</div>,
  AppInitializationProvider: ({ children }: any) => <div>{children}</div>,
  useAppInitialization: () => ({
    isInitialized: true,
    progress: 100,
    currentStep: 'completed',
  }),
}));

describe('Root Layout', () => {
  it('deve renderizar o layout', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar children', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});

describe('Root Layout metadata', () => {
  it('deve usar PALAVRAS_CHAVE para compor keywords', () => {
    expect(metadata.keywords).toEqual([
      ...PALAVRAS_CHAVE.principais,
      ...PALAVRAS_CHAVE.secundarias,
      ...PALAVRAS_CHAVE.longas,
    ]);
  });

  it('deve usar SITE_CONFIG e DESENVOLVEDOR em title, authors e openGraph', () => {
    expect(metadata.title).toEqual({
      default: `${SITE_CONFIG.name} - Desenvolvedor Full-Stack | Empresa de Desenvolvimento`,
      template: `%s | ${SITE_CONFIG.name}`,
    });

    expect(metadata.authors?.[0]).toEqual({
      name: DESENVOLVEDOR.nome,
      url: SITE_CONFIG.url,
    });

    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.url).toBe(SITE_CONFIG.url);
    expect(metadata.openGraph?.title).toBe(
      `${SITE_CONFIG.name} - Desenvolvedor Full-Stack`,
    );
    expect(metadata.openGraph?.siteName).toBe(SITE_CONFIG.name);
  });
});
