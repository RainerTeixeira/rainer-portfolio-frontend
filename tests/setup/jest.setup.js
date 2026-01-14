/**
 * @file jest.setup.js
 * @description Setup principal para testes do Jest
 * @version 2.0.0
 * @author Rainer Teixeira
 */

// =============================================================================
// IMPORTAÇÕES E POLYFILLS
// =============================================================================

require('@testing-library/jest-dom');

// Importa o mock do design tokens
require('./jest.design-tokens-mock.js');

const { TextDecoder, TextEncoder } = require('util');
const React = require('react');

// Polyfills para TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// =============================================================================
// MOCKS DO NEXT.JS
// =============================================================================

/**
 * Mock do next/image para evitar problemas com otimização de imagens
 */
jest.mock('next/image', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function NextImage(props) {
      const { src, alt, width, height, ...rest } = props;
      
      // Simplifica o component Image para um img comum
      return React.createElement('img', {
        src: src,
        alt: alt || '',
        width: width || '100%',
        height: height || 'auto',
        ...rest,
      });
    },
  };
});

/**
 * Mock do next/navigation para testes de rotas
 */
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockRouter.pathname,
  useSearchParams: () => new URLSearchParams(mockRouter.query),
  useParams: () => ({}),
  notFound: () => { throw new Error('Not Found'); },
  redirect: (path) => { throw new Error(`Redirect to ${path}`); },
}));

// =============================================================================
// MOCKS DE APIS DO BROWSER
// =============================================================================

/**
 * Mock do window.matchMedia para testes com media queries
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    addListener: jest.fn(), // Para navegadores antigos
    removeListener: jest.fn(), // Para navegadores antigos
  })),
});

/**
 * Mock do IntersectionObserver para testes de lazy loading
 */
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
    // Simula entrada imediata no viewport
    setTimeout(() => {
      this.callback([{
        target: element,
        isIntersecting: true,
        intersectionRatio: 1,
      }]);
    }, 0);
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  takeRecords() {
    return Array.from(this.elements).map(element => ({
      target: element,
      isIntersecting: true,
      intersectionRatio: 1,
    }));
  }
};

/**
 * Mock do ResizeObserver para testes de responsividade
 */
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    // Não faz nada nos testes
  }

  unobserve() {
    // Não faz nada nos testes
  }

  disconnect() {
    // Não faz nada nos testes
  }
};

/**
 * Mock da Performance API
 */
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
        const startTime = startMark ? performanceMarks.get(startMark) || 0 : 0;
        const endTime = endMark ? performanceMarks.get(endMark) || 0 : performance.now();
        
        const entry = {
          name,
          entryType: 'measure',
          startTime,
          duration: endTime - startTime,
        };
        
        performanceMeasures.push(entry);
        return entry;
      }),
      getEntriesByName: jest.fn(name => 
        performanceMeasures.filter(entry => entry.name === name)
      ),
      getEntriesByType: jest.fn(type => {
        if (type === 'navigation') {
          return [{
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
          }];
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
          const index = performanceMeasures.findIndex(entry => entry.name === name);
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

// =============================================================================
// MOCKS ADICIONAIS
// =============================================================================

/**
 * Mock do console para testes específicos
 */
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

global.console = {
  ...originalConsole,
  // Silencia logs em testes por padrão, mas mantém a funcionalidade
  log: jest.fn(originalConsole.log),
  error: jest.fn(originalConsole.error),
  warn: jest.fn(originalConsole.warn),
  info: jest.fn(originalConsole.info),
  debug: jest.fn(originalConsole.debug),
};

/**
 * Mock do localStorage
 */
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

global.localStorage = new LocalStorageMock();

/**
 * Mock do sessionStorage
 */
class SessionStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.sessionStorage = new SessionStorageMock();

// =============================================================================
// CONFIGURAÇÃO DE AMBIENTE
// =============================================================================

/**
 * Variáveis de ambiente para testes
 */
process.env.NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
process.env.NEXT_PUBLIC_API_DB_PROVIDER = process.env.NEXT_PUBLIC_API_DB_PROVIDER || 'PRISMA';
process.env.NODE_ENV = 'test';

// =============================================================================
// CONFIGURAÇÃO DE TESTES
// =============================================================================

/**
 * Configuração global de timeout
 */
jest.setTimeout(30000); // 30 segundos

/**
 * Limpeza após cada teste
 */
afterEach(() => {
  // Limpa todos os mocks
  jest.clearAllMocks();
  
  // Limpa o localStorage e sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  
  // Restaura console original
  console.log.mockRestore?.();
  console.error.mockRestore?.();
  console.warn.mockRestore?.();
  console.info.mockRestore?.();
  console.debug.mockRestore?.();
});

/**
 * Limpeza após todos os testes
 */
afterAll(() => {
  jest.restoreAllMocks();
});

// =============================================================================
// UTILITÁRIOS PARA TESTES
// =============================================================================

/**
 * Helper para criar um contexto de autenticação mock
 */
global.createMockAuthContext = (user = null) => ({
  user,
  isAuthenticated: !!user,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  refreshToken: jest.fn(),
});

/**
 * Helper para criar uma resposta fetch mock
 */
global.createMockFetchResponse = (data, options = {}) => ({
  ok: options.status ? options.status >= 200 && options.status < 300 : true,
  status: options.status || 200,
  statusText: options.statusText || 'OK',
  headers: new Map(Object.entries(options.headers || {})),
  json: async () => data,
  text: async () => typeof data === 'string' ? data : JSON.stringify(data),
  clone: function() {
    return createMockFetchResponse(data, options);
  },
});

// Export para uso em outros arquivos de setup
module.exports = {
  mockRouter,
  createMockAuthContext,
  createMockFetchResponse,
};