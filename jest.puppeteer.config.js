module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.test\\.ts$',
  testTimeout: 600000, // 10 minutos
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    },
  },
};
