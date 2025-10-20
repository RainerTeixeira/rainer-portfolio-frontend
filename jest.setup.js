// Configurações globais para os testes
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextDecoder, TextEncoder } from 'util';

// Adiciona suporte a TextEncoder/TextDecoder no ambiente de teste
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock de módulos que não precisam ser testados
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock do router do Next.js
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockRouter.pathname,
  useSearchParams: () => new URLSearchParams(mockRouter.query),
}));

// Limpar mocks entre os testes
afterEach(() => {
  jest.clearAllMocks();
});
