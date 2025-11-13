// Configurações globais para os testes
import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
import 'whatwg-fetch';

// Adiciona suporte a TextEncoder/TextDecoder no ambiente de teste
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock de módulos que não precisam ser testados
jest.mock('next/image', () => ({
  __esModule: true,
  default: props => {
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

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => {
    const listeners = [];
    const legacyListeners = [];

    const mockMediaQuery = {
      matches: false,
      media: query,
      onchange: null,
      // Métodos modernos (funções reais, não jest.fn)
      addEventListener: jest.fn((event, handler) => {
        if (event === 'change') {
          listeners.push(handler);
        }
      }),
      removeEventListener: jest.fn((event, handler) => {
        if (event === 'change') {
          const index = listeners.indexOf(handler);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        }
      }),
      // Métodos legacy (deprecated mas ainda usados)
      addListener: jest.fn(handler => {
        legacyListeners.push(handler);
      }),
      removeListener: jest.fn(handler => {
        const index = legacyListeners.indexOf(handler);
        if (index > -1) {
          legacyListeners.splice(index, 1);
        }
      }),
      dispatchEvent: jest.fn(),
    };

    return mockMediaQuery;
  }),
});

// Mock de IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

// Mock de ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock de Performance API
if (typeof window !== 'undefined') {
  const performanceMarks = new Map();
  const performanceMeasures = [];

  Object.defineProperty(window, 'performance', {
    writable: true,
    value: {
      ...window.performance,
      mark: jest.fn(name => {
        performanceMarks.set(name, performance.now());
      }),
      measure: jest.fn((name, startMark, endMark) => {
        const entry = {
          name,
          entryType: 'measure',
          startTime: startMark ? performanceMarks.get(startMark) || 0 : 0,
          duration: endMark
            ? (performanceMarks.get(endMark) || 0) -
              (performanceMarks.get(startMark || '') || 0)
            : 0,
        };
        performanceMeasures.push(entry);
        return entry;
      }),
      getEntriesByName: jest.fn(name => {
        return performanceMeasures.filter(entry => entry.name === name);
      }),
      getEntriesByType: jest.fn(type => {
        if (type === 'navigation') {
          return [
            {
              domainLookupStart: 0,
              domainLookupEnd: 10,
              connectStart: 10,
              connectEnd: 20,
              requestStart: 20,
              responseStart: 30,
              responseEnd: 40,
              fetchStart: 0,
              domInteractive: 50,
              domComplete: 60,
              loadEventEnd: 70,
            },
          ];
        }
        return [];
      }),
      clearMarks: jest.fn(name => {
        if (name) {
          performanceMarks.delete(name);
        } else {
          performanceMarks.clear();
        }
      }),
      clearMeasures: jest.fn(name => {
        if (name) {
          const index = performanceMeasures.findIndex(e => e.name === name);
          if (index > -1) {
            performanceMeasures.splice(index, 1);
          }
        } else {
          performanceMeasures.length = 0;
        }
      }),
      now: jest.fn(() => Date.now()),
    },
  });
}

// Limpar mocks entre os testes
afterEach(() => {
  jest.clearAllMocks();
});
