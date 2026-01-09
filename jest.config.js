/**
 * @file jest.config.js
 * @description Configuração do Jest para testes unitários e de integração.
 * 
 * @module jest.config
 * @version 2.0.0
 * @author Rainer Teixeira
 * @since 1.0.0
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  // Configuração do ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tests/tsconfig.json',
        useESM: true,
      },
    ],
  },
  
  // Extensões de módulo
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Mapeamento de paths
  moduleNameMapper: {
    // Aliases legados usados em testes apontando para módulos reais da nova estrutura
    '^@/lib/env$': '<rootDir>/lib/config/env',
    '^@/lib/utils$': '<rootDir>/lib/utils/index',
    '^@/lib/content$': '<rootDir>/lib/blog',
    '^@/lib/content/reading-time$': '<rootDir>/lib/blog/reading-time',
    '^@/lib/content/tiptap-utils$': '<rootDir>/lib/blog/tiptap',
    '^@/lib/cookies/analytics$': '<rootDir>/lib/privacy/analytics',
    '^@/lib/cookies/cookie-manager$': '<rootDir>/lib/privacy/manager',
    '^@/lib/utils/tokens$': '<rootDir>/lib/portfolio/tokens',
    '^@/components/ui/badge$': '<rootDir>/components/dashboard/login/status-badge',
    '^@/components/ui/tabs$': '@rainersoft/ui',
    '^@/components/ui/card$': '@rainersoft/ui',
    '^@/components/ui$': '@rainersoft/ui',
    // Alias genérico para @/ apontando para a raiz do projeto (deve vir por último)
    '^@/(.*)$': '<rootDir>/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // Mocks para assets e CSS
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
      '<rootDir>/tests/mocks/file-mock.js',
  },
  
  // Diretórios de módulos
  moduleDirectories: ['node_modules', '<rootDir>'],
  
  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/jest.setup.js',
    '<rootDir>/tests/setup/jest.design-tokens-mock.js',
    '<rootDir>/tests/setup/jest.fetch-mock.js',
  ],
  
  // Patterns de teste
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '<rootDir>/tests/unit/**/*.test.{ts,tsx}',
  ],
  
  // Ignorar paths
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/',
    '<rootDir>/tests/live/',
    '<rootDir>/tests/login.spec.ts',
    '<rootDir>/dist/',
    '<rootDir>/out/',
  ],
  
  // Coverage
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'services/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/layout.tsx',
    '!**/page.tsx',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/tests/**',
    '!**/types/**',
  ],
  coverageDirectory: 'tests/test-results/coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  
  // Performance
  maxWorkers: '50%',
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // Verbose mode para ver todos os testes
  verbose: true,
  
  // Timeout para testes
  testTimeout: 10000,
};

module.exports = config;