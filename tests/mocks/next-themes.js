const React = require('react');

const ThemeProvider = ({ children }) => children;
const useTheme = () => ({
  resolvedTheme: 'light',
  theme: 'light',
  setTheme: jest.fn(),
  systemTheme: 'light',
  forcedTheme: undefined,
});

module.exports = {
  __esModule: true,
  ThemeProvider,
  useTheme,
  default: { ThemeProvider, useTheme },
};
