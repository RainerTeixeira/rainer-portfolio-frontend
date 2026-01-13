/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tests/tsconfig.json',
        useESM: true,
      },
    ],
  },
  
  moduleNameMapper: {
    // Design system e UI
    '^@rainersoft/ui$': '<rootDir>/node_modules/@rainersoft/ui',
    '^@rainersoft/design-tokens$': '<rootDir>/node_modules/@rainersoft/design-tokens',
    
    // Path aliases da aplicação
    '^@/lib/env$': '<rootDir>/lib/config/env',
    '^@/lib/utils$': '<rootDir>/lib/utils',
    '^@/lib/content': '<rootDir>/lib/blog',
    '^@/lib/cookies': '<rootDir>/lib/privacy',
    '^@/(.*)$': '<rootDir>/$1',
    
    // Mocks
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
      '<rootDir>/tests/mocks/file-mock.js',
  },
  
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '<rootDir>/tests/unit/**/*.test.{ts,tsx}',
  ],
  
  testPathIgnorePatterns: [
    '/node_modules/',
    '/\\.next/',
    '/dist/',
    '/out/',
    '/tests/e2e/',
    '/tests/live/',
  ],
  
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'services/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/layout.tsx',
    '!**/page.tsx',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/tests/**',
    '!**/types/**',
  ],
  
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/jest.setup.js',
    '<rootDir>/tests/setup/jest.design-tokens-mock.js',
    '<rootDir>/tests/setup/jest.fetch-mock.js',
  ],
  
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  
  maxWorkers: '50%',
  testTimeout: 10000,
  verbose: true,
};

export default config;