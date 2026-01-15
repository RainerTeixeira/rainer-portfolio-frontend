// @ts-check
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: 'tests/tsconfig.json',
        useESM: false,
      },
    ],
  },
  
  transformIgnorePatterns: [
    'node_modules/(?!(lucide-react|@rainersoft/ui|@rainersoft/design-tokens|@rainersoft/utils|framer-motion)/)',
  ],
  
  moduleNameMapper: {
    // Design system e UI
    '^@rainersoft/ui$': '<rootDir>/tests/mocks/rainersoft-ui.tsx',
    '^@rainersoft/design-tokens$': '<rootDir>/tests/setup/jest.design-tokens-mock.js',
    '^lucide-react$': '<rootDir>/tests/mocks/lucide-react.js',
    '^lucide-react/(.*)$': '<rootDir>/tests/mocks/lucide-react.js',
    '^react-day-picker$': '<rootDir>/tests/mocks/react-day-picker.js',
    '^next-themes$': '<rootDir>/tests/mocks/next-themes.js',
    '^framer-motion$': '<rootDir>/tests/mocks/framer-motion.js',
    
    // Path aliases da aplicação
    '^@/components/ui$': '<rootDir>/tests/mocks/components-ui.tsx',
    '^@/components/ui/(.*)$': '<rootDir>/tests/mocks/components-ui.tsx',
    '^@/components/home$': '<rootDir>/tests/mocks/components-home.tsx',
    '^@/components/blog$': '<rootDir>/tests/mocks/components-blog.tsx',
    '^@/lib/env$': '<rootDir>/lib/config/env',
    '^@/lib/api/helpers$': '<rootDir>/tests/mocks/lib-api-helpers.ts',
    '^@/lib/api/services/auth.service$': '<rootDir>/tests/mocks/lib-api-services-auth.service.ts',
    '^@/lib/api/services$': '<rootDir>/tests/mocks/lib-api-services.ts',
    '^@/hooks/useAuth$': '<rootDir>/tests/mocks/hooks-useAuth.ts',
    '^@/constants/content/home/hero$': '<rootDir>/tests/mocks/constants-hero.ts',
    '^constants/content/home/hero$': '<rootDir>/tests/mocks/constants-hero.ts',
    '^constants/(.*)$': '<rootDir>/tests/mocks/constants-hero.ts',
    'constants/content/home/hero': '<rootDir>/tests/mocks/constants-hero.ts',
    '^@/components/domain/home/carousel$': '<rootDir>/tests/mocks/carousel.tsx',
    '^next/dynamic$': '<rootDir>/tests/mocks/next-dynamic.js',
    '^next/link$': '<rootDir>/tests/mocks/next-link.js',
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
    '/tests/scripts/',
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
    '<rootDir>/tests/setup/jest.fetch-mock.js',
    '<rootDir>/tests/setup/jest.design-tokens-mock.js',
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
};